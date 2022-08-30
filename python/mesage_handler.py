import time
import json
import logging
import asyncio

from command_api import generate_webrtc_format_response
from config_reader import program_config
from rovSecurity.userAuth import generateAuthToken, getRovUUID, checkTokenValidty
from rovSecurity.trustedRovProof import signTrustedRovChallenge

############################
###### setup logging #######

log = logging.getLogger(__name__)


class MessageHandler:
    def __init__(self, msg_named_pipe, media_controller, motion_controller,
                 sensor_controller):
        self.msg_named_pipe = msg_named_pipe
        self.media_controller = media_controller
        self.motion_ctrl = motion_controller
        self.sensor_ctrl = sensor_controller
        self.last_ping_recived_time = 0

        # --- Variables to keep track of who is allowed to drive the rov & who can take over / send debug commands and which client peers to send replys to: ---
        self.current_driver_peerid = None
        self.known_peers = {
        }  #  eg: { "some_peer_id": { "connected": True,  "authToken": None,  "lastRecivedMsgTime": time.time() } }

        # constants
        self.MESSAGE_METADATA_SEPARATOR = program_config.get(
            'MessageMetadataSeparator', '|"|')

    def check_if_peer_is_authenticated(self, peer_id):
        authToken = self.known_peers.get(peer_id, {}).get("authToken", None)
        return checkTokenValidty(authToken)

    def password_challenge(self, password, src_peer_id):
        correct_password = program_config.get(
            'RovControlPassword', 'You Should Set This In The Config File')
        if password == correct_password:
            authToken = generateAuthToken()
            self.known_peers[src_peer_id]["authToken"] = authToken,
            return ('password-accepted', authToken)
        else:
            return ('password-invalid', None)

    def auth_token_challenge(self, authToken, src_peer_id):
        if checkTokenValidty(authToken):
            self.known_peers[src_peer_id]["authToken"] = authToken,
            return 'token-accepted'
        else:
            return 'password-required'

    def find_first_connected_peer(self):
        for peerid in self.known_peers:
            if self.known_peers[peerid]["connected"] == True:
                return peerid
        return None

    def parse_socket_message(self, message):
        """
        Parse a message from the socket and return a dict of the message metadata and the message data.
        :param message:
        :return:
        """

        message_metadata_separator_index = message.find(
            self.MESSAGE_METADATA_SEPARATOR)

        try:
            if message_metadata_separator_index == -1:
                # No message metadata sepearator in message (assume it is metadata only)
                message_metadata = json.loads(message)
                return (message_metadata, None)
            else:
                # Load metadata and message data as two json strings.
                message_metadata = json.loads(
                    message[:message_metadata_separator_index])
                message_data = json.loads(
                    message[message_metadata_separator_index +
                            len(self.MESSAGE_METADATA_SEPARATOR):])
                return (message_metadata, message_data)

        except json.JSONDecodeError:
            log.warning(
                'Received unix socket message with invalid JSON format: ' +
                message)
            return (None, None)

        except Exception as error:
            log.error(error, exc_info=True)
            return (None, None)

    async def handle_messsage_metadata(self, metadata):

        # exit if the message metadata doesn't have the SrcPeerId field
        if metadata is None or not "SrcPeerId" in metadata:
            return None

        driver_has_changed = False
        src_peer_id = metadata["SrcPeerId"]

        # check if some event happend (a connected or disconnected event most likely):
        peerEvent = metadata.get("PeerEvent", None)

        # update the last recived message time for this peer
        if (self.known_peers.has_key(src_peer_id)):
            self.known_peers[src_peer_id]["lastRecivedMsgTime"] = time.time(),

        # --------------- handle the peer event (if present)

        if peerEvent is None:
            return src_peer_id

        elif peerEvent == "Connected":
            log.info("A client peer has connected: " + src_peer_id)
            if (self.known_peers.has_key(src_peer_id)):
                self.known_peers[src_peer_id]["connected"] = True
            else:
                self.known_peers[src_peer_id] = {
                    "connected": True,
                    "authToken": None,
                    "lastRecivedMsgTime": time.time(),
                }
            if self.current_driver_peerid == None:
                self.current_driver_peerid = src_peer_id
                driver_has_changed = True

        elif peerEvent == "Disconnected":
            log.info("A client peer has DISconnected: " + src_peer_id)

            # reset the current driver peerid if the driver just disconnected:
            if self.current_driver_peerid == src_peer_id:
                self.current_driver_peerid = self.find_first_connected_peer()
                driver_has_changed = True  # ^ could be None

            #
            if (self.known_peers.has_key(src_peer_id)):
                self.known_peers[src_peer_id]["authToken"] = None
                self.known_peers[src_peer_id]["connected"] = False

        # ---------------

        if driver_has_changed:
            # Let all connected peers know that the designated driver peer has changed: (empty list at end = send to all connected peers)
            await self.send_msg(status="driver-changed",
                                val=self.current_driver_peerid,
                                recipient_peers=[])

        elif metadata["PeerEvent"] == "Connected":
            # Let the connecting peer know who the designated driver is:
            await self.send_msg(status='driver-changed',
                                val=self.current_driver_peerid,
                                recipient_peers=[src_peer_id])

    async def send_webrtc_msg(self, msg_dict, msg_metadata):
        """
        send a message to a list of peers (via the unix socket -> golang relay).
        msg_dict:a dict containing the message data to be sent to the peer and
        msg_metadata and sends the message to the unix socket
        """

        if self.msg_named_pipe.is_open():

            # generate the output message:
            reply_message = json.dumps(
                msg_metadata) + self.MESSAGE_METADATA_SEPARATOR + json.dumps(
                    msg_dict)
            log.debug("Sending Reply: " + reply_message)
            await self.msg_named_pipe.write_message(reply_message)

    async def send_msg(self,
                       status="",
                       val=None,
                       cid=None,
                       recipient_peers=[]):
        """
        send a message to a list of peers (via the unix socket -> golang relay).
        """
        msgDict = {'status': status}
        if (val != None):
            msgDict["val"] = val
        if (cid != None):
            msgDict["cid"] = cid
        return await self.send_webrtc_msg(msgDict,
                                          {'TargetPeerIds': recipient_peers})

    async def send_metadata_msg(self, msg_metadata, recipient_peer_ids):
        """
        send a metadata message to the golang relay.
        msg_metadata: and sends the message to the unix socket
        """
        # add the target peer ids to the outgoing message metadata:
        msg_metadata.setdefault('TargetPeerIds', recipient_peer_ids)
        return await self.send_webrtc_msg({}, msg_metadata)

    async def handle_normal_actions(self, src_peer_id, action, action_value,
                                    msg_cid):

        if action == "ping":
            self.last_ping_recived_time = time.time()
            # send back the same timestamp from the ping with the status "pong"
            await self.send_msg(status='pong',
                                val=action_value,
                                cid=msg_cid,
                                recipient_peers=[src_peer_id])

        elif action == "password_attempt":
            # send back the result of the password attempt
            (challenge_result,
             authToken) = self.password_challenge(action_value, src_peer_id)
            await self.send_msg(status=challenge_result,
                                val=authToken,
                                cid=msg_cid,
                                recipient_peers=[src_peer_id])

        elif action == "authtoken_attempt":
            challenge_result = self.auth_token_challenge(
                action_value, src_peer_id)
            await self.send_msg(status=challenge_result,
                                cid=msg_cid,
                                recipient_peers=[src_peer_id])

        elif action == "prove_trusted_rov":
            signature = signTrustedRovChallenge(action_value)
            await self.send_msg(status="done",
                                val=signature,
                                cid=msg_cid,
                                recipient_peers=[src_peer_id])

        # -- golang relay commands:
        elif action == "begin_video_stream":
            # send the *golang* code (note the action is in reply_metadata) the begin_video_stream command
            startVideo, streamUrl = self.media_controller.start_source_stream()
            await self.send_metadata_msg(
                {
                    "Action": "Media_Call_Peer",
                    "Params": ["FRONTCAM", "video/h264", streamUrl]
                },
                recipient_peers=[src_peer_id])
            # await startVideo
            print("begin_video_stream: " + streamUrl)

        elif action in [
                "rov_status_report",
        ]:
            # all of these actions call shell commands and can be found in command_api.py
            msgGenerator = generate_webrtc_format_response(msg_cid, action)
            async for msg_data in msgGenerator:
                msg_data.setdefault("TargetPeerIds", [src_peer_id])
                await self.send_webrtc_msg(msg_data, {})

        else:
            return False

        return True

    async def handle_authenticated_actions(self, src_peer_id, action,
                                           action_value, msg_cid):
        """
        handle actions that require an authenticated peer (one who as previously entered thec correct password):
        """

        if not action_value in [
                "take_control", "take_photo", "start_video_rec",
                "stop_video_rec", "shutdown_rov", "reboot_rov", "enable_wifi",
                "disable_wifi", "rov_logs", "pull_rov_github_code",
                "restart_rov_services", "cancel_action"
        ]:
            return False

        elif (not self.check_if_peer_is_authenticated(src_peer_id)):
            # if the sender is not authenticated, send back the password-required message along with this rov's unique id
            await self.send_msg(status='password-required',
                                val=getRovUUID(),
                                cid=msg_cid,
                                recipient_peers=[src_peer_id])

        elif action == "take_control" and self.current_driver_peerid != src_peer_id:
            self.current_driver_peerid = src_peer_id
            # if the authenticated peer is trying to take control of the ROV, set their peer id to be the designated driver peer id "curent_driver_peerid"
            # Let all connected peers know that the designated driver has changed (empty list at end = send to all connected peers)
            await self.send_msg(status='driver-changed',
                                val=self.current_driver_peerid,
                                recipient_peers=[])

        elif action == 'take_photo':
            print("TODO: take_photo")
            # send reply to just the sender
            await self.send_msg(status='done',
                                cid=msg_cid,
                                recipient_peers=[src_peer_id])

        elif action == 'start_video_rec':
            print("TODO: start_video_rec")
            # send reply to just the sender
            await self.send_msg(status='done',
                                cid=msg_cid,
                                recipient_peers=[src_peer_id])

        elif action == 'stop_video_rec':
            print("TODO: stop_video_rec")
            # send reply to just the sender
            await self.send_msg(status='done',
                                cid=msg_cid,
                                recipient_peers=[src_peer_id])

        # all of the other actions call shell commands and can be found in command_api.py
        else:
            msgGenerator = generate_webrtc_format_response(msg_cid, action)
            async for msg_data in msgGenerator:
                msg_data.setdefault("TargetPeerIds", [src_peer_id])
                await self.send_webrtc_msg(msg_data, {})

        return True

    async def handle_driver_only_actions(self, src_peer_id, action,
                                         action_value, msg_cid):
        """
        Handle actions that only the designated rov driver can do.
        !!! The driver may not nececsarilly be an authenticated peer !!!!
        For example the system will hand driver control to the last connected person if the real driver disconnects, so at least someone is always driving:
        To to take control hovever, a peer must be authenticated
        """

        if not action_value in ["move", "toogle_lights"]:
            return False

        elif (not self.current_driver_peerid == src_peer_id):
            # if the sender is not the driver, send back the not a driver error message
            await self.send_msg(status='error',
                                val='You must be the ROV driver first!',
                                cid=msg_cid,
                                recipient_peers=[src_peer_id])

        elif action == "move":
            # update the rov motion
            self.motion_ctrl.set_rov_motion(
                thrust_vector=action_value['thrustVector'],
                turn_rate=action_value['turnRate'])

        elif action == "toggle_lights":
            print("TODO: Toggle lights")
            pass

        return True

    async def socket_incoming_message_handler_loop(self):
        """
        Waits for new messages to be recieved on the socket and then does whatever action the message contains.
        :param socket_datachannel: the unix socket class with a queue of recived messages from the socket in utf-8 text.
        """

        # loop infinitely:
        while True:

            # get the next message from the socket and parse it into some dicts and data:
            message = await self.msg_named_pipe.get_next_message()
            metadata, msg_dict = self.parse_socket_message(message)
            src_peer_id = await self.handle_messsage_metadata(metadata)

            if (metadata == None or msg_dict == None or len(msg_dict) == 0):
                continue

            # extract relevant message params
            action = msg_dict.get('action', None)
            action_value = msg_dict.get('val', None)
            msg_cid = msg_dict.get('cid', None)

            if (action == None):
                continue

            #Debug
            print("src_peerid: " + src_peer_id, "action: " + str(action),
                  "action_value: " + str(action_value),
                  "msg_cid: " + str(msg_cid))

            # These actions can be done by any peer
            if True == await self.handle_normal_actions(
                    src_peer_id, action, action_value, msg_cid):
                continue

            # These actions require that the peer that sent the message is the designated driver:
            elif True == await self.handle_driver_only_actions(
                    src_peer_id, action, action_value, msg_cid):
                continue

            # All following actions require the peer that sent the message to be authenticated (have correctly done password challenge before)
            elif True == await self.handle_authenticated_actions(
                    src_peer_id, action, action_value, msg_cid):
                continue

            # handle action requests that are invalid (do not contain the required action parameter or an unknonw action param):
            await self.send_msg(status='error',
                                val='No action specified' if action == None
                                else 'Unknown action: ' + action,
                                cid=msg_cid,
                                recipient_peers=[])

    async def socket_update_message_sender_loop(self):
        while True:

            # Cut motors & keep looping if no one is connected to the rov (safety feature):
            if self.current_driver_peerid == None:
                self.motion_ctrl.set_rov_motion(thrust_vector=[0, 0, 0],
                                                turn_rate=0)
                # # if no one is connected continue looping
                await asyncio.sleep(0.5)
                continue

            # Find any peers who haven't sent a mesage recently
            for peerId in self.known_peers:
                peerDetails = self.known_peers[peerId]
                if time.time() - peerDetails["lastRecivedMsgTime"] > 1.2:

                    # If we haven't recieved any messages recently from the driver, cut the motors (safety feature):
                    if peerId == self.current_driver_peerid:
                        self.motion_ctrl.set_rov_motion(
                            thrust_vector=[0, 0, 0], turn_rate=0)

                    # send a heartbeat message to help the website know that the datachannel is open (assuming the message gets through)
                    await self.send_msg(status="Heartbeat",
                                        val=time.time(),
                                        cid=None,
                                        recipient_peers=[peerId])

            # get sensor updates from all sensors:
            sensorUpdates = self.sensor_ctrl.get_sensor_update_dict()

            # send sensor update (unless it is empty) to all connected peers
            if (len(sensorUpdates) != 0):
                await self.send_msg(status="sensor-update",
                                    val=sensorUpdates,
                                    recipient_peers=["all"])

            await asyncio.sleep(1)

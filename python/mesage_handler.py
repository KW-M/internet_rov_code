import time
import json
import logging
import asyncio

from command_api import generate_webrtc_format_response
from config_reader import program_config
from grpc_client import Relay_GRPC_Client
from rovSecurity.userAuth import generateAuthToken, getRovUUID, checkTokenValidty

############################
###### setup logging #######

log = logging.getLogger(__name__)


class MessageHandler:

    relay_grpc: Relay_GRPC_Client = None

    def __init__(self, relay_grpc: Relay_GRPC_Client, media_controller,
                 motion_controller, sensor_controller):
        self.relay_grpc = relay_grpc
        self.media_controller = media_controller
        self.motion_ctrl = motion_controller
        self.sensor_ctrl = sensor_controller
        self.last_ping_recived_time = 0

        # --- Variables to keep track of who is allowed to drive the rov ---
        # --- & who can take over, send command and which client peers to send replys to: ---
        self.current_driver_peerid = None
        # known_peers | format: { "some_peer_id": { "connected": True,  "authToken": None,  "lastRecivedMsgTime": time.time() } }
        self.known_peers = {}

        # constants
        self.MESSAGE_METADATA_SEPARATOR = program_config.get(
            'MessageMetadataSeparator', '|"|')

    def check_if_peer_is_authenticated(self, peer_id):
        '''
        Returns true if the given peer has provided a valid authentication token this session.'''
        authToken = self.known_peers.get(peer_id, {}).get("authToken", None)
        return checkTokenValidty(authToken)

    def password_challenge(self, password, src_peer_id):
        correct_password = program_config.get(
            'RovControlPassword', 'Set a password in the config file')

        if password != correct_password:
            return ('password-invalid', None)

        authToken = generateAuthToken()
        self.known_peers[src_peer_id]["authToken"] = authToken
        return ('password-accepted', authToken)

    def auth_token_challenge(self, authToken, src_peer_id):
        if not checkTokenValidty(authToken):
            return 'password-required'

        self.known_peers[src_peer_id]["authToken"] = authToken
        return 'token-accepted'

    def find_first_connected_peer(self) -> str:
        for peerid, peerDetails in self.known_peers.items():
            if peerDetails["connected"] is True:
                return peerid
        return None

    def parse_message_payload(self, message_payload: bytes):
        """
        Parse a message from the socket and return a dict of the message metadata and the message data.
        :param message_payload: the message payload to parse as bytes
        :return: the decoded message data as a dict
        """

        try:
            # decode message payload as a json string.
            message_data = json.loads(str(message_payload, 'utf-8'))
            return message_data

        except json.JSONDecodeError:
            log.warning(
                'Received unix socket message with invalid JSON format: %s',
                str(message_payload, 'utf-8'))
            return None

        except Exception as error:
            log.error(error, exc_info=True)
            return None

    async def change_driver(self, new_driver_peer_id):
        if self.current_driver_peerid != new_driver_peer_id:
            self.current_driver_peerid = new_driver_peer_id
            # Let all connected peers know that the designated driver peer has changed:
            await self.send_msg(status="driver-changed",
                                val=self.current_driver_peerid,
                                recipient_peers=["*"])

    async def handle_peer_disconnected_message(self, src_peer_id: str):
        log.info("A client peer has DISconnected: %s", src_peer_id)

        # reset the current driver peerid if the driver just disconnected:
        if self.current_driver_peerid == src_peer_id:
            self.change_driver(self.find_first_connected_peer())

        if src_peer_id in self.known_peers:
            self.known_peers[src_peer_id]["authToken"] = None
            self.known_peers[src_peer_id]["connected"] = False

    async def handle_peer_connected_message(self, src_peer_id: str):
        log.info("A client peer has connected: %s", src_peer_id)
        if src_peer_id in self.known_peers:
            self.known_peers[src_peer_id]["connected"] = True
        else:
            self.known_peers[src_peer_id] = {
                "connected": True,
                "authToken": None,
                "lastRecivedMsgTime": time.time(),
            }
        if self.current_driver_peerid is None:
            self.change_driver(src_peer_id)
        else:
            # Let the connecting peer know who the designated driver is:
            await self.send_msg(status='driver-changed',
                                val=self.current_driver_peerid,
                                recipient_peers=[src_peer_id])

    async def send_msg(
        self,
        recipient_peers=None,
        status="",
        val=None,
        cid=None,
    ):
        """
        send a message to a list of peers (via the unix socket -> golang relay).
        """
        msg_dict = {'status': status}
        if (val is not None):
            msg_dict["val"] = val
        if (cid is not None):
            msg_dict["cid"] = cid
        if (recipient_peers is None):
            recipient_peers = ["*"]
        return await self.relay_grpc.send_message(
            payload=bytes(json.dumps(msg_dict), 'utf-8'),
            target_peer_ids=recipient_peers)

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

        # -- golang relay commands:
        elif action == "begin_video_stream":
            # send the *golang* code (note the action is in reply_metadata) the begin_video_stream command
            _, streamUrl = self.media_controller.start_source_stream()
            await self.relay_grpc.call(track_name="FRONT_ROV_CAM",
                                       mime_type="video/h264",
                                       rtp_source_url=streamUrl,
                                       target_peer_ids=[src_peer_id])
            # await startVideo
            print("begin_video_stream: " + streamUrl)

        elif action in [
                "rov_status_report",
        ]:
            # all of these actions call shell commands and can be found in command_api.py
            msgGenerator = generate_webrtc_format_response(msg_cid, action)
            async for msg_data in msgGenerator:
                await self.relay_grpc.send_message(
                    payload=bytes(json.dumps(msg_data), 'utf-8'),
                    target_peer_ids=[src_peer_id])

        else:
            return False

        return True

    async def handle_authenticated_actions(self, src_peer_id, action,
                                           action_value, msg_cid):
        """
        handle actions that require an authenticated peer (one who as previously entered thec correct password):
        """

        if action not in [
                "take_control", "take_photo", "start_video_rec",
                "stop_video_rec", "shutdown_rov", "reboot_rov", "enable_wifi",
                "disable_wifi", "rov_logs", "restart_rov_services"
        ]:
            return False

        if (not self.check_if_peer_is_authenticated(src_peer_id)):
            # if the sender is not authenticated, send back the password-required message along with this rov's unique id
            await self.send_msg(status='password-required',
                                val=getRovUUID(),
                                cid=msg_cid,
                                recipient_peers=[src_peer_id])

        elif action == "take_control" and self.current_driver_peerid != src_peer_id:
            self.current_driver_peerid = src_peer_id
            # if the authenticated peer is trying to take control of the ROV, set their peer id to be the designated driver peer id "curent_driver_peerid"
            # Let all connected peers know that the designated driver has changed
            await self.send_msg(status='driver-changed',
                                val=self.current_driver_peerid,
                                recipient_peers=["*"])

        elif action == 'take_photo':
            print("TODO: take_photo %s", action_value)
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
                await self.relay_grpc.send_message(
                    payload=bytes(json.dumps(msg_data), 'utf-8'),
                    target_peer_ids=[src_peer_id])

        return True

    async def handle_driver_only_actions(self, src_peer_id, action,
                                         action_value, msg_cid):
        """
        Handle actions that only the designated rov driver can do.
        !!! The driver may not nececsarilly be an authenticated peer !!!!
        For example the system will hand driver control to the last connected person if the real driver disconnects, so at least someone is always driving:
        To to take control hovever, a peer must be authenticated
        """

        if action not in ["move", "toogle_lights"]:
            return False

        if (not self.current_driver_peerid == src_peer_id):
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

        return True

    # pylint: disable=unused-argument
    async def handle_incoming_msg(self,
                                  msg_payload: bytes,
                                  src_peer_id,
                                  exchange_id=None,
                                  relay_peer_number=0):
        """
        Handle incoming messages from all peers
        :param msg_payload: the message payload bytes
        :param src_peer_id: the peer id of the sender
        :param exchange_id: the exchange id of the message
        :param relay_peer_number: the number of the webrtc-relay relay peer that the message came through
        """

        msg_dict = self.parse_message_payload(msg_payload)
        if msg_dict is None or len(msg_dict) == 0:
            return

        # extract relevant message params
        action = msg_dict.get('action', None)
        action_value = msg_dict.get('val', None)
        msg_cid = msg_dict.get('cid', None)

        #Debug
        print(
            "src_peerid:" + src_peer_id,
            " | action:" + str(action) + " | action_value:" +
            str(action_value) + " | msg_cid:" + str(msg_cid))

        # These actions can be done by any peer
        if await self.handle_normal_actions(src_peer_id, action, action_value,
                                            msg_cid):
            return

        # These actions require that the peer that sent the message is the designated driver:
        if await self.handle_driver_only_actions(src_peer_id, action,
                                                 action_value, msg_cid):
            return

        # All following actions require the peer that sent the message to be authenticated (have correctly done password challenge before)
        if await self.handle_authenticated_actions(src_peer_id, action,
                                                   action_value, msg_cid):
            return

        # handle action requests that are invalid (do not contain the required action parameter or an unknonw action param):
        await self.send_msg(status='error',
                            val='No action specified'
                            if action is None else 'Unknown action: ' + action,
                            cid=msg_cid,
                            recipient_peers=["*"])

    async def update_sender_loop(self):
        while True:

            # Cut motors & keep looping if no one is connected to the rov (safety feature):
            if self.current_driver_peerid is None:
                self.motion_ctrl.stop_motors()
                # # if no one is connected continue looping
                await asyncio.sleep(0.5)
                continue

            # Find any peers who haven't sent a mesage recently
            for peerId, peerDetails in self.known_peers.items():
                if time.time() - peerDetails["lastRecivedMsgTime"] > 2:

                    # If we haven't recieved any messages recently from the driver, cut the motors (safety feature):
                    if peerId == self.current_driver_peerid:
                        self.motion_ctrl.stop_motors()

            # get sensor updates from all sensors:
            sensorUpdates = self.sensor_ctrl.get_sensor_update_dict()

            if (len(sensorUpdates) != 0):
                # sensorUpdates has some values, send them to all connected peers
                await self.send_msg(status="sensor-update",
                                    val=sensorUpdates,
                                    recipient_peers=["*"])
                await asyncio.sleep(0.02)
            else:
                # otherwise send a heartbeat message to help the website clients know that the datachannel is still open
                await self.send_msg(status="Heartbeat",
                                    val=time.time(),
                                    cid=None,
                                    recipient_peers=["*"])
                await asyncio.sleep(1)

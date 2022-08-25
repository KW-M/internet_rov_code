import time
import json
import logging
import asyncio

from command_api import generate_webrtc_format_response

############################
###### setup logging #######

log = logging.getLogger(__name__)


class MessageHandler:
    def __init__(self, msg_named_pipe, media_controller, motion_controller,
                 sensor_controller, program_config):
        self.msg_named_pipe = msg_named_pipe
        self.media_controller = media_controller
        self.motion_ctrl = motion_controller
        self.sensor_ctrl = sensor_controller
        self.program_config = program_config
        self.last_ping_recived_time = 0

        # --- Variables to keep track of who is allowed to drive the rov & who can take over / send debug commands and which client peers to send replys to: ---
        self.current_driver_peerid = None
        self.connected_peerids = []
        self.authenticated_peerids = {}

        # constants
        self.MESSAGE_METADATA_SEPARATOR = program_config.get(
            'MessageMetadataSeparator', '|"|')
        self.PASSWORD_INACTIVITY_TIMEOUT = self.program_config.get(
            'DisconnectedDriverAuthTimeout', 180)

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

        driver_has_changed = False
        src_peer_id = None

        # handle the metadata:
        if metadata is not None and "SrcPeerId" in metadata:
            src_peer_id = metadata["SrcPeerId"]

            # check if a connected or disconnected event happened:
            if "PeerEvent" in metadata:
                if metadata["PeerEvent"] == "Connected":
                    self.connected_peerids.append(src_peer_id)
                    log.info("A client peer has connected: " + src_peer_id)

                elif metadata["PeerEvent"] == "Disconnected":
                    log.info("A client peer has DISconnected: " + src_peer_id)
                    self.connected_peerids.remove(src_peer_id)
                    if src_peer_id in self.authenticated_peerids:
                        self.authenticated_peerids[src_peer_id] = time.time()
                    if src_peer_id == self.current_driver_peerid:
                        self.current_driver_peerid = None  # reset the current driver peerid

                # handle the case when there is no current driver peerid:
                if self.current_driver_peerid == None and len(
                        self.connected_peerids) > 0:
                    self.current_driver_peerid = src_peer_id  # set the current driver peerid to the one that just connected

                # if driver_has_changed:
                #     # Let all connected peers know that the designated driver peer has changed: (empty list at end = send to all connected peers)
                await self.send_msg(
                    {
                        "status": "driver-changed",
                        'val': self.current_driver_peerid
                    }, {}, [])
                # else:
                #     # Let the connecting peer know who the designated driver is:
                #     await self.send_msg(
                #         {
                #             "status": 'driver-changed',
                #             'val': self.current_driver_peerid
                #         }, {}, [src_peer_id])

                # elif "PeerEvent" in metadata and metadata["PeerEvent"] == "Connected":
                # # Let any new connected peers know who the designated driver peer is.
                # await self.send_msg(
                #     {
                #         "status": 'driver-changed',
                #         'val': self.current_driver_peerid
                #     }, {}, [src_peer_id])

        return src_peer_id

    def check_if_peer_is_authenticated(self, peer_id):
        if (peer_id is not None and peer_id in self.authenticated_peerids):

            last_action_time = time.time() if self.authenticated_peerids[
                peer_id] == True else self.authenticated_peerids[peer_id]

            if time.time(
            ) - last_action_time < self.PASSWORD_INACTIVITY_TIMEOUT:
                return True
            else:
                log.info("Authentication timeout for peerid: " + peer_id)
                del self.authenticated_peerids[peer_id]

        return False

    def password_challenge(self, password, src_peer_id):
        correct_password = self.program_config.get(
            'DriverControlPassword', 'You Should Set This In The Config File')
        print("Password: " + password, "Correct Password: " + correct_password)
        if password == correct_password:
            self.authenticated_peerids[src_peer_id] = True
            return 'password-accepted'
        else:
            return 'password-invalid'

    async def send_msg(self, msg_dict, msg_metadata, recipient_peer_ids):
        """
        send a message to a list of peers (via the unix socket -> golang relay).
        msg_dict:a dict containing the message data to be sent to the peer and
        msg_metadata and sends the message to the unix socket
        """

        if self.msg_named_pipe.is_open():

            # add the target peer ids to the outgoing message metadata:
            msg_metadata.setdefault('TargetPeerIds', recipient_peer_ids)

            # generate the output message:
            reply_message = json.dumps(
                msg_metadata) + self.MESSAGE_METADATA_SEPARATOR + json.dumps(
                    msg_dict)
            log.debug("Sending Reply: " + reply_message)
            await self.msg_named_pipe.write_message(reply_message)

    async def handle_normal_actions(self, src_peer_id, action, actionValue,
                                    msg_cid):

        if action == "ping":
            self.last_ping_recived_time = time.time()
            # send back the same timestamp from the ping with the status "pong"
            await self.send_msg(
                {
                    'status': 'pong',
                    'val': actionValue,
                    'cid': msg_cid
                }, {}, [src_peer_id])

        elif action == "password_attempt":
            # send back the result of the password attempt
            challenge_result = self.password_challenge(actionValue,
                                                       src_peer_id)
            await self.send_msg({
                'status': challenge_result,
                'cid': msg_cid
            }, {}, [src_peer_id])

        elif action in [
                "rov_status_report",
        ]:
            # all of these actions call shell commands and can be found in command_api.py
            msgGenerator = generate_webrtc_format_response(msg_cid, action)
            async for msg_data in msgGenerator:
                await self.send_msg(msg_data, {}, [src_peer_id])

        # -- golang relay commands:
        elif action == "begin_video_stream":
            # send the *golang* code (note the action is in reply_metadata) the begin_video_stream command
            startVideo, streamUrl = self.media_controller.start_source_stream()
            await self.send_msg({}, {
                "Action": "Media_Call_Peer",
                "Params": ["FRONTCAM", "video/h264", streamUrl]
            }, [src_peer_id])
            # await startVideo
            print("begin_video_stream: " + streamUrl)

    async def handle_authenticated_actions(self, src_peer_id, action,
                                           actionValue, msg_cid):

        # handle actions that require an authenticated peer (one who as previously entered thec correct password):
        sending_peer_is_authenticated = self.check_if_peer_is_authenticated(
            src_peer_id)

        if (not sending_peer_is_authenticated):
            # if the sender is not authenticated, send back the password-required message
            await self.send_msg({
                'status': 'password-required',
                'cid': msg_cid
            }, {}, [src_peer_id])

        elif action == "take_control":
            # if the authenticated peer is trying to take control of the ROV, set their peer id to be the designated driver peer id "curent_driver_peerid"
            self.current_driver_peerid = src_peer_id
            # Let all connected peers know that the designated driver has changed (empty list at end = send to all connected peers)
            await self.send_msg(
                {
                    'status': 'driver-changed',
                    'val': src_peer_id,
                }, {}, [])

        elif action == 'take_photo':
            print("TODO: take_photo")
            await self.send_msg({
                'status': 'done',
                'cid': msg_cid
            }, {}, [src_peer_id])  # send reply to just the sender

        elif action == 'start_video_rec':
            print("TODO: start_video_rec")
            await self.send_msg({
                'status': 'done',
                'cid': msg_cid
            }, {}, [src_peer_id])  # send reply to just the sender

        elif action == 'stop_video_rec':
            print("TODO: stop_video_rec")
            await self.send_msg({
                'status': 'done',
                'cid': msg_cid
            }, {}, [src_peer_id])  # send reply to just the sender

        elif action in [
                "shutdown_rov",
                "reboot_rov",
                "enable_wifi",
                "disable_wifi",
                "rov_logs",
                "pull_rov_github_code",
                "restart_rov_services",
        ]:
            # all of these actions call shell commands and can be found in command_api.py
            msgGenerator = generate_webrtc_format_response(msg_cid, action)
            async for msg_data in msgGenerator:
                await self.send_msg(msg_data, {}, [src_peer_id])

    async def handle_driver_only_actions(self, src_peer_id, action,
                                         action_value, msg_cid):
        """
        Handle actions that only the designated rov driver can do.
        The driver must also be an authenticated peer (one who as previously entered the correct password):
        """

        sending_peer_is_authenticated = self.check_if_peer_is_authenticated(
            src_peer_id)
        sending_peer_is_driver = (src_peer_id == self.current_driver_peerid)

        if (not sending_peer_is_driver):
            # if the sender is not the driver, send back the not a driver error message
            error_msg = 'You must be the ROV driver before using the ' + action + ' action'
            await self.send_msg(
                {
                    'status': 'error',
                    'val': error_msg,
                    'cid': msg_cid
                }, {}, [src_peer_id])

        elif (not sending_peer_is_authenticated):
            # if the sender is not authenticated, send back the password-required message
            await self.send_msg({
                'status': 'password-required',
                'cid': msg_cid
            }, {}, [src_peer_id])

        elif action == "move":
            self.motion_ctrl.set_rov_motion(
                thrust_vector=action_value['thrustVector'],
                turn_rate=action_value['turnRate'])
            self.last_move_message_time = time.time()

        elif action == "toggle_lights":
            print("TODO: Toggle lights")
            pass

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

            print("src_peerid: " + src_peer_id, "action: " + action,
                  "action_value: " + str(action_value),
                  "msg_cid: " + str(msg_cid))

            # These actions can be done by any peer
            if action in [
                    "ping", "begin_video_stream", "rov_status_report",
                    "password_attempt"
            ]:
                await self.handle_normal_actions(src_peer_id, action,
                                                 action_value, msg_cid)

            # All following actions require the peer that sent the message to be authenticated (have correctly done password challenge before)
            elif action in [
                    "take_control",
                    "take_photo",
                    "start_video_rec",
                    "stop_video_rec",
                    "shutdown_rov",
                    "reboot_rov",
                    "enable_wifi",
                    "disable_wifi",
                    "rov_logs",
                    "pull_rov_github_code",
                    "restart_rov_services",
            ]:
                await self.handle_authenticated_actions(
                    src_peer_id, action, action_value, msg_cid)

            # These actions require the peer that sent the message to be the designated driver and be authenticated (have correctly done password challenge before)
            elif action in ["move", "toggle_lights"]:
                await self.handle_driver_only_actions(src_peer_id, action,
                                                      action_value, msg_cid)

            # handle action requests that are invalid (do not contain the required action parameter):
            elif action == None:
                await self.send_msg(
                    {
                        "status": 'error',
                        'val': 'No action specified',
                        'cid': msg_cid
                    }, {}, [])

            # handle action requests that are invalid (contain an unknown value for the action parameter):
            else:
                await self.send_msg(
                    {
                        "status": 'error',
                        'val': 'Unknown action: ' + action,
                        'cid': msg_cid,
                    }, {}, [])

    async def socket_update_message_sender_loop(self):
        while True:

            # cut motors & keep looping if no one is connected to the rov or we haven't recieved ping message recently (safety feature):
            if len(self.connected_peerids
                   ) == 0 or time.time() - self.last_ping_recived_time > 1.2:
                self.motion_ctrl.set_rov_motion(thrust_vector=[0, 0, 0],
                                                turn_rate=0)
                await asyncio.sleep(0.5)
                continue

            # get sensor updates from all sensors:
            sensorUpdates = self.sensor_ctrl.get_sensor_update_dict()

            # send sensor update (unless it is empty) to all connected peers
            if (sensorUpdates.__len__() != 0):
                await self.send_msg(
                    {
                        "status": "sensor-update",
                        "val": sensorUpdates
                    }, {}, ["all"])

            await asyncio.sleep(1)

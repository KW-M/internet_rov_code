import time
import json
import logging
import asyncio

from command_api import generate_webrtc_format_response

############################
###### setup logging #######

log = logging.getLogger(__name__)


class MessageHandler:
    def __init__(self, unix_socket, motion_controller, sensor_controller,
                 program_config):
        self.unix_socket = unix_socket
        self.motion_ctrl = motion_controller
        self.sensor_ctrl = sensor_controller
        self.program_config = program_config

        # --- Variables to keep track of who is allowed to drive the rov & who can take over / send debug commands and which client peers to send replys to: ---
        self.current_pilot_peerid = None
        self.connected_peerids = []
        self.authenticated_peerids = {}

        # constants
        self.MESSAGE_METADATA_SEPARATOR = program_config.get(
            'message-metadata-separator', '|"|')
        self.PASSWORD_INACTIVITY_TIMEOUT = self.program_config.get(
            'pilot-disconnected-pasword-timeout', 180)

    def parse_socket_message(self, message):
        """
        Parse a message from the socket and return a dict of the message metadata and the message data.
        :param message:
        :return:
        """

        message_metadata_separator_index = message.find(
            self.MESSAGE_METADATA_SEPARATOR)
        if message_metadata_separator_index == -1:
            log.error(
                "Could not find message metadata separator in socket message: "
                + message)
            return (None, None)

        try:
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

        pilot_has_changed = False
        src_peer_id = None

        # handle the metadata:
        if "SrcPeerId" in metadata:
            src_peer_id = metadata["SrcPeerId"]

            # check if a connected or disconnected event happened:
            if "Event" in metadata:
                if metadata["Event"] == "Connected":
                    self.connected_peerids.append(src_peer_id)
                elif metadata["Event"] == "Disconnected":
                    self.connected_peerids.remove(src_peer_id)
                    if src_peer_id in self.authenticated_peerids:
                        self.authenticated_peerids[src_peer_id] = time.time()
                    if src_peer_id == self.current_pilot_peerid:
                        self.current_pilot_peerid = None  # reset the current pilot peerid

            # handle the case when there is no current pilot peerid:
            if self.current_pilot_peerid == None and len(
                    self.connected_peerids) > 0:
                self.current_pilot_peerid = self.connected_peerids[
                    0]  # set the current pilot peerid
                pilot_has_changed = True

        if pilot_has_changed:
            # Let all connected peers know that the designated pilot peer has changed: (empty list at end = send to all connected peers)
            await self.send_msg(
                {
                    "status": 'pilot-changed',
                    'val': self.current_pilot_peerid
                }, {}, [])

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
            'pilot-control-password', 'You Should Set This In The Config File')
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

        if self.unix_socket.socket_open:

            # add the target peer ids to the outgoing message metadata:
            msg_metadata.setdefault('TargetPeerIds', recipient_peer_ids)

            # generate the output message:
            reply_message = json.dumps(
                msg_metadata) + self.MESSAGE_METADATA_SEPARATOR + json.dumps(
                    msg_dict)
            log.debug("Sending Reply: " + reply_message)
            await self.unix_socket.messages_to_send_to_socket_queue.put(
                reply_message)

    async def handle_normal_actions(self, src_peer_id, action, actionValue,
                                    msg_cid):

        if action == "ping":
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
            await self.send_msg({'status': challenge_result}, {},
                                [src_peer_id])

        elif action in [
                "rov_status_report",
                "restart_rov_services",
                "pull_rov_github_code",
        ]:
            # all of these actions call shell commands and can be found in command_api.py
            msgGenerator = generate_webrtc_format_response(msg_cid, action)
            async for msg_data in msgGenerator:
                await self.send_msg(msg_data, {}, [src_peer_id])

        # -- golang relay commands:
        elif action == "begin_livestream":
            # send the *golang* code (note the action is in reply_metadata) the begin_livestream command
            await self.send_msg({}, {"Action": "begin_livestream"},
                                [src_peer_id])

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
            # if the authenticated peer is trying to take control of the ROV, set their peer id to be the designated pilot peer id "curent_pilot_peerid"
            self.current_pilot_peerid = src_peer_id
            # Let all connected peers know that the designated pilot has changed (empty list at end = send to all connected peers)
            await self.send_msg(
                {
                    'status': 'pilot-changed',
                    'val': src_peer_id,
                    'cid': msg_cid
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
        ]:
            # all of these actions call shell commands and can be found in command_api.py
            msgGenerator = generate_webrtc_format_response(msg_cid, action)
            async for msg_data in msgGenerator:
                await self.send_msg(msg_data, {}, [src_peer_id])

    async def handle_pilot_only_actions(self, src_peer_id, action,
                                        action_value, msg_cid):
        """
        Handle actions that only the designated rov pilot can do.
        The pilot must also be an authenticated peer (one who as previously entered the correct password):
        """

        sending_peer_is_authenticated = self.check_if_peer_is_authenticated(
            src_peer_id)
        sending_peer_is_pilot = (src_peer_id == self.current_pilot_peerid)

        if (not sending_peer_is_authenticated):
            # if the sender is not authenticated, send back the password-required message
            await self.send_msg({
                'status': 'password-required',
                'cid': msg_cid
            }, {}, [src_peer_id])

        elif (not sending_peer_is_pilot):
            # if the sender is not the pilot, send back the not a pilot error message
            error_msg = 'You must be the ROV pilot before using the ' + action + ' action'
            await self.send_msg(
                {
                    'status': 'error',
                    'val': error_msg,
                    'cid': msg_cid
                }, {}, []
            )  # send to all connected peers (empty list at end = send to all connected peers)

        elif action == "move":
            self.motion_ctrl.set_rov_motion(
                thrust_vector=action_value['thrustVector'],
                turn_rate=action_value['turnRate'])

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
            message = await self.unix_socket.messages_from_socket_queue.get()
            metadata, msg_dict = self.parse_socket_message(message)
            src_peer_id = await self.handle_messsage_metadata(metadata)

            if (metadata is None or msg_dict is None or len(msg_dict) is 0):
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
                    "ping", "begin_livestream", "rov_status_report",
                    "rov_logs", "pull_rov_github_code", "password_attempt"
            ]:
                await self.handle_normal_actions(src_peer_id, action,
                                                 action_value, msg_cid)

            # All following actions require the peer that sent the message to be authenticated (have correctly done password challenge before)
            elif action in [
                    "take_control",
                    "take_photo",
                    "start_video_rec",
                    "stop_video_rec",
                    "restart_rov_services",
                    "shutdown_rov",
                    "reboot_rov",
                    "enable_wifi",
                    "disable_wifi",
            ]:
                await self.handle_authenticated_actions(
                    src_peer_id, action, action_value, msg_cid)

            # These actions require the peer that sent the message to be the designated pilot and be authenticated (have correctly done password challenge before)
            elif action in ["move", "toggle_lights"]:
                await self.handle_pilot_only_actions(src_peer_id, action,
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

            sensorUpdates = self.sensor_ctrl.get_sensor_update_dict()
            # send to all connected peers (empty list at end)
            await self.send_msg(sensorUpdates, {}, [])
            await asyncio.sleep(1)

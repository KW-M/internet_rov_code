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

    def handle_messsage_metadata(self, metadata):

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
            # True: pilot has changed, srcPeerId: who sent this message
            return (True, src_peer_id)
        else:
            # False: pilot has not changed, srcPeerId: who sent this message or None if there was a problem
            return (False, src_peer_id)

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
        if password == correct_password:
            self.authenticated_peerids[src_peer_id] = True
            return 'password-accepted'
        else:
            return 'password-invalid'

    async def send_msg(self, msg_dict, msg_metadata, recipient_peer_ids):
        """
        takes a message dictionary and metadata_dict and sends the message to the unix socket
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

    async def socket_incoming_message_handler_loop(self):
        """
        Waits for new messages to be recieved on the socket and then does whatever action the message contains.
        :param socket_datachannel: the unix socket class with a queue of recived messages from the socket in utf-8 text.
        """

        # loop infinitely:
        while True:

            # get the next message from the socket
            message = await self.unix_socket.messages_from_socket_queue.get()
            print("Received message: " + message)
            metadata, msg_dict = self.parse_socket_message(message)
            if (metadata is None or msg_dict is None):
                continue

            # variables to be set based on the recived metadata
            pilot_has_changed, src_peer_id = self.handle_messsage_metadata(
                metadata)

            # create empty dicts to hold the reply message data:
            reply_msg_data = {}
            reply_metadata = {}

            # let all peers know if the designated pilot peer has changed:
            if pilot_has_changed:
                reply_msg_data['status'] = 'pilotHasChanged'
                reply_msg_data['val'] = self.current_pilot_peerid
                # send to all connected peers (empty list at end)
                await self.send_msg(reply_msg_data, reply_metadata, [])

            # send any further reply messages to the same peer that sent this message:
            if src_peer_id:
                reply_metadata['TargetPeerIds'] = [src_peer_id]

            # do the action
            action = msg_dict.get('action', None)
            actionValue = msg_dict.get('val', None)
            if action == None:
                reply_msg_data['status'] = 'error'
                reply_msg_data['val'] = 'No action specified'

            elif action == "ping":
                reply_msg_data['status'] = 'pong'
                reply_msg_data[
                    'val'] = actionValue  # send back the same ping timestamp

            elif action == "password":
                challenge_response = self.password_challenge(
                    actionValue, src_peer_id)
                reply_msg_data['status'] = challenge_response

            # all below actions requires the peer that sent the message to be authenticated (have correctly done password challenge before)
            elif self.check_if_peer_is_authenticated(src_peer_id):

                if action == "take_control":
                    self.current_pilot_peerid = src_peer_id
                    reply_msg_data['status'] = 'pilot-has-changed'
                    reply_msg_data['val'] = self.current_pilot_peerid
                    reply_metadata['TargetPeerIds'] = [
                    ]  # send to all connected peers
                    await self.send_msg(reply_msg_data, reply_metadata)
                    continue  # skip the cid copy action below

                elif action in [
                        "shutdown_rov",
                        "reboot_rov",
                        "rov_status_report"
                        "restart_rov_services",
                        "pull_rov_github_code",
                        "enable_wifi",
                        "disable_wifi",
                ]:
                    # all of these actions call shell commands and can be found in command_api.py
                    msgGenerator = generate_webrtc_format_response(
                        msgContinuityId, action)
                    async for msg_data in msgGenerator:
                        self.send_msg(msg_data, reply_metadata)

                elif action == 'take_photo':
                    print("TODO: take_photo")
                    reply_msg_data["status"] = "done"

                elif action == 'start_video_rec':
                    print("TODO: start_video_rec")
                    reply_msg_data["status"] = "done"

                elif action == 'stop_video_rec':
                    print("TODO: stop_video_rec")
                    reply_msg_data["status"] = "done"

                # all below actions require that the peer that sent the message is the current pilot (and that the peer is authenticated)
                elif self.current_pilot_peerid == src_peer_id:

                    if action == "move":
                        self.motion_ctrl.set_rov_motion(
                            thrust_vector=actionValue['thrustVector'],
                            turn_rate=actionValue['turnRate'])

                    elif action == "toggle_lights":
                        print("TODO: Toggle lights")
                        pass

                elif action in ["move", "toggle_lights"]:
                    reply_msg_data['status'] = 'error'
                    reply_msg_data[
                        'val'] = 'You must be the ROV pilot before using the ' + action + ' action'

                else:
                    reply_msg_data['status'] = 'error'
                    reply_msg_data['val'] = 'Unknown action: ' + action

            else:
                reply_msg_data['status'] = 'password-required'

            if len(reply_msg_data) > 0:  #or len(reply_metadata) > 0:
                msgContinuityId = msg_dict.get('cid', None)
                reply_msg_data['cid'] = msgContinuityId
                await self.send_msg(
                    reply_msg_data, reply_metadata, src_peer_id
                )  # send only back to the original peer (src_peer_id at end)

    async def socket_update_message_sender_loop(self):
        while True:

            # create empty dicts to hold the reply message data:
            reply_metadata = {}
            reply_msg_data = {}

            sensorUpdates = self.sensor_ctrl.get_sensor_update_dict()
            reply_msg_data.update(sensorUpdates)

            # send to all connected peers (empty list at end)
            await self.send_msg(reply_msg_data, reply_metadata, [])

            await asyncio.sleep(1)

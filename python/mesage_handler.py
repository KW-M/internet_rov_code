import time
import json
import logging
import asyncio

from sensors.sensors_controller import SensorController
from motion.motion_controller import MotionController
from media_stream_controller import MediaStreamController
from command_api import generate_continued_output_response
from config_reader import program_config
from protobuf.rov_action_api import RovAction, SensorUpdatesResponse, RovResponse, DoneResponse, DriverChangedResponse, HeartbeatResponse, betterproto, ErrorResponse, PasswordAcceptedResponse, PasswordInvalidResponse, PasswordRequiredResponse, PongResponse, TokenAcceptedResponse
from rovSecurity.userAuth import generateAuthToken, checkTokenValidty, getRovUUID

############################
###### setup logging #######

log = logging.getLogger(__name__)


class MessageHandler:

    sensor_ctrl: SensorController = None
    motion_ctrl: MotionController = None
    media_controller: MediaStreamController = None

    # relay_grpc: Relay_GRPC_Client = None

    def __init__(self, relay_grpc, media_controller, motion_controller, sensor_controller):
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
        self.MESSAGE_METADATA_SEPARATOR = program_config.get('MessageMetadataSeparator', '|"|')

    def check_if_peer_is_authenticated(self, peer_id):
        '''Returns true if the given peer has provided a valid authentication token this session.'''
        auth_token = self.known_peers.get(peer_id, {}).get("authToken", None)
        return checkTokenValidty(auth_token)

    def password_challenge(self, password, src_peer_id):
        correct_password = program_config.get('RovControlPassword', 'Set a password in the config file')

        if password != correct_password:
            return ('password-invalid', None)

        auth_token = generateAuthToken()
        self.known_peers[src_peer_id]["authToken"] = auth_token
        return ('password-accepted', auth_token)

    def auth_token_challenge(self, auth_token, src_peer_id):
        if not checkTokenValidty(auth_token):
            return 'password-required'

        self.known_peers[src_peer_id]["authToken"] = auth_token
        return 'token-accepted'

    def find_first_connected_peer(self) -> str or None:
        for peerid, peer_details in self.known_peers.items():
            if peer_details.get("connected", False) is True:
                return peerid
        return None

    def parse_message_payload(self, message_payload: bytes) -> RovAction or None:
        """
        Parse a message from the socket and return a dict of the message metadata and the message data.
        :param message_payload: the message payload to parse as bytes
        :return: the decoded message data as a dict
        """

        try:
            # decode message payload as a protobuf message:
            msg_data = RovAction().parse(message_payload)
            return msg_data
            # typechecking protobuf oneOf fields doesn't yet work: https://github.com/danielgtaylor/python-betterproto/issues/358

        except json.JSONDecodeError:
            log.warning('Received unix socket message with invalid JSON format: %s', str(message_payload, 'utf-8'))
            return None

        except Exception as error:
            log.error(error, exc_info=True)
            return None

    async def change_driver(self, new_driver_peer_id):
        if self.current_driver_peerid != new_driver_peer_id:
            self.current_driver_peerid = new_driver_peer_id
            # Let all connected peers know that the designated driver peer has changed:
            await self.send_msg(msg_data=RovResponse(driver_changed=DriverChangedResponse(driver_peer_id=self.current_driver_peerid)), recipient_peers=["*"])

    async def handle_peer_disconnected_message(self, src_peer_id: str):
        log.info("A client peer has DISconnected: %s", src_peer_id)

        # reset the current driver peerid if the driver just disconnected:
        if self.current_driver_peerid == src_peer_id:
            await self.change_driver(self.find_first_connected_peer())

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
            await self.change_driver(src_peer_id)
        else:
            # Let the connecting peer know who the designated driver is:
            await self.send_msg(msg_data=RovResponse(driver_changed=DriverChangedResponse(driver_peer_id=self.current_driver_peerid)), recipient_peers=[src_peer_id])

    async def send_msg(
        self,
        msg_data: RovResponse = None,
        recipient_peers: list[str] = None,
    ):
        """
        send a message to a list of peers (via the unix socket -> golang relay).
        """
        if (recipient_peers is None):
            recipient_peers = ["*"]
        return await self.relay_grpc.send_message(payload=msg_data.SerializeToString(), target_peer_ids=recipient_peers)

    async def handle_normal_actions(self, src_peer_id, msg_data: RovAction):

        rov_exchange_id = msg_data.rov_exchange_id

        if msg_data.is_set("ping"):
            self.last_ping_recived_time = time.time()
            # send back the same timestamp from the ping with the status "pong"
            await self.send_msg(msg_data=RovResponse(pong=PongResponse(time=msg_data.ping.time)), recipient_peers=[src_peer_id])

        elif msg_data.is_set("password_attempt"):
            # send back the result of the password attempt
            (challenge_result, auth_token) = self.password_challenge(msg_data.password_attempt.password, src_peer_id)
            # await self.send_msg(status=challenge_result, val=authToken, cid=rov_exchange_id, recipient_peers=[src_peer_id])
            if challenge_result == 'password-accepted':
                await self.send_msg(msg_data=RovResponse(password_accepted=PasswordAcceptedResponse(auth_token), rov_exchange_id=rov_exchange_id), recipient_peers=[src_peer_id])
            elif challenge_result == 'password-invalid':
                await self.send_msg(msg_data=RovResponse(password_invalid=PasswordInvalidResponse(), rov_exchange_id=rov_exchange_id), recipient_peers=[src_peer_id])

        elif msg_data.is_set("auth_token_attempt"):
            challenge_result = self.auth_token_challenge(msg_data.auth_token_attempt.token, src_peer_id)
            if challenge_result == 'token-accepted':
                await self.send_msg(msg_data=RovResponse(token_accepted=TokenAcceptedResponse(), rov_exchange_id=rov_exchange_id), recipient_peers=[src_peer_id])
            elif challenge_result == 'password-required':
                await self.send_msg(msg_data=RovResponse(password_required=PasswordRequiredResponse(), rov_exchange_id=rov_exchange_id), recipient_peers=[src_peer_id])

        elif msg_data.is_set("refresh_all_sensors"):
            sensor_updates = self.sensor_ctrl.get_all_sensor_values()
            await self.send_msg(msg_data=RovResponse(sensor_updates=SensorUpdatesResponse(measurement_updates=sensor_updates)), recipient_peers=["*"])

        # -- golang relay commands:
        elif msg_data.is_set("begin_video_stream"):
            # send the *golang* code (note the action is in reply_metadata) the begin_video_stream command
            # _, streamUrl = self.media_controller.start_source_stream()
            # await self.relay_grpc.call(track_name="FRONT_ROV_CAM",
            #                            mime_type="video/h264",
            #                            rtp_source_url=streamUrl,
            #                            target_peer_ids=[src_peer_id])
            # await startVideo
            print("begin_video_stream... (TODO: not implemented yet)")

        elif msg_data.is_set("rov_status_report"):
            # all of these actions call shell commands and can be found in command_api.py
            msg_generator = generate_continued_output_response(rov_exchange_id, msg_data)
            async for msg_data in msg_generator:
                await self.relay_grpc.send_message(payload=msg_data, target_peer_ids=[src_peer_id])

        else:
            return False

        return True

    async def handle_authenticated_actions(self, src_peer_id, msg_data: RovAction):
        """
        handle actions that require an authenticated peer (one who as previously entered thec correct password):
        """
        rov_exchange_id = msg_data.rov_exchange_id

        # pylint: disable=too-many-boolean-expressions
        if not msg_data.is_set("take_control") and not msg_data.is_set("take_photo") and not msg_data.is_set("start_video_rec") and not msg_data.is_set("stop_video_rec") and not msg_data.is_set("shutdown_rov") and not msg_data.is_set("reboot_rov") and not msg_data.is_set("enable_wifi") and not msg_data.is_set("disable_wifi") and not msg_data.is_set("rov_logs") and not msg_data.is_set("restart_rov_services"):
            return False

        if (not self.check_if_peer_is_authenticated(src_peer_id)):
            # if the sender is not authenticated, send back the password-required message along with this rov's unique id
            await self.send_msg(msg_data=RovResponse(password_required=PasswordRequiredResponse(rov_id=getRovUUID()), rov_exchange_id=rov_exchange_id), recipient_peers=[src_peer_id])

        elif msg_data.is_set("take_control") and self.current_driver_peerid != src_peer_id:
            self.current_driver_peerid = src_peer_id
            # if the authenticated peer is trying to take control of the ROV, set their peer id to be the designated driver peer id "curent_driver_peerid"
            # Let all connected peers know that the designated driver has changed
            await self.send_msg(msg_data=RovResponse(driver_changed=DriverChangedResponse(driver_peer_id=self.current_driver_peerid)), recipient_peers=["*"])

        elif msg_data.is_set("take_photo"):
            print("TODO: implement take_photo action")
            # send reply to just the sender
            await self.send_msg(msg_data=RovResponse(done=DoneResponse(), rov_exchange_id=rov_exchange_id), recipient_peers=[src_peer_id])

        elif msg_data.is_set("start_video_rec"):
            print("TODO: start_video_rec")
            # send reply to just the sender
            await self.send_msg(msg_data=RovResponse(done=DoneResponse(), rov_exchange_id=rov_exchange_id), recipient_peers=[src_peer_id])

        elif msg_data.is_set("stop_video_rec"):
            print("TODO: stop_video_rec")
            # send reply to just the sender
            await self.send_msg(msg_data=RovResponse(done=DoneResponse(), rov_exchange_id=rov_exchange_id), recipient_peers=[src_peer_id])

        # all of the other actions call shell commands and can be found in command_api.py
        else:
            msg_generator = generate_continued_output_response(rov_exchange_id, msg_data)
            async for msg_data in msg_generator:
                await self.relay_grpc.send_message(payload=msg_data, target_peer_ids=[src_peer_id])

        return True

    async def handle_driver_only_actions(self, src_peer_id, msg_data: RovAction):
        """
        Handle actions that only the designated rov driver can do.
        !!! The driver may not nececsarilly be an authenticated peer !!!!
        For example the system will hand driver control to the last connected person if the real driver disconnects, so at least someone is always driving:
        To to take control hovever, a peer must be authenticated
        """
        rov_exchange_id = msg_data.rov_exchange_id

        if not msg_data.is_set("move") and not msg_data.is_set("toogle_lights"):
            return False

        if self.current_driver_peerid != src_peer_id:
            # if the sender is not the driver, send back the not a driver error message
            await self.send_msg(msg_data=RovResponse(error=ErrorResponse(message='You must be the ROV driver first!'), rov_exchange_id=rov_exchange_id), recipient_peers=[src_peer_id])

        elif msg_data.is_set("move"):
            # update the rov motion
            vec = [msg_data.move.velocity_x, msg_data.move.velocity_y, msg_data.move.velocity_z]
            self.motion_ctrl.set_rov_motion(thrust_vector=vec, turn_rate=msg_data.move.angular_velocity_yaw)

        elif msg_data.is_set("toggle_lights"):
            print("TODO: Toggle lights")

        return True

    # pylint: disable=unused-argument
    async def handle_incoming_msg(self, msg_payload: bytes, src_peer_id, exchange_id=None, relay_peer_number=0):
        """
        Handle incoming messages from all peers
        :param msg_payload: the message payload bytes
        :param src_peer_id: the peer id of the sender
        :param exchange_id: the exchange id of the message
        :param relay_peer_number: the number of the webrtc-relay relay peer that the message came through
        """

        msg_data = self.parse_message_payload(msg_payload)
        if msg_data is None:
            return

        self.known_peers[src_peer_id]["lastRecivedMsgTime"] = time.Time()

        #Debug
        # print("src_peerid:" + src_peer_id, " | action:" + str(msg_data))

        # These actions can be done by any peer
        if await self.handle_normal_actions(src_peer_id, msg_data):
            return

        # These actions require that the peer that sent the message is the designated driver:
        if await self.handle_driver_only_actions(src_peer_id, msg_data):
            return

        # All following actions require the peer that sent the message to be authenticated (have correctly done password challenge before)
        if await self.handle_authenticated_actions(src_peer_id, msg_data):
            return

        # handle action requests that are invalid (do not contain an action parameter or an unknon action param):
        action, _ = betterproto.which_one_of(msg_data, "Body")
        await self.send_msg(msg_data=RovResponse(error=ErrorResponse(message='No action specified' if action is None else 'Unknown action: ' + action), rov_exchange_id=msg_data.rov_exchange_id), recipient_peers=["*"])

    async def update_sender_loop(self):
        while True:

            # Cut motors & keep looping if no one is connected to the rov (safety feature):
            if self.current_driver_peerid is None:
                self.motion_ctrl.stop_motors()
                # # if no one is connected continue looping
                await asyncio.sleep(0.5)
                continue

            # Find any peers who haven't sent a mesage recently
            for peer_id, peer_details in self.known_peers.items():
                if time.time() - peer_details.get("lastRecivedMsgTime", 0) > 2:
                    # If we haven't recieved any messages recently from the driver, cut the motors (safety feature):
                    if peer_id == self.current_driver_peerid:
                        self.motion_ctrl.stop_motors()
                        break

            # get sensor updates from all sensors:
            sensor_updates = self.sensor_ctrl.get_sensor_updates()

            if (len(sensor_updates) != 0):
                # Measurements has some values, send them to all connected peers
                await self.send_msg(msg_data=RovResponse(sensor_updates=SensorUpdatesResponse(measurement_updates=sensor_updates)), recipient_peers=["*"])
                await asyncio.sleep(0.002)
            else:
                # otherwise send a heartbeat message to help the website clients know that the datachannel is still open
                time_ms = int(time.time() * 1000)
                await self.send_msg(msg_data=RovResponse(heartbeat=HeartbeatResponse(time=time_ms)), recipient_peers=["*"])
                await asyncio.sleep(0.002)

import time
import logging
import asyncio
from functools import wraps
from typing import AsyncGenerator

from config_reader import program_config
from sensors.sensors_controller import SensorController
from motion.motion_controller import MotionController
from media_stream_controller import MediaStreamController
from shell_cmd_utils import generate_cmd_continued_output_response, run_shell_cmd_async, read_full_cmd_output

from rovSecurity.userAuth import generateAuthToken, check_token_validty
from protobuf.rov_action_api import RovAction, SensorUpdatesResponse, RovResponse, DoneResponse, TokenInvalidResponse, DriverChangedResponse, HeartbeatResponse, betterproto, ErrorResponse, PasswordAcceptedResponse, PasswordInvalidResponse, PasswordRequiredResponse, PongResponse, TokenAcceptedResponse
from protobuf.webrtcrelay import RelayEventStream, PeerConnectedEvent, MsgRecivedEvent, PeerCalledEvent, PeerDataConnErrorEvent, PeerDisconnectedEvent, PeerHungupEvent, PeerMediaConnErrorEvent, RelayConnectedEvent, RelayDisconnectedEvent, RelayErrorEvent

############################
###### setup logging #######

log = logging.getLogger(__name__)


class KnownPeerMetadata():
    """ Metadata about a peer that we know about."""
    __slots__ = ('auth_token', 'last_recived_msg_time', 'is_connected')
    auth_token: str | None
    last_recived_msg_time: float
    is_connected: bool

    def __init__(self, is_connected=False, auth_token=None):
        self.auth_token = auth_token
        self.is_connected = is_connected
        self.last_recived_msg_time = time.time()


def verify_authorization(needs_authentication: bool, needs_driver: bool):

    def decorator(func):

        @wraps(func)
        async def wrapper(self, msg_data: RovAction, src_peer_id: str):
            if needs_authentication and not self.check_if_peer_is_authenticated(src_peer_id):
                return (RovResponse(password_required=PasswordRequiredResponse()), [src_peer_id])
            if needs_driver and self.designated_driver_peerid != src_peer_id:
                return (RovResponse(error=ErrorResponse(message="You must be the designated driver")), [src_peer_id])
            return await func(self, msg_data, src_peer_id)

        return wrapper

    return decorator


class MessageHandler:
    """ Handles all incoming and outgoing messages to the rov and events from the webrtc-relay."""

    sensor_ctrl: SensorController
    media_controller: MediaStreamController

    def __init__(self, relay_grpc, media_controller, motion_controller, sensor_controller):
        """Initialize the message handler."""
        self.relay_grpc = relay_grpc
        self.media_controller = media_controller
        self.motion_ctrl = motion_controller
        self.sensor_ctrl = sensor_controller

        # --- Variables to keep track of who is allowed to drive the rov ---
        self.designated_driver_peerid: str | None = None

        # Dictionary to keep track of all the peers/users we know about since the message handler started running, key is the peer id
        self.known_peers: dict[str, KnownPeerMetadata] = {}

    async def update_sender_loop(self):
        """ Main loop that sends periodic updates to all connected peers and handles peer timeouts. """
        while True:

            # Cut motors & keep looping if no one is connected to the rov (safety feature):
            if self.designated_driver_peerid is None:
                self.motion_ctrl.stop_motors()
                # # if no one is connected continue looping
                await asyncio.sleep(0.5)
                continue

            # Find any peers who haven't sent a mesage recently
            for peer_id, peer_metadata in self.known_peers.items():
                if time.time() - peer_metadata.last_recived_msg_time > 2:
                    # If we haven't recieved any messages recently from the driver, cut the motors (safety feature):
                    if peer_id == self.designated_driver_peerid:
                        self.motion_ctrl.stop_motors()
                        break

            # get sensor updates from all sensors:
            sensor_updates = self.sensor_ctrl.get_sensor_updates()

            if len(sensor_updates) != 0:
                # Measurements has some values, send them to all connected peers
                await self.send_msg(msg_data=RovResponse(sensor_updates=SensorUpdatesResponse(measurement_updates=sensor_updates)), recipient_peers=["*"])
                await asyncio.sleep(0.002)
            else:
                # otherwise send a heartbeat message to help the website clients know that the datachannel is still open
                time_ms = int(time.time() * 1000)
                await self.send_msg(msg_data=RovResponse(heartbeat=HeartbeatResponse(time=time_ms)), recipient_peers=["*"])
                await asyncio.sleep(0.002)

    async def handle_relay_event(self, relay_event: RelayEventStream):
        """
        Handle grpc events recived from the webrtc-relay.
        :param event: the event to handle
        """
        exchange_id = relay_event.exchange_id
        (event_type, event) = betterproto.which_one_of(relay_event, "event")
        # print("PYTHON: Got GRPC Event: " + event_type)
        if event_type == "msg_recived":
            evto: MsgRecivedEvent = event  # type: ignore
            await self.handle_incoming_msg(evto.payload, evto.src_peer_id, exchange_id, evto.relay_peer_number)
        if event_type == "relay_connected":
            evt: RelayConnectedEvent = event  # type: ignore
            print("PYTHON: Got relayConnected event: " + str(evt) + " | exId: " + str(exchange_id))
        if event_type == "relay_disconnected":
            evt: RelayDisconnectedEvent = event  # type: ignore
            print("PYTHON: Got relayDisconnected event: " + str(evt) + " | exId: " + str(exchange_id))
        if event_type == "relay_error":
            evt: RelayErrorEvent = event  # type: ignore
            print("PYTHON: Got relayError event: " + str(evt) + " | exId: " + str(exchange_id))
        if event_type == "peer_connected":
            evt: PeerConnectedEvent = event  # type: ignore
            print("PYTHON: Got peerConnected event: " + str(evt) + " | exId: " + str(exchange_id))
            await self.handle_peer_connected(src_peer_id=evt.src_peer_id)
        if event_type == "peer_disconnected":
            evt: PeerDisconnectedEvent = event  # type: ignore
            print("PYTHON: Got peerDisconnected event: " + str(evt) + " | exId: " + str(exchange_id))
            await self.handle_peer_disconnected(src_peer_id=evt.src_peer_id)
        if event_type == "peer_called":
            evt: PeerCalledEvent = event  # type: ignore
            print("PYTHON: Got peerCalled event: " + str(evt) + " | exId: " + str(exchange_id))
        if event_type == "peer_hungup":
            evt: PeerHungupEvent = event  # type: ignore
            print("PYTHON: Got peerHungup event: " + str(evt) + " | exId: " + str(exchange_id))
        if event_type == "peer_data_conn_error":
            evt: PeerDataConnErrorEvent = event  # type: ignore
            print("PYTHON: Got peerDataConnError event: " + str(evt) + " | exId: " + str(exchange_id))
        if event_type == "peer_media_conn_error":
            evt: PeerMediaConnErrorEvent = event  # type: ignore
            print("PYTHON: Got peerMediaConnError event: " + str(evt) + " | exId: " + str(exchange_id))

# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# Relay events (these are sent by the webrtc-relay when something happens)
# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    async def handle_peer_connected(self, src_peer_id: str):
        """Respond to a peer connection webrtc-relay event"""
        log.info("A client peer has connected: %s", src_peer_id)
        if src_peer_id in self.known_peers:
            self.known_peers[src_peer_id].is_connected = True
        else:
            self.known_peers[src_peer_id] = KnownPeerMetadata(is_connected=True, auth_token=None)

        if self.designated_driver_peerid is None:
            await self.change_driver(src_peer_id)
        else:
            # Let the connecting peer know who the designated driver is:
            await self.send_msg(msg_data=RovResponse(driver_changed=DriverChangedResponse(driver_peer_id=self.designated_driver_peerid)), recipient_peers=[src_peer_id])

    async def handle_peer_disconnected(self, src_peer_id: str):
        """Respond to a peer disconection webrtc-relay event"""
        log.info("A client peer has DISconnected: %s", src_peer_id)

        # reset the current driver peerid if the driver just disconnected:
        if self.designated_driver_peerid == src_peer_id:
            await self.change_driver(self.find_first_connected_peer())

        if src_peer_id in self.known_peers:
            self.known_peers[src_peer_id].auth_token = None
            self.known_peers[src_peer_id].is_connected = False

    # pylint: disable=unused-argument
    # pylint: disable=too-many-branches
    async def handle_incoming_msg(self, msg_payload: bytes, src_peer_id, exchange_id=None, relay_peer_number=0):
        """
        Handle incoming messages from all peers
        :param msg_payload: the message payload bytes
        :param src_peer_id: the peer id of the sender
        :param exchange_id: the exchange id of the message
        :param relay_peer_number: the number of the webrtc-relay relay peer that the message came through
        """
        # typechecking protobuf oneOf fields doesn't yet work: https://github.com/danielgtaylor/python-betterproto/issues/358

        # Parse the message payload:
        msg_data = self.parse_message_payload(msg_payload)
        if msg_data is None:
            return log.warn("Got empty message payload from peer: %s", src_peer_id)

        # Set the last_recived_msg_time for the peer:
        if src_peer_id not in self.known_peers or self.known_peers[src_peer_id].is_connected is False:
            await self.handle_peer_connected(src_peer_id)
        else:
            self.known_peers[src_peer_id].last_recived_msg_time = time.time()

        # Set the response to None by default:
        response = None

        # >> Actions that can be done by any peer:
        if msg_data.is_set("ping"):
            response = await self.handle_ping_message(src_peer_id, msg_data)

        elif msg_data.is_set("password_attempt"):
            response = await self.handle_password_attempt(src_peer_id, msg_data)

        elif msg_data.is_set("auth_token_attempt"):
            response = await self.handle_auth_token_attempt(src_peer_id, msg_data)

        elif msg_data.is_set("get_rov_status"):
            response = await self.handle_get_rov_status(src_peer_id, msg_data)

        elif msg_data.is_set("refresh_all_sensors"):
            response = await self.handle_refresh_all_sensors(src_peer_id, msg_data)

        elif msg_data.is_set("begin_video_stream"):
            response = await self.handle_begin_video_stream(src_peer_id, msg_data)

        # >> Actions that require the sending peer to be authenticated (have correctly done a password or token challenge before)

        elif msg_data.is_set("take_control"):
            response = await self.handle_take_control(src_peer_id, msg_data)

        elif msg_data.is_set("take_photo"):
            response = await self.handle_take_photo(src_peer_id, msg_data)

        elif msg_data.is_set("start_video_rec"):
            response = await self.handle_start_video_rec(src_peer_id, msg_data)

        elif msg_data.is_set("stop_video_rec"):
            response = await self.handle_stop_video_rec(src_peer_id, msg_data)

        elif msg_data.is_set("shutdown_rov"):
            response = await self.handle_shutdown_rov(src_peer_id, msg_data)

        elif msg_data.is_set("reboot_rov"):
            response = await self.handle_reboot_rov(src_peer_id, msg_data)

        elif msg_data.is_set("enable_wifi"):
            response = await self.handle_enable_wifi(src_peer_id, msg_data)

        elif msg_data.is_set("disable_wifi"):
            response = await self.handle_disable_wifi(src_peer_id, msg_data)

        elif msg_data.is_set("rov_logs"):
            response = await self.handle_rov_logs(src_peer_id, msg_data)

        elif msg_data.is_set("restart_rov_services"):
            response = await self.handle_restart_rov_services(src_peer_id, msg_data)

        # >> Actions that require the sending peer to be the designated driver:

        elif msg_data.is_set("move"):
            response = await self.handle_move(src_peer_id, msg_data)

        elif msg_data.is_set("toggle_lights"):
            response = await self.handle_toggle_lights(src_peer_id, msg_data)

        else:
            # If the message was not handled by any of the above, send an error response:
            # handle action requests that are invalid (do not contain an action parameter or an unknon action param):
            action, _ = betterproto.which_one_of(msg_data, "Body")
            response = (RovResponse(error=ErrorResponse(message='No action specified' if action == "" else 'Unknown action: ' + action), rov_exchange_id=msg_data.rov_exchange_id), ["*"])

        # Send the response:
        if response is not None:
            msg_datas = response[0]
            target_peers = response[1]
            if isinstance(msg_datas, RovResponse):
                await self.send_msg(msg_data=msg_datas, recipient_peers=target_peers)
            elif isinstance(msg_datas, AsyncGenerator):
                async for msg_data in msg_datas:
                    await self.send_msg(msg_data=msg_data, recipient_peers=target_peers)
            else:
                raise Exception("Unexpected response type: " + str(type(msg_data)))

# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# ROV Actions that can be done by anyone:
# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    async def handle_ping_message(self, src_peer_id: str, msg_data: RovAction) -> tuple[RovResponse, list[str]]:
        """Responds to a ping message with a pong message with the same timestamp"""
        # send back the same timestamp from the ping with "pong"
        return (RovResponse(pong=PongResponse(time=msg_data.ping.time), rov_exchange_id=msg_data.rov_exchange_id), [src_peer_id])

    async def handle_password_attempt(self, src_peer_id: str, msg_data: RovAction) -> tuple[RovResponse, list[str]]:
        """Checks if the given password is correct and if so, generates an auth token for the peer"""
        correct_password = program_config.get('RovControlPassword', 'Set a password in the config file')

        if msg_data.password_attempt.password != correct_password:
            return (RovResponse(password_invalid=PasswordInvalidResponse(), rov_exchange_id=msg_data.rov_exchange_id), [src_peer_id])

        auth_token = generateAuthToken()
        self.known_peers[src_peer_id].auth_token = auth_token
        return (RovResponse(password_accepted=PasswordAcceptedResponse(auth_token=auth_token), rov_exchange_id=msg_data.rov_exchange_id), [src_peer_id])

    async def handle_auth_token_attempt(self, src_peer_id: str, msg_data: RovAction) -> tuple[RovResponse, list[str]]:
        """Checks if the given auth token is valid and if so, marks the peer as authenticated"""
        if check_token_validty(msg_data.auth_token_attempt.token):
            self.known_peers[src_peer_id].auth_token = msg_data.auth_token_attempt.token
            return (RovResponse(token_accepted=TokenAcceptedResponse(), rov_exchange_id=msg_data.rov_exchange_id), [src_peer_id])
        return (RovResponse(token_invalid=TokenInvalidResponse(), rov_exchange_id=msg_data.rov_exchange_id), [src_peer_id])

    async def handle_get_rov_status(self, src_peer_id: str, msg_data: RovAction) -> tuple[AsyncGenerator, list[str]]:
        """ Returns the generator of the status shell script"""
        msg_generator = generate_cmd_continued_output_response(msg_data.rov_exchange_id, "/home/pi/internet_rov_code/rov_status_report.sh", cmd_timeout=20)
        return (msg_generator, [src_peer_id])

    async def handle_refresh_all_sensors(self, src_peer_id: str, msg_data: RovAction) -> tuple[RovResponse, list[str]]:
        """Refreshes all sensors and returns the results"""
        measurement_data = self.sensor_ctrl.get_all_sensor_values()
        return (RovResponse(sensor_updates=SensorUpdatesResponse(measurement_updates=measurement_data), rov_exchange_id=msg_data.rov_exchange_id), [src_peer_id])

    async def handle_begin_video_stream(self, src_peer_id: str, msg_data: RovAction) -> None:
        """Begins streaming the video from the ROV's camera"""
        # TODO: This isn't used anymore, but it's still here in case we want to use it again
        return None

# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# Actions that require the sending peer to be the designated driver:
# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    @verify_authorization(needs_authentication=False, needs_driver=True)
    async def handle_move(self, src_peer_id: str, msg_data: RovAction) -> None:
        """Moves the ROV in the given thrust vector & turn speed"""
        # update the rov motion
        vec = [msg_data.move.velocity_x, msg_data.move.velocity_y, msg_data.move.velocity_z]
        self.motion_ctrl.set_rov_motion(thrust_vector=vec, turn_rate=msg_data.move.angular_velocity_yaw)
        return None

    @verify_authorization(needs_authentication=False, needs_driver=True)
    async def handle_toggle_lights(self, src_peer_id: str, msg_data: RovAction) -> tuple[RovResponse, list[str]]:
        """Toggles the ROV lights on or off"""
        # TODO: implement toggle_light action
        return (RovResponse(done=DoneResponse("(TODO!!!) Light NOT Toggled!")), [src_peer_id])

# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# Actions that require the sending peer to be authenticated (have correctly done a password or token challenge before)
# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    @verify_authorization(needs_authentication=True, needs_driver=False)
    async def handle_take_control(self, src_peer_id: str, msg_data: RovAction) -> tuple[RovResponse, list[str]]:
        """Changes the designated driver to the message sender"""
        # if the authenticated peer is trying to take control of the ROV, set their peer id to be the designated driver peer id.
        self.designated_driver_peerid = src_peer_id
        # Let all connected peers know that the designated driver has changed:
        return (RovResponse(driver_changed=DriverChangedResponse(driver_peer_id=self.designated_driver_peerid)), ["*"])

    @verify_authorization(needs_authentication=True, needs_driver=False)
    async def handle_shutdown_rov(self, src_peer_id: str, msg_data: RovAction) -> tuple[RovResponse, list[str]]:
        """Shuts down the PI after a delay."""
        await run_shell_cmd_async("sleep 4; sudo poweroff")
        return (RovResponse(done=DoneResponse(message="OK: Shutting Down...")), [src_peer_id])

    @verify_authorization(needs_authentication=True, needs_driver=False)
    async def handle_reboot_rov(self, src_peer_id: str, msg_data: RovAction) -> tuple[RovResponse, list[str]]:
        """Reboots the PI after a delay."""
        await run_shell_cmd_async("sleep 4; sudo reboot")
        return (RovResponse(done=DoneResponse(message="OK: Rebooting...")), [src_peer_id])

    @verify_authorization(needs_authentication=True, needs_driver=False)
    async def handle_enable_wifi(self, src_peer_id: str, msg_data: RovAction) -> tuple[RovResponse, list[str]]:
        """Enable WiFi by unblocking the wlan interface."""
        (cmd_out, cmd_err, status_code) = await read_full_cmd_output("sudo rfkill unblock wlan", cmd_timeout=5)
        if status_code == 0:
            return (RovResponse(done=DoneResponse(message="OK: WiFi Enabled...")), [src_peer_id])
        return (RovResponse(error=ErrorResponse(message="ERROR: WiFi Enable Failed: " + cmd_out + cmd_err)), [src_peer_id])

    @verify_authorization(needs_authentication=True, needs_driver=False)
    async def handle_disable_wifi(self, src_peer_id: str, msg_data: RovAction) -> tuple[RovResponse, list[str]]:
        """Disable WiFi by blocking the wlan interface."""
        (cmd_out, cmd_err, status_code) = await read_full_cmd_output("sudo rfkill block wlan", cmd_timeout=5)
        if status_code == 0:
            return (RovResponse(done=DoneResponse(message="OK: WiFi Disabled...")), [src_peer_id])
        return (RovResponse(error=ErrorResponse(message="ERROR: WiFi Disable Failed: " + cmd_out + cmd_err)), [src_peer_id])

    @verify_authorization(needs_authentication=True, needs_driver=False)
    async def handle_rov_logs(self, src_peer_id: str, msg_data: RovAction) -> tuple[AsyncGenerator, list[str]]:
        """Return a generator that continuously outputs new systemd log messages as they appear plus the last 500 lines of log."""
        msg_generator = generate_cmd_continued_output_response(msg_data.rov_exchange_id, "journalctl --unit=rov_python_code --unit=rov_go_code --unit=add_fixed_ip --unit=nginx --no-pager --follow -n 500", cmd_timeout=20)
        return (msg_generator, [src_peer_id])

    @verify_authorization(needs_authentication=True, needs_driver=False)
    async def handle_restart_rov_services(self, src_peer_id: str, msg_data: RovAction) -> tuple[AsyncGenerator, list[str]]:
        msg_generator = generate_cmd_continued_output_response(msg_data.rov_exchange_id, "/home/pi/internet_rov_code/update_config_files.sh", cmd_timeout=20)
        return (msg_generator, [src_peer_id])

    @verify_authorization(needs_authentication=True, needs_driver=False)
    async def handle_take_photo(self, src_peer_id: str, msg_data: RovAction) -> tuple[RovResponse, list[str]]:
        # TODO: implement take_photo action"
        return (RovResponse(done=DoneResponse("(TODO!!!) Photo NOT Captured!")), [src_peer_id])

    @verify_authorization(needs_authentication=True, needs_driver=False)
    async def handle_start_video_rec(self, src_peer_id: str, msg_data: RovAction) -> tuple[RovResponse, list[str]]:
        # TODO: implement start_video_rec action"
        return (RovResponse(done=DoneResponse("(TODO!!!) Video NOT Recording!")), [src_peer_id])

    @verify_authorization(needs_authentication=True, needs_driver=False)
    async def handle_stop_video_rec(self, src_peer_id: str, msg_data: RovAction) -> tuple[RovResponse, list[str]]:
        # TODO: implement stop_video_rec action"
        return (RovResponse(done=DoneResponse("(TODO!!!) Video NOT Stopped!")), [src_peer_id])


# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# Helper Functions
# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    async def change_driver(self, new_driver_peer_id: str | None):
        if new_driver_peer_id is not None and self.designated_driver_peerid != new_driver_peer_id:
            self.designated_driver_peerid = new_driver_peer_id
            # Let all connected peers know that the designated driver peer has changed:
            await self.send_msg(msg_data=RovResponse(driver_changed=DriverChangedResponse(driver_peer_id=self.designated_driver_peerid)), recipient_peers=["*"])

    def find_first_connected_peer(self) -> str | None:
        for peer_id, peer_metadata in self.known_peers.items():
            if peer_metadata.is_connected is True:
                return peer_id
        return None

    def check_if_peer_is_authenticated(self, peer_id):
        '''Returns true if the given peer has provided a valid authentication token this session.'''
        peer_metadata = self.known_peers.get(peer_id, None)
        if peer_metadata is not None:
            return check_token_validty(peer_metadata.auth_token)
        return False

    async def send_msg(self, msg_data: RovResponse, recipient_peers: list[str]):
        """
        Send a message to a list of peers (via grpc -> webrtc-relay -> browser).
        """
        # if recipient_peers is None:
        #     recipient_peers = ["*"]
        return await self.relay_grpc.send_message(payload=msg_data.SerializeToString(), target_peer_ids=recipient_peers)

    def parse_message_payload(self, message_payload: bytes) -> RovAction | None:
        """
        Parse a message from the socket and return a dict of the message metadata and the message data.
        :param message_payload: the message payload to parse as bytes
        :return: the decoded message data as a dict
        """
        try:
            # decode message payload as a protobuf message:
            msg_data = RovAction().parse(message_payload)
            return msg_data

        except Exception as error:
            log.error(error, exc_info=True)
            return None

    # async def handle_normal_actions(self, src_peer_id, msg_data: RovAction) -> tuple[RovResponse, list[str]]:

    #     rov_exchange_id = msg_data.rov_exchange_id

    #     if msg_data.is_set("ping"):
    #         self.last_ping_recived_time = time.time()
    #         # send back the same timestamp from the ping with the status "pong"
    #         await self.send_msg(msg_data=RovResponse(pong=PongResponse(time=msg_data.ping.time)), recipient_peers=[src_peer_id])

    #     elif msg_data.is_set("password_attempt"):
    #         # send back the result of the password attempt
    #         (challenge_result, auth_token) = self.password_challenge(msg_data.password_attempt.password, src_peer_id)
    #         # await self.send_msg(status=challenge_result, val=authToken, cid=rov_exchange_id, recipient_peers=[src_peer_id])
    #         if challenge_result == 'password-accepted':
    #             await self.send_msg(msg_data=RovResponse(password_accepted=PasswordAcceptedResponse(auth_token), rov_exchange_id=rov_exchange_id), recipient_peers=[src_peer_id])
    #         elif challenge_result == 'password-invalid':
    #             await self.send_msg(msg_data=RovResponse(password_invalid=PasswordInvalidResponse(), rov_exchange_id=rov_exchange_id), recipient_peers=[src_peer_id])

    #     elif msg_data.is_set("auth_token_attempt"):
    #         challenge_result = self.auth_token_challenge(msg_data.auth_token_attempt.token, src_peer_id)
    #         if challenge_result == 'token-accepted':
    #             await self.send_msg(msg_data=RovResponse(token_accepted=TokenAcceptedResponse(), rov_exchange_id=rov_exchange_id), recipient_peers=[src_peer_id])
    #         elif challenge_result == 'password-required':
    #             await self.send_msg(msg_data=RovResponse(password_required=PasswordRequiredResponse(), rov_exchange_id=rov_exchange_id), recipient_peers=[src_peer_id])

    #     elif msg_data.is_set("refresh_all_sensors"):
    #         sensor_updates = self.sensor_ctrl.get_all_sensor_values()
    #         await self.send_msg(msg_data=RovResponse(sensor_updates=SensorUpdatesResponse(measurement_updates=sensor_updates)), recipient_peers=["*"])

    #     # -- golang relay commands:
    #     elif msg_data.is_set("begin_video_stream"):
    #         # send the *golang* code (note the action is in reply_metadata) the begin_video_stream command
    #         # _, streamUrl = self.media_controller.start_source_stream()
    #         # await self.relay_grpc.call(track_name="FRONT_ROV_CAM",
    #         #                            mime_type="video/h264",
    #         #                            rtp_source_url=streamUrl,
    #         #                            target_peer_ids=[src_peer_id])
    #         # await startVideo
    #         print("begin_video_stream... (TODO: not implemented yet)")

    #     # these actions call shell commands and can be found in command_api.py
    #     elif msg_data.is_set("rov_status_report"):
    #         msg_generator = generate_cmd_continued_output_response(rov_exchange_id, "/home/pi/internet_rov_code/rov_status_report.sh", cmd_timeout=20)
    #         async for msg_data in msg_generator:
    #             await self.relay_grpc.send_message(payload=msg_data, target_peer_ids=[src_peer_id])

    #     else:
    #         return False

    #     return True

    # # mccabe: disable=MC0001
    # async def handle_authenticated_actions(self, src_peer_id, msg_data: RovAction) -> tuple[RovResponse, list[str]]:
    #     """
    #     handle actions that require an authenticated peer (one who as previously entered thec correct password):
    #     """
    #     rov_exchange_id = msg_data.rov_exchange_id

    #     # pylint: disable=too-many-boolean-expressions
    #     if not msg_data.is_set("take_control") and not msg_data.is_set("take_photo") and not msg_data.is_set("start_video_rec") and not msg_data.is_set("stop_video_rec") and not msg_data.is_set("shutdown_rov") and not msg_data.is_set("reboot_rov") and not msg_data.is_set("enable_wifi") and not msg_data.is_set("disable_wifi") and not msg_data.is_set("rov_logs") and not msg_data.is_set("restart_rov_services"):
    #         return False

    #     if (not self.check_if_peer_is_authenticated(src_peer_id)):
    #         # if the sender is not authenticated, send back the password-required message along with this rov's unique id
    #         await self.send_msg(msg_data=RovResponse(password_required=PasswordRequiredResponse(rov_id=getRovUUID()), rov_exchange_id=rov_exchange_id), recipient_peers=[src_peer_id])

    #     elif msg_data.is_set("take_control") and self.current_driver_peerid != src_peer_id:
    #         self.current_driver_peerid = src_peer_id
    #         # if the authenticated peer is trying to take control of the ROV, set their peer id to be the designated driver peer id "curent_driver_peerid"
    #         # Let all connected peers know that the designated driver has changed
    #         await self.send_msg(msg_data=RovResponse(driver_changed=DriverChangedResponse(driver_peer_id=self.current_driver_peerid)), recipient_peers=["*"])

    #     elif msg_data.is_set("take_photo"):
    #         print("TODO: implement take_photo action")
    #         # send reply to just the sender
    #         await self.send_msg(msg_data=RovResponse(done=DoneResponse(), rov_exchange_id=rov_exchange_id), recipient_peers=[src_peer_id])

    #     elif msg_data.is_set("start_video_rec"):
    #         print("TODO: start_video_rec")
    #         # send reply to just the sender
    #         await self.send_msg(msg_data=RovResponse(done=DoneResponse(), rov_exchange_id=rov_exchange_id), recipient_peers=[src_peer_id])

    #     elif msg_data.is_set("stop_video_rec"):
    #         print("TODO: stop_video_rec")
    #         # send reply to just the sender
    #         await self.send_msg(msg_data=RovResponse(done=DoneResponse(), rov_exchange_id=rov_exchange_id), recipient_peers=[src_peer_id])

    #     # These actions call shell commands and can be found in command_api.py
    #     elif msg_data.is_set("shutdown_rov"):  #elif msg_data.is_set("reboot_rov")  or msg_data.is_set("enable_wifi") or msg_data.is_set("disable_wifi") or msg_data.is_set("rov_logs") or msg_data.is_set("restart_rov_services"):
    #         await run_shell_cmd_async("sleep 4; sudo poweroff")
    #         await self.relay_grpc.send_message(payload=RovResponse(done=DoneResponse(message="OK: Shutting Down...")), target_peer_ids=[src_peer_id])

    #     elif msg_data.is_set("reboot_rov"):
    #         await run_shell_cmd_async("sleep 4; sudo reboot")
    #         await self.relay_grpc.send_message(payload=RovResponse(done=DoneResponse(message="OK: Rebooting...")), target_peer_ids=[src_peer_id])

    #     elif msg_data.is_set("enable_wifi"):
    #         (cmd_out, cmd_err, status_code) = await read_full_cmd_output("sudo rfkill unblock wlan", cmd_timeout=5)
    #         if status_code == 0:
    #             await self.relay_grpc.send_message(payload=RovResponse(done=DoneResponse(message="OK: WiFi Enabled...")), target_peer_ids=[src_peer_id])
    #         else:
    #             await self.relay_grpc.send_message(payload=RovResponse(error=ErrorResponse(message="ERROR: WiFi Enable Failed: " + cmd_out + cmd_err)), target_peer_ids=[src_peer_id])

    #     elif msg_data.is_set("disable_wifi"):
    #         (cmd_out, cmd_err, status_code) = await read_full_cmd_output("sudo rfkill block wlan", cmd_timeout=5)
    #         if status_code == 0:
    #             await self.relay_grpc.send_message(payload=RovResponse(done=DoneResponse(message="OK: WiFi Disabled...")), target_peer_ids=[src_peer_id])
    #         else:
    #             await self.relay_grpc.send_message(payload=RovResponse(error=ErrorResponse(message="ERROR: WiFi Disable Failed: " + cmd_out + cmd_err)), target_peer_ids=[src_peer_id])

    #     elif msg_data.is_set("rov_logs"):
    #         msg_generator = generate_cmd_continued_output_response(rov_exchange_id, "journalctl --unit=rov_python_code --unit=rov_go_code --unit=add_fixed_ip --unit=nginx --no-pager --follow -n 500", cmd_timeout=20)
    #         async for msg_data in msg_generator:
    #             await self.relay_grpc.send_message(payload=msg_data, target_peer_ids=[src_peer_id])

    #     elif msg_data.is_set("restart_rov_services"):
    #         msg_generator = generate_cmd_continued_output_response(rov_exchange_id, "/home/pi/internet_rov_code/update_config_files.sh", cmd_timeout=20)
    #         async for msg_data in msg_generator:
    #             await self.relay_grpc.send_message(payload=msg_data, target_peer_ids=[src_peer_id])

    #     else:
    #         return False

    #     return True

    # async def handle_driver_only_actions(self, src_peer_id, msg_data: RovAction) -> tuple[RovResponse, list[str]]:
    #     """
    #     Handle actions that only the designated rov driver can do.
    #     !!! The driver may not nececsarilly be an authenticated peer !!!!
    #     For example the system will hand driver control to the last connected person if the real driver disconnects, so at least someone is always driving:
    #     To to take control hovever, a peer must be authenticated
    #     """
    #     rov_exchange_id = msg_data.rov_exchange_id

    #     if not msg_data.is_set("move") and not msg_data.is_set("toogle_lights"):
    #         return False

    #     if self.current_driver_peerid != src_peer_id:
    #         # if the sender is not the driver, send back the not a driver error message
    #         await self.send_msg(msg_data=RovResponse(error=ErrorResponse(message='You must be the ROV driver first!'), rov_exchange_id=rov_exchange_id), recipient_peers=[src_peer_id])

    #     elif msg_data.is_set("move"):
    #         # update the rov motion
    #         vec = [msg_data.move.velocity_x, msg_data.move.velocity_y, msg_data.move.velocity_z]
    #         self.motion_ctrl.set_rov_motion(thrust_vector=vec, turn_rate=msg_data.move.angular_velocity_yaw)

    #     elif msg_data.is_set("toggle_lights"):
    #         print("TODO: Toggle lights")

    #     return True

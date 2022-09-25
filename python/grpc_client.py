import asyncio
from random import randrange
from protobuf.webrtcrelay import WebRtcRelayStub, EventStreamRequest, PeerConnectedEvent, MsgRecivedEvent, PeerCalledEvent, PeerDataConnErrorEvent, \
    PeerDisconnectedEvent, PeerHungupEvent, PeerMediaConnErrorEvent, RelayConnectedEvent, RelayDisconnectedEvent, RelayErrorEvent, CallRequest, \
    RtpCodecParams, TrackInfo
from grpclib.client import Channel
import betterproto

from mesage_handler import MessageHandler
from protobuf.webrtcrelay import SendMsgRequest


class Relay_GRPC_Client:
    stub: WebRtcRelayStub = None
    grpc_address: str = None
    msg_recived_callback = None
    msg_handler: MessageHandler = None
    outgoing_msg_queue = asyncio.Queue()

    # blocking async function that will keep connected to relay and wait for events from the relay / send messages to the relay
    async def start_loop(self, msg_handler: MessageHandler):
        # self.msg_recived_callback = msg_recived_callback
        self.msg_handler = msg_handler
        while True:
            try:
                await self._connect()
            except Exception as e:
                self.stub = None
                print(e)
                print("relay GRPC disconnected, reconnecting in 3 seconds...")
                await asyncio.sleep(3)

    def __init__(self, grpc_address=None):
        self.grpc_address: str = grpc_address
        self.stub: WebRtcRelayStub = None

    def _get_channel(self):
        parts = self.grpc_address.split("//")
        prefix = parts[0]
        address = parts[1]

        if address is None:
            raise Exception("Invalid GRPC address!")

        if prefix == "unix:":
            # to use unix domain sockets as the transport for grpc
            return Channel(path=address)

        if prefix in ("http:", "tcp:"):
            parts = address.split(":")
            # to use http/2 as the transport for grpc
            return Channel(host=parts[0], port=int(parts[1]))

        raise Exception(
            "Invalid GRPC address prefix! (try unix:// http:// or tcp://)")

    def get_exchange_id(self):
        # generate a random exchange id between 0 and 2^32 (max value of a 32 bit uint)
        # in a real application you could store this exchangeId and use it to match up the response events from the relay (will come as get_event_stream()
        # events)  with the grpc request we are about to send
        exchange_id = randrange(4294967294)
        return exchange_id

    # pylint: disable=too-many-arguments
    async def call(self,
                   target_peer_ids=None,
                   relay_peer_number=0,
                   track_name=None,
                   rtp_source_url="",
                   mime_type="video/h264",
                   clock_rate=90000,
                   exchange_id=None):
        # tell the relay to media call the given peer id with the video stream we just created:
        if (self.stub is None):
            raise Exception("Not connected to relay!")
        if target_peer_ids is None:
            target_peer_ids = ["*"]
        if exchange_id is None:
            exchange_id = self.get_exchange_id()
        if track_name is None:
            track_name = "track_" + str(exchange_id)
        await self.stub.call_peer(
            CallRequest(
                target_peer_ids=target_peer_ids,
                stream_name="test_video_stream",
                # relay_peer_number=0 means use all relay peers that are online within the webrtc-relay instance
                relay_peer_number=relay_peer_number,
                exchange_id=exchange_id,
                tracks=[
                    TrackInfo(
                        name=track_name,
                        kind="video",
                        codec=RtpCodecParams(mime_type=mime_type,
                                             clock_rate=clock_rate),
                        rtp_source_url=rtp_source_url,
                    )
                ]))

    async def send_message(self,
                           payload: bytes = None,
                           target_peer_ids=None,
                           relay_peer_number=0,
                           exchange_id=None):
        # tell the relay to media call the given peer id with the video stream we just created:
        if (self.stub is None):
            raise Exception("Not connected to relay!")
        if target_peer_ids is None:
            target_peer_ids = ["*"]
        if exchange_id is None:
            exchange_id = self.get_exchange_id()
        await self.outgoing_msg_queue.put(
            SendMsgRequest(target_peer_ids=target_peer_ids,
                           payload=payload,
                           relay_peer_number=relay_peer_number,
                           exchange_id=exchange_id))

    async def _outgoing_msgs_iterator(self):
        async for msg in self.outgoing_msg_queue:
            yield msg

    async def _get_event_stream(self):
        eventStream = self.stub.get_event_stream(
            event_stream_request=EventStreamRequest())
        async for event in eventStream:
            exchange_id = event.exchange_id
            (event_type, e) = betterproto.which_one_of(event, "event")
            print("PYTHON: Got GRPC Event: " + event_type)
            if event_type == "msg_recived":
                ev: MsgRecivedEvent = e
                print("PYTHON: Got msgRecived event: " + str(ev) +
                      " | exId: " + str(exchange_id))
                await self.msg_handler.handle_incoming_msg(
                    ev.payload, ev.src_peer_id, ev.exchange_id,
                    ev.relay_peer_number)
            if event_type == "relay_connected":
                ev: RelayConnectedEvent = e
                print("PYTHON: Got relayConnected event: " + str(ev) +
                      " | exId: " + str(exchange_id))

            if event_type == "relay_disconnected":
                ev: RelayDisconnectedEvent = e
                print("PYTHON: Got relayDisconnected event: " + str(ev) +
                      " | exId: " + str(exchange_id))
            if event_type == "relay_error":
                ev: RelayErrorEvent = e
                print("PYTHON: Got relayError event: " + str(ev) +
                      " | exId: " + str(exchange_id))
            if event_type == "peer_connected":
                ev: PeerConnectedEvent = e
                print("PYTHON: Got peerConnected event: " + str(ev) +
                      " | exId: " + str(exchange_id))
                await self.msg_handler.handle_peer_connected_message(
                    src_peer_id=ev.src_peer_id)
            if event_type == "peer_disconnected":
                ev: PeerDisconnectedEvent = e
                print("PYTHON: Got peerDisconnected event: " + str(ev) +
                      " | exId: " + str(exchange_id))
                await self.msg_handler.handle_peer_disconnected_message(
                    src_peer_id=ev.src_peer_id)
            if event_type == "peer_called":
                ev: PeerCalledEvent = e
                print("PYTHON: Got peerCalled event: " + str(ev) +
                      " | exId: " + str(exchange_id))
            if event_type == "peer_hungup":
                ev: PeerHungupEvent = e
                print("PYTHON: Got peerHungup event: " + str(ev) +
                      " | exId: " + str(exchange_id))
            if event_type == "peer_data_conn_error":
                ev: PeerDataConnErrorEvent = e
                print("PYTHON: Got peerDataConnError event: " + str(ev) +
                      " | exId: " + str(exchange_id))
            if event_type == "peer_media_conn_error":
                ev: PeerMediaConnErrorEvent = e
                print("PYTHON: Got peerMediaConnError event: " + str(ev) +
                      " | exId: " + str(exchange_id))

    async def _connect(self):
        async with self._get_channel() as chan:
            # async with Channel(path="./WebrtcRelayGrpc.sock") as chan:
            grpc_channel = chan
            self.stub = WebRtcRelayStub(grpc_channel)
            await asyncio.gather(
                self._get_event_stream(),
                self.stub.send_msg_stream(self._outgoing_msgs_iterator()))

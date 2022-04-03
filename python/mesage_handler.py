import json
import logging
import asyncio

############################
###### setup logging #######
log = logging.getLogger(__name__)

## CONSTANTS ##
MESSAGE_METADATA_SEPARATOR = '|"|'


async def socket_incoming_message_handler_loop(unix_socket_datachannel,
                                               motion_ctrl):
    """
    Waits for new messages to be recieved on the socket.
    :param socket_datachannel: the unix socket class with a queue of recived messages from the socket in utf-8 text.
    :param motion_ctrl: The motion_ctrl object.
    """

    # state to keep track of who is allowed to drive the rov & who to send the reply to:
    current_pilot_peerid = None
    connected_peerids = []

    # loop infinitely:
    while True:

        # get the next message from the socket
        message = await unix_socket_datachannel.messages_from_socket_queue.get(
        )

        # create empty dicts to hold the recived message data
        parsed_metadata = {}
        parsed_msg = {}

        # create empty dicts to hold the reply message data:
        reply_metadata = {}
        reply_msg_data = {}

        # handle the recived message:
        if message is not None and len(message) > 0:
            log.debug("Recived: " + message)
            # parse the message data as two JSON formatted strings, first is the metadata.
            metadataJson = ""
            messageDataJson = ""
            try:
                metadataJson, messageDataJson = message.split(
                    MESSAGE_METADATA_SEPARATOR, 2)
            except ValueError:
                # handle the case where the message portion is empty (only metadata recieved)
                metadataJson = message

            try:
                if len(metadataJson) > 0:
                    parsed_metadata = json.loads(metadataJson)
                if len(messageDataJson) > 0:
                    parsed_msg = json.loads(messageDataJson)

            except json.JSONDecodeError:
                log.warning(
                    'Received unix socket message with invalid JSON format: ' +
                    message)
                return None
            except Exception as error:
                log.error(error, exc_info=True)
                return None

        # variables to be set based on the recived metadata
        messageIsFromPilot = False
        srcPeerId = None

        # handle the metadata:
        if len(parsed_metadata) > 0:

            if "SrcPeerId" in parsed_metadata:
                srcPeerId = parsed_metadata["SrcPeerId"]
                reply_metadata['TargetPeerIds'] = [
                    parsed_metadata['SrcPeerId']
                ]

                # check if a connected or disconnected event happened:
                if "Event" in parsed_metadata:
                    if parsed_metadata["Event"] == "Connected":
                        connected_peerids.append(srcPeerId)
                    elif parsed_metadata["Event"] == "Disconnected":
                        connected_peerids.remove(srcPeerId)
                        if srcPeerId == current_pilot_peerid:
                            current_pilot_peerid = None  # reset the current pilot peerid

                # handle the case when there is no current pilot peerid:
                if current_pilot_peerid == None and len(connected_peerids) > 0:
                    current_pilot_peerid = connected_peerids[
                        0]  # set the current pilot peerid
                    reply_msg_data["currentPiotPeerId"] = current_pilot_peerid

                # now check if this message came from the pilot
                if current_pilot_peerid == srcPeerId:
                    messageIsFromPilot = True

        # handle the parssed message data:
        if len(parsed_msg) > 0:

            # handle pilot actions
            # if messageIsFromPilot:

            if 'move' in parsed_msg:
                motion_ctrl.set_rov_motion(
                    thrust_vector=parsed_msg['move']['thrustVector'],
                    turn_rate=parsed_msg['move']['turnRate'])

            if 'toggleLights' in parsed_msg:
                pass

            # handle actions / events applicable to all peers (pilots and spectators):
            if 'ping' in parsed_msg:
                reply_msg_data['pong'] = parsed_msg['ping']

            if 'photo' in parsed_msg:
                reply_msg_data["statusMessage"] = "Photo Taken"
                # reply_metadata['action'] = "SetVideoCommand"
                pass

            if 'startRecording' in parsed_msg:
                reply_msg_data["statusMessage"] = "Recording Started"
                reply_msg_data['recordingStatus'] = True
                # reply_metadata['action'] = "SetVideoCommand"

            if 'stopRecording' in parsed_msg:
                reply_msg_data["statusMessage"] = "Recording Stopped"
                reply_msg_data['recordingStatus'] = False
                # reply_metadata['action'] = "SetVideoCommand"

            # if "startSensorLog" in parsed_metadata:
            #     sensr_log.set_logging_enabled(True)

            # if "stopSensorLog" in parsed_metadata:
            #     sensr_log.set_logging_enabled(False)

            if 'takeControl' in parsed_msg and srcPeerId != None:
                current_pilot_peerid = srcPeerId
                reply_metadata['TargetPeerIds'] = []
                reply_msg_data["currentPiotPeerId"] = srcPeerId

        # Send the reply_msg_data as a json string if it has any data in it.
        if len(reply_msg_data) > 0 or len(reply_metadata) > 0:
            reply_message = json.dumps(
                reply_metadata) + MESSAGE_METADATA_SEPARATOR + json.dumps(
                    reply_msg_data)
            log.debug("Reply: " + reply_message)
            unix_socket_datachannel.messages_to_socket_queue.put_nowait(
                reply_message)


async def socket_update_message_sender_loop(unix_socket_datachannel, sensors):
    while True:

        # create empty dicts to hold the reply message data:
        reply_metadata = {}
        reply_msg_data = {}

        sensorUpdates = sensors.get_sensor_update_dict()
        reply_msg_data.update(sensorUpdates)

        if len(reply_msg_data) > 0 or len(reply_metadata) > 0:
            update_message = json.dumps(
                reply_metadata) + MESSAGE_METADATA_SEPARATOR + json.dumps(
                    reply_msg_data)
            await unix_socket_datachannel.messages_to_send_to_socket_queue.put(
                update_message)
            log.debug("Sent update: " + update_message)
        await asyncio.sleep(1)
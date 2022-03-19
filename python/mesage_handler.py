import json
import logging

############################
###### setup logging #######
log = logging.getLogger(__name__)

MESSAGE_METADATA_SEPARATOR = '{|'

current_pilot_peerid = None
connected_peerids = []


def handle_socket_message(message, motors, sensors, sensr_log):
    """
    Called when a new message is recieved on the socket.
    :param message: The message recieved from the socket in utf-8 text.
    :return: The reply message, or None if no reply is needed.
    """

    # create empty dicts to hold the recived message data
    parsed_metadata = {}
    parsed_msg = {}

    # create empty dicts to hold the reply message data:
    reply_metadata = {}
    reply_msg_data = {}


    # handle the sensor changes:
    sensor_values_did_change = sensors.update_all_sensors()
    if sensor_values_did_change:
        reply_msg_data["sensor_update"] = sensors.get_changed_sensor_values()

    # handle the recived message:
    if message is not None:
        print("recvd message: " + str(message))
        # parse the message data as two JSON formatted strings, first is the metadata.
        try:
            metadataJson, messageDataJson = message.split(
                MESSAGE_METADATA_SEPARATOR)
            parsed_metadata = json.loads(metadataJson)
            parsed_msg = json.loads(messageDataJson)

        except json.JSONDecodeError:
            log.warning(
                'Received unix socket message with invalid JSON format: ' +
                message)
            return None

    # vvariables to be set based on the recived metadata
    messageIsFromPilot = False
    srcPeerId = None

    # handle the metadata:
    if parsed_metadata is not None:

        if "SrcPeerId" in parsed_metadata:
            srcPeerId = parsed_metadata["SrcPeerId"]

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
    if parsed_msg is not None:

        # handle pilot actions
        if messageIsFromPilot:

            if 'move' in parsed_msg:
                motors.set_rov_motion(
                    thrust_vector=parsed_msg['move']['thrustVector'],
                    turn_rate=parsed_msg['move']['turnRate'])

            if 'toggleLights' in parsed_msg:
                pass

        # handle actions / events applicable to all peers (pilots and spectators):
        if 'ping' in parsed_msg:
            reply_msg_data['pong'] = parsed_msg['ping']
            reply_metadata['TargetPeerId'] = parsed_metadata['SrcPeerId']

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
            reply_msg_data["currentPiotPeerId"] = srcPeerId

    # Send the reply_msg_data as a json string if it has any data in it.
    if len(reply_msg_data) > 0:
        reply_message = json.dumps(reply_msg_data)
        return reply_message
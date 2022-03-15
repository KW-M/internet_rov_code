import json
import logging

############################
###### setup logging #######
log = logging.getLogger(__name__)


def handle_socket_message(message, motors, sensors, sensr_log):
    """
    Called when a new message is recieved on the socket.
    :param message: The message recieved from the socket in utf-8 text.
    :return: The reply message, or None if no reply is needed.
    """

    # create an empty dict to hold the reply message data:
    reply_data = {}

    # handle the sensor changes:
    sensor_values_did_change = sensors.update_all_sensors()
    if sensor_values_did_change:
        reply_data["sensor_update"] = sensors.get_changed_sensor_values()

    # handle the recived message:
    if parsed_msg is not None:

        # parse the message data as a JSON formatted string.
        try:
            parsed_msg = json.loads(message)
        except json.JSONDecodeError:
            log.warning(
                'Received unix socket message with invalid JSON format: ' +
                message)
            return None

        if 'ping' in parsed_msg:
            reply_data['pong'] = parsed_msg['ping']

        if 'move' in parsed_msg:
            motors.set_rov_motion(
                thrust_vector=parsed_msg['move']['thrustVector'],
                turn_rate=parsed_msg['move']['turnRate'])

        if 'toggleLights' in parsed_msg:
            pass

        if 'photo' in parsed_msg:
            pass

        if 'startRecording' in parsed_msg:
            pass

        if 'stopRecording' in parsed_msg:
            pass

    # Send the reply_data as a json string if it has any data in it.
    if len(reply_data) > 0:
        reply_message = json.dumps(reply_data)
        return reply_message
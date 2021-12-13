# Taken from:
# https://stackoverflow.com/questions/45364877/interpreting-keypresses-sent-to-raspberry-pi-through-uv4l-webrtc-datachannel
# based on:
# https://raspberrypigpi.stackexchange.com/questions/29480/how-to-use-pigpio-to-control-a-servo-motor-with-a-keyboard
# public domain

# https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py

import time
import json


# import our python files from the same directory
from socket_datachanel import socket_datachanel
from motor_controllers import motor_ctl
from sensors import sensor_ctrl
from utilities import *

msg_socket = socket_datachanel()
sensors = sensor_ctrl()
motors = motor_ctl()

######## Main Program Loop ###########
while True:
    try:
        motors.init_motor_controllers()
        motors.stop_gpio_and_motors()
        # ^ Keeps motors off while disconnected.
        sensors.setup_sensors()

        print('Awaiting connection...')
        try:
            msg_socket.setup_socket(socket_path='/tmp/uv4l.socket',
                                    socket_timeout=3)
        except Exception as e:
            is_important = type(e) != TimeoutError and type(
                e) != FileNotFoundError
            pretty_print_exception(e,
                                   show_traceback=is_important,
                                   msg_socket=msg_socket)
            msg_socket.close_socket()
            time.sleep(3)
            continue  # Go back to start of loop
        else:
            print('Connected!')

        while True:
            recived_message = str(msg_socket.recieve_socket_message())
            if (recived_message != None):
                print('Received message"{}"'.format(recived_message))

                # parse the message data as a JSON formatted string.
                updated_values = json.loads(recived_message)
                print(updated_values)

                if 'move' in updated_values:
                    motors.set_rov_motion(
                        thrust_vector=updated_values['move']['thrustVector'],
                        turn_rate=updated_values['move']['turnRate'])

                elif 'cmds' in updated_values:
                    pass
                    # for key in updated_values:
                    #     value = updated_values[key]
                    #     print("Got command update: {} is {}".format(
                    #         key, value))
                    #     if key is 'lights':
                    #         pass  # todo

    #             else:
    # #                 send_socket_message(json.dumps({
    #                         'error':
    #                         "Got invalid message. 'msgtype' must be specified as either 'motor' or 'cmd' in every message"
    #                     }))

            sensor_values_did_change = sensors.update_all_sensors()
            if sensor_values_did_change:
                msg_socket.send_socket_message(
                    json.dumps(
                        {"sensor_update":
                         sensors.get_changed_sensor_values()}))

    except Exception as error:
        pretty_print_exception(error,
                               show_traceback=True,
                               msg_socket=msg_socket)
        # Clean up the connection
        print('Closing connection...')
        motors.stop_gpio_and_motors()
        msg_socket.close_socket()

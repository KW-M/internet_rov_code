# Taken from:
# https://stackoverflow.com/questions/45364877/interpreting-keypresses-sent-to-raspberry-pi-through-uv4l-webrtc-datachannel
# based on:
# https://raspberrypigpi.stackexchange.com/questions/29480/how-to-use-pigpio-to-control-a-servo-motor-with-a-keyboard
# public domain

# https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py

import time
import json
from datalog import sensor_datalog

# import our python files from the same directory
from socket_datachanel import socket_datachanel
from motion_controller import Motion_Controller
from sensors import sensor_ctrl
from utilities import *

msg_socket = socket_datachanel()
sensors = sensor_ctrl()
# datalog = sensor_datalog()
motors = Motion_Controller()

######## Main Program Loop ###########
while True:
    try:
        motors.stop_gpio_and_motors()
        # ^ Keeps motors off while disconnected.
        try:
            sensors.setup_sensors()
        except Exception as e:
            pretty_print_exception(e,
                                   show_traceback=is_important,
                                   msg_socket=None)
        # datalog.setup_datalog(sensors.get_connected_sensor_column_names())

        try:
            print('Awaiting connection...')
            msg_socket.setup_socket(socket_path='/tmp/uv4l.socket',
                                    socket_timeout=5)
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
            try:
                motors.init_motor_controllers()
                motors.stop_gpio_and_motors()
                # ^ Keeps motors off while disconnected.
            except Exception as e:
                is_important = type(e) != ValueError
                pretty_print_exception(e,
                                       show_traceback=is_important,
                                       msg_socket=None)
                time.sleep(3)
                continue

            reply_data = {}

            recived_message = str(msg_socket.recieve_socket_message())
            if (recived_message != None):
                print('Received message: {}'.format(recived_message))

                # parse the message data as a JSON formatted string.
                recived_data = json.loads(recived_message)

                print(recived_data)

                if 'ping' in recived_data:
                    reply_data['pong'] = recived_data['ping']

                if 'move' in recived_data:
                    motors.set_rov_motion(
                        thrust_vector=recived_data['move']['thrustVector'],
                        turn_rate=recived_data['move']['turnRate'])

                if 'toggleLights' in recived_data:
                    pass

            # sensor_values_did_change = sensors.update_all_sensors()
            # if sensor_values_did_change:
            #     reply_data[
            #         "sensor_update"] = sensors.get_changed_sensor_values()

            # finally, send the reply_data as a json string if it has any data in it.
            if len(reply_data) > 0:
                reply_message = json.dumps(reply_data)
                print('Sending message: {}'.format(reply_message))
                msg_socket.send_socket_message(reply_message)

    except Exception as error:
        pretty_print_exception(error,
                               show_traceback=True,
                               msg_socket=msg_socket)
        # Clean up the connection
        print('Closing connection...')
        motors.stop_gpio_and_motors()
        motors.cleanup_gpio()
        msg_socket.close_socket()
        time.sleep(3)

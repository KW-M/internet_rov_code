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
            msg_socket.setup_socket(socket_path='/users/pi/uv4l.socket',
                                    socket_timeout=0.1)
        except Exception as e:
            print('Socket setup failed: {}'.format(e))
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

                if 'motors' in updated_values:
                    pass
                #     for key in updated_values['motors']:
                #         value = updated_values['motors'][key]
                #         print("Got motor update:{}is{}".format(key, value))
                #         if key == 'left':
                #             FORWARD_LEFT_MOTOR.throttle = value
                #             # driveMotor(FL_in1_pin, FL_in2_pin, value)
                #         elif key == 'right':
                #             FORWARD_RIGHT_MOTOR.throttle = value
                #             # driveMotor(FR_in1_pin, FR_in2_pin, value)
                #         elif key == 'vertical':
                #             VERTICAL_MOTOR.throttle = value
                #             # driveMotor(V_in1_pin, V_in2_pin, value)
                #         elif key == 'strafe':
                #             STRAFING_MOTOR.throttle = value
                #             # driveMotor(S_in1_pin, S_in2_pin, value)

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

    except Exception as e:
        print(e)
        try:
            msg_socket.send_socket_message(json.dumps({'error': e}))
        except:
            pass

        # Clean up the connection
        print('Closing connection...')
        motors.stop_gpio_and_motors()
        msg_socket.close_socket()

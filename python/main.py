# Taken from:
# https://stackoverflow.com/questions/45364877/interpreting-keypresses-sent-to-raspberry-pi-through-uv4l-webrtc-datachannel
# based on:
# https://raspberrypigpi.stackexchange.com/questions/29480/how-to-use-pigpio-to-control-a-servo-motor-with-a-keyboard
# public domain

# https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py

#  AttributeError: 'NoneType' object has no attribute 'send'
# Jan 31 11:06:59 raspberrypi python3[3436]: Initializing motor controllers...
# Jan 31 11:06:59 raspberrypi python3[3436]: %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
# Jan 31 11:06:59 raspberrypi python3[3436]: Can't connect to pigpio at localhost(8888)
# Jan 31 11:06:59 raspberrypi python3[3436]: Can't create callback thread.
# Jan 31 11:06:59 raspberrypi python3[3436]: Perhaps too many simultaneous pigpio connections.
# Jan 31 11:06:59 raspberrypi python3[3436]: %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
# Jan 31 11:06:59 raspberrypi python3[3436]: Traceback (most recent call last):
# Jan 31 11:06:59 raspberrypi python3[3436]:   File "/home/pi/internet_rov_code/python/main.py", line 29, in <module>
# Jan 31 11:06:59 raspberrypi python3[3436]:     motors.init_motor_controllers()
# Jan 31 11:06:59 raspberrypi python3[3436]:   File "/home/pi/internet_rov_code/python/motion_controller.py", line 69, in init_motor_controllers
# Jan 31 11:06:59 raspberrypi python3[3436]:     self.FORWARD_RIGHT_MOTOR = pwm_motor(self.pigpio_instance,
# Jan 31 11:06:59 raspberrypi python3[3436]:   File "/home/pi/internet_rov_code/python/motion_controller.py", line 20, in __init__
# Jan 31 11:06:59 raspberrypi python3[3436]:     self.pigpio_instance.set_mode(self.pin_in1, pigpio.OUTPUT)
# Jan 31 11:06:59 raspberrypi python3[3436]:   File "/usr/lib/python3/dist-packages/pigpio.py", line 1376, in set_mode
# Jan 31 11:06:59 raspberrypi python3[3436]:     return _u2i(_pigpio_command(self.sl, _PI_CMD_MODES, gpio, mode))
# Jan 31 11:06:59 raspberrypi python3[3436]:   File "/usr/lib/python3/dist-packages/pigpio.py", line 1025, in _pigpio_command
# Jan 31 11:06:59 raspberrypi python3[3436]:     sl.s.send(struct.pack('IIII', cmd, p1, p2, 0))
# Jan 31 11:06:59 raspberrypi python3[3436]: AttributeError: 'NoneType' object has no attribute 'send'

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
        # MOTORS
        # try:
        #     motors.init_motor_controllers()
        #     motors.stop_gpio_and_motors()
        #     # ^ Keeps motors off while disconnected.
        # except Exception as e:
        #     is_important = type(e) != ValueError
        #     pretty_print_exception(e,
        #                            show_traceback=is_important,
        #                            msg_socket=None)
        #     time.sleep(3)
        #     continue

        # SENSORS
        # try:
        #     sensors.setup_sensors()
        # except Exception as e:
        #     pretty_print_exception(e,
        #                            show_traceback=is_important,
        #                            msg_socket=None)
        # datalog.setup_datalog(sensors.get_connected_sensor_column_names())

        # import socket,traceback,time
        # sock = socket.socket(socket.AF_UNIX, socket.SOCK_SEQPACKET)
        # sock.settimeout(5)
        # sock.connect('/tmp/go.sock')
        # sock.send(b'hello')
        # sock.recv(1024)
        # sock.close()
        # time.sleep(5)
        # sock = socket.socket(socket.AF_UNIX, socket.SOCK_SEQPACKET)
        # sock.connect('/tmp/go.sock')
        # sock.send(b'hello')
        # sock.recv(1024)
        # sock.close()
        # time.sleep(5)
        # sock = socket.socket(socket.AF_UNIX, socket.SOCK_SEQPACKET)

        # SOCKET DATACHANEL
        try:
            print('Awaiting connection...')
            msg_socket.setup_socket(socket_path='/tmp/go.sock',
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

            reply_data = {}

            recived_message = msg_socket.recieve_socket_message()
            if (recived_message != None):
                recived_message = str(recived_message, 'utf-8')
                print('Received message: {}'.format(recived_message))
                reply_data = {'message': recived_message}

                # parse the message data as a JSON formatted string.
                recived_data = json.loads(recived_message)

                # print(recived_data)

                # if 'ping' in recived_data:
                #     reply_data['pong'] = recived_data['ping']

                # if 'move' in recived_data:
                #     motors.set_rov_motion(
                #         thrust_vector=recived_data['move']['thrustVector'],
                #         turn_rate=recived_data['move']['turnRate'])

                # if 'toggleLights' in recived_data:
                #     pass

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

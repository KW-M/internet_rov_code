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
import logging

# import our python files from the same directory
# import logging_formatter
from socket_datachannel import Socket_Datachannel
from motion_controller import Motion_Controller
from sensor_log import Sensor_Log
from sensors import sensor_ctrl
from mesage_handler import handle_socket_message
from utilities import *

############################
##### Setup Variables #####
msg_socket = Socket_Datachannel()
sensors = sensor_ctrl()
sensr_log = Sensor_Log()
motors = Motion_Controller()

############################
###### setup logging #######
logging.root.setLevel(logging.DEBUG)
log = logging.getLogger(__name__)

######################################
######## Main Program Loop ###########
######################################
while True:

    try:
        ######## SETUP #########

        # ----- MOTORS -----
        motors.init_motor_controllers()
        motors.stop_gpio_and_motors()  # Keep motors off while disconnected:

        # ----- SENSORS -----
        sensors.setup_sensors()

        # ----- SENSOR_LOG -----
        sensr_log.setup_sensor_log(sensors.get_connected_sensor_column_names())

        # ----- SOCKET CONNECTION ----
        success = msg_socket.setup_socket(socket_path='/tmp/go.sock',
                                          socket_timeout=5)
        if not success:
            log.warning(
                'Unix socket connection not open. Retrying in 3 seconds...')
            time.sleep(3)
            continue

        ######## MESSAGE LOOP #########
        while True:

            # Wait for a message to arrive (or timeout)
            # - Note the timeout effectively sets how frequently reply messages can go out when no messages come in.
            recived_message = msg_socket.recieve_socket_message()
            log.debug('recived_message: ' + str(recived_message))

            # Handle the message and generate a response message (if needed)
            reply_message = handle_socket_message(recived_message, motors,
                                                  sensors, sensr_log)

            # Send the response message
            log.debug('Sending reply message: ' + str(reply_message))
            msg_socket.send_socket_message(reply_message)

    except Exception as error:

        if hasattr(error,
                   "suppress_traceback") and error.suppress_traceback == True:
            log.error(str(error))
        else:
            log.error(error, exc_info=True)

        try:
            motors.stop_gpio_and_motors()
            motors.cleanup_gpio()
            errorMessage = json.dumps({'error': str(error)})
            msg_socket.send_socket_message(errorMessage)
            msg_socket.close_socket()
        except:
            pass

        time.sleep(3)

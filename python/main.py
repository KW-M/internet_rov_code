# Taken from:
# https://stackoverflow.com/questions/45364877/interpreting-keypresses-sent-to-raspberry-pi-through-uv4l-webrtc-datachannel
# based on:
# https://raspberrypigpi.stackexchange.com/questions/29480/how-to-use-pigpio-to-control-a-servo-motor-with-a-keyboard
# public domain
# https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py

import time
import json
import logging

import asyncio

# import our python files from the same directory
# import logging_formatter
from unix_socket import Unix_Socket
from motion_controller import Motion_Controller
# from sensor_log import Sensor_Log
from sensors import Sensor_Controller
from mesage_handler import socket_incoming_message_handler_loop, socket_update_message_sender_loop
from utilities import *

############################
##### Setup Variables #####
unix_socket = Unix_Socket(socket_path="/tmp/go_robot.socket")
sensors = Sensor_Controller()
# sensor_log = Sensor_Log(sensors.all_sensors)
motion_ctrl = Motion_Controller()

############################
###### setup logging #######

# assuming loglevel is bound to the string value obtained from the
# command line argument. Convert to upper case to allow the user to
# specify --log=DEBUG or --log=debug

logging.basicConfig(level=logging.DEBUG)
log = logging.getLogger(__name__)


######################################
######## Main Program Loop ###########
######################################
async def main():
    # setup the asyncio loop to run each of these functions aka "tasks" aka "coroutines" concurently
    await asyncio.gather(
        sensors.sensor_setup_loop(), motion_ctrl.motor_setup_loop(),
        unix_socket.socket_relay_setup_loop(),
        socket_incoming_message_handler_loop(unix_socket, motion_ctrl),
        socket_update_message_sender_loop(unix_socket, sensors=sensors))


asyncio.run(main())

# while True:

#     try:
#         ######## SETUP #########

#         # ----- SOCKET CONNECTION ----
#         success = msg_socket.setup_socket(socket_path='/tmp/go_robot.socket',
#                                           socket_timeout=5)
#         if not success:
#             log.warning(
#                 'Unix socket connection not open. Retrying in 3 seconds...')
#             time.sleep(3)
#             continue

#         # # ----- MOTORS -----
#         motors.init_motor_controllers()
#         motors.stop_gpio_and_motors()  # Keep motors off while disconnected:

#         # # ----- SENSORS -----
#         # sensors.setup_sensors()

#         # # ----- SENSOR_LOG -----
#         # sensr_log.setup_sensor_log(sensors.get_connected_sensor_column_names())

#         ######## MESSAGE LOOP #########
#         while True:

#             # Wait for a message to arrive (or timeout)
#             # - Note the timeout effectively sets how frequently reply messages can go out when no messages come in.
#             recived_message = msg_socket.recieve_socket_message()

#             # Handle the message and generate a response message (if needed)
#             reply_message = handle_socket_message(recived_message, motors,
#                                                   sensors, sensr_log)

#             # Send the response message
#             if reply_message != None:
#                 success = msg_socket.send_socket_message(reply_message)
#                 # log.debug('Sending reply message: ' + str(reply_message) +
#                 #           " Successful?: " + str(success))

#     except Exception as error:

#         if hasattr(error,
#                    "suppress_traceback") and error.suppress_traceback == True:
#             log.error(str(error))
#         else:
#             log.error(error, exc_info=True)

#         try:
#             # motors.stop_gpio_and_motors()
#             # motors.cleanup_gpio()
#             # errorMessage = json.dumps({'error': str(error)})
#             # msg_socket.send_socket_message(errorMessage)
#             msg_socket.close_socket()
#         except:
#             pass

#         time.sleep(3)

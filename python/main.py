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
from config_reader import read_config_file, get_log_level
from command_api import start_aiohttp_api_server
from named_pipe import Duplex_Named_Pipe_Relay
# from unix_socket import Unix_Socket
from motion_controller import Motion_Controller
from media_stream_controller import Media_Stream_Controller

# from sensor_log import Sensor_Log
from sensors_controller import Sensor_Controller
from mesage_handler import MessageHandler
from utilities import *
# import logging_formatter

config = read_config_file()

###### Setup Logging #######
############################

# set the Loglevel is from command line argument or config file. Use either --LogLevel=DEBUG or --LogLevel=debug
logging.basicConfig(level=get_log_level(config['LogLevel']))
log = logging.getLogger(__name__)


######## Main Program Loop ###########
######################################
async def main():
    global duplex_relay, sensors, motion_ctrl, message_handler, media_ctrl

    ##### Setup Variables #####
    ############################

    named_pipe_folder = config['NamedPipeFolder']
    duplex_relay = Duplex_Named_Pipe_Relay(
        named_pipe_folder + 'from_webrtc_relay.pipe',
        named_pipe_folder + 'to_webrtc_relay.pipe')
    sensors = Sensor_Controller(config)
    # sensor_log = Sensor_Log(sensors.all_sensors)
    motion_ctrl = Motion_Controller()
    media_ctrl = Media_Stream_Controller(named_pipe_folder)
    message_handler = MessageHandler(duplex_relay, media_ctrl, motion_ctrl,
                                     sensors, config)

    # setup the asyncio loop to run each of these async functions aka "tasks" aka "coroutines" concurently
    await asyncio.gather(
        sensors.sensor_setup_loop(),
        motion_ctrl.motor_setup_loop(),
        duplex_relay.start_loops(),
        message_handler.socket_incoming_message_handler_loop(),
        message_handler.socket_update_message_sender_loop(),
        # start_aiohttp_api_server()
    )


##### run the main program loop, and exit quietly if ctrl-c is pressed  #####
try:
    asyncio.run(main())
except KeyboardInterrupt:
    pass
finally:
    # cleanup that will always run no matter what
    # sensors.cleanup()
    # motion_ctrl.cleanup_gpio()
    duplex_relay.cleanup()
    media_ctrl.cleanup()
    pass

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

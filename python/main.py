# Taken from:
# https://stackoverflow.com/questions/45364877/interpreting-keypresses-sent-to-raspberry-pi-through-uv4l-webrtc-datachannel
# based on:
# https://raspberrypigpi.stackexchange.com/questions/29480/how-to-use-pigpio-to-control-a-servo-motor-with-a-keyboard
# public domain
# https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py

import logging
import asyncio
import pigpio

# import our python files from the same directory
from config_reader import read_config_file, get_log_level
# from command_api import start_aiohttp_api_server
from grpc_client import Relay_GRPC_Client
# from unix_socket import Unix_Socket
from motion.motion_controller import MotionController
from media_stream_controller import MediaStreamController
from status_led import Status_Led_Controller
from rovSecurity.userAuth import readAuthStateFromDisk

# from sensor_log import Sensor_Log
from sensors.sensors_controller import SensorController
from mesage_handler import MessageHandler
# import logging_formatter

config = read_config_file()
readAuthStateFromDisk()

###### Setup Logging #######
############################

# set the Loglevel from command line argument or config file. Use either --LogLevel=DEBUG or --LogLevel=debug
logging.basicConfig(level=get_log_level(config['LogLevel']))
log = logging.getLogger(__name__)


######## Main Program Loop ###########
######################################
async def main():
    global relay_grpc, sensors, motion_ctrl, message_handler, media_ctrl, status_led_ctrl

    ##### Setup Variables #####
    ############################

    pigpio_instance = pigpio.pi()
    status_led_ctrl = Status_Led_Controller(21, pigpio_instance)
    status_led_ctrl.on()

    relay_grpc = Relay_GRPC_Client(config['GRPCServerAddress'])
    sensors = SensorController()
    # sensor_log = Sensor_Log(sensors.all_sensors)
    motion_ctrl = MotionController(pigpio_instance=pigpio_instance)
    media_ctrl = MediaStreamController()
    message_handler = MessageHandler(relay_grpc, media_ctrl, motion_ctrl, sensors)

    # setup the asyncio loop to run each of these async functions aka "tasks" aka "coroutines" concurently
    await asyncio.gather(
        sensors.sensor_setup_loop(),
        motion_ctrl.motor_setup_loop(),
        relay_grpc.start_loop(message_handler),
        message_handler.update_sender_loop(),
        # start_aiohttp_api_server()
    )


##### run the main program loop, and exit quietly if ctrl-c is pressed  #####
try:
    asyncio.run(main())
except KeyboardInterrupt:
    pass
finally:
    # finally = stuff that will always run no matter what
    status_led_ctrl.off()
    sensors.cleanup()
    motion_ctrl.cleanup_gpio()
    # relay_grpc.cleanup()
    media_ctrl.cleanup()

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
#         motors.stop_motors()  # Keep motors off while disconnected:

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
#             # motors.stop_motors()
#             # motors.cleanup_gpio()
#             # errorMessage = json.dumps({'error': str(error)})
#             # msg_socket.send_socket_message(errorMessage)
#             msg_socket.close_socket()
#         except:
#             pass

#         time.sleep(3)

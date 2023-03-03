# Taken from:
# https://stackoverflow.com/questions/45364877/interpreting-keypresses-sent-to-raspberry-pi-through-uv4l-webrtc-datachannel
# based on:
# https://raspberrypigpi.stackexchange.com/questions/29480/how-to-use-pigpio-to-control-a-servo-motor-with-a-keyboard
# public domain
# https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py

import logging
import asyncio
import pigpio
# import select, sys

# import our python files from the same directory
from config_reader import read_config_file, get_log_level
# from command_api import start_aiohttp_api_server
from grpc_client import RelayGRPCClient
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

    relay_grpc = RelayGRPCClient(config['GRPCServerAddress'])
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
        # start_aiohttp_api_server(),
        # monitor_tasks()
    )


##### run the main program loop, and exit quietly if ctrl-c is pressed  #####
try:
    asyncio.run(main(), debug=False)
except KeyboardInterrupt:
    pass
finally:
    # finally = stuff that will always run no matter what
    status_led_ctrl.off()
    sensors.cleanup()
    motion_ctrl.cleanup_gpio()
    relay_grpc.cleanup()
    media_ctrl.cleanup()

#### ASYNCIO DEBUG ####

# async def monitor_tasks():
#     '''Prints stack traces of all tasks when Enter is pressed.
#     Add to the event loop with:
#     asyncio.run(main(),debug=True)
#     asyncio.gather(..., monitor_tasks())
#     '''

#     print("Press Enter to print stack traces of all tasks...")
#     while True:
#         if select.select([
#                 sys.stdin,
#         ], [], [], 0.01)[0]:
#             char = sys.stdin.read(1)
#             tasks = [t for t in asyncio.all_tasks() if t is not asyncio.current_task()]
#             [t.print_stack(limit=5) for t in tasks]

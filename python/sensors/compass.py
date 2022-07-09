import time
import sys
import logging
import qwiic_icm20948

from utilities import *
from sensors.fusion_async import Fusion  # Using async version
from sensors.generic_sensor import Generic_Sensor

###### setup logging #######
log = logging.getLogger(__name__)

compass_IMU = qwiic_icm20948.QwiicIcm20948()


# User coro returns data and determines update rate.
# For 9DOF sensors returns three 3-tuples (x, y, z) for accel, gyro and mag
async def read_compass_coro():
    global compass_IMU
    while not compass_IMU or not compass_IMU.connected or not compass_IMU.dataReady(
    ):
        await asyncio.sleep_ms(30)  # Plenty of time for mag to be ready

    # read all axis and temp from sensor, note this also updates all instance variables
    compass_IMU.getAgmt()
    return (compass_IMU.axRaw, compass_IMU.ayRaw,
            compass_IMU.azRaw), (compass_IMU.gxRaw, compass_IMU.gyRaw,
                                 compass_IMU.gzRaw), (compass_IMU.mxRaw,
                                                      compass_IMU.myRaw,
                                                      compass_IMU.mzRaw)


async def setup_compass_sensor():
    global compass_IMU
    compass_IMU = qwiic_icm20948.QwiicIcm20948()

    if compass_IMU.connected == False:
        raise Exception("Compass (Sparkfun ICM20948) isn't connected.")

    compass_IMU.begin()
    compass_fused = Fusion(read_compass_coro)
    await compass_fused.start()  # Start the update task
    return compass_fused


async def read_compass_sensor(compass_fused):
    return [compass_fused.heading, compass_fused.pitch, compass_fused.roll]


pressure_temp_sensor = Generic_Sensor('ICM20948_fused_compass', 1,
                                      ['yaw', 'pitch', 'roll'],
                                      ['deg', 'deg', 'deg'],
                                      setup_compass_sensor,
                                      read_compass_sensor)

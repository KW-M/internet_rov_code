import time
import asyncio
import logging
import qwiic_icm20948

from sensors.fusion_async import Fusion  # Using async version
from sensors.generic_sensor import Generic_Sensor

###### setup logging #######
log = logging.getLogger(__name__)


def TimeDiff(start, end):  # Timestamps here are in seconds
    return (start - end)


class FusedCompassSensor(Generic_Sensor):
    sensor_name = "ICM20948_fused_compass"
    measurement_names = ['yaw', 'pitch', 'roll']
    measurement_units = ['deg', 'deg', 'deg']
    sensor_read_interval = 0.05

    imu = None
    fusion = None

    ACCEL_SCALING = 65534 / 8.0  # given self.imu.setFullScaleRangeAccel(qwiic_icm20948.gpm4)
    GYRO_SCALING = 65534 / 1000.0  # given self.imu.setFullScaleRangeGyro(qwiic_icm20948.dps500)
    MAG_SCALING = 10.0

    def __init__(self):
        super().__init__()
        self.fusion = None

    # User coro returns data and determines update rate.
    # For 9DOF sensors returns three 3-tuples (x, y, z) for accel, gyro and mag
    async def read_compass_coro(self):
        await asyncio.sleep(0.05)  # Plenty of time for mag to be ready
        while not self.imu or not self.imu.connected:
            print("compass not connected")
            asyncio.sleep(5)
        while not self.imu.dataReady():
            await asyncio.sleep(0.005)

        # read all axis and temp from sensor, note this also updates all instance variables
        self.imu.getAgmt()
        output = ((self.imu.axRaw / self.ACCEL_SCALING,
                   self.imu.ayRaw / self.ACCEL_SCALING,
                   self.imu.azRaw / self.ACCEL_SCALING),
                  (self.imu.gxRaw / self.GYRO_SCALING,
                   self.imu.gyRaw / self.GYRO_SCALING,
                   self.imu.gzRaw / self.GYRO_SCALING),
                  (self.imu.mxRaw / self.MAG_SCALING,
                   self.imu.myRaw / self.MAG_SCALING,
                   self.imu.mzRaw / self.MAG_SCALING), time.time())

        # print(str(output))

        return output

    async def setup_sensor(self):
        if not self.imu:
            self.imu = qwiic_icm20948.QwiicIcm20948()

        if self.imu.connected is False:
            raise Exception("Compass (Sparkfun ICM20948) isn't connected.")

        self.imu.begin()
        self.imu.setFullScaleRangeAccel(qwiic_icm20948.gpm4)
        self.imu.setFullScaleRangeGyro(qwiic_icm20948.dps500)
        # self.imu.enableDlpfAccel(True)
        # self.imu.enableDlpfGyro(True)
        # # acc_d11bw5_n17bw
        # https://github.com/sparkfun/SparkFun_ICM-20948_ArduinoLibrary/blob/d5ae1eba1ecbf808fca9bff0b0b6dc4e571e947c/examples/Arduino/Example4_WakeOnMotion/Example4_WakeOnMotion.ino#L151
        # self.imu.setDLPFcfgAccel(qwiic_icm20948.acc_d111bw4_n136bw)
        # https://github.com/sparkfun/SparkFun_ICM-20948_ArduinoLibrary/blob/d5ae1eba1ecbf808fca9bff0b0b6dc4e571e947c/examples/Arduino/Example4_WakeOnMotion/Example4_WakeOnMotion.ino#L160
        # self.imu.setDLPFcfgGyro(qwiic_icm20948.gyr_d119bw5_n154bw3)

        # Start fusion update task
        self.fusion = Fusion(self.read_compass_coro, timediff=TimeDiff)
        await self.fusion.start(slow_platform=False)

    async def read_sensor(self):
        # print("fused: " +
        #       str([self.fusion.heading, self.fusion.pitch, self.fusion.roll]))
        return [self.fusion.heading, self.fusion.pitch,
                self.fusion.roll], self.sensor_read_interval


fused_compass_sensor = FusedCompassSensor()

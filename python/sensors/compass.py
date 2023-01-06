import time
import asyncio
import logging
import qwiic_icm20948
from ahrs import Quaternion

from cython_modules.rov_cython_modules import Py_Fused_Compass
from sensors.generic_sensor import GenericSensor
from protobuf.rov_action_api import Measurement, SensorMeasurmentTypes

###### setup logging #######
log = logging.getLogger(__name__)

# cpdef run_fused_compass():
#     # printHello(4)
#     a = Py_Fused_Compass()
#     while(not a.setup_sensor()):
#         print("Failed to setup sensor")
#         time.sleep(0.1)

#     while True:
#         quat, quat_accuracy, temp_c = a.read_sensor()
#         print(Quaternion(quat).to_angles(), quat_accuracy, temp_c)
#         time.sleep(0.1)


class FusedCompassSensor(GenericSensor):
    sensor_name = "ICM20948_fused_compass"
    measurements = [Measurement(SensorMeasurmentTypes.yaw_degrees, 0), Measurement(SensorMeasurmentTypes.pitch_degrees, 0), Measurement(SensorMeasurmentTypes.roll_degrees, 0), Measurement(SensorMeasurmentTypes.internal_temp_celsius, 0)]
    sensor_read_interval = 0.05

    imu: Py_Fused_Compass = None

    # ACCEL_SCALING = 65534 / 8.0  # given self.imu.setFullScaleRangeAccel(qwiic_icm20948.gpm4)
    # GYRO_SCALING = 65534 / 1000.0  # given self.imu.setFullScaleRangeGyro(qwiic_icm20948.dps500)
    # MAG_SCALING = 10.0
    TEMP_SCALING = 333.87
    TEMP_OFFSET = 21

    def __init__(self):
        super().__init__()
        self.imu = Py_Fused_Compass()

    # Helper function to convert raw imu temperature data to degrees Celsius
    def temp_celsius(self, val):
        # from https://github.com/sparkfun/SparkFun_ICM-20948_ArduinoLibrary/blob/fd948fbc5dbe080eddafe88e3c1f7eadf5baff69/src/ICM_20948.cpp
        return (float(val - self.TEMP_OFFSET) / self.TEMP_SCALING) + self.TEMP_OFFSET

    async def setup_sensor(self) -> None:
        if self.imu.setup_sensor() is False:
            raise Exception("Failed to setup compass imu (Sparkfun ICM20948).")

    async def read_sensor(self) -> tuple[list[float], float]:
        quat, quat_accuracy, temp_c = self.imu.read_sensor()
        angles = Quaternion(quat).to_angles()
        roll, pitch, yaw = angles
        pitch /= 3.14159 / 180
        roll /= 3.14159 / 180
        yaw /= 3.14159 / 180
        # print("yaw", yaw, "pitch", pitch, "roll", roll, quat_accuracy, temp_c)

        fused_values = [yaw, pitch, roll, temp_c]
        return (fused_values, self.sensor_read_interval)

    def cleanup(self) -> None:
        self.imu.cleanup()


fused_compass_sensor = FusedCompassSensor()

import logging

import ms5803py
from sensors.generic_sensor import GenericSensor
from protobuf.rov_action_api import Measurement, SensorMeasurmentTypes

###### setup logging #######
log = logging.getLogger(__name__)


class PressureTempSensor(GenericSensor):
    sensor_name = "ms5803_pressure_temp"
    measurements = [Measurement(SensorMeasurmentTypes.pressure_mbar, 0), Measurement(SensorMeasurmentTypes.water_temp_celsius, 0)]
    sensor_read_interval = 1.0
    active_sensor: ms5803py.MS5803 = None

    async def setup_sensor(self):
        self.active_sensor = ms5803py.MS5803()

    async def read_sensor(self):
        pressure, temp = self.active_sensor.read(pressure_osr=4096)
        return ([pressure, temp], self.sensor_read_interval)

    def cleanup(self):
        self.active_sensor
        pass  # not needed


pressure_temp_sensor = PressureTempSensor()

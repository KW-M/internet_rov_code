import logging

import ms5803py
from sensors.generic_sensor import Generic_Sensor
from protobuf.rov_action_api import Measurement, SensorMeasurmentTypes

###### setup logging #######
log = logging.getLogger(__name__)


class PressureTempSensor(Generic_Sensor):
    sensor_name = "ms5803_pressure_temp"
    measurements = [Measurement(SensorMeasurmentTypes.pressure_mbar, 0), Measurement(SensorMeasurmentTypes.water_temp_celsius, 0)]
    sensor_read_interval = 1.0

    async def setup_sensor(self):
        return ms5803py.MS5803()

    async def read_sensor(self):
        pressure, temp = self.sensor_connection.read(pressure_osr=4096)
        return [pressure, temp]

    def cleanup(self):
        pass


pressure_temp_sensor = PressureTempSensor()

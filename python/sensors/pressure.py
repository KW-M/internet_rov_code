import logging

import ms5803py
from sensors.generic_sensor import Generic_Sensor

###### setup logging #######
log = logging.getLogger(__name__)


class PressureTempSensor(Generic_Sensor):
    sensor_name = "ms5803_pressure_temp"
    measurement_names = ['pressure', 'temperature']
    measurement_units = ['mBar', 'C']
    sensor_read_interval = 1.0

    async def setup_sensor(self):
        return ms5803py.MS5803()

    async def read_sensor(self, _):
        pressure, temp = self.sensor_connection.read(pressure_osr=4096)
        return [pressure, temp]


pressure_temp_sensor = PressureTempSensor()

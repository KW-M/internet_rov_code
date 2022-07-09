from generic_sensor import Generic_Sensor
import logging
import ms5803py

from utilities import *

###### setup logging #######
log = logging.getLogger(__name__)


async def setup_pressure_sensor():
    return ms5803py.MS5803()


async def read_pressure_sensor(sensor_connection):
    pressure, temp = sensor_connection.read(pressure_osr=4096)
    return [pressure, temp]


pressure_temp_sensor = Generic_Sensor('ms5803_pressure_temp', 1,
                                      ['pressure', 'temperature'],
                                      ['mPa', 'C'], setup_pressure_sensor,
                                      read_pressure_sensor)

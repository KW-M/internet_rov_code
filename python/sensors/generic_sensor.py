from array import array
import asyncio
from cmath import nan
import logging

from utilities import *

###### setup logging #######
log = logging.getLogger(__name__)


class Generic_Sensor:
    def __init__(self, name: str, sensor_read_interval: float,
                 measurement_names: str, measurement_units: str,
                 setup_sensor_function, read_sensor_function):
        self.sensor_name = name
        self.sensor_connection = None
        self.sensor_read_interval = sensor_read_interval

        self.measurement_names = measurement_names
        self.measurement_units = measurement_units
        self.measured_values = [nan] * len(measurement_names)

        self.setup_sensor_function = setup_sensor_function
        self.read_sensor_function = read_sensor_function

        self.sensor_value_changed_flag = asyncio.Event()

    async def start_sensor_loop(self):
        self.sensor_error_flag = asyncio.Event()
        await asyncio.gather(
            self.sensor_setup_loop(),
            self.sensor_read_loop(),
        )

    async def sensor_setup_loop(self):
        while True:
            try:
                self.sensor_connection = await self.setup_sensor_function()
                self.sensor_error_flag.clear()
                await self.sensor_error_flag.wait()
            except asyncio.CancelledError:
                return
            except IOError as e:
                log.error("Error in setup_sensors() Sensor Not Responding: " +
                          str(e))
                self.sensor_error_flag.set()
                await asyncio.sleep(3)
            except Exception as e:
                log.error("Error Setting Up Sensors:", exc_info=e)
                self.sensor_error_flag.set()
                await asyncio.sleep(3)

    async def sensor_read_loop(self):
        while True:
            new_readings: list[float]
            try:
                if (self.sensor_connection is None
                        or self.sensor_error_flag.is_set()):
                    await asyncio.sleep(self.sensor_read_interval)
                    continue
                new_readings = await self.read_sensor_function(
                    self.sensor_connection)
                if new_readings != self.measured_values:
                    self.measured_values = new_readings
                    self.sensor_value_changed_flag.set()
            except asyncio.CancelledError:
                return
            except IOError as e:
                log.warning("IO Error reading " + self.sensor_name +
                            " sensor, is it disconnected? " + str(e))
            except Exception as e:
                log.error("Error reading " + self.sensor_name + " sensor:",
                          exc_info=e)
                self.sensor_error_flag.set()

            await asyncio.sleep(self.sensor_read_interval)

"""
high level support for doing this and that.
"""

import asyncio
import logging
from typing import Tuple
from protobuf.rov_action_api import Measurement


class GenericSensor:

    ###### setup logging #######
    log = logging.getLogger(__name__)

    ## --- TO BE OVERRIDDEN BY SENSOR SUBCLASSES -------

    # The name the sensor should be idenfied by
    sensor_name: str = "Generic Sensor"
    # A list of measurements the sensor provides as Measurement classes
    measurements: list[Measurement] = []
    # A list of flags to indicate if the corresponding measurement in the measurements list has been updated since the last time it was read by the sensor_controller
    measurement_updated_flags: list[bool] = []
    # An asyncio flag to indicate if the sensor is currently in an error state and should not be used until initilized again
    sensor_error_flag: asyncio.Event

    # # The name(s) of the kind(s) of measurement(s) the sensor provides (e.g. pressure, temperature, humidity)
    # measurement_names: list[str] = []
    # # The units(s) for the kind(s) of measurement(s) the sensor provides (in the same order as the measurement_names list)
    # measurement_units: list[str] = []
    # The most recently measured value(s) for the kind(s) of measurement(s) the sensor provides (in the same order as the measurement_names list)
    # ! measured_values should not be set in read_sensor(). It will automatically be updated from the return value of read_sensor()
    # measured_values: list[float] = []
    async def setup_sensor(self):
        '''
        (Required) run any setup to get the sensor initilized here.
        Any exception raised will be caught, logged and trigger setup_sensor() to be run again after a delay.
        Exceptions will also cause sensor_read_loop() to be stopped until setup_sensor() is successful again.
        '''
        return None

    async def read_sensor(self) -> Tuple[list[float], float]:
        '''
        (Required) get the latest sensor readings for this sensor.
        Returns: a tuple (a, b) where a & b are:
        - a: A list of the current sensor values as floats - in the same order as the measurements list
        - b: The time to wait before calling read_sensor() again
        Any exception raised will be caught and logged, but will not stop the sensor_read_loop()
        '''
        print("%s: read_sensor() not implemented!", self.sensor_name)
        return ([], 0.1)

    #
    async def do_sensor_action(self, action: str, value: str) -> bool:
        '''
        (Optional) can be used to perform any action with this sensor, for example setting calibration values or sensor modes
        Parameters: action: string, value: string
        Returns True if action was successful, False otherwise
        '''
        print("%s: do_sensor_action() not implemented! %s, %s", self.sensor_name, action, value)
        return False

    def cleanup(self) -> None:
        '''
        (Optional) if the sensor needs to do any cleanup when the program exits, do it here
        '''
        print("%s: cleanup() not implemented!", self.sensor_name)

    ## END -------------------------------------

    def __init__(self):
        self.measurement_updated_flags = [False] * len(self.measurements)

    def __str__(self) -> str:
        return self.sensor_name + "=" + "|".join([str(m.value) for m in self.measurements])

    async def start_sensor_loop(self):
        self.sensor_error_flag = asyncio.Event()
        await asyncio.gather(
            self._sensor_setup_loop(),
            self._sensor_read_loop(),
        )

    async def _sensor_setup_loop(self):
        self.sensor_error_flag.set()
        while True:
            try:
                await self.setup_sensor()
                self.sensor_error_flag.clear()
                await self.sensor_error_flag.wait()
            except asyncio.CancelledError:
                return False
            except IOError as err:
                self.log.error("IOError in sensor_setup_loop() %s Sensor Not Responding: %s", self.sensor_name, err)
                self.sensor_error_flag.set()
                await asyncio.sleep(3)
            except Exception as err:
                self.log.error("Error Setting Up Sensors: %s", err, exc_info=True)
                self.sensor_error_flag.set()
                await asyncio.sleep(3)

    async def _sensor_read_loop(self):
        sensor_wait_time = 1.0
        while True:
            if self.sensor_error_flag.is_set():
                await asyncio.sleep(sensor_wait_time)
                continue

            try:
                new_readings, sensor_wait_time = await self.read_sensor()
                measurement_count = len(self.measurements)
                if len(new_readings) != measurement_count:
                    self.log.error("Sensor %s returned %i readings, but only has %i measurement types defined", self.sensor_name, len(new_readings), len(self.measurements))
                    await asyncio.sleep(10)
                    continue
                for i, new_reading in enumerate(new_readings):
                    mesurement = self.measurements[i]
                    if new_reading != mesurement.value:
                        self.measurements[i].value = new_reading
                        self.measurement_updated_flags[i] = True
            except asyncio.CancelledError:
                return
            except IOError as err:
                self.log.warning("IO Error reading %s, is it disconnected? %s", self.sensor_name, err)
            except Exception as err:
                self.log.error("Error reading %s: %s", self.sensor_name, err, exc_info=True)
                self.sensor_error_flag.set()

            await asyncio.sleep(sensor_wait_time)

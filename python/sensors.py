from array import array
import asyncio
from cmath import nan
import logging
from types import MethodType
import ms5803py

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
        self.sensor_error_flag = asyncio.Event()
        self.sensor_value_changed_flag = asyncio.Event()
        return self

    async def start_sensor_loop(self):
        await asyncio.gather(
            self.sensor_setup_loop(),
            self.sensor_read_loop(),
        )

    async def sensor_setup_loop(self):
        while True:
            try:
                self.sensor_connection = await self.setup_sensor_function()
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
                new_readings = await self.read_sensor_function(
                    self.sensor_connection)
                if new_readings != self.measured_values:
                    self.value = new_readings
                    self.sensor_value_changed_flag.set()
                break
            except IOError as e:
                log.warning(
                    "IO Error reading pressure sensor, is it disconnected? " +
                    str(e))
            except Exception as e:
                log.error("Error Reading " + self.sensor_name + " Sensor:",
                          exc_info=e)
                self.sensor_error_flag.set()

            await asyncio.sleep(self.sensor_read_interval)


async def setup_pressure_sensor():
    return ms5803py.MS5803()


async def read_pressure_sensor(sensor_connection):
    list(sensor_connection.read(pressure_osr=4096))


pressure_temp_sensor = Generic_Sensor('ms5803_pressure_temp', 1,
                                      ['pressure', 'temperature'],
                                      ['mPa', 'C'], setup_pressure_sensor,
                                      read_pressure_sensor),

# arduino_sensors_interface = Generic_Sensor('arduino_interface_sensors', 1, ['yaw', 'pitch', 'roll'], ['deg', 'deg','deg'], setup_pressure_sensor,read_pressure_sensor),



class Sensor_Controller:
    all_sensors = [pressure_temp_sensor]

    async def sensor_setup_loop(self):
        log.info("Setting Up Sensors...")
        sensor_setup_tasks = [
            sensor[0].start_sensor_loop() for sensor in self.all_sensors
        ]
        print(sensor_setup_tasks)
        await asyncio.gather(*sensor_setup_tasks)

    def get_sensor_update_dict(self):
        sensor_dict = {}
        for sensor in self.all_sensors:
            if sensor.sensor_value_changed_flag.is_set():
                sensor.sensor_value_changed_flag.clear()
                for i in range(len(sensor.measurement_names)):
                    sensor_dict[sensor.measurement_names[i]] = sensor.measured_values[i]
        return sensor_dict

    # def get_sensor_column_names(self):
    #     output_column_names = ['date_time']

    # def get_sensor_values_row(self):
    #     rowString = ""
    #     for sensor in all_sensors:
    #         self.current_sensor_state[sensor.sensor_name] = sensor.measured_values

    # def update_all_sensors(self):
    #     for sensor in all_sensors:
    #         if(sensor.sensor_value_changed_flag.is_set()):
    #             sensor.sensor_value_changed_flag.clear()

    #                 self.current_sensor_state[sensor.measurement_names[sensor_index]] = sensor_value
    #             self.current_sensor_state[sensor.sensor_name] = sensor.measured_values

    #     # Read the orientation sensor values
    #     if self.orientation_sensor is not None:
    #         pass

    #     # Read the photoresistor (light sensor) values
    #     if self.light_sensor is not None:
    #         pass

    #     return self.sensor_values_have_changed_flag

    # def get_changed_sensor_values(self):
    #     self.sensor_values_have_changed_flag = False
    #     return self.current_sensor_state

    # def get_connected_sensor_column_names(self):
    #     output_column_names = ['date_time']
    #     if self.pressure_sensor:
    #         output_column_names.append('pressure')
    #         output_column_names.append('temp')
    #     if self.orientation_sensor:
    #         output_column_names.append('yaw')
    #         output_column_names.append('roll')
    #         output_column_names.append('pitch')
    #         output_column_names.append('accel_x')
    #         output_column_names.append('accel_y')
    #         output_column_names.append('accel_z')
    #     if self.light_sensor:
    #         output_column_names.append('light')
    #     return output_column_names

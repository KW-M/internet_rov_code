from array import array
import asyncio
from cmath import nan
import logging
from sensors.pressure import pressure_temp_sensor
from sensors.compass import fused_compass_sensor
from config_reader import program_config

from utilities import *

###### setup logging #######
log = logging.getLogger(__name__)

all_possible_sensors = [pressure_temp_sensor, fused_compass_sensor]


class Sensor_Controller:
    connected_sensors = []
    EnabledSensors = []

    def __init__(self):
        self.EnabledSensors = program_config.get("EnabledSensors", [])

    async def sensor_setup_loop(self):
        log.info("Setting Up Sensors...")
        self.connected_sensors = filter(
            lambda sensor: sensor.sensor_name in self.EnabledSensors,
            all_possible_sensors)
        sensor_tasks = [
            sensor.start_sensor_loop() for sensor in self.connected_sensors
        ]
        await asyncio.gather(*sensor_tasks)

    def get_sensor_update_dict(self):
        sensor_dict = {}
        for sensor in self.connected_sensors:
            if sensor.sensor_value_changed_flag.is_set():
                sensor.sensor_value_changed_flag.clear()
                for i in range(len(sensor.measurement_names)):
                    measurement_name = sensor.measurement_names[i]
                    measured_value = sensor.measured_values[i]
                    sensor_dict[measurement_name] = measured_value

        return sensor_dict

    def cleanup(self):
        for sensor in self.connected_sensors:
            # sensor.sensor_connection.close()
            pass

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

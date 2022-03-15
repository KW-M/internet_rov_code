import logging
import ms5803py

from utilities import *

###### setup logging #######
log = logging.getLogger(__name__)


class sensor_ctrl:

    sensor_values_have_changed_flag = False
    current_sensor_state = {
        'pressure': 0,
        'temp': 0,
        'light': 0,
        'yaw': 0,
        'roll': 0,
        'pitch': 0,
        'accel_x': 0,
        'accel_y': 0,
        'accel_z': 0,
        'board_warnings': 0,
    }

    pressure_sensor = None
    orientation_sensor = None
    light_sensor = None

    def setup_sensors(self):
        try:
            log.info("Setting Up Sensors...")
            self.pressure_sensor = self.pressure_sensor or ms5803py.MS5803()
            self.orientation_sensor = None
            self.light_sensor = None
        except Exception as e:
            log.error("Error Setting Up Sensors:",  exc_info=e)

    def update_sensor_value(self, sensor_name, new_value):
        if (self.current_sensor_state[sensor_name] != new_value):
            self.current_sensor_state[sensor_name] = new_value
            self.sensor_values_have_changed_flag = True

    def update_all_sensors(self):
        # Read the pressure sensor values
        if self.pressure_sensor is not None:
            try:
                pressure, temp = self.pressure_sensor.read(pressure_osr=4096)
                log.debug("Sensors: pressure={} mBar, temperature={} C".format(
                    get_rounded_string(pressure), get_rounded_string(temp)))

                self.update_sensor_value('pressure',
                                         get_rounded_string(pressure))
                self.update_sensor_value('temp', get_rounded_string(temp))
            except Exception as e:
                log.warning("Error reading pressure sensor:", e)

        # Read the orientation sensor values
        if self.orientation_sensor is not None:
            pass

        # Read the photoresistor (light sensor) values
        if self.light_sensor is not None:
            pass

        return self.sensor_values_have_changed_flag

    def get_changed_sensor_values(self):
        self.sensor_values_have_changed_flag = False
        return self.current_sensor_state

    def get_connected_sensor_column_names(self):
        output_column_names = ['date_time']
        if self.pressure_sensor:
            output_column_names.append('pressure')
            output_column_names.append('temp')
        if self.orientation_sensor:
            output_column_names.append('yaw')
            output_column_names.append('roll')
            output_column_names.append('pitch')
            output_column_names.append('accel_x')
            output_column_names.append('accel_y')
            output_column_names.append('accel_z')
        if self.light_sensor:
            output_column_names.append('light')
        return output_column_names

import ms5803py
import time

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
    }

    pressure_sensor = None
    orientation_sensor = None
    light_sensor = None

    def setup_sensors(self):
        self.pressure_sensor = self.pressure_sensor or ms5803py.MS5803()
        self.orientation_sensor = None
        self.light_sensor = None

    def update_sensor_value(self,sensor_name, new_value):
        if (self.current_sensor_state[sensor_name] != new_value):
            self.current_sensor_state[sensor_name] = new_value
            self.sensor_values_have_changed_flag = True

    def update_all_sensors(self):
        # Read the pressure sensor values
        if self.pressure_sensor is not None:
            pressure, temp = self.pressure_sensor.read(pressure_osr=4096)
            print("Sensors: pressure={} mBar, temperature={} C".format(
                pressure, temp))

            self.update_sensor_value('pressure', pressure)
            self.update_sensor_value('temp', temp)

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
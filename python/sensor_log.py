ROV_SAVED_STUFF_FOLDER = "~/rov_saved_stuff/"
SENSOR_LOG_FILENAME_ENDING = "_sensor_log.csv"

import datetime
import logging
import csv
import os

############################
###### setup logging #######
log = logging.getLogger(__name__)


class Sensor_Log:

    sensor_log_file = None
    sensor_log_csv_writer = None

    async def start_sensor_log_loop(self):
        """
        Starts the async loop that writes to the csv log.
        """
        while True:
            await asyncio.sleep(0.1)
            self.write_sensor_log_line(self.measured_values)

    async def setup_sensor_log(self, column_names):
        """
        Opens a new sensor_log file and writes the column names to it.
        """

        log.info("Starting sensor sensor_log...")

        # make the sensor_log folder if it doesn't exist:
        sensor_log_folder = os.path.expanduser(ROV_SAVED_STUFF_FOLDER +
                                               "sensor_log/")
        os.makedirs(sensor_log_folder, exist_ok=True)

        # Create the sensor_log file
        current_time = datetime.datetime.now().strftime("%X")
        sensor_log_filename = sensor_log_folder + current_time + SENSOR_LOG_FILENAME_ENDING
        self.sensor_log_file = open(sensor_log_filename, "w")

        # Make the python csv writer for the sensor_log file
        self.sensor_log_csv_writer = csv.writer(self.sensor_log_file,
                                                dialect='excel')

        # Write the column names header line to the csv file
        self.sensor_log_csv_writer.writerow(column_names)

    def stop_sensor_log(self):
        """
        Closes the sensor_log file.
        """
        log.info("Closing sensor sensor_log...")
        self.sensor_log_file.close()

    def write_sensor_log_line(self, sensor_values):
        """
        Writes the list of sensor values to the sensor_log.
        sensor_values is a list of values that must be in the same order as column names.
        """
        self.sensor_log_csv_writer.writerow(sensor_values)

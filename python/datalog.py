ROV_SAVED_STUFF_FOLDER = "~/rov_saved_stuff/"
DATALOG_FILENAME_ENDING = "_datalog.csv"

import datetime
import csv
import os


class sensor_datalog:

    datalog_file = None
    datalog_csv_writer = None

    def setup_datalog(self, column_names):
        """
        Opens a new datalog file and writes the column names to it.
        """

        print("Starting sensor datalog...")

        # make the datalog folder if it doesn't exist:
        datalog_folder = os.path.expanduser(ROV_SAVED_STUFF_FOLDER +
                                            "datalog/")
        os.mkdir(datalog_folder)

        # Create the datalog file
        current_time = datetime.datetime.now().strftime("%X")
        datalog_filename = datalog_folder + current_time + DATALOG_FILENAME_ENDING
        self.datalog_file = open(datalog_filename, "w")

        # Make the python csv writer for the datalog file
        self.datalog_csv_writer = csv.writer(self.datalog_file,
                                             dialect='excel')

        # Write the column names header line to the csv file
        self.datalog_csv_writer.writerow(column_names)

    def stop_datalog(self):
        """
        Closes the datalog file.
        """
        print("Closing sensor datalog...")
        self.datalog_file.close()

    def write_datalog_line(self, sensor_values):
        """
        Writes the list of sensor values to the datalog.
        sensor_values is a list of values that must be in the same order as column names.
        """
        self.datalog_csv_writer.writerow(sensor_values)

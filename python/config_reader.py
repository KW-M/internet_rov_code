from re import I
import sys
import os
import argparse
import json
import logging

defualt_config_file_path = os.path.dirname(
    os.path.realpath(__file__)) + "/../secret_config.json"

default_config = {
    "LogLevel": "info",
    "BasePeerId": "go-robot-",
    "NamedPipeFolder": "/tmp/webtrc-relay-pipes/",
    "MessageMetadataSeparator": "|\"|",
    "DriverControlPassword":
    "Change this password in the webrtc-relay-config.json file",
    "DisconnectedDriverAuthTimeout": 180,
    "EnabledSensors": []
}


def read_config_file():
    """
    Reads the config file and program arguments and returns a dictionary with the config values.
    """

    # set the output config to the default config, note that this is a reference, so modifies default config too.
    output_config = default_config

    # parse the command line arguments
    programArgsParser = argparse.ArgumentParser()
    programArgsParser.add_argument('--config-file',
                                   metavar='FILE_PATH',
                                   type=str,
                                   required=True,
                                   help='Path to the config file.')
    args = programArgsParser.parse_args(sys.argv[1:])

    # get the config file path from the program arguments or use the default
    config_file_path = args.config_file

    # open and read the config file:
    with open(config_file_path, 'r') as f:
        file_config_dict = json.load(f)
        for key in default_config:
            if key in file_config_dict:
                output_config[key] = file_config_dict[key]

    # read the command line arguments:
    # for key in default_config:
    #     try:
    #         config = getopt.getopt(sys.argv[1:], [], [key])[0][0]
    #         output_config[key] = file_config_dict[key]
    #     except Exception as error:
    #         print("--" + key + " not specified, using default value: " +
    #               str(default_config[key]))
    #         pass

    # return the parsed config dictionary
    return output_config


def get_log_level(log_level_string):
    levels = {
        'critical': logging.CRITICAL,
        'error': logging.ERROR,
        'warn': logging.WARNING,
        'warning': logging.WARNING,
        'info': logging.INFO,
        'debug': logging.DEBUG
    }
    return levels.get(log_level_string.lower())

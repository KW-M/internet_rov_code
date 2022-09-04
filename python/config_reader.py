import sys
import argparse
import json
import logging

SECONDS_PER_DAY = 86400

# default values for the program config json
program_config = {
    "LogLevel": "info",
    "NamedPipeFolder": "/tmp/webtrc-relay-pipes/",
    "MessageMetadataSeparator": "|\"|",
    "RovControlPassword":
    "Change this password in the program config json file",
    "AuthStateStorageFilepath": "./rov-auth-state.json",
    "AuthTokenTimeout": SECONDS_PER_DAY,
    "RovAttestationPrivateKey":
    "Change this private key in the program config json file",
    "EnabledSensors": [],
}


def read_config_file():
    """
    Reads the json config file specified in the program arguments as a dictionary with the config values
    returns the program_config dictionary.
    """

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
    with open(config_file_path, 'r', encoding="utf-8") as f:
        file_config_dict = json.load(f)
        for key in program_config:
            if key in file_config_dict:
                program_config[key] = file_config_dict[key]

    # return the parsed config dictionary
    return program_config


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

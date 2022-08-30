from re import I
import sys
import os
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
    "-----BEGIN RSA PRIVATE KEY----- MIICWgIBAAKBgF9pp81wEEgsC6fJ3uwzvbP/7ydzAqDgpmrMqpcnHRghM4o/r6tL u3SNYfnTU7cx5KSGAKM90Dpa7j2SKA6bK6TfOWgi+x5g054l9m7SGikPpYzYRa8+ V1hjbQuoGblwqaA5aMgUU1FUgMD0PxZ08rcfsihzblX+LV5aG/OrzifpAgMBAAEC gYA9hk/iNWUKZPyPEalh/mtRarO4aH1FaBdnvtox5dLpAF/PwglxF8ClA5YuFoth Ehcx0AcRPIbNWl1N7rVN1dlqCYpXh/HMEhzm1aiALQRZgnGhw5kfb/dItl70BmY9 X2CNppfVylUw1A9t2FACagZ6Pz7iYeRrVFwxuMCpgMp2QQJBAKQh1oKnOYiF1dFQ iw/MRfux1nDTpqq/2irFmT7tc94WE2zoUE1o1VSJVGpG5LGrFEyrTBLqxfC8QDqN eEMqSOUCQQCU0SWwEd1PRZxonktWTcAk6zr9B6QoKNOBFRoISKv8rAqQCV7UijhK f9UrdSMK1BO0tP+zdraAlxlkeqv1cka1AkArnzqt2tf1quxbBzcOadInxOojbn0b YIYRXBcQnHdxDRj4lv3QtQ4Nu7oNzO23MqrgfZ5oYLFe/AluBm9yGmjpAkAGYqL3 Vwzj5dy8MG6TGWrxKpaxXK6Seo34r+saB+Q5Rzh8zaof/H5F1A5VewUx5b+itVFz ZdiW0+TnBsxyD6ExAkAFZPEHneudIMyXEyG5NRfKioRrGscTVXgziCjf5j4S20g6 SL+wF/BAvgqVBk9bdz3T5efQ7/5/2TAUZLmHgKjZ -----END RSA PRIVATE KEY-----",
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
    with open(config_file_path, 'r') as f:
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

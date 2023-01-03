from __future__ import annotations
from typing import Optional
import time
import binascii
import os
import json
import math
from uuid import uuid4
from genericpath import exists

from config_reader import program_config, SECONDS_PER_DAY

auth_tokens = {}
rov_uuid = None


def generateAuthToken():
    """
    generates a new auth token, saves it to the authTokens dict and writes the authTokens to disk as json
    Returns: (string) the new auth token
    """
    global auth_tokens
    auth_token = binascii.hexlify(os.urandom(20)).decode()  # https://stackoverflow.com/questions/41354205/how-to-generate-a-unique-auth-token-in-python
    auth_tokens[auth_token] = math.floor(time.time() + program_config.get("AuthTokenTimeout", SECONDS_PER_DAY))  # time at which this key should expire (expressed in seconds since epoch)
    saveAuthStateToDisk()
    return auth_token


def removeExpiredTokens():
    global auth_tokens
    inital_token_count = len(auth_tokens)
    # list to avoid RuntimeError: dictionary changed size during iteration
    for token in list(auth_tokens):
        check_token_validty(token)
    if inital_token_count != len(auth_tokens):
        saveAuthStateToDisk()


def check_token_validty(auth_token: Optional[str]):
    global auth_tokens
    token_expiration = auth_tokens.get(auth_token, None)
    if token_expiration != None:
        if time.time() < token_expiration:
            return True
        else:
            auth_tokens.pop(auth_token)
    return False


def getRovUUID():
    global rov_uuid
    if rov_uuid == None:
        rov_uuid = uuid4().hex
        saveAuthStateToDisk()
    return rov_uuid


def readAuthStateFromDisk():
    """Reads the program_config as json and puts it in authTokens dict"""
    global auth_tokens, rov_uuid
    authStorageFilepath = program_config.get("AuthStateStorageFilepath", "./rov-auth-state.json")
    if exists(authStorageFilepath):
        with open(authStorageFilepath, "r") as f:
            try:
                state = json.load(f)
                auth_tokens = state.get("authTokens", {})
                rov_uuid = state.get("rovUUID", getRovUUID())
                removeExpiredTokens()
            except json.JSONDecodeError:
                print("Invalid JSON in " + authStorageFilepath + ", ignoring...")


def saveAuthStateToDisk():
    """Saves the authTokens dict as json text to the AUTH_STATE_STORAGE_FILEPATH"""
    authStorageFilepath = program_config.get("AuthStateStorageFilepath", "./rov-auth-state.json")
    with open(authStorageFilepath, "w") as f:
        json.dump({"authTokens": auth_tokens, "rovUUID": rov_uuid}, f)

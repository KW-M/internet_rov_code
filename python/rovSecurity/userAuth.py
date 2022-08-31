from genericpath import exists
from lib2to3.pgen2 import token
import time, binascii, os, json, math
from uuid import uuid4
from config_reader import program_config, SECONDS_PER_DAY

authTokens = {}
rovUUID = None


def generateAuthToken():
    """
    generates a new auth token, saves it to the authTokens dict and writes the authTokens to disk as json
    Returns: (string) the new auth token
    """
    global authTokens
    authToken = binascii.hexlify(os.urandom(20)).decode(
    )  # https://stackoverflow.com/questions/41354205/how-to-generate-a-unique-auth-token-in-python
    authTokens[authToken] = math.floor(
        time.time() + program_config.get("AuthTokenTimeout", SECONDS_PER_DAY)
    )  # time at which this key should expire (expressed in seconds since epoch)
    saveAuthStateToDisk()
    return authToken


def removeExpiredTokens():
    global authTokens
    initalTokenCount = len(authTokens)
    # list to avoid RuntimeError: dictionary changed size during iteration
    for token in list(authTokens):
        checkTokenValidty(token)
    if initalTokenCount != len(authTokens):
        saveAuthStateToDisk()


def checkTokenValidty(authToken):
    global authTokens
    tokenExpiration = authTokens.get(authToken, None)
    if tokenExpiration != None:
        if time.time() < tokenExpiration:
            return True
        else:
            authTokens.pop(authToken)
    return False


def getRovUUID():
    global rovUUID
    if rovUUID == None:
        rovUUID = uuid4().hex
        saveAuthStateToDisk()
    return rovUUID


def readAuthStateFromDisk():
    """Reads the program_config as json and puts it in authTokens dict"""
    global authTokens, rovUUID
    authStorageFilepath = program_config.get("AuthStateStorageFilepath",
                                             "./rov-auth-state.json")
    if exists(authStorageFilepath):
        with open(authStorageFilepath, "r") as f:
            try:
                state = json.load(f)
                authTokens = state.get("authTokens", {})
                rovUUID = state.get("rovUUID", getRovUUID())
                removeExpiredTokens()
            except json.JSONDecodeError:
                print("Invalid JSON in " + authStorageFilepath +
                      ", ignoring...")


def saveAuthStateToDisk():
    """Saves the authTokens dict as json text to the AUTH_STATE_STORAGE_FILEPATH"""
    authStorageFilepath = program_config.get("AuthStateStorageFilepath",
                                             "./rov-auth-state.json")
    with open(authStorageFilepath, "w") as f:
        json.dump({"authTokens": authTokens, "rovUUID": rovUUID}, f)

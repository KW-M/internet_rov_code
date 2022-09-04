import logging
from Cryptodome.PublicKey import RSA
from Cryptodome.Signature import PKCS1_v1_5
from config_reader import program_config

###### setup logging #######
log = logging.getLogger(__name__)


# allows our python code to "prove" to any connecting peer that we are actually an ssrov rov because we have our rsa private key found in the program's json config under RovAttestationPrivateKey
# If you wanted to generate a new private | public key pair go here: https://travistidwell.com/jsencrypt/demo/ (or any other way to generate rsa key pairs)
# Then make sure you update the website code with the public key and use the same private key in the config files on all ROVs (no need for spaces or newlines in the private key).
def signTrustedRovChallenge(challenge_string):
    """returns (string) the signature of the challenge_string parameter (can be any string), signed with the PKCS#1 v1.5 algorithim using the private key found in the config json under RovAttestationPrivateKey"""
    rsa_private_key = RSA.import_key(
        program_config.get("RovAttestationPrivateKey", ""))
    if (rsa_private_key.can_sign()):
        return PKCS1_v1_5.new(rsa_private_key).sign(challenge_string)

    log.warning(
        "Invalid or missing rsa private key in config json under RovAttestationPrivateKey"
    )
    return ""

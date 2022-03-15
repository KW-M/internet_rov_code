import socket
import logging

############################
###### setup logging #######
log = logging.getLogger(__name__)


class Socket_Datachannel:
    def __init__(self):
        self.sock = None

    def close_socket(self):
        if self.sock:
            self.sock.close()
            self.sock = None

    def setup_socket(self, socket_path='/tmp/go.sock', socket_timeout=.1):
        """
        Setup a python socket to communicate with the the datachanel socket file the go rov code creates.
        This function is intended to be called in a loop so long as it returns False (indicating it was not able to connect).
        :param socket_path: Path to the UV4L socket file (Default = '/tmp/go.sock').
        :param socket_timeout: Timeout in seconds to wait to open the socket or recive data before moving on (Default = 0.1 seconds).
        :returns: false exceptions if the socket was not successfully created or connected within the timeout.
        """

        # try to create the socket class with the given path:
        try:
            if (self.sock == None):
                log.info('Opening Unix Socket: {}'.format(socket_path))
                self.sock = socket.socket(socket.AF_UNIX,
                                          socket.SOCK_SEQPACKET)
                self.sock.settimeout(socket_timeout)
                self.sock.connect(socket_path)
                return True
            else:
                log.warning(
                    'setup_socket() called, but unix socket is already open: {}'
                    .format(socket_path))
                return True

        # if the socket was not opened/connected before the timeout, return false:
        except FileNotFoundError as e:
            log.warning('Unix socket file does not yet exist!')

        # if the socket file has not been created before the timeout, return false:
        except socket.timeout as e:
            log.warning('Unix socket setup timed out!')

        # if there was some other socket error, close the socket and return false:
        except socket.error as e:
            self.close_socket()
            log.error('Setup Socket: Socket Error', exc_info=e)

        # if there was some other error, close the socket and return false:
        except Exception as e:
            self.close_socket()
            log.error('Setup Socket: Generic Error', exc_info=e)

        return False

    def recieve_socket_message(self):
        """
        Checks for new data on the socket setup in the setup_socket() function. Waits the timeout specified in the setup_socket() function before returning None
        This function is intended to be called in a loop to keep checking for new data.
        :return: Any new complete chunk of data recieved on the socket or None if no data was recieved / the read timed out.
        """

        if (self.sock == None):
            log.warning('recieve_socket_message(): Socket Not Setup!')
            return None

        try:
            # Wait for a message in utf-8 character encoding up to 1024 bytes long to appear in the unix socket file.
            message = str(self.sock.recv(1024), 'utf-8')
            if message:
                return message
            else:
                return None

        # if the socket was not opened/connected before the timeout, return None:
        except socket.timeout as e:
            return None

        # if there was some other socket error, close the socket and raise the error again:
        except socket.error as e:
            self.close_socket()
            raise Exception("recieve_socket_message(): Socket Error") from e

        # if there was some other error
        except Exception as e:
            raise Exception("recieve_socket_message(): Generic Error") from e

    def send_socket_message(self, socket_message):
        """
        Sends a message/data to socket previously setup by setup_socket(). Waits the timeout specified in the setup_socket() without hearing a message before returning False
        :return: True if the message was sent successfully.
        """

        if (self.sock == None):
            log.warning('send_socket_message(): Socket Not Setup!')
            return False

        if (socket_message == None or len(socket_message) == 0):
            return False

        try:
            sucessful = self.sock.send(bytes(socket_message, 'utf-8'))
            return sucessful

        # if the socket was not opened/connected before the timeout, return None:
        except socket.timeout as e:
            return False

        # if there was some other socket error, close the socket and raise the error again:
        except socket.error as e:
            self.close_socket()
            raise Exception("send_socket_message(): Socket Error") from e

        # if there was some other error
        except Exception as e:
            raise Exception("send_socket_message(): Generic Error") from e
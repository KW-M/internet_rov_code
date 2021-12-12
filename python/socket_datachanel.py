import os
import socket


class socket_datachanel:
    sock = None
    connection = None

    def close_socket(self):
        if self.sock:
            self.sock.close()
            self.sock = None
            self.connection = None

    def setup_socket(self, socket_path='/tmp/uv4l.socket', socket_timeout=.1):
        """
        Setup a python socket to communicate with the the datachanel socket file uv4l creates.
        This function is intended to be called in a loop so long as it returns False (indicating it was not able to connect).
        :param socket_path: Path to the UV4L socket file (Default = '/tmp/uv4l.socket').
        :param socket_timeout: Timeout in seconds to wait to open the socket or recive data before moving on (Default = 0.1 seconds).
        Raises exceptions if the socket was not successfully created or connected within the timeout.
        """

        print('Attempting to open socket at path: {}'.format(socket_path))

        # Try to unlink/free up the socket file if it already exists:
        try:
            os.unlink(socket_path)
        except OSError as e:
            if os.path.exists(socket_path):
                raise Exception("Error unlinking socket file: {}, {}".format(
                    socket_path, e)) from e
            else:
                raise Exception("Socket file: {} does not exist".format(
                    socket_path)) from e

        # try to create the socket class with the given path:
        try:
            if (self.sock == None):
                self.sock = socket.socket(socket.AF_UNIX,
                                          socket.SOCK_SEQPACKET)
                self.sock.settimeout(socket_timeout)
                self.sock.bind(socket_path)
                self.sock.listen(1)

            # try to connect to the socket:
            self.connection, client_address = self.sock.accept()
            print('Established socket connection with ', client_address)

        # if the socket was not opened/connected before the timeout, return False:
        except socket.timeout as e:
            err = e.args[0]
            # this next if/else is a bit redundant, but illustrates how the
            # timeout exception is setup
            if err == 'timed out':
                raise Exception('recv timed out, retry later') from e
            else:
                raise Exception("Socket timeout error") from e

        # if there was some other socket error, close the socket and return False:
        except socket.error as e:
            self.close_socket()
            raise Exception("Socket error") from e

    def recieve_socket_message(self):
        """
        Checks for new data on the socket setup in the setup_socket() function. Waits the timeout specified in the setup_socket() function before returning None
        This function is intended to be called in a loop to keep checking for new data.
        :return: Any new complete chunk of data recieved on the socket or None if no data was recieved / the read timed out.
        """

        # try to read from the socket:
        try:
            if (self.sock == None):
                print('Socket not setup')
            else:
                # pause program while waiting for a message in utf-8 character encoding up to 1024 bytes long to appear in the socket file.
                message = str(self.connection(1024), 'utf-8')
                if message:
                    return message
                else:
                    return None

        # if the socket was not opened/connected before the timeout, return None:
        except socket.timeout as e:
            return None

        # if there was some other socket error, close the socket and raise the error again
        except socket.error as e:
            print("Socket error: %s" % e)
            self.close_socket()
            raise socket.error(e)

    def send_socket_message(self, socket_message):
        """
        Sends a message/data to socket setup in the setup_socket() function. Waits the timeout specified in the setup_socket() function before returning False
        :return: True if the message was sent successfully.
        """

        # try to read from the socket:
        try:
            if (self.sock == None):
                print('Socket not setup')
            else:
                data = self.connection.sendall(bytes(socket_message, 'utf-8'))
                if data:
                    return data
                else:
                    return None

        # if the socket was not opened/connected before the timeout, return None:
        except socket.timeout as e:
            return False

        # if there was some other socket error, close the socket and raise the error again
        except socket.error as e:
            print("Socket error: %s" % e)
            self.close_socket()
            raise socket.error(e)
import asyncio
import socket
import logging

############################
###### setup logging #######
log = logging.getLogger(__name__)


class Unix_Socket_Datachannel:
    def __init__(self,
                 socket_path='/tmp/go_robot.socket',
                 max_message_size=1024,
                 max_queue_size=30,
                 socket_timeout=5):
        self.sock = None
        self.socketOpen = False
        self.messages_from_socket_queue = None
        self.messages_to_send_to_socket_queue = None
        self.MAX_QUEUE_SIZE = max_queue_size
        self.SOCKET_PATH = socket_path
        self.SOCKET_TIMEOUT = socket_timeout
        self.MAX_MESSAGE_SIZE = max_message_size

    def close_socket(self):
        if self.sock:
            self.sock.close()
            self.sock = None

    async def read_socket_messages(self, sock_reader):
        """
        Relays all messages recived from the unix socket onto the messages_from_socket_queue.
        """
        while True:
            try:
                encodedMessage = await sock_reader.read(self.MAX_MESSAGE_SIZE)
                if encodedMessage:
                    message = encodedMessage.decode()
                    self.messages_from_socket_queue.put_nowait(message)
            except asyncio.CancelledError as e:
                return
            except socket.timeout as e:
                await asyncio.sleep(1)
            except Exception as e:
                log.error('read_socket_messages(): Error', exc_info=e)
                await asyncio.sleep(1)

    async def send_socket_messages(self, sock_writer):
        """
        Relays all messages pushed onto the send_to_socket_queue to the unix socket.
        """
        while True:
            message = await self.messages_to_send_to_socket_queue.get()
            while True:
                try:
                    sock_writer.write(message.encode('utf-8'))
                    break
                except asyncio.CancelledError as e:
                    return
                except socket.timeout as e:
                    await asyncio.sleep(1)
                except Exception as e:
                    log.error('send_socket_messages(): Error', exc_info=e)
                    await asyncio.sleep(1)

    async def socket_loop(self, asyncLoop=None):
        if asyncLoop is None:
            asyncLoop = asyncio.get_event_loop()

        self.sock = socket.socket(socket.AddressFamily.AF_UNIX,
                                  socket.SocketKind.SOCK_SEQPACKET)
        self.sock.settimeout(self.SOCKET_TIMEOUT)

        self.messages_from_socket_queue = asyncio.Queue(
            maxsize=self.MAX_QUEUE_SIZE, loop=asyncLoop)
        self.messages_to_send_to_socket_queue = asyncio.Queue(
            maxsize=self.MAX_QUEUE_SIZE, loop=asyncLoop)

        read_task = None
        write_task = None

        while True:
            try:
                self.sock.connect(self.SOCKET_PATH)

                # workaround hack from: https://bugs.python.org/issue38285
                # Substitute class property getter with fixed value getter.
                socket_property = socket.socket.type
                socket.socket.type = property(
                    lambda self: socket.SocketKind.SOCK_STREAM,
                    None,
                    None,
                )

                sockTask = asyncio.create_task(
                    asyncio.open_unix_connection(sock=self.sock,
                                                 loop=asyncLoop))
                # Revert the trick: Restore class property getter.
                socket.socket.type = socket_property
                sock_reader, sock_writer = await sockTask

                read_task = asyncio.create_task(
                    self.read_socket_messages(sock_reader))
                write_task = asyncio.create_task(
                    self.send_socket_messages(sock_writer))
                await read_task
                await write_task

            except FileNotFoundError as e:
                log.warning('Unix socket file does not yet exist!')

            # if the socket file cannot be opened before the timeout, return false:
            except socket.timeout as e:
                log.warning('Unix socket setup timed out!')

            # if there was some other socket error, close the socket and return false:
            except socket.error as e:
                log.error('Setup Socket: Socket Error', exc_info=e)

            # if there was some other error, close the socket and return false:
            except Exception as e:
                log.error('Setup Socket: Generic Error', exc_info=e)

            if (read_task != None):
                read_task.cancel()
                read_task = None
            if (write_task != None):
                write_task.cancel()
                write_task = None
            self.sock.close()

            await asyncio.sleep(3)  # wait 3 seconds before trying again

    # def setup_socket(self,
    #                  socket_path='/tmp/go_robot.socket',
    #                  socket_timeout=.1):
    #     """
    #     Setup a python socket to communicate with the the datachanel socket file the go rov code creates.
    #     This function is intended to be called in a loop so long as it returns False (indicating it was not able to connect).
    #     :param socket_path: Path to the UV4L socket file (Default = '/tmp/go.sock').
    #     :param socket_timeout: Timeout in seconds to wait to open the socket or recive data before moving on (Default = 0.1 seconds).
    #     :returns: false exceptions if the socket was not successfully created or connected within the timeout.
    #     """

    #     # try to create the socket class with the given path:
    #     try:
    #         if (self.sock == None):
    #             log.info('Opening Unix Socket: {}'.format(socket_path))
    #             self.sock = socket.socket(socket.AF_UNIX,
    #                                       socket.SOCK_SEQPACKET)
    #             self.sock.settimeout(socket_timeout)
    #             self.sock.connect(socket_path)
    #             log.info('Unix Socket Connected!')
    #             return True
    #         else:
    #             log.warning(
    #                 'setup_socket() called, but unix socket is already open: {}'
    #                 .format(socket_path))
    #             return True

    #     return False

    # def recieve_socket_message(self):
    #     """
    #     Checks for new data on the socket setup in the setup_socket() function. Waits the timeout specified in the setup_socket() function before returning None
    #     This function is intended to be called in a loop to keep checking for new data.
    #     :return: Any new complete chunk of data recieved on the socket or None if no data was recieved / the read timed out.
    #     """

    #     if (self.sock == None):
    #         log.warning('recieve_socket_message(): Socket Not Setup!')
    #         return None

    #     try:
    #         # Wait for a message in utf-8 character encoding up to 1024 bytes long to appear in the unix socket file.
    #         message = str(self.sock.recv(1024), 'utf-8')

    #         #https://stackoverflow.com/questions/27946786/how-to-detect-when-a-client-disconnects-from-a-uds-unix-domain-socket
    #         if message == '':
    #             self.close_socket()
    #             ex = Exception("Unix socket was closed by go process.")
    #             ex.suppress_traceback = True
    #             raise ex
    #         elif message:
    #             return message
    #         else:
    #             return None

    #     # if the socket was not opened/connected before the timeout, return None:
    #     except socket.timeout as e:
    #         return None

    #     # if there was some other socket error, close the socket and raise the error again:
    #     except socket.error as e:
    #         self.close_socket()
    #         raise Exception("recieve_socket_message(): Socket Error") from e

    # def send_socket_message(self, socket_message):
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
            return int(sucessful) > 0

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
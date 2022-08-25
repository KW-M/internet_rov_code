import asyncio
import errno
import logging
import os
import shlex
import subprocess
from time import time

############################
###### setup logging #######
log = logging.getLogger(__name__)


class Named_Pipe:
    def __init__(self, pipe_file_path: str, create_pipe: bool = False):
        self.pipe_file = None
        self.pipe_file_path = pipe_file_path
        self.create_pipe = create_pipe

    async def get_open_pipe(self, mode: str, timeout: float = 1):

        # loop until sucessful
        while True:

            if self.create_pipe:
                # Create the pipe (if it doesn't already exist)
                while not os.path.exists(self.pipe_file_path):
                    os.mkfifo(self.pipe_file_path)
            else:
                # Wait for the named pipe to be created (by some other program)
                while not os.path.exists(self.pipe_file_path):
                    await asyncio.sleep(timeout)

            try:

                if mode == 'r':
                    try:
                        self.pipe_file = os.open(self.pipe_file_path,
                                                 os.O_RDWR | os.O_NONBLOCK)
                        return self.pipe_file
                    except OSError as ex:
                        if ex.errno == errno.ENXIO:
                            print(
                                "Err opening pipe file: Pipe is not yet readable."
                                + self.pipe_file_path)

                elif mode == 'w':
                    try:
                        self.pipe_file = os.open(self.pipe_file_path,
                                                 os.O_RDWR | os.O_NONBLOCK)
                        return self.pipe_file
                    except OSError as ex:
                        if ex.errno == errno.ENXIO:
                            print(
                                "Err opening pipe file: Pipe is not yet writeable."
                                + self.pipe_file_path)

                else:
                    raise ValueError('mode must be "r" or "w"')

            except Exception as e:
                log.error(f'Failed to open pipe file: {e}')

            await asyncio.sleep(1)

    def close(self):
        if self.pipe_file is not None:
            try:
                os.close(self.pipe_file)
            except Exception as e:
                log.warn(f'Failed to close pipe file: {e}')


class Named_Pipe_Relay:
    def __init__(self,
                 pipe_file_path: str,
                 create_pipe: bool = False,
                 max_queue_size: int = 30):
        self.pipe = Named_Pipe(pipe_file_path, create_pipe)
        # create the message queue to hold messages to send or recieve (depending on mode)
        self.pipe_message_queue = asyncio.Queue(maxsize=max_queue_size)

    async def read_loop(self, asyncLoop=None):
        if asyncLoop is None:
            asyncLoop = asyncio.get_event_loop()

        read_transport = None
        self.closed = False

        while True:
            # from: https://gist.github.com/oconnor663/08c081904264043e55bf
            try:
                pipe_file = await self.pipe.get_open_pipe('r')
                print("read pipe_file open: " + str(self.pipe.pipe_file_path))
                with os.fdopen(pipe_file, 'r') as stream:
                    reader = asyncio.StreamReader()
                    read_transport, _ = await asyncLoop.connect_read_pipe(
                        lambda: asyncio.StreamReaderProtocol(reader), stream)

                    while True:
                        data = await reader.readuntil(b'\n')
                        if data:
                            await self.pipe_message_queue.put(
                                str(data, 'utf-8').strip('\n'))

            except Exception as e:
                if read_transport != None:
                    read_transport.close()
                if self.closed == True:
                    return
                self.pipe.close()
                log.error(f'Pipe read failed: {e}')
                break

    async def write_loop(self, asyncLoop=None):
        if asyncLoop is None:
            asyncLoop = asyncio.get_event_loop()

        self.closed = False

        while True:
            try:
                pipe_file = await self.pipe.get_open_pipe('w')
                print("write pipe_file open: " + str(self.pipe.pipe_file_path))
                with os.fdopen(pipe_file, 'w') as stream:

                    while True:
                        msg = await self.pipe_message_queue.get()
                        if msg:
                            stream.write(msg + '\n')
                            stream.flush()

            except Exception as e:
                if self.closed == True:
                    return
                self.pipe.close()
                log.error(f'Pipe write failed: {e}')

    def close(self):
        self.closed = True
        self.pipe.close()


class Duplex_Named_Pipe_Relay:
    def __init__(self,
                 incoming_pipe_file_path: str,
                 outgoing_pipe_file_path: str,
                 create_pipes: bool = False,
                 max_queue_size: int = 30):
        self.max_queue_size = max_queue_size
        self.incoming_pipe = Named_Pipe_Relay(incoming_pipe_file_path,
                                              create_pipes, max_queue_size)
        self.outgoing_pipe = Named_Pipe_Relay(outgoing_pipe_file_path,
                                              create_pipes, max_queue_size)

    def is_open(self):
        return self.incoming_pipe.pipe_message_queue.qsize(
        ) < self.max_queue_size and self.outgoing_pipe.pipe_message_queue.qsize(
        ) < self.max_queue_size

    async def start_loops(self, asyncLoop=None):
        if asyncLoop is None:
            asyncLoop = asyncio.get_event_loop()

        log.debug('Starting duplex relay loops')
        await asyncio.gather(self.incoming_pipe.read_loop(asyncLoop),
                             self.outgoing_pipe.write_loop(asyncLoop))

    async def write_message(self, message: str):
        await self.outgoing_pipe.pipe_message_queue.put(message)

    async def get_next_message(self):
        return await self.incoming_pipe.pipe_message_queue.get()

    def cleanup(self):
        self.incoming_pipe.close()
        self.outgoing_pipe.close()


class Command_Output_To_Named_Pipe:
    def __init__(self,
                 pipe_file_path: str,
                 create_pipe: bool = False,
                 command_string: str = "",
                 input_pipe=None):
        self.command_and_args = shlex.split(command_string)
        print(self.command_and_args)
        self.input_pipe = input_pipe
        self.out_pipe = Named_Pipe(pipe_file_path, create_pipe)
        self.running_cmd = None

    async def start_cmd(self, asyncLoop=None):
        if asyncLoop is None:
            asyncLoop = asyncio.get_event_loop()

        # create or wait for the command to open
        pipe_file = await self.out_pipe.get_open_pipe('w')
        # self.out_pipe.close()
        self.running_cmd = subprocess.Popen(self.command_and_args,
                                            bufsize=0,
                                            stdin=self.input_pipe,
                                            stdout=os.fdopen(pipe_file, 'w'),
                                            stderr=None)
        return self.running_cmd

    def stop_piping_cmd(self):
        self.running_cmd.terminate()
        self.running_cmd.wait()
        self.stdout.close()
        self.running_cmd = None


# ["ffmpeg", "-f", "avfoundation", "-pix_fmt", "nv12", "-video_size", "640x480", "-use_wallclock_as_timestamps", "1", "-framerate", "30", "-i", "default", "-f", "h264", "pipe:1"]
if __name__ == '__main__':

    #logging.basicConfig(level=logging.DEBUG)
    import subprocess

    def cmd_tee_passthrough_test():
        cmd1 = ['echo', 'hello']
        cmd2 = ['tee', 'test.txt']
        print(f"Shell style : {' '.join(cmd1)} | {' '.join(cmd2)}")

        p1 = subprocess.Popen(
            cmd1, stdout=subprocess.PIPE)  # stderr=PIPE optional, dd is chatty
        p2 = subprocess.Popen(cmd2, stdin=p1.stdout, stdout=None)

        # thoretically p1 and p2 may still be running, this ensures we are collecting their return codes
        p1.wait()
        p2.wait()
        print("p1 return: ", p1.returncode)
        print("p2 return: ", p2.returncode)
        # https://stackoverflow.com/questions/295459/how-do-i-use-subprocess-popen-to-connect-multiple-processes-by-pipes

    async def read_msgs(duplex_relay):
        while True:
            msg = await duplex_relay.get_next_message()
            print("got:" + msg)

    async def write_msgs(duplex_relay):
        while True:
            await asyncio.sleep(1.2)
            await duplex_relay.write_message('{"action":"pong","value":"' +
                                             str(time()) + '"}')

    async def video_command_test():
        await Command_Output_To_Named_Pipe(
            pipe_file_path='/Users/ky/Downloads/tmpr/vid.pipe',
            command_string=
            'ffmpeg -f avfoundation -pix_fmt nv12 -video_size 640x480 -use_wallclock_as_timestamps 1 -framerate 30 -i default -f h264 pipe:1',
            create_pipe=True).start_cmd()

    async def main():

        duplex_relay = Duplex_Named_Pipe_Relay('/tmp/from_webrtc_relay.pipe',
                                               '/tmp/to_webrtc_relay.pipe')

        pipe_task = asyncio.create_task(duplex_relay.start_loops())
        read_queue_task = asyncio.create_task(read_msgs(duplex_relay))
        write_queue_task = asyncio.create_task(write_msgs(duplex_relay))

        await asyncio.gather(pipe_task, read_queue_task, write_queue_task)
        # other tests:
        # cmd_tee_passthrough_test()
        # await video_command_test()

    asyncio.run(main())

    # while True:
    #     try:
    #         print("reading:")
    #         future = asyncio.Future()
    #         asyncLoop.add_reader(self.pipe_file, future.set_result, None)
    #         future.add_done_callback(
    #             lambda f: asyncLoop.remove_reader(self.pipe_file))
    #         await future

    #     print("future:", future)
    #     # if data:
    #     #     # await self.pipe_message_queue.put(data)
    #     #     log.debug(f'Read from pipe: {data}')

    #     # contents: bytes = reader.readline()
    #     # if contents is b'':
    #     #     print("EOF detected")
    #     #     break

    #     # contents: bytes = contents.strip()
    #     # if b'quit' == contents:
    #     #     sys.exit(0)

    #     # print(contents)
    # except Exception as e:
    #     log.error(f'Failed to read from pipe: {e}')
    #     await asyncio.sleep(3)

    # while True:
    #     try:
    #         data = os.read(self.pipe_file, self.read_buffer_size)
    #         if data:
    #             reader.feed_data(data)
    #         else:
    #             await asyncio.sleep(0.1)
    #     except Exception as e:
    #         log.error(f'Failed to read from pipe: {e}')
    #         await asyncio.sleep(3)

    # await asyncio.to_thread(self.read_loop,
    #                         async_loop=asyncLoop)\

    #   def read_loop(self, async_loop):
    #     # from https://gist.github.com/oconnor663/08c081904264043e55bf
    #     # reader = asyncio.StreamReader()
    #     # read_transport, _ = await asyncLoop.connect_read_pipe(
    #     #     lambda: asyncio.StreamReaderProtocol(reader),
    #     #     )

    #     # print("read_transport:", read_transport)
    #     with os.fdopen(self.pipe_file, 'r') as stream:

    #         while True:

    #             # wait for the pipe to have data
    #             readers, _, _ = select.select([stream], [], [])

    #             if readers:
    #                 reader = readers.pop()

    #                 contents: str = reader.readline()
    #                 if contents == '':
    #                     print("EOF detected")
    #                     break

    #                 contents: str = contents.strip()
    #                 print(contents)
    #                 future = asyncio.run_coroutine_threadsafe(
    #                     self.queue_push_msg(contents), loop=async_loop)
    #                 # Wait for the result:
    #                 future.result()

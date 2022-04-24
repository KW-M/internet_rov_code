import shlex
import subprocess

from named_pipe import Command_Output_To_Named_Pipe

# class Video_Stream_Chain:
#     def __init__(self, video_stream_chain):
#         self.video_stream_chain = video_stream_chain
#         self.std_out_chain = None
#         self.input_chain = None


class Media_Stream_Controller:
    def __init__(self, named_pipe_folder):
        self.open_video_stream_map = {}
        self.named_pipe_folder = named_pipe_folder

        # https://stackoverflow.com/questions/295459/how-do-i-use-subprocess-popen-to-connect-multiple-processes-by-pipes

    async def start_video_command_pipe(self, cmd_str=None):
        print("start_video_command_pipe", self.named_pipe_folder)
        if cmd_str not in self.open_video_stream_map:
            # cmd = Command_Output_To_Named_Pipe(
            #     pipe_file_path=self.named_pipe_folder + 'vid.pipe',
            #     command_string=cmd_str,
            #     create_pipe=False)

            cmd, cmdtee = self.cmd_tee_passthrough_test(
                cmd_str, pipe_file_path=self.named_pipe_folder + 'vid.pipe')
            self.open_video_stream_map[cmd_str] = cmd
            # await cmd.start_cmd()
            return cmd
        elif cmd_str != None:
            return self.open_video_stream_map[cmd_str]

    def cmd_tee_passthrough_test(self, cmd_str=None, pipe_file_path=None):
        cmd1 = shlex.split(cmd_str)
        cmd2 = ['tee', pipe_file_path]
        print(f"Shell style : {' '.join(cmd1)} | {' '.join(cmd2)}")

        p1 = subprocess.Popen(cmd1, stdout=subprocess.PIPE)
        p2 = subprocess.Popen(cmd2, stdin=p1.stdout, stdout=None)

        # thoretically p1 and p2 may still be running, this ensures we are collecting their return codes
        return p1, p1

    async def stop_video_command_pipe(self, cmd_str=None):
        ## AUTOGENERATED< NEEDS TO BE FIXED >AUTOGENERATED##
        if cmd_str in self.open_video_stream_map:
            cmd = self.open_video_stream_map[cmd_str]
            # cmd.stop_cmd()
            del self.open_video_stream_map[cmd_str]

    async def get_video_pipe(self):
        cmd_str = 'ffmpeg -f avfoundation -pix_fmt nv12 -video_size 640x480 -use_wallclock_as_timestamps 1 -framerate 30 -i default -f h264 pipe:1'
        start_cmd = self.start_video_command_pipe(
            cmd_str)  ## returns a coroutine
        return start_cmd, "vid.pipe"


# ["ffmpeg", "-f", "avfoundation", "-pix_fmt", "nv12", "-video_size", "640x480", "-use_wallclock_as_timestamps", "1", "-framerate", "30", "-i", "default", "-f", "h264", "pipe:1"]

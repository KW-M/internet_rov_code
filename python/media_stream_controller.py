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
        self.runningSubprocesses = []

        # https://stackoverflow.com/questions/295459/how-do-i-use-subprocess-popen-to-connect-multiple-processes-by-pipes

    def start_pipable_command(self, cmd_str=None, inputPipe=None):
        cmd1 = shlex.split(cmd_str)
        p1 = subprocess.Popen(cmd1, stdin=inputPipe, stdout=subprocess.PIPE)
        return p1

    def start_video_source(self, cmd_str=None):
        if cmd_str not in self.open_video_stream_map:
            cmd = self.start_pipable_command(cmd_str)
            self.open_video_stream_map[cmd_str] = cmd
            return cmd
        elif cmd_str != None:
            return self.open_video_stream_map[cmd_str]

    def start_piped_input_command(self, inputPipe=None, cmd_str=None):
        if cmd_str not in self.open_video_stream_map:
            cmd = self.start_pipable_command(cmd_str, inputPipe=inputPipe)
            self.open_video_stream_map[cmd_str] = cmd
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

    def run_cmd_string(self, cmd_str=None):
        cmd = shlex.split(cmd_str)
        p1 = subprocess.Popen(cmd, stdout=None)
        return p1

    async def stop_video_command_pipe(self, cmd_str=None):
        if cmd_str in self.open_video_stream_map:
            cmd = self.open_video_stream_map[cmd_str]
            cmd.kill()
            del self.open_video_stream_map[cmd_str]

    # async def get_video_pipe(self):
    #     cmd_str = 'ffmpeg -f avfoundation -pix_fmt nv12 -video_size 640x480 -use_wallclock_as_timestamps 1 -framerate 30 -i default -f h264 pipe:1'
    #     start_cmd = self.start_video_command_pipe(
    #         cmd_str)  ## returns a coroutine
    #     return start_cmd, "vid.pipe"

    def start_source_stream(self, port=1820):
        ip = "127.0.0.1:" + str(port)
        vidSrc = self.start_video_source(
            "libcamera-vid --width 1024 --height 576 --framerate 15 --codec yuv420 --flush 1 --timeout 0 --nopreview 1 --output - "
        )
        # --width 1920 --height 1080 --framerate 20
        vidOutput = self.start_piped_input_command(
            inputPipe=vidSrc.stdout,
            cmd_str=
            "ffmpeg -hide_banner -f rawvideo -pix_fmt yuv420p -re -s 1024x576 -framerate 15 -use_wallclock_as_timestamps 1 -i pipe:0 -vcodec h264_v4l2m2m -b:v 900k -g 10 -fflags nobuffer -preset ultrafast -tune zerolatency -f rtp 'rtp://"
            #  "ffmpeg -hide_banner -f rawvideo -pix_fmt yuv420p -re -s 1024x576 -framerate 15 -use_wallclock_as_timestamps 1 -i pipe:0 -vcodec libx264 -b:v 900k -g 10 -fflags nobuffer -preset ultrafast -tune zerolatency -f rtp 'rtp://"
            + ip + "?pkt_size=1200'",
        )
        # -s 1920x1080 -framerate 20
        return vidOutput, "udp://" + ip

    # async def get_video_stream(self, port=1820):
    #     ip = "127.0.0.1:" + str(port)
    #     # start_cmd = self.run_cmd_string(
    #     #     "ffmpeg -hide_banner -re -f lavfi -i testsrc=size=640x480:rate=30 -pix_fmt yuv420p -c:v libx264 -g 10 -preset ultrafast -tune zerolatency -f rtp 'rtp://"
    #     #     + ip + "?pkt_size=1200'")

    #     # "libcamera-vid --width 960 --height 720 --codec yuv420 --framerate 20 --flush 1 --timeout 0 --nopreview 1 --output - | ffmpeg -hide_banner -f rawvideo  -pix_fmt yuv420p -re -s 960x720 -framerate 20 -use_wallclock_as_timestamps 1 -i pipe: -vf settb=AVTB,setpts='trunc(PTS/1K)*1K+st(1,trunc(RTCTIME/1K))-1K*trunc(ld(1)/1K)',drawtext=text='%{localtime}.%{eif\:1M*t-1K*trunc(t\*1K)\:d}':fontcolor=black@1:fontsize=(h/10):x=(w-text_w)/2:y=10 -vcodec h264_v4l2m2m -b:v 400k -fflags nobuffer -g 10 -preset ultrafast -tune zerolatency -f rtp 'rtp://"
    #     start_cmd = subprocess.Popen(
    #         "libcamera-vid --width 1920 --height 1080 --codec yuv420 --framerate 20 --flush 1 --timeout 0 --nopreview 1 --output - | ffmpeg -hide_banner -f rawvideo -pix_fmt yuv420p -re -s 1920x1080 -framerate 20 -use_wallclock_as_timestamps 1 -i pipe:0 -vcodec libx264 -b:v 900k -g 10 -fflags nobuffer -preset ultrafast -tune zerolatency -f rtp 'rtp://"
    #         + ip + "?pkt_size=1200'",
    #         shell=True)
    #     self.runningSubprocesses.append(start_cmd)
    #     return start_cmd, "udp://" + ip

    def cleanup(self):
        for subprocess in self.runningSubprocesses:
            subprocess.kill()


# ["ffmpeg", "-f", "avfoundation", "-pix_fmt", "nv12", "-video_size", "640x480", "-use_wallclock_as_timestamps", "1", "-framerate", "30", "-i", "default", "-f", "h264", "pipe:1"]

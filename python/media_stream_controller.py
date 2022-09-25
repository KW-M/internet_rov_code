import logging
import shlex
import subprocess

############################
###### setup logging #######

log = logging.getLogger(__name__)

# class Video_Stream_Chain:
#     def __init__(self, video_stream_chain):
#         self.video_stream_chain = video_stream_chain
#         self.std_out_chain = None
#         self.input_chain = None


class Media_Stream_Controller:

    def __init__(self):
        self.open_video_stream_map = {}
        self.runningSubprocesses = []

        # https://stackoverflow.com/questions/295459/how-do-i-use-subprocess-popen-to-connect-multiple-processes-by-pipes

    def start_pipable_command(self, cmd_str=None, inputPipe=None):
        cmd1 = shlex.split(cmd_str)
        log.info("Starting CMD: %s", {' '.join(cmd1)})
        # pylint: disable=consider-using-with
        p1 = subprocess.Popen(cmd1, stdin=inputPipe, stdout=subprocess.PIPE)
        return p1

    def start_video_source(self, cmd_str=None):
        if cmd_str not in self.open_video_stream_map:
            cmd = self.start_pipable_command(cmd_str)
            self.open_video_stream_map[cmd_str] = cmd
            return cmd
        if cmd_str is not None:
            return self.open_video_stream_map[cmd_str]
        return None

    def start_piped_input_command(self, inputPipe=None, cmd_str=None):
        if cmd_str not in self.open_video_stream_map:
            cmd = self.start_pipable_command(cmd_str, inputPipe=inputPipe)
            self.open_video_stream_map[cmd_str] = cmd
            return cmd
        if cmd_str is not None:
            return self.open_video_stream_map[cmd_str]
        return None

    def cmd_tee_passthrough_test(self, cmd_str=None, pipe_file_path=None):
        cmd1 = shlex.split(cmd_str)
        cmd2 = ['tee', pipe_file_path]
        print(f"Shell style : {' '.join(cmd1)} | {' '.join(cmd2)}")

        # pylint: disable=consider-using-with
        p1 = subprocess.Popen(cmd1, stdout=subprocess.PIPE)
        # pylint: disable=consider-using-with
        p2 = subprocess.Popen(cmd2, stdin=p1.stdout, stdout=None)

        # thoretically p1 and p2 may still be running, this ensures we are collecting their return codes
        return p1, p2

    def run_cmd_string(self, cmd_str=None):
        cmd = shlex.split(cmd_str)
        # pylint: disable=consider-using-with
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

    def start_source_stream(self):

        existing_streams = self.open_video_stream_map.keys()
        log.info("Start src stream: %s", {' '.join(existing_streams)})

        vidSrc = self.start_video_source(
            "libcamera-vid --width 640 --height 480 --framerate 16 --codec yuv420 --flush 1 --timeout 0 --nopreview 1 --output - "
        )
        # # --width 1024 --height 576 --framerate 15
        # # --width 1920 --height 1080 --framerate 20
        # libcamera-vid --width 640 --height 480 --framerate 16 --codec yuv420 --flush 1 --timeout 0 --nopreview 1 --output -  | ffmpeg -hide_banner -fflags +genpts -protocol_whitelist pipe,tls,file,http,https,tcp,rtp -use_wallclock_as_timestamps 1 -f rawvideo -pix_fmt yuv420p -s 640x480 -framerate 16 -i pipe:0 -vf realtime -vcodec libx264 -profile:v baseline -level:v 3.1 -threads 3 -minrate 500K -maxrate 1.3M -bufsize 500K -g 10  -preset ultrafast -tune zerolatency -f rtp -sdp_file strea_test.sdp 'rtp://localhost:5004?pkt_size=1200'

        # Use ffmpeg to send the camera video stream to the relay in h264 encoded video format:
        # NOTE that this requires the ffmpeg command to be installed and in the PATH
        ffmpegInstanceNum = len(existing_streams)
        # account for every other port being used for RTCP (RTP Control Protocol)
        rtpPort = 7870 + (ffmpegInstanceNum * 2)
        rtcpPort = rtpPort + 1  # set every other port to be used for RTCP (RTP Control Protocol)
        rtpUrl = "rtp://localhost:" + str(rtpPort)

        # run ffmpeg command
        ffmpeg_cmd = "ffmpeg -hide_banner -fflags +genpts -protocol_whitelist pipe,tls,file,http,https,tcp,rtp -use_wallclock_as_timestamps 1 -f rawvideo -pix_fmt yuv420p -s 640x480 -framerate 16 -i pipe:0 -vf realtime -vcodec libx264 -x264-params intra-refresh=1,fast-pskip=0 -profile:v baseline -level:v 3.1 -threads 3 -minrate 500K -maxrate 1.3M -bufsize 500K -g 10  -preset ultrafast -tune zerolatency -f rtp -sdp_file /home/pi/stream{ffmpegInstanceNum}.sdp '{rtpUrl}?rtcpport={rtcpPort}&localrtcpport={rtcpPort}&pkt_size=1200'".format(
            ffmpegInstanceNum=ffmpegInstanceNum,
            rtpUrl=rtpUrl,
            rtcpPort=rtcpPort)
        vidOutput = self.start_piped_input_command(
            inputPipe=vidSrc.stdout,
            cmd_str=ffmpeg_cmd,
        )
        return vidOutput, rtpUrl

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
        for sp in self.runningSubprocesses:
            sp.kill()


# ["ffmpeg", "-f", "avfoundation", "-pix_fmt", "nv12", "-video_size", "640x480", "-use_wallclock_as_timestamps", "1", "-framerate", "30", "-i", "default", "-f", "h264", "pipe:1"]

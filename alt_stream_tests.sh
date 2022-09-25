# ## --- To install from ubuntu snap store: --
# !! this didn't work
# if ! dpkg -s snapd; then
#     sudo apt install -y snapd
#     echo "Restarting in 5s Please Run this script again after the reboot"
#     # sudo reboot
# fi

# sudo snap install core
# sudo snap install webrtc-streamer

## ---- TO Build From Scratch ----
## - See:

# cd /home/pi/
# git clone https://github.com/mpromonet/webrtc-streamer.git
# cd ./webrtc-streamer/
# pushd ..
# git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
# export PATH=$PATH:`realpath depot_tools`
# popd
# mkdir ../webrtc
# pushd ../webrtc
# fetch --no-history webrtc
# popd
# cmake . && make

## to install from github:
wget https://github.com/mpromonet/webrtc-streamer/releases/download/v0.6.5/webrtc-streamer-v0.6.5-Linux-armv7l-Debug.tar.gz
tar -xvf ~/webrtc-streamer-v0.6.5-Linux-armv7l-Debug.tar.gz


wget https://github.com/mpromonet/v4l2tools/archive/refs/tags/v0.1.7.tar.gz
tar -xvf ~/v0.1.7.tar.gz
apt install liblog4cpp5-dev libvpx-dev libx264-dev libx265-dev libjpeg-dev libtool cmake
apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends ca-certificates g++ autoconf automake libtool xz-utils cmake make pkg-config git wget libx264-dev libx265-dev libjpeg-dev libvpx-dev \
    && make install PREFIX=/usr/local && apt-get clean && rm -rf /var/lib/apt/lists/
apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends ca-certificates x264 x265 libjpeg-dev libvpx6 \

# sudo cp  /usr/local/bin//usr/local/bin/webrtc-streamer /usr/local/bin/w
# ebrtc-streamer

# sudo apt install git bc bison flex libssl-dev
# sudo wget https://raw.githubusercontent.com/RPi-Distro/rpi-source/master/rpi-source -O /usr/local/bin/rpi-source && sudo chmod +x /usr/local/bin/rpi-source && /usr/local/bin/rpi-source -q --tag-update
# mkdir -p /home/pi/$(uname -r)
# rpi-source -d $(uname -r)
# # Compile
# cd ~
# git clone https://github.com/umlaeute/v4l2loopback.git
# cd v4l2loopback
# make clean && make
# make && sudo make install
# sudo depmod -a


# sudo modprobe v4l2loopback video_nr=3
# (trap 'kill 0' SIGINT; v4l2compress_omx /dev/video0 /dev/video3 & ./webrtc-streamer -n my -u v4l2:///dev/video3)
# /usr/lib/arm-linux-gnueabihf/v4l2-compat.so




# https://github.com/roboportal/bot_box
go run . -rtbufsize 100M -f dshow -i video="/dev/video0" -pix_fmt yuv420p -c:v libx264 -bsf:v h264_mp4toannexb -b:v 2M -max_delay 0 -bf 0 -f h264
# https://github.com/pion/mediadevices

# https://stackoverflow.com/questions/67203641/missing-go-sum-entry-for-module-providing-package-package-name
go mod tidy


-b:v 6000k


libcamera-vid -t 0 --width 1080 --height 720  --inline --listen -o tcp://0.0.0.0:8778 & ./webrtc-streamer -n my -u tcp://0.0.0.0:8778 && kill $!
libcamera-vid -t 0 --inline -o - | cvlc stream:///dev/stdin --sout '#rtp{sdp=rtsp://:8554/stream1}' :demux=h264 & ./webrtc-streamer -n my -u rtsp://0.0.0.0:8554/stream1 && kill $!


v4l2compress_omx /dev/video0 /dev/video21 & ./webrtc-streamer -n my -u v4l2:///dev/video21 && kill $!

v4l2-ctl -v width=640,height=480,pixelformat=YU12
# -b:v 3000k -maxrate 700k -bufsize 3000k
ffmpeg -f rawvideo -pix_fmt yuv420p -video_size 640x480 -use_wallclock_as_timestamps 1 -i /dev/video0 -vsync 1 -r 30 -c:v h264_v4l2m2m -an -f rtp_mpegts "udp://localhost:5004"
ffmpeg -f rawvideo -pix_fmt yuv420p -video_size 640x480 -use_wallclock_as_timestamps 1 -i /dev/video11 -framerate 20 -c:v h264_v4l2m2m -an -f rtp_mpegts "udp://localhost:5004"
ffplay -sync ext -an -fast -framedrop -probesize 32 -window_title picam02 udp://raspberrypi.local:5004
ffmpeg -f rawvideo -pix_fmt yuv420p -video_size 640x480 -i /dev/video0 -codec:v h264_v4l2m2m -b:v 2048k "tcp://localhost:5004/?listen"

v4l2-ctl \
        -d /dev/video0 \
        --set-ctrl=exposure_dynamic_framerate=1 \
        --set-ctrl=scene_mode=8 \


roboportal.io/
https://github.com/ArduCAM/Arducam-Pivariety-V4L2-Driver/releases/download/install_script/libcamera_dev_links.txt

# ffmpeg option
https://github.com/ashellunts/ffmpeg-to-webrtc
git clone https://github.com/ashellunts/ffmpeg-to-webrtc
cd ffmpeg-to-webrtc/
cd src/
go run . -rtbufsize 100M -f dshow -i video="/dev/video0" -pix_fmt yuv420p -c:v libx264 -bsf:v h264_mp4toannexb -b:v 2M -max_delay 0 -bf 0 -f h264 - < SDP.txt

# ALTERNATIVE
# https://github.com/dwoja22/ffmpeg-webrtc
sudo apt install v4l-utils -y
sudo apt install ffmpeg -y
git clone https://github.com/KW-M/ffmpeg-webrtc.git
cd ffmpeg-webrtc/
go build
./ffmpeg-webrtc






 ffplay udp://raspberrypi.local:8888 -vf "setpts=N/30" -fflags nobuffer -flags low_delay -framedrop

 ffmpeg -f rawvideo -pix_fmt yuv420p -video_size 852x480 -use_wallclock_as_timestamps 1 -i /dev/video0 -vsync 1 -r 30 -c:v h264_v4l2m2m -an -f rtp_mpegts "udp://localhost:5004"


# ----- how to install go ---
if grep "GOPATH=" ~/.profile; then
	# ^checks if we have already added words "GOPATH=" to the  ~/.profile file:
	echo -e "$Green Go path already setup in ~/.profile $Color_Off"
else
# https://www.e-tinkers.com/2019/06/better-way-to-install-golang-go-on-raspberry-pi/
    echo -e "$Cyan Installing GO and adding GOPATH to ~/.profile $Color_Off"
    sudo rm -r /usr/local/go | true # remove any old version of go
    sudo apt install -y git wget
    wget https://dl.google.com/go/go1.17.6.linux-armv6l.tar.gz

    sudo tar -C /usr/local -xzf go1.17.6.linux-armv6l.tar.gz
    rm go1.17.6.linux-armv6l.tar.gz
    echo 'PATH=$PATH:/usr/local/go/bin' | sudo tee -a ~/.profile
    echo 'GOPATH=$HOME/golang' | sudo tee -a ~/.profile
    source ~/.profile
fi


https://www.e-tinkers.com/2019/06/better-way-to-install-golang-go-on-raspberry-pi/



# ON MAC TO READ WEBCAM TO STDOUT AS H264: (2>&- means ignore stderr)
ffmpeg -f avfoundation -pix_fmt nv12 -video_size 640x480 -use_wallclock_as_timestamps 1 -framerate 30 -i "default" -f h264 pipe:1 2>&-
ffmpeg -f avfoundation -pix_fmt nv12 -framerate 30 -use_wallclock_as_timestamps 1 -i default -vcodec libx264 -f h264 -y ./webrtc-relay/vido.pipe

# doesn't work on mac
 -preset ultrafast -tune zerolatency -b:v 90k -profile:v "high"
ffmpeg -hide_banner -f avfoundation -pix_fmt "nv12" -framerate 30 -use_wallclock_as_timestamps 1 -i default  -an -vcodec libx264 -preset "ultrafast" -profile:v "high" -f h264 -y pipe:1 > ./webrtc-relay/vido.pipe
ffmpeg -hide_banner -f lavfi -i "testsrc=duration=10:size=1280x720:rate=30" -an -vcodec h264_omx -preset "ultrafast"  -f h264 -y pipe:1 > ./webrtc-relay/vido.pipe
ffmpeg -f avfoundation -pix_fmt yuyv422 -framerate 30 -use_wallclock_as_timestamps 1 -i default \
 -an -vcodec libx264 -f h264 -y ./webrtc-relay/vido.pipe

# raspberry PI TEST PATTERN WORKS!
ffmpeg -hide_banner -f lavfi -i "testsrc=size=1280x720:rate=30" -r 30 -vcodec h264_v4l2m2m -f h264 -y pipe:1 > /tmp/webrtc-relay/vido.pipe
## raspi lower latency test pattern:
ffmpeg -hide_banner -f lavfi -rtbufsize 1M -use_wallclock_as_timestamps 1 -i "testsrc=size=1280x720:rate=30" -r 30 -vcodec h264_v4l2m2m -preset "ultrafast" -tune zerolatency  -use_wallclock_as_timestamps 1 -fflags nobuffer -b:v 200k -f h264 -y pipe:1 > /tmp/webrtc-relay/vido.pipe
## raspi test pattern with clock:
ffmpeg -hide_banner -f lavfi -rtbufsize 50M -use_wallclock_as_timestamps 1 -i "testsrc=size=1280x720:rate=30" -r 30 -vf "settb=AVTB,setpts='trunc(PTS/1K)*1K+st(1,trunc(RTCTIME/1K))-1K*trunc(ld(1)/1K)',drawtext=text='%{localtime}.%{eif\:1M*t-1K*trunc(t*1K)\:d}':fontcolor=black@1:fontsize=(h/10):x=(w-text_w)/2:y=10" -vcodec h264_v4l2m2m -preset "ultrafast" -tune zerolatency   -use_wallclock_as_timestamps 1 -fflags nobuffer -b:v 9k -f h264 -y pipe:1 > /tmp/webrtc-relay/vido.pipe
## raspi camera feed (raspi os buster or later)
libcamera-vid --width 960 --height 720 --codec h264 --profile high --level 4.2 --bitrate 800000 --framerate 30 --inline 1 --flush 1 --timeout 0 --nopreview 1 --output -
# get raw libcamera (raspicamera output feed)
libcamera-vid --width 960 --height 720 --codec yuv420 --framerate 30 --flush 1 --timeout 0 --nopreview 1 --output -
## pipe raw feed into ffmpeg and add timestamp (note that the output parameters of libcamera vid and before -i in the ffmpeg cmd must mach)
libcamera-vid --width 960 --height 720 --codec yuv420 --framerate 20 --flush 1 --timeout 0 --nopreview 1 --output - | ffmpeg -hide_banner -f rawvideo -pix_fmt yuv420p -s 960x720 -framerate 20 -rtbufsize 1M -use_wallclock_as_timestamps 1 -i "pipe:" -vf "settb=AVTB,setpts='trunc(PTS/1K)*1K+st(1,trunc(RTCTIME/1K))-1K*trunc(ld(1)/1K)',drawtext=text='%{localtime}.%{eif\:1M*t-1K*trunc(t*1K)\:d}':fontcolor=black@1:fontsize=(h/10):x=(w-text_w)/2:y=10" -vcodec h264_v4l2m2m -preset "ultrafast" -tune zerolatency   -use_wallclock_as_timestamps 1 -fflags nobuffer -b:v 100k -f h264 -y pipe:1 > /tmp/webrtc-relay/vido.pipe

"ffmpeg","-hide_banner","-f","lavfi","-i","testsrc","-vcodec","h264_v4l2m2m","-preset","ultrafast","-tune","zerolatency","-b:v","200k","-f","h264","-y","pipe:1" > /tmp/webrtc-relay/vido.pipe

# youtube recomended ffmpeg settings:
# NOTE THAT WEBRTC DOESN"T SUPPORT B-FRAMES
# https://gist.github.com/mikoim/27e4e0dc64e384adbcb91ff10a2d3678

## --- Failed attempts to use udp / tcp streaming:------
ffmpeg -hide_banner -f lavfi -rtbufsize 5m -use_wallclock_as_timestamps 1 -i "testsrc=size=1280x720:rate=30" -r 30 -vf "settb=AVTB,setpts='trunc(PTS/1K)*1K+st(1,trunc(RTCTIME/1K))-1K*trunc(ld(1)/1K)',drawtext=text='%{localtime}.%{eif\:1M*t-1K*trunc(t*1K)\:d}':fontcolor=black@1:fontsize=(h/10):x=(w-text_w)/2:y=10" -vcodec h264_v4l2m2m -preset "ultrafast" -tune zerolatency  -use_wallclock_as_timestamps 1 -fflags nobuffer -b:v 500k -f rtp_mpegts "udp://localhost:5004"
# this ones should be piped input first
ffmpeg -hide_banner -f rawvideo -pix_fmt yuv420p -s 960x720 -framerate 20 -rtbufsize 1M -use_wallclock_as_timestamps 1 -i "pipe:" -c:v h264_v4l2m2m -an -f rtp_mpegts "tcp://localhost:5004"
# on the other end:
ffplay -sync ext -an -fast -framedrop -probesize 32 -window_title picam02 tcp://raspberrypi.local:5004

https://trac.ffmpeg.org/wiki/HWAccelIntro
https://trac.ffmpeg.org/wiki/Encode/H.264
https://trac.ffmpeg.org/wiki/Creating%20multiple%20outputs
https://trac.ffmpeg.org/wiki/StreamingGuide#Latency
https://trac.ffmpeg.org/ticket/1417
https://trac.ffmpeg.org/wiki/FancyFilteringExamples
https://trac.ffmpeg.org/wiki/DirectShow
https://trac.ffmpeg.org/wiki/Capture/Webcam
https://github.com/yihui/animation/issues/74

# "libcamera-vid --width 640 --height 480 --framerate 15 --codec h264  --profile high --level 4.2 --bitrate 800000 --inline 1  --flush 1 --timeout 0 --nopreview 1 --output - "


# working udp send and recive combo:
# send (replace with ip of reciever)
ffmpeg -hide_banner -f lavfi -re  -rtbufsize 1M -use_wallclock_as_timestamps 1 -i "testsrc=size=1280x720:rate=30" -pix_fmt yuv420p -framerate 30  -vcodec libx264  -use_wallclock_as_timestamps 1 -preset ultrafast  -profile:v high  -fflags nobuffer -b:v 900k -f mpegts udp://Kyles-MBP:1254
# recive (replace with ip of sender)
ffplay -sync ext -an -fast -framedrop -probesize 32 udp://raspberrypi.local:1254

# send
libcamera-vid --width 960 --height 720 --codec h264 --profile high --level 4.2 --bitrate 800000 --framerate 30 --inline 1 --flush 1 --timeout 0 --nopreview 1 --inline --listen -o tcp://0.0.0.0:8778
# recive
ffplay -sync ext -an -fast -framedrop -probesize 32 -window_title picam02 tcp://raspberrypi.local:8778


# send (replace with ip of reciever)
ffmpeg -hide_banner -f lavfi -re  -rtbufsize 1M -use_wallclock_as_timestamps 1 -i "testsrc=size=1280x720:rate=30" -pix_fmt yuv420p -framerate 30  -vcodec libx264  -use_wallclock_as_timestamps 1 -preset ultrafast  -profile:v high  -fflags nobuffer -b:v 900k -f mpegts udp://Kyles-MBP:1254
libcamera-vid --width 1920 --height 1080 --codec yuv420 --framerate 20 --flush 1 --timeout 0 --nopreview 1 --output - | ffmpeg -hide_banner -f rawvideo -pix_fmt yuv420p -re -s 1920x1080 -framerate 20 -use_wallclock_as_timestamps 1 -i pipe:0 -vf "settb=AVTB,setpts='trunc(PTS/1K)*1K+st(1,trunc(RTCTIME/1K))-1K*trunc(ld(1)/1K)',drawtext=text='%{localtime}.%{eif\:1M*t-1K*trunc(t\*1K)\:d}':fontcolor=black@1:fontsize=(h/10):x=(w-text_w)/2:y=10" -vcodec libx264 -b:v 900k -g 10 -fflags nobuffer -preset ultrafast -tune zerolatency -f mpegts udp://Kyles-MBP:1254
libcamera-vid --width 1920 --height 1080 --codec yuv420 --framerate 20 --flush 1 --timeout 0 --nopreview 1 --output - | ffmpeg -hide_banner -f rawvideo -pix_fmt yuv420p -re -s 1920x1080 -framerate 20 -fflags +genpts -fflags nobuffer -i pipe:0 -vf "settb=AVTB,setpts='trunc(PTS/1K)*1K+st(1,trunc(RTCTIME/1K))-1K*trunc(ld(1)/1K)',drawtext=text='%{localtime}.%{eif\:1M*t-1K*trunc(t\*1K)\:d}':fontcolor=black@1:fontsize=(h/10):x=(w-text_w)/2:y=10"  -vcodec h264_v4l2m2m -b:v 900k -g 10 -fflags +genpts -fflags nobuffer -f mpegts udp://Kyles-MBP:1254
# recive (replace with ip of sender)
ffplay -sync ext -an -fast -framedrop -probesize 32 udp://raspberrypi.local:1254


libcamera-vid --width 1920 --height 1080 --codec yuv420 --framerate 20 --flush 1 --timeout 0 --nopreview 1 --output - | ffmpeg -hide_banner -f rawvideo -pix_fmt yuv420p -re -s 1920x1080 -framerate 20 -fflags +genpts -fflags nobuffer -i pipe:0 -vf "settb=AVTB,setpts='trunc(PTS/1K)*1K+st(1,trunc(RTCTIME/1K))-1K*trunc(ld(1)/1K)',drawtext=text='%{localtime}.%{eif\:1M*t-1K*trunc(t\*1K)\:d}':fontcolor=black@1:fontsize=(h/10):x=(w-text_w)/2:y=10"  -vcodec h264_v4l2m2m -b:v 900k -g 10 -fflags +genpts -fflags nobuffer -f mpegts udp://Kyles-MBP:1254


ffmpeg -hide_banner -f v4l2 -input_format raw -pix_fmt yuv420p -video_size 1920x1080 -framerate 30 -i /dev/video0 -vcodec copy -b:v 900k -g 10 -fflags +genpts -fflags nobuffer -f mpegts udp://Kyles-MBP:1254
ffmpeg -hide_banner -f video4linux2 -input_format yuyv422 -i /dev/video0 -c:v libx264 -vf format=yuv420p -f mpegts udp://Kyles-MBP:1254
ffmpeg -f video4linux2 -input_format mjpeg -i /dev/video0


# works latecy free with freezes: libcamera-vid --width 640 --height 480 --framerate 15 --codec h264  --profile high --level 4.2 --bitrate 800000 --inline 1  --flush 1 --timeout 0 --nopreview 1 --output - | ffmpeg -hide_banner -f h264 -re -framerate 15 -i pipe:0 -vcodec copy -fflags nobuffer -f rtp 'rtp://127.0.0.1:1820?pkt_size=1200'
#
# ffmpeg -hide_banner -f rawvideo -pix_fmt yuv420p -re -s 960x576 -framerate 15 -use_wallclock_as_timestamps 1 -i pipe:0 -r 15 -vcodec h264_v4l2m2m -preset "ultrafast" -tune zerolatency -b:v 700k -fflags nobuffer -f rtp 'rtp://
#
# ffmpeg -hide_banner -f lavfi -pix_fmt yuv420p -use_wallclock_as_timestamps 1 -i "testsrc=size=1280x720:rate=30" -r 30 -vcodec h264_v4l2m2m -preset "ultrafast" -tune zerolatency  -use_wallclock_as_timestamps 1 -fflags nobuffer -b:v 200k -f h264
# -s 1024x576 -framerate 15
# -s 1920x1080 -framerate 20


Old: "ffmpeg -fflags +genpts -re -f lavfi -i testsrc=size=640x480:rate=30 -pix_fmt yuv420p -c:v libx264 -g 10 -preset ultrafast -tune zerolatency -f rtp -sdp_file stream{}.sdp 'rtp://127.0.0.1:{}?rtcpport={}&localrtcpport={}&pkt_size=1200'"
# best test pattern command so far:
"ffmpeg -fflags +genpts -protocol_whitelist pipe,tls,file,http,https,tcp,rtp -f lavfi -i testsrc=size=640x480:rate=30  -pix_fmt yuv420p -vf realtime -c:v libx264 -x264-params intra-refresh=1,fast-pskip=0 -profile:v baseline -level:v 3.1 -threads 3 -minrate 500K -maxrate 1.3M -bufsize 500K -g 10  -preset ultrafast -tune zerolatency -f rtp -sdp_file stream{}.sdp 'rtp://127.0.0.1:{}?rtcpport={}&localrtcpport={}&pkt_size=1200'"
                .format(ffmpegInstanceNum, rtpPort, rtcpPort, rtcpPort)))

sources:
# https://pkg.go.dev/github.com/pion/webrtc/v3/examples/rtp-to-webrtc#section-readme
# ?" https://trac.ffmpeg.org/ticket/8479
# http://web.archive.org/web/20210203090350/https://blog.maxwellgale.com/2021/01/30/streaming-video-over-webrtc-using-ffmpeg/
# https://www.kurento.org/blog/rtp-ii-streaming-ffmpeg
# alternatively replace the run_cmd_string line above with this use vp8 encoding (seems to run slower when run from python, not sure why):

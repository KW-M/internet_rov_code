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
# # Compile driver
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

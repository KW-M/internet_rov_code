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
#!/bin/sh
set -e # exit on error
set -x # echo all commands

# ------------------------------------------------------------------------------
# ---- Helpful Variables -------------------------------------------------------
# ------------------------------------------------------------------------------

PATH_TO_THIS_SCRIPT=$0
FOLDER_CONTAINING_THIS_SCRIPT=${PATH_TO_THIS_SCRIPT%/*}
cd "$FOLDER_CONTAINING_THIS_SCRIPT"
FOLDER_CONTAINING_THIS_SCRIPT="$(pwd)"

# ----- RPi Model Details ------------------------------------------------------
# from https://raspberrypi.stackexchange.com/questions/100076/what-revisions-does-cat-proc-cpuinfo-return-on-the-new-pi-4-1-2-4gb
PI_CPU_MODEL=$(cat /proc/cpuinfo | grep 'Hardware' | awk '{print $3}')
PI_CPU_ARCHITECTURE=$(arch)

# ----- terminal text colors ----------------------------------------------------
Green="\033[1;32m"  # Green color code for console text
Cyan="\033[1;36m"   # Cyan color code for console text
Red="\033[1;31m"    # Red color code for console text
Color_Off="\033[0m" # Text color Reset code for console text

# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------

# --------- Update System Packages ------------
# From: https://learn.adafruit.com/circuitpython-on-raspberrypi-linux/installing-circuitpython-on-raspberry-pi
echo -e "$Cyan Making sure all system & package updates are installed... $Color_Off"
sudo apt-get update --fix-missing || true
sudo apt -y full-upgrade --fix-missing || true
sudo apt -y dist-upgrade --fix-missing || true
sudo apt -y update --fix-missing || true
sudo apt install -y git wget || true

# ------- Install Arducam Low Light Camera Driver --------------------------------------------------------------------------------------
# from: https://docs.arducam.com/Raspberry-Pi-Camera/Pivariety-Camera/Quick-Start-Guide/
pushd ~/
if ! dmesg | grep arducam; then
    { # try
        echo -e "$Cyan Adding dtoverlay=arducam-pivariety to /boot/config.txt $Color_Off" &&
        (sudo sed -i.bak '/dtoverlay=arducam/d' /boot/config.txt || true) && # remove existing refernces to arducam
        (sudo sed -i.bak '/dtoverlay=arducam-pivariety/d' /boot/config.txt || true) && # remove existing refernces to arducam
        echo "dtoverlay=arducam-pivariety" | sudo tee /boot/config.txt && # add arducam to config.txt

        echo -e "$Cyan Installing arducam pivariety camera driver $Color_Off" &&
        mkdir camera_drivers &&
        cd camera_drivers &&
        wget -O install_pivariety_pkgs.sh https://github.com/ArduCAM/Arducam-Pivariety-V4L2-Driver/releases/download/install_script/install_pivariety_pkgs.sh &&
        chmod +x install_pivariety_pkgs.sh &&

        # ./install_pivariety_pkgs.sh -p kernel_driver # this comes with the kernel by default on raspberrypi os, so not needed anymore
        ./install_pivariety_pkgs.sh -p libcamera_dev &&
        ./install_pivariety_pkgs.sh -p libcamera_apps &&

        cd ../ && rm -rf camera_drivers || true
    } || { # catch
        echo -e "$Red Failed to install arducam pivariety camera driver $Color_Off"
        echo -e "$Red Install them manually using this link: https://docs.arducam.com/Raspberry-Pi-Camera/Pivariety-Camera/Quick-Start-Guide/ $Color_Off"
    }
fi
popd

# ---- Install GO Language ----
# From: https://www.e-tinkers.com/2019/06/better-way-to-install-golang-go-on-raspberry-pi/
pushd ~/
# check if we have already added words "GOPATH=" to the  ~/.profile file:
if ! grep "GOPATH=" ~/.profile; then
    { # try
        echo -e "$Cyan Installing GO and adding GOPATH to ~/.profile $Color_Off" &&
        (sudo rm -rf /usr/local/go || true) && # remove any old version of go
        (sudo sed -i.bak '/go\\/bin/d' ~/.profile || true) && # remove existing refernces to go
        (sudo sed -i.bak '/GOPATH/d' ~/.profile || true) && # remove existing refernces to GOPATH

        wget https://go.dev/dl/go1.19.4.linux-armv6l.tar.gz -O goinstall.tar.gz &&
        sudo tar -C /usr/local -xzf goinstall.tar.gz &&
        rm goinstall.tar.gz &&
        echo 'PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' | sudo tee -a ~/.profile &&
        echo 'GOPATH=$HOME/golang' | sudo tee -a ~/.profile &&
        source ~/.profile
    } || { # catch
        echo -e "$Red Failed to install GO Lang $Color_Off"
        echo -e "$Red Install it manually using this link: https://www.e-tinkers.com/2019/06/better-way-to-install-golang-go-on-raspberry-pi/ $Color_Off"
    }
fi
popd

# ---- Install libvpx (vp8 & vp9 video codecs) ----
pushd ~/
{ # try
    git clone https://chromium.googlesource.com/webm/libvpx &&
    cd libvpx/ &&
    ./configure --enable-pic --disable-examples --disable-tools --disable-unit_tests --disable-docs --enable-static &&
    make &&
    sudo make install &&
    cd ../ &&
    rm -rf libvpx
} || { # catch
    echo -e "$Red Failed to install libvpx $Color_Off"
    echo -e "$Red Install it manually: google 'install libvpx on debian or raspberry pi -ffmpeg' $Color_Off"
}
popd

# ---- INSTALL GO WEBRTC-RELAY ----
pushd ~/
{ # try
    (rm -rf webrtc-relay || true) && # remove any old version of webrtc-relay
    git clone https://github.com/kw-m/webrtc-relay.git &&
    cd webrtc-relay &&
    go install .
} || { # catch
    echo -e "$Red Failed to install webrtc-relay $Color_Off"
    echo -e "$Red Download & Install it manually: see https://github.com/kw-m/webrtc-relay' $Color_Off"
}
popd

# ---- DOWNLOAD STATIC ROV FRONTEND WEB PAGE ----
pushd ~/
{ # try
    (rm -rf rov-web || true) && # remove any old version of rov-web
    git clone -b gh-pages --single-branch https://github.com/kw-m/rov-web.git
} || { # catch
    echo -e "$Red Failed to download rov-web $Color_Off"
    echo -e "$Red Download & Install it manually: see https://github.com/kw-m/rov-web $Color_Off"
}
popd

# ---- Install Ngnix Web Server ----
sudo apt install -y nginx
# Setup Nginx to log to the file "nginx_error.log":
# this solves the problem of missing the nginx log folder when the temp filesystem first starts up.
if grep "/var/log/nginx" "/lib/systemd/system/nginx.service"; then
	# ^checks if we have already added words " -e '/var/log/nginx_error.log'" to the nginx.service file:
	echo -e "$Green nginx.service already has the nginx error log folder '/var/log/nginx' already added in /lib/systemd/system/nginx.service$Color_Off"
else
	echo -e "$Cyan Adding nginx error log folder '/var/log/nginx' in /lib/systemd/system/nginx.service $Color_Off"
	# https://stackoverflow.com/questions/148451/how-to-use-sed-to-replace-only-the-first-occurrence-in-a-file
	sudo sed -i '0,/ExecStartPre=/s//ExecStartPre=mkdir -p "\/var\/log\/nginx\/"\nExecStartPre=/' /lib/systemd/system/nginx.service || true
fi

# ---- Install USB Teathering suport for iPhone (From: https://www.youtube.com/watch?v=Q-m4i7LFxLA)
{ # try
    echo -e "$Cyan Installing packages with apt: usbmuxd ipheth-utils libimobiledevice-utils $Color_Off"
    echo -e "$Green Installing packages to enable the pi to do usb internet teathering with an iphone... $Color_Off"
    sudo apt install -y usbmuxd ipheth-utils libimobiledevice-utils
} || { # catch
    echo -e "$Red Failed to install usb tethering packages $Color_Off"
    echo -e "$Red Install it manually: https://www.youtube.com/watch?v=Q-m4i7LFxLA' $Color_Off"
}

# --------------------------------------------------------------------------
# ----- Python Library Setup -------------------------------------------------------
# --------------------------------------------------------------------------

# A Python 3.10+ installer script can be found here:
# https://itheo.tech/installing-python-310-on-raspberry-pi

echo -e "$Cyan Installing python3 pip $Color_Off"
sudo apt install -y python3-pip
sudo python3 -m pip install --upgrade setuptools

echo -e "$Cyan Installing python packages $Color_Off"
sudo python3 -m pip install -r ./python/requirements.txt

echo "Compiling cython modules"
python3 ./python/cython_modules/setup.py build_ext --inplace

# ----------------------------------------------------------------------------------------------------------------------

echo -e "$Cyan Running the update_config_files.sh script in this folder. $Color_Off"
cd "$FOLDER_CONTAINING_THIS_SCRIPT"
/bin/sh ./update_config_files.sh # run the update config files script in this folder.

echo -e "$Cyan Enabling systemd (systemctl) services so they start at boot (or whenever configured too)... $Color_Off"
echo -e "$Green enabling pigpiod.service ... $Color_Off"
sudo systemctl enable pigpiod.service
echo -e "$Green enabling rov_python_code.service ... $Color_Off"
sudo systemctl enable rov_python_code.service # enable the new rov_python_code service
echo -e "$Green enabling rov_go_code.service ... $Color_Off"
sudo systemctl enable rov_go_code.service # enable the new rov_python_code service
echo -e "$Green enabling nginx.service ... $Color_Off"
sudo systemctl enable nginx.service
echo -e "$Green enabling add_fixed_ip.service ... $Color_Off"
sudo systemctl enable add_fixed_ip.service

# clean up any packages that were installed to aid installing anything else, but are no longer needed
sudo apt autoremove -y

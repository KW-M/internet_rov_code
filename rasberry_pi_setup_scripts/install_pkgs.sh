#!/bin/bash
set -e # exit on error
set -u # exit on undefined variable

# ------------------------------------------------------------------------------
# ---- Helpful Variables -------------------------------------------------------
# ------------------------------------------------------------------------------

PATH_TO_THIS_SCRIPT=$(readlink -f -- $0)
FOLDER_CONTAINING_THIS_SCRIPT=${PATH_TO_THIS_SCRIPT%/*}

# ----- RPi Model Details ------------------------------------------------------
# from https://raspberrypi.stackexchange.com/questions/100076/what-revisions-does-cat-proc-cpuinfo-return-on-the-new-pi-4-1-2-4gb
PI_CPU_MODEL=$(cat /proc/cpuinfo | grep 'Hardware' | awk '{print $3}')
PI_CPU_ARCHITECTURE=$(arch)

# ----- terminal text colors ----------------------------------------------------
Green="\033[37;42;1m"  # Green color code for console text
Blue="\033[37;44;1m"   # Blue color code for console text
Black="\033[37;40;1m" # Black color code for console text
Red="\033[37;41;1m"    # Red color code for console text
Color_Off="\033[0m" # Text color Reset code for console text
echoBlue() { echo -e "$Blue $@ $Color_Off" >&2;}
echoGreen() { echo -e "$Green $@ $Color_Off" >&2; }
echoRed() { echo -e "$Red $@ $Color_Off" >&2; }

# Function to display commands in Black before running them
exe() { echo -e "$Black> $@ $Color_Off" >&2; eval "$@" ; }

# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------

# --------- Update System Packages ------------
# From: https://learn.adafruit.com/circuitpython-on-raspberrypi-linux/installing-circuitpython-on-raspberry-pi
echoBlue "Making sure all system & package updates are installed... "
exe "sudo apt-get update --fix-missing" || true
exe "sudo apt -y full-upgrade --fix-missing" || true
exe "sudo apt -y dist-upgrade --fix-missing" || true
exe "sudo apt -y update --fix-missing" || true
exe "sudo apt install -y git wget" || true

# ------- Install Arducam Low Light Camera Driver --------------------------------------------------------------------------------------
# from: https://docs.arducam.com/Raspberry-Pi-Camera/Pivariety-Camera/Quick-Start-Guide/
if ! dmesg | grep arducam; then
    { # try
        cd ~/
        exe "sudo sed -i.bak '/dtoverlay=arducam/d' /boot/config.txt" && false || # remove existing refernces to arducam
        exe "sudo sed -i.bak '/dtoverlay=arducam-pivariety/d' /boot/config.txt" && false || # remove existing refernces to arducam

        echoBlue "Installing arducam pivariety camera driver " &&
        exe "mkdir -p camera_drivers" &&
        exe "cd camera_drivers" &&
        exe "wget -c --timeout=10 --waitretry=4 --tries=5 -O install_pivariety_pkgs.sh https://github.com/ArduCAM/Arducam-Pivariety-V4L2-Driver/releases/download/install_script/install_pivariety_pkgs.sh" &&
        exe "chmod +x install_pivariety_pkgs.sh" &&

        # exe "./install_pivariety_pkgs.sh -p kernel_driver" && # this comes with the kernel by default on raspberrypi os, so not needed anymore
        exe "./install_pivariety_pkgs.sh -p libcamera_dev" &&
        exe "./install_pivariety_pkgs.sh -p libcamera_apps" &&

        echoBlue "Adding dtoverlay=arducam-pivariety to /boot/config.txt " &&
        exe "echo 'dtoverlay=arducam-pivariety' | sudo tee -a /boot/config.txt" && # add arducam to config.txt

        exe "cd ../" &&
        exe "rm -rf camera_drivers"
    } || { # catch
        echoRed "Failed to install arducam pivariety camera driver "
        echoRed "Install them manually using this link: https://docs.arducam.com/Raspberry-Pi-Camera/Pivariety-Camera/Quick-Start-Guide/ "
    }
fi

# ---- Install GO Language ----
# From: https://www.e-tinkers.com/2019/06/better-way-to-install-golang-go-on-raspberry-pi/
# check if we have already added words "GOPATH=" to the  ~/.profile file:
if ! grep "GOPATH=" ~/.profile; then
    { # try
        cd ~/
        echoBlue "Installing GO and adding GOPATH to ~/.profile " &&
        exe "sudo rm -rf /usr/local/go" && false || # remove any old version of go
        exe "sudo sed -i.bak '/go\\/bin/d' ~/.profile " && false || # remove existing refernces to go
        exe "sudo sed -i.bak '/GOPATH/d' ~/.profile" && false ||  # remove existing refernces to GOPATH

        exe "wget -c --timeout=10 --waitretry=4 --tries=5 https://go.dev/dl/go1.19.4.linux-armv6l.tar.gz -O goinstall.tar.gz" &&
        exe "sudo tar -C /usr/local -xzf goinstall.tar.gz" &&
        exe "rm goinstall.tar.gz" &&
        exe "echo 'PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' | sudo tee -a ~/.profile" &&
        exe "echo 'GOPATH=$HOME/golang' | sudo tee -a ~/.profile" &&
        exe "source ~/.profile"
    } || { # catch
        echoRed "Failed to install GO Lang "
        echoRed "Install it manually using this link: https://www.e-tinkers.com/2019/06/better-way-to-install-golang-go-on-raspberry-pi/ "
    }
fi

# # ---- Install libvpx (vp8 & vp9 video codecs) ----
{ # try
    cd ~/
    exe "rm -rf libvpx" && false || # remove any old version of libvpx
    exe "git clone https://chromium.googlesource.com/webm/libvpx" &&
    exe "cd libvpx/" &&
    exe "./configure --enable-pic --disable-examples --disable-tools --disable-unit_tests --disable-docs --enable-static" &&
    exe "make" &&
    exe "sudo make install" &&
    exe "cd ../" &&
    exe "rm -rf libvpx"
} || { # catch
    echoRed "Failed to install libvpx "
    echoRed "Install it manually: google 'install libvpx on debian or raspberry pi -ffmpeg' "
}

# # ---- INSTALL GO WEBRTC-RELAY ----
{ # try
    cd ~/
    exe "rm -rf webrtc-relay" && false || # remove any old version of webrtc-relay
    exe "git clone https://github.com/kw-m/webrtc-relay.git" &&
    exe "cd webrtc-relay" &&
    exe "go install ./ "
} || { # catch
    echoRed "Failed to install webrtc-relay "
    echoRed "Download & Install it manually: see https://github.com/kw-m/webrtc-relay' "
}

# # ---- DOWNLOAD STATIC ROV FRONTEND WEB PAGE ----

{ # try
    cd ~/
    exe "rm -rf rov-web" && false || # remove any old version of rov-web
    exe "git clone -b gh-pages --single-branch https://github.com/kw-m/rov-web.git"
} || { # catch
    echoRed "Failed to download rov-web "
    echoRed "Download & Install it manually: see https://github.com/kw-m/rov-web "
}

# # ---- Install USB Teathering suport for iPhone (From: https://www.youtube.com/watch?v=Q-m4i7LFxLA)
{ # try
    echoBlue "Installing packages to enable the pi to do usb internet teathering with an iphone... "
    sudo apt install -y usbmuxd ipheth-utils libimobiledevice-utils
} || { # catch
    echoRed "Failed to install usb tethering packages "
    echoRed "Install it manually: https://www.youtube.com/watch?v=Q-m4i7LFxLA' "
}

# ---- Install Ngnix Web Server ----
{ # try
    exe "sudo apt install -y nginx"

    # Setup Nginx to log to the file "nginx_error.log":
    # this solves the problem of missing the nginx log folder when the temp filesystem first starts up.
    # Check if we have already added words " -e '/var/log/nginx_error.log'" to the nginx.service file:
    if ! grep "/var/log/nginx" "/lib/systemd/system/nginx.service"; then
        echoBlue "Adding nginx error log folder '/var/log/nginx' in /lib/systemd/system/nginx.service "
        # https://stackoverflow.com/questions/148451/how-to-use-sed-to-replace-only-the-first-occurrence-in-a-file
        exe "sudo sed -i '0,/ExecStartPre=/s//ExecStartPre=mkdir -p \"\/var\/log\/nginx\/\"\nExecStartPre=/' /lib/systemd/system/nginx.service" || true
    fi
} || { # catch
    echoRed "Failed to install & setup nginx web server"
    echoRed "Install it manually: https://nginx.org/en/linux_packages.html "
}

# --------------------------------------------------------------------------
# ----- Python Library Setup -------------------------------------------------------
# --------------------------------------------------------------------------

## A Python 3.10+ installer script can be found here:
## From: https://itheo.tech/installing-python-310-on-raspberry-pi
# python_version_to_install="3.10.0"
# exe "cd ~/"
# exe " -c --timeout=10 --waitretry=4 --tries=5 -q0 - https://raw.githubusercontent.com/tvdsluijs/sh-python-installer/main/python.sh | sudo bash -s ${python_version_to_install}"
# exe "rm ./Python-${python_version_to_install}tar.xz"
# exe "rm -rf ./Python-${python_version_to_install}"

exe "cd '$FOLDER_CONTAINING_THIS_SCRIPT'"
exe "cd '../'"

echoBlue "Installing python3 pip and pigpiod"
exe "sudo apt install -y python3-pip pigpiod"
exe "sudo python3 -m pip install --upgrade setuptools"

echoBlue "Installing python packages "
exe "sudo python3 -m pip install -r python/requirements.txt"

echoBlue "Compiling cython modules"
exe "python3 python/cython_modules/setup.py build_ext --inplace"

# ----------------------------------------------------------------------------------------------------------------------

{ # try
    echoBlue "Running the rasberry_pi_setup_scripts/fetch_changes.sh script in this folder. " &&
    exe "/bin/bash $FOLDER_CONTAINING_THIS_SCRIPT/fetch_changes.sh" && # run the update config files script in this folder.

    echoBlue "Enabling systemd (systemctl) services so they start at boot (or whenever configured too)... " &&
    exe "sudo systemctl enable pigpiod.service" &&
    exe "sudo systemctl enable rov_python_code.service" && # enable the new rov_python_code service
    exe "sudo systemctl enable rov_go_code.service" && # enable the new rov_python_code service
    exe "sudo systemctl enable nginx.service" &&
    exe "sudo systemctl enable add_fixed_ip.service"
} || { # catch
    echoRed "Failed to enable some systemd services. See the above output for more info."
}

echoBlue "cleaning up any packages that were installed to aid installing anything else, but are no longer needed"
exe "sudo apt autoremove -y"

# -------------------- Done ------------------------

echoBlue "install_pkgs.sh Done"

#!/bin/bash -e

PATH_TO_THIS_SCRIPT=$0
FOLDER_CONTAINING_THIS_SCRIPT=${PATH_TO_THIS_SCRIPT%/*}
cd "$FOLDER_CONTAINING_THIS_SCRIPT"

# from https://raspberrypi.stackexchange.com/questions/100076/what-revisions-does-cat-proc-cpuinfo-return-on-the-new-pi-4-1-2-4gb
PI_CPU_MODEL=$(cat /proc/cpuinfo | grep 'Hardware' | awk '{print $3}')

# function to pretty print SSROV to console in bold cyan color.
print_ssrov(){
	Cyan="\033[1;36m"   # Cyan color code
	Color_Off="\033[0m" # Text color Reset
	echo -n -e "$Cyan SSROV $Color_Off" # Cyan color code
}

print_ssrov; echo "This scripts sets up a raspberry pi install as an internet rov, from a fresh install of raspbian."
print_ssrov; echo "(it's fine if below gets run twice or more anyway, it just takes a while)"

print_ssrov; echo "!!!!!!!!"
print_ssrov; echo "REMEMEBER to change the pi user password to something other than the default by running the command: sudo passwd pi (just type, characters won't show,  see notes in internet_rov google drive folder for previously used password)"
print_ssrov; echo "!!!!!!!!"

print_ssrov; echo "Setting Timezone to America/Los_Angeles ..."
sudo timedatectl set-timezone America/Los_Angeles
sudo timedatectl set-ntp true # enable network time sync

print_ssrov; echo "Setting Locale (Language & keyboard to English US layout)..."
# https://www.jaredwolff.com/raspberry-pi-setting-your-locale/
# check if the loaded locales contains machine-info file:
if ! $( locale -a | grep -i -q 'en_US.utf8') || $(locale -a | grep -i -q 'en_US.utf-8'); then
 	print_ssrov; echo "en_US.utf8 local not generated, loading it now ..."
	sudo perl -pi -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/g' /etc/locale.gen
	sudo locale-gen en_US.UTF-8
fi
sudo localectl set-locale en_US.UTF-8
sudo update-locale LANG=en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8
sudo localectl set-keymap us

# From: https://raspberrypi.stackexchange.com/questions/28907/how-could-one-automate-the-raspbian-raspi-config-setup
print_ssrov; print_ssrov; echo "Setting the pi to enable different functionality.  (all of these can also be set manually by running sudo raspi-config)."
print_ssrov; echo "Enabling I2C"
sudo raspi-config nonint do_i2c 0 # zero here means "enable"
print_ssrov; echo "Enabling SPI"
sudo raspi-config nonint do_spi 0 #  zero here means "enable"
print_ssrov; echo "Enabling Serial"
sudo raspi-config nonint do_serial 0 # zero here means "enable"
print_ssrov; echo "Enabling SSH"
sudo raspi-config nonint do_ssh 0 # zero here means "enable"
print_ssrov; echo "Enabling Camera"
sudo raspi-config nonint do_camera 0 # zero here means "enable"
print_ssrov; echo "Enabling VNC remote desktop"
sudo raspi-config nonint do_vnc 0 # zero here means "enable"
print_ssrov; echo "Setting the pi to automatically login and boot to the desktop (can also be set manually by running sudo raspi-config then, go to System, then Auto Boot / Login."
sudo raspi-config nonint do_boot_behaviour B4
print_ssrov; echo "Setting the pi GPU Memory amount to 256mb (can also be set manually by running sudo raspi-config then, go to Performance, then GPU Memory."
sudo raspi-config nonint do_memory_split 256

# From: https://raspberrypi.stackexchange.com/a/66939
# check if ssl key or certificate files don't exists, if so, generate them.
# if [ ! -e "$HOME/webserver_ssl_cert/selfsign.key" ] || [ ! -e "$HOME/webserver_ssl_cert/selfsign.crt" ]; then
# 	print_ssrov; echo "Creating self-signed ssl certificate for web server... you can type . for all of these"
# 	mkdir "$HOME/webserver_ssl_cert"
# 	openssl genrsa -out "$HOME/webserver_ssl_cert/selfsign.key" 2048 && openssl req -new -x509 -key "$HOME/webserver_ssl_cert/selfsign.key" -out ~/webserver_ssl_cert/selfsign.crt -sha256
# fi

# From: https://www.linux-projects.org/uv4l/installation/
print_ssrov; echo "Adding uv4l repository key to apt"
curl https://www.linux-projects.org/listing/uv4l_repo/lpkey.asc | sudo apt-key add -
# The above command is depricated, the one below should work in the future (see: https://suay.site/?p=526)
curl -s https://www.linux-projects.org/listing/uv4l_repo/lpkey.asc | sudo gpg --no-default-keyring --keyring gnupg-ring:/etc/apt/trusted.gpg.d/uv4l.gpg --import
sudo chmod 644 /etc/apt/trusted.gpg.d/uv4l.gpg
print_ssrov; echo "deb https://www.linux-projects.org/listing/uv4l_repo/raspbian/stretch stretch main" | sudo tee /etc/apt/sources.list.d/uv4l.list

print_ssrov; echo "Making sure all system & package updates are installed..."
sudo apt -y full-upgrade
sudo apt -y dist-upgrade
sudo apt -y update
sudo apt-get -y update && sudo apt-get -y upgrade # https://learn.adafruit.com/circuitpython-on-raspberrypi-linux/installing-circuitpython-on-raspberry-pi

# From: https://www.linux-projects.org/uv4l/installation/
print_ssrov; echo "Installing packages with apt: nginx uv4l uv4l-raspicam uv4l-server uv4l-demos uv4l-raspicam-extras"
sudo apt install -y nginx uv4l-raspicam uv4l-server uv4l-demos uv4l-raspicam-extras

# From: https://www.youtube.com/watch?v=Q-m4i7LFxLA
print_ssrov; echo "Installing packages with apt: usbmuxd ipheth-utils libimobiledevice-utils"
print_ssrov; echo "These packages enable the pi to do usb internet teathering with an iphone..."
sudo apt install usbmuxd ipheth-utils libimobiledevice-utils

print_ssrov; echo "Installing uv4l webrtc plugin with apt (package depending on raspberry pi model)"
# From: https://www.highvoltagecode.com/post/webrtc-on-raspberry-pi-live-hd-video-and-audio-streaming
if(($PI_CPU_MODEL == "BCM2835")); then
	print_ssrov; echo "Pi Zero or similar board detected, installing uv4l-webrtc-armv6"
	sudo apt install -y uv4l-webrtc-armv6
else
	print_ssrov; echo "PI other than PI Zero detected, installing uv4l-webrtc"
	sudo apt install -y uv4l-webrtc
fi

print_ssrov; echo "Downloading and updating Ngrok"
print_ssrov; echo "This download url might break, so if it does just get the latest from https://ngrok.com/download, unzip it and put it in the home folder - might need to mark it as executable with chmod +x too."
cd ~/
curl https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-arm.zip --output ~/ngrok_download.zip
unzip -o ~/ngrok_download.zip
rm ~/ngrok_download.zip
print_ssrov; echo "Marking ngrok as executable with command 'chmod +x ~/ngrok'"
chmod +x ~/ngrok
print_ssrov; echo "Updating ngrok"
~/ngrok update
cd $FOLDER_CONTAINING_THIS_SCRIPT

print_ssrov; echo "Installing python3 pip"
sudo apt install -y python3-pip

# from: https://learn.adafruit.com/circuitpython-on-raspberrypi-linux/installing-circuitpython-on-raspberry-pi
print_ssrov; echo "Downloading Adafruit circuit python"
sudo python3 -m pip install --upgrade setuptools
sudo python3 -m pip install --upgrade adafruit-python-shell

# from: https://learn.adafruit.com/adafruit-dc-and-stepper-motor-hat-for-raspberry-pi/installing-software
print_ssrov; echo "Downloading Adafruit motor controller python libraries..."
sudo python3 -m pip install --upgrade adafruit-circuitpython-motorkit

# from: https://raspberrypi.stackexchange.com/questions/63930/remove-uv4l-software-by-http-linux-project-org-watermark
# https://www.raspberrypi.org/forums/viewtopic.php?t=62364
print_ssrov; echo "enabling built in raspicam driver:"
sudo modprobe bcm2835-v4l2 &&
v4l2-ctl --overlay=0 && # disable preview viewfinder, && catches errors, which this will throw if the raspi camera is in use or missing.

print_ssrov; echo "Replacing config files with ones from our folder and starting services..."
update_config_files; # this function is defined near the begining of this script.
setup_bluetooth_serial; # run the setup_bluetooth_serial function from above

print_ssrov; echo "enabling rov_python_code systemd service..."
sudo systemctl enable rov_python_code.service
print_ssrov; echo "enabling uv4l_raspicam systemd service..."
sudo systemctl enable uv4l_raspicam.service
print_ssrov; echo "enabling nginx systemd service..."
sudo systemctl enable nginx.service
print_ssrov; echo "enabling ngrok.service systemd service..."
sudo systemctl enable ngrok.service
# print_ssrov; echo "enabling pigpiod systemd service..."
# sudo systemctl enable pigpiod.service # <<< We're now using the adafruit motor controller python library which handles gpio, so we don't need pigpio anymore.
# print_ssrov; echo "enabling dnsmasq systemd service..."
# sudo systemctl disable dnsmasq.service # <<<<<<<<<< DISABLED Because we are now using usb teathering, plus might have need to distable regular DHCP to make this work as a router or reciever for phone teathering (Not ideal).

./update_config_files.sh # run the update config files script in this folder.

# ----------------------------------------------------------------------------------------------------------------------
# ----- Bluetooth Serial Setup -----------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------------------------

# enables the bluetooth serial port for the pi
print_ssrov; echo "Enabling Bluetooth..."
sudo raspi-config nonint do_bluetooth 1 &&
sudo raspi-config nonint do_bluetooth_discoverable 1 &&

# TODO: https://raspberrypi.stackexchange.com/questions/50496/automatically-accept-bluetooth-pairings

# check if we haven't already added the PRETTY_HOSTNAME to the machine-info file:
if [ -z $(grep "PRETTY_HOSTNAME=raspberrypi_rov" "/etc/machine-info") ]; then
	# Edit the display name of the RaspberryPi so you can distinguish
	# your unit from others in the Bluetooth device list or console
	print_ssrov; echo "PRETTY_HOSTNAME=raspberrypi_rov" > /etc/machine-info
fi

sudo systemctl enable rfcomm # enable the new rfcomm service
sudo systemctl restart rfcomm # start the rfcomm service

# ----------------------------------------------------------------------------------------------------------------------

# from: https://learn.adafruit.com/circuitpython-on-raspberrypi-linux/installing-circuitpython-on-raspberry-pi
cd ~/ # go to home directory
print_ssrov; echo "Installing Adafruit circuit python (May ask to reboot, say yes)"
wget https://raw.githubusercontent.com/adafruit/Raspberry-Pi-Installer-Scripts/master/raspi-blinka.py
sudo python3 raspi-blinka.py

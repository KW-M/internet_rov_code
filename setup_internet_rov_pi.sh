#!/bin/bash -e

# https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py

PATH_TO_THIS_SCRIPT=$0
FOLDER_CONTAINING_THIS_SCRIPT=${PATH_TO_THIS_SCRIPT%/*}

# these are two handy functions that are used in the main body of this script below:
backup_then_overwrite_file(){
	ORIGINAL_FILE_PATH=$1
	REPLACEMENT_FILE=$2

	# split the path into the folder path and filename for use later:
	ORIGINAL_FILE_NAME=$(basename "$ORIGINAL_FILE_PATH")
	ORIGINAL_FOLDER_PATH=${ORIGINAL_FILE_PATH%/*}

	# make folder to hold backups and ignore errors (the " >& /dev/null" part)
	mkdir -p "$HOME/original_config_file_backups/" >& /dev/null

	if [ -e "$ORIGINAL_FILE_PATH" ] && [ ! -e "$HOME/original_config_file_backups/$ORIGINAL_FILE_NAME" ]; then
		# if the original file (Usually the originally installed file exists AND a backup of that file doesn't exist in original_config_file_backups/, then)
		# then copy the orignal into the original_config_file_backups/ folder
  		echo "Backing up $ORIGINAL_FILE_PATH to $HOME/original_config_file_backups/ ..."
		sudo cp -T "$ORIGINAL_FILE_PATH" "$HOME/original_config_file_backups/$ORIGINAL_FILE_NAME"
	else
		# otherwise the orignal file might not exist?! so make its parent folders and ignore errors (the " >& /dev/null" part)
		mkdir -p "$ORIGINAL_FOLDER_PATH" >& /dev/null
	fi
	echo "Replacing $ORIGINAL_FILE_PATH with $REPLACEMENT_FILE ..."
	sudo cp -f -T "$REPLACEMENT_FILE" "$ORIGINAL_FILE_PATH"
};

# this function gets run every time this script gets run not just on first run:
update_config_files(){
	cd "$FOLDER_CONTAINING_THIS_SCRIPT"

	# echo "Copying over boot config file..."
	# backup_then_overwrite_file "/boot/config.txt" "./new_config_files/boot_config.txt"

	# echo "Copying over boot cmdline file..."
	# backup_then_overwrite_file "/boot/cmdline.txt" "./new_config_files/boot_cmdline.txt"

	# echo "Copying over ngrok config file..."
	# backup_then_overwrite_file "$HOME/.ngrok2/ngrok.yml" "./new_config_files/ngrok.yml"
	echo "Copying over ngrok startup service file..."
	backup_then_overwrite_file "/lib/systemd/system/ngrok.service" "./new_config_files/ngrok.service"

	echo "Copying over rov_python_code startup service file..."
	backup_then_overwrite_file "/lib/systemd/system/rov_python_code.service" "./new_config_files/rov_python_code.service"

	echo "Copying over uv4l startup service file..."
	backup_then_overwrite_file "/etc/systemd/system/uv4l_raspicam.service" "./new_config_files/uv4l_raspicam.service"

	echo "Copying over uv4l-raspicam config file"
	backup_then_overwrite_file "/etc/uv4l/uv4l-raspicam.conf" "./new_config_files/uv4l-raspicam.conf"

	echo "Copying over dnsmasq config file to /etc/dnsmasq.conf"
	backup_then_overwrite_file "/etc/dnsmasq.conf" "./new_config_files/dnsmasq.conf"

	echo "Copying over nginx config file to /etc/nginx.conf"
	backup_then_overwrite_file "/etc/nginx/nginx.conf" "./new_config_files/nginx.conf"

	# enabling and restarting services:

	sudo systemctl daemon-reload

	echo "restarting rov_python_code systemd service..."
	sudo systemctl restart rov_python_code.service
	echo "restarting uv4l_raspicam systemd service..."
	sudo systemctl restart uv4l_raspicam.service	# sudo service uv4l_raspicam restart
	# echo "restarting pigpiod systemd service..."
	# sudo systemctl restart pigpiod.service
	echo "restarting nginx systemd service..."
	sudo systemctl restart nginx.service
	echo "restarting ngrok.service systemd service..."
	sudo systemctl restart ngrok.service
	# echo "restarting dnsmasq systemd service..."
	# sudo systemctl restart dnsmasq.service
	# echo "showing dnsmasq status..."
	#sudo systemctl status ngrok.service

	# The above lines restart systemd "services" running when this rasberry pi boots.
	# for more about these files: https://www.digitalocean.com/community/tutorials/understanding-systemd-units-and-unit-files

	### to stop a service:
	# sudo systemctl stop the_service_name
	### To Stop the service forcefully
	# sudo killall the_service_name
	### to stop a service from launching at raspi boot:
	# sudo systemctl disable the_service_name
	### to start a service launching at raspi boot:
	# sudo systemctl enable the_service_name
	### to check if a service is running and show logs / status:
	# sudo systemctl status the_service_name
};

setup_bluetooth_serial(){
	# enables the bluetooth serial port for the pi
	echo "Enabling bluetooth..."
	sudo raspi-config nonint do_bluetooth 1
	sudo raspi-config nonint do_bluetooth_discoverable 1

	# check if this function hasn't already been run (works bcuz this function creates the file /etc/systemd/system/rfcomm.service):
	if [ ! -e "/etc/systemd/system/rfcomm.service" ]; then
		# Edit the display name of the RaspberryPi so you can distinguish
		# your unit from others in the Bluetooth device list or console
		echo "PRETTY_HOSTNAME=raspberrypi_rov" > /etc/machine-info

		# Alternateive way to change bluetooth.service (uncomment & make sure no indents on multiline below): (Edits file instead of replace) to enable BT services
# 		sudo sed -i: 's|^Exec.*toothd$| \
# ExecStart=/usr/libexec/bluetooth/bluetoothd -C \
# ExecStartPost=/usr/bin/sdptool add SP \
# ExecStartPost=/bin/hciconfig hci0 piscan \
# |g' /lib/systemd/system/bluetooth.service
	fi

	# replace /lib/systemd/system/bluetooth.service with our version to make the pi a discoverable bluetooth device
	echo "Copying over rfcomm startup service file (TO ENABLE BLUETOOTH CONNECTION)..."
	backup_then_overwrite_file "/lib/systemd/system/bluetooth.service" "./new_config_files/bluetooth.service"

	# create /etc/systemd/system/rfcomm.service to enable
	# the Bluetooth serial port from systemctl
	echo "Copying over rfcomm startup service file (TO ENABLE BLUETOOTH SERIAL TERMINAL CONNECTIONS)..."
	backup_then_overwrite_file "/etc/systemd/system/rfcomm.service" "./new_config_files/rfcomm.service"

	# enable the new rfcomm service
	sudo systemctl enable rfcomm

	# start the rfcomm service
	sudo systemctl restart rfcomm
};

# from https://raspberrypi.stackexchange.com/questions/100076/what-revisions-does-cat-proc-cpuinfo-return-on-the-new-pi-4-1-2-4gb
PI_CPU_MODEL=$(cat /proc/cpuinfo | grep 'Hardware' | awk '{print $3}')


SETUP_DONE_MARKER_FILE="$HOME/ssrov-pi-setup-done.txt"
if test -f "$SETUP_DONE_MARKER_FILE"; # check if the file /ssrov-pi-setup-done.txt exists.
then
	echo "$SETUP_DONE_MARKER_FILE exists. Only updating config files. Delete $SETUP_DONE_MARKER_FILE if you want to run the whole script again.";
	update_config_files; # run the update config files function from above
	setup_bluetooth_serial; # run the setup_bluetooth_serial function from above
else
	# ASSUMING THIS IS RUN ON A FRESH PI INSTALL, DO THIS STUFF: (it's fine if below gets run twice or more anyway, it just takes a while)
	echo "!!!!!!!!"
	echo "REMEMEBER to change the pi user password to something other than the default by running the command: sudo passwd pi (just type, characters won't show,  see notes in internet_rov google drive folder for previously used password)"
	echo "!!!!!!!!"

	echo "Setting Timezone and Locale"
	sudo timedatectl set-timezone America/Los_Angeles
	sudo timedatectl set-ntp true
	# https://www.jaredwolff.com/raspberry-pi-setting-your-locale/
	sudo perl -pi -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/g' /etc/locale.gen
	sudo locale-gen en_US.UTF-8
	sudo update-locale en_US.UTF-8

	# From: https://raspberrypi.stackexchange.com/questions/28907/how-could-one-automate-the-raspbian-raspi-config-setup
	echo "Setting the pi to enable ssh functionality.  (can also be set manually by running sudo raspi-config)."
	sudo raspi-config nonint do_ssh 1
	echo "Setting the pi to enable i2c functionality.  (can also be set manually by running sudo raspi-config)."
	sudo raspi-config nonint do_i2c 1
	echo "Setting the pi to enable camera functionality.  (can also be set manually by running sudo raspi-config)."
	sudo raspi-config nonint do_camera 1
	echo "Setting the pi to enable vnc remote desktop functionality.  (can also be set manually by running sudo raspi-config)."
	sudo raspi-config nonint do_vnc 1
	# echo "Setting the pi to automatically login and boot to the desktop (can also be set manually by running sudo raspi-config then, go to System, then Auto Boot / Login."
	# sudo raspi-config nonint do_boot_behaviour B4
	# echo "Setting the pi GPU Memory amount to 256mb (can also be set manually by running sudo raspi-config then, go to Performance, then GPU Memory."
	# sudo raspi-config nonint do_memory_split 256

	# From: https://raspberrypi.stackexchange.com/a/66939
	# check if ssl key or certificate files don't exists, if so, generate them.
	# if [ ! -e "$HOME/webserver_ssl_cert/selfsign.key" ] || [ ! -e "$HOME/webserver_ssl_cert/selfsign.crt" ]; then
	# 	echo "Creating self-signed ssl certificate for web server... you can type . for all of these"
	# 	mkdir "$HOME/webserver_ssl_cert"
	# 	openssl genrsa -out "$HOME/webserver_ssl_cert/selfsign.key" 2048 && openssl req -new -x509 -key "$HOME/webserver_ssl_cert/selfsign.key" -out ~/webserver_ssl_cert/selfsign.crt -sha256
	# fi

	# From: https://www.linux-projects.org/uv4l/installation/
	echo "Adding uv4l repository key to apt"
	curl https://www.linux-projects.org/listing/uv4l_repo/lpkey.asc | sudo apt-key add -
	echo "deb https://www.linux-projects.org/listing/uv4l_repo/raspbian/stretch stretch main" | sudo tee /etc/apt/sources.list.d/uv4l.list

	# From: https://www.linux-projects.org/uv4l/installation/
	echo "Installing packages with apt: dnsmasq nginx uv4l uv4l-raspicam uv4l-server uv4l-demos uv4l-raspicam-extras"
	sudo apt -y update
	sudo apt-get -y update && sudo apt-get -y upgrade  # https://learn.adafruit.com/circuitpython-on-raspberrypi-linux/installing-circuitpython-on-raspberry-pi
	sudo apt install -y dnsmasq nginx uv4l-raspicam uv4l-server uv4l-demos uv4l-raspicam-extras

	# From: https://www.youtube.com/watch?v=Q-m4i7LFxLA
	echo "Installing packages with apt: usbmuxd ipheth-utils libimobiledevice-utils"
	echo "These packages enable the pi to do usb internet teathering with an iphone..."
	sudo apt install usbmuxd ipheth-utils libimobiledevice-utils

	echo "Installing uv4l webrtc plugin with apt (package depending on raspberry pi model)"
	# From: https://www.highvoltagecode.com/post/webrtc-on-raspberry-pi-live-hd-video-and-audio-streaming
	if(($PI_CPU_MODEL == "BCM2835")); then
		echo "Pi Zero or similar board detected, installing uv4l-webrtc-armv6"
		sudo apt install -y uv4l-webrtc-armv6
	else
		echo "PI other than PI Zero detected, installing uv4l-webrtc"
		sudo apt install -y uv4l-webrtc
	fi

	echo "Downloading and updating Ngrok"
	echo "This download url might break, so if it does just get the latest from https://ngrok.com/download, unzip it and put it in the home folder - might need to mark it as executable with chmod +x too."
	curl https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-arm.zip --output ~/ngrok2.zip
	unzip -y ~/ngrok2.zip
	rm ~/ngrok2.zip
	echo "Marking ngrok as executable with command 'chmod +x ~/ngrok'"
	chmod +x ~/ngrok
	echo "Updating ngrok"
	~/ngrok update

	echo "Installing python3 pip"
	sudo apt install -y python3-pip

	echo "Downloading Adafruit circuit python"
	# from: https://learn.adafruit.com/circuitpython-on-raspberrypi-linux/installing-circuitpython-on-raspberry-pi
	sudo python3 -m pip install setuptools
	sudo python3 -m pip install --upgrade adafruit-python-shell

	echo "Downloading Adafruit motor controller python libraries..."
	# from: https://learn.adafruit.com/adafruit-dc-and-stepper-motor-hat-for-raspberry-pi/installing-software
	sudo python3 -m pip install --upgrade adafruit-circuitpython-motorkit

	echo "enabling built in raspicam driver:"
	# from: https://raspberrypi.stackexchange.com/questions/63930/remove-uv4l-software-by-http-linux-project-org-watermark
	# https://www.raspberrypi.org/forums/viewtopic.php?t=62364
	sudo modprobe bcm2835-v4l2
	v4l2-ctl --overlay=0 # disable preview viewfinder

	echo "Replacing config files with ones from folder and starting services..."
	update_config_files; # this function is defined near the begining of this script.

	echo "enabling rov_python_code systemd service..."
    sudo systemctl enable rov_python_code.service
	echo "enabling uv4l_raspicam systemd service..."
    sudo systemctl enable uv4l_raspicam.service
	# echo "enabling pigpiod systemd service..."
	# sudo systemctl enable pigpiod.service
	echo "enabling nginx systemd service..."
	sudo systemctl enable nginx.service
	echo "enabling ngrok.service systemd service..."
	sudo systemctl enable ngrok.service
	echo "enabling dnsmasq systemd service..."
	sudo systemctl disable dnsmasq.service # <<<<<<<<<< DISABLED Because might need to distable regular DHCP to make this work.

	echo "Making ~/webite_static_files folder, please make sure you have the webite static files into that folder"
	mkdir -p "$HOME/website_static_files/" >& /dev/null # make folder and ignore errors (the " >& /dev/null" part)

	echo "Creating setup done file on the desktop as a marker to tell this script it has finished";
	echo "This file lets the setup_internet_rov_pi.sh script know it has finished the main setup, you can delete this file to allow the full script to run again." > $SETUP_DONE_MARKER_FILE;

	# echo "Installing Adafruit circuit python (May ask to reboot, say yes)"
	# from: https://learn.adafruit.com/circuitpython-on-raspberrypi-linux/installing-circuitpython-on-raspberry-pi
	cd ~
	wget https://raw.githubusercontent.com/adafruit/Raspberry-Pi-Installer-Scripts/master/raspi-blinka.py
	sudo python3 raspi-blinka.py
fi

# check to see if the raspi-blinka (circuit python install) script is still here, if so, run it again
if [ -e "$HOME/raspi-blinka.py" ]; then
	cd ~
	# rename the file so it doesn't get run again if setup_internet_rov_pi.sh is run again
	mv "$HOME/raspi-blinka.py" "$HOME/raspi-blinka-step2.py"
	# sudo python3 "$HOME/raspi-blinka-step2.py"
else
   # finally delete the leftover file if it exists
   rm "$HOME/raspi-blinka-step2.py" >& /dev/null
fi
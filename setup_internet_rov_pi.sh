#!/bin/bash

PATH_TO_THIS_SCRIPT=$0
FOLDER_CONTAINING_THIS_SCRIPT=${PATH_TO_THIS_SCRIPT%/*}

# below are two handy functions that are used in the main body of this script below:
backup_and_overwrite_file(){
	ORIGINAL_FILE_PATH=$1
	REPLACEMENT_FILE=$2

	ORIGINAL_FILE_NAME=$(basename "$ORIGINAL_FILE_PATH")
	ORIGINAL_FOLDER_PATH=${ORIGINAL_FILE_PATH%/*}

	mkdir -p "$HOME/Desktop/original_config_file_backups/"

	if [ -e "$ORIGINAL_FILE_PATH" ] && [ ! -e "$HOME/Desktop/original_config_file_backups/$ORIGINAL_FILE_NAME" ]; then
  		echo "Backing up $ORIGINAL_FILE_PATH to $HOME/Desktop/original_config_file_backups/ ..."
		sudo cp -T "$ORIGINAL_FILE_PATH" "$HOME/Desktop/original_config_file_backups/$ORIGINAL_FILE_NAME"
	else
		mkdir -p "$ORIGINAL_FOLDER_PATH"
	fi
	echo "Replacing $ORIGINAL_FILE_PATH with $REPLACEMENT_FILE ..."
	sudo cp -f -T "$REPLACEMENT_FILE" "$ORIGINAL_FILE_PATH"
};

update_config_files(){
	cd "$FOLDER_CONTAINING_THIS_SCRIPT"

	echo "Copying over ngrok config file..."
	backup_and_overwrite_file "$HOME/.ngrok2/ngrok.yml" "./new_config_files/ngrok.yml"
	echo "Copying over ngrok startup service file..."
	backup_and_overwrite_file "/lib/systemd/system/ngrok.service" "./new_config_files/ngrok.service"

	echo "Copying over uv4l-raspicam config file to /etc/uv4l/uv4l-raspicam.conf"
	backup_and_overwrite_file "/etc/uv4l/uv4l-raspicam.conf" "./new_config_files/uv4l-raspicam.conf"
	echo "Copying over uv4l startup service file..."
	backup_and_overwrite_file "/etc/systemd/system/uv4l_raspicam.service" "./new_config_files/uv4l_raspicam.service"

	echo "Copying over dnsmasq config file to /etc/dnsmasq.conf"
	backup_and_overwrite_file "/etc/dnsmasq.conf" "./new_config_files/dnsmasq.conf"
	echo "Copying over nginx config file to /etc/dnsmasq.conf"
	backup_and_overwrite_file "/etc/nginx/nginx.conf" "./new_config_files/nginx.conf"

	echo "enabling uv4l_raspicam systemd service..."
    sudo systemctl enable uv4l_raspicam
	echo "restarting uv4l_raspicam systemd service..."
	sudo systemctl restart uv4l_raspicam	# sudo service uv4l_raspicam restart

	echo "enabling pigpiod systemd service..."
	sudo systemctl enable pigpiod
	echo "restarting pigpiod systemd service..."
	sudo systemctl restart pigpiod

	echo "enabling nginx systemd service..."
	sudo systemctl enable nginx
	echo "restarting nginx systemd service..."
	sudo systemctl restart nginx

	echo "enabling ngrok.service systemd service..."
	sudo systemctl enable ngrok.service
	echo "restarting ngrok.service systemd service..."
	sudo systemctl restart ngrok.service

	echo "enabling dnsmasq systemd service..."
	sudo systemctl disable dnsmasq
	echo "restarting dnsmasq systemd service..."
	sudo systemctl restart dnsmasq
	# echo "showing dnsmasq status..."
	#sudo systemctl status ngrok.service

	# The above lines enable/disable systemd "services" running when this rasberry pi boots.
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


SETUP_DONE_FILE="$HOME/Desktop/ssrov-pi-setup-done.txt"
if test -f "$SETUP_DONE_FILE";
then
	echo "$SETUP_DONE_FILE exists. Only updating config files. Delete $SETUP_DONE_FILE if you want to run the whole script again.";
	update_config_files;
else
	# ASSUMING THIS IS RUN ON A FRESH PI INSTALL, DO THIS STUFF: (it's fine if it gets run twice or more anyway)
	echo "!!!!!!!!"
	echo "REMEMEBER to change the pi user password to something other than the default by running the command: sudo passwd pi (just type, characters won't show,  see ssrov internet_rov google drive folder for previously used password)"
	echo "!!!!!!!!"

	echo "Setting the pi to enable ssh functionality.  (can also be set manually by running sudo raspi-config)."
	sudo raSETUP_DONE_FILEspi-config nonint do_ssh 1
	echo "Setting the pi to enable i2c functionality.  (can also be set manually by running sudo raspi-config)."
	sudo raspi-config nonint do_i2c 1
	echo "Setting the pi to enable camera functionality.  (can also be set manually by running sudo raspi-config)."
	sudo raspi-config nonint do_camera 1
	echo "Setting the pi to automatically login and boot to the desktop (can also be set manually by running sudo raspi-config then, go to System, then Auto Boot / Login."
	sudo raspi-config nonint do_boot_behaviour B4
	echo "Setting the pi GPU Memory amount to 256mb (can also be set manually by running sudo raspi-config then, go to Performance, then GPU Memory."
	sudo raspi-config nonint do_memory_split 256

	# From: https://www.linux-projects.org/uv4l/installation/
	# check if ssl key or certificate files don't exists, if so, generate them.
	if [ ! -e "$HOME/Desktop/webserver_ssl_cert/selfsign.key" ] || [ ! -e "$HOME/Desktop/webserver_ssl_cert/selfsign.crt" ]; then
		echo "Creating self-signed ssl certificate for web server... you can type . for all of these"
		mkdir "$HOME/Desktop/webserver_ssl_cert"
		openssl genrsa -out "$HOME/Desktop/webserver_ssl_cert/selfsign.key" 2048 && openssl req -new -x509 -key "$HOME/Desktop/webserver_ssl_cert/selfsign.key" -out ~/Desktop/webserver_ssl_cert/selfsign.crt -sha256
	fi

	# From: https://www.linux-projects.org/uv4l/installation/
	echo "Adding uv4l repository key to apt"
	curl https://www.linux-projects.org/listing/uv4l_repo/lpkey.asc | sudo apt-key add -
	echo "deb https://www.linux-projects.org/listing/uv4l_repo/raspbian/stretch stretch main" | sudo tee /etc/apt/sources.list.d/uv4l.list

	# From: https://www.linux-projects.org/uv4l/installation/
	echo "Installing packages with apt: dnsmasq nginx uv4l-raspicam uv4l-server uv4l-webrtc uv4l-demos uv4l-raspicam-extras"
	sudo apt update -y
	sudo apt-get update -y
	sudo apt-get upgrade -y # https://learn.adafruit.com/circuitpython-on-raspberrypi-linux/installing-circuitpython-on-raspberry-pi
	sudo apt install -y dnsmasq nginx uv4l uv4l-raspicam uv4l-server uv4l-webrtc uv4l-demos uv4l-raspicam-extras

	echo "Installing nginx Web Server..."
	sudo apt install  -y

	echo "Downloading and updating Ngrok"
	curl https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-arm.zip --output ~/Desktop/ngrok2.zip
	unzip -y ~/Desktop/ngrok2.zip
	rm ~/Desktop/ngrok2.zip
	chmod +x ~/Desktop/ngrok
	echo "updating ngrok"
	~/Desktop/ngrok update

	echo "Downloading Adafruit circuit python"
	# from: https://learn.adafruit.com/circuitpython-on-raspberrypi-linux/installing-circuitpython-on-raspberry-pi
	sudo pip3 install --upgrade setuptools
	sudo pip3 install --upgrade adafruit-python-shell

	echo "Downloading Adafruit motor controller python libraries..."
	# from: https://learn.adafruit.com/adafruit-dc-and-stepper-motor-hat-for-raspberry-pi/installing-software
	sudo pip3 install adafruit-circuitpython-motorkit

	# from: https://raspberrypi.stackexchange.com/questions/63930/remove-uv4l-software-by-http-linux-project-org-watermark
	# https://www.raspberrypi.org/forums/viewtopic.php?t=62364
	echo "enabling built in raspicam driver:"
	sudo modprobe bcm2835-v4l2
	v4l2-ctl --overlay=1 # enable viewfinder

	echo "Replacing config files with ones from folder and starting services..."
	update_config_files # this function is defined near the begining of this script.

	echo "Making Desktop/webite_static_files folder, please make sure you put the webite static files into that folder"
	mkdir -p "$HOME/Desktop/website_static_files/" >& /dev/null

	echo "Creating setup done file on the desktop as a marker to tell this script it has finished";
	echo "This file lets the setup_internet_rov_pi.sh script know it has finished the main setup, you can delete this file to allow the full script to run again." > $SETUP_DONE_FILE;

	echo "Installing Adafruit circuit python (May ask to reboot, say yes)"
	# from: https://learn.adafruit.com/circuitpython-on-raspberrypi-linux/installing-circuitpython-on-raspberry-pi
	cd ~
	wget https://raw.githubusercontent.com/adafruit/Raspberry-Pi-Installer-Scripts/master/raspi-blinka.py
	sudo python3 raspi-blinka.py
fi

# check to see if the raspi-blinka (circuit python install) script is still here, if so, run it again and then delete it
if [ -e "$HOME/raspi-blinka.py" ]; then
	cd ~
	sudo python3 "$HOME/raspi-blinka.py"
	rm "$HOME/raspi-blinka.py"
fi
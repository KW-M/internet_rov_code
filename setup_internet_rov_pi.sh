#!/bin/bash -e

# ------------------------------------------------------------------------------
# ---- Helpful Variables -------------------------------------------------------
# ------------------------------------------------------------------------------

PATH_TO_THIS_SCRIPT=$0
FOLDER_CONTAINING_THIS_SCRIPT=${PATH_TO_THIS_SCRIPT%/*}
cd "$FOLDER_CONTAINING_THIS_SCRIPT"
FOLDER_CONTAINING_THIS_SCRIPT="$(pwd)"

# ----- RPi Model Details ------------------------------------------------------
# from https://raspberrypi.stackexchange.com/questions/100076/what-revisions-does-cat-proc-cpuinfo-return-on-the-new-pi-4-1-2-4gb
# PI_CPU_MODEL=$(cat /proc/cpuinfo | grep 'Hardware' | awk '{print $3}')
PI_CPU_ARCHITECTURE=$(arch)

# ----- terminal text colors ----------------------------------------------------
Green="\033[1;32m"  # Green color code for console text
Cyan="\033[1;36m"   # Cyan color code for console text
Color_Off="\033[0m" # Text color Reset code for console text

# ------------------------------------------------------------------------------

echo -e "$Cyan This scripts sets up a raspberry pi as an internet rov, (ideally from a fresh copy of raspberry pi os)"
echo -e "$Green - It should be fine if this script gets run twice or more."
echo -e "$Green - Make sure the pi has a good power source & internet connection."
echo -e "$Green - It will take ~ 1 hour to run."
read -p "Press [Enter] key to continue (press [Control] + [c] keys to stop the script <- FYI: This works on any terminal command)..."
source ~/.profile || true

# ------------------------------------------------------------------------------
# ---- Configuring System Settings ---------------------------------------------
# ------------------------------------------------------------------------------
echo -e "$Cyan Setting Locale (Language to English US utf8)... $Color_Off"
# https://www.jaredwolff.com/raspberry-pi-setting-your-locale/
# check if the loaded locales contains US english utf-8:
LANGUAGE=en_US.UTF-8
LANG=en_US.UTF-8
LC_ALL=en_US.UTF-8
LC_CTYPE=en_US.UTF-8
if ! locale -a | grep -i -q 'en_US.utf8' && ! locale -a | grep -i -q 'en_US.utf-8'; then
 	echo -e "$Green en_US.utf8 local not generated, loading it now ... $Color_Off"
	sudo perl -pi -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/g' /etc/locale.gen
	sudo perl -pi -e 's/en_GB.UTF-8 UTF-8/# en_GB.UTF-8 UTF-8/g' /etc/locale.gen
	sudo touch /etc/default/locale
	echo "LANG=en_US.UTF-8" | sudo tee /etc/default/locale
	echo "LANGUAGE=en_US.UTF-8" | sudo tee --append /etc/default/locale
	echo "LC_ALL=en_US.UTF-8" | sudo tee --append /etc/default/locale
	echo "LC_CTYPE=en_US.UTF-8" | sudo tee --append /etc/default/locale
	sudo dpkg-reconfigure -f noninteractive locales || true
fi

echo -e "$Cyan Setting Timezone to America/Los_Angeles ... $Color_Off"
sudo rm -f /etc/localtime
echo "America/Los_Angeles" | sudo tee /etc/timezone
sudo dpkg-reconfigure -f noninteractive tzdata || true
sudo timedatectl set-timezone America/Los_Angeles || true
sudo timedatectl set-ntp true || true # enable network time sync

echo -e "$Cyan Setting keyboard layout to US... $Color_Off"
sudo localectl set-keymap us || true
sudo dpkg-reconfigure -f noninteractive keyboard-configuration || true

echo -e "$Cyan Removing the 'setup your raspberrypi' startup popup window wizard $Color_Off"
sudo rm -f /etc/xdg/autostart/piwiz.desktop || true

# From: https://raspberrypi.stackexchange.com/questions/28907/how-could-one-automate-the-raspbian-raspi-config-setup
echo -e "$Cyan Setting the pi to enable different functionality.  (all of these can also be set manually by running sudo raspi-config). $Color_Off"
echo -e "$Green Enabling I2C $Color_Off"
sudo raspi-config nonint do_i2c 0 || true # zero here means "enable"
echo -e "$Green Enabling SPI $Color_Off"
sudo raspi-config nonint do_spi 0 || true #  zero here means "enable"
echo -e "$Green Enabling Serial $Color_Off"
sudo raspi-config nonint do_serial 0 || true # zero here means "enable"
# echo -e "$Green Enabling SSH $Color_Off"
# sudo raspi-config nonint do_ssh 0 || true # zero here means "enable"
echo -e "$Green Enabling Camera $Color_Off"
sudo raspi-config nonint do_camera 0 || true # zero here means "enable"
echo -e "$Green Enabling VNC remote desktop $Color_Off"
sudo raspi-config nonint do_vnc 0  || true # zero here means "enable"
echo -e "$Green Setting the pi to automatically login and boot to the desktop (can also be set manually by running sudo raspi-config then, go to System, then Auto Boot / Login. $Color_Off"
sudo raspi-config nonint do_boot_behaviour B4 || true
echo -e "$Green Setting the pi GPU Memory amount to 128mb (can also be set manually by running sudo raspi-config then, go to Performance, then GPU Memory. $Color_Off"
sudo raspi-config nonint do_memory_split 128  || true

# from: https://raspberrypi.stackexchange.com/questions/63930/remove-uv4l-software-by-http-linux-project-org-watermark
# https://www.raspberrypi.org/forums/viewtopic.php?t=62364
echo -e "$Cyan Enabling built in raspberry pi camera driver: $Color_Off"
sudo modprobe bcm2835-v4l2 || true
v4l2-ctl --overlay=0 || true # disable preview viewfinder,  || true catches errors, which this will throw if the raspi camera is in use or missing.


# --------- Update System Packages ------------
echo -e "$Cyan Making sure all system & package updates are installed... $Color_Off"
sudo apt -y full-upgrade
sudo apt -y dist-upgrade
sudo apt -y update
# sudo apt-get -y update && sudo apt-get -y upgrade # https://learn.adafruit.com/circuitpython-on-raspberrypi-linux/installing-circuitpython-on-raspberry-pi

# ----------------------------------------------------------------------------------------------------------------------
# ----- Boot Config Setup -----------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------------------------

# from: https://learn.adafruit.com/circuitpython-on-raspberrypi-linux/i2c-clock-stretching
if grep "i2c_arm_baudrate" "/boot/config.txt"; then
	echo -e "$Green i2c_arm_baudrate clock streatching already set in /boot/config.txt $Color_Off"
else
	echo -e "$Cyan Enabling I2C clock stretching (slowing down i2c protocol for older sensors) $Color_Off"
	echo -e "$Green Setting i2c_arm_baudrate to 10000 (10khz) in /boot/config.txt $Color_Off"
	sudo bash -c 'echo "i2c_arm_baudrate=10000" >> /boot/config.txt'
fi

# ------ Enable newer graphics driver for better video encoding ------
# https://www.systutorials.com/how-to-delete-a-specific-line-from-a-text-file-in-command-line-on-linux/
sudo sed -i 's|/#dtoverlay=vc4-fkms-v3d|/dtoverlay=vc4-fkms-v3d|g' /boot/config.txt

# ----- Setup Login Message --------------------------------------------------------------------------------------------------
if grep "rov_status_report.sh" ~/.profile; then
	echo -e "$Green rov_status_report already set to run every time a terminal/cmd prompt is opened in ~/.profile $Color_Off"
else
	echo -e "$Cyan Adding command to run rov_status_report.sh whenever a terminal is oppened by adding it to the .profile file $Color_Off"
	# the .profile file is the file that gets run to setup the default terminal/command shell whenever you open a terminal or ssh session
	echo "/bin/bash $FOLDER_CONTAINING_THIS_SCRIPT/rov_status_report.sh" | tee -a ~/.profile
fi


# ----------------------------------------------------------------------------------------------------------------------
# ----- Bluetooth Serial Setup -----------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------------------------

# enables the bluetooth serial port for the pi
echo -e "$Cyan Enabling Bluetooth... $Color_Off"
sudo raspi-config nonint do_bluetooth 0 || true
sudo raspi-config nonint do_bluetooth_discoverable 0 || true

# check if we haven't already added the PRETTY_HOSTNAME to the machine-info file:
if grep -q "PRETTY_HOSTNAME=raspberrypi_rov" "/etc/machine-info"; then
	echo -e "$Green PRETTY_HOSTNAME=raspberrypi_rov already set in /etc/machine-info $Color_Off"
else
	# Edit the display name of the RaspberryPi so you can distinguish
	# your unit from others in the Bluetooth device list or console
	echo -e "$Cyan Setting bluetooth hostname to raspberrypi_rov $Color_Off"
	sudo touch /etc/machine-info
	sudo bash -c 'echo "PRETTY_HOSTNAME=raspberrypi_rov" >> /etc/machine-info'
fi


if grep "bluetoothd --compat" "/lib/systemd/system/bluetooth.service"; then
	# ^checks if we have already added words "bluetoothd --compat" to the bluetooth.service file:
	echo -e "$Green bluetoothd already has the --compat flag $Color_Off"
else
	echo -e "$Cyan Adding bluetoothd --compat flag in /lib/systemd/system/bluetooth.service $Color_Off"
	# Backup bluetooth.service file
	mkdir -p "$HOME/original_config_file_backups"
	sudo cp /lib/systemd/system/bluetooth.service "$HOME/original_config_file_backups/bluetooth.service"
	# add the --compat flag to the bluetooth.service file by find & replace /bluetoothd with /bluetoothd --compat
	sudo sed -i 's|/bluetoothd|/bluetoothd --compat|g' /lib/systemd/system/bluetooth.service
fi

# ------- Setup System Logfile Max size and Trimming Rate -------
if grep "*/30 * * * * /etc/cron.daily/logrotate" /etc/crontab; then
	# ^checks if we have already added words "*/30 * * * * /etc/cron.daily/logrotate" to the /etc/crontab file:
	echo -e "$Green Logrotate already set to trim system log files every 30 minutes in /etc/crontab $Color_Off"
else
	# from: https://stackoverflow.com/questions/20162176/centos-linux-setting-logrotate-to-maximum-file-size-for-all-logs
	echo -e "$Cyan Setting Logrotate to run and trim system log files every 30 minutes in /etc/crontab $Color_Off"
	sudo bash -c 'echo "*/30 * * * * /etc/cron.daily/logrotate" >> /etc/crontab'
	echo "$Green Setting the max size of all system log files to 100kb (times x number of kept log rotations) $Color_Off"
	# add "size 100k" to the end of the file logrotate.conf:
	sudo bash -c 'echo "size 100k" >> /etc/logrotate.conf'
	# also add "size 100k" to the begining of the file logrotate.conf, becuz I'm not sure which side of the included configs takes priority:
	sudo bash -c 'echo -e "size 100k\n$(cat /etc/logrotate.conf)" > /etc/logrotate.conf'
fi

# --------- Setup System Logs to Be stored to a temporary filesystem in ram (tmpfs) ---------
# this is to save the sd card from unneccesary writes, that could kill it.
# from: https://www.zdnet.com/article/raspberry-pi-extending-the-life-of-the-sd-card/
# and: https://durdle.com/2017/01/04/how-not-to-kill-your-pis-sd-card/
if grep "tmpfs /var/log" /etc/fstab; then
	# ^checks if we have already added words "tmpfs   /var/log" to the /etc/fstab file:
	echo -e "$Green Already setup in memory filesystem (tmpfs) for system log file folder /var/log $Color_Off"
else
	echo "$Green Setting up in memory filesystem for system log file folder /var/log $Color_Off"
	sudo bash -c 'echo "tmpfs   /var/log    tmpfs    defaults,noatime,nosuid,mode=0755,size=30m    0 0" >> /etc/fstab'
fi


# ---- Install USB Teathering suport for iPhone (From: https://www.youtube.com/watch?v=Q-m4i7LFxLA)
echo -e "$Cyan Installing packages with apt: usbmuxd ipheth-utils libimobiledevice-utils $Color_Off"
echo -e "$Green These packages enable the pi to do usb internet teathering with an iphone... $Color_Off"
sudo apt install -y usbmuxd ipheth-utils libimobiledevice-utils

# ------- Install Arducam Low Light Cam Driver --------------------------------------------------------------------------------------
# from: https://www.arducam.com/docs/cameras-for-raspberry-pi/pivariety/how-to-install-kernel-driver-for-pivariety-camera/#12-v4l2-pivariety-driver-detection
if ! command -v libcamera-hello &> /dev/null || ! dmesg | grep arducam; then
	pushd ~/
	mkdir arducam_install;
	cd arducam_install;
	echo -e "$Cyan Installing arducam pivariety camera driver $Color_Off"
	wget -O install_pivariety_pkgs.sh https://github.com/ArduCAM/Arducam-Pivariety-V4L2-Driver/releases/download/install_script/install_pivariety_pkgs.sh
	chmod +x install_pivariety_pkgs.sh
	echo "n" | ./install_pivariety_pkgs.sh -p kernel_driver
	./install_pivariety_pkgs.sh -p libcamera_dev
	./install_pivariety_pkgs.sh -p libcamera_apps
	popd
fi

# ---- INSTALL GO Language ----
if grep "GOPATH=" ~/.profile; then
	# ^checks if we have already added words "GOPATH=" to the  ~/.profile file:
	echo -e "$Green Go path already setup in ~/.profile $Color_Off"
else
	pushd ~/
    # https://www.e-tinkers.com/2019/06/better-way-to-install-golang-go-on-raspberry-pi/
    echo -e "$Cyan Installing GO and adding GOPATH to ~/.profile $Color_Off"
    sudo rm -r /usr/local/go || true # remove any old version of go
    sudo apt install -y git wget
    wget https://go.dev/dl/go1.18.linux-armv6l.tar.gz

    sudo tar -C /usr/local -xzf go1.18.linux-armv6l.tar.gz
    rm go1.18.linux-armv6l.tar.gz
    echo 'PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' | sudo tee -a ~/.profile
    echo 'GOPATH=$HOME/golang' | sudo tee -a ~/.profile
	source ~/.profile
	popd
fi

# ---- INSTALL GO WEBRTC-RELAY ----
pushd ~/
rm -rf webrtc-relay || true
git clone https://github.com/kw-m/webrtc-relay.git
cd webrtc-relay
go install .
popd

# ---- DOWNLOAD STATIC ROV FRONTEND WEB PAGE ----
pushd ~/
rm -rf rov-web || true
git clone -b gh-pages --single-branch https://github.com/kw-m/rov-web.git
popd

# clean up any packages that were installed to aid installing anything else, but are no longer needed
sudo apt autoremove -y

# make sure the shell profile is still available to the pi:
source ~/.profile

# ----------------------------------------------------------------------------------------------------------------------

echo -e "$Cyan Running the update_config_files.sh script in this folder. $Color_Off"
cd "$FOLDER_CONTAINING_THIS_SCRIPT"
/bin/bash ./update_config_files.sh # run the update config files script in this folder.

# --------- Setup nginx to log to the file nginx_error.log ---------
sudo apt install -y nginx
# this solves the problem of missing the nginx log folder when the temp filesystem first starts up.
if grep "/var/log/nginx" "/lib/systemd/system/nginx.service"; then
	# ^checks if we have already added words " -e '/var/log/nginx_error.log'" to the nginx.service file:
	echo -e "$Green nginx.service already has the nginx error log folder '/var/log/nginx' already added in /lib/systemd/system/nginx.service$Color_Off"
else
	echo -e "$Cyan Adding nginx error log folder '/var/log/nginx' in /lib/systemd/system/nginx.service $Color_Off"
	# https://stackoverflow.com/questions/148451/how-to-use-sed-to-replace-only-the-first-occurrence-in-a-file
	sudo sed -i '0,/ExecStartPre=/s//ExecStartPre=mkdir -p "\/var\/log\/nginx\/"\nExecStartPre=/' /lib/systemd/system/nginx.service
fi

echo -e "$Cyan Enabling systemd (systemctl) services so they start at boot (or whenever configured too)... $Color_Off"
echo -e "$Green enabling pigpiod.service ... $Color_Off"
sudo systemctl enable pigpiod.service
echo -e "$Green enabling rov_python_code.service ... $Color_Off"
sudo systemctl enable rov_python_code.service # enable the new rov_python_code service
echo -e "$Green enabling rov_go_code.service ... $Color_Off"
sudo systemctl enable rov_go_code.service # enable the new rov_python_code service
echo -e "$Green enabling nginx.service ... $Color_Off"
sudo systemctl restart nginx.service
sudo systemctl enable nginx.service
echo -e "$Green enabling add_fixed_ip.service ... $Color_Off"
sudo systemctl enable add_fixed_ip.service

# --------------------------------------------------------------------------
# ----- Python Library Setup -------------------------------------------------------
# --------------------------------------------------------------------------

echo -e "$Cyan Installing python3 pip $Color_Off"
sudo apt install -y python3-pip
sudo python3 -m pip install --upgrade setuptools

echo -e "$Cyan Installing python packages $Color_Off"
sudo python3 -m pip install -r ./python/requirements.txt


# ---------------- DONE --------------------------------------

echo "YAY! Internet ROV Install Script has Finished Successfully!"

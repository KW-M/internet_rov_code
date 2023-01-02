#!/bin/sh
set -e # exit on error
set -x # echo all commands

# ------------------------------------------------------------------------------
# ---- Configuring System Settings ---------------------------------------------
# ------------------------------------------------------------------------------
# echo -e "$Cyan Setting Locale (Language to English US utf8)... $Color_Off"
# https://www.jaredwolff.com/raspberry-pi-setting-your-locale/
# check if the loaded locales contains US english utf-8:
# LANGUAGE=en_US.UTF-8
# LANG=en_US.UTF-8
# LC_ALL=en_US.UTF-8
# LC_CTYPE=en_US.UTF-8
# if ! locale -a | grep -i -q 'en_US.utf8' && ! locale -a | grep -i -q 'en_US.utf-8'; then
#  	echo -e "$Green en_US.utf8 local not generated, loading it now ... $Color_Off"
# 	sudo perl -pi -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/g' /etc/locale.gen
# 	sudo perl -pi -e 's/en_GB.UTF-8 UTF-8/# en_GB.UTF-8 UTF-8/g' /etc/locale.gen
# 	sudo touch /etc/default/locale
# 	echo "LANG=en_US.UTF-8" | sudo tee /etc/default/locale
# 	echo "LANGUAGE=en_US.UTF-8" | sudo tee --append /etc/default/locale
# 	echo "LC_ALL=en_US.UTF-8" | sudo tee --append /etc/default/locale
# 	echo "LC_CTYPE=en_US.UTF-8" | sudo tee --append /etc/default/locale
# 	sudo dpkg-reconfigure -f noninteractive locales || true
# fi

echo -e "$Cyan Setting Timezone to America/Los_Angeles ... $Color_Off"
sudo rm -f /etc/localtime || true
echo "America/Los_Angeles" | sudo tee /etc/timezone || true
sudo dpkg-reconfigure -f noninteractive tzdata || true
sudo timedatectl set-timezone America/Los_Angeles || true
sudo timedatectl set-ntp true || true # enable network time sync

echo -e "$Cyan Removing the 'setup your raspberrypi' startup popup window wizard $Color_Off"
sudo rm -f /etc/xdg/autostart/piwiz.desktop || true

# From: https://raspberrypi.stackexchange.com/questions/28907/how-could-one-automate-the-raspbian-raspi-config-setup
echo -e "$Cyan Setting the pi to enable different functionality.  (all of these can also be set manually by running sudo raspi-config). $Color_Off"
echo -e "$Green Enabling I2C $Color_Off"
sudo raspi-config nonint do_i2c 0 || true # 0 here means "enable"
echo -e "$Green Enabling SPI $Color_Off"
sudo raspi-config nonint do_spi 0 || true #  0 here means "enable"
echo -e "$Green Enabling Serial $Color_Off"
sudo raspi-config nonint do_serial 0 || true # 0 here means "enable"
echo -e "$Green Enabling SSH $Color_Off"
sudo raspi-config nonint do_ssh 0 || true # 0 here means "enable"
echo -e "$Green Enabling Camera $Color_Off"
sudo raspi-config nonint do_camera 0 || true # zero here means "enable"
echo -e "$Green Disabling VNC remote desktop $Color_Off"
sudo raspi-config nonint do_vnc 1  || true # 1 here means "disable"
# echo -e "$Green Setting the pi to automatically login and boot to the desktop (can also be set manually by running sudo raspi-config then, go to System, then Auto Boot / Login. $Color_Off"
# sudo raspi-config nonint do_boot_behaviour B4 || true
# echo -e "$Green Setting the pi GPU Memory amount to 128mb (can also be set manually by running sudo raspi-config then, go to Performance, then GPU Memory. $Color_Off"
# sudo raspi-config nonint do_memory_split 128  || true
# echo -e "$Cyan Disabling Bluetooth... $Color_Off"
# sudo raspi-config nonint do_bluetooth 1 || true
# sudo raspi-config nonint do_bluetooth_discoverable 1 || true

# # from: https://raspberrypi.stackexchange.com/questions/63930/remove-uv4l-software-by-http-linux-project-org-watermark
# # https://www.raspberrypi.org/forums/viewtopic.php?t=62364
# echo -e "$Cyan Enabling built in raspberry pi camera driver: $Color_Off"
# sudo modprobe bcm2835-v4l2 || true
# v4l2-ctl --overlay=0 || true # disable preview viewfinder,  || true catches errors, which this will throw if the raspi camera is in use or missing.

# ----------------------------------------------------------------------------------------------------------------------
# ----- Boot Config Setup -----------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------------------------

# from: https://learn.adafruit.com/circuitpython-on-raspberrypi-linux/i2c-clock-stretching
# if grep "i2c_arm_baudrate" "/boot/config.txt"; then
# 	echo -e "$Green i2c_arm_baudrate clock streatching already set in /boot/config.txt $Color_Off"
# else
# 	echo -e "$Cyan Enabling I2C clock stretching (slowing down i2c protocol for older sensors) $Color_Off"
# 	echo -e "$Green Adding i2c_arm_baudrate=10000 (10khz) to /boot/config.txt $Color_Off"
# 	echo "i2c_arm_baudrate=10000" | sudo tee -a /boot/config.txt
# fi

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

# make sure the shell profile is now available to the pi:
source ~/.profile || true

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
	echo "size 100k" | sudo tee -a /etc/logrotate.conf'
	# also add "size 100k" to the begining of the file logrotate.conf, becuz I'm not sure which side of the included configs takes priority:
	echo -e "size 100k\n$(cat /etc/logrotate.conf)" | sudo tee /etc/logrotate.conf
fi



# --------- Setup System Logs to Be stored to a temporary filesystem in ram (tmpfs) ---------
# this is to save the sd card from unneccesary writes, that could kill it.
# from: https://www.zdnet.com/article/raspberry-pi-extending-the-life-of-the-sd-card/
# and: https://durdle.com/2017/01/04/how-not-to-kill-your-pis-sd-card/
# if grep "tmpfs /var/log" /etc/fstab; then
# 	# ^checks if we have already added words "tmpfs   /var/log" to the /etc/fstab file:
# 	echo -e "$Green Already setup in memory filesystem (tmpfs) for system log file folder /var/log $Color_Off"
# else
# 	echo "$Green Setting up in memory filesystem for system log file folder /var/log $Color_Off"
# 	sudo bash -c 'echo "tmpfs   /var/log    tmpfs    defaults,noatime,nosuid,mode=0755,size=30m    0 0" >> /etc/fstab'
# fi

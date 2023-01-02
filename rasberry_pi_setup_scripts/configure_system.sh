#!/bin/bash
set -e # exit on error
set -u # exit on undefined variable

# ------------------------------------------------------------------------------
# ---- Helpful Variables -------------------------------------------------------
# ------------------------------------------------------------------------------

PATH_TO_THIS_SCRIPT=$0
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
# ---- Configuring System Settings ---------------------------------------------
# ------------------------------------------------------------------------------

# echoGreen  "Setting Locale (Language to English US utf8)... "
# # https://www.jaredwolff.com/raspberry-pi-setting-your-locale/
# LANGUAGE=en_US.UTF-8
# LANG=en_US.UTF-8
# LC_ALL=en_US.UTF-8
# LC_CTYPE=en_US.UTF-8
# # check if the loaded locales contains US english utf-8:
# if ! locale -a | grep -i -q 'en_US.utf8' && ! locale -a | grep -i -q 'en_US.utf-8'; then
#  	echoBlue  "en_US.utf8 local not generated, loading it now ... "
# 	exe "sudo perl -pi -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/g' /etc/locale.gen"
# 	exe "sudo perl -pi -e 's/en_GB.UTF-8 UTF-8/# en_GB.UTF-8 UTF-8/g' /etc/locale.gen"
# 	exe "sudo touch /etc/default/locale"
# 	exe "echo 'LANG=en_US.UTF-8' | sudo tee /etc/default/locale"
# 	exe "echo 'LANGUAGE=en_US.UTF-8' | sudo tee --append /etc/default/locale"
# 	exe "echo 'LC_ALL=en_US.UTF-8' | sudo tee --append /etc/default/locale"
# 	exe "echo 'LC_CTYPE=en_US.UTF-8' | sudo tee --append /etc/default/locale"
# 	exe "sudo dpkg-reconfigure -f noninteractive locales" || true
# fi

echoGreen  "Setting Timezone to America/Los_Angeles ... "
exe "sudo rm -f /etc/localtime" || true
exe "echo 'America/Los_Angeles' | sudo tee /etc/timezone" || true
exe "sudo dpkg-reconfigure -f noninteractive tzdata" || true
exe "sudo timedatectl set-timezone America/Los_Angeles" || true
exe "sudo timedatectl set-ntp true" || true # enable network time sync

echoGreen  "Removing the 'setup your raspberrypi' startup popup window wizard "
exe "sudo rm -f /etc/xdg/autostart/piwiz.desktop" || true

# From: https://raspberrypi.stackexchange.com/questions/28907/how-could-one-automate-the-raspbian-raspi-config-setup
echoGreen  "Setting the pi to enable different functionality.  (all of these can also be set manually by running sudo raspi-config). "
echoBlue  "Enabling I2C "
exe "sudo raspi-config nonint do_i2c 0" || true # 0 here means "enable"
echoBlue  "Enabling SPI "
exe "sudo raspi-config nonint do_spi 0" || true #  0 here means "enable"
echoBlue  "Enabling Serial "
exe "sudo raspi-config nonint do_serial 0" || true # 0 here means "enable"
echoBlue  "Enabling SSH "
exe "sudo raspi-config nonint do_ssh 0"|| true # 0 here means "enable"
echoBlue  "Enabling Camera "
exe "sudo raspi-config nonint do_camera 0" || true # zero here means "enable"
echoBlue  "Disabling VNC remote desktop "
exe "sudo raspi-config nonint do_vnc 1"  || true # 1 here means "disable"
# echoBlue  "Setting the pi to automatically login and boot to the desktop (can also be set manually by running sudo raspi-config then, go to System, then Auto Boot / Login. "
# exe "sudo raspi-config nonint do_boot_behaviour B4" || true
# echoBlue  "Setting the pi GPU Memory amount to 128mb (can also be set manually by running sudo raspi-config then, go to Performance, then GPU Memory. "
# exe "sudo raspi-config nonint do_memory_split 128"  || true
# echoGreen  "Disabling Bluetooth... "
# exe "sudo raspi-config nonint do_bluetooth 1" || true
# exe "sudo raspi-config nonint do_bluetooth_discoverable 1" || true

# # from: https://raspberrypi.stackexchange.com/questions/63930/remove-uv4l-software-by-http-linux-project-org-watermark
# # https://www.raspberrypi.org/forums/viewtopic.php?t=62364
# echoGreen  "Enabling built in raspberry pi camera driver: "
# exe "sudo modprobe bcm2835-v4l2" || true
# exe "v4l2-ctl --overlay=0" || true # disable preview viewfinder,  || true catches errors, which this will throw if the raspi camera is in use or missing.

# ----------------------------------------------------------------------------------------------------------------------
# ----- Boot Config Setup -----------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------------------------

# from: https://learn.adafruit.com/circuitpython-on-raspberrypi-linux/i2c-clock-stretching
if grep "i2c_arm_baudrate" "/boot/config.txt"; then
	echoGreen "Enabling I2C clock stretching (slowing down i2c protocol for older sensors) "
	echoBlue  "Adding i2c_arm_baudrate=10000 (10khz) to /boot/config.txt "
	echo "i2c_arm_baudrate=10000" | sudo tee -a /boot/config.txt
fi

# ------ Enable newer graphics driver for better video encoding ------
# https://www.systutorials.com/how-to-delete-a-specific-line-from-a-text-file-in-command-line-on-linux/
echoGreen "Enable newer graphics driver for better video encoding"
exe "sudo sed -i 's|/#dtoverlay=vc4-fkms-v3d|/dtoverlay=vc4-fkms-v3d|g' /boot/config.txt"

# ----- Setup Login Message --------------------------------------------------------------------------------------------------
if ! grep "rov_status_report.sh" ~/.profile; then
	echoGreen "Adding command to run rov_status_report.sh whenever a terminal is oppened by adding it to the .profile file "
	# the .profile file is the file that gets run to setup the default terminal/command shell whenever you open a terminal or ssh session
	exe "echo 'bash $FOLDER_CONTAINING_THIS_SCRIPT/rov_status_report.sh' | tee -a ~/.profile" || true
fi

# make sure the shell profile is now available to the pi:
exe "source ~/.profile" || true

# ------- Setup System Logfile Max size and Trimming Rate -------
# Check if we have already added words "*/30 * * * * /etc/cron.daily/logrotate" to the /etc/crontab file:
CHRON_ROTATE_LINE="*/30 * * * * /etc/cron.daily/logrotate"
if ! grep "$CHRON_ROTATE_LINE" /etc/crontab; then
	# from: https://stackoverflow.com/questions/20162176/centos-linux-setting-logrotate-to-maximum-file-size-for-all-logs
	echoGreen  "Setting Logrotate to run and trim system log files every 30 minutes in /etc/crontab "
	exe "echo '$CHRON_ROTATE_LINE' | sudo tee -a /etc/crontab"
	echoGreen "Setting the max size of all system log files to 100kb (times x number of kept log rotations)"
	exe "echo 'size 100k' | sudo tee -a /etc/logrotate.conf"
	# also add "size 100k" to the begining of the file logrotate.conf, becuz I'm not sure which side of the included configs takes priority:
	exe "echo 'size 100k' | cat - /etc/logrotate.conf | sudo tee /etc/logrotate.conf"
	# echo 'size 100k\n$(cat /etc/logrotate.conf)' | sudo tee /etc/logrotate.conf
fi

# --------- Setup System Logs to Be stored to a temporary filesystem in ram (tmpfs) ---------
# this is to save the sd card from unneccesary writes, that could kill it.
# from: https://www.zdnet.com/article/raspberry-pi-extending-the-life-of-the-sd-card/
# and: https://durdle.com/2017/01/04/how-not-to-kill-your-pis-sd-card/
if ! grep "tmpfs /var/log" /etc/fstab; then
	echoGreen "Setting up in memory filesystem for system log file folder /var/log"
	exe "echo 'tmpfs /var/log    tmpfs    defaults,noatime,nosuid,mode=0755,size=30m    0 0' | sudo tee -a /etc/fstab"
fi

# -------------------- Done ------------------------

echoBlue "configure_system.sh Done"

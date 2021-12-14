#!/bin/bash -e

PATH_TO_THIS_SCRIPT=$0
FOLDER_CONTAINING_THIS_SCRIPT=${PATH_TO_THIS_SCRIPT%/*}
cd "$FOLDER_CONTAINING_THIS_SCRIPT"

# This function is used in the main body of this script:
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

rm ~/raspi-blinka.py && # clean up the adafruit circuitpython installer script if it's still around.

# echo "Copying over boot config file..."
# backup_then_overwrite_file "/boot/config.txt" "./new_config_files/boot_config.txt"

# echo "Copying over boot cmdline file..."
# backup_then_overwrite_file "/boot/cmdline.txt" "./new_config_files/boot_cmdline.txt"

# echo "Copying over ngrok config file..." # < no longer needed
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

# replace /lib/systemd/system/bluetooth.service with our version to make the pi a discoverable bluetooth device
echo "Copying over rfcomm startup service file (TO ENABLE BLUETOOTH CONNECTION)..."
backup_then_overwrite_file "/lib/systemd/system/bluetooth.service" "./new_config_files/bluetooth.service"

# create /etc/systemd/system/rfcomm.service to enable the Bluetooth serial port / serial termial
echo "Copying over rfcomm startup service file (TO ENABLE BLUETOOTH SERIAL TERMINAL CONNECTIONS)..."
backup_then_overwrite_file "/etc/systemd/system/rfcomm.service" "./new_config_files/rfcomm.service"


echo "Restarting Services..."

# daemon-reload makes the system load any new/changed services in the /lib/systemd/system/ directory
sudo systemctl daemon-reload

echo "restarting rov_python_code.service systemd service..."
sudo systemctl restart rov_python_code.service
echo "restarting uv4l_raspicam.service systemd service..."
sudo systemctl restart uv4l_raspicam.service	# sudo service uv4l_raspicam restart
# echo "restarting pigpiod systemd service..."
# sudo systemctl restart pigpiod.service
echo "restarting nginx.service systemd service..."
sudo systemctl restart nginx.service
echo "restarting ngrok.service systemd service..."
sudo systemctl restart ngrok.service
echo "restarting bluetooth.service systemd service..."
sudo systemctl restart bluetooth.service
echo "restarting rfcomm.service systemd service..."
sudo systemctl restart rfcomm.service
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

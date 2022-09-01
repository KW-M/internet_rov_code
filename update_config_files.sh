#!/bin/bash -e

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

# This function is used in the main body of this script:
was_file_recently_modified(){
    # https://stackoverflow.com/questions/28337961/find-out-if-file-has-been-modified-within-the-last-2-minutes
	# Input file
	FILE=$1
	# How many seconds before file is deemed "older"
	OLDTIME=$2
	# Get current and file times
	CURTIME=$(date +%s)
	FILETIME=$(stat $FILE -c %Y)
	TIMEDIFF=$(expr $CURTIME - $FILETIME)

	# Check if file older
	if [ $TIMEDIFF -lt $OLDTIME ]; then
		# 0 = true
		return 0
	else
		# 1 = false
		return 1
	fi
}

# --------------------------------------------
# ------------ Main Script Body -------------
# --------------------------------------------

PATH_TO_THIS_SCRIPT=$0
FOLDER_CONTAINING_THIS_SCRIPT=${PATH_TO_THIS_SCRIPT%/*}

echo "Pulling any changes to the rov static web page from github"
pushd ~/rov-web
git restore .
git checkout gh-pages
git pull --rebase
popd

echo "Pulling any updates to webrtc-relay from github"
pushd ~/webrtc-relay
git restore .
git pull --rebase
if was_file_recently_modified ./ 60; then
	echo "Installing webrtc-relay"
	/usr/local/go/bin/go install .
fi
popd

# pull
echo "Pulling any changes to the rov backend from github"
pushd "$FOLDER_CONTAINING_THIS_SCRIPT"
git restore .
git pull --rebase

if was_file_recently_modified ./python/requirements.txt 60; then
	echo "Installing python dependencies"
	# install python dependencies
	python3 -m pip install -r ./python/requirements.txt
fi

# cp rov-config.json ~/
if [ ! -e "$HOME/rov-config.json" ]; then
	echo "Copying over rov-config.json file..."
	backup_then_overwrite_file "$HOME/rov-config.json" "./new_config_files/rov-config.json"
fi;

if was_file_recently_modified ./new_config_files/ 60; then

	echo "Copying over rov_go_code startup service file..."
	backup_then_overwrite_file "/lib/systemd/system/rov_go_code.service" "./new_config_files/rov_go_code.service"

	echo "Copying over rov_python_code startup service file..."
	backup_then_overwrite_file "/lib/systemd/system/rov_python_code.service" "./new_config_files/rov_python_code.service"

	# echo "Copying over uv4l startup service file..."
	# backup_then_overwrite_file "/etc/systemd/system/uv4l_raspicam.service" "./new_config_files/uv4l_raspicam.service"

	# echo "Copying over uv4l-raspicam config file"
	# backup_then_overwrite_file "/etc/uv4l/uv4l-raspicam.conf" "./new_config_files/uv4l-raspicam.conf"

	echo "Copying over nginx config file to /etc/nginx.conf"
	backup_then_overwrite_file "/etc/nginx/nginx.conf" "./new_config_files/nginx.conf"

	echo "Copying over add_fixed_ip.service startup service file..."
	backup_then_overwrite_file "/etc/systemd/system/add_fixed_ip.service" "./new_config_files/add_fixed_ip.service"

	# echo "Copying over rov_bluetooth_terminal startup service file (TO ENABLE BLUETOOTH SERIAL TERMINAL CONNECTIONS)..."
	# backup_then_overwrite_file "/etc/systemd/system/rov_bluetooth_terminal.service" "./new_config_files/rov_bluetooth_terminal.service"

fi

#-----------------------------------------------------------------------------------------------------------------------

echo ""
echo "Restarting systemd (systemctl) Services..."

# daemon-reload makes the system load any new/changed services in the /lib/systemd/system/ directory
sudo systemctl daemon-reload

echo "Restarting pigpiod.service..."
sudo systemctl restart pigpiod
echo "restarting rov_go_code.service..."
sudo systemctl restart rov_go_code.service
echo "restarting rov_python_code.service..."
sudo systemctl restart rov_python_code.service

# echo "restarting uv4l_raspicam.service..."
# sudo systemctl restart uv4l_raspicam.service	# sudo service uv4l_raspicam restart
# echo "restarting ngrok.service..."
# sudo systemctl restart ngrok.service
# echo "restarting bluetooth.service..."
# sudo systemctl restart bluetooth.service
# echo "restarting rov_bluetooth_terminal.service..."
# sudo systemctl restart rov_bluetooth_terminal.service
echo "restarting add_fixed_ip.service..."
sudo systemctl restart add_fixed_ip.service
echo "restarting nginx.service..."
sudo systemctl restart nginx.service

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

popd

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

# This function is used in the main body of this script:
backupThenOverwrite(){
	REPLACEMENT_FILE=$1
	ORIGINAL_FILE_PATH=$2
	ORIGINAL_FILE_NAME=$(basename "$ORIGINAL_FILE_PATH")
	ORIGINAL_FOLDER_PATH=${ORIGINAL_FILE_PATH%/*}

	# make folder to hold backups
	mkdir -p "$HOME/original_config_file_backups/"
	# Copy the original file into the backups folder
	if [ -e "$ORIGINAL_FILE_PATH" ] && [ ! -e "$HOME/original_config_file_backups/$ORIGINAL_FILE_NAME" ]; then
	   # if the original file (Usually the originally installed file exists AND a backup of that file doesn't exist in original_config_file_backups/, then)
	  exe "sudo cp '$ORIGINAL_FILE_PATH' '$HOME/original_config_file_backups/'" || true;
	fi;
	# copy the replacement file into the original file's location
	exe "sudo mkdir -p '$ORIGINAL_FOLDER_PATH' && sudo cp -T '$REPLACEMENT_FILE' '$ORIGINAL_FILE_PATH'" || true
};

# --------------------------------------------
# ------------ Main Script Body -------------
# --------------------------------------------

echo "Pulling any changes to the rov static web page from github"
exe "cd ~/rov-web"
exe "git stash --all" # stash any changes to the web page before overwriting them
exe "git checkout gh-pages"
exe "git pull --rebase"

echoBlue "Pulling any updates to webrtc-relay from github"
exe "cd ~/webrtc-relay"
exe "git stash --all" # stash any changes to the web page before overwriting them
changes=$(git pull --rebase)
echoBlue "changes: $changes"
if ! echo "$changes" | grep "Already up to date"; then
	echoBlue "Installing webrtc-relay"
	go install .
fi

# ------------------------------------------------------------------------------

echoBlue "Pulling any changes to the rov backend from github"
exe "cd '$FOLDER_CONTAINING_THIS_SCRIPT'"
exe "cd ../"
exe "git stash --all" # stash any changes to the web page before overwriting them
changes=$(git pull --rebase)
echoBlue "changes: $changes"

# Check if the requirements.txt file has been modified recently, if so, install the python dependencies:
if echo "$changes" | grep "requirements.txt"; then
	echoBlue "Installing python dependencies"
	exe "python3 -m pip install -r python/requirements.txt"
fi

# Check if the cython_modules folder has been modified recently, if so, recompile the cython modules:
if echo "$changes" | grep "cython_modules"; then
	echoBlue "Compiling cython modules"
	exe "python3 python/cython_modules/setup.py build_ext --inplace"
fi

# ------------------------------------------------------------------------------

exe "cd '$FOLDER_CONTAINING_THIS_SCRIPT/new_config_files'"

# Check if the rov-config.json file exists, if not copy it over from the new_config_files folder:
if [ ! -e "$HOME/rov-config.json" ]; then
	echo "Copying over rov-config.json file..."
	backupThenOverwrite "$FOLDER_CONTAINING_THIS_SCRIPT/new_config_files/rov-config.json" "$HOME/rov-config.json"
fi;

echoBlue "Copying over rov_go_code startup service file..."
backupThenOverwrite "rov_go_code.service" "/lib/systemd/system/rov_go_code.service"

echoBlue "Copying over rov_python_code startup service file..."
backupThenOverwrite "rov_python_code.service" "/lib/systemd/system/rov_python_code.service"

echoBlue "Copying over nginx config file to /etc/nginx.conf"
backupThenOverwrite "nginx.conf" "/etc/nginx/nginx.conf"

echoBlue "Copying over add_fixed_ip.service startup service file..."
backupThenOverwrite "add_fixed_ip.service" "/etc/systemd/system/add_fixed_ip.service"

#-----------------------------------------------------------------------------------------------------------------------

echoBlue "Restarting systemd (systemctl) Services..."
# daemon-reload makes the system load any new/changed services in the /lib/systemd/system/ directory
exe "sudo systemctl daemon-reload"
exe "sudo systemctl restart pigpiod.service"
exe "sudo systemctl restart rov_go_code.service"
exe "sudo systemctl restart rov_python_code.service"
exe "sudo systemctl restart add_fixed_ip.service"
exe "sudo systemctl restart nginx.service"

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

# -------------------- Done ------------------------

echoBlue "fetch_changes.sh Done"

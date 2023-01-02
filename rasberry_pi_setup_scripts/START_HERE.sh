#!/bin/sh
set -e # exit on error
set -u # exit on undefined variable
set -x # echo all commands

# ----- terminal text colors ----------------------------------------------------
Green="\033[1;32m"  # Green color code for console text
Cyan="\033[1;36m"   # Cyan color code for console text
Red="\033[1;31m"    # Red color code for console text
Color_Off="\033[0m" # Text color Reset code for console text
# ------------------------------------------------------------------------------

echo -e "$Cyan This script sets up a Raspberry Pi as an Internet ROV"
echo -e "$Green - Should ideally be run on a fresh copy of Raspberry Pi OS (Buster or later)"
echo -e "$Green - It should be fine if this script gets run twice or more."
echo -e "$Green - Make sure the pi has a good power source & internet connection."
echo -e "$Green - It will take ~ 1 hour to run."
read -p "Press [Enter] key to continue (press [Control] + [c] keys to force stop the script <- FYI: This works on any terminal command)..."
source ~/.profile || true

# ------------------------------------------------------------------------------
# ---- Helpful Variables -------------------------------------------------------
# ------------------------------------------------------------------------------

PATH_TO_THIS_SCRIPT=$0
FOLDER_CONTAINING_THIS_SCRIPT=${PATH_TO_THIS_SCRIPT%/*}
cd "$FOLDER_CONTAINING_THIS_SCRIPT"
FOLDER_CONTAINING_THIS_SCRIPT="$(pwd)"

# ----- RPi Model Details ------------------------------------------------------
# from https://raspberrypi.stackexchange.com/questions/100076/what-revisions-does-cat-proc-cpuinfo-return-on-the-new-pi-4-1-2-4gb
PI_CPU_MODEL=$(cat /proc/cpuinfo | grep 'Hardware' | awk '{print $3}')
PI_CPU_ARCHITECTURE=$(arch)



# ---------------- DONE --------------------------------------

echo "YAY! Internet ROV Install Script has Finished Successfully! :D"
echo "Rebooting the Raspberry Pi is probably a good idea now."
echo "Type 'sudo reboot' to reboot the Raspberry Pi."

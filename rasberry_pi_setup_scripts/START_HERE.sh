#!/bin/bash
set -e # exit on error
set -u # exit on undefined variable

echo "This script sets up a Raspberry Pi as an Internet ROV"
echo " - Should ideally be run on a fresh copy of Raspberry Pi OS (Buster or later)"
echo " - It *should* be fine if this script gets run twice or more."
echo " - Make sure the pi has a good power source & internet connection."
echo " - It will take around 1 hour to run."
echo " - press [Control] + [c] keys to force stop the script <- FYI: This works on any terminal command..."
echo ">>>> Press [Enter] key to continue <<<<"
read STUFF_THE_USER_TYPED

# ------------------------------------------------------------------------------
# ---- Helpful Variables -------------------------------------------------------
# ------------------------------------------------------------------------------

PATH_TO_THIS_SCRIPT=$(readlink -f -- $0)
FOLDER_CONTAINING_THIS_SCRIPT=${PATH_TO_THIS_SCRIPT%/*}

# ------------------------------------------------------------------------------

echo "Making sure any changes in ~/.profile file are available to this shell script by runing 'source ~/.profile' ..."
source ~/.profile || true

echo "Running install_pkgs.sh ..."
bash "$FOLDER_CONTAINING_THIS_SCRIPT/install_pkgs.sh" || true

echo "Running configure_system.sh ..."
bash "$FOLDER_CONTAINING_THIS_SCRIPT/configure_system.sh" || true

# ---------------- DONE --------------------------------------

echo "YAY! Internet ROV Install Script has Finished Successfully! :D"
echo "Rebooting the Raspberry Pi is probably a good idea now."
echo "Type 'sudo reboot' to reboot the Raspberry Pi."

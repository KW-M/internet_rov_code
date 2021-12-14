#!/bin/sh

# script will add custom text to the login message that shows when you open an ssh / terminal / bluetooth serial terminal
# From: https://raspberrypi.stackexchange.com/questions/73681/raspberry-pi-custom-ssh-normal-login-message

echo "Welcome to the ROV!"

# from: https://stackoverflow.com/questions/8529181/which-terminal-command-to-get-just-ip-address-and-nothing-else
echo "The ROV's IP addresses are:"
hostname --all-ip-addresses | sed 's/ /\n/g'
echo ""

echo "Wifi status is: "
rfkill list wlan
echo "Run 'rfkill unblock wlan' to enable wifi or 'rfkill block wlan' to disable wifi"
echo ""

echo "Bluetooth is: "
rfkill list bluetooth







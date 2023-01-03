###### WARNING:
# ######
# ######
# This file is Not Used anymore.
# It is kept here for reference for manually compiling the c++ code in this folder.
# All the c++ code is now compiled using the setup.py file found at the root of the python folder.
# ######
 ######


#!/bin/bash
PATH_TO_THIS_SCRIPT=$0
FOLDER_CONTAINING_THIS_SCRIPT=${PATH_TO_THIS_SCRIPT%/*}

# change directory into the arduino_cpp directory
pushd "$FOLDER_CONTAINING_THIS_SCRIPT";
shopt -s globstar
# Install libpiduino if it's not already installed
PKG_OK=$(dpkg-query -W --showformat='${Status}\n' libpiduino-dev|grep "install ok installed")
if [ "" = "$PKG_OK" ]; then
    echo "libpiduino-dev not found. Installing..."
    wget -c --timeout=10 --waitretry=4 --tries=5 https://github.com/NVSL/PiDuino_Library/releases/download/1.0.0/libpiduino1_1.0-1_armhf.deb
    wget -c --timeout=10 --waitretry=4 --tries=5 https://github.com/NVSL/PiDuino_Library/releases/download/1.0.0/libpiduino-dev_1.0-1_armhf.deb
    sudo dpkg -i libpiduino1_1.0-1_armhf.deb
    sudo dpkg -i libpiduino-dev_1.0-1_armhf.deb

    sudo apt install -y autotools-dev
    sudo apt install -y autoconf
    sudo apt install -y libtool
fi


# compile the arduino code
g++ -c ./libraries/arduPi/arduPi.cpp -o ./libraries/arduPi/arduPi.o
# g++ -lrt -I./libraries -I./libraries/arduino -pthread main.cpp ./libraries/arduPi/arduPi.o -o arduino_program
g++ test.cpp ./libraries/*.cpp -I./libraries -I./libraries/arduino -pthread -lm -o test
g++ Example1_Basics.cpp ./libraries/**/*.cpp ./libraries/**/*.c -I./libraries -pthread -lm -fpermissive -o test
g++ Fused_Compass.cpp ./libraries/**/*.cpp ./libraries/**/*.c -I./libraries -pthread -lm -fpermissive -o test

# change directory back to what it was previously
popd;

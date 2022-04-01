#!/bin/bash


PATH_TO_THIS_SCRIPT=$0
FOLDER_CONTAINING_THIS_SCRIPT=${PATH_TO_THIS_SCRIPT%/*}

# change directory into the arduino_cpp directory
pushd "$FOLDER_CONTAINING_THIS_SCRIPT";

pwd;

# compile the arduino code
g++ -c ./libraries/arduPi/arduPi.cpp -o ./libraries/arduPi/arduPi.o
g++ -lrt -lpthread main.cpp ./libraries/arduPi/arduPi.o -o arduino_program

# change directory back to what it was previously
popd;

cd ./arduPi
g++ -c arduPi.cpp -o arduPi.o
g++ -lrt -lpthread MY_PROGRAM.cpp arduPi.o -o arduino_program
# Taken from:
# https://stackoverflow.com/questions/45364877/interpreting-keypresses-sent-to-raspberry-pi-through-uv4l-webrtc-datachannel
# based on:
# https://raspberrypigpi.stackexchange.com/questions/29480/how-to-use-pigpio-to-control-a-servo-motor-with-a-keyboard
# public domain

import socket
import time
# import pigpio
import os

socket_path = '/tmp/uv4l.socket'

try:
    os.unlink(socket_path)
except OSError:
    if os.path.exists(socket_path):
        raise

s = socket.socket(socket.AF_UNIX, socket.SOCK_SEQPACKET)

ROLL_PIN = 13
PITCH_PIN = 14
YAW_PIN = 15

MIN_PW = 1000
MID_PW = 1500
MAX_PW = 2000

NONE = 0
LEFT_ARROW = 1
RIGHT_ARROW = 2
UP_ARROW = 3
DOWN_ARROW = 4
LESS_BTN = 5
GREATER_BTN = 6

print('socket_path: %s' % socket_path)
s.bind(socket_path)
s.listen(1)


def driveMotor(pigpi, in1_pin, in2_pin, speed):
    """ for the adafruit drv8871 motor controlers
    in1_pin: the pin going to in1 on the motor controller
    in2_pin: the pin going to in2 on the motor controller
    speed: the speed of the motor between -1 (full reverse) and 1 (full forward)
    """
    # https://abyz.me.uk/rpi/pigpio/python.html#set_PWM_dutycycle
    print(pigpi.get_PWM_frequency(in1_pin))
    print(pigpi.get_PWM_frequency(in2_pin))
    if (speed > 0):
        pigpi.write(in1_pin, 1)
        pigpi.set_PWM_dutycycle(in2_pin, speed * 255)  # PWM off
    elif (speed < 0):
        pigpi.set_PWM_dutycycle(in1_pin, speed * -255)  # PWM off
        pigpi.write(in2_pin, 1)
    else:
        pigpi.write(in1_pin, 0)  # PWM off
        pigpi.write(in2_pin, 0)  # PWM off


def getch(keyCode):
    key = NONE
    if keyCode == 188:
        key = LESS_BTN
    elif keyCode == 190:
        key = GREATER_BTN
    elif keyCode == 37:
        key = LEFT_ARROW
    elif keyCode == 39:
        key = RIGHT_ARROW
    elif keyCode == 38:
        key = UP_ARROW
    elif keyCode == 40:
        key = DOWN_ARROW
    return key


# def cleanup():
#     # pigpi.set_servo_pulsewidth(ROLL_PIN, 0)
#     # pigpi.set_servo_pulsewidth(PITCH_PIN, 0)
#     # pigpi.set_servo_pulsewidth(YAW_PIN, 0)
#     # pigpi.stop()

while True:
    print('awaiting connection...')
    connection, client_address = s.accept()
    print('client_address %s' % client_address)
    try:
        print('established connection with', client_address)

        # pi = pigpio.pi()

        rollPulsewidth = MID_PW
        pitchPulsewidth = MID_PW
        yawPulsewidth = MID_PW

        # pigpi.set_servo_pulsewidth(ROLL_PIN, rollPulsewidth)
        # pigpi.set_servo_pulsewidth(PITCH_PIN, pitchPulsewidth)
        # pigpi.set_servo_pulsewidth(YAW_PIN, yawPulsewidth)

        while True:
            data = connection.recv(16)
            print('received message"%s"' % data)

            time.sleep(0.01)
            # key = getch(int(data))

            # rollPW     = rollPulsewidth
            # pitchPW    = pitchPulsewidth
            # yawPW      = yawPulsewidth

            # if key == UP_ARROW:
            #     pitchPW = pitchPW + 10
            #     if pitchPW > MAX_PW:
            #         pitchPW = MAX_PW
            # elif key == DOWN_ARROW:
            #     pitchPW = pitchPW - 10
            #     if pitchPW < MIN_PW:
            #         pitchPW = MIN_PW
            # elif key == LEFT_ARROW:
            #     rollPW = rollPW - 10
            #     if rollPW < MIN_PW:
            #         rollPW = MIN_PW
            # elif key == RIGHT_ARROW:
            #     rollPW = rollPW + 10
            #     if rollPW > MAX_PW:
            #         rollPW = MAX_PW
            # elif key == GREATER_BTN:
            #     yawPW = yawPW + 10
            #     if yawPW > MAX_PW:
            #         yawPW = MAX_PW
            # elif key == LESS_BTN:
            #     yawPW = yawPW - 10
            #     if yawPW < MIN_PW:
            #         yawPW = MIN_PW

            # if rollPW != rollPulsewidth:
            #     rollPulsewidth = rollPW
            #     # pigpi.set_servo_pulsewidth(ROLL_PIN, rollPulsewidth)
            # if pitchPW != pitchPulsewidth:
            #     pitchPulsewidth = pitchPW
            #     # pigpi.set_servo_pulsewidth(PITCH_PIN, pitchPulsewidth)
            # if yawPW != yawPulsewidth:
            #     yawPulsewidth = yawPW
            #     # pigpi.set_servo_pulsewidth(YAW_PIN, yawPulsewidth)

            if data:
                print('echo data to client')
                connection.sendall(data)
            else:
                print('no more data from', client_address)
                break

    finally:
        # Clean up the connection
        # cleanup()
        connection.close()

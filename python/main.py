# Taken from:
# https://stackoverflow.com/questions/45364877/interpreting-keypresses-sent-to-raspberry-pi-through-uv4l-webrtc-datachannel
# based on:
# https://raspberrypigpi.stackexchange.com/questions/29480/how-to-use-pigpio-to-control-a-servo-motor-with-a-keyboard
# public domain

import os
import time
import json
import socket
import pigpio
import board
from adafruit_motorkit import MotorKit

############################################
############### Motor / GPIO Stuff #################

# initilize the library for adafruit I2C 4 motor controller pi hat:
kit = MotorKit(i2c=board.I2C())

# initilize pigpio and get a reference to it
pi = pigpio.pi()

### ---- GPIO Pinouts ------

FORWARD_RIGHT_MOTOR = kit.motor1
# Forward Right Motor Pin constants (unused - only applicable for the single motor pwm controllers)
# FR_in1_pin = 27
# FR_in2_pin = 13

FORWARD_LEFT_MOTOR = kit.motor2
# Forward Left Motor Pin constants (unused - only applicable for the single motor pwm controllers)
# FL_in1_pin = 27
# FL_in2_pin = 13

STRAFING_MOTOR = kit.motor4
# Strafing (crabwalk) Motor Pin constants (unused - only applicable for the single motor pwm controllers)
# S_in1_pin = 27
# S_in2_pin = 13

VERTICAL_MOTOR = kit.motor4
# Vertical Motor Pin constants (unused - only applicable for the single motor pwm controllers)
# V_in1_pin = 27
# V_in2_pin = 13

### -----------------------


def drivePwmMotor(in1_pin, in2_pin, speed):
    """ for the adafruit drv8871 motor controlers
    in1_pin: the pin going to in1 on the motor controller
    in2_pin: the pin going to in2 on the motor controller
    speed: the speed of the motor between -1 (full reverse) and 1 (full forward)
    """
    # https://abyz.me.uk/rpi/pigpio/python.html#set_PWM_dutycycle
    # pi is an instance of pigpio.pi()
    if (speed > 0):
        pi.write(in1_pin, 0)  # for real motor conrol these should be 1 not 0
        pi.set_PWM_dutycycle(
            in2_pin,
            speed * 254)  # 254 because 255 means breaking mode on the drv8871
    elif (speed < 0):
        pi.set_PWM_dutycycle(
            in1_pin,
            speed * -254)  # negative 254 to cancel out negative speed value
        pi.write(in2_pin, 0)  # for real motor conroll these should be 1 not 0
    else:
        pi.write(in1_pin, 0)  # PWM off
        pi.write(in2_pin, 0)  # PWM off


def stop_gpio_and_motors():
    FORWARD_LEFT_MOTOR.throttle = 0
    FORWARD_RIGHT_MOTOR.throttle = 0
    VERTICAL_MOTOR.throttle = 0
    STRAFING_MOTOR.throttle = 0
    # pi.write(FL_in1_pin, 0)
    # pi.write(FL_in2_pin, 0)
    # pi.write(FR_in1_pin, 0)
    # pi.write(FR_in2_pin, 0)
    # pi.write(V_in1_pin, 0)
    # pi.write(V_in2_pin, 0)
    # pi.write(S_in1_pin, 0)
    # pi.write(S_in2_pin, 0)


def cleanup_gpio():
    """ Function to stop all motors and shut down the current pigpio.pi() instance. useful when turning off / exiting the rov program"""
    pi.stop()


##################################################
############  Socket Connection Stuff ############

socket_path = '/tmp/uv4l.socket'

try:
    os.unlink(socket_path)
except OSError:
    if os.path.exists(socket_path):
        raise

s = socket.socket(socket.AF_UNIX, socket.SOCK_SEQPACKET)

print('socket_path: {}'.format(socket_path))
s.bind(socket_path)
s.listen(1)

current_motor_state = {
    'left': 0,
    'right': 0,
    'vertical': 0,
    'strafe': 0,
}

current_sensor_state = {
    'pressure': 0,
    'light': 0,
    'yaw': 0,
    'roll': 0,
    'pitch': 0,
}

######## Main Program Loop ###########
while True:
    print('awaiting connection...')
    stop_gpio_and_motors(
    )  # Keeps motors off while disconnected or if it becomes disconnected
    connection, client_address = s.accept()
    print('client_address {}'.format(client_address))
    try:
        print('established connection with', client_address)

        while True:
            data = connection.recv(
                1024
            )  # wait for a message up to 1024 bytes long to appear in the uvl4 socket file.
            print('received message"{}"'.format(str(data)))

            time.sleep(0.01)

            updated_values = json.loads(
                data)  # parse the message data as a JSON formatted string.
            print(updated_values)
            if 'motors' in updated_values:
                for key in updated_values['motors']:
                    value = updated_values['motors'][key]
                    print("Got motor update:{}is{}".format(key, value))
                    if key == 'left':
                        FORWARD_LEFT_MOTOR.throttle = value
                        # driveMotor(FL_in1_pin, FL_in2_pin, value)
                    elif key == 'right':
                        FORWARD_RIGHT_MOTOR.throttle = value
                        # driveMotor(FR_in1_pin, FR_in2_pin, value)
                    elif key == 'vertical':
                        VERTICAL_MOTOR.throttle = value
                        # driveMotor(V_in1_pin, V_in2_pin, value)
                    elif key == 'strafe':
                        STRAFING_MOTOR.throttle = value
                        # driveMotor(S_in1_pin, S_in2_pin, value)

            elif 'cmds' in updated_values:
                for key in updated_values:
                    value = updated_values[key]
                    print("Got command update: {} is {}".format(key, value))
                    if key is 'lights':
                        pass  # todo

#             else:
# #                 connection.sendall(bytes(json.dumps({
#                         'error':
#                         "Got invalid message. 'msgtype' must be specified as either 'motor' or 'cmd' in every message"
#                     })))

            if data:
                print('echo data back to client')
                connection.sendall(data)
            else:
                print('no more data from', client_address)
                break

    except Exception as e:
        print(e)
        try:
            connection.sendall(json.dumps({'error': e}))
        except:
            pass
    finally:
        # Clean up the connection
        stop_gpio_and_motors()
        connection.close()

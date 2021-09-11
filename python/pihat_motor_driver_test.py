""" Simple test for using adafruit_motorkit with a DC motor
https://learn.adafruit.com/adafruit-dc-and-stepper-motor-hat-for-raspberry-pi/using-dc-motors
"""

import time
import board
from adafruit_motorkit import MotorKit

kit = MotorKit(i2c=board.I2C())

while (True):
    kit.motor1.throttle = 1.0
    time.sleep(0.5)
    kit.motor1.throttle = 0
    time.sleep(2)
    kit.motor1.throttle = .2
    time.sleep(0.5)
    kit.motor1.throttle = 0
    time.sleep(2)
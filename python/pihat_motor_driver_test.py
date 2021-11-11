""" Simple test for using adafruit_motorkit with a DC motor
https://learn.adafruit.com/adafruit-dc-and-stepper-motor-hat-for-raspberry-pi/using-dc-motors
"""

import time
import board
from adafruit_motorkit import MotorKit

kit = MotorKit(i2c=board.I2C())

while (True):
    for i in range(50):
        kit.motor4.throttle = (i-25) / 50
        kit.motor3.throttle = (i-25) / 50
        kit.motor2.throttle = (i-25) / 50
        kit.motor1.throttle = (i-25) / 50
        time.sleep(0.1)
    kit.motor1.throttle = 0
    kit.motor2.throttle = 0
    kit.motor3.throttle = 0
    kit.motor4.throttle = 0
    print("0, sleeping for 2...")
    time.sleep(2)
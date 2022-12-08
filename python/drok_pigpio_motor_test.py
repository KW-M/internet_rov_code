import logging
from random import random
import select
import time
import pigpio
from motion.drok_pwm_motor_controller import Drok_Pwm_Motor
import asyncio
import sys
import os

### -----------------------

###### setup logging #######
log = logging.getLogger(__name__)

RAMP_STEPS = 40
max_speed = 0
# --- initilize pigpio and get a reference to it
pi_gpio = pigpio.pi()
if not pi_gpio.connected:
    log.error("pigpio not connected")
    sys.exit(1)

### -----------------------


async def get_input():
    global max_speed
    direction = "+"
    while True:
        char = ""
        if select.select([
                sys.stdin,
        ], [], [], 0.01)[0]:
            print("Press Enter + to raise the brightness, Enter - to lower, Enter 0 to turn off...")
            char = sys.stdin.read(1)
        else:
            await asyncio.sleep(0)
            continue

        if (char == '0'):
            max_speed = 0
            continue

        if (char == '-'):
            direction = "-"
        elif char == '+':
            direction = "+"

        if (direction == '-'):
            max_speed -= 1 / RAMP_STEPS
        elif direction == '+':
            max_speed += 1 / RAMP_STEPS

        print(f'motors at max: {max_speed}')
        await asyncio.sleep(0)


async def random_motors():
    global max_speed, FORWARD_RIGHT_MOTOR, UP_RIGHT_MOTOR, FORWARD_LEFT_MOTOR, UP_LEFT_MOTOR
    async_loop = asyncio.get_event_loop()

    # Motor Controller 1A (forward right)
    #Top Red Motor Controller; plug closer to controller power input (left)
    FORWARD_RIGHT_MOTOR = Drok_Pwm_Motor(pi_gpio, pin_ena=18, pin_in1=27, pin_in2=22, async_loop=async_loop)

    # Motor Controller 1B (up right)
    UP_RIGHT_MOTOR = Drok_Pwm_Motor(pi_gpio, pin_ena=23, pin_in1=24, pin_in2=25, async_loop=async_loop)

    # Motor Controller 2A (forward right)
    FORWARD_LEFT_MOTOR = Drok_Pwm_Motor(pi_gpio, pin_ena=5, pin_in1=6, pin_in2=12, async_loop=async_loop)

    # Motor Controller 2B (up left)
    UP_LEFT_MOTOR = Drok_Pwm_Motor(pi_gpio, pin_ena=13, pin_in1=16, pin_in2=19, async_loop=async_loop)

    FORWARD_RIGHT_MOTOR.set_paired_motor_ctrlr(UP_RIGHT_MOTOR)
    UP_RIGHT_MOTOR.set_paired_motor_ctrlr(FORWARD_RIGHT_MOTOR)
    FORWARD_LEFT_MOTOR.set_paired_motor_ctrlr(UP_LEFT_MOTOR)
    UP_LEFT_MOTOR.set_paired_motor_ctrlr(FORWARD_LEFT_MOTOR)

    with open("/home/pi/internet_rov_code/motor_log.csv", "w+") as f:
        flipFlop = True
        while True:
            max_speed = 1
            m1 = (random() * 2 - 1) * max_speed
            m2 = (random() * 2 - 1) * max_speed
            m3 = (random() * 2 - 1) * max_speed
            m4 = (random() * 2 - 1) * max_speed

            if flipFlop:
                m1 = 0
                m2 = 0
                m3 = 0
                m4 = 0
            else:
                await asyncio.sleep(6)
            flipFlop = not flipFlop

            line = "%5.2f, %5.2f, %5.2f, %5.2f\n" % (m1, m2, m3, m4)
            sys.stdout.write(line)
            sys.stdout.flush()

            f.write(line)
            f.flush()
            os.sync()

            await asyncio.sleep(0.5)
            sys.stdout.flush()
            os.sync()
            await asyncio.sleep(0.5)
            os.sync()

            # update the rov motion
            FORWARD_RIGHT_MOTOR.set_speed(m1)
            UP_RIGHT_MOTOR.set_speed(m2)
            FORWARD_LEFT_MOTOR.set_speed(m3)
            UP_LEFT_MOTOR.set_speed(m4)


def motorRamp(motor):
    for i in range(-RAMP_STEPS, RAMP_STEPS):
        print(f'Speed: {(i / RAMP_STEPS) * 100}%')
        motor.set_speed(i / RAMP_STEPS / 4)
        time.sleep(.5)
        motor.set_speed(0)
        time.sleep(1)


async def main():
    await asyncio.gather(get_input(), random_motors())


try:
    asyncio.run(main())
except KeyboardInterrupt:
    FORWARD_RIGHT_MOTOR.set_speed(0)
    UP_RIGHT_MOTOR.set_speed(0)
    FORWARD_LEFT_MOTOR.set_speed(0)
    UP_LEFT_MOTOR.set_speed(0)
finally:
    pi_gpio.stop()

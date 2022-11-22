import logging
from random import random
import select
import time
import pigpio
from python.motion.drok_pwm_motor_controller import Drok_Pwm_Motor
import asyncio
import sys

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


async def main():
    await asyncio.wait([get_input(), random_motors()])


async def get_input():
    direction = "+"
    while True:
        print(
            "Press Enter + to raise the brightness, Enter - to lower, Enter 0 to turn off..."
        )
        char = ""
        if select.select([
                sys.stdin,
        ], [], [], 0.1)[0]:
            char = sys.stdin.next()
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
    async_loop = asyncio.get_event_loop()

    # Motor Controller 1A (forward right)
    #Top Red Motor Controller; plug closer to controller power input (left)
    FORWARD_RIGHT_MOTOR = Drok_Pwm_Motor(pi_gpio,
                                         pin_ena=18,
                                         pin_in1=27,
                                         pin_in2=22,
                                         async_loop=async_loop)

    # Motor Controller 1B (up right)
    UP_RIGHT_MOTOR = Drok_Pwm_Motor(pi_gpio,
                                    pin_ena=23,
                                    pin_in1=24,
                                    pin_in2=25,
                                    async_loop=async_loop)

    # Motor Controller 2A (forward right)
    FORWARD_LEFT_MOTOR = Drok_Pwm_Motor(pi_gpio,
                                        pin_ena=5,
                                        pin_in1=6,
                                        pin_in2=12,
                                        async_loop=async_loop)

    # Motor Controller 2B (up left)
    UP_LEFT_MOTOR = Drok_Pwm_Motor(pi_gpio,
                                   pin_ena=13,
                                   pin_in1=16,
                                   pin_in2=19,
                                   async_loop=async_loop)

    while True:
        FORWARD_RIGHT_MOTOR.set_speed((random() * 2 - 1) * max_speed)
        UP_RIGHT_MOTOR.set_speed((random() * 2 - 1) * max_speed)
        FORWARD_LEFT_MOTOR.set_speed((random() * 2 - 1) * max_speed)
        UP_LEFT_MOTOR.set_speed((random() * 2 - 1) * max_speed)
        await asyncio.sleep(0.1)


def motorRamp(motor):
    for i in range(-RAMP_STEPS, RAMP_STEPS):
        print(f'Speed: {(i / RAMP_STEPS) * 100}%')
        motor.set_speed(i / RAMP_STEPS / 4)
        time.sleep(.5)
        motor.set_speed(0)
        time.sleep(1)


try:
    asyncio.run(main())
except KeyboardInterrupt:
    pass
finally:
    pi_gpio.stop()

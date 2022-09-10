import asyncio
import logging
import time
import pigpio

###### setup logging #######
log = logging.getLogger(__name__)


class Drok_Pwm_Motor:
    """ For the Drok 7A dual DC motor driver (Product SKU: 200206)
    pigpio_instance: the pigpio library instance to use to drive the pwm / gpio signals from the pi
    pin_ena: the raspberry pi pin going to the ENA1 pin on the motor driver (ENA2 if driving the second motor)
    pin_in1: the raspberry pi pin going to IN1 pin on the motor controller (IN3 if driving the second motor)
    pin_in2: the raspberry pi pin going to IN2 pin on the motor controller (IN4 if driving the second motor)
    """

    # pylint: disable=too-many-arguments
    def __init__(self,
                 pigpio_instance,
                 pin_ena,
                 pin_in1,
                 pin_in2,
                 async_loop=None):
        self.pigpio_instance = pigpio_instance
        self.pin_ena = pin_ena
        self.pin_in1 = pin_in1
        self.pin_in2 = pin_in2
        self.pigpio_instance.set_mode(self.pin_ena, pigpio.OUTPUT)
        self.pigpio_instance.set_mode(self.pin_in1, pigpio.OUTPUT)
        self.pigpio_instance.set_mode(self.pin_in2, pigpio.OUTPUT)
        # Halt pwm / motor (breaking mode)
        self.pigpio_instance.set_PWM_dutycycle(self.pin_ena, 0)
        self.pigpio_instance.write(self.pin_in1, 0)  # pin LOW (off)
        self.pigpio_instance.write(self.pin_in2, 0)  # pin LOW (off)
        print(
            f'PWM Freq: pin_ena = {pigpio_instance.get_PWM_frequency(self.pin_ena)}'
        )

        if async_loop is not None:
            self.ascync_loop = async_loop
        else:
            self.ascync_loop = asyncio.get_event_loop()

        self.desired_speed = 0
        self.last_speed = 0
        self.time_of_last_speed_change = time.time()
        self.speedchange_callback_timer = None

    def set_speed(self, speed):
        """
        speed: the speed of the motor between 1 (full forward) and -1 (full reverse)
        """
        # https://abyz.me.uk/rpi/pigpio/python.html#set_PWM_dutycycle

        # check if desired speed and current speed are of different sign indicating different rotation directions
        dirChanged = speed * self.last_speed < 0

        if dirChanged and self.speedchange_callback_timer is None:
            self.time_of_last_speed_change = time.time()

        if not dirChanged and self.speedchange_callback_timer is not None:
            self.speedchange_callback_timer.cancel()
            self.speedchange_callback_timer = None

        self.desired_speed = speed
        self.drive_motor()

    def speedchange_callback(self):
        self.speedchange_callback_timer = None
        self.drive_motor()

    def drive_motor(self):
        """
        drives the motor based on the current desired speed
        """

        speed = self.desired_speed
        # check if desired speed and current speed are of different sign
        if (self.desired_speed * self.last_speed < 0
                and time.time() - self.time_of_last_speed_change < 0.1):
            # if so, we need to break for 0.1 seconds before changing the direction of the motor
            speed = 0
            if self.speedchange_callback_timer is None:
                self.speedchange_callback_timer = self.ascync_loop.call_later(
                    0.1, self.speedchange_callback)
        else:
            self.last_speed = self.desired_speed

        if (speed > 0):
            # cap speed at 1 (max)
            speed = min(speed, 1)
            self.pigpio_instance.write(self.pin_in1, 1)  # pin HIGH (on)
            self.pigpio_instance.write(self.pin_in2, 0)  # pin LOW (off)
            self.pigpio_instance.set_PWM_dutycycle(self.pin_ena, speed * 255)
        elif (speed < 0):
            # cap speed and cancel out negative speed value
            speed = min(-speed, 1)
            self.pigpio_instance.write(self.pin_in1, 0)  # pin LOW (off)
            self.pigpio_instance.write(self.pin_in2, 1)  # pin HIGH (on)
            self.pigpio_instance.set_PWM_dutycycle(self.pin_ena, speed * 255)
        else:
            # Halt pwm / motor (breaking mode)
            self.pigpio_instance.write(self.pin_in1, 0)  # pin LOW (off)
            self.pigpio_instance.write(self.pin_in2, 0)  # pin LOW (off)
            self.pigpio_instance.set_PWM_dutycycle(self.pin_ena, 0)

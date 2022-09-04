import logging
import pigpio

###### setup logging #######
log = logging.getLogger(__name__)


class Drok_Pwm_Motor:
    """ For the Drok 7A dual DC motor driver (Product SKU: 200206)
    pin_ena: the raspberry pi pin going to the ENA1 pin on the motor driver (ENA2 if driving the second motor)
    pin_in1: the raspberry pi pin going to IN1 pin on the motor controller (IN3 if driving the second motor)
    pin_in2: the raspberry pi pin going to IN2 pin on the motor controller (IN4 if driving the second motor)
    pigpio_instance: the pigpio library instance to use to drive the pwm / gpio signals from the pi
    """
    def __init__(self, pigpio_instance, pin_ena, pin_in1, pin_in2):
        self.pigpio_instance = pigpio_instance
        self.pin_ena = pin_ena
        self.pin_in1 = pin_in1
        self.pin_in2 = pin_in2
        self.pigpio_instance.set_mode(self.pin_ena, pigpio.OUTPUT)
        self.pigpio_instance.set_mode(self.pin_in1, pigpio.OUTPUT)
        self.pigpio_instance.set_mode(self.pin_in2, pigpio.OUTPUT)
        # Halt pwm / motor (break mode)
        self.pigpio_instance.set_PWM_dutycycle(self.pin_ena, 0)
        self.pigpio_instance.write(self.pin_in1, 0)  # pin LOW (off)
        self.pigpio_instance.write(self.pin_in2, 0)  # pin LOW (off)
        log.debug('PWM Freq: pin_ena = %s',
                  pigpio_instance.get_PWM_frequency(self.pin_ena))

    def set_speed(self, speed):
        """
        speed: the speed of the motor between 1 (full forward) and -1 (full reverse)
        """
        # https://abyz.me.uk/rpi/pigpio/python.html#set_PWM_dutycycle
        if (speed > 0):
            speed = min(speed, 1)  # cap speed at 1 (max)
            self.pigpio_instance.write(self.pin_in1, 1)  # pin HIGH (on)
            self.pigpio_instance.write(self.pin_in2, 0)  # pin LOW (off)
            self.pigpio_instance.set_PWM_dutycycle(self.pin_ena, speed * 255)
        elif (speed < 0):
            speed = min(
                -speed, 1
            )  # minus to cancel out negative speed value and cap speed at 1 (max)
            self.pigpio_instance.write(self.pin_in1, 0)  # pin LOW (off)
            self.pigpio_instance.write(self.pin_in2, 1)  # pin HIGH (on)
            self.pigpio_instance.set_PWM_dutycycle(self.pin_ena, speed * 255)
        else:
            self.pigpio_instance.write(self.pin_in1, 0)  # pin LOW (off)
            self.pigpio_instance.write(self.pin_in2, 0)  # pin LOW (off)
            self.pigpio_instance.set_PWM_dutycycle(self.pin_ena, 0)

import logging
import pigpio

###### setup logging #######
log = logging.getLogger(__name__)


class Adafruit_Pwm_Motor:
    """ for the Adafruit drv8871 single motor controller
    pin_in1: the raspberry pi pin going to in1 pin on the motor controller
    pin_in2: the raspberry pi pin going to in2 pin on the motor controller
    pigpio_instance: the pigpio library instance to use to drive the pwm / gpio signals from the pi
    """
    def __init__(self, pigpio_instance, pin_in1, pin_in2):
        self.pigpio_instance = pigpio_instance
        self.pin_in1 = pin_in1
        self.pin_in2 = pin_in2
        self.pigpio_instance.set_mode(self.pin_in1, pigpio.OUTPUT)
        self.pigpio_instance.set_mode(self.pin_in2, pigpio.OUTPUT)
        # self.pigpio_instance.set_PWM_dutycycle(self.pin_in1, 0) # Halt pwm / motor
        # self.pigpio_instance.set_PWM_dutycycle(self.pin_in2, 0) # Halt pwm / motor

    def set_speed(self, speed):
        """
        speed: the speed of the motor between -1 (full reverse) and 1 (full forward)
        """
        # https://abyz.me.uk/rpi/pigpio/python.html#set_PWM_dutycycle
        if (speed > 0):
            speed = min(speed, 1)  # cap speed at 1 (max)
            self.pigpio_instance.write(self.pin_in1, 0)  # pin LOW (off)
            # for real motor conrol these should be 1 not 0
            # 254 because 255 means breaking mode on the drv8871
            self.pigpio_instance.set_PWM_dutycycle(self.pin_in2, speed * 254)
        elif (speed < 0):
            speed = -speed  # cancel out negative speed value
            speed = min(speed, 1)  # cap speed at 1 (max)
            self.pigpio_instance.set_PWM_dutycycle(self.pin_in1, speed * 254)
            self.pigpio_instance.write(self.pin_in2, 0)  # pin LOW (off)
            # for real motor conroll these should be 1 not 0
        else:
            self.pigpio_instance.write(self.pin_in1, 0)  # pin LOW (off)
            self.pigpio_instance.write(self.pin_in2, 0)  # pin LOW (off)

import logging
import sys
from adafruit_pwm_motor_controller import Adafruit_Pwm_Motor

###### setup logging #######
log = logging.getLogger(__name__)


class Adafruit_Pwm_Light(Adafruit_Pwm_Motor):
    """ for using the Adafruit drv8871 single motor controller as a light dimmer
    pin_in1: the raspberry pi pin going to in1 pin on the motor controller
    pin_in2: the raspberry pi pin going to in2 pin on the motor controller
    pigpio_instance: the pigpio library instance to use to drive the pwm / gpio signals from the pi
    """
    def __init__(self, pigpio_instance, pin_in1, pin_in2):
        super().__init__(pigpio_instance, pin_in1, pin_in2)
        self.pigpio_instance.set_PWM_frequency(self.pin_in1, 1000)
        self.pigpio_instance.set_PWM_frequency(self.pin_in2, 1000)
        print(f'PWM Freq: in1_pin = {pin_in1}, in2_pin = {pin_in2}')

    def set_speed(self, speed):
        # cancel out negative speed value which could fry the light
        speed = abs(speed)
        # cap speed at 1/32 (max)
        speed = min(speed, 1)  # * (1 / 6)
        super().set_speed(speed)

    def set_brightness(self, brightness):
        """
        brightness: the brigtness of the light between 0 (off) and 1 (brightest)
        """
        print(f'light brightness: {brightness}')
        self.set_speed(brightness)


if __name__ == "__main__":
    import pigpio
    import time

    RAMP_STEPS = 24
    try:

        # setup pigpio
        pi = pigpio.pi()
        if not pi.connected:
            log.error("pigpio not connected")
            sys.exit(1)

        # setup light
        light = Adafruit_Pwm_Light(pi, pin_in1=4, pin_in2=17)
        light.set_brightness(0)

        brightness = 0
        direction = "+"
        while True:
            char = input(
                "Press Enter + to raise the brightness, Enter - to lower, Enter 0 to turn off..."
            )
            if (char == '0'):
                brightness = 0
                continue

            if (char == '-'):
                direction = "-"
            elif char == '+':
                direction = "+"

            if (direction == '-'):
                brightness -= 1 / RAMP_STEPS
            elif direction == '+':
                brightness += 1 / RAMP_STEPS

            print(f'light at {brightness}')
            light.set_brightness(brightness)

            # light.set_brightness(1)
            # time.sleep(5)

            # time.sleep(5)
            # light.set_brightness(-1)
            # time.sleep(5)
            # light.set_brightness(0)
            # time.sleep(5)

            # for i in range(0, RAMP_STEPS):
            #     b = 1 / RAMP_STEPS * i
            #     print(f'light at {b}')
            #     light.set_brightness(b)
            #     time.sleep(.1)

    except KeyboardInterrupt:
        pass
    finally:
        pi.stop()

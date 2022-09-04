import logging
import pigpio

###### setup logging #######
log = logging.getLogger(__name__)


class Status_Led_Controller:
    """ for the Adafruit drv8871 single motor controller
    led_pin: the raspberry pi pin going to the + side of the led
    pigpio_instance: the pigpio library instance to use to drive the gpio signals from the pi
    """
    def __init__(self, led_pin, pigpio_instance):
        self.pigpio_instance = pigpio_instance
        self.led_pin = led_pin
        self.pigpio_instance.set_mode(self.led_pin, pigpio.OUTPUT)
        self.pigpio_instance.write(self.led_pin, 0)  # pin LOW (off)

    def on(self):
        self.pigpio_instance.write(self.led_pin, 1)  # pin HIGH (on)

    def off(self):
        self.pigpio_instance.write(self.led_pin, 0)

import asyncio
import logging
import math
import pigpio
#asyncpio

from utilities import *

###### setup logging #######
log = logging.getLogger(__name__)

###################################################
############### Motor / GPIO Stuff ################


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
        print('PWM Freq: pin_ena = {}'.format(
            pigpio_instance.get_PWM_frequency(self.pin_ena)))

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


class Motion_Controller:

    # current_motor_state = {
    #     'left': 0,
    #     'right': 0,
    #     'vertical': 0,
    #     'strafe': 0,
    #     'claw': 0,
    #     # 'lights': 0,
    # }
    async def motor_setup_loop(self):
        self.gpio_issue_flag = asyncio.Event()
        while True:
            self.gpio_issue_flag.clear()
            self.init_motor_controllers()
            log.debug('init_motor_controllers done')
            if self.gpio_issue_flag.is_set():
                log.debug('motor_setup_loop: flag set')
                self.cleanup_gpio()
                await asyncio.sleep(3)
                continue

            log.debug('motor_setup_loop: waiting for gpio_issue_flag')
            # pause this loop until a problem occurs with the gpio (like set motion) which will set this flag.
            await self.gpio_issue_flag.wait()
            self.cleanup_gpio()

    def init_motor_controllers(self):
        # Initilize the library for adafruit I2C 4 motor controller pi hat:
        log.info("Initializing motor controllers...")
        try:
            # initilize pigpio and get a reference to it
            self.pigpio_instance = pigpio.pi()

            # initilize the motor controllers
            # Motor Controller 1A (forward right)
            self.FORWARD_LEFT_MOTOR = Drok_Pwm_Motor(self.pigpio_instance,
                                                     pin_ena=25,
                                                     pin_in1=24,
                                                     pin_in2=23)
            # Motor Controller 1B (forward left)
            self.FORWARD_RIGHT_MOTOR = Drok_Pwm_Motor(self.pigpio_instance,
                                                      pin_ena=21,
                                                      pin_in1=20,
                                                      pin_in2=16)
            # Motor Controller 2A (up right)
            self.UP_RIGHT_MOTOR = Drok_Pwm_Motor(self.pigpio_instance,
                                                 pin_ena=13,
                                                 pin_in1=6,
                                                 pin_in2=5)
            # Motor Controller 2B (up left)
            self.UP_LEFT_MOTOR = Drok_Pwm_Motor(self.pigpio_instance,
                                                pin_ena=22,
                                                pin_in1=27,
                                                pin_in2=17)
            # Motor Controller 5 (claw or lights)
            self.CLAW_MOTOR = Adafruit_Pwm_Motor(self.pigpio_instance,
                                                 pin_in1=19,
                                                 pin_in2=26)

        except Exception as e:
            if type(e) != ValueError:
                log.error("Error Initializing Motor Controllers: ", e)
            self.gpio_issue_flag.set()

    def set_rov_motion(self, thrust_vector=[0, 0, 0], turn_rate=0):
        """
        Function to set the rov velocity based on the vector passed in.
        thrust_vector: a vector of the form [x,y,z] where x is strafe, y is forward, and z is vertical (all components should be between -1 & 1)
        turn_speed: a number between -1 & 1 coresponding to the amount of opposing thrust to apply on the two forward thrusters to turn the ROV at some rate (full clockwise = 1, full counterclokwise = -1).
        """

        if self.gpio_issue_flag.is_set():
            return

        turn_rate = float(turn_rate)  # make sure it's a float
        strafe_amt = float(thrust_vector[0])
        forward_amt = float(thrust_vector[1])
        vertical_amt = float(thrust_vector[2])

        # angle represending the angle of the two vertical thrusters off the vertical in the strafe direction.
        # Format: radians = math.radians(degrees)
        vertical_thrusters_angle = math.radians(45)

        up_left_thrust_amt = -1 * (
            vertical_amt * math.sin(vertical_thrusters_angle) -
            strafe_amt * math.cos(vertical_thrusters_angle))
        up_right_thrust_amt = -1 * (
            vertical_amt * math.sin(vertical_thrusters_angle) +
            strafe_amt * math.cos(vertical_thrusters_angle))
        forward_left_thrust_amt = -forward_amt - turn_rate
        forward_right_thrust_amt = -forward_amt + turn_rate
        # https://www.desmos.com/calculator/64b6jlzsk4

        log.debug(
            "ThrustVec (" + ','.join(str(x) for x in thrust_vector) +
            ") TurnRate " + str(turn_rate),
            " -> Motors " + str(forward_left_thrust_amt),
            str(forward_right_thrust_amt) + str(up_left_thrust_amt),
            str(up_right_thrust_amt))

        try:
            self.UP_LEFT_MOTOR.set_speed(up_left_thrust_amt)
            self.UP_RIGHT_MOTOR.set_speed(up_right_thrust_amt)
            self.FORWARD_LEFT_MOTOR.set_speed(forward_left_thrust_amt)
            self.FORWARD_RIGHT_MOTOR.set_speed(forward_right_thrust_amt)
        except Exception as e:
            log.warning("Error setting motor speed!", exc_info=e)
            self.gpio_issue_flag.set()

    def stop_gpio_and_motors(self):
        try:
            self.FORWARD_LEFT_MOTOR.set_speed(0)
            self.FORWARD_RIGHT_MOTOR.set_speed(0)
            self.UP_RIGHT_MOTOR.set_speed(0)
            self.UP_LEFT_MOTOR.set_speed(0)
            log.info("All Motors now STOPPED.")
        except Exception as e:
            log.warning("Error stopping motors!", e)
            self.gpio_issue_flag.set()

    def cleanup_gpio(self):
        """ Function to shut down the current pigpio.pi() instance. useful when turning off / exiting the rov program"""
        self.stop_gpio_and_motors()
        if self.pigpio_instance:
            self.pigpio_instance.stop()

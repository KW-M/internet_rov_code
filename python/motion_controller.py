import math
import pigpio

from utilities import *

############################################
############### Motor / GPIO Stuff ################


class pwm_motor:
    """ for the adafruit drv8871 single motor controllers
    in1_pin: the raspberry pi pin going to in1 pin on the motor controller
    in2_pin: the raspberry pi pin going to in2 pin on the motor controller
    pigpio_instance: the pigpio instance to use to drive the pwm
    """
    def __init__(self, pigpio_instance, pin_in1, pin_in2):
        self.pigpio_instance = pigpio_instance
        self.pin_in1 = pin_in1
        self.pin_in2 = pin_in2
        self.pigpio_instance.set_mode(self.pin_in1, pigpio.OUTPUT)
        self.pigpio_instance.set_mode(self.pin_in2, pigpio.OUTPUT)
        # self.pigpio_instance.set_PWM_frequency(self.pin_pwm, 500)
        self.pigpio_instance.set_PWM_dutycycle(self.pin_pwm,
                                               0)  # Halt pwm / motor

    def set_speed(self, speed):
        """
        speed: the speed of the motor between -1 (full reverse) and 1 (full forward)
        """
        # https://abyz.me.uk/rpi/pigpio/python.html#set_PWM_dutycycle
        if (speed > 0):
            speed = math.min(speed, 1)  # cap speed at 1 (max)
            self.pigpio_instance.write(self.in1_pin, 0)  # PWM off
            # for real motor conrol these should be 1 not 0
            # 254 because 255 means breaking mode on the drv8871
            self.pigpio_instance.set_PWM_dutycycle(self.in2_pin, speed * 254)
        elif (speed < 0):
            speed = -speed  # cancel out negative speed value
            speed = math.min(speed, 1)  # cap speed at 1 (max)
            self.pigpio_instance.set_PWM_dutycycle(self.in1_pin, speed * 254)
            self.pigpio_instance.write(self.in2_pin, 0)  # PWM off
            # for real motor conroll these should be 1 not 0
        else:
            self.pigpio_instance.write(self.in1_pin, 0)  # PWM off
            self.pigpio_instance.write(self.in2_pin, 0)  # PWM off


class Motion_Controller:

    ### -----------------------

    current_motor_state = {
        'left': 0,
        'right': 0,
        'vertical': 0,
        'strafe': 0,
        'claw': 0,
        # 'lights': 0,
    }

    def init_motor_controllers(self):
        # Initilize the library for adafruit I2C 4 motor controller pi hat:
        print("Initializing motor controllers...")
        try:
            # initilize pigpio and get a reference to it
            self.pigpio_instance = pigpio.pi()

            # initilize the motor controllers
            # Motor Controller 1 (forward right)
            self.FORWARD_RIGHT_MOTOR = pwm_motor(self.pigpio_instance,
                                                 pin_in1=5,
                                                 pin_in2=6)
            # Motor Controller 2 (forward left)
            self.FORWARD_LEFT_MOTOR = pwm_motor(self.pigpio_instance,
                                                pin_in1=13,
                                                pin_in2=26)
            # Motor Controller 3 (up right)
            self.UP_LEFT_MOTOR = pwm_motor(self.pigpio_instance,
                                           pin_in1=21,
                                           pin_in2=20)
            # Motor Controller 4 (up left)
            self.UP_RIGHT_MOTOR = pwm_motor(self.pigpio_instance,
                                            pin_in1=12,
                                            pin_in2=25)
            # Motor Controller 5 (claw)
            self.CLAW_MOTOR = pwm_motor(self.pigpio_instance,
                                        pin_in1=11,
                                        pin_in2=27)
        except ValueError as e:
            print("Error initializing motor controllers: ", e)
            raise e

    def set_rov_motion(self, thrust_vector=[0, 0, 0], turn_rate=0):
        """
        Function to set the rov velocity based on the vector passed in.
        thrust_vector: a vector of the form [x,y,z] where x is strafe, y is forward, and z is vertical (all components should be between -1 & 1)
        turn_speed: a number between -1 & 1 coresponding to the amount of opposing thrust to apply on the two forward thrusters to turn the ROV at some rate (full clockwise = 1, full counterclokwise = -1).
        """
        turn_rate = float(turn_rate)  # make sure it's a float
        strafe_amt = float(thrust_vector[0])
        forward_amt = float(thrust_vector[1])
        vertical_amt = float(thrust_vector[2])

        vertical_thruster_angle = math.radians(45)  # 45deg angle in radians
        sqrt_one_half = math.sqrt(0.5)

        # https://www.desmos.com/calculator/64b6jlzsk4
        up_left_thrust_amt = -1 * (
            vertical_amt * math.sin(vertical_thruster_angle) -
            strafe_amt * math.cos(vertical_thruster_angle))
        up_right_thrust_amt = -1 * (
            vertical_amt * math.sin(vertical_thruster_angle) +
            strafe_amt * math.cos(vertical_thruster_angle))
        forward_left_thrust_amt = forward_amt - turn_rate
        forward_right_thrust_amt = forward_amt + turn_rate
        self.UP_LEFT_MOTOR.set_speed(up_left_thrust_amt)
        self.UP_RIGHT_MOTOR.set_speed(up_right_thrust_amt)
        self.FORWARD_LEFT_MOTOR.set_speed(forward_left_thrust_amt)
        self.FORWARD_RIGHT_MOTOR.set_speed(forward_right_thrust_amt)

        print("ThrustVec ", thrust_vector, "TurnRate ", turn_rate,
              " -> Motors ", forward_left_thrust_amt, forward_right_thrust_amt,
              up_left_thrust_amt, up_right_thrust_amt)

    def stop_gpio_and_motors(self):
        try:
            self.FORWARD_LEFT_MOTOR.set_speed(0)
            self.FORWARD_RIGHT_MOTOR.set_speed(0)
            self.UP_RIGHT_MOTOR.set_speed(0)
            self.UP_LEFT_MOTOR.set_speed(0)
            print("All motors and PWM now STOPPED")
        except Exception as e:
            print("Error stopping motors: ", e)

    def cleanup_gpio(self):
        """ Function to shut down the current pigpio.pi() instance. useful when turning off / exiting the rov program"""
        self.pigpio_instance.stop()

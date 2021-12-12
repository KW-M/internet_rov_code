# import pigpio
import board
from adafruit_motorkit import MotorKit

############################################
############### Motor / GPIO Stuff #################


class motor_ctl:

    ### ---- PWM Motor Pinouts ------

    # initilize pigpio and get a reference to it (unused - only applicable for the single motor pwm controllers)
    # pi = pigpio.pi()

    # Extra Motor Controller Pin numbers (unused - only applicable for the single motor pwm controllers)
    # FR_in1_pin = 27
    # FR_in2_pin = 13
    # Forward Left Motor Pin constants (unused - only applicable for the single motor pwm controllers)
    # FL_in1_pin = 27
    # FL_in2_pin = 13
    # Vertical Motor Pin constants (unused - only applicable for the single motor pwm controllers)
    # V_in1_pin = 27
    # V_in2_pin = 13
    # Strafing (crabwalk) Motor Pin constants (unused - only applicable for the single motor pwm controllers)
    # S_in1_pin = 27
    # S_in2_pin = 13

    ### -----------------------

    current_motor_driver_state = {
        'left': 0,
        'right': 0,
        'vertical': 0,
        'strafe': 0,
        # 'claw':0,
        # 'lights': 0,
    }

    def init_motor_controllers(self):
        # Initilize the library for adafruit I2C 4 motor controller pi hat:
        kit = MotorKit(i2c=board.I2C())
        self.FORWARD_RIGHT_MOTOR = kit.motor1
        self.FORWARD_LEFT_MOTOR = kit.motor2
        self.STRAFING_MOTOR = kit.motor4
        self.VERTICAL_MOTOR = kit.motor4

    def drivePwmMotor(in1_pin, in2_pin, speed):
        """ for the adafruit drv8871 single motor controllers
        in1_pin: the pin going to in1 on the motor controller
        in2_pin: the pin going to in2 on the motor controller
        speed: the speed of the motor between -1 (full reverse) and 1 (full forward)
        """
        # https://abyz.me.uk/rpi/pigpio/python.html#set_PWM_dutycycle
        # pi is an instance of pigpio.pi()
        if (speed > 0):
            pi.write(in1_pin,
                     0)  # for real motor conrol these should be 1 not 0
            pi.set_PWM_dutycycle(
                in2_pin, speed *
                254)  # 254 because 255 means breaking mode on the drv8871
        elif (speed < 0):
            pi.set_PWM_dutycycle(
                in1_pin, speed *
                -254)  # negative 254 to cancel out negative speed value
            pi.write(in2_pin,
                     0)  # for real motor conroll these should be 1 not 0
        else:
            pi.write(in1_pin, 0)  # PWM off
            pi.write(in2_pin, 0)  # PWM off

    def set_rov_velocity(velocity_vector=[0, 0, 0], turn_speed=0):
        """
        Function to set the rov velocity based on the vector passed in.
        vector: a vector of the form [x,y,z] where x is strafe, y is forward, and z is vertical (all components should be between 0 & 1)
        turn_speed: a number between 0 & 1 coresponding to the amount of thruster
        """
        raise NotImplementedError("This function is not yet implemented")

    def stop_gpio_and_motors():
        self.FORWARD_LEFT_MOTOR.throttle = 0
        self.FORWARD_RIGHT_MOTOR.throttle = 0
        self.VERTICAL_MOTOR.throttle = 0
        self.STRAFING_MOTOR.throttle = 0
        # pi.write(FL_in1_pin, 0)
        # pi.write(FL_in2_pin, 0)
        # pi.write(FR_in1_pin, 0)
        # pi.write(FR_in2_pin, 0)
        # pi.write(V_in1_pin, 0)
        # pi.write(V_in2_pin, 0)
        # pi.write(S_in1_pin, 0)
        # pi.write(S_in2_pin, 0)

    def cleanup_gpio():
        """ Function to shut down the current pigpio.pi() instance. useful when turning off / exiting the rov program"""
        # pi.stop()

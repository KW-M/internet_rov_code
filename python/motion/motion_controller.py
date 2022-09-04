import asyncio
import logging
import math
import pigpio

from motion.drok_pwm_motor_controller import Drok_Pwm_Motor
from motion.adafruit_pwm_motor_controller import Adafruit_Pwm_Motor

###### setup logging #######
log = logging.getLogger(__name__)


class Motion_Controller:

    # current_motor_state = {
    #     'left': 0,
    #     'right': 0,
    #     'vertical': 0,
    #     'strafe': 0,
    #     'claw': 0,
    #     # 'lights': 0,
    # }
    last_thrust_vector = [0, 0, 0]
    last_turn_rate = 0

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

            # Up Left: Top Red Motor Controller - plug closer to controller power input
            self.UP_LEFT_MOTOR = Drok_Pwm_Motor(self.pigpio_instance,
                                                pin_ena=18,
                                                pin_in1=27,
                                                pin_in2=22)

            # Motor Controller 1B (up right)
            self.UP_RIGHT_MOTOR = Drok_Pwm_Motor(self.pigpio_instance,
                                                 pin_ena=23,
                                                 pin_in1=24,
                                                 pin_in2=25)

            # Motor Controller 2A (forward right)
            self.FORWARD_LEFT_MOTOR = Drok_Pwm_Motor(self.pigpio_instance,
                                                     pin_ena=5,
                                                     pin_in1=6,
                                                     pin_in2=12)
            # Motor Controller 2B (forward left)
            self.FORWARD_RIGHT_MOTOR = Drok_Pwm_Motor(self.pigpio_instance,
                                                      pin_ena=13,
                                                      pin_in1=16,
                                                      pin_in2=19)

            # Motor Controller 5 (claw or lights)
            self.CLAW_MOTOR = Adafruit_Pwm_Motor(self.pigpio_instance,
                                                 pin_in1=4,
                                                 pin_in2=17)

        except ValueError:
            self.gpio_issue_flag.set()
        except Exception as e:
            self.gpio_issue_flag.set()
            log.error("Error Initializing Motor Controllers: ", exec_info=e)

    def set_rov_motion(self, thrust_vector=None, turn_rate=0):
        """
        Function to set the rov velocity based on the vector passed in.
        thrust_vector: a vector of the form [x,y,z] where x is strafe, y is forward, and z is vertical (all components should be between -1 & 1)
        turn_speed: a number between -1 & 1 coresponding to the amount of opposing thrust to apply on the two forward thrusters to turn the ROV
                    at some rate (full clockwise = 1, full counterclokwise = -1).
        """

        if thrust_vector is None:
            thrust_vector = [0, 0, 0]

        if self.gpio_issue_flag.is_set():
            return

        if (turn_rate == self.last_turn_rate
                and thrust_vector == self.last_thrust_vector):
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

        log.debug("ThrustVec (%s) TurnRate %s -> Motors %s %s %s %s",
                  ','.join(str(x) for x in thrust_vector), str(turn_rate),
                  str(forward_left_thrust_amt), str(forward_right_thrust_amt),
                  str(up_left_thrust_amt), str(up_right_thrust_amt))

        try:
            self.UP_LEFT_MOTOR.set_speed(up_left_thrust_amt)
            self.UP_RIGHT_MOTOR.set_speed(up_right_thrust_amt)
            self.FORWARD_LEFT_MOTOR.set_speed(forward_left_thrust_amt)
            self.FORWARD_RIGHT_MOTOR.set_speed(forward_right_thrust_amt)
            self.last_thrust_vector = thrust_vector
            self.last_turn_rate = turn_rate
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
            log.warning("Error stopping motors!", exc_info=e)
            self.gpio_issue_flag.set()

    def cleanup_gpio(self):
        """ Function to shut down the current pigpio.pi() instance. useful when turning off / exiting the rov program"""
        self.stop_gpio_and_motors()
        if self.pigpio_instance:
            self.pigpio_instance.stop()
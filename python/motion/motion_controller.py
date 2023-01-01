import asyncio
import logging
import math

from motion.drok_pwm_motor_controller import Drok_Pwm_Motor
from motion.adafruit_pwm_motor_controller import Adafruit_Pwm_Motor

###### setup logging #######
log = logging.getLogger(__name__)


class MotionTarget:
    __slots__ = ("velocity_x", "velocity_y", "velocity_z", "yaw_angular_velocity")
    velocity_x: float
    velocity_y: float
    velocity_z: float
    yaw_angular_velocity: float

    def __init__(self, velocity_x: float, velocity_y: float, velocity_z: float, yaw_angular_velocity: float):
        self.velocity_x = velocity_x
        self.velocity_y = velocity_y
        self.velocity_z = velocity_z
        self.yaw_angular_velocity = yaw_angular_velocity

    def __eq__(self, __o: "MotionTarget" | None) -> bool:
        return __o is not None and self.velocity_x == __o.velocity_x and self.velocity_y == __o.velocity_y and self.velocity_y == __o.velocity_y and self.yaw_angular_velocity == __o.yaw_angular_velocity

    def __str__(self) -> str:
        return f"MotionTarget(x={self.velocity_x}, y={self.velocity_y}, z={self.velocity_z}, yaw={self.yaw_angular_velocity})"


# pylint: disable=too-many-instance-attributes
class MotionController:
    gpio_issue_flag: asyncio.Event
    last_motion_target: MotionTarget
    forward_left_motor: Drok_Pwm_Motor
    forward_right_motor: Drok_Pwm_Motor
    up_right_motor: Drok_Pwm_Motor
    up_left_motor: Drok_Pwm_Motor
    claw_motor: Adafruit_Pwm_Motor

    def __init__(self, pigpio_instance) -> None:
        self.pigpio_instance = pigpio_instance

    async def motor_setup_loop(self):
        """ Function to run in a loop to check if the motors are working properly. """
        self.gpio_issue_flag = asyncio.Event()
        while True:
            self.gpio_issue_flag.clear()
            self.init_motor_controllers(async_loop=asyncio.get_event_loop())
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

    def init_motor_controllers(self, async_loop: asyncio.AbstractEventLoop | None = None):
        # Initilize the library for adafruit I2C 4 motor controller pi hat:
        log.info("Initializing motor controllers...")
        try:

            # Small Blue Motor Controller (claw or lights)
            self.claw_motor = Adafruit_Pwm_Motor(self.pigpio_instance, pin_in1=4, pin_in2=17)

            # Motor Controller 1A (forward right)
            #Top Red Motor Controller; plug closer to controller power input (left)
            self.forward_right_motor = Drok_Pwm_Motor(self.pigpio_instance, pin_ena=18, pin_in1=27, pin_in2=22, async_loop=async_loop)

            # Motor Controller 1B (up right)
            self.up_right_motor = Drok_Pwm_Motor(self.pigpio_instance, pin_ena=23, pin_in1=24, pin_in2=25, async_loop=async_loop)

            # Motor Controller 2A (forward right)
            self.forward_left_motor = Drok_Pwm_Motor(self.pigpio_instance, pin_ena=5, pin_in1=6, pin_in2=12, async_loop=async_loop)

            # Motor Controller 2B (up left)
            self.up_left_motor = Drok_Pwm_Motor(self.pigpio_instance, pin_ena=13, pin_in1=16, pin_in2=19, async_loop=async_loop)

        except ValueError:
            self.gpio_issue_flag.set()
        except Exception as err:
            self.gpio_issue_flag.set()
            log.error("Error Initializing Motor Controllers:  %s", err, exc_info=True)

    # pylint: disable=too-many-locals
    def set_rov_motion(self, velocity_x: float = 0, velocity_y: float = 0, velocity_z: float = 0, yaw_angular_velocity: float = 0):
        """
        Function to set the rov velocity based on the vector passed in.
        thrust_vector: a vector of the form [x,y,z] where x is strafe, y is forward, and z is vertical (all components should be between -1 & 1)
        turn_speed: a number between -1 & 1 coresponding to the amount of opposing thrust to apply on the two forward thrusters to turn the ROV
                    at some rate (full clockwise = 1, full counterclokwise = -1).
        """

        if self.gpio_issue_flag.is_set():
            return

        motion_target = MotionTarget(velocity_x, velocity_y, velocity_z, yaw_angular_velocity)
        if motion_target == self.last_motion_target:
            return

        turn_rate = motion_target.yaw_angular_velocity  # make sure it's a float
        strafe_amt = motion_target.velocity_x
        forward_amt = motion_target.velocity_y
        vertical_amt = motion_target.velocity_z

        # angle represending the angle of the two vertical thrusters off the vertical in the strafe direction.
        # Format: radians = math.radians(degrees)
        vertical_thrusters_angle = math.radians(45)

        up_left_thrust_amt = (vertical_amt * math.sin(vertical_thrusters_angle) - strafe_amt * math.cos(vertical_thrusters_angle))
        up_right_thrust_amt = (vertical_amt * math.sin(vertical_thrusters_angle) + strafe_amt * math.cos(vertical_thrusters_angle))
        forward_left_thrust_amt = -forward_amt - turn_rate
        forward_right_thrust_amt = -forward_amt + turn_rate
        # https://www.desmos.com/calculator/64b6jlzsk4

        log.debug("%s -> Motors %s ", str(motion_target), " ".join([str(turn_rate), str(forward_left_thrust_amt), str(forward_right_thrust_amt), str(up_left_thrust_amt), str(up_right_thrust_amt)]))

        try:
            self.up_left_motor.set_speed(up_left_thrust_amt)
            self.up_right_motor.set_speed(up_right_thrust_amt)
            self.forward_left_motor.set_speed(forward_left_thrust_amt)
            self.forward_right_motor.set_speed(forward_right_thrust_amt)
            self.last_motion_target = motion_target
        except Exception as err:
            log.warning("Error setting motor speed! %s", err, exc_info=True)
            self.gpio_issue_flag.set()

    def stop_motors(self):
        try:
            print("S/TOPPING MOTORS")
            self.forward_left_motor.set_speed(0)
            self.forward_right_motor.set_speed(0)
            self.up_right_motor.set_speed(0)
            self.up_left_motor.set_speed(0)
        except Exception as err:
            log.warning("Error stopping motors! %s", err, exc_info=True)
            self.gpio_issue_flag.set()

    def cleanup_gpio(self):
        """ Function to shut down the current pigpio.pi() instance. useful when turning off / exiting the rov program"""
        self.stop_motors()
        print("CLEAN GPIO")
        if self.pigpio_instance:
            self.pigpio_instance.stop()

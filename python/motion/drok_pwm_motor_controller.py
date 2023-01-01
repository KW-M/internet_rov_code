import asyncio
import logging
import pigpio

REQUIRED_BREAKING_TIME = 0.05  # seconds

###### setup logging #######
log = logging.getLogger(__name__)


class Drok_Pwm_Motor:
    """ For the Drok 7A dual DC motor driver (Product SKU: 200206)
    This motor driver attempts to use delays between breaking & starting of both motor contollers on each board
    to avoid H-Bridge short circuts that seem to breifly happen when the motor direction is changed or both motors
    are changed at the same time.
    pigpio_instance: the pigpio library instance to use to drive the pwm / gpio signals from the pi
    pin_ena: the raspberry pi pin going to the ENA1 pin on the motor driver (ENA2 if driving the second motor)
    pin_in1: the raspberry pi pin going to IN1 pin on the motor controller (IN3 if driving the second motor)
    pin_in2: the raspberry pi pin going to IN2 pin on the motor controller (IN4 if driving the second motor)
    """
    all_motor_controllers: list['Drok_Pwm_Motor'] = []
    desired_speed = 0
    next_target_speed = 0
    current_speed = 0
    time_of_last_speed_change = 0
    speedchange_callback_timer = None

    # pylint: disable=too-many-arguments
    def __init__(
            self,
            pigpio_instance,  #: pigpio.pi,
            pin_ena: int,
            pin_in1: int,
            pin_in2: int,
            async_loop: asyncio.AbstractEventLoop | None = None):
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
        print(f'PWM Freq: pin_ena = {pigpio_instance.get_PWM_frequency(self.pin_ena)}')

        if async_loop is not None:
            self.ascync_loop = async_loop
        else:
            self.ascync_loop = asyncio.get_event_loop()

        Drok_Pwm_Motor.all_motor_controllers.append(self)

    def set_speed(self, speed: float):
        """
        speed: the speed of the motor between 1.0 (full forward) and -1.0 (full reverse)
        """
        # check if desired speed and current speed are of different sign indicating different rotation directions
        dir_changed = speed * self.current_speed < 0
        self.desired_speed = speed
        if dir_changed:
            # print(f'<<< {self.pin_ena} dir changed >>')
            self._set_callback_timer(True)
        self._drive_motor()

    def our_motor_state_changed_recently(self):
        ''' checks if this motor controller has changed direction or stoped/started recently  '''
        if self.ascync_loop.time() <= self.time_of_last_speed_change + REQUIRED_BREAKING_TIME:
            return True

        return False

    def _other_motor_state_changed_recently(self):
        ''' checks if any other drok motor controller has changed direction or stoped/started recently  '''
        for motor in Drok_Pwm_Motor.all_motor_controllers:
            if motor is not self and motor.our_motor_state_changed_recently():
                return True

        return False

    def _set_callback_timer(self, reset: bool = False):
        if self.speedchange_callback_timer is not None:
            # reset the callback timer
            if reset:
                self.speedchange_callback_timer.cancel()
                self.speedchange_callback_timer = None
            else:
                return

        self.speedchange_callback_timer = self.ascync_loop.call_later(REQUIRED_BREAKING_TIME, self._speedchange_callback)

    def _check_for_motor_state_change(self):
        ''' checks if the current motor speed is a different direction from the desired speed or going from current to desired would go from 0 to non-zero or vice versa'''
        if self.current_speed * self.desired_speed <= 0 and not (self.desired_speed == 0 and self.current_speed == 0):
            return True
        return False

    def _check_for_motor_direction_change(self):
        if self.current_speed * self.desired_speed < 0:
            return True
        return False

    def _record_speed_change(self):
        print(f'SPD ^ {self.pin_ena} >>>> {self.current_speed}')
        self.time_of_last_speed_change = self.ascync_loop.time()

    def _speedchange_callback(self):
        # print(f'<<< {self.pin_ena} speedchange_callback >>')
        self.speedchange_callback_timer = None
        self._drive_motor()

    def _drive_motor(self):
        """
        drives the motor based on the current desired speed
        """

        speed = self.desired_speed

        if self.current_speed == speed:
            return

        # check if we are changing direction too quickly after stopping
        if self.current_speed == 0 and self.our_motor_state_changed_recently():
            # print("Changed direction too quickly after stopping",self.pin_ena)
            self._set_callback_timer(False)
            return

        # make sure no other controller has changed direction recently if we are changing direction
        if self._check_for_motor_state_change() and self._other_motor_state_changed_recently():
            # print("Another motor controller changed direction too recently",self.pin_ena)
            self._set_callback_timer(False)
            return

        # make sure we don't change direction wihtout breaking first.
        if self._check_for_motor_direction_change():
            # print("Halting before changing direction",self.pin_ena)
            speed = 0

        # https://abyz.me.uk/rpi/pigpio/python.html#set_PWM_dutycycle
        if (speed > 0):
            # Drive forward and cap speed at 1 (max)
            self.pigpio_instance.write(self.pin_in1, 1)  # pin HIGH (on)
            self.pigpio_instance.write(self.pin_in2, 0)  # pin LOW (off)
            self.pigpio_instance.set_PWM_dutycycle(self.pin_ena, min(speed, 1) * 255)
        elif (speed < 0):
            # Drive backwards and cap speed at 1 (max)
            self.pigpio_instance.write(self.pin_in1, 0)  # pin LOW (off)
            self.pigpio_instance.write(self.pin_in2, 1)  # pin HIGH (on)
            self.pigpio_instance.set_PWM_dutycycle(self.pin_ena, min(-speed, 1) * 255)
        else:
            # Speed = 0. Halt pwm / motor (breaking mode)
            self.pigpio_instance.write(self.pin_in1, 0)  # pin LOW (off)
            self.pigpio_instance.write(self.pin_in2, 0)  # pin LOW (off)
            self.pigpio_instance.set_PWM_dutycycle(self.pin_ena, 0)

        if self._check_for_motor_state_change():
            self.current_speed = speed
            self._record_speed_change()
        else:
            self.current_speed = speed

        # if we just changed direction, we don't need the callback anymore
        if self.speedchange_callback_timer is not None:
            self.speedchange_callback_timer.cancel()
            self.speedchange_callback_timer = None


if __name__ == '__main__':

    class fake_pigpio:

        def set_mode(self, pin, mode):
            pass

        def set_PWM_dutycycle(self, pin, duty_cycle):
            pass

        def set_PWM_frequency(self, pin, frequency):
            pass

        def get_PWM_frequency(self, pin):
            return 1000

        def write(self, pin, value):
            # print(f'W{pin} -> {value}')
            pass

    def drive_motor(motor, speed):
        print(f'in {motor.pin_ena} > {speed}')
        motor.set_speed(speed)

    async def pause(duration, motor1, motor2):
        while duration > 0:
            duration -= 0.05
            await asyncio.sleep(0.05)
            print('--------------', motor1.current_speed, motor2.current_speed)

    async def main():
        motor1 = Drok_Pwm_Motor(fake_pigpio(), 1, 3, 5)
        motor2 = Drok_Pwm_Motor(fake_pigpio(), 2, 4, 6)

        drive_motor(motor1, 1)
        drive_motor(motor2, 1)
        drive_motor(motor1, 0)
        drive_motor(motor1, 0.5)
        drive_motor(motor2, 0.5)
        await pause(0.1, motor1, motor2)
        drive_motor(motor2, -0.5)
        await pause(1, motor1, motor2)
        drive_motor(motor1, 0)
        drive_motor(motor2, 0)
        await pause(1, motor1, motor2)
        drive_motor(motor2, 0.5)
        drive_motor(motor1, 0.5)

        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, 0.5)

        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, 0.5)
        #     drive_motor(motor2, 0)

        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, 0.5)

        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, 0.5)

        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, 0.5)

        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, 0.5)

        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, 0.9)

        #     await pause(0.02, motor1, motor2)
        #     drive_motor(motor1, 0.2)

        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, 0.1)

        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, 0.6)

        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, 0.4)

        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, 0.3)

        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, 0.2)

        #     await pause(0.02, motor1, motor2)
        #     drive_motor(motor1, 0.5)

        #     await pause(1, motor1, motor2)
        #     drive_motor(motor1, 0)

        #     await pause(1, motor1, motor2)
        #     drive_motor(motor2, 1)
        #     await pause(1, motor1, motor2)
        #     drive_motor(motor2, -1)
        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, 1)
        #     await pause(0.05, motor1, motor2)

        #     drive_motor(motor2, 1)
        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, -1)
        #     await pause(0.05, motor1, motor2)

        #     drive_motor(motor2, -1)
        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, 1)
        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor2, 1)
        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, -1)
        #     await pause(0.05, motor1, motor2)

        #     drive_motor(motor2, -1)
        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, 1)
        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor2, 1)
        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, -1)
        #     await pause(0.05, motor1, motor2)

        #     drive_motor(motor2, -1)
        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, 1)
        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor2, 1)
        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, -1)
        #     await pause(0.05, motor1, motor2)

        #     drive_motor(motor2, -1)
        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, 1)
        #     await pause(0.05, motor1, motor2)

        #     drive_motor(motor2, -1)
        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, 1)
        #     await pause(0.05, motor1, motor2)
        #     await pause(1, motor1, motor2)

        #     drive_motor(motor1, 0)
        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, 1)
        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, 0)
        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, 1)
        #     drive_motor(motor2, 0)
        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor2, 1)
        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor2, 0)
        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor2, 1)
        #     await pause(0.05, motor1, motor2)
        #     await pause(0.05, motor1, motor2)
        #     drive_motor(motor1, 0)
        await pause(2, motor1, motor2)

    asyncio.run(main())

# import asyncio
# import logging
# import pigpio

# REQUIRED_BREAKING_TIME = 0.3  # seconds

# ###### setup logging #######
# log = logging.getLogger(__name__)

# class Drok_Pwm_Motor:
#     """ For the Drok 7A dual DC motor driver (Product SKU: 200206)
#     This motor driver attempts to use delays between breaking & starting of both motor contollers on each board
#     to avoid H-Bridge short circuts that seem to breifly happen when the motor direction is changed or both motors
#     are changed at the same time.
#     pigpio_instance: the pigpio library instance to use to drive the pwm / gpio signals from the pi
#     pin_ena: the raspberry pi pin going to the ENA1 pin on the motor driver (ENA2 if driving the second motor)
#     pin_in1: the raspberry pi pin going to IN1 pin on the motor controller (IN3 if driving the second motor)
#     pin_in2: the raspberry pi pin going to IN2 pin on the motor controller (IN4 if driving the second motor)
#     """
#     paired_motor_ctrlr = None
#     countdown = -1  # -1 means not counting down atm
#     desired_speed = 0
#     last_triggered_speed = 0
#     time_of_last_speed_change_trigger = 0
#     speedchange_callback_timer = None

#     # pylint: disable=too-many-arguments
#     def __init__(
#             self,
#             pigpio_instance,  #: pigpio.pi,
#             pin_ena: int,
#             pin_in1: int,
#             pin_in2: int,
#             async_loop: asyncio.AbstractEventLoop = None):
#         self.pigpio_instance = pigpio_instance
#         self.pin_ena = pin_ena
#         self.pin_in1 = pin_in1
#         self.pin_in2 = pin_in2
#         self.pigpio_instance.set_mode(self.pin_ena, pigpio.OUTPUT)
#         self.pigpio_instance.set_mode(self.pin_in1, pigpio.OUTPUT)
#         self.pigpio_instance.set_mode(self.pin_in2, pigpio.OUTPUT)
#         # Halt pwm / motor (breaking mode)
#         self.pigpio_instance.set_PWM_dutycycle(self.pin_ena, 0)
#         self.pigpio_instance.write(self.pin_in1, 0)  # pin LOW (off)
#         self.pigpio_instance.write(self.pin_in2, 0)  # pin LOW (off)
#         print(f'PWM Freq: pin_ena = {pigpio_instance.get_PWM_frequency(self.pin_ena)}')

#         if async_loop is not None:
#             self.ascync_loop = async_loop
#         else:
#             self.ascync_loop = asyncio.get_event_loop()

#     def set_paired_motor_ctrlr(self, paired_motor_ctrlr: 'Drok_Pwm_Motor'):
#         self.paired_motor_ctrlr = paired_motor_ctrlr

#     def set_speed(self, speed: float):
#         """
#         speed: the speed of the motor between 1.0 (full forward) and -1.0 (full reverse)
#         """
#         # https://abyz.me.uk/rpi/pigpio/python.html#set_PWM_dutycycle

#         # check if desired speed and current speed are of different sign indicating different rotation directions
#         dir_changed = speed * self.desired_speed < 0
#         self.desired_speed = speed

#         if dir_changed:
#             print(f'<<< {self.pin_ena} dir changed >>')
#             # reset the callback timer if the direction changed
#             if self.speedchange_callback_timer is not None:
#                 self.speedchange_callback_timer.cancel()

#             self.speedchange_callback_timer = self.ascync_loop.call_later(REQUIRED_BREAKING_TIME, self._speedchange_callback)

#         self._drive_motor()

#     def _paired_controller_timeout_active(self):
#         if self.paired_motor_ctrlr is None:
#             return False

#         if self.paired_motor_ctrlr.time_of_last_speed_change_trigger >= self.ascync_loop.time() - REQUIRED_BREAKING_TIME and self.speedchange_callback_timer is None:
#             self.speedchange_callback_timer = self.ascync_loop.call_later(REQUIRED_BREAKING_TIME, self._speedchange_callback)
#             return True

#         return False

#     def _check_for_speed_change(self, speed: float):
#         if self.last_triggered_speed * speed <= 0 and not (speed == 0 and self.last_triggered_speed == 0):
#             return True
#         return False

#     def _record_speed_change(self, speed: float):
#         print(f'SPD ^ {self.pin_ena} >>>> {speed}')
#         self.last_triggered_speed = speed
#         self.time_of_last_speed_change_trigger = self.ascync_loop.time()

#     def _speedchange_callback(self):
#         print(f'<<< {self.pin_ena} speedchange_callback >>')
#         self.speedchange_callback_timer = None
#         self._drive_motor()

#     def _drive_motor(self):
#         """
#         drives the motor based on the current desired speed
#         """

#         speed = self.desired_speed

#         # make sure the paired controller hasn't changed direction recently if we are changing direction
#         if self._check_for_speed_change(speed) and self._paired_controller_timeout_active():
#             return

#         # check if the speed change callback timer is in use
#         if self.speedchange_callback_timer is not None:
#             # if so, we need to break before changing the direction of the motor
#             speed = 0

#         if (speed > 0):
#             # Drive forward and cap speed at 1 (max)
#             speed = min(speed, 1)
#             self.pigpio_instance.write(self.pin_in1, 1)  # pin HIGH (on)
#             self.pigpio_instance.write(self.pin_in2, 0)  # pin LOW (off)
#             self.pigpio_instance.set_PWM_dutycycle(self.pin_ena, speed * 255)
#         elif (speed < 0):
#             # Drive backwards and cap speed at 1 (max)
#             speed = min(-speed, 1)
#             self.pigpio_instance.write(self.pin_in1, 0)  # pin LOW (off)
#             self.pigpio_instance.write(self.pin_in2, 1)  # pin HIGH (on)
#             self.pigpio_instance.set_PWM_dutycycle(self.pin_ena, speed * 255)
#         else:
#             # Speed = 0. Halt pwm / motor (breaking mode)
#             self.pigpio_instance.write(self.pin_in1, 0)  # pin LOW (off)
#             self.pigpio_instance.write(self.pin_in2, 0)  # pin LOW (off)
#             self.pigpio_instance.set_PWM_dutycycle(self.pin_ena, 0)

#         if self._check_for_speed_change(speed):
#             self._record_speed_change(speed)

# if __name__ == '__main__':

#     class fake_pigpio:

#         def set_mode(self, pin, mode):
#             pass

#         def set_PWM_dutycycle(self, pin, duty_cycle):
#             pass

#         def set_PWM_frequency(self, pin, frequency):
#             pass

#         def get_PWM_frequency(self, pin):
#             return 1000

#         def write(self, pin, value):
#             # print(f'W{pin} -> {value}')
#             pass

#     def drive_motor(motor, speed):
#         print(f'in {motor.pin_ena} > {speed}')
#         motor.set_speed(speed)

#     async def pause(duration, motor1, motor2):
#         print(f'----- {duration} ------')
#         await asyncio.sleep(duration)
#         print('--------------', motor1.last_triggered_speed, motor2.last_triggered_speed)

#     async def main():
#         motor1 = Drok_Pwm_Motor(fake_pigpio(), 1, 3, 5)
#         motor2 = Drok_Pwm_Motor(fake_pigpio(), 2, 4, 6)

#         motor1.set_paired_motor_ctrlr(motor2)
#         motor2.set_paired_motor_ctrlr(motor1)

#         drive_motor(motor1, 0)
#         drive_motor(motor2, 0)
#         drive_motor(motor1, 0)
#         drive_motor(motor1, 0.5)
#         await pause(1, motor1, motor2)
#         drive_motor(motor2, 0.5)
#         await pause(1, motor1, motor2)
#         drive_motor(motor1, 0)
#         drive_motor(motor2, 0)
#         await pause(1, motor1, motor2)
#         drive_motor(motor2, 0.5)
#         drive_motor(motor1, 0.5)

#         await pause(0.05, motor1, motor2)
#         drive_motor(motor1, 0.5)

#         await pause(0.05, motor1, motor2)
#         drive_motor(motor1, 0.5)
#         drive_motor(motor2, 0)

#         await pause(0.05, motor1, motor2)
#         drive_motor(motor1, 0.5)

#         await pause(0.05, motor1, motor2)
#         drive_motor(motor1, 0.5)

#         await pause(0.05, motor1, motor2)
#         drive_motor(motor1, 0.5)

#         await pause(0.05, motor1, motor2)
#         drive_motor(motor1, 0.5)

#         await pause(0.05, motor1, motor2)
#         drive_motor(motor1, 0.5)

#         await pause(0.02, motor1, motor2)
#         drive_motor(motor1, 0.5)

#         await pause(0.05, motor1, motor2)
#         drive_motor(motor1, 0.5)

#         await pause(0.05, motor1, motor2)
#         drive_motor(motor1, 0.5)

#         await pause(0.05, motor1, motor2)
#         drive_motor(motor1, 0.5)

#         await pause(0.05, motor1, motor2)
#         drive_motor(motor1, 0.5)

#         await pause(0.05, motor1, motor2)
#         drive_motor(motor1, 0.5)

#         await pause(0.02, motor1, motor2)
#         drive_motor(motor1, 0.5)

#         await pause(1, motor1, motor2)
#         drive_motor(motor1, 0)

#         await pause(1, motor1, motor2)
#         drive_motor(motor2, 1)
#         await pause(1, motor1, motor2)
#         drive_motor(motor2, -1)
#         await pause(0.05, motor1, motor2)
#         drive_motor(motor1, 1)
#         await pause(0.05, motor1, motor2)

#         drive_motor(motor2, -1)
#         await pause(0.05, motor1, motor2)
#         drive_motor(motor1, 1)
#         await pause(0.05, motor1, motor2)

#         drive_motor(motor2, -1)
#         await pause(0.05, motor1, motor2)
#         drive_motor(motor1, 1)
#         await pause(0.05, motor1, motor2)

#         drive_motor(motor2, -1)
#         await pause(0.05, motor1, motor2)
#         drive_motor(motor1, 1)
#         await pause(0.05, motor1, motor2)
#         await pause(3, motor1, motor2)

#     asyncio.run(main())

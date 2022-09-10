import time
import pigpio
from python.motion.drok_pwm_motor_controller import Drok_Pwm_Motor

### -----------------------

RAMP_STEPS = 40

def motorRamp(motor):
    for i in range(-RAMP_STEPS, RAMP_STEPS):
        print(f'Speed: {(i / RAMP_STEPS) * 100}%')
        motor.set_speed(i / RAMP_STEPS / 4)
        time.sleep(.5)
        motor.set_speed(0)
        time.sleep(1)


if __name__ == "__main__":
    # --- initilize pigpio and get a reference to it
    pi_gpio = pigpio.pi()

    # Main Loop runs each set of motors one after the other
    forward_left_motor = Drok_Pwm_Motor(pi_gpio, 22, 27, 17)

    while (True):
        print("Forward left:")
        time.sleep(1)
        motorRamp(forward_left_motor)

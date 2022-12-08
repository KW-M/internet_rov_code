import time
import os
import pigpio

### ---- GPIO Pinouts ------
# Forward Left Motor Pins
FL_in1_pin     = 27
FL_in2_pin     = 13

# Forward Right Motor Pins
FR_in1_pin     = 27
FR_in2_pin     = 13

#Vertical Motor Pins
V_in1_pin     = 27
V_in2_pin     = 13

#Strafing (crabwalk) Motor Pins
S_in1_pin     = 27
S_in2_pin     = 13
### -----------------------

# --- initilize pigpio and get a reference to it
pi = pigpio.pi()

def driveMotor(pi,in1_pin,in2_pin,speed):
    """ for the adafruit drv8871 motor controlers
    pi: pass an instance of the pigpio library
    in1_pin: the pin going to in1 on the motor controller
    in2_pin: the pin going to in2 on the motor controller
    speed: the speed of the motor between -1 (full reverse) and 1 (full forward)
    """
    # https://abyz.me.uk/rpi/pigpio/python.html#set_PWM_dutycycle
    if (speed > 0):
        pi.write(in1_pin,1) # for real motor conrol these should be 1 not 0
        pi.set_PWM_dutycycle(in2_pin, speed * 254) # 254 because 255 means breaking mode on the drv8871
    elif (speed < 0):
        pi.set_PWM_dutycycle(in1_pin, speed * -254) # negative 254 to cancel out negative speed value
        pi.write(in2_pin,1) # for real motor conroll these should be 1 not 0
    else:
        pi.write(in1_pin, 0) # PWM off
        pi.write(in2_pin, 0) # PWM off

RAMP_STEPS = 6
def motorRamp(in1_pin,in2_pin):
    print('PWM Freq: in1_pin = {}, in2_pin = {}'.format(pi.get_PWM_frequency(in1_pin),pi.get_PWM_frequency(in2_pin)))
    for i in range(-RAMP_STEPS,RAMP_STEPS):
        print('Motor ({},{}) at {}'.format(in1_pin, in2_pin, i / RAMP_STEPS))
        driveMotor(pi,in1_pin, in2_pin, i / RAMP_STEPS)
        time.sleep(.5)

# Main Loop runs each set of motors one after the other
while (True):
    print("Forward left:")
    time.sleep(1)
    motorRamp(FL_in1_pin,FL_in2_pin)
    print("Forward right:")
    time.sleep(1)
    motorRamp(FR_in1_pin,FR_in2_pin)
    print("Vertical:")
    time.sleep(1)
    motorRamp(V_in1_pin,V_in2_pin)
    print("Strafe / Crabwalk:")
    time.sleep(1)
    motorRamp(S_in1_pin,S_in2_pin)



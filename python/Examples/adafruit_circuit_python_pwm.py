import time
import board
import pwmio

led = pwmio.PWMOut(board.D5, frequency=5000, duty_cycle=0)

while True:
    for i in range(100):
        # PWM LED up and down
        # Cycles through the full PWM range from 0 to 65535
        for cycle in range(0, 65535):
            led.duty_cycle = cycle  # Up
        # Cycles through the PWM range backwards from 65534 to 0
        for cycle in range(65534, 0, -1):
            led.duty_cycle = cycle # Down

        time.sleep(0.01)
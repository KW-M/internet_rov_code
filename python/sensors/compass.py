from fusion_async import Fusion  # Using async version
import qwiic_icm20948
import time
import sys


class compassSensor():
    def setupSensor():
        print("\nSparkFun 9DoF ICM-20948 Sensor  Example 1\n")
        IMU = qwiic_icm20948.QwiicIcm20948()

        if IMU.connected == False:
            print("Compass (Sparkfun ICM20948) isn't connected.")
            return

        IMU.begin()

        while True:
            if IMU.dataReady():
                IMU.getAgmt(
                )  # read all axis and temp from sensor, note this also updates all instance variables
                print(\
                 '{: 06d}'.format(IMU.axRaw)\
                , '\t', '{: 06d}'.format(IMU.ayRaw)\
                , '\t', '{: 06d}'.format(IMU.azRaw)\
                , '\t', '{: 06d}'.format(IMU.gxRaw)\
                , '\t', '{: 06d}'.format(IMU.gyRaw)\
                , '\t', '{: 06d}'.format(IMU.gzRaw)\
                , '\t', '{: 06d}'.format(IMU.mxRaw)\
                , '\t', '{: 06d}'.format(IMU.myRaw)\
                , '\t', '{: 06d}'.format(IMU.mzRaw)\
                )
                time.sleep(0.03)
            else:
                print("Waiting for data")
                time.sleep(0.5)


if __name__ == '__main__':
    try:
        runExample()
    except (KeyboardInterrupt, SystemExit) as exErr:
        print("\nEnding Example 1")
        sys.exit(0)
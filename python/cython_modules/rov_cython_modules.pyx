# distutils: language = c++
import time
from libcpp cimport bool
from ahrs import Quaternion

# cdef extern from "testing.h":
#     void printHello(int s)

cdef extern from "Fused_Compass_IMU.h":
    ctypedef struct Fused_Compass_Data:
        double quat[4]
        double quat_accuracy
        double temp_c

    cppclass Fused_Compass_IMU:
             Fused_Compass_Data current_data
             Fused_Compass_IMU() except +
             bool setup_sensor()
             Fused_Compass_Data read_sensor()
             bool cleanup()


cdef class Py_Fused_Compass:
    cdef Fused_Compass_IMU * c_imu  # Hold a C++ instance which we're wrapping

    def __init__(self):
        self.c_imu = new Fused_Compass_IMU()

    def setup_sensor(self):
        return self.c_imu.setup_sensor()

    def read_sensor(self):
        self.c_imu.read_sensor()
        return (self.c_imu.current_data.quat, self.c_imu.current_data.quat_accuracy, self.c_imu.current_data.temp_c)

    def cleanup(self):
        return self.c_imu.cleanup()


# cpdef run_fused_compass():
#     # printHello(4)
#     a = Py_Fused_Compass()
#     while(not a.setup_sensor()):
#         print("Failed to setup sensor")
#         time.sleep(0.1)

#     while True:
#         quat, quat_accuracy, temp_c = a.read_sensor()
#         print(Quaternion(quat).to_angles(), quat_accuracy, temp_c)
#         time.sleep(0.1)

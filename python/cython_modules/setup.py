from distutils.core import setup
from distutils.extension import Extension
from Cython.Distutils import build_ext
from Cython.Build import cythonize

# setup.py file
import sys
import os
import shutil

os.chdir(os.path.dirname(os.path.abspath(__file__)))

CPP_CODE_FOLDER = "./cpp"

# clean previous build
for root, dirs, files in os.walk(".", topdown=False):
    for name in files:
        if (name.startswith("rov_cython_modules") and not (name.endswith(".pyx") or name.endswith(".pxd"))):
            os.remove(os.path.join(root, name))
    for name in dirs:
        if (name == "build"):
            shutil.rmtree(name)

# get all c and c++ files in the cpp folder
cpp_files = []
header_include_folders = []
for root, dirs, files in os.walk(CPP_CODE_FOLDER, topdown=False):
    for name in files:
        if (name.endswith(".cpp") or name.endswith(".c")):
            cpp_files.append(os.path.join(root, name))
    for name in files:
        if (name.endswith(".hpp") or name.endswith(".h")):
            header_include_folders.append(root)
            break

# for root, dirs, files in os.walk("/usr/include/c++/10/", topdown=False):
#     # for name in files:
#     #     if (name.endswith(".cpp") or name.endswith(".c")):
#     #         cpp_files.append(os.path.join(root, name))
#     for name in files:
#         if (name.endswith(".hpp") or name.endswith(".h")):
#             cpp_folders.append(root)
#             break

# get all the pyx files in the current folder
pyx_files = []
for root, dirs, files in os.walk(".", topdown=False):
    for name in files:
        if (name.endswith(".pyx")):
            pyx_files.append(os.path.join(root, name))

sources = [*cpp_files, *pyx_files]
print("sources:", sources)
print("folders:", header_include_folders)

os.environ["CXX"] = "g++"
os.environ["CC"] = "g++"

# sources = ['./arduino_cpp/libraries/SparkFun_9DoF_IMU_Breakout_-_ICM_20948_-_Arduino_Library/src/util/ICM_20948_C.c', './arduino_cpp/libraries/SparkFun_9DoF_IMU_Breakout_-_ICM_20948_-_Arduino_Library/src/ICM_20948.cpp', './arduino_cpp/libraries/Serial.cpp', './arduino_cpp/libraries/WString.cpp', './arduino_cpp/libraries/Wire.cpp', './arduino_cpp/libraries/SPI.cpp', './arduino_cpp/libraries/my_util.cpp', './arduino_cpp/libraries/Core.cpp', './arduino_cpp/Fused_Compass_Demo.cpp', './arduino_cpp/Example1_Basics.cpp', './arduino_cpp/arduinoMain.cpp', './arduino_cpp/main.cpp', './arduino_cpp/test.cpp', './cython_test.pyx']
# header_include_folders = ['.', './arduino_cpp/libraries/SparkFun_9DoF_IMU_Breakout_-_ICM_20948_-_Arduino_Library/src/util', './arduino_cpp/libraries/SparkFun_9DoF_IMU_Breakout_-_ICM_20948_-_Arduino_Library/src', './arduino_cpp/libraries', './arduino_cpp/']
# sources = ['./cython_test.pyx', './arduino_cpp/libraries/Serial.cpp', './arduino_cpp/libraries/WString.cpp', './arduino_cpp/libraries/Wire.cpp', './arduino_cpp/libraries/SPI.cpp', './arduino_cpp/libraries/Core.cpp', './arduino_cpp/libraries/SparkFun_9DoF_IMU_Breakout_-_ICM_20948_-_Arduino_Library/src/util/ICM_20948_C.c', './arduino_cpp/libraries/SparkFun_9DoF_IMU_Breakout_-_ICM_20948_-_Arduino_Library/src/ICM_20948.cpp', './arduino_cpp/Fused_Compass_Demo.cpp']
# header_include_folders = ['.', './arduino_cpp/libraries/SparkFun_9DoF_IMU_Breakout_-_ICM_20948_-_Arduino_Library/src/util', './arduino_cpp/libraries/SparkFun_9DoF_IMU_Breakout_-_ICM_20948_-_Arduino_Library/src', './arduino_cpp/libraries', './arduino_cpp/']

# build "rov_cython_modules.so" python extension to be added to "PYTHONPATH" afterwards...
setup(
    name='rov_python_code',
    zip_safe=False,
    # cmdclass={'build_ext': build_ext},
    ext_modules=cythonize(
        [
            Extension(
                "rov_cython_modules",
                sources=sources,
                # libraries=["examplesharedlibrary"],  # would refer to "libexamplesharedlibrary.so"
                language="c++",  # remove this if C and not C++
                extra_compile_args=["-Wno-comment", "-fpermissive", "-std=c++17", "-fopenmp", "-O2"],
                extra_link_args=["-lm", "-pthread", "-fopenmp"],
                include_dirs=header_include_folders,
            )
        ],
        compiler_directives={'language_level': "3"}))

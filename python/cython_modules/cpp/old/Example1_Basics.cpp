// /****************************************************************
//  * Example1_Basics.ino
//  * ICM 20948 Arduino Library Demo
//  * Use the default configuration to stream 9-axis IMU data
//  * Owen Lyke @ SparkFun Electronics
//  * Original Creation Date: April 17 2019
//  *
//  * Please see License.md for the license information.
//  *
//  * Distributed as-is; no warranty is given.
//  ***************************************************************/
// #include "Arduino.h"
// #include <iostream>
// #define TwoWire WireLinux
// #define SPIClass SPILinux
// #define Stream SerialLinux

// #include "./libraries/SparkFun_9DoF_IMU_Breakout_-_ICM_20948_-_Arduino_Library/src/ICM_20948.h" // Click here to get the library: http://librarymanager/All#SparkFun_ICM_20948_IMU

// using namespace std;
// // #define USE_SPI       // Uncomment this to use SPI

// #define SERIAL_PORT Serial

// #define SPI_PORT SPI // Your desired SPI port.       Used only when "USE_SPI" is defined
// #define CS_PIN 2     // Which pin you connect CS to. Used only when "USE_SPI" is defined

// #define WIRE_PORT Wire // Your desired Wire port.      Used when "USE_SPI" is not defined
// #define AD0_VAL 1      // The value of the last bit of the I2C address.                \
//                        // On the SparkFun 9DoF IMU breakout the default is 1, and when \
//                        // the ADR jumper is closed the value becomes 0

// ICM_20948_I2C myICM; // Otherwise create an ICM_20948_I2C object

// void printScaledAGMT(ICM_20948_I2C *);
// void printRawAGMT(ICM_20948_AGMT_t);

// void setup()
// {

//   SERIAL_PORT.begin(115200);
//   while (!SERIAL_PORT)
//   {
//   };

// #ifdef USE_SPI
//   SPI_PORT.begin();
// #else
//   WIRE_PORT.begin();
//   // WIRE_PORT.setClock(400000);
// #endif

//   // myICM.enableDebugging(); // Uncomment this line to enable helpful debug messages on Serial

//   bool initialized = false;
//   while (!initialized)
//   {

// #ifdef USE_SPI
//     myICM.begin(CS_PIN, SPI_PORT);
// #else
//     myICM.begin(WIRE_PORT, AD0_VAL);
// #endif

//     cout << "Initialization of the sensor returned: ";
//     cout << myICM.statusString() << endl;
//     if (myICM.status != ICM_20948_Stat_Ok)
//     {
//       cout << "Trying again..." << endl;
//       delay(500);
//     }
//     else
//     {
//       initialized = true;
//     }
//   }
// }

// void loop()
// {

//   if (myICM.dataReady())
//   {
//     myICM.getAGMT();          // The values are only updated when you call 'getAGMT'
//     printRawAGMT(myICM.agmt); // Uncomment this to see the raw values, taken directly from the agmt structure
//     // printScaledAGMT(&myICM); // This function takes into account the scale settings from when the measurement was made to calculate the values with units
//     delay(30);
//   }
//   else
//   {
//     cout << "Waiting for data" << endl;
//     delay(500);
//   }
// }

// // Below here are some helper functions to print the data nicely!

// void printPaddedInt16b(int16_t val)
// {
//   if (val > 0)
//   {
//     cout << " ";
//     if (val < 10000)
//     {
//       cout << "0";
//     }
//     if (val < 1000)
//     {
//       cout << "0";
//     }
//     if (val < 100)
//     {
//       cout << "0";
//     }
//     if (val < 10)
//     {
//       cout << "0";
//     }
//   }
//   else
//   {
//     cout << "-";
//     if (abs(val) < 10000)
//     {
//       cout << "0";
//     }
//     if (abs(val) < 1000)
//     {
//       cout << "0";
//     }
//     if (abs(val) < 100)
//     {
//       cout << "0";
//     }
//     if (abs(val) < 10)
//     {
//       cout << "0";
//     }
//   }
//   cout << abs(val);
// }

// void printRawAGMT(ICM_20948_AGMT_t agmt)
// {
//   cout << "RAW. Acc [ ";
//   printPaddedInt16b(agmt.acc.axes.x);
//   cout << ", ";
//   printPaddedInt16b(agmt.acc.axes.y);
//   cout << ", ";
//   printPaddedInt16b(agmt.acc.axes.z);
//   cout << " ], Gyr [ ";
//   printPaddedInt16b(agmt.gyr.axes.x);
//   cout << ", ";
//   printPaddedInt16b(agmt.gyr.axes.y);
//   cout << ", ";
//   printPaddedInt16b(agmt.gyr.axes.z);
//   cout << " ], Mag [ ";
//   printPaddedInt16b(agmt.mag.axes.x);
//   cout << ", ";
//   printPaddedInt16b(agmt.mag.axes.y);
//   cout << ", ";
//   printPaddedInt16b(agmt.mag.axes.z);
//   cout << " ], Tmp [ ";
//   printPaddedInt16b(agmt.tmp.val);
//   cout << " ]";
//   cout << endl;
// }

// void printFormattedFloat(float val, uint8_t leading, uint8_t decimals)
// {
//   float aval = abs(val);
//   if (val < 0)
//   {
//     cout << "-";
//   }
//   else
//   {
//     cout << " ";
//   }
//   for (uint8_t indi = 0; indi < leading; indi++)
//   {
//     uint32_t tenpow = 0;
//     if (indi < (leading - 1))
//     {
//       tenpow = 1;
//     }
//     for (uint8_t c = 0; c < (leading - 1 - indi); c++)
//     {
//       tenpow *= 10;
//     }
//     if (aval < tenpow)
//     {
//       cout << "0";
//     }
//     else
//     {
//       break;
//     }
//   }
//   if (val < 0)
//   {
//     cout << -val;
//   }
//   else
//   {
//     cout << val;
//   }
// }

// void printScaledAGMT(ICM_20948_I2C *sensor)
// {
//   cout << "Scaled. Acc (mg) [ ";
//   printFormattedFloat(sensor->accX(), 5, 2);
//   cout << ", ";
//   printFormattedFloat(sensor->accY(), 5, 2);
//   cout << ", ";
//   printFormattedFloat(sensor->accZ(), 5, 2);
//   cout << " ], Gyr (DPS) [ ";
//   printFormattedFloat(sensor->gyrX(), 5, 2);
//   cout << ", ";
//   printFormattedFloat(sensor->gyrY(), 5, 2);
//   cout << ", ";
//   printFormattedFloat(sensor->gyrZ(), 5, 2);
//   cout << " ], Mag (uT) [ ";
//   printFormattedFloat(sensor->magX(), 5, 2);
//   cout << ", ";
//   printFormattedFloat(sensor->magY(), 5, 2);
//   cout << ", ";
//   printFormattedFloat(sensor->magZ(), 5, 2);
//   cout << " ], Tmp (C) [ ";
//   printFormattedFloat(sensor->temp(), 5, 2);
//   cout << " ]";
//   cout << endl;
// }

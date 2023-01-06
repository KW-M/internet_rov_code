/****************************************************************
 * Example6_DMP_Quat9_Orientation.ino
 * ICM 20948 Arduino Library Demo
 * Initialize the DMP based on the TDK InvenSense ICM20948_eMD_nucleo_1.0 example-icm20948
 * Paul Clark, April 25th, 2021
 * Based on original code by:
 * Owen Lyke @ SparkFun Electronics
 * Original Creation Date: April 17 2019
 *
 * ** This example is based on InvenSense's _confidential_ Application Note "Programming Sequence for DMP Hardware Functions".
 * ** We are grateful to InvenSense for sharing this with us.
 *
 * ** Important note: by default the DMP functionality is disabled in the library
 * ** as the DMP firmware takes up 14301 Bytes of program memory.
 * ** To use the DMP, you will need to:
 * ** Edit ICM_20948_C.h
 * ** Uncomment line 29: #define ICM_20948_USE_DMP
 * ** Save changes
 * ** If you are using Windows, you can find ICM_20948_C.h in:
 * ** Documents\Arduino\libraries\SparkFun_ICM-20948_ArduinoLibrary\src\util
 *
 * Please see License.md for the license information.
 *
 * Distributed as-is; no warranty is given.
 ***************************************************************/

#include "Fused_Compass_IMU.h"
#include <cstdio>

union Pressure_Union
{
  // Byte [2:0]: Pressure data, Byte [5:3]: Temperature data
  uint8_t Bytes[icm_20948_DMP_Pressure_Bytes];
  struct
  {
    int16_t Pressure;    // Proabably pressure in mpa?
    uint8_t PSomething;  // Unknown Byte
    int16_t Temperature; // Probably temperature in c once converted: see sparkfun lib getTempC function()
    uint8_t TSomething;  // Unknown Byte
  } Data;
};

void print_binary(void *n, size_t size)
{
  uint8_t *byte = (uint8_t *)n;
  for (size_t i = 0; i < size; i++)
  {
    for (int j = 7; j >= 0; j--)
    {
      printf("%d", (byte[i] >> j) & 1);
    }
    printf(" ");
  }
  printf("\n");
}

Fused_Compass_IMU::Fused_Compass_IMU()
{
  this->current_data = Fused_Compass_Data{.quat = {0, 0, 0, 0}, .quat_accuracy = 0, .temp_c = 0};
}

bool Fused_Compass_IMU::setup_sensor()
{
  WIRE_PORT.begin();
  // WIRE_PORT.setClock(400000);
  // myICM.enableDebugging(); // Uncomment this line to enable helpful debug messages on Serial

  // Initialize the ICM-20948
  // If the DMP is enabled, .begin performs a minimal startup. We need to configure the sample mode etc. manually.
  ICM_20948_Status_e status;
  this->myICM.begin(WIRE_PORT, AD0_VAL);
  if (this->is_status_error(myICM.status, "Compass IMU connection error: "))
    return false; // Should wait 0.5 second and try again

  cout << "Compass IMU Connected!" << endl;

  // Initialize the DMP. initializeDMP is a weak function. You can overwrite it if you want to e.g. to change the sample rate
  status = this->myICM.initializeDMP();
  if (this->is_status_error(status, "Compass IMU init error: "))
    return false; // Should wait 0.5 second and try again

  // DMP sensor options are defined in ICM_20948_DMP.h
  //    INV_ICM20948_SENSOR_ACCELEROMETER               (16-bit accel)
  //    INV_ICM20948_SENSOR_GYROSCOPE                   (16-bit gyro + 32-bit calibrated gyro)
  //    INV_ICM20948_SENSOR_RAW_ACCELEROMETER           (16-bit accel)
  //    INV_ICM20948_SENSOR_RAW_GYROSCOPE               (16-bit gyro + 32-bit calibrated gyro)
  //    INV_ICM20948_SENSOR_MAGNETIC_FIELD_UNCALIBRATED (16-bit compass)
  //    INV_ICM20948_SENSOR_GYROSCOPE_UNCALIBRATED      (16-bit gyro)
  //    INV_ICM20948_SENSOR_STEP_DETECTOR               (Pedometer Step Detector)
  //    INV_ICM20948_SENSOR_STEP_COUNTER                (Pedometer Step Detector)
  //    INV_ICM20948_SENSOR_GAME_ROTATION_VECTOR        (32-bit 6-axis quaternion)
  //    INV_ICM20948_SENSOR_ROTATION_VECTOR             (32-bit 9-axis quaternion + heading accuracy)
  //    INV_ICM20948_SENSOR_GEOMAGNETIC_ROTATION_VECTOR (32-bit Geomag RV + heading accuracy)
  //    INV_ICM20948_SENSOR_GEOMAGNETIC_FIELD           (32-bit calibrated compass)
  //    INV_ICM20948_SENSOR_GRAVITY                     (32-bit 6-axis quaternion)
  //    INV_ICM20948_SENSOR_LINEAR_ACCELERATION         (16-bit accel + 32-bit 6-axis quaternion)
  //    INV_ICM20948_SENSOR_ORIENTATION                 (32-bit 9-axis quaternion + heading accuracy)

  // Enable the DMP orientation sensor
  status = this->myICM.enableDMPSensor(INV_ICM20948_SENSOR_ORIENTATION);
  if (this->is_status_error(status, "Compass IMU enable DMP Sensor error: "))
    return false; // Should wait 0.5 second and try again

  // status = this->myICM.enableDMPSensor(INV_ICM20948_SENSOR_GEOMAGNETIC_ROTATION_VECTOR);
  // if (this->is_status_error(status, "Compass IMU enable Geomag Sensor error: "))
  //   return false; // Should wait 0.5 second and try again

  // Enable any additional sensors / features
  // success &= (myICM.enableDMPSensor(INV_ICM20948_SENSOR_RAW_GYROSCOPE) == ICM_20948_Stat_Ok);
  // success &= (myICM.enableDMPSensor(INV_ICM20948_SENSOR_RAW_ACCELEROMETER) == ICM_20948_Stat_Ok);
  // success &= (myICM.enableDMPSensor(INV_ICM20948_SENSOR_MAGNETIC_FIELD_UNCALIBRATED) == ICM_20948_Stat_Ok);

  // Configuring DMP to output data at multiple ODRs:
  // DMP is capable of outputting multiple sensor data at different rates to FIFO.
  // Setting value can be calculated as follows:
  // Value = (DMP running rate / ODR ) - 1
  // E.g. For a 5Hz ODR rate when DMP is running at 55Hz, value = (55/5) - 1 = 10.
  status = this->myICM.setDMPODRrate(DMP_ODR_Reg_Quat9, 0); // Set to the maximum
  // status = this->myICM.setDMPODRrate(DMP_ODR_Reg_Geomag, 0); // Set to the maximum
  // success &= (myICM.setDMPODRrate(DMP_ODR_Reg_Accel, 0) == ICM_20948_Stat_Ok); // Set to the maximum
  // success &= (myICM.setDMPODRrate(DMP_ODR_Reg_Gyro, 0) == ICM_20948_Stat_Ok); // Set to the maximum
  // success &= (myICM.setDMPODRrate(DMP_ODR_Reg_Gyro_Calibr, 0) == ICM_20948_Stat_Ok); // Set to the maximum
  // success &= (myICM.setDMPODRrate(DMP_ODR_Reg_Cpass, 0) == ICM_20948_Stat_Ok); // Set to the maximum
  // success &= (myICM.setDMPODRrate(DMP_ODR_Reg_Cpass_Calibr, 0) == ICM_20948_Stat_Ok); // Set to the maximum
  if (this->is_status_error(status, "Compass IMU set ODR rate error: "))
    return false; // Should wait 0.5 second and try again

  // Enable the FIFO
  status = this->myICM.enableFIFO();
  if (this->is_status_error(status, "Compass IMU Enable FIFO error: "))
    return false; // Should wait 0.5 second and try again

  // Enable the DMP
  status = this->myICM.enableDMP();
  if (this->is_status_error(status, "Compass IMU Enable DMP error: "))
    return false; // Should wait 0.5 second and try again

  // Reset DMP
  status = this->myICM.resetDMP();
  if (this->is_status_error(status, "Compass IMU Reset DMP error: "))
    return false; // Should wait 0.5 second and try again

  // Reset FIFO
  status = this->myICM.resetFIFO();
  if (this->is_status_error(status, "Compass IMU Reset FIFO error: "))
    return false; // Should wait 0.5 second and try again

  // Return success
  return true;
}

Fused_Compass_Data Fused_Compass_IMU::read_sensor()
{
  icm_20948_DMP_data_t data;
  ICM_20948_Status_e status;
  do
  {
    // Read any DMP data waiting in the FIFO
    // Note:
    //    readDMPdataFromFIFO will return ICM_20948_Stat_FIFONoDataAvail if no data is available.
    //    If data is available, readDMPdataFromFIFO will attempt to read _one_ frame of DMP data.
    //    readDMPdataFromFIFO will return ICM_20948_Stat_FIFOIncompleteData if a frame was present but was incomplete
    //    readDMPdataFromFIFO will return ICM_20948_Stat_Ok if a valid frame was read.
    //    readDMPdataFromFIFO will return ICM_20948_Stat_FIFOMoreDataAvail if a valid frame was read _and_ the FIFO contains more (unread) data.

    myICM.readDMPdataFromFIFO(&data);
    status = this->myICM.status;
    if ((status == ICM_20948_Stat_Ok) || (status == ICM_20948_Stat_FIFOMoreDataAvail)) // Was valid data available?
    {
      if ((data.header & DMP_header_bitmap_Quat9) > 0) // We have asked for orientation data so we should receive Quat9
      {
        // Q0 value is computed from this equation: Q0^2 + Q1^2 + Q2^2 + Q3^2 = 1.
        // In case of drift, the sum will not add to 1, therefore, quaternion data need to be corrected with right bias values.
        // The quaternion data is scaled by 2^30.

        // Scale to +/- 1
        double q1 = ((double)data.Quat9.Data.Q1) / 1073741824.0; // Convert to double. Divide by 2^30
        double q2 = ((double)data.Quat9.Data.Q2) / 1073741824.0; // Convert to double. Divide by 2^30
        double q3 = ((double)data.Quat9.Data.Q3) / 1073741824.0; // Convert to double. Divide by 2^30
        double q0 = pow(1.0 - ((q1 * q1) + (q2 * q2) + (q3 * q3)), 0.5);

        this->current_data.quat[0] = q0;
        this->current_data.quat[1] = q1;
        this->current_data.quat[2] = q2;
        this->current_data.quat[3] = q3;
        this->current_data.quat_accuracy = data.Quat9.Data.Accuracy;
        // // , .temp_c = 0};
        // cout << "Q1:";
        // cout << q1;
        // cout << " Q2:";
        // cout << q2;
        // cout << " Q3:";
        // cout << q3;
        // cout << " Q0:";
        // cout << q0;
        // cout << " Accuracy:";
        // cout << data.Quat9.Data.Accuracy << endl;
      }
      else if ((data.header & DMP_header_bitmap_Pressure) > 0)
      { // We have asked for pressure data so we should receive Pressure
        // this.current_data.pressure = data;
        // Byte [2:0]: Pressure data, Byte [5:3]: Temperature data

        // cout << "Raw Pres/Temp from DMP: ";
        // print_binary(data.Pressure, 6);
        // cout << endl;
        // Pressure_Union *pdata = (Pressure_Union *)data.Pressure;
        // cout << "Pressure from DMP: " << pdata->Data.Pressure << endl;
        // cout << "Temperature from DMP: " << pdata->Data.Temperature << endl;
      }
      else if ((data.header & DMP_header_bitmap_Geomag) > 0)
      {
        // cout << "Geomag data is here! " << endl;
        // // Scale to +/- 1
        // double q1 = ((double)data.Geomag.Data.Q1) / 1073741824.0; // Convert to double. Divide by 2^30
        // double q2 = ((double)data.Geomag.Data.Q2) / 1073741824.0; // Convert to double. Divide by 2^30
        // double q3 = ((double)data.Geomag.Data.Q3) / 1073741824.0; // Convert to double. Divide by 2^30
        // double q0 = pow(1.0 - ((q1 * q1) + (q2 * q2) + (q3 * q3)), 0.5);

        // this->current_data.quat[0] = q0;
        // this->current_data.quat[1] = q1;
        // this->current_data.quat[2] = q2;
        // this->current_data.quat[3] = q3;
        // this->current_data.quat_accuracy = data.Geomag.Data.Accuracy;
        // cout << "Geomag: " << q1 << " " << q2 << " " << q3 << " " << q0 << " " << endl;
      }
      else
      {
        cout << "Compass Received Unknown Data Header: 0x"; // Print the header in HEX so we can see what data is arriving in the FIFO
        if (data.header < 0x1000)
          cout << "0"; // Pad the zeros
        if (data.header < 0x100)
          cout << "0";
        if (data.header < 0x10)
          cout << "0";
        printf("%x", data.header);
        cout << " More data: " << (status == ICM_20948_Stat_FIFOMoreDataAvail) << endl;
      }
    }

    // If more data is available then we should read it right away - and not delay
  } while (status == ICM_20948_Stat_FIFOMoreDataAvail);

  // Return the current data
  return this->current_data;
}

bool Fused_Compass_IMU::cleanup()
{
  ICM_20948_Status_e status = this->myICM.swReset(); // make sure the ICM-20948 is in a known state
  return !(this->is_status_error(myICM.status, "Compass IMU sw reset error: "));
}

bool Fused_Compass_IMU::is_status_error(ICM_20948_Status_e status, const char *msg)
{
  if (status != ICM_20948_Stat_Ok)
  {
    cout << msg << ": ";
    cout << this->myICM.statusString(status) << endl;
    return true;
  }
  return false;
}

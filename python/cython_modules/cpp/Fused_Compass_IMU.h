#include "piduinoFixes.h"
#include "ICM_20948.h"
using namespace std;

#define WIRE_PORT Wire // Your desired Wire I2C library.
#define AD0_VAL 1      // The value of the last bit of the I2C address.                \
                      // On the SparkFun 9DoF IMU breakout the default is 1, and when \
                      // the ADR jumper is closed the value becomes 0

typedef struct s_Fused_Compass_Data
{
    double quat[4];
    double quat_accuracy;
    double temp_c;
} Fused_Compass_Data;

class Fused_Compass_IMU
{
public:
    Fused_Compass_IMU();
    bool setup_sensor();
    Fused_Compass_Data read_sensor();
    Fused_Compass_Data current_data;
    ICM_20948_I2C myICM; // create an ICM_20948_I2C object
    bool is_status_error(ICM_20948_Status_e status, const char *msg);
};

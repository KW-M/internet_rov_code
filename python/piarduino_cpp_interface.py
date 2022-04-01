

async def setup_arduino_sensor_interface():
    return ms5803py.MS5803()
async def read_arduino_sensor_interface(sensor_connection):

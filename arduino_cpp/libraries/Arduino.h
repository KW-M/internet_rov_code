#include <iostream>
using namespace std;

#include "arduPi/arduPi.h"
typedef SerialCout Stream;
typedef const char __FlashStringHelper;
void pgm_read_byte_near(const char *addr)
{
    return *addr
}
#define F(str) (reinterpret_cast<const char *>(str))
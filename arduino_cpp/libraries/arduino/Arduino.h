/*
  Arduino.h - Main include file for the Arduino SDK
  Copyright (c) 2014 Arduino LLC.  All right reserved.

  This library is free software; you can redistribute it and/or
  modify it under the terms of the GNU Lesser General Public
  License as published by the Free Software Foundation; either
  version 2.1 of the License, or (at your option) any later version.

  This library is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
  Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public
  License along with this library; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

#ifndef Arduino_h
#define Arduino_h

#include <iostream>

#include "arduPi/arduPi.h"
// #include "api/Stream.h"
typedef SerialPi Stream;
typedef WirePi TwoWire;
typedef SPIPi SPIClass;

typedef enum
{
  SPI_MODE0 = 0,
  SPI_MODE1 = 1,
  SPI_MODE2 = 2,
  SPI_MODE3 = 3,
} SPIMode;

class SPISettings
{
public:
  SPISettings(uint32_t clock, BitOrder bitOrder, SPIMode dataMode)
  {
    init_MightInline(clock, bitOrder, dataMode);
  }

  SPISettings(uint32_t clock, BitOrder bitOrder, int dataMode)
  {
    init_MightInline(clock, bitOrder, (SPIMode)dataMode);
  }

  // Default speed set to 4MHz, SPI mode set to MODE 0 and Bit order set to MSB first.
  SPISettings() { init_AlwaysInline(4000000, MSBFIRST, SPI_MODE0); }

  bool operator==(const SPISettings &rhs) const
  {
    if ((this->clockFreq == rhs.clockFreq) &&
        (this->bitOrder == rhs.bitOrder) &&
        (this->dataMode == rhs.dataMode))
    {
      return true;
    }
    return false;
  }

  bool operator!=(const SPISettings &rhs) const
  {
    return !(*this == rhs);
  }

  uint32_t getClockFreq() const
  {
    return clockFreq;
  }
  SPIMode getDataMode() const
  {
    return dataMode;
  }
  BitOrder getBitOrder() const
  {
    return (bitOrder);
  }

private:
  void init_MightInline(uint32_t clock, BitOrder bitOrder, SPIMode dataMode)
  {
    init_AlwaysInline(clock, bitOrder, dataMode);
  }

  // Core developer MUST use an helper function in beginTransaction() to use this data
  void init_AlwaysInline(uint32_t clock, BitOrder bitOrder, SPIMode dataMode) __attribute__((__always_inline__))
  {
    this->clockFreq = clock;
    this->dataMode = dataMode;
    this->bitOrder = bitOrder;
  }

  uint32_t clockFreq;
  SPIMode dataMode;
  BitOrder bitOrder;
};

const SPISettings DEFAULT_SPI_SETTINGS = SPISettings();

class __FlashStringHelper;
const char *pgm_read_byte_near(const char *addr)
{
  return addr;
}

// undefine the F() macro normally used to store strings in arduino program memory
#ifdef F
#undef F
#endif

#define F(str) (reinterpret_cast<const char *>(str))

using namespace arduino;

// undefine stdlib's abs if encountered
#ifdef abs
#undef abs
#endif // abs

#define abs(x) ((x) > 0 ? (x) : -(x))

#endif // Arduino_h

#include <iostream>
using namespace std;

class SerialCout
{
public:
    SerialCout()
    {
    }
    static void begin(int baud)
    {
        // Serial.begin(baud);
    }
    static void print(const char *str)
    {
        std::cout << str;
    }
    static void print(const float num, const int precision)
    {
        std::cout << num;
    }
    template <typename T>
    static void print(const T num)
    {
        std::cout << num;
    }
    template <typename T>
    static void print(const T num, const int precision)
    {
        std::cout << num;
    }
    static void println(const char *str)
    {
        std::cout << str << std::endl;
    }
    static void println(const float num, const int precision)
    {
        std::cout << num << std::endl;
    }
    template <typename T>
    static void println(const T num)
    {
        std::cout << num << std::endl;
    }
    template <typename T>
    static void println(const T num, const int precision)
    {
        std::cout << num << std::endl;
    }
};
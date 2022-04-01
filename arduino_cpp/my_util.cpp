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
        cout << str;
    }
    static void print(const float num, const int precision)
    {
        cout << num;
    }
    template <typename T>
    static void print(const T num)
    {
        cout << num;
    }
    template <typename T>
    static void print(const T num, const int precision)
    {
        cout << num;
    }
    static void println(const char *str)
    {
        cout << str << endl;
    }
    static void println(const float num, const int precision)
    {
        cout << num << endl;
    }
    template <typename T>
    static void println(const T num)
    {
        cout << num << endl;
    }
    template <typename T>
    static void println(const T num, const int precision)
    {
        cout << num << endl;
    }
};
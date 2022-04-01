#include <iostream>
using namespace std;

/* SerialPiStdout Class
 * Class that provides the functionality of arduino Serial class but outputs to standard output
 */
class SerialPiStdout
{

private:
    char *int2bin(int i);
    char *int2hex(int i);
    char *int2oct(int i);

public:
    SerialPiCout();
    void begin(int serialSpeed);
    int available();
    char read();
    int readBytes(char message[], int size);
    int readBytesUntil(char character, char buffer[], int length);
    bool find(const char *target);
    bool findUntil(const char *target, const char *terminal);
    long parseInt();
    float parseFloat();
    char peek();
    void print(const char *message);
    void print(char message);
    void print(unsigned char i, Representation rep);
    void print(float f, int precission);
    void println(const char *message);
    void println(char message);
    void println(int i, Representation rep);
    void println(float f, int precission);
    int write(unsigned char message);
    int write(const char *message);
    int write(char *message, int size);
    void flush();
    void setTimeout(long millis);
    void end();
};

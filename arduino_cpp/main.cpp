// Include arduPi library
#include "libraries/arduPi.h"

/*********************************************************
 *  IF YOUR ARDUINO CODE HAS OTHER FUNCTIONS APART FROM  *
 *  setup() AND loop() YOU MUST DECLARE THEM HERE        *
 * *******************************************************/

/**************************
 * YOUR ARDUINO CODE HERE *
 * ************************/

void setup()
{
    cout << "Hello World!" << endl;
}

void loop()
{
    cout << "Hello Next!" << endl;
    delay(1000);
}

/**************************
 * main function is used to recreate the behavior of the  Arduino defualt setup() and loop() functions
 **************************/
int main()
{
    setup();
    while (1)
    {
        loop();
    }
    return (0);
}
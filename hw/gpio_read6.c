/*
 * Author: Thomas Ingleby <thomas.c.ingleby@intel.com>
 * Copyright (c) 2014 Intel Corporation.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

#include "stdio.h"
#include "unistd.h"

#include "mraa.h"

int
main(int argc, char** argv)
{
    int last1 = 0;
    int last2 = 0;
    mraa_init();
    fprintf(stdout, "MRAA Version: %s\nStarting Read on IO6\n", mraa_get_version());

    //! [Interesting]
    mraa_gpio_context gpio1;
    mraa_gpio_context gpio2;

    gpio1 = mraa_gpio_init(4);
    gpio2 = mraa_gpio_init(2);

    mraa_gpio_dir(gpio1, MRAA_GPIO_IN);
    mraa_gpio_dir(gpio2, MRAA_GPIO_IN);

    for (;;) {
        //fprintf(stdout, "Gpio is %d\n", mraa_gpio_read(gpio));
	int pinlvl1 = mraa_gpio_read(gpio1);
	int pinlvl2 = mraa_gpio_read(gpio2);
	if (pinlvl1 == 1 && last1 == 0)
	{
		printf("Read Sign\n");
		system("node /home/user/smarthat/picToSpeech/itowave_spanish.js /home/user/smarthat/pic.png speech.wav && espeak -a 1 -v en \"aaaaaaa\" && aplay speech.wav");
		last1 = 1;
		sleep(3);
	}
	if (pinlvl1 == 0 && last1 == 1)
	{
		last1 = 0;
	}
	if (pinlvl2 == 1 && last2 == 0)
	{
		printf("Twilio\n");
                system("node /home/user/smarthat/twilio/index.js \"Help me Obi-Ben Kenobi\" \"2109136206\" \"5127745577\"");
		last2 = 1;
		sleep(3);
	}
	if (pinlvl2 == 0 && last2 == 1)
	{
		last2 = 0;
	}
	usleep(50 * 1000);
    }

    mraa_gpio_close(gpio1);
    mraa_gpio_close(gpio2);
    //! [Interesting]

    return 0;
}

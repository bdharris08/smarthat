// node kill_blink.js [pin]

var m = require('mraa'); //require mraa

var pin = parseInt(process.argv[2]) || 27;
var myLed = new m.Gpio(pin); //onboard LED

myLed.dir(m.DIR_OUT); //set the gpio direction to output

myLed.write(0);

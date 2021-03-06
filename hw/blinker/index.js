// node index.js [pin] [ms delay] [maxIterator]

var m = require('mraa'); //require mraa

var pin = parseInt(process.argv[2]) || 27;
var myLed = new m.Gpio(pin); //onboard LED
console.log(pin);
myLed.dir(m.DIR_OUT); //set the gpio direction to output
var ledState = true; //Boolean to hold the state of Led

var iterator = 0;
var maxIterator = parseInt(process.argv[4]) || 100000; // 0 for false

function periodicActivity()
{
  myLed.write(ledState?1:0); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
  ledState = !ledState; //invert the ledState
  iterator++;

  if (iterator < maxIterator) {
    setTimeout(periodicActivity, parseInt(process.argv[3]) || 1000); //call the indicated function after 1 second (1000 milliseconds)
  }
}

periodicActivity(); //call the periodicActivity function

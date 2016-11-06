var mraa = require('mraa');
console.log('MRAA Version: ' + mraa.getVersion());

var analogPin0 = new mraa.Aio(0);
var analogPin1 = new mraa.Aio(1);
var analogPin2 = new mraa.Aio(2);
var analogPin3 = new mraa.Aio(3);

setTimeout(function(){
console.log(analogPin0.read());
console.log(analogPin1.read());
console.log(analogPin2.read());
console.log(analogPin3.read());
}, 1000);

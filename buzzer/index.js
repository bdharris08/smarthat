var five = require("johnny-five");
var Joule = require("joule-io");
var board = new five.Board({
  io: new Joule()
});

board.on("ready", function() {
  var led = new five.Led(26); // 26 = GPIO, PWM 0
  led.blink(500);
});

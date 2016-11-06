var player = require('play-sound')(opts = {})

player.play('speech.wav', function(err){
  if (err) {
    console.log(err);
  }
});

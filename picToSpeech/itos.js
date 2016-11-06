//ITOS - Image to Speak
// - Assuming image in this folder,
// - send to google to get ocr
// - receive text back
// - play it using espeak

const vision = require('@google-cloud/vision');
const config = require('./config/config');
const exec = require('child_process').execSync;

const img = process.argv[2];
const espeak = `espeak -s 150 -v en` //ubuntu
const say = `say -v Fred` //osx

const visionClient = vision({
  projectId: config.projectId,
  keyFilename: './config/keyfile.json'
});

const imgToSpeech = function(img) {
  visionClient.detectText(img).then((data) => {
    const text = data[0][0].replace(/(\n)/gm, ' ');
    //console.log(data)
    console.log(`text ${text}`);
    exec(`${espeak} ${text}`, (err, stdout, stderr) => {
      if (stderr) {
        console.log(stderr)
      }
    })
  }).catch((err) => {
    console.log(err);
  })
};

imgToSpeech(img)

module.export = imgToSpeech;

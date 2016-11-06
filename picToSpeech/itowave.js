//ITOS - Image to wav
// - Assuming image in this folder,
// - send to google to get ocr
// - send text to bluemix to get wav file
// - save resultant base64 blob as wav file

const vision = require('@google-cloud/vision');
const config = require('./config/config');
const openWhisk = require('../bluemix/ow_api/openwhisk.js');

const img = process.argv[2];

const visionClient = vision({
  projectId: config.projectId,
  keyFilename: './config/keyfile.json'
});

const imgToWav = function(img) {
  visionClient.detectText(img).then((data) => {
    const text = data[0][0].replace(/(\n)/gm, ' ');
    openWhisk.invokeTTS(text, '../picToSpeech/speech.wav', (err, res) => {
      if(err) console.log(err)
      else console.log(res)
    })
  }).catch((err) => {
    console.log(err);
  })
};

imgToWav(img);

module.export = imgToWav;

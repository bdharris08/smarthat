
const vision = require('@google-cloud/vision');
const config = require('./config/config');
const openWhisk = require('../bluemix/ow_api/openwhisk.js')

const visionClient = vision({
  projectId: config.projectId,
  keyFilename: './config/keyfile.json'
});

const imgToSpeech = function(imagePath) {
  visionClient.detectText(imagePath).then((data) => {
    const text = data[0][0];
    console.log(text)
    openWhisk.invokeTTS(text, (err, res) => {
      if (err) console.log(err)
      else console.log(res)
    })
  }).catch((err) => {
    console.log(err);
  })
};

const imgToFrench = function(imagePath) {
  visionClient.detectText(imagePath).then((data) => {
    const text = data[0][0];
    console.log(text)
    openWhisk.invokeTranslate(text, (err, res) => {
      if (err) console.log(err)
      else openWhisk.invokeTTS(res, (err, res) => {
        if (err) console.log(err)
        else console.log(res)
      })
    })
  }).catch((err) => {
    console.log(err);
  })
};

const imgLabelToSpeech = function(imagePath) {
  visionClient.detectLabels(imagePath, { verbose: true }).then((data) => {
    const labels = data[0];
    const apiResponse = data[1];
    for (var i = 0; i < labels.length; i++) {
      console.log(labels[i])
    }
    //console.log(`detectLabels(): ${labels}`);
  })
  .catch((err) => {
    console.log(err);
  });
}

const imgDetectToSpeech = function(image) {

}

//imgLabelToSpeech('./hr.jpg')

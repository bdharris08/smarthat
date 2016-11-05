const vision = require('@google-cloud/vision');
const config = require('./config/config');

const visionClient = vision({
  projectId: config.projectId,
  keyFilename: './config/keyfile.json'
});

visionClient.detectText('./cf.jpg').then((data) => {
  const text = data[0];
  const apiResponse = data[1];

  console.log(`detectText(): ${text}`);
})
.catch((err) => {
  console.log(err);
});

visionClient.detectLabels('./cf.jpg', { verbose: true }).then((data) => {
  const labels = data[0];
  const apiResponse = data[1];

  console.log(`detectLabels(): ${labels}`);
})
.catch((err) => {
  console.log(err);
});

visionClient.detect('./cf.jpg', ['label']).then((data) => {
  const detections = data[0];
  const apiResponse = data[1];

  console.log(`detect(): ${detections}`);
}).catch((err) => {
  console.log(err);
});

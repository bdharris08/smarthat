

var openwhisk = require('openwhisk');
var stream = require('stream');
var wav = require('wav');
var Speaker = require('speaker');
var base64 = require('base64-stream');

var ow = openwhisk(require('./ow_cred.json'))

//list resources
var listActions = function() {
  ow.actions.list().then(function (data) {
    console.log(data)
  }).catch(function (err) {
    console.log(err)
  })
};

var streamify = function(text) {
  var s = new stream.Readable();
  s.push(text);
  s.push(null);
  return s;
};

var invokeTTS = function(payload, callback) {
  ow.actions.invoke({
    actionName: 'textToSpeech-smart-hat',
    blocking: true,
    params: {
      message: payload
    }
  }).then(function(res) {
    payload = res.response.result.payload;
    var reader = new wav.Reader();
    reader.on('format', function (format) {
      // the WAVE header is stripped from the output of the reader
      reader.pipe(new Speaker(format));
    });
    streamify(payload).pipe(base64.decode()).pipe(reader);
    callback(null, 'success');
  }).catch(function(err) {
    callback(err, null);
  });
};

var invokeTranslate = function(payload, callback) {
  ow.actions.invoke({
    actionName: 'translate-smart-hat',
    blocking: true,
    params: {
      message: payload
    }
  }).then(function(res) {
    payload = res.response.result.payload;
    callback(null, payload)
  }).catch(function(err) {
    callback(err, null);
  })
};

var invokeHelloWorld = function(payload) {
  ow.actions.invoke({
    actionName: 'Hello World With Params',
    blocking: true,
    params: {
      message: payload
    }
  }).then(function(res) {
    console.log(res)
  }).catch(function(err){
    console.log(err)
  })
}

module.exports = {invokeTTS, invokeTranslate};

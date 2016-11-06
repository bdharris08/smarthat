

var openwhisk = require('openwhisk');
var fs = require('fs');
var stream = require('stream');
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

var invokeTTS = function(payload, filepath, callback) {
  ow.actions.invoke({
    actionName: 'textToSpeech-smart-hat',
    blocking: true,
    params: {
      message: payload
    }
  }).then(function(res) {
    payload = res.response.result.payload;
    streamify(payload).pipe(base64.decode()).pipe(fs.createWriteStream(filepath));
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

var invokeSpanishToWav = function(payload, callback) {
  ow.actions.invoke({
    actionName: 'translate-spanish-smart-hat',
    blocking: true,
    params: {
      message: payload
    }
  }).then(function(res) {
    payload = res.response.result.payload;
    console.log(payload)
  }).catch(function(err) {
    callback(err, null);
  });
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

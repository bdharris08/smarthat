

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

var invokeTTS = function(payload) {
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
    //var snd = new Audio("data:audio/wav;base64," + payload);
    //snd.play();
  }).catch(function(err) {
    console.log(err)
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

invokeTTS("hi my name is Joule")

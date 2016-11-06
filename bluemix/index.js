var openWhisk = require('./ow_api/openwhisk.js');


//openWhisk.invokeTranslate('hello', (err, res) => {
//  if (err) console.log(err)
//  else openWhisk.invokeTTS(res, (err, res) => {
//    if (err) console.log(err)
//    else console.log(res)
//  })
//})


openWhisk.invokeSpanishTranslate('hola mi nombre es Ben', (err, res) => {
  if (err) console.log(err)
  else openWhisk.invokeTTS(res, 'something.wav', (err, res) => {
    if (err) console.log(err)
    else console.log(res)
  });
});



var openwhisk = require('openwhisk');

var ow = openwhisk(require('./ow_cred.json'))



//list resources
ow.actions.list().then(function (data) {
  //console.log(data)
}).catch(function (err) {
  console.log(err)
})

ow.actions.invoke({
  actionName: 'Hello World With Params',
  blocking: true,
  params: {
    message: "sup"
  }
}).then(function(res) {
  console.log(res)
})

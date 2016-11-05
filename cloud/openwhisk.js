

var openwhisk = require('openwhisk');



var ow = openwhisk({
  api: 'https://openwhisk.ng.bluemix.net/api/v1/',
  api_key: 'aa933a0a-8bb7-447d-bc68-012bb2bbbec8:Jv9qZXNneht10ooJhqMIiHQv9M1qSnqOX3ti0MeEX5eGJ3jSi48ZPjURTBaq4Qvm',
  namespace: 'Cloud Competitive Analysis_cca-test'
})

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

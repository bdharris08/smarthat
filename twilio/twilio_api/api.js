const config = require('./config');
const client = require('twilio')(config.ACCOUNT_SID, config.AUTH_TOKEN);

const sendMessage = function sendMessage(message, toNumber, fromNumber) {
  client.sendMessage({
    to: toNumber,
    from: fromNumber,
    body: message
  }, function(err, responseData) {
    //this function is executed when a response is received from Twilio
    if (!err) {
      console.log(responseData.from);
      console.log(responseData.body);
    }
  });
}

exports.sendMessage = sendMessage;

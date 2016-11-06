const twilioAPI = require('./twilio_api/api');

const message = process.argv[2];
const toNumber = process.argv[3];
const fromNumber = process.argv[4];

twilioAPI.sendMessage(message, toNumber, fromNumber);

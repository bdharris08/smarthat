const twilioAPI = require('./twilio_api/api');

const message = 'word to your mother';
const toNumber = '+1-123-123-1234';
const fromNumber = '+1-123-132-1234';

twilioAPI.sendMessage(message, toNumber, fromNumber);

# Twilio API

## Getting Started
1. Create `twilio_api/config.js` using the template found in `twilio_api/config_template.js`
2. Fill out your config details
3. Send a message using twilio by following the example found in index.js

```
const twilioAPI = require('./twilio_api/api');

const message = 'word to your mother';
const toNumber = '+1-123-123-1234';
const fromNumber = '+1-123-132-1234';

twilioAPI.sendMessage(message, toNumber, fromNumber);
```
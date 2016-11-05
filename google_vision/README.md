# Google Vision API

## Getting Started
1. Create `config/config.js` using the template found in `config/config_template.js`
2. Create `config/keyfile.json` using the template found in `config/keyfile_template.json` (get this credential from google developer console)
3. Fill out your config details for both files

```
visionClient.detectText('./cf.jpg');
visionClient.detectLabels('./cf.jpg', { verbose: true });
visionClient.detect('./cf.jpg', ['label']);
```

Each of these methods return a promise as a callback.
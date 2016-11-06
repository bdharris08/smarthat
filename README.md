# smarthat

Run these commands in the root directory

## Image with english => spanish wav file

```
// node picToSpeech/itowave_spanish.js [path to image file] [path to generated wav file]
$node picToSpeech/itowave_spanish.js picToSpeech/small.jpg test3.wav
```

## Image with english => english wav file

```
// node picToSpeech/itowave.js [path to image file] [path to generated wav file]
$node picToSpeech/itowave.js picToSpeech/small.jpg test3.wav
```

## Play wav file (Ubuntu)
```
// aplay [wav file]
$aplay test3.wav
```

## Send twilio message

```
// node twilio/index.js [message] [to number] [from number]
$node twilio/index.js "word to your mother." "123-123-1234" "111-111-1111"
```
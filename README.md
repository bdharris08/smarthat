# smarthat
## A Sir Hacksalot team project

Disclaimer: This is the result of a weekend hackathon on the Intel Joule and is not yet in an easily usable state.
We will be working to improve this over time, but for now, use this only as a reference.

Contributing: You are welcome to contribute code using the [Github Flow](https://guides.github.com/introduction/flow/)
See issues for some ideas.

## Requirements:
- Intel Joule with sensor kit and Real Sense camera
- IBM Bluemix account [(free Trial available)](https://www.ibm.com/bluemix)
- Google cloud account
- Twilio account
- A hat and some method of fastening
- (optional) a battery pack with barrel adapter that can power the Joule

## Usage: (under construction)

0. [Set up your Joule](https://software.intel.com/en-us/first-time-setup-for-joule) with Ubuntu 16 (Xenial Xerus)

1. Install Git on the Joule
   ```
   $ sudo apt-get update
   $ sudo apt-get install git
   ```
2. Install Node (6.x LTS) on the Joule
   ```
   $ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -   
   $ sudo apt-get install -y nodejs  
   ```
3. From the github website, fork this repo to your own github account using the fork button on the top right.
4. Clone your new repo to the board - [Instructions](https://help.github.com/articles/cloning-a-repository/)
5. Set up your free [Bluemix trial account](https://www.ibm.com/bluemix)
7. Set up an OpenWhisk instance, translation service, and text to speech service (instructions on the way)
8. Set up Google account
9. Set up Google Vision (instructions on the way)
10. Navigate to the folder where you cloned the repository
11. Install dependencies in bluemix, google_vision, picToSpeech, playWavFile, twilio folders
   ```
   $ npm install
   ```
12. Refer to below instructions on how to get each service running
... To be continued ...

## Image with english or spanish => english wav file

```
// node picToSpeech/itowave_spanish.js [path to image file] [path to generated wav file]
$ node picToSpeech/itowave_spanish.js picToSpeech/small.jpg test3.wav
```

## Image with english => english wav file

```
// node picToSpeech/itowave.js [path to image file] [path to generated wav file]
$ node picToSpeech/itowave.js picToSpeech/small.jpg test3.wav
```

## Play wav file (Ubuntu)
```
// aplay [wav file]
$ aplay test3.wav
```

## Send twilio message

```
// node twilio/index.js [message] [to number] [from number]
$ node twilio/index.js "word to your mother." "123-123-1234" "111-111-1111"
```

## Trigger left blinker (GPIO 6)
```
// Requires sudo because of GPIO
$ sudo sh blinker/blink_left.sh
```

## Trigger right blinker (GPIO 8)
```
// Requires sudo because of GPIO
$ sudo sh blinker/blink_right.sh
```

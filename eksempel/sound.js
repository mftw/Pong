// window.AudioContext = window.AudioContext || window.webkitAudioContext;

// Create Web Audio Context.
var context = new AudioContext(),
    currentOscillator;

var context;
window.addEventListener('load', init, false);
function init() {
    try {
        // Fix up for prefixing
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        context = new AudioContext(),
        currentOscillator;
    } catch (e) {
        alert('Web Audio API is not supported in this browser');
    }
}

// function BufferLoader(context, urlList, callback) {
//     this.context = context;
//     this.urlList = urlList;
//     this.onload = callback;
//     this.bufferList = new Array();
//     this.loadCount = 0;
//   }
  
//   BufferLoader.prototype.loadBuffer = function(url, index) {
//     // Load buffer asynchronously
//     var request = new XMLHttpRequest();
//     request.open("GET", url, true);
//     request.responseType = "arraybuffer";
  
//     var loader = this;
  
//     request.onload = function() {
//       // Asynchronously decode the audio file data in request.response
//       loader.context.decodeAudioData(
//         request.response,
//         function(buffer) {
//           if (!buffer) {
//             alert('error decoding file data: ' + url);
//             return;
//           }
//           loader.bufferList[index] = buffer;
//           if (++loader.loadCount == loader.urlList.length)
//             loader.onload(loader.bufferList);
//         },
//         function(error) {
//           console.error('decodeAudioData error', error);
//         }
//       );
//     }
  
//     request.onerror = function() {
//       alert('BufferLoader: XHR error');
//     }
  
//     request.send();
//   }
  
//   BufferLoader.prototype.load = function() {
//     for (var i = 0; i < this.urlList.length; ++i)
//     this.loadBuffer(this.urlList[i], i);
//   }

// var context = new AudioContext(); // webkit prefixed for now.

// var oscillator = context.createOscillator();
// // oscillator.type = oscillator.SQUARE; // Change oscillator to produce a square wave.
// oscillator.type = 'sine'; // Change oscillator to produce a square wave.
// oscillator.connect(context.destination); // Connect our oscillator to the speakers.
// console.dir(oscillator.type)
// oscillator.noteOn(1); // Start the oscillator playing after 0 seconds.
// oscillator.noteOff(2); // Stop the oscillator after 0 seconds.
// There are other values you can change the oscillator to, 
// such as ‘SAWTOOTH’ and ‘TRIANGLE’. You may want to customize your 
// stylophone by using a different type of wave.

// var gainNode = context.createGain();


// // gainNode.value = 0.25;
// console.dir(gainNode);
// gainNode.gain.value = 0.3;

// oscillator.connect(gainNode); // Connect our oscillator to the Gain Node. 
// gainNode.connect(context.destination);

// // Create keyboard using Qwerty Hancock.
// var keyboard = qwertyHancock({
    //     id: 'keyboard',
    //     height: 100,
    //     width: 568,
    //     startNote: 'A2',
    //     octaves: 1.7,
    //     whiteKeyColour: '#eee',
    //     blackKeyColour: '#ddd',
    //     blackKeyWidth: 40,
    //     blackKeyHeight: 60,
    //     hoverColour: 'silver',
    //     keyboardLayout: 'en'
    // });
// oscillator.start(1 playNote(1000)); // Start the oscillator playing after 0 seconds.
// oscillator.stop(2); // Stop the oscillator after 0 seconds.
// playNote(400, 0.5);
// playNote(500, 0.1);
// stopNote(1);
    
// var playNote = function (frequency) {
//     // Create oscillator and gain node.
//     var oscillator = context.createOscillator();
//     var gainNode = context.createGain();

//     // Disconnect existing oscillator if there is one.
//     if (currentOscillator) {
//         currentOscillator.disconnect();
//     }

//     // Set the type and frequency of the oscillator.
//     oscillator.type = 'square';
//     oscillator.frequency.value = frequency;

//     // Set volume of the oscillator.
//     gainNode.gain.value = 0.3;

//     // Route oscillator through gain node to speakers.
//     oscillator.connect(gainNode);
//     gainNode.connect(context.destination);

//     // Set the current oscillator to the one we've just created.
//     currentOscillator = oscillator;

//     // Start oscillator playing.
//     oscillator.start(0); // This will be replaced by start() soon.
// };

// setTimeout(playNote(400, 1), 1000);
// setTimeout(playNote(500, 1), 1000);

function playNote(frequency, time) {
    // Create oscillator and gain node.
    var oscillator = context.createOscillator();
    var gainNode = context.createGain();

    // Disconnect existing oscillator if there is one.
    if (currentOscillator) {
        currentOscillator.disconnect();
    }

    // Set the type and frequency of the oscillator.
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;

    // Set volume of the oscillator.
    gainNode.gain.value = 1;

    // Route oscillator through gain node to speakers.
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    // Set the current oscillator to the one we've just created.
    currentOscillator = oscillator;

    // Start oscillator playing.
    oscillator.start(time); // This will be replaced by start() soon.
    oscillator.stop(time*2); // This will be replaced by start() soon.
    console.log('hej');
};

// var stopNote = function () {
//     // Stop the current Oscillator from playing then disconnect it.
//     currentOscillator.stop(0); // This will be replace by stop() soon.
//     currentOscillator.disconnect();
// };

function stopNote(time) {
    // Stop the current Oscillator from playing then disconnect it.
    currentOscillator.stop(time); // This will be replace by stop() soon.
    currentOscillator.disconnect();
};

// playNote(50);
// stopNote();

// // On-screen key down event.
// keyboard.keyDown(function (note, frequency) {
//     playNote(frequency);
// });

// // On-screen key up event.
// keyboard.keyUp(function (note, frequency) {
//     stopNote();
// });


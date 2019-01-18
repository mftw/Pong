var bane = document.getElementById('bane');
bane.centerX = parseFloat(bane.getBBox().width / 2);
bane.centerY = parseFloat(bane.getBBox().height / 2);

var bold = document.getElementById('Cocunut');
bold.ballSize = parseFloat(bold.firstElementChild.getAttribute('r'));


// bold.ballSize = bold.firstElementChild.firstElementChild.getAttribute('ry') * 2;
// bold.ballSize = bold.firstElementChild.getAttribute('r') * 2;
// console.log(bold.ballSize);

function moveSection(idStr, xOffset, yOffset, extras = '') {
    var domElemnt;
    if (typeof idStr === 'object') {
        domElemnt = idStr;
    } else {
        domElemnt = document.getElementById(idStr);
    }
    if (domElemnt) {
        var transformAttr = ' translate(' + xOffset + ', ' + yOffset + ')' + ' ' + extras;
        domElemnt.setAttribute('transform', transformAttr);
    }
}


var game = null;
var x = 0;
var y = 0;
var vx = -1;
var vy = -1;
var acc = 5;

var collisionSoundURL = './pop.mp3';
// var collisionSoundURL = './basketBall.mp3';
// var collisionSoundURL = './basketBall2.mp3';
// var collisionSoundURL = './pingPongBall.mp3';

function startGame() {
    if (game !== null) {
        return;
    }

    game = requestInterval(() => {

        x += vx * acc;
        y += vy * acc;

        // Check bottom and top collisions
        if (y >= (bane.centerY - bold.ballSize) || y <= bold.ballSize - bane.centerY) {
            vy = -vy;
            collisionSound(collisionSoundURL);
            // playBeep(200);
            // console.log('collision x')
        } 

        // Check left and right collisions
        if (x >= bane.centerX || x <= bold.ballSize - bane.centerX) {
            vx = -vx;
            collisionSound(collisionSoundURL);
            // playBeep();
        }

        moveSection(bold, x, y);

    })
}

function stopGame() {
    if (game === null) {
        return;
    }

    clearRequestInterval(game);
    game = null;
}

var startBtn = document.getElementById('start-button');
var stopBtn = document.getElementById('stop-button');
var speedx1Btn = document.getElementById('speedx1');
var speedx2Btn = document.getElementById('speedx2');
var revBtn = document.getElementById('reverse');

startBtn.addEventListener('click', () => {
    startGame();
    // console.log(game)
    TweenMax.resumeAll()
});

stopBtn.addEventListener('click', () => {
    stopGame();
    TweenMax.pauseAll()
});

speedx1Btn.addEventListener('click', () => {
    acc -= 1;
});

speedx2Btn.addEventListener('click', () => {
    acc += 1;
});

revBtn.addEventListener('click', () => {
    vx = -vx;
    vy = -vy;
});

window.requestInterval = function (fn) {

    var handle = new Object();

    function loop() {
        fn.call();

        handle.value = requestAnimationFrame(loop);
    };

    handle.value = requestAnimationFrame(loop);
    return handle;
}

window.clearRequestInterval = function (handle) {
    window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
        window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
        window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
        window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
        window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
        window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
        clearInterval(handle);
};

// https://codepen.io/kulak-at/pen/oqbKpq


var context = null;
var oscillator = null;

function getOrCreateContext() {
    if (!context) {
        context = new AudioContext();
        oscillator = context.createOscillator();
        oscillator.connect(context.destination);
    }
    return context;
}

var isStarted = false;


/**
 * 
 * @param {number} frequency 
 * @param {string} type can be: 'sine', 'triangle', 'square' or 'sawtooth' 
 */
function playNote(frequency, type = 'sine') {
    getOrCreateContext();
    oscillator.type = type;
    oscillator.frequency.setTargetAtTime(frequency, context.currentTime, 0);
    if (!isStarted) {
        oscillator.start(0);
        isStarted = true;
    } else {
        context.resume();
    }
}

function stopNote() {
    context.suspend();
}


var noteTimer = null;
function playBeep(freq = 400, time = 100, type = 'square') {
    clearTimeout(noteTimer);
    playNote(freq, type);
    noteTimer = setTimeout(() => {
        stopNote()
    }, time);
}

// var audio = null;
function collisionSound(sound = '/pop.mp3') {
    var audio = new Audio(sound);
    audio.play();
}

// var tmpX = Math.random() * 2 - 1;
// var tmpY = Math.random() * 2 - 1;
var tmpX = 4;
var tmpY = 3;

// var tmpC = Math.sqrt((tmpX ^ 2) + (tmpY ^ 2));
var tmpC = Math.sqrt(Math.pow(tmpX, 2) + Math.pow(tmpY, 2));

// var sinV = Math.sin( tmpC / tmpX);
// var sinV = tmpC / tmpX;
var sinV = tmpY / tmpC;

// var angle = Math.sin(sinV)*(180/Math.PI);
var angle = Math.sin(sinV) * (180 / Math.PI);


// console.log(tmpX);
// console.log(tmpY);
// console.log(tmpC);
// console.log(sinV);
// console.log(angle);
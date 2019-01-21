// Få fat i bane svg elementet
var bane = document.getElementById('bane');
bane.centerX = parseFloat(bane.getBBox().width / 2);
bane.centerY = parseFloat(bane.getBBox().height / 2);

var bold = document.getElementById('Cocunut');
bold.ballSize = parseFloat(bold.firstElementChild.getAttribute('r'));


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

// This variable contains the game loop
var game = {};
game.started = false;
game.loop = 0;

// Working variables for the game
var x,
    y,
    vx,
    vy,
    acc;

var globalVolume = 0.5;
// var globalVolume = 0;

// Initialize the game variables
initGame();

var collisionSoundURL = './resources/audio/pop.mp3';
// var collisionSoundURL = './resources/audio/basketBall.mp3';
// var collisionSoundURL = './resources/audio/basketBall2.mp3';
// var collisionSoundURL = './resources/audio/pingPongBall.mp3';

function initGame() {
    x = 0;
    y = 0;
    vx = getRandomArbitrary();
    vy = getRandomArbitrary();
    acc = 2.5;

    // if(Math.abs(vy) < 0.5 || Math.abs(vx) < 0.3) {
    //     initGame();
    // }

    // Prevent the ball from 'stalling'
    if(Math.abs(vx) < 0.3) {
        initGame();
    }

    return {
        x: x,
        y: y,
        vx: vx,
        vy: vy,
        acc: acc
    }
}

/**
 *  Get a random number within the range of
 *  min and max. The number is also randomly negative
 * @param {float} min 
 * @param {float} max 
 */
function getRandomArbitrary(min = 0.2, max = 1) {
    if(Math.random() < 0.5) {
        return Math.random() * (max - min) + min;
    } else {
        return -(Math.random() * (max - min) + min);
    }
}



function startGame() {
    // clearTimeout(delayedStartTimer);
    // delayedStartTimer = null;
    game.started = true;
    cancelDelayedStart();

    // if (game.started === false || winnerFound) {
    //     return game.started;
    // }
    if (winnerFound) {
        return game;
    }

    startBgMusic();
    // bgMusic.volume = 0.5 * globalVolume;

    let config = {
        x: x,
        y: y,
        vx: vx,
        vy: vy,
        acc: acc
    }

    // console.log(config)


    // Check which direction the ball is heading,
    // to prevent that the ball is 'sticking' to the side,
    // or the paddles on collisions.
    function whichDir(old, current) {
        if(old < current) {
            return -1;
        } else {
            return 1;
        }
    }

    game.loop = requestInterval( dt => {
        // console.log(dt)
        // console.log(game.loop);
        // cancelDelayedStart();

        if(game.started === false || winnerFound) {
            pauseGame();
            // cancelDelayedStart();
            return;
        }
        // Keep the current value of x and y
        // to determine the direction the ball is heading later on.
        let lastX = x;
        let lastY = y;

        // Calculate new x and y coordinates for the ball
        x += vx * dt * acc;
        y += vy * dt * acc;
        // x += vx * acc;
        // y += vy * acc;

        // Get the direction of the ball.
        let dirx = whichDir(lastX, x);
        let diry = whichDir(lastY, y);

        // Check bottom collision
        if(y >= bane.centerY - bold.ballSize && diry === -1) {
            vy = -vy;
            collisionSound(collisionSoundURL);
            // playBeep(200);
            // console.log('ned');
        }
        
        // Check top collision
        if(y <= bold.ballSize - bane.centerY && diry === 1) {
            vy = -vy;
            collisionSound(collisionSoundURL);
            // console.log('op');
        }

        // Check right collision
        if(x >= bane.centerX && dirx === -1) {
            vx = -vx;
            collisionSound(collisionSoundURL);
            // handleP1Goal();
            // resetAfterPoint();
            // return;
            // playBeep();
            // console.log('højre')
        }

        // Check left collision
        if(x <= bold.ballSize - bane.centerX && dirx === 1) {
            vx = -vx;
            collisionSound(collisionSoundURL);
            // handleP2Goal();
            // resetAfterPoint();
            // return;
            // console.log('venstre')
        }

        // Move the ball with fresh coordinates
        moveSection(bold, x, y);
    })

    return game;
}

function pauseGame(alsoMusic = true) {
    // Check if game is running
    // if not, escape the function
    if(game.started === false || game.started === 'undefined') {
        return;
    }
    if(alsoMusic) {
        pauseBgMusicLoop();
    }
    if(game.loop !== 'undefined') {
        cancelAnimationFrame(game.loop.value);
        // clearRequestInterval(game.loop);
    }
    game.started = false;
    // game = null;
}

function resetGame() {
    pauseGame();
    initGame();
    moveSection(bold, x, y);
    stopBgMusic();
}

function resetAfterPoint(startDelay = 1000) {
    pauseGame(alsoMusic = false);
    // pauseBgMusicLoop();
    initGame();
    moveSection(bold, x, y);
    delayedStart(startDelay);
}

var delayedStartTimer = null;
function delayedStart(delay = 1000) {
    // clearTimeout(delayedStartTimer);
    // delayedStartTimer = null;

    delayedStartTimer = setTimeout(() => {
        startGame();
        // clearTimeout(delayedStartTimer);
        // delayedStartTimer = null;
        cancelDelayedStart();
        console.log('timer fired');
    }, delay)
}

function cancelDelayedStart() {
    clearTimeout(delayedStartTimer);
    delayedStartTimer = null;
}

var startBtn = document.getElementById('start-button');
var stopBtn = document.getElementById('stop-button');
var speedx1Btn = document.getElementById('speedx1');
var speedx2Btn = document.getElementById('speedx2');
var revBtn = document.getElementById('reverse');
var startSvgBtn = document.querySelector('.start-svg')
var userStartedGame = false;

startBtn.addEventListener('click', () => {
    startGame();
    // console.log(game)
    TweenMax.resumeAll()
    userStartedGame = true;
});

stopBtn.addEventListener('click', () => {
    pauseGame();
    TweenMax.pauseAll()
    userStartedGame = false;
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

// startSvgBtn.addEventListener('click', e => {
//     // console.log('you clicked it, didn\'t you?')
//     startGame();
//     // console.log(game)
//     TweenMax.resumeAll()
//     userStartedGame = true;
//     console.log(e)
// });

startSvgBtn.addEventListener('click', handleStartButton);

function handleStartButton(event) {
    let elm = event.target;
    if(game.started === true) {
        pauseGame();
        TweenMax.pauseAll()
        userStartedGame = false;
        elm.innerHTML = 'START'
    } else {
        startGame();
        // console.log(game)
        TweenMax.resumeAll()
        userStartedGame = true;
        elm.innerHTML = 'PAUSE'
    }
}

// document.addEventListener('keypress', (e) => {
//     if(e.key === ' ') {
//         if(!userStartedGame) {
//             startGame()
//             userStartedGame = true;
//             TweenMax.resumeAll();
//         } else {
//             pauseGame();
//             userStartedGame = false;
//             TweenMax.pauseAll();
//         }
//     }
// }, false)

document.addEventListener('visibilitychange', handleVisibilityChange, false);

function handleVisibilityChange() {
    if (document.visibilityState === 'visible' && userStartedGame) {
        startGame()
    } else  {
        pauseGame()
    }
}

var volumeSlider = document.getElementById('volume');
// output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
volumeSlider.oninput = function() {
    // console.log(this.value / 100)
    globalVolume = this.value / 100;
    updateBgMusicVolume();
}

// var lastTime;
window.requestInterval = function (fn) {

    var handle = new Object();
    
    // rAF parses a timestamp of the animation
    // function loop(ms) {
    //     if(handle.lastTime) {
    //         // fn.call((ms - handle.lastTime) / 1000);
    //         fn((ms - handle.lastTime) / 10);
    //     }
    //     handle.lastTime = ms;
    //     handle.value = requestAnimationFrame(loop);
    // };

    // rAF parses a timestamp of the animation
    handle.loop = (ms) => {
        if(handle.lastTime) {
            let dt = ms - handle.lastTime;
            // fn.call();
            // fn((ms - handle.lastTime) / 10);
            fn(dt / 10);
            handle.dt = dt;
        }
        handle.lastTime = ms;
        // handle.dt = ms - handle.lastTime;
        // handle.started = true;
        // handle.value = requestAnimationFrame(loop);
        handle.value = requestAnimationFrame(handle.loop);
    };

    // handle.value = requestAnimationFrame(loop);
    // rAF returns a unique integer per frame, use it to cancelAnimationFrame()
    handle.value = requestAnimationFrame(handle.loop);
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
// var collisionAudio = new Audio('/resources/audio/pop.mp3');
function collisionSound(sound = '/resources/audio/pop.mp3') {
// function collisionSound() {
    var audio = new Audio(sound);
    audio.volume = globalVolume;
    audio.play();
    // collisionAudio.volume = globalVolume;
    // collisionAudio.currentTime = 0;
    // collisionAudio.play();
}

// Make an audio object that contains the nice background music
// var bgMusic = new Audio('./resources/audio/goe.mp3');
var bgMusic = new Audio('./resources/audio/bg-music.mp3');
bgMusic.loop = true;

function startBgMusic(vol = 0.5) {
    bgMusic.play();
    // bgMusic.volume = globalVolume * vol;
    updateBgMusicVolume(vol);
    return bgMusic;
}

function stopBgMusic() {
    // breakBgMusicLoop();
    bgMusic.pause();
    bgMusic.currentTime = 0;
    return bgMusic;
}

function pauseBgMusicLoop() {
    if(bgMusic.paused) {
        // breakBgMusicLoop();
        startBgMusic();
    } else {
        bgMusic.pause();
    }
    return bgMusic;
}

function updateBgMusicVolume(vol = 0.5) {
    bgMusic.volume = globalVolume * vol;
}

// Add a global function that uses requestAnimationFrame
// and has a similar syntax to setInterval, but more performant
window.requestInterval = function (fn) {

    var handle = new Object();

    // rAF parses a timestamp of the animation
    handle.loop = (ms) => {
        if(handle.lastTime) {
            let dt = ms - handle.lastTime;
            fn(dt / 10);
            handle.dt = dt;
        }
        handle.lastTime = ms;
        handle.value = requestAnimationFrame(handle.loop);
    };

    // rAF returns a unique integer per frame, use it to cancelAnimationFrame()
    handle.value = requestAnimationFrame(handle.loop);
    return handle;
}

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

// Få fat i bane svg elementet
var bane = document.getElementById('bane');
bane.centerX = parseFloat(bane.getBBox().width / 2);
bane.centerY = parseFloat(bane.getBBox().height / 2);


var bold = document.getElementById('Cocunut');
bold.ballSize = parseFloat(bold.firstElementChild.getAttribute('r'));

// This variable contains the game loop
var game = {
    started: false,
    loop: 0
};

var ai = {
    // Turns the ai on and off with true and false
    active: true,
    // The lower the more difficult
    difficulty: 3,
}

// Working variables for the game
var x,
    y,
    vx,
    vy,
    acc,
    paddleSens;

// The acceleration added to the ball when it hits the paddles
const ballAccelerationFactor = 0.1;

// The sensitivity added to the paddles when the ball hits.
const paddleSensAccelerationFactor = 0.005;



var globalVolume = 0.5;
// var globalVolume = 0;

const collisionSoundURL = './resources/audio/pop.mp3';
const paddleCollisionSoundURL = './resources/audio/boing.mp3';
const scoreSoundURL = './resources/audio/god-fuck.mp3';
const backgroundMusicURL = './resources/audio/bg-music.mp3';
// var collisionSoundURL = './resources/audio/basketBall.mp3';
// var collisionSoundURL = './resources/audio/basketBall2.mp3';
// var collisionSoundURL = './resources/audio/pingPongBall.mp3';

// Make an audio object that contains the nice background music
var bgMusic = new Audio(backgroundMusicURL);
bgMusic.loop = true;

// Initialize the game variables
initGame();

// Initialize the music
initBgMusic();

// Start the game loop without starting the game
startGame();

function initGame(alsoMusic = false) {
    x = 0;
    y = 0;
    vx = getRandomArbitrary();
    vy = getRandomArbitrary();
    acc = 5;
    paddleSens = 8;
    
    // Prevent the ball from 'stalling' with a steep angle
    if(Math.abs(vx) < 0.3) {
        initGame();
    }

    if(alsoMusic) {
        initBgMusic();
    }

    return {
        x: x,
        y: y,
        vx: vx,
        vy: vy,
        acc: acc,
        paddleSens: paddleSens
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

    let config = {
        x: x,
        y: y,
        vx: vx,
        vy: vy,
        acc: acc
    }

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

        if(game.started === false || winnerFound) {
            // pauseGame();
            // cancelDelayedStart();
            // stopBgMusic();
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

        // Check if a players are moving paddles
        if(paddleLeftPos <= bane.centerY - paddleLeft.halfHeight && 
            (keyPressed.paddleLeftDown || ai.active)) {

            if(ai.active && diry === 1) {
                paddleLeftPos = y / ai.difficulty;
            } else {
                paddleLeftPos += paddleSens;
            }
        }
        
        if(paddleLeftPos >= paddleLeft.halfHeight - bane.centerY && 
            (keyPressed.paddleLeftUp || ai.active)) {

            if(ai.active && diry === -1) {
                paddleLeftPos = y / ai.difficulty;
                // console.log
            } else {
                paddleLeftPos -= paddleSens;
            }
        }
        
        if(paddleRightPos <= bane.centerY - paddleRight.halfHeight && keyPressed.paddleRightDown) {
            paddleRightPos += paddleSens;
        }
        
        if(paddleRightPos >= paddleRight.halfHeight - bane.centerY && keyPressed.paddleRightUp) {
            paddleRightPos -= paddleSens;
        }

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
        }

        // Check right collision
        if(x >= bane.centerX + 100 && dirx === -1) {
            vx = -vx;
            collisionSound(scoreSoundURL);
            handleP1Goal();
            resetAfterPoint();
        }
        
        // Check left collision
        // if(x <= bold.ballSize - bane.centerX && dirx === 1) {
        if(x <= -bane.centerX - 100 && dirx === 1) {
            vx = -vx;
            // collisionSound(collisionSoundURL);
            collisionSound(scoreSoundURL);

            handleP2Goal();
            resetAfterPoint();
        }

        // Check right paddle collision
        if  (x + bold.ballSize > bane.centerX - paddleRight.gotWidth &&
            x < bane.centerX && 
            y > paddleRightPos - paddleRight.halfHeight && 
            y < paddleRightPos + paddleRight.halfHeight && 
            dirx === -1 ) {
            // console.log('right' + dt)

            vy = (paddleRightPos * 7) / 900;  
            
            // Reverse that direction
            vx = -vx;

            // Accelerate ball for more stressful fun
            acc += ballAccelerationFactor;

            // Play music faster for even more stressful fun
            // bgMusic.playbackRate += 0.005;

            // It's only fair to make the paddles faster
            // when we make the ball faster ;)
            paddleSens += paddleSensAccelerationFactor;

            // Play nice sound when player hits
            collisionSound(paddleCollisionSoundURL);
        }
        
        // Check left paddle collisions
        if  (x - bold.ballSize < paddleLeft.gotWidth - bane.centerX && 
            x > -(bane.centerX) &&
            y > paddleLeftPos - paddleLeft.halfHeight && 
            y < paddleLeftPos + paddleLeft.halfHeight && 
            dirx === 1 ) {
            // console.log('left' + dt)
            vy = (paddleLeftPos * 7) / 900;  

            // Reverse that direction
            vx = -vx;
            
            // Accelerate ball for more stressful fun
            acc += ballAccelerationFactor;

            // Play music faster for even more stressful fun
            // bgMusic.playbackRate += 0.005;

            // It's only fair to make the paddles faster
            // when we make the ball faster ;)
            paddleSens += paddleSensAccelerationFactor;

            // Play nice sound when player hits
            collisionSound(paddleCollisionSoundURL);
        }

        // Move the ball with fresh coordinates
        moveSection(bold, x, y);

        // Move the paddles with fresh coordinates
        moveSection(paddleLeft, 0, paddleLeftPos);
        moveSection(paddleRight, 0, paddleRightPos);
    })
    return game;
}



function pauseGame(alsoMusic = true) {
    // Check if game is running
    // if not, escape the function
    if(game.started === false || game.started === 'undefined') {
        return;
    }
    // if(alsoMusic) {
    //     pauseBgMusicLoop();
    // }
    if(game.loop !== 'undefined') {
        cancelAnimationFrame(game.loop.value);
        // clearRequestInterval(game.loop);
    }
    game.started = false;
    // game = null;
}

function resetGame() {
    // pauseGame(alsoMusic);
    game.started = false;
    userStartedGame = false;
    resetPaddles();
    stopBgMusic();
    initGame();
    moveSection(bold, x, y);
}

function resetAfterPoint(startDelay = 1000) {
    x = 0;
    y = 0;
    vx = 0;
    vy = 0;
    resetPaddles();
    setTimeout(initGame, startDelay)
}


var startBtn = document.getElementById('start-button');
var userStartedGame = false;

startBtn.addEventListener('click', () => {
    // startGame();
    game.started = true;
    // console.log(game)
    TweenMax.resumeAll()
    userStartedGame = true;
});


var stopBtn = document.getElementById('stop-button');

stopBtn.addEventListener('click', () => {
    pauseGame();
    TweenMax.pauseAll()
    userStartedGame = false;
});


var speedx1Btn = document.getElementById('speedx1');

speedx1Btn.addEventListener('click', () => {
    acc -= 1;
});


var speedx2Btn = document.getElementById('speedx2');

speedx2Btn.addEventListener('click', () => {
    acc += 1;
});


var revBtn = document.getElementById('reverse');

revBtn.addEventListener('click', () => {
    vx = -vx;
    vy = -vy;
});


var startSvgBtn = document.getElementById('play');
var pauseSvgBtn = document.getElementById('pause');

startSvgBtn.addEventListener('click', handleStartButton);
pauseSvgBtn.addEventListener('click', handleStartButton);

function handleStartButton() {
    
    if(game.started === true) {
        startSvgBtn.style.display = 'block';
        pauseSvgBtn.style.display = 'none';
        bgMusic.pause();
        game.started = false;
        TweenMax.pauseAll()
        userStartedGame = false;
    } else {
        startSvgBtn.style.display = 'none';
        pauseSvgBtn.style.display = 'block';
        bgMusic.play();
        game.started = true;
        TweenMax.resumeAll()
        userStartedGame = true;
    }
}

var soundSvgBtn = document.getElementById('Sound');
var muteSvgBtn = document.getElementById('mute');

soundSvgBtn.addEventListener('click', handleMuteButton);
muteSvgBtn.addEventListener('click', handleMuteButton);

var lastVol = 0;

function handleMuteButton() {

    if(bgMusic.volume > 0) {
        muteSvgBtn.style.display = 'block';
        soundSvgBtn.style.display = 'none';
        bgMusic.volume = 0;
        lastVol = globalVolume;
        globalVolume = 0;
    } else {
        muteSvgBtn.style.display = 'none';
        soundSvgBtn.style.display = 'block';
        globalVolume = lastVol;
        updateBgMusicVolume();
    }

}

var resetSvgBtn = document.getElementById('reset');
resetSvgBtn.addEventListener('click', handleResetButton);

// var startTime = new Date();
// var handleResetButton = () => {
function handleResetButton() {
    // let caller = this.caller;
    // console.log(caller);
    // alert("caller is " + caller); 
    // alert(new Date() - startTime)
    userStartedGame = false;
    game.started = false;
    startSvgBtn.style.display = 'block';
    pauseSvgBtn.style.display = 'none';
    resetScoreboard();
    resetGame()
    resetWinAni()    
}

// document.addEventListener('visibilitychange', handleVisibilityChange, false);

function handleVisibilityChange() {
    if (document.visibilityState !== 'visible' && userStartedGame) {
        startSvgBtn.style.display = 'block';
        pauseSvgBtn.style.display = 'none';
        bgMusic.pause();
        TweenMax.pauseAll();
        game.started = false;
    } 
}

document.addEventListener('keypress', e => {
    if(e.key === ' ') {
        e.preventDefault();
        handleStartButton();
    }
})


var mouseTimeout;
document.onmousemove = () => {
    document.body.classList.remove('no-cursor');
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {
        document.body.classList.add('no-cursor')
    }, 5000);
}

var volumeSlider = document.getElementById('volume');
// output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
volumeSlider.oninput = function() {
    globalVolume = this.value / 100;
    updateBgMusicVolume();
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


function collisionSound(sound = '/resources/audio/pop.mp3', vol = 1) {
    var audio = new Audio(sound);
    audio.volume = globalVolume * vol;
    audio.play();
}


function startBgMusic(vol = 0.5) {
    bgMusic.play();
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

function initBgMusic() {
    bgMusic.pause();
    bgMusic.playbackRate = 1;
    bgMusic.currentTime = 0;
    updateBgMusicVolume();
}

function updateBgMusicVolume(vol = 0.5) {
    bgMusic.volume = globalVolume * vol;
}

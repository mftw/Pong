var paddleLeft = document.getElementById('paddleLeft');

paddleLeft.gotHeight = paddleLeft.getBBox().height;
paddleLeft.halfHeight = paddleLeft.gotHeight / 2;

paddleLeft.gotWidth = paddleLeft.getBBox().width;
paddleLeft.halfWidth = paddleLeft.gotWidth / 2;

var paddleRight = document.getElementById('paddleRight');

paddleRight.gotHeight = paddleRight.getBBox().height;
paddleRight.halfHeight = paddleRight.gotHeight / 2;

paddleRight.gotWidth = paddleLeft.getBBox().width;
paddleRight.halfWidth = paddleLeft.gotWidth / 2;

// synchronize paddle posisition, in case graphics team hasn't
paddleRight.setAttribute('y', paddleLeft.getAttribute('y'));

var paddleLeftPos = 0;
var paddleRightPos = 0;

const keys = {
    paddleLeftUp: 'w',
    paddleLeftDown: 's',
    paddleRightUp: 'ArrowUp',
    paddleRightDown: 'ArrowDown',
    pauseGame: ' '
}

var keyPressed = {
    paddleLeftUp: false,       
    paddleLeftDown: false,
    paddleRightUp: false,
    paddleRightDown: false,
    pauseGame: false,
}

document.addEventListener('keydown', e => {
    for (const key in keys) {
        // Check if key is part of prototype
        if(!keys.hasOwnProperty(key)) {
            continue;
        }

        if(e.key === keys[key]) {
            e.preventDefault()
            keyPressed[key] = true;
        }
    }
});

document.addEventListener('keyup', e => {
    for (const key in keys) {
        // Check if key is part of prototype
        if(!keys.hasOwnProperty(key)) {
            continue;
        }

        if(e.key === keys[key]) {
            e.preventDefault()
            keyPressed[key] = false;
        }
    }
});

function resetPaddles() {
    paddleLeftPos = 0;
    paddleRightPos = 0;
    moveSection(paddleLeft, 0, 0);
    moveSection(paddleRight, 0, 0);
}
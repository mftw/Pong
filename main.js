var bane = document.getElementById('bane');
bane.centerX = bane.getBBox().width / 2;
bane.centerY = bane.getBBox().height / 2;

var bold = document.getElementById('Coconut');

bold.ballSize = bold.firstElementChild.firstElementChild.getAttribute('ry') * 2;

function moveSection(idStr, xOffset, yOffset) {
    var domElemnt = document.getElementById(idStr);
    if (domElemnt) {
        var transformAttr = ' translate(' + xOffset + ',' + yOffset + ')';
        domElemnt.setAttribute('transform', transformAttr);
    }
}

function moveBall() {
    moveSection("Coconut", x, y);
}


var game = null;
var x = 0;
var y = 0;
var vx = -1;
var vy = -1;
var acc = 1;

function startGame() {
    if(game !== null) {
        return;
    }

    game = requestInterval(() => {
        x = x + vx * acc;
        y = y + vy * acc;
        // var thisLoop = new Date;
        // var fps = 1000 / (thisLoop - lastLoop);
    
        // Check bottom 
        if(y >= bane.centerY || y <= -bane.centerY + bold.ballSize) {
            vy = -vy;
            console.log('collision x')
        } 
            
        if(x >= bane.centerX || x <= -bane.centerX + (bold.ballSize / 2)) {
        // if(x >= bane.centerX || x <= -bane.centerX + bold.ballSize) {
            vx = -vx;
            console.log('collision y')
        }

        moveSection("Coconut", x, y);

    }, 1000/60)
    // }, 100)
}

function stopGame() {
    // clearInterval(game)
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
    console.log(game)
});

stopBtn.addEventListener('click', () => {
    stopGame();
});

speedx1Btn.addEventListener('click', () => {
    acc -= 1;
});

speedx2Btn.addEventListener('click', () => {
    acc += 2;
});

revBtn.addEventListener('click', () => {
    vx = -vx;
    vy = -vy;
});

window.requestInterval = function(fn) {

	var handle = new Object();
		
	function loop() {
        fn.call();

		handle.value = requestAnimationFrame(loop);
	};
	
	handle.value = requestAnimationFrame(loop);
	return handle;
}

window.clearRequestInterval = function(handle) {
    window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
    window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
    window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
    window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
    window.oCancelRequestAnimationFrame	? window.oCancelRequestAnimationFrame(handle.value) :
    window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
    clearInterval(handle);
};





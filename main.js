
// function Input(el){
//     var parent = el,
//         map = {},
//         intervals = {};

//     function ev_kdown(ev)
//     {
//         map[ev.key] = true;
//         ev.preventDefault();
//         return;
//     }

//     function ev_kup(ev)
//     {
//         map[ev.key] = false;
//         ev.preventDefault();
//         return;
//     }

//     function key_down(key)
//     {
//         return map[key];
//     }

//     function keys_down_array(array)
//     {
//         for(var i = 0; i < array.length; i++)
//             if(!key_down(array[i]))
//                 return false;

//         return true;
//     }

//     function keys_down_arguments()
//     {
//         return keys_down_array(Array.from(arguments));
//     }

//     function clear()
//     {
//         map = {};
//     }

//     function watch_loop(keylist, callback)
//     {
//         return function(){
//             if(keys_down_array(keylist))
//                 callback();
//         }
//     }

//     function watch(name, callback)
//     {
//         var keylist = Array.from(arguments).splice(2);

//         // intervals[name] = setInterval(watch_loop(keylist, callback), 1000/24);
//         intervals[name] = setInterval(watch_loop(keylist, callback), 60);
//     }

//     function unwatch(name)
//     {
//         clearInterval(intervals[name]);
//         delete intervals[name];
//     }

//     function detach()
//     {
//         parent.removeEventListener("keydown", ev_kdown);
//         parent.removeEventListener("keyup", ev_kup);
//     }

//     function attach()
//     {
//         parent.addEventListener("keydown", ev_kdown);
//         parent.addEventListener("keyup", ev_kup);
//     }

//     function Input()
//     {
//         attach();

//         return {
//             key_down: key_down,
//             keys_down: keys_down_arguments,
//             watch: watch,
//             unwatch: unwatch,
//             clear: clear,
//             detach: detach
//         };
//     }

//     return Input();
// }

// var input_area = Input(document);
// // var i = 0;


// input_area.watch("secret", function(){
//     // txt.value += "FIVE ";
//     // console.log('hey!!! ' + i)
//     // i++;
//     window.location = 'https://www.google.com';
// }, "Control", "5");


// input_area.watch("w", function(){
//     // txt.value += "FIVE ";
//     console.log('w ' + i)
//     // keys('w', top, bund);
//     i++;
// }, 'w');

// input_area.watch("s", function(){
//     // txt.value += "FIVE ";
//     console.log('s ' + i)
//     i++;
// }, 's');

// ArrowUp = input_area.watch("ArrowUp", function(){
//     // txt.value += "FIVE ";
//     console.log('ArrowUp ' + i)
//     i++;
// }, 'ArrowUp');

// ArrowDown = input_area.watch("ArrowDown", function(){
//     // txt.value += "FIVE ";
//     console.log('ArrowDown ' + i)
//     i++;
// }, 'ArrowDown');

// input_area.watch("dump", function(){
//     console.dir(w);
//     console.dir(s);
//     console.dir(ArrowUp);
//     console.dir(ArrowDown);

// }, "Control", "d");

// setInterval(() => {
//     console.log(w);
//     console.log(s);
//     console.log(ArrowUp);
//     console.log(ArrowDown);
// }, 1000);

// document.addEventListener('keypress', e => console.log(e));
// getComputedStyle

// var map = {}; // You could also use an array
// onkeydown = onkeyup = function(e){
//     e = e || event; // to deal with IE
//     map[e.keyCode] = e.type == 'keydown';
//     /* insert conditional here */
// }

var bane = document.getElementById('bane');
bane.centerX = bane.getBBox().width / 2;
bane.centerY = bane.getBBox().height / 2;

var bold = document.getElementById('Coconut');
bold.ballSize = bold.firstElementChild.firstElementChild.getAttribute('ry') * 2;
// bold.ballSize = bold.firstElementChild.firstElementChild.getAttribute('ry');

console.log(bane.centerY)
console.log(bane.centerY - bold.ballSize)
// console.dir(bold.firstElementChild.firstElementChild.getAttribute('ry') / 2);
// console.log(bold.ballSize);

// console.log(bane.getBBox().width);
// console.log(bane.getBBox().height);
// console.log(bane.centerY);
// console.log(bane.centerX);

function moveSection(idStr, xOffset, yOffset) {
    var domElemnt = document.getElementById(idStr);
    if (domElemnt) {
        var transformAttr = ' translate(' + xOffset + ',' + yOffset + ')';
        domElemnt.setAttribute('transform', transformAttr);
    }
}

// function checkBounderies(x) {

// }

function moveBall() {
    moveSection("Coconut", x, y);
}


// moveSection("Coconut", 0, -bane.centerY);
// moveSection("Coconut", -bane.centerX, 0);

var x = 0;
var y = 0;
var vx = -1;
var vy = -1;
var acc = 1;


var game = null;
var lastLoop = new Date;
// var thisLoop = new Date;
// var fps = 1000 / (thisLoop - lastLoop);


function startGame() {
    // game = setInterval(() => {
    //     moveSection("Coconut", x, y);
    //     x = x + vx * acc;
    //     y = y + vy * acc;
    
    //     // Check bottom 
    //     if(y >= bane.centerY || y <= -bane.centerY + bold.ballSize) {
    //         vy = -vy;
    //         console.log('collision x')
    //     } 
            
    //     if(x >= bane.centerX || x <= -bane.centerX + (bold.ballSize / 2)) {
    //         vx = -vx;
    //         console.log('collision y')
    //     }

    // }, 1000/60)
    // stopGame();

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

window.requestAnimFrame = (function() {
	return  window.requestAnimationFrame       || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame    || 
		window.oRequestAnimationFrame      || 
		window.msRequestAnimationFrame     || 
		function(/* function */ callback, /* DOMElement */ element){
			window.setTimeout(callback, 1000 / 60);
		};
})();

window.requestInterval = function(fn, delay) {
	if( !window.requestAnimationFrame       && 
		!window.webkitRequestAnimationFrame && 
		!(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
		!window.oRequestAnimationFrame      && 
		!window.msRequestAnimationFrame)
			return window.setInterval(fn, delay);
			
	var start = new Date().getTime();
	var handle = new Object();
		
	function loop() {
		var current = new Date().getTime(),
			delta = current - start;
			
		if(delta >= delay) {
			fn.call();
			start = new Date().getTime();
		}
        fn.call();

		handle.value = requestAnimFrame(loop);
		// handle.value = requestAnimationFrame(loop);
	};
	
	handle.value = requestAnimFrame(loop);
	// handle.value = requestAnimationFrame(loop);
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





//SAVES THE ID OF LEFT PADDLE TO A CONSTANT

const player1Id = document.getElementById('paddleLeft');
// console.log(player1Id);

//SAVES THE ID OF RIGHT PADDLE TO A CONSTANT PLAYER1ID
const player2Id = document.getElementById('paddleRight');


//EXTRACT THE STRING POSTION OF PADDLE FOR PLAYER ONE AND CONVERTS THE STRING TO A FLOAT
let playerone = player1Id.getAttribute("y", "x");


//EXTRACT THE STRING POSTION OF PADDLE FOR PLAYER TWO AND CONVERTS THE STRING TO A FLOAT
let playertwo = player2Id.getAttribute("y", "x");


//MOVES THE PADDLES ON X AXE
// player1Id.setAttribute('x', 381);

// player2Id.setAttribute('x', 1549);

//FUNCTION RESETS THE PADDLES TO THE CENTER OF THE VIEWPORT
function resetPaddles() {
  moveSection(player1Id, 0, paddleLeftPos = 0);
  moveSection(player2Id, 0, paddleLeftPos = 0);

//   alert("Player reset");
}

//KEYBOARD INPUT TO USE FOR PLAYER ONE AND PLAYER TWO PADDLES, IS SAVED TO A VARIABLE AS AN OBJECT
var keyOption = {
  UPPLAYONE: "w",
  DOWNPLAYONE: "s",
  UPPLAYTWO: "ArrowUp",
  DOWNPLAYTWO: "ArrowDown"
}
var Top = 0;
var Bottom = 0;

//INIT FUNCTION GETS TOP AND BOTTOM PARAMETERS FROM HTML.
function init(top, bottom) {

  Top = top;
  Bottom = bottom;

}

//GETS THE ID FOR THE CANVAS

var bane = document;

//USES FUNCTION THAT CONTROLS THE KEYS
var bane_input = Input(bane);

//CALLS KEY FUNCTION AND PARSE INPUT TO KEY FUNCTION
bane_input.watch('p1up', () => {
  keys('w', Top, Bottom)

}, 'w' /*parameter must be the same as keys parameter*/ );

bane_input.watch('p1down', () => {
  keys('s', Top, Bottom)

}, 's' /*parameter must be the same as keys parameter*/ );

bane_input.watch('p2up', () => {
  keys('ArrowUp', Top, Bottom)
}, 'ArrowUp' /*parameter must be the same as keys parameter*/ );

bane_input.watch('p2down', () => {
  keys('ArrowDown', Top, Bottom)
}, 'ArrowDown' /*parameter must be the same as keys parameter*/ );
//--------------------------------------------------

//VARIABLE THAT SAVES THE HALF OF THE HEIGHT OF THE LANE FOR THE COCONUT BALL
var baneSize = document.getElementById('bane').getBBox().height / 2;


//VARIABLES USED IN FUNCTION TO CONTROL PADDLES
var paddleLeftPos = 0;
var paddleRightPos = 0;
var topBoundryP1 = -244;
var bottomBoundryP1 = 239;
var topBoundryP2 = -245;
var bottomBoundryP2 = 238;



//FUNCTION THAT CONTROLS PADDLE MOVEMENTS
function keys(pressedKey, topBoundry, bottomBoundry, key = keyOption) {


  let keytoUpperp1 = key.UPPLAYONE;

  let keytoLowerp1 = key.DOWNPLAYONE;

  let keytoUpperp2 = key.UPPLAYTWO;


  let keytoLowerp2 = key.DOWNPLAYTWO;



  //PLAYER ONE MOVE UP PADDLE
  if (pressedKey == keytoUpperp1) {

    paddleLeftPos -= 10;

    if (paddleLeftPos >= topBoundryP1) {
      moveSection(player1Id, 0, paddleLeftPos);
    } else {

      paddleLeftPos = topBoundryP1;

      return;
    }

  }

  //PLAYER ONE MOVE DOWN PADDLE
  if (pressedKey == keytoLowerp1)

  {

    paddleLeftPos += 10;

    if (paddleLeftPos <= bottomBoundryP1) {
      moveSection(player1Id, 0, paddleLeftPos);
    } else {

      paddleLeftPos = bottomBoundryP1;
      return;
    }
  }


  //PLAYER TWO MOVE UP PADDLE
  if (pressedKey == keytoUpperp2) {

    paddleRightPos -= 10;
    // console.log(paddleP2Pos);

    if (paddleRightPos >= topBoundryP2) {
      moveSection(player2Id, 0, paddleRightPos);
    } else {

      paddleRightPos = topBoundryP2;
      return;
    }


  }


  //PLAYER TWO MOVE DOWN PADDLE
  if (pressedKey == keytoLowerp2) {

    paddleRightPos += 10;

    if (paddleRightPos <= bottomBoundryP2)
    {
      moveSection(player2Id, 0, paddleRightPos);
    }
    else {

      paddleRightPos = bottomBoundryP2;
      return;
    }

  }
}

function moveSection(idStr, xOffset, yOffset) {
  var domElemnt;
  if (typeof idStr === 'object') {
    domElemnt = idStr;
  } else {
    domElemnt = document.getElementById(idStr);
  }
  if (domElemnt) {
    var transformAttr = ' translate(' + xOffset + ',' + yOffset + ')';
    domElemnt.setAttribute('transform', transformAttr);
  }
}

//FUNCTION GETS THE KEYS THAT IS PRESS ON KEYBOARD AND PARSE IT TO KEY FUNCTION
function Input(el) {
  var parent = el,
    map = {},
    intervals = {};

  function ev_kdown(ev) {
    map[ev.key] = true;
    ev.preventDefault();
    return;
  }

  function ev_kup(ev) {
    map[ev.key] = false;
    ev.preventDefault();
    return;
  }

  function key_down(key) {
    return map[key];
  }

  function keys_down_array(array) {
    for (var i = 0; i < array.length; i++)
      if (!key_down(array[i]))
        return false;

    return true;
  }

  function keys_down_arguments() {
    return keys_down_array(Array.from(arguments));
  }

  function clear() {
    map = {};
  }

  function watch_loop(keylist, callback) {
    return function() {
      if (keys_down_array(keylist)) {
        callback();

      }


    }
  }

  function watch(name, callback) {
    var keylist = Array.from(arguments).splice(2);

    // intervals[name] = setInterval(watch_loop(keylist, callback), 1000/24);
    intervals[name] = setInterval(watch_loop(keylist, callback), 60);
  }

  function unwatch(name) {
    clearInterval(intervals[name]);
    delete intervals[name];
  }

  function detach() {
    parent.removeEventListener("keydown", ev_kdown);
    parent.removeEventListener("keyup", ev_kup);
  }

  function attach() {
    parent.addEventListener("keydown", ev_kdown);
    parent.addEventListener("keyup", ev_kup);
  }

  function Input() {
    attach();

    return {
      key_down: key_down,
      keys_down: keys_down_arguments,
      watch: watch,
      unwatch: unwatch,
      clear: clear,
      detach: detach
    };
  }

  return Input();
}

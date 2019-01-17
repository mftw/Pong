//SAVES THE ID OF LEFT PADDLE TO A CONSTANT PLAYER1ID
const player1Id = document.getElementById('paddleLeft');
console.log(player1Id);

//SAVES THE ID OF RIGHT PADDLE TO A CONSTANT PLAYER1ID
const player2Id = document.getElementById('paddleRight');
console.log(player2Id)

//EXTRACT THE STRING POSTION OF PADDLE FOR PLAYER ONE AND CONVERTS THE STRING TO A FLOAT
let playerone =  player1Id.getAttribute("y","x");
console.log(playerone);

//EXTRACT THE STRING POSTION OF PADDLE FOR PLAYER TWO AND CONVERTS THE STRING TO A FLOAT
let playertwo =  player2Id.getAttribute("y","x");
console.log(playertwo);

//RESETS THE PADDLES TO THE CENTER OF THE VIEWPORT
player1Id.setAttribute('y', 50 + "%");
console.log(player1Id);

player2Id.setAttribute('y', 50 + "%");
console.log(player2Id);

//MOVES THE PADDLES ON X AXE
player1Id.setAttribute('x',381);

player2Id.setAttribute('x', 1549);

//FUNCTION RESETS THE PADDLES TO THE CENTER OF THE VIEWPORT
function resetPaddles()
{

        player1Id.setAttribute('y', 50 + "%");
        console.log(player1Id);

        player2Id.setAttribute('y', 50 + "%");
        console.log(player2Id);


        alert("Player reset");
}

//KEYBOARD INPUT TO USE FOR PLAYER ONE AND PLAYER TWO PADDLES, IS SAVED TO A VARIABLE AS AN OBJECT
var keyOption =
{
  UPPLAYONE: "w",
  DOWNPLAYONE: "s",
  UPPLAYTWO: "ArrowUp",
  DOWNPLAYTWO: "ArrowDown"
}
var Top = 0;
var Bottom = 0;

//INIT FUNCTION GETS TOP AND BOTTOM PARAMETERS FROM HTML.
function init(top,bottom)
{

    Top = top;
    Bottom = bottom;

}

//GETS THE ID FOR THE CANVAS
//var bane = document.getElementById('canvas');
var bane = document;

//USES FUNCTION THAT CONTROLS THE KEYS
var bane_input = Input(bane);

//CALLS KEY FUNCTION AND PARSE INPUT TO KEY FUNCTION
bane_input.watch('p1up', () =>{
  keys('w', Top, Bottom)

}, 'w'/*parameter must be the same as keys parameter*/);

bane_input.watch('p1down', () =>{
  keys('s', Top, Bottom)

}, 's'/*parameter must be the same as keys parameter*/);

bane_input.watch('p2up', () =>{
  keys('ArrowUp', Top, Bottom)
}, 'ArrowUp'/*parameter must be the same as keys parameter*/);

bane_input.watch('p2down', () =>{
  keys('ArrowDown', Top, Bottom)
}, 'ArrowDown'/*parameter must be the same as keys parameter*/);
//--------------------------------------------------

const topBoundry = 0 + "%";
const bottomBoundry = 100 + "%";
//FUNCTION THAT CONTROLS PADDLE MOVEMENTS
function keys(pressedKey, topBoundry, bottomBoundry, key = keyOption)
{


  let keytoUpperp1 = key.UPPLAYONE;

  let keytoLowerp1 = key.DOWNPLAYONE;
  console.log(keytoLowerp1);
  let keytoUpperp2 = key.UPPLAYTWO;
  console.log(keytoUpperp2);

  let keytoLowerp2 = key.DOWNPLAYTWO;
  console.log(keytoLowerp2);


  //PLAYER ONE MOVE UP PADDLE
  if(pressedKey == keytoUpperp1)
      {

              //PADDLES STOPPER NÅR DEN NÅR TOP ELLER BUND OG KAN IKKE KØRER TILBAGE
          if(parseInt(player1Id.getAttribute("y")) <= topBoundry)
              {
                return;
              }

              //PADDLE SKAL ØGES I HASTIGHED OG STARTE FRA MIDTEN AF SKÆRMEN


              let num = parseFloat(player1Id.getAttribute("y"));
              console.log(num);
              let numplus = num-1+"%";
              console.log(numplus);
              player1Id.setAttribute('y', numplus);
              console.log(player1Id);



        }
          //PADDLES STOPPER NÅR DEN NÅR TOP ELLER BUND OG KAN IKKE KØRER TILBAGE
          //PLAYER ONE MOVE DOWN PADDLE
          if(pressedKey == keytoLowerp1)
            {
              console.log(alert="Hello");
              if(parseInt(player1Id.getAttribute("y")) <= topBoundry)
                   {
                      return;
                    }

                let num = parseFloat(player1Id.getAttribute("y"));
                console.log(num);
                let numplus = num+1+"%";
                console.log(numplus);
                player1Id.setAttribute('y', numplus);
                console.log(player1Id);


              }
              //PADDLES STOPPER NÅR DEN NÅR TOP ELLER BUND OG KAN IKKE KØRER TILBAGE
           //PLAYER TWO MOVE UP PADDLE
           if(pressedKey == keytoUpperp2)
             {

               if(parseInt(player2Id.getAttribute("y")) <= topBoundry)
                   {
                     return;
                   }



                    let num = parseFloat(player2Id.getAttribute("y"));
                    console.log(num);
                    let numplus = num-1+"%";
                    console.log(numplus);
                    player2Id.setAttribute('y', numplus);
                    console.log(player1Id);


              }

              //PADDLES STOPPER NÅR DEN NÅR TOP ELLER BUND OG KAN IKKE KØRER TILBAGE
            //PLAYER TWO MOVE DOWN PADDLE
            if(pressedKey == keytoLowerp2)
              {

                if(parseInt(player2Id.getAttribute("y")) <= topBoundry)
                    {
                      return;
                    }


                  let num = parseFloat(player2Id.getAttribute("y"));
                  console.log(num);
                  let numplus = num+1+"%";
                  console.log(numplus);
                  player2Id.setAttribute('y', numplus);
                  console.log(player1Id);
              }
}

//FUNCTION GETS THE KEYS THAT IS PRESS ON KEYBOARD AND PARSE IT TO KEY FUNCTION
function Input(el)
{
    var parent = el,
        map = {},
        intervals = {};

    function ev_kdown(ev)
    {
        map[ev.key] = true;
        ev.preventDefault();
        return;
    }

    function ev_kup(ev)
    {
        map[ev.key] = false;
        ev.preventDefault();
        return;
    }

    function key_down(key)
    {
        return map[key];
    }

    function keys_down_array(array)
    {
        for(var i = 0; i < array.length; i++)
            if(!key_down(array[i]))
                return false;

        return true;
    }

    function keys_down_arguments()
    {
        return keys_down_array(Array.from(arguments));
    }

    function clear()
    {
        map = {};
    }

    function watch_loop(keylist, callback)
    {
        return function(){
            if(keys_down_array(keylist))
            {
                callback();

            }


            }
    }

    function watch(name, callback)
    {
        var keylist = Array.from(arguments).splice(2);

        // intervals[name] = setInterval(watch_loop(keylist, callback), 1000/24);
        intervals[name] = setInterval(watch_loop(keylist, callback), 60);
    }

    function unwatch(name)
    {
        clearInterval(intervals[name]);
        delete intervals[name];
    }

    function detach()
    {
        parent.removeEventListener("keydown", ev_kdown);
        parent.removeEventListener("keyup", ev_kup);
    }

    function attach()
    {
        parent.addEventListener("keydown", ev_kdown);
        parent.addEventListener("keyup", ev_kup);
    }

    function Input()
    {
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

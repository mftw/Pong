//SAVES THE ID OF LEFT PADDLE TO A CONSTANT PLAYER1ID
const player1Id = document.getElementById('left-paddle');

//SAVES THE ID OF RIGHT PADDLE TO A CONSTANT PLAYER1ID
const player2Id = document.getElementById('right-paddle');

//PADDLES COLOR FOR PLAYER ONE AND PLAYER TWO
player1Id.style.backgroundColor="red";
player2Id.style.backgroundColor="blue";

//EXTRACT THE STRING POSTION OF PADDLE FOR PLAYER ONE AND CONVERTS THE STRING TO A FLOAT
let playerone = parseFloat(window.getComputedStyle(player1Id, null).getPropertyValue("top"));
console.log(playerone);

//EXTRACT THE STRING POSTION OF PADDLE FOR PLAYER TWO AND CONVERTS THE STRING TO A FLOAT
let playertwo = parseFloat(window.getComputedStyle(player2Id, null).getPropertyValue("top"));
console.log(playertwo);

//FUNCTION RESETS THE PADDLES TO THE CENTER OF THE VIEWPORT
function resetPaddles()
{

    player1Id.style.top = parseInt(player1Id.style.top = 50 +"%");

    player2Id.style.top = parseInt(player2Id.style.top = 50 +"%");

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
//TOP AND BOTTOM VARIBLES FOR CANVAS IS DEFINED.
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

//FUNCTION THAT CONTROLS PADDLE MOVEMENTS
function keys(pressedKey, topBoundry, bottomBoundry, key = keyOption)
{
  console.log(pressedKey);

  let keytoUpperp1 = key.UPPLAYONE;

  let keytoLowerp1 = key.DOWNPLAYONE;

  let keytoUpperp2 = key.UPPLAYTWO;

  let keytoLowerp2 = key.DOWNPLAYTWO;


  //PLAYER ONE MOVE UP PADDLE
  if(pressedKey == keytoUpperp1)
      {
          //29
          if(parseInt(player1Id.style.top) <= topBoundry)
              {
                return;
              }

              //PADDLE SKAL ØGES I HASTIGHED OG STARTE FRA MIDTEN AF SKÆRMEN

              player1Id.style.top = parseInt(player1Id.style.top = +  playerone - 1 + "px");
              playerone=playerone-1-1;


        }

          //PLAYER ONE MOVE DOWN PADDLE
          if(pressedKey == keytoLowerp1)
            {
              //614
              if(parseInt(player1Id.style.top) >= bottomBoundry)
                   {
                      return;
                    }

                //PADDLE SKAL ØGES I HASTIGHED OG STARTE FRA MIDTEN AF SKÆRMEN

                player1Id.style.top = parseInt(player1Id.style.top =  + playerone + 1 + "px");
                playerone=playerone+1+1;


              }

           //PLAYER TWO MOVE UP PADDLE
           if(pressedKey == keytoUpperp2)
             {
               //29
               if(parseInt(player2Id.style.top) <= topBoundry)
                    {
                     return;
                    }

                 //PADDLE SKAL ØGES I HASTIGHED OG STARTE FRA MIDTEN AF SKÆRMEN

                   player2Id.style.top = parseInt(player2Id.style.top =  + playertwo - 1 + "px");
                   playertwo=playertwo-1-1;


              }


            //PLAYER TWO MOVE DOWN PADDLE
            if(pressedKey == keytoLowerp2)
              {
                //614
                if(parseInt(player2Id.style.top) >= bottomBoundry)
                      {
                        return;
                      }

                    //PADDLE SKAL ØGES I HASTIGHED OG STARTE FRA MIDTEN AF SKÆRMEN

                    player2Id.style.top = parseInt(player2Id.style.top =  + playertwo + 1 + "px");
                    playertwo=playertwo+1+1;
              }
}

//FUNCTION GETS THE KEYS THAT IS PRESS ON KEYBOARD AND PARSE IT TO KEY FUNCTION
/*function paddles(topBoundry, bottomBoundry)
{


  document.addEventListener("keydown", event =>
    {
      const keyname = event.key;

        if(keyname)
          {
              keys(keyname, topBoundry, bottomBoundry);
          }

      });

}*/
//funktionen skal erstatte paddles funktionen.
//FUNCTION THAT ALLOWS MULTIPLE KEYPRES AT ONCE

//FUNCTION GETS THE KEYS THAT IS PRESS ON KEYBOARD AND PARSE IT TO KEY FUNCTION. BOTH PLAYER 1 AND 2 CAN NOW USE THE KEYS AT THE SAME TIME.
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

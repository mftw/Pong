
const player1Id = document.getElementById('left-paddle');
const player2Id = document.getElementById('right-paddle');

//PADDLES COLOR FOR PLAYER ONE AND PLAYER TWO
player1Id.style.backgroundColor="red";
player2Id.style.backgroundColor="blue";


let playerone = parseFloat(window.getComputedStyle(player1Id, null).getPropertyValue("top"));
console.log(playerone);

let playertwo = parseFloat(window.getComputedStyle(player2Id, null).getPropertyValue("top"));
console.log(playertwo);

//console.log(player1Id);
//console.log(player2Id);

//FUNKTIONEN RESETTER PADDLES TIL MIDTEN AF SKÆRMEN
function resetPaddles()
{

    player1Id.style.top = parseInt(player1Id.style.top = 50 +"%");

    player2Id.style.top = parseInt(player2Id.style.top = 50 +"%");

    alert("Player reset");



}

//OBJEKT MED KEYS INPUT PLAYER ONE
var keyOption = {
  UPPLAYONE: "w",
  DOWNPLAYONE: "s",
  UPPLAYTWO: "ArrowUp",
  DOWNPLAYTWO: "ArrowDown"
}


//KEYS KALDES FOR AT KUNNE BRUGE PADDLES
function keys(pressedKey, key = keyOption)
{
  //console.log(pressedKey);

  let keytoUpperp1 = key.UPPLAYONE;
  //console.log(keytoUpperp1);
  let keytoLowerp1 = key.DOWNPLAYONE;
  //console.log(keytoLowerp1);
  let keytoUpperp2 = key.UPPLAYTWO;
  //console.log(keytoUpperp2);
  let keytoLowerp2 = key.DOWNPLAYTWO;
  //console.log(keytoLowerp2);

  //PLAYER ONE MOVE UP PADDLE
  if(pressedKey == keytoUpperp1)
      {



          if(parseInt(player1Id.style.top) <= 29)
              {
                return;
              }

              //PADDLE SKAL ØGES I HASTIGHED OG STARTE FRA MIDTEN AF SKÆRMEN

              player1Id.style.top = parseInt(player1Id.style.top = +  playerone - 1 + "px");
              //console.log(playerone);
              playerone=playerone-1-1;
              console.log(playerone);

        }

        //PLAYER ONE MOVE DOWN PADDLE
        if(pressedKey == keytoLowerp1)
            {
              if(parseInt(player1Id.style.top) >= 614)
                   {
                      return;
                    }

                    //PADDLE SKAL ØGES I HASTIGHED OG STARTE FRA MIDTEN AF SKÆRMEN

                    player1Id.style.top = parseInt(player1Id.style.top =  + playerone + 1 + "px");
                    console.log(playerone);
                    playerone=playerone+1+1;


              }

              //PLAYER TWO MOVE UP PADDLE
              if(pressedKey == keytoUpperp2)
                  {
                    if(parseInt(player2Id.style.top) <= 29)
                          {
                            return;
                          }

                          //PADDLE SKAL ØGES I HASTIGHED OG STARTE FRA MIDTEN AF SKÆRMEN

                          player2Id.style.top = parseInt(player2Id.style.top =  + playertwo - 1 + "px");
                          playertwo=playertwo-1-1;
                          console.log(playertwo);


                    }


                    //PLAYER TWO MOVE DOWN PADDLE
                    if(pressedKey == keytoLowerp2)
                        {
                          if(parseInt(player2Id.style.top) >= 614)
                                {
                                  return;
                                }

                                //PADDLE SKAL ØGES I HASTIGHED OG STARTE FRA MIDTEN AF SKÆRMEN

                                player2Id.style.top = parseInt(player2Id.style.top =  + playertwo + 1 + "px");
                                playertwo=playertwo+1+1;
                                console.log(playertwo);

                          }
}

function paddles()
{


  document.addEventListener("keydown", event =>
    {
      //console.log(key);
      const keyname = event.key;
      //console.dir(event);


        if(keyname)
        {
            keys(keyname);
        }



          /*if (keyname == 'w' || keyname == 'W' ||keyname == 's' || keyname == 'S' || keyname == 'ArrowDown' || keyname == 'ArrowUp')
          {
                  keyUp();
                /*if(keyname == 'w' || keyname == 'W')
                    {

                      //alert("Hello You Got The W or w key");

                        if(parseInt(player1Id.style.top) <= 0)
                            {
                              return;
                            }

                            //PADDLE SKAL ØGES I HASTIGHED OG STARTE FRA MIDTEN AF SKÆRMEN

                            player1Id.style.top = parseInt(player1Id.style.top =  + playerone - 1 + "px");
                            console.log(playerone);
                            playerone=playerone-1;
                            console.log(playerone);

                      }

                    else if (keyname == 's' || keyname == 'S')
                      {
                        //console.log(alert("Hello You Got The S or s key"));
                        if(parseInt(player1Id.style.top) <= 0)
                            {

                              return;
                            }

                        //PADDLE SKAL ØGES I HASTIGHED OG STARTE FRA MIDTEN AF SKÆRMEN.
                        player1Id.style.top = parseInt(player1Id.style.top = + playerone + 1 + "px");
                        console.log(playerone);
                        playerone=playerone+1;
                        console.log(playerone);
                      }

                      else if (keyname == 'ArrowDown')
                        {
                          if(parseInt(player2Id.style.top) <= 0)
                              {
                                return;
                              }

                              //PADDLE SKAL ØGES I HASTIGHED.
                              player2Id.style.top = parseInt(player2Id.style.top = + playertwo + 1 + "px");
                              console.log(playertwo);
                              playertwo=playertwo+1;
                              console.log(playertwo);
                        }

                      else if (keyname == 'ArrowUp')

                          {
                            if(parseInt(player2Id.style.top) <= 0)
                                {

                                  return;
                                }

                            //PADDLE SKAL ØGES I HASTIGHED.
                            player2Id.style.top = parseInt(player2Id.style.top = + playertwo - 1 + "px");
                            console.log(playertwo);
                            playertwo=playertwo-1;
                            console.log(playertwo);


                          }



          }*/

          //AUTOMATISK RESET TIL MIDTERPLACERING PÅ SKÆRMEN. MEN CTRL F5 OMGÅR DETTE OG SÆTTER PADDLES I TOP 0.
      /*else
          {
            resetPaddles();

          }*/

    });

}

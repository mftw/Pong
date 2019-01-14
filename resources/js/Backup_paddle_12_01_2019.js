/*DER SKAL BENYTTES KARAKTERNE W,S,PIL OP OG PIL NED, TIL AT FUNGERE.
//DER BENYTTES ADDEVENTLISTSNER FOR AT FÅ JAVASCRIPT TIL AT LYTTE EFTER W,S PIL OP, PIL NED
//Huske at skrive ind i koden at jeg skal bruge document.adeventlistsner.keydown() hvor key er w og s.
callback()*/

const player1Id = document.getElementById('left-paddle');
const player2Id = document.getElementById('right-paddle');
let playerone = 0;
let playertwo = 0;
player1Id.style.backgroundColor="red";
player2Id.style.backgroundColor="blue";


console.log(player1Id);
console.log(player2Id);

if (playerone == 0 || playertwo == 0)
{
  player1Id.style.top = parseInt(player1Id.style.top = 50 +"%");

  player2Id.style.top = parseInt(player2Id.style.top = 50 +"%");

  alert("Player reset");

}
document.addEventListener("keydown", event =>
{
  //console.log(key);
  const keyname = event.key;
  console.dir(event);





      if (keyname == 'w' || keyname == 'W' ||keyname == 's' || keyname == 'S' || keyname == 'ArrowDown' || keyname == 'ArrowUp')
      {

            if(keyname == 'w' || keyname == 'W')
                {

                  //alert("Hello You Got The W or w key");

                    if(parseInt(player1Id.style.top) <= 0)
                        {
                          return;
                        }

                        //PADDLE SKAL ØGES I HASTIGHED OG STARTE FRA MIDTEN AF SKÆRMEN

                        player1Id.style.top = parseInt(player1Id.style.top =  + playerone + 1 + "px");
                        console.log(playerone);
                        playerone=playerone+1;
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
                        player2Id.style.top = parseInt(player2Id.style.top = + playertwo + 1 + "px");
                        console.log(playertwo);
                        playertwo=playertwo+1;
                        console.log(playertwo);


                      }



      }

      //AUTOMATISK RESET TIL MIDTERPLACERING PÅ SKÆRMEN. MEN CTRL F5 OMGÅR DETTE OG SÆTTER PADDLES I TOP 0.
  else
      {

        player1Id.style.top = parseInt(player1Id.style.top = 50 +"%");

        player2Id.style.top = parseInt(player2Id.style.top = 50 +"%");

        console.log(alert("Press w,s,ArrowUp or ArrowDown, for the paddles to move"));

        playerone = 0;
        playertwo = 0;


      }

});

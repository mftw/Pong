/*DER SKAL BENYTTES KARAKTERNE W,S,PIL OP OG PIL NED, TIL AT FUNGERE.
//DER BENYTTES ADDEVENTLISTSNER FOR AT FÅ JAVASCRIPT TIL AT LYTTE EFTER W,S PIL OP, PIL NED
//Huske at skrive ind i koden at jeg skal bruge document.adeventlistsner.keydown() hvor key er w og s.
callback()*/

document.addEventListener("keydown", key => {
  console.log(key);

  if(key.code == 'KeyW')
    {
      console.log(alert("Hello You Got The W or w key"));
    }

  else if (key.code == 'KeyS')
    {
      console.log(alert("Hello You Got The S or s key"));
    }

    else if (key.code == 'ArrowDown')
      {
        console.log(alert("Hello You Got The Arrow down key"));
      }
      else if (key.code == 'ArrowUp')

        {
          console.log(alert("Hello You Got The ArrowUp key"));
        }



    else{
      console.log(alert("not working"));
    }
});






/*var paddleDirection = 0
  , paddleSpeed = 5

SVG.on(document, 'keydown', function(e) {
  paddleDirection = e.keyCode == 40 ? 1 : e.keyCode == 38 ? -1 : 0
  e.preventDefault()
})

SVG.on(document, 'keyup', function(e) {
  paddleDirection = 0
  e.preventDefault()
})

*/

/*function paddle(key)
{

  if (key == w)
  {
      alert("You pressed a key inside the input field");
  }
  else {
    {
      "doesnt work";
    }
  }
}*/

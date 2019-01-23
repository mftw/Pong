// Få fat i paddles'ne
var paddleLeft = document.getElementById('paddleLeft');
var paddleRight = document.getElementById('paddleRight');


// Få fat i højden på paddles'ne og tilføj en
// property til elementerne
paddleLeft.gotHeight = paddleLeft.getBBox().height;
paddleRight.gotHeight = paddleRight.getBBox().height;


// Udregn halvdelen af højden af den paddles'ne
paddleLeft.halfHeight = paddleLeft.gotHeight / 2;
paddleRight.halfHeight = paddleRight.gotHeight / 2;


// Få fat i bredden på paddles'ne og tilføj en
// property til elementerne
paddleLeft.gotWidth = paddleLeft.getBBox().width;
paddleRight.gotWidth = paddleLeft.getBBox().width;


// Udregn halvdelen af bredden på paddles'ne
paddleLeft.halfWidth = paddleLeft.gotWidth / 2;
paddleRight.halfWidth = paddleLeft.gotWidth / 2;


// Sørg for at paddles'ne har samme position i y aksen
paddleRight.setAttribute('y', paddleLeft.getAttribute('y'));


// Her gemmes paddle positionen som udregnes i game.loop i
// ballPhysics.js
var paddleLeftPos = 0;
var paddleRightPos = 0;


// Et object der indeholder de tastetryk man ønsker at bruge i spillet
const keys = {
    paddleLeftUp: 'w',
    paddleLeftDown: 's',
    paddleRightUp: 'ArrowUp',
    paddleRightDown: 'ArrowDown',
    // pauseGame: ' '
}


// Et object der indeholder informationer om hvilke tastetryk der er aktive
var keyPressed = {
    paddleLeftUp: false,       
    paddleLeftDown: false,
    paddleRightUp: false,
    paddleRightDown: false,
    // pauseGame: false,
}


// Hold øje med om der bliver trykket en tast ned
document.addEventListener('keydown', event => {

    // Loop igennem alle properties på keys objektet
    for (const key in keys) {

        // Check if key is part of prototype.
        // Vær sikker på at den ønskede property på objektet
        // er en man selv har lavet, og ikke en standard property
        // som er i browseren
        if(!keys.hasOwnProperty(key)) {
            // Spring til næste property
            continue;
        }

        // Tjek om den tast der trykkes matcher en ønsket tast
        if(event.key === keys[key]) {

            // Undgå f.eks. at ArrowUp/Down får browseren til at scrolle
            event.preventDefault()

            // Sæt den pågældene property i keyPressed objektet til sand
            keyPressed[key] = true;
        }
    }
});


// Hold øje med om der bliver sluppet en tast
document.addEventListener('keyup', event => {

    // Loop igennem alle properties på keys objektet
    for (const key in keys) {

        // Check if key is part of prototype.
        // Vær sikker på at den ønskede property på objektet
        // er en man selv har lavet, og ikke en standard property
        // som er i browseren
        if(!keys.hasOwnProperty(key)) {
            // Spring til næste property
            continue;
        }

        // Tjek om den tast der trykkes matcher en ønsket tast
        if(event.key === keys[key]) {

            // Undgå f.eks. at ArrowUp/Down får browseren til at scrolle
            event.preventDefault()

            // Sæt den pågældene property i keyPressed objektet til falsk
            keyPressed[key] = false;
        }
    }
});


// Funktion til at nulstille paddle positionen
function resetPaddles() {

    // Sæt begge paddle positions værdier til 0
    paddleLeftPos = 0;
    paddleRightPos = 0;

    // Flyt paddles'ne tilbage til start i SVG'en
    moveSection(paddleLeft, 0, 0);
    moveSection(paddleRight, 0, 0);
}
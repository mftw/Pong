var svg = document.getElementById("svg");
var winner = document.getElementById("winner");

var tlm = new TimelineMax({
    force3D: true,
});


function bg(win) {
    winner.innerHTML = win + " Wins";
    fuckingTobiasOgClaus(getDur());
}

function ani(dur) {
    var duration = 14.3;
    
    if(!isNaN(dur)) {
        duration = dur;
    }
    
    tlm.from('#svg', 1, {
        scale: 0,
        ease: Back.easeOut.config(1.7)
    }, 0)

    tlm.from('#bg-star', 5, {
        rotation: 360,
        repeat: -1,
        transformOrigin:"center center",
        ease: Power0.easeNone,
    }, 0)
    
    tlm.from('#pokal', 1, {
        scale: 1.8,
        transformOrigin:"center center",
        repeat: -1,
        yoyo: true,
    }, 0)

    tlm.to('.linGrad1', 1, {
        stopColor: '#34BF9A',
        repeat: -1,
        yoyo: true,
        transformOrigin:"center center",
        ease: Power0.easeNone,
        attr: {
            offset: '2'
        }
    }, 0)

    tlm.to('#svg', 0.3, {
        scale: 0,
        opacity: 0,
    }, duration - 0.3)

    // tlm.to('svg', 14.3, {
    tlm.to('svg', duration, {
        // onComplete: () => (resetWinAni())

        // Giv kun funtionens navn som en henvisning, og ikke med tomme parenteser ()
        // de tomme parenteser gør at funtionen bliver kørt 
        // ved initialisering af onComplete i GreenSock.
        // Endnu værre er: onComplete: () => (resetWinAni())
        // ved at komme parenteser omkring hele funktionen
        // laver man et IIFE (Immediately Invoked Function Expression)
        // som bliver kørt som det første allerede når JavaScript'et bliver
        // læst af browseren. https://developer.mozilla.org/en-US/docs/Glossary/IIFE

        onComplete: handleResetButton,
    }, 0)
    
    return tlm;
}

// ani();

// Sørg for pisset ikke køre når siden loader
var hasRan = false;
function fuckingTobiasOgClaus(dur) {

    function runAni() {
        tlm.restart();
        tlm.resume();
        svg.style.visibility = "visible";
    }

    if(!hasRan) {
        ani(dur)
        runAni();
        hasRan = true;
    } else {
        runAni();
    }
}


function resetWinAni() {
    tlm.pause();
    svg.style.visibility = "hidden";
}


/**
 * 
 * Eksempler på callbacks
 * 
 */

function callBackPrincip(nogetAtArbejdeMed, nogetAtKaldeBagefter) {
    let udregning = nogetAtArbejdeMed + 10;
    console.log('svær matematik: ' + udregning);

    if(typeof nogetAtKaldeBagefter === 'function') {
        nogetAtKaldeBagefter();
    }
}

function callBackEksempel() {
    console.log('nice callback you got there');
}

// callBackPrincip(10, callBackEksempel);
// callBackPrincip(10, callBackEksempel());
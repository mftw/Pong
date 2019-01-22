'use strict'

var svg = document.getElementById("svg");
var winner = document.getElementById("winner");
var tlm = new TimelineMax();


function bg(win) {
    winner.innerHTML = win + " Wins";
}

function ani() {
    
    tlm.from('#svg', 1, {
        scale: 0,
        ease:Back.easeOut,
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

    tlm.to('svg', 14, {
        onComplete: () => (resetWinAni()),
    }, 0)
    
    return tlm;
}

ani();




function resetWinAni() {
    tlm.pause();
    svg.style.visibility = "hidden";
}
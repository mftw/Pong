'use strict'

var svg = document.getElementById("svg");
var winner = document.getElementById("winner");

var handle = TweenMax;

// https://greensock.com/forums/topic/8917-all-the-methods-to-kill-a-tween/

function bg(win) {
    // TweenMax.killAll();
    resetWinAni();

    if (svg.style.display = "none") {
        svg.style.display = "block";
    }

    winner.innerHTML = win + " wins!";

    handle.from('#svg', 1, {
        scale: 0,
        ease:Back.easeOut,
    })

    handle.from('#bg-star', 5, {
        rotation: 360,
        repeat: -1,
        transformOrigin:"center center",
        ease: Power0.easeNone
    })
    
    handle.from('#pokal', 1, {
        scale: 1.8,
        transformOrigin:"center center",
        repeat: -1,
        yoyo: true,
    })

    handle.to('.linGrad1', 1, {
        stopColor: '#34BF9A',
        repeat: -1,
        yoyo: true,
        // transformOrigin:"center center",
        ease: Power0.easeNone,
        attr: {
            offset: '2'
        }
    })
}

function resetWinAni() {
    // handle.killTweensOf( winner );
    handle.killChildTweensOf( svg );
    handle.killTweensOf( svg );
    handle = null;
    handle = TweenMax;
    svg.style.display = "none";
}
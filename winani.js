var svg = document.getElementById("svg");
var winner = document.getElementById("winner");

function bg(win) {
    if (svg.style.display = "none") {
        svg.style.display = "block";
    }

    winner.innerHTML = win + " wins!";

    TweenMax.from('#svg', 1, {
        scale: 0,
    })

    TweenMax.from('#bg', 5, {
        rotation:360,
        repeat: -1,
        transformOrigin:"center center",
        ease: Power0.easeNone
    })
    
    TweenMax.from('#pokal', 1, {
        scale: 1.8,
        transformOrigin:"center center",
        repeat: -1,
        yoyo: true,
    })

    TweenMax.to('.linGrad1', 1, {
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
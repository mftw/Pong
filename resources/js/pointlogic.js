var playerOneScore = 0;
var playerTwoScore = 0;
var leftScore = document.getElementById("leftScore");
var rightScore = document.getElementById("rightScore");
var p1 = document.getElementById("player1");
var p2 = document.getElementById("player2");
var winnerScore = 2;
var winnerFound = false;

function countPlayerScore(counter, win) {
    if(counter == winnerScore - 1) {
        console.log("winner: " + win);
        winnerFound = true;
        cancelDelayedStart();
        winSituation(win);
    }
    return counter + 1;
}

function scoreBoard() {
    leftScore.innerHTML = "<h3>" + playerOneScore + "</h3>";
    rightScore.innerHTML = "<h3>" + playerTwoScore + "</h3>";
}

function resetScoreboard() {
    playerOneScore = 0;
    playerTwoScore = 0;
    winnerFound = false;
    resetWinAni();
    winnerSong(false);
    scoreBoard();
}

function winSituation(win) {
    console.log("Whatever der nu sker når en vinder");
    bg(win);
    winnerSong();
}



// p1.addEventListener("click", function() {
//     playerOneScore.innerHTML = "<h3>" + playerOneScore + "</h3>";
//     if(playerOneScore == winnerScore) {
//         return;
//     }
//     playerOneScore = countPlayerScore(playerOneScore, "player1");
//     scoreBoard();
// });

p1.addEventListener("click", handleP1Goal, false);

function handleP1Goal() {
    playerOneScore.innerHTML = "<h3>" + playerOneScore + "</h3>";
    if(playerOneScore == winnerScore) {
        return;
    }
    playerOneScore = countPlayerScore(playerOneScore, "player1");
    scoreBoard();
}


// p2.addEventListener("click", function() {
//     if(playerTwoScore == winnerScore) {
//         return;
//     }
//     playerTwoScore = countPlayerScore(playerTwoScore, "player2");
//     scoreBoard();
// });

p2.addEventListener("click", handleP2Goal, false);

function handleP2Goal() {
    if(playerTwoScore == winnerScore) {
        return;
    }
    playerTwoScore = countPlayerScore(playerTwoScore, "player2");
    scoreBoard();
}

document.getElementById("reset").addEventListener("click", function() {
    resetScoreboard();
    resetGame()
    userStartedGame = false;
});

var audio = new Audio('./resources/audio/goe.mp3');
function winnerSong(reset = true) {

    if(reset === false) {
        if(audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        return;
    }
    // audio = new Audio('./resources/audio/goe.mp3');
    audio.volume = globalVolume;
    audio.play();
}

(resetScoreboard());

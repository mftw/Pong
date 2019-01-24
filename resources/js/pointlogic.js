var playerOneScore = 0;
var playerTwoScore = 0;
var p1 = document.getElementById("player1");
var p2 = document.getElementById("player2");
var winnerScore = 3;
var winnerFound = false;

var rightScore = document.getElementById("right_x5F_zero");
var leftScore = document.getElementById("left_x5F_zero");

function countPlayerScore(counter, win) {
    if(counter == winnerScore - 1) {
        // console.log("winner: " + win);
        winnerFound = true;
        handleResetButton();
        winSituation(win);
    }
    return counter + 1;
}

function scoreBoard() {
    rightScore.innerHTML = playerTwoScore;
    leftScore.innerHTML = playerOneScore;
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
    bg(win);
    // svg.style.visibility = "visible";
    // tlm.restart();
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
    playerOneScore = playerOneScore;
    if(playerOneScore == winnerScore) {
        return;
    }
    playerOneScore = countPlayerScore(playerOneScore, "Player1");
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
    playerTwoScore = countPlayerScore(playerTwoScore, "Player2");
    scoreBoard();
}

// document.getElementById("reset").addEventListener("click", function() {
//     resetScoreboard();
//     resetGame()
//     userStartedGame = false;
// });

// var audio = new Audio('./resources/audio/goe.mp3');
var audio = new Audio('./resources/audio/winnerMusic.mp3');
function winnerSong(reset = true, vol = 1) {

    if(reset === false) {
        if(audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        return;
    }
    // audio = new Audio('./resources/audio/goe.mp3');
    audio.volume = globalVolume * vol;
    audio.play();
    // console.log(ad);
}



function getDur() {
    return parseFloat(audio.duration);
}
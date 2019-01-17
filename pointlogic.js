var playerOneScore = 0;
var playerTwoScore = 0;
var leftScore = document.getElementById("leftScore");
var rightScore = document.getElementById("rightScore");
var p1 = document.getElementById("player1");
var p2 = document.getElementById("player2");


function countPlayerScore(counter, win) {
    if(counter == 10) {
        console.log("winner: " + win);
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
    scoreBoard();
    svg.style.display = "none";
}

function winSituation(win) {
    console.log("Whatever der nu sker når en vinder");
    bg(win);
}






p1.addEventListener("click", function() {
    playerOneScore.innerHTML = "<h3>" + playerOneScore + "</h3>";
    if(playerOneScore == 11) {
        return;
    }
    playerOneScore = countPlayerScore(playerOneScore, "player1");
    scoreBoard();
});

p2.addEventListener("click", function() {
    if(playerTwoScore == 11) {
        return;
    }
    playerTwoScore = countPlayerScore(playerTwoScore, "player2");
    scoreBoard();
});

document.getElementById("reset").addEventListener("click", function() {
    resetScoreboard();
});
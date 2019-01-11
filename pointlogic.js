var playerOneScore = 0;
var playerTwoScore = 0;

function countPlayerScore(counter) {
    return counter + 1;
}

function reset(score1, score2) {
    score1 = 0;
    score2 = 0;
    cb();
}

function cb() {
    document.getElementById("h1").textContent = "RESET";
}




document.getElementById("reset").addEventListener("click", function() {
    reset(playerOneScore, playerTwoScore);  u
});

document.getElementById("player1").addEventListener("click", function() {
    playerOneScore = countPlayerScore(playerOneScore);

    console.log(playerOneScore);
});
var playerOneScore = 0;
var playerTwoScore = 0;
var leftScore = document.getElementById("leftScore");
var rightScore = document.getElementById("rightScore");



function countPlayerScore(counter) {
    return counter + 1;
}

function reset() {
    playerOneScore = 0;
    playerTwoScore = 0;
}

leftScore.innerHTML = "<h3>" + playerOneScore + "</h3>";
rightScore.innerHTML = "<h3>" + playerTwoScore + "</h3>";





document.getElementById("reset").addEventListener("click", function() {
    reset();
});

document.getElementById("player1").addEventListener("click", function() {
    playerOneScore = countPlayerScore(playerOneScore);

    console.log(playerOneScore);
});

document.getElementById("player2").addEventListener("click", function() {
    playerTwoScore = countPlayerScore(playerTwoScore);

    console.log(playerTwoScore);
});
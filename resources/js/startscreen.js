var startScreen = document.getElementById("startScreen");
var spStart = document.getElementById("spStart");
var mpStart = document.getElementById("mpStart");
var leftControl = document.getElementById("leftConsole");
var aiLine = document.getElementById("offAi");
var aiBt = document.getElementById("aiBt");

function singlePlayer() {
    ai.active = true;
    startScreen.style.display = "none";
    leftControl.style.display = "none";
}

function multiPlayer() {
    ai.active = false;
    startScreen.style.display = "none";
    aiLine.style.display ="block";
}

spStart.addEventListener("click", function() {
    singlePlayer();
    handleStartButton();
});

mpStart.addEventListener("click", function() {
    multiPlayer();
    handleStartButton();
})

aiBt.addEventListener("click", function() {
    if (aiLine.style.display == "block") {
        aiLine.style.display = "none";
        leftControl.style.display = "none";
        ai.active = true;
    } else {
        aiLine.style.display = "block"
        leftControl.style.display = "block";
        ai.active = false;
    }
})
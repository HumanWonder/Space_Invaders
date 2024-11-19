function startStopwatch() {
    if (!stopWatchInterval) {
        startTime = new Date().getTime() - elapsedPausedTime; //to get back at the right time if paused
        stopWatchInterval = setInterval(updateStopwatch, 1000);
    }
}

function stopStopwatch() {
    clearInterval(stopWatchInterval);
    elapsedPausedTime = new Date().getTime() - startTime;
    stopWatchInterval = null;
}

function resetStopwatch() {
    stopStopwatch();
    elapsedPausedTime = 0;
    document.getElementById("stopwatch").innerHTML = "00.00.00";
}

function updateStopwatch() {
    var currentTime = new Date().getTime();
    var elapsedTime = currentTime - startTime; //calculate in milliseconds 
    var seconds = Math.floor(elapsedTime/1000) % 60;
    var minutes = Math.floor(elapsedTime/1000/60) % 60;
    var hours = Math.floor(elapsedTime/1000/60/60);
    var displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds); //formatting the display
    document.getElementById("stopwatch").innerHTML = displayTime;
}

function pad(nb) {
    return (nb < 10 ? "0" : "") + nb;
}

function initiateScore(){
    var scoreDiv = document.createElement("div");
    scoreDiv.id = "scoreBlock";
    scoreDiv.innerText = "Score : " + score;
    document.body.insertBefore(scoreDiv, workspace);
}

function displayLives(livesNumber) {
    var lifeBar = document.createElement("div")
    lifeBar.id = "lifeBar";
    lifeBar.style.height = `${100}px`
    lifeBar.style.display = "flex";
    document.body.appendChild(lifeBar);
    
    for (i = 0; i < livesNumber; i++) {
        var life = document.createElement("div")
        life.id = "life "+ (i+1);
        life.style.width = `${36}px`;
        life.style.height = `${16}px`;
        life.style.position = "relative";
        life.style.backgroundImage = "url(../ressources/playerSprite-export.png)";
        life.style.marginRight = "5px";
        // life.style.top = (i % livesNumber) + 'px';
        document.getElementById("lifeBar").appendChild(life);
    }

    return livesNumber
}

function enemyLives() {
    
}

// variable to store our intervalID
let nIntervId;

function flashPlayer() {
    count = 0;
  // check if an interval has already been set up
  if (!nIntervId) {
    nIntervId = setInterval(function() {
        //count to set a timer to clear the interval without an event
        if(count >= 4) {
            clearInterval(nIntervId);
            player.style.backgroundImage = "../ressources/playerSprite.png";
            //make sure the player is visible so it doesn't disappear
            player.style.visibility = "visible";
            //resets the interval to trigger it again
            nIntervId = null;
        } else {
            count++;
            flashDiv();
        }
    }, 100);
  }
}

function flashDiv() {
  const oElem = document.getElementById("player");
  oElem.style.visibility = (oElem.style.visibility == 'visible' ? 'hidden' : 'visible');
}

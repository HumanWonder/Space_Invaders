//Object defining keys and their functions if pressed
const controller = {
    37: { pressed: false, func: moveLeft },
    39: { pressed: false, func: moveRight },
    //80: { pressed:false, func: pauseGame },
    // 32: { pressed: false, func: shoot},
}
//problème : player est basé sur la distance DANS la div workspace alors que les borders ont la distance du navigateur
function moveLeft() {
    //gets the position of the div "player" from the left side of the workspace
    var leftPlayer =
        parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    //workspace left boundary : player won't move further 
    if (((leftPlayer - playerWidth) + leftBorderLimits.right) > leftBorderLimits.right) {
        player.style.left = leftPlayer - speed + "px";
    }
}

function moveRight() {
    //same as left but moves it by adding px
    var leftPlayer =
        parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    //workspace right boundary : player won't move further 
    if (((leftPlayer + (playerWidth * 1.5)) + leftBorderLimits.right) < rightBorderLimits.left) {
        player.style.left = leftPlayer + speed + "px";
    }
}
//makes the missile div on key press
function shoot() {
    //gets the x position of the player by its style (applied before)
    playerStartYPos = getPlayerPosition();
    var playerXPos = parseInt((getComputedStyle(player).left).split('px')[0]);
    //creates the div for the missile with an id (to apply style and find it later)
    const missile = document.createElement("div");
    missile.id = "missile";

    //where the missile will be placed on screen
    missile.style.left = playerXPos + (playerWidth / 3) + "px";
    missile.style.top = (playerStartYPos - playerHeight) + "px";
    //only appends the div once with a bool (it's false again after a condition in animateMissile func)
    if (!missileFired) {
        workspace.appendChild(missile);
        //will prevent shoot() to append missiles when space is pressed
        missileFired = true;
    }
}

//moves the missile upwards. The func is called from animate func in gameManager.js
function animateMissile() {
    var playerScore = document.getElementById("scoreBlock");

    //gets the top value
    var missilePos = ((getComputedStyle(missile).top).split("px")[0]);
    //gets the div to reapply values
    var div = document.getElementById("missile");

    missilePos -= missileSpeed;
    //reapplies top value to make it move a bit more up
    div.style.top = missilePos + "px";
    //condition to stop the missile (here where it reaches the top of the workspace div)
    if (missilePos <= 0) {
        //remove the div
        missile.remove();
        //bool to make shoot() able to recreate a missile on command
        missileFired = false;
    }
    if (document.getElementById("missile") && document.getElementById("enemyMissile")) {
        enemyMissileDiv = document.getElementById("enemyMissile");
        if (checkCollision(div, enemyMissileDiv)) {
            div.style.width = "12px";
            div.style.height = "16px";
            div.style.backgroundImage = "url(../ressources/missileDestroyed-export.png)";
            playerScore.innerText = "Score : " + (score + missileKilled);
            score += missileKilled;
            enemyMissileDiv.remove();
            setTimeout(function () {
                div.remove();
            }, 100);
            enemyMissiledFired = false;
            missileFired = false;
        }
    }

    if (document.getElementById("wrapperennemies")) {
        var bigbaddies = document.querySelectorAll(".enemy");
        bigbaddies.forEach((enemy) => {
            //console.log("checking :", enemy);

                if (checkCollision(div, enemy)) {
                    enemy.dataset.live -= 1 
                    if (enemy.dataset.live == 0) {
                        enemy.style.backgroundImage = "url(../ressources/enemyDestroyed-export.png)";

                        playerScore.innerText = "Score : " + (score + enemyKilled);
                        score += enemyKilled;
                        setTimeout(function () {
                            enemy.remove()
                        }, 500);
                    }

                    div.style.width = "12px";
                    div.style.height = "16px";
                    div.style.backgroundImage = "url(../ressources/missileDestroyed-export.png)"
                    div.remove();
                    missileFired = false;
                    // if no more enemies
                    if (bigbaddies.length == 1) {
                        playerScore.innerText = "Score : " + (score + enemyKilled);
                        score += enemyKilled;
                        console.log("You won !");
                        if (level != 3) {
                            level++
                            generateEnemies();
                        } else if (level == 3) {
                            setTimeout(function() {
                                victory();
                                return;
                            }, 500);
                        }
                    }
                }
        });

    }

}

//listens to a keydown event, passes the boolean value of the keycode value from our object
document.addEventListener("keydown", event => {
    if (controller[event.keyCode] && gamePlaying) {
        controller[event.keyCode].pressed = true
    }
    //launches the function on key press
    if (event.key == " " && gamePlaying) {
        shoot();
    } else if (event.key == "p" || event.key == "P") {
        if (gamePlaying) {
            pauseGame();
        } else if (!gamePlaying) {
            resumeGame();
        }
    } else if (event.key == "r" || event.key == "R") {
        if (!gamePlaying) {
            resetGame();
        } else {
            console.log("restarted");
            resetGame();
        }
    } else if (event.key == "Enter" && startTime == null) {
        gameStart();
    }
});

//opposite of the listener above
document.addEventListener("keyup", event => {
    if (controller[event.keyCode]) {
        controller[event.keyCode].pressed = false
    }
});
//Links the key event to its function (based on the object)
const executeMoves = () => {
    Object.keys(controller).forEach(key => {
        if (controller[key].pressed) {
            controller[key].func()
        }
    })
};

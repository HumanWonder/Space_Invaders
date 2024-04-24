//import { startStopwatch, stopStopwatch, resetStopwatch } from "./utils";
//blocks the player movements if game is paused or hasn't started yet

//button that loads the game (ideally)
function gameStart() {
    startStopwatch();
    initiateScore();
    // startButton = document.getElementById("startButton");
    startDiv = document.getElementById("startMenu");
    ws = document.getElementById("workspace");
    ws.style.display = "block";
    setLimits();

    startMenu.remove();
    playerLives = displayLives(3);
    gamePlaying = true;
    generateEnemies();
    window.requestAnimationFrame(animate);
}

function pauseGame() {
    //stops some functions 
    gamePlaying = false;
    stopStopwatch();
    const pauseMenu = document.createElement("div");
    pauseMenu.id = "pauseMenu";
    document.body.appendChild(pauseMenu);

    var pauseText = document.createTextNode("Game paused");
    // document.getElementById("pauseMenu").appendChild(pauseText);

    const resumeButton = document.createElement("button");
    resumeButton.innerText = "Continue";
    resumeButton.className = "button";
    resumeButton.id = "resumeButton";

    //document.getElementById("pauseMenu").appendChild(resumeButton);

    const restartButton = document.createElement("button");
    restartButton.innerText = "Restart";
    restartButton.className = "button";
    restartButton.id = "restartButton";
    // document.getElementById("pauseMenu").appendChild(restartButton);

    document.getElementById("pauseMenu").append(pauseText, resumeButton, restartButton);
    document.body.insertBefore(pauseMenu, workspace);

    resumeButton.addEventListener("click", function () {
        resumeGame();
    })

    restartButton.addEventListener("click", function () {
        resetGame();
        resumeGame();
    });

}

function resumeGame() {
    startStopwatch();
    gamePlaying = true;
    pauseMenu.remove();
}

function resetGame() {
    location.reload();
}

function victory() {
    gamePlaying = false;
    stopStopwatch();

    const victoryMenu = document.createElement("div");
    victoryMenu.id = "victoryMenu";
    document.body.insertBefore(victoryMenu, workspace);

    var victoryText = document.createTextNode("You won !");

    const newGameButton = document.createElement("button");
    newGameButton.className = "button";
    newGameButton.innerText = "New Game ?";
    newGameButton.id = "newGameButton";

    newGameButton.addEventListener("click", function () {
        location.reload();
    });
    document.getElementById("victoryMenu").append(victoryText, newGameButton);
}

function gameOver() {
    gamePlaying = false;
    stopStopwatch();

    const gameOverMenu = document.createElement("div");
    gameOverMenu.id = "gameOverMenu";
    document.getElementById("workspace").appendChild(gameOverMenu);

    var gameOverText = document.createTextNode("You're dead !");

    const newGameButton = document.createElement("button");
    newGameButton.className = "button";
    newGameButton.innerText = "Try Again ?";
    newGameButton.id = "newGameButton";

    newGameButton.addEventListener("click", function () {
        location.reload();
    });

    document.getElementById("gameOverMenu").append(gameOverText, newGameButton);
    // pauseGame(); 
}

//asks the browser to execute a function/logic before it adds a new frame
const animate = () => {
    executeMoves();
    if (gamePlaying) {
        if (changeWay) {
            moveEnemyLeft();
        } else {
            moveEnemyRight();
        }

        if (missileFired) {
            animateMissile();
        }
        if (enemyMissiledFired) {
            animateEnemyMissile();
        }
    }
    window.requestAnimationFrame(animate);
}
// window.requestAnimationFrame(animate);

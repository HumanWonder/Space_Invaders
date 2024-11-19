//Mettre toutes les dimensions de base et les mettre en var
//qu'on exporte pour que les changements soient plus fluides
//peut aussi être utiles quand on reset la partie (ex: après game over)
//notamment position joueur, bordures du workspace
//export playerStartXPos

// get a random Number
var randomNumber = (param => {
    return Math.floor(Math.random() * param)
})

//#region workspace
// get Workspace
var workspace = document.getElementById("workspace");
// workspace width
const workspaceBorderW = parseInt(window.getComputedStyle(workspace).getPropertyValue("width"));
// workspace height
const workspaceBorderH = parseInt(window.getComputedStyle(workspace).getPropertyValue("height"));
// workspace limits
const workspaceLimits = workspace.getBoundingClientRect();
console.log("workspace : ", workspaceLimits);
//#endregion

//////////////////////////////////////////////////////////////////////////////

//#region Enemies
// Enemies
const enemiesLimits = wrapperennemies.getBoundingClientRect();
// Get the enemy Wrapper
let enemies = document.getElementById("wrapperennemies");
// Bool for enemy fire
let enemyMissiledFired = false;
// Size
// sprite size = 18*8
var enemyWidth = 36
var enemyHeight = 16
// enemy speed
let enemySpeed = 3;
let enemyDown = 8;

var enemyLives = 0;
// bool for enemy moving
let changeWay = false;
// generation of enemies
let enemyNumber = 40;
let enemyPerLine = 10;
// speed of the enemy missile
let enemyMissileSpeed = 5;
// fireRate
setInterval(() => {
    enemyShoot(randomNumber(enemyNumber));
    // enemyMissileFired = true
}, 300); 
//#endregion

////////////////////////////////////////////////////////////////////////

//#region Player

// Player Lives
var playerLives = -1;

// player Y Pos
var playerYPosition;

// get the player
var player = document.getElementById("player");

// Player size
const playerHeight = parseInt(window.getComputedStyle(player).getPropertyValue("height"));
const playerWidth = parseInt(window.getComputedStyle(player).getPropertyValue("width"));

// player speed
var speed = 8

// player Missile
var missileSpeed = 10
var missileFired = false;

var score = 0;
var enemyKilled = 100;
var missileKilled = 150;
console.log(score + enemyKilled);

// get player position
function getPlayerPosition() {
    const playerStartXPos = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    //console.log("playerstart X :", playerStartXPos);
    //const playerStartYPos = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    const playerStartYPos = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    //console.log("playerstart Y :", playerStartYPos);
    return playerStartXPos, playerStartYPos;
}

// life System

var getLifeBar = document.getElementById("lifeBar");
for (i = 0; i < playerLives; i++) {
    var getLife = document.getElementById((i + 1));
}

//#endregion

/////////////////////////////////////////////////////////

//#region Collision
// Collision borders
const leftBorder = document.getElementById("left-border");
var leftBorderLimits = leftBorder.getBoundingClientRect();
console.log("left border : ", leftBorderLimits);
const rightBorder = document.getElementById("right-border");
var rightBorderLimits = rightBorder.getBoundingClientRect();
console.log("right border : ", rightBorderLimits);
//#endregion

//#region utils
var startTime;
var stopWatchInterval;
var elapsedPausedTime = 0; //keep track of the elapsed time while paused
var gamePlaying = false;
//#endregion

var level = 1;

//#region Enemy Map
//Legend :
//0: base enemy (1 shot required)
//1: type 2 enemy (2 shots required)
//2: harder enemy (3 shots required)
    var mapOne = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];    

    var mapTwo = [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 1, 1, 2, 2, 1, 1, 1, 0,
        0, 1, 1, 2, 2, 2, 2, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    var mapThree = [
        2, 1, 1, 0, 1, 1, 0, 1, 1, 2,
        1, 2, 1, 1, 0, 0, 1, 1, 2, 1,
        1, 1, 2, 1, 1, 1, 1, 2, 1, 1,
        0, 1, 1, 2, 1, 1, 2, 1, 1, 0,
        1, 0, 1, 1, 2, 2, 1, 1, 0, 1,
    ]
//#endregion
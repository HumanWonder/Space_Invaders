var player = document.getElementById("player");
var speed = 10;
var missileFired = false;

//Object defining keys and their functions if pressed
const controller = {
    37: { pressed: false, func: moveLeft },
    39: { pressed: false, func: moveRight },
    // 32: { pressed: false, func: shoot},
}

function moveLeft() {
    //gets the position of the div "player" from the left side of the workspace
    //redefines the "left" style by substracting px
    var leftBorder =
        parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    //workspace left boundary : player won't move further 
    if (checkCollisions(leftBorder, player)) {
        player.style.left = leftBorder - speed + "px";
    }
}
function moveRight() {
    //same as left but moves it by adding px
    var leftBorder =
        parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    //workspace right boundary : player won't move further 
    if (checkCollisions(rightBorder, player)) {
        player.style.left = leftBorder + speed + "px";
    }
}
//makes the missile div on key press
function shoot() {
    console.log("Pew");
    //gets the x position of the player by its style (applied before)
    var playerXPos = parseInt((getComputedStyle(player).left).split('px')[0]);
    // var playerYPos = playerStartYPos;
    //creates the div for the missile with an id (to apply style and find it later)
    const missile = document.createElement("div");
    missile.id = "missile";

    //where the missile will be placed on screen
    playerXPos += playerWidth/2;
    missile.style.left = playerXPos + "px";
    missile.style.top = (playerStartYPos-playerHeight) + "px";
    //only appends the div once with a bool (it's false again after a condition in animateMissile func)
    if (!missileFired) {
        workspace.appendChild(missile);
        //will prevent shoot() to append missiles when space is pressed
        missileFired = true;
    }
}
//moves the missile upwards. The func is called from animate func in gameManager.js
function animateMissile() {
    //gets the top value
    var missilePos = ((getComputedStyle(missile).top).split("px")[0]);
    //gets the div to reapply values
    var div = document.getElementById("missile");
    missilePos -= speed;
    //reapplies top value to make it move a bit more up
    div.style.top = missilePos + "px";
    //condition to stop the missile (here where it reaches the top of the workspace div)
    if (missilePos <= 0) {
        //remove the div
        missile.remove();
        //bool to make shoot() able to recreate a missile on command
        missileFired = false;
    }
}
//listens to a keydown event, passes the boolean value of the keycode value from our object
document.addEventListener("keydown", event => {
    if (controller[event.keyCode]) {
        console.log("pressed on")
        controller[event.keyCode].pressed = true
    }
    //launches the function on key press
    if (event.key == " ") {
        shoot();
    }
});
//opposite of the listener above
document.addEventListener("keyup", event => {
    if (controller[event.keyCode]) {
        console.log("pressed off")
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

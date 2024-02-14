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
    if (leftBorder > 0) {
        player.style.left = leftBorder - speed + "px";
    }
}
function moveRight() {
    //same as left but moves it by adding px
    var leftBorder =
        parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    //workspace right boundary : player won't move further 
    if (leftBorder < (workspaceBorderW-playerWidth)) {
        player.style.left = leftBorder + speed + "px";
    }
}
function shoot() {
    console.log("Pew");
    
    var playerXPos = parseInt((getComputedStyle(player).left).split('px')[0]);
    // var playerYPos = playerStartYPos;
    const missile = document.createElement("div");
    missile.id = "missile";

    playerXPos += playerWidth/2;
    missile.style.left = playerXPos + "px";
    missile.style.top = (playerStartYPos-playerHeight) + "px";
    if (!missileFired) {
        workspace.appendChild(missile);
        missileFired = true;
    }
}
function animateMissile() {
    var missilePos = ((getComputedStyle(missile).top).split("px")[0]);
    var div = document.getElementById("missile");
    missilePos -= speed;
    div.style.top = missilePos + "px";
    if (missilePos <= 0) {
        missile.remove();
        missileFired = false;
    }
}
//listens to a keydown event, passes the boolean value of the keycode value from our object
document.addEventListener("keydown", event => {
    if (controller[event.keyCode]) {
        console.log("pressed on")
        controller[event.keyCode].pressed = true
    }
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

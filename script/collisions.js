//collider for the one who receives, origin for the one who causes the action
// function checkCollisions(collider, origin) {
//     var colliderBorderLimits = collider.getBoundingClientRect();
//     var originBorderLimits = origin.getBoundingClientRect();

//     if (colliderBorderLimits.right < originBorderLimits.left && 
//         colliderBorderLimits.left > originBorderLimits.right) {
//             console.log("true dat no collision");
//             return true;
//         }

// }
function setLimits(){
    leftBorderLimits = leftBorder.getBoundingClientRect();
    rightBorderLimits = rightBorder.getBoundingClientRect();
}
window.addEventListener("resize", setLimits());
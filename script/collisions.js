function setLimits() {
    console.log("resized");
    leftBorderLimits = leftBorder.getBoundingClientRect();
    rightBorderLimits = rightBorder.getBoundingClientRect();
}
window.addEventListener("resize", setLimits());

function checkCollision(collider1, collider2) {
    let collider1limits = collider1.getBoundingClientRect();

    let collider1Width = parseInt(window.getComputedStyle(collider1).getPropertyValue("width"));
    let collider1Height = parseInt(window.getComputedStyle(collider1).getPropertyValue("height"));

    let collider2limits = collider2.getBoundingClientRect();

    let collider2Width = parseInt(window.getComputedStyle(collider2).getPropertyValue("width"));
    let collider2Height = parseInt(window.getComputedStyle(collider2).getPropertyValue("height"));

    let leftPos = collider2limits.left + collider2Width >= collider1limits.left;
    let rightPos = collider2limits.left <= collider1limits.left + collider1Width;

    let topPos = collider2limits.top + collider2Height >= collider1limits.top;
    let bottomPos = collider2limits.top <= collider1limits.top + collider1Height;

    if (leftPos && rightPos && topPos && bottomPos) {
        return true;
    } else {
        return false
    }
}

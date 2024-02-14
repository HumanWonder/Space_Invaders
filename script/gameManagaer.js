//button that loads the game (ideally)
function gameStart() {
    console.log("clicked start");
}
//asks the browser to execute a function/logic before it adds a new frame
const animate = () => {
    executeMoves();
    if (missileFired) {
        animateMissile();
    }
    window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);

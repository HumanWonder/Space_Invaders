//Mettre toutes les dimensions de base et les mettre en var
//qu'on exporte pour que les changements soient plus fluides
//peut aussi être utiles quand on reset la partie (ex: après game over)
//notamment position joueur, bordures du workspace
const workspaceBorderW = parseInt(window.getComputedStyle(workspace).getPropertyValue("width"));
const workspaceBorderH = parseInt(window.getComputedStyle(workspace).getPropertyValue("height"));

const playerHeight = parseInt(window.getComputedStyle(player).getPropertyValue("height"));
const playerWidth = parseInt(window.getComputedStyle(player).getPropertyValue("width"));
const playerStartXPos = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
const playerStartYPos = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
console.log(playerStartXPos, playerStartYPos);

const leftBorder = document.getElementById("left-border");
const rightBorder = document.getElementById("right-border");
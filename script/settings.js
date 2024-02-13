//Mettre toutes les dimensions de base et les mettre en var
//qu'on exporte pour que les changements soient plus fluides
//peut aussi être utiles quand on reset la partie (ex: après game over)
//notamment position joueur, bordures du workspace

const playerStartXPos = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
const playerStartYPos = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
console.log(playerStartXPos, playerStartYPos);
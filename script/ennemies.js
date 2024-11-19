function generateEnemies() {
    if (level == 1) {
        tileMapCreator(mapOne);
    } else if (level == 2) {
        tileMapCreator(mapTwo);
        enemies.style.left = 0;
        enemies.style.top = 0;
    } else if (level == 3) {
        tileMapCreator(mapThree);
        enemies.style.left = 0;
        enemies.style.top = 0;
    }
}


function tileMapCreator(map) {
    const tilemap = document.getElementById('wrapperennemies');

    for (var i = 0; i < map.length; i ++) {
        var tile = document.createElement('div');
        tile.classList = 'enemy';
        tile.id = i;
        if (map[i] == 0) {
            tile.style.backgroundImage = "url(../ressources/enemies1-export.gif)";
            tile.dataset.live = 1;
        } else if (map[i] == 1) {
            tile.style.backgroundImage = "url('../ressources/enemy2-export.gif')";
            tile.dataset.live = 2;
        } else if (map[i] == 2) {
            tile.style.backgroundImage = "url('../ressources/enemy3-export.gif')";
            tile.dataset.live = 3;
        }
        tile.style.left = (i % enemyPerLine) * (enemyWidth * 1.5) + 'px';
        tile.style.top = Math.floor(i / enemyPerLine) * (enemyHeight * 1.5) + 'px';
        tile.style.position = "absolute";
        tile.style.width = '32px';
        tile.style.height = '16px';
        tilemap.appendChild(tile);
        console.log(map[i]);

    }    
}

function moveEnemyRight() {
    var wrapperTop = parseInt(window.getComputedStyle(enemies).getPropertyValue("top"));
    var bigbaddies = document.querySelectorAll(".enemy");

    for (var i = 0; i < bigbaddies.length; i++) {
        var mob = bigbaddies[i];

        if ((parseInt(mob.style.left) + enemyWidth) + leftBorderLimits.right < rightBorderLimits.left) {
            mob.style.left = (parseInt(mob.style.left) + enemySpeed) + "px";
        } else {    
            mob.style.left = (parseInt(mob.style.left) + enemySpeed) + "px"; 
            console.log(enemySpeed)
            enemies.style.top = `${wrapperTop + enemyDown}px`
            changeWay = true
        }

        if (checkCollision(mob  , player)) {
            gameOver();
        }
    }

}

function moveEnemyLeft() {
    var wrapperTop = parseInt(window.getComputedStyle(enemies).getPropertyValue("top"));
    var bigbaddies = document.querySelectorAll(".enemy");

    for (var i = 0; i < bigbaddies.length; i++) {
        var mob = bigbaddies[i];

        if ((parseInt(mob.style.left)) + leftBorderLimits.right > leftBorderLimits.right) {
            mob.style.left = (parseInt(mob.style.left) - enemySpeed) + "px";
        } else {
            mob.style.left = (parseInt(mob.style.left) - enemySpeed) + "px";
            enemies.style.top = `${wrapperTop + enemyDown}px`
            changeWay = false
        }

        if (checkCollision(mob, player)) {
            gameOver();
        }
    }
}


function enemyShoot(enemyID) {
    // get the enemyID
    var shooter = document.getElementById(enemyID);
    var wrapper = document.getElementById("wrapperennemies");
    if (!shooter) {
        return
    }
    // create a div
    var enemyMissile = document.createElement("div");
    // define his ID
    enemyMissile.id = "enemyMissile";
    // wrapper position
    var wrapperXPos = parseInt(window.getComputedStyle(wrapper).getPropertyValue("left"));
    var wrapperYpos = parseInt(window.getComputedStyle(wrapper).getPropertyValue("top"))
    // enemy position
    var enemyXPos = parseInt(window.getComputedStyle(shooter).getPropertyValue("left"));
    var enemyYPos = parseInt(window.getComputedStyle(shooter).getPropertyValue("top"));
    // the position where the missile will start
    enemyMissile.style.left = `${(wrapperXPos + enemyXPos)}px`
    enemyMissile.style.top = `${wrapperYpos + enemyYPos}px`
    // wait 'til the first missile is removed
    
    if (!enemyMissiledFired && gamePlaying) {
        workspace.appendChild(enemyMissile);
        enemyMissiledFired = true;
    }
}

function animateEnemyMissile() {
    // get the enemy missile 
    var enemyMissileDiv = document.getElementById("enemyMissile");
    // get his position
    var enemyMissilePos = parseInt(window.getComputedStyle(enemyMissileDiv).getPropertyValue("top"));
    // add speed to enemyMissilePos 
    enemyMissilePos += enemyMissileSpeed;
    // give the enemyMissilePos value to the top value of enemyMissileDiv
    enemyMissileDiv.style.top = `${enemyMissilePos}px`;
    // if enemyMissilePos is over 700 px we delete it and set enemyMissiledFired to false to shoot another missile
    if (enemyMissilePos > workspaceBorderH - 16) {
        enemyMissileDiv.remove();
        enemyMissiledFired = false;
    }

    if (document.getElementById("enemyMissile")) {
        if (checkCollision(enemyMissileDiv, player)) {
            if (playerLives == 1) {
                gamePlaying = false;
                setTimeout(function() {
                    player.style.backgroundImage = "url(../ressources/playerDestroyedstate1-export.png)";
                }, 200)
                setTimeout(function() {
                    player.style.backgroundImage = "url(../ressources/playerDestroyedstate2-export.png)";
                }, 400)
                setTimeout(function() {
                    gameOver();
                }, 800);
            }
            enemyMissileDiv.remove();
            var deleteLife = document.getElementById("life " + playerLives);
            deleteLife.style.backgroundImage = "url(../ressources/playerLivesDestroyed-export.png)";
            playerLives -= 1;
            flashPlayer();
            enemyMissiledFired = false;
        }
    }
}
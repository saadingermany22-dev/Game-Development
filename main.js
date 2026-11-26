const canvas = document.getElementById('main_screen');
const context = canvas.getContext("2d");
var pressedKeys = {};
window.onkeyup   = function(e) { pressedKeys[e.keyCode] = false; }
window.onkeydown = function(e) { pressedKeys[e.keyCode] = true;  }

const titleScreen = document.getElementById("title-screen");

const layers = [
    document.getElementById("parallax-mountain-bg"),
    document.getElementById("parallax-mountain-montain-far"),
    document.getElementById("parallax-mountain-mountains"),
    document.getElementById("parallax-mountain-trees"),
    document.getElementById("parallax-mountain-foreground-trees")
];

const tiles = document.getElementById("tiles");

const heroIdleAnimationLeft     =    document.getElementById("knight-left");
const heroIdleAnimationRight    =    document.getElementById("knight-right");
const heroRunAnimationLeft      =    document.getElementById("knight-left");
const heroRunAnimationRight     =    document.getElementById("knight-right");
const heroJumpAnimationLeft     =    document.getElementById("knight-left");
const heroJumpAnimationRight    =    document.getElementById("knight-right");
const heroAttackAnimationLeft   =    document.getElementById("knight-left");
const heroAttackAnimationRight  =    document.getElementById("knight-right");
const heroCrouchAnimationLeft   =    document.getElementById("knight-left");
const heroCrouchAnimationRight  =    document.getElementById("knight-right");
const heroHurtAnimationLeft     =    document.getElementById("knight-left");
const heroHurtAnimationRight    =    document.getElementById("knight-right");

let heroAnimations = [
    [heroIdleAnimationLeft, 91],
    [heroIdleAnimationRight, 91],
    [heroRunAnimationLeft, 91],
    [heroRunAnimationRight, 91],
    [heroJumpAnimationLeft, 91],
    [heroJumpAnimationRight, 91],
    [heroAttackAnimationLeft, 91],
    [heroAttackAnimationRight, 91],
    [heroCrouchAnimationLeft, 91],
    [heroCrouchAnimationRight, 91],
    [heroHurtAnimationLeft, 91],
    [heroHurtAnimationRight, 91],
]

let heroAnimationIndex = 1;
let heroDirection = 1;
let heroJumping = false;
let heroPeakJumping = false;
let jumpPressedLastFrame = false;
let hoverjump = false; let jumpEffects = [];

var scrollX = 0;

var resetAnimationTime = Date.now();
var previousHeroAnimationIndex = 1;
let currentLevel = [];

let points = 0;

let gameStarted = false;
let gameOver = false;

let demoComplete = false;

var levels = [
    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,8,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,4,1,0,0,0,0,0,1,6,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,3,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,6,1,0,0,0,1,4,1,0,0,0,0,0,0,0,0,0,9,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,8,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,9,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,4,5,6,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,3,0,0,0,8,0,0,0,0,8,0,0,0,0,1,1,1,1,2,3,4,5,4,3,2,1,1,1,1,0,0,0,0,5,0,0,0,1,6,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]
];

const SCREEN_WIDTH = 816;
const SCREEN_HEIGHT = 480;
const TILE_SIZE = 32;
let distanceFromFloor = 0;
let nearestFloorHeight = -59;
let newJumpPress = false;
let attackCompleted = false;

let hero = {
    spriteWidth: 100,
    spriteHeight: 59,
    levelX: 160,
    levelY: 480-32-59,
    renderX: 100,
    renderY: 480-32-59,
    velocityY: 0,
}

/* Load Game Music */
var audioElement = document.getElementById("theAudio");
audioElement.load();
audioElement.volume = 0.4;
var audioPlaying = false;

/* For Safari Audio Compatibility */
var enterPressedInitially = false;
var beyondTitleScreen = false;
onInitialEnterPress = function(e) {
    if (e.key == "Enter") {
        enterPressedInitially = true;
        audioElement.play();
    }
}
document.addEventListener('keypress', onInitialEnterPress);

/* Draw Single Level Tile, 32x32 pixels */
var drawTile = function(x, y, tileIndex) {
    var sx = (tileIndex*32) - (64*Math.floor(tileIndex/64)*32);
    var sy = Math.floor(tileIndex/64)*32;
    context.drawImage(tiles, sx, sy, 32, 32, x, y, 32, 32);
}

/* Render Level Tiles */
var drawLevelTiles = function(level, hTiles, vTiles, scrollX) {
    for (var i = 0; i < hTiles; i++) {
        for (var j = 0; j < vTiles; j++) {
            var tile = level[j][i];
            if (tile == 0) continue;
            var tx = Math.floor(32 * i - scrollX);
            var ty = Math.floor(j * 32);
            if (tx + 32 < 0 || tx > SCREEN_WIDTH) continue;

            if (tile == 1 || tile == 2 || tile == 4 || tile == 5 || tile == 6) {
                // Unified Citadel Snow-Stone Block (with icy crystal accent on 4/5/6)
                context.fillStyle = (tile >= 4) ? "#19324d" : "#16263b";
                context.fillRect(tx, ty, 32, 32);
                context.fillStyle = (tile >= 4) ? "#274c70" : "#223854";
                context.fillRect(tx + 2, ty + 8, 28, 10);
                context.fillRect(tx + 2, ty + 20, 13, 10);
                context.fillRect(tx + 17, ty + 20, 13, 10);
                context.strokeStyle = "#0b1421";
                context.lineWidth = 1.5;
                context.strokeRect(tx + 0.5, ty + 0.5, 31, 31);

                // Sculpted Snow Cap + Icicles if top surface is open
                if (j == 0 || level[j - 1][i] == 0 || level[j - 1][i] == 3) {
                    context.fillStyle = "#e8fbff";
                    context.fillRect(tx, ty, 32, 6);
                    context.fillStyle = "#8ce8ff";
                    context.fillRect(tx, ty + 6, 32, 2);
                    context.fillStyle = "#bdf4ff";
                    context.fillRect(tx + 4, ty + 8, 3, 4);
                    context.fillRect(tx + 15, ty + 8, 2, 5);
                    context.fillRect(tx + 25, ty + 8, 3, 3);
                }
                // Carved Frost Bevel on bottom edge when floating in mid-air
                if (j < vTiles - 1 && level[j + 1][i] == 0) {
                    context.fillStyle = "#3a6ea5";
                    context.fillRect(tx + 2, ty + 29, 28, 3);
                }
            } else if (tile == 8 || tile == 9) {
                // Carved Frost Citadel Pillar
                context.fillStyle = "#1d3557";
                context.fillRect(tx + 4, ty, 24, 32);
                context.fillStyle = "#457b9d";
                context.fillRect(tx + 8, ty, 6, 32);
                context.strokeStyle = "#0b1421";
                context.strokeRect(tx + 4.5, ty + 0.5, 23, 31);
            } else if (tile == 10) {
                drawTile(tx, ty, 49 + 64 * 9);
            } else if (tile == 12) {
                drawTile(tx, ty, 23 + 64 * 1);
            } else if (tile == 3) {
                // Rune-Carved Frost Block (matches Citadel stone blocks with an inlaid cyan rune)
                context.fillStyle = "#162d47";
                context.fillRect(tx, ty, 32, 32);
                context.strokeStyle = "#0b1421";
                context.lineWidth = 1.5;
                context.strokeRect(tx + 0.5, ty + 0.5, 31, 31);

                // Inner frost frame
                context.strokeStyle = "#3b7ea1";
                context.lineWidth = 1;
                context.strokeRect(tx + 3.5, ty + 3.5, 25, 25);

                // Glowing cyan citadel rune inlay
                context.fillStyle = "#00d4ff";
                context.fillRect(tx + 12, ty + 9, 8, 14);
                context.fillRect(tx + 9, ty + 12, 14, 8);
                context.fillStyle = "#e8fbff";
                context.fillRect(tx + 13, ty + 13, 6, 6);

                // Top snow trim if exposed to air above
                if (j == 0 || level[j - 1][i] == 0) {
                    context.fillStyle = "#e8fbff";
                    context.fillRect(tx, ty, 32, 5);
                    context.fillStyle = "#8ce8ff";
                    context.fillRect(tx, ty + 5, 32, 2);
                }
            }
        }
    }
};
/* Check Single Tile for Collision with Player or other Sprite */
var checkSpriteTileCollision = function(sprite, tileX, tileY, tileIndex, collisions) {
    if ((sprite.levelX + sprite.spriteWidth >= tileX &&
        sprite.levelX <= tileX + TILE_SIZE) && 
        (sprite.levelY + sprite.spriteHeight >= tileY &&
            sprite.levelY <= tileY + TILE_SIZE)) {
                let intersect = {
                    x: Math.max(sprite.levelX,tileX),
                    y: Math.max(sprite.levelY,tileY),
                }
                intersect.width = Math.min(sprite.levelX + sprite.spriteWidth, 
                    tileX + TILE_SIZE) - intersect.x;
                intersect.height = Math.min(sprite.levelY + sprite.spriteHeight, 
                    tileY + TILE_SIZE) - intersect.y;
                if (sprite.levelX+sprite.spriteWidth/2 > tileX+TILE_SIZE/2 && 
                    intersect.height > intersect.width) collisions.left = true;
                if (sprite.levelX+sprite.spriteWidth/2 < tileX+TILE_SIZE/2 && 
                    intersect.height > intersect.width) collisions.right = true;
                if (sprite.levelY+sprite.spriteHeight/2 < tileY+TILE_SIZE/2 && 
                    intersect.width > intersect.height && intersect.width > 4){
                    collisions.top = true;
                    collisions.topY = tileY;
                }
                if (sprite.levelY+sprite.spriteHeight/2 > tileY+TILE_SIZE/2 && 
                    intersect.width > intersect.height && intersect.width > 4){
                        collisions.bottom = true;
                }
        }
}

/* Check for Collision Between Hero and Level Tiles */
var checkSpriteTileCollisions = function(sprite, level) {
    let levelWidth = level[0].length;
    let levelHeight = level.length;
    let collisions = {
        left: false,
        right: false,
        top: false,
        bottom: false,
        topY: null,
    }
    for (let i=0; i<levelWidth; i++) {
        for (let j=0; j<levelHeight; j++) {
            if (level[j][i] != 0) {
                checkSpriteTileCollision(sprite, i*TILE_SIZE, 
                    j*TILE_SIZE, level[j][i], collisions);
            }
        }
    }
    return collisions;
}

/* Reset Game and Level */
var resetGame = function() {
    hero = {
        spriteWidth: 100,
        spriteHeight: 59,
        levelX: 160,
        levelY: 480-32-59,
        renderX: 100,
        renderY: 480-32-59,
        velocityY: 0,
    };
    currentLevel = JSON.parse(JSON.stringify(levels[0]));
    scrollX = 0;
    points = 0;
    hoverjump = false;
    heroAnimationIndex = 1;
    heroDirection = 1;
    heroJumping = false;
    heroPeakJumping = false;
    jumpPressedLastFrame = false;
    hoverjump = false;
    scrollX = 0;
    resetAnimationTime = Date.now();
    previousHeroAnimationIndex = 1;
    points = 0;
    distanceFromFloor = 0;
    nearestFloorHeight = -59;
    newJumpPress = false;
    attackCompleted = false;
}

/* Title / Menu Screen */
var titleScreenLoop = function(now, oldTime) {
    var sx=0;
    var sy=0;
    var swidth=384;
    var sheight=224;
        let customBg = document.getElementById("start-bg");
    if (customBg && customBg.complete) { context.drawImage(customBg, 0, 0, 816, 480); }
    // Darken backdrop & add radial spotlight behind knight so title, Press Enter, and hero pop
    context.fillStyle = "rgba(3, 10, 24, 0.48)";
    context.fillRect(0, 0, 816, 480);
    let spot = context.createRadialGradient(408, 335, 15, 408, 335, 165);
    spot.addColorStop(0, "rgba(180, 245, 255, 0.24)");
    spot.addColorStop(1, "rgba(3, 10, 24, 0)");
    context.fillStyle = spot;
    context.fillRect(0, 0, 816, 480); context.font = "90px Luminari, fantasy";
    let g = context.createLinearGradient(0, 70, 0, 150); g.addColorStop(0, "#ffffff"); g.addColorStop(0.5, "#7ef9ff"); g.addColorStop(1, "#0077ff"); context.shadowColor = "rgba(0, 210, 255, 0.85)"; context.shadowBlur = 18; context.fillStyle = g;
    context.fillText("The Last Citadel", 85, 140); context.shadowBlur = 0;
    context.font = "60px Luminari, fantasy";
    context.shadowColor = "rgba(0, 180, 255, 0.9)"; context.shadowBlur = 12; context.fillStyle = "rgba(30, 144, 255, " + 
        (0.75+0.15*Math.cos(2*3.1415*(Math.round(now - oldTime)/1000))) + ")";
    context.fillText("Press Enter", 240, 260); context.shadowBlur=0; context.shadowBlur = 0;
    let currentFrame = Math.floor((Date.now()/110) % 8);
    context.drawImage(heroAnimations[heroAnimationIndex][0], 
        currentFrame*hero.spriteWidth, 0, hero.spriteWidth, 
        hero.spriteHeight, SCREEN_WIDTH/2-100, 280, 
        200, 59*2);
    if (pressedKeys["13"] || (enterPressedInitially && !beyondTitleScreen)) {
        gameStarted = true;
        beyondTitleScreen = true;
    }
}

/* Game Over Screen */
var gameOverScreen = function(now, oldTime) {
    context.fillStyle = "black";
    context.fillRect(0, 0, 816, 480);
    context.font = "90px Luminari, fantasy";
    context.fillStyle = "red";
    context.fillText("Game Over", 170, 140);
    context.font = "60px Luminari, fantasy";
    context.shadowColor = "rgba(0, 180, 255, 0.9)"; context.shadowBlur = 12; context.fillStyle = "rgba(30, 144, 255, " + 
        (0.50+0.10*Math.cos(2*3.1415*(Math.round(now - oldTime)/1000))) + ")";
    context.fillText("Press ESC to Exit", 170, 260);
    let currentFrame = Math.floor((((Date.now())/100) % 
        heroAnimations[11][1]));
    context.drawImage(heroAnimations[11][0], 
        currentFrame*hero.spriteWidth, 0, hero.spriteWidth, 
        hero.spriteHeight, SCREEN_WIDTH/2-100, 280, 
        200, 59*2);
    if (pressedKeys["27"]) {
        resetGame();
        gameOver = false;
    }
}

/* Level / Demo Complete Screen */
var demoCompleteScreen = function(now, oldTime) {
    context.fillStyle = "rgb(67, 67, 67)";
    context.fillRect(0, 0, 816, 480);
    context.font = "90px Luminari, fantasy";
    context.fillStyle = "#4BB543";
    context.fillText("Level Complete", 90, 140);
    context.font = "60px Luminari, fantasy";
    context.fillStyle = "white";
    const zeroPad = (num, places) => String(num).padStart(places, '0');
    context.fillText("Score: " + zeroPad(points, 5) + " Pts", 180, 220);
    context.font = "50px Luminari, fantasy";
    context.shadowColor = "rgba(0, 180, 255, 0.9)"; context.shadowBlur = 12; context.fillStyle = "rgba(30, 144, 255, " + 
        (0.50+0.10*Math.cos(2*3.1415*(Math.round(now - oldTime)/1000))) + ")";
    context.fillText("Press ESC to Exit", 200, 290);
    let currentFrame = Math.floor((((Date.now())/100) % 
        heroAnimations[3][1]));
    context.drawImage(heroAnimations[3][0], 
        currentFrame*hero.spriteWidth, 0, hero.spriteWidth, 
        hero.spriteHeight, SCREEN_WIDTH/2-100, 280, 
        200, 59*2);
    if (pressedKeys["27"]) {
        resetGame();
        demoComplete = false;
    }
}

/* Main Game Loop */
var gameLoop = function(interval) {

    /* Clear Screen */
	context.clearRect(0, 0, canvas.width, canvas.height);

    /* Update scroll position */
    if (hero.levelX + hero.spriteWidth/2 >= SCREEN_WIDTH/2 && 
        scrollX+SCREEN_WIDTH < currentLevel[0].length*TILE_SIZE ||
        (hero.levelX + SCREEN_WIDTH/2 + hero.spriteWidth/2 <= 
        currentLevel[0].length*TILE_SIZE && scrollX > 0)) {
        scrollX = hero.levelX - SCREEN_WIDTH/2 + hero.spriteWidth/2;
    }
    hero.renderX = hero.levelX - scrollX;
    hero.renderY = hero.levelY;

    /* Draw Custom Glacier Mountain Background (Parallax Scrolling) */
    let gBg = document.getElementById("game-bg");
    if (gBg && gBg.complete) {
        let bgScroll = (scrollX * 0.25) % 816;
        context.drawImage(gBg, -bgScroll, 0, 816, 480);
        context.drawImage(gBg, 816 - bgScroll, 0, 816, 480);
    }
    context.fillStyle = "rgba(3, 12, 28, 0.42)";
    context.fillRect(0, 0, 816, 480);
    drawLevelTiles(currentLevel, currentLevel[0].length, currentLevel.length, scrollX);

    /* Draw Hero */
        let animRanges = {
        0: [0, 8],   1: [0, 8],    // Idle (clean calm stance)
        2: [0, 8],   3: [0, 8],    // Run (clean calm stance, no random sword slashes)
        4: [53, 1],  5: [53, 1],   // Jump (swept-back leap pose)
        6: [45, 14], 7: [45, 14],  // Attack (reserved for Phase 2 enemy combat)
        8: [0, 8],   9: [0, 8],    // Crouch
        10: [75, 6], 11: [75, 6]   // Hurt
    };
    let [startF, countF] = animRanges[heroAnimationIndex] || [0, 8];
    let currentFrame = startF + Math.floor((((Date.now()-resetAnimationTime)/90) % countF));
    if ((heroAnimationIndex==4 || heroAnimationIndex==5) && heroJumping && 
        currentFrame == heroAnimations[heroAnimationIndex][1] - 1) {
        heroPeakJumping = true;
    }
    if ((heroAnimationIndex==4 || heroAnimationIndex==5) && heroPeakJumping) {
        currentFrame = heroAnimations[heroAnimationIndex][1] - 1;
    }
    // Left facing, reverse order of frames since images are flipped
    if (heroDirection == 0) {
        currentFrame = (startF + countF - 1) - (currentFrame - startF); 
    }
        // Draw expanding frost jump rings
    for (let k = jumpEffects.length - 1; k >= 0; k--) {
        let je = jumpEffects[k];
        context.save();
        context.strokeStyle = "rgba(126, 249, 255, " + je.alpha + ")";
        context.lineWidth = 2.5;
        context.beginPath();
        context.ellipse(je.x - scrollX, je.y, je.r * 1.6, je.r * 0.45, 0, 0, Math.PI * 2);
        context.stroke();
        context.restore();
        je.r += 2.2;
        je.alpha -= 0.055;
        if (je.alpha <= 0) jumpEffects.splice(k, 1);
    }

    // Combined: Athletic swept-back sword leap + animated flapping icy spectral wings
    let inAir = distanceFromFloor > 2 || Math.abs(hero.velocityY) > 0.6;
    let scaleX = 1, scaleY = 1, tilt = 0;
    let dir = heroDirection ? 1 : -1;
    let drawFrame = currentFrame;

    let cx = hero.renderX + 50;
    let cy = hero.renderY + 59;

    if (inAir) {
        // 1. Swept-back sword leap pose + upward torso stretch & chest-up arch
        let jumpPoseFrame = 37;
        drawFrame = heroDirection ? jumpPoseFrame : (90 - jumpPoseFrame);
        let liftFactor = Math.min(1, Math.abs(hero.velocityY) / 10);
        scaleX = 0.84;
        scaleY = 1.24 + liftFactor * 0.06;
        tilt = hero.velocityY < 0 ? (-0.18 * dir) : (0.14 * dir);

        // Swept-back blue flame afterimage trail
        context.save();
        context.globalAlpha = 0.28;
        context.drawImage(heroAnimations[heroAnimationIndex][0], drawFrame*hero.spriteWidth, 0, hero.spriteWidth, hero.spriteHeight, hero.renderX + 13 - (dir * 10), hero.renderY + 18 - hero.velocityY * 1.3, 74, 44);
        context.restore();

        // Animated flapping glacial wings behind the knight's back
        let flapSpeed = hero.velocityY < 0 ? 55 : 95;
        let flapAngle = Math.sin(Date.now() / flapSpeed) * 0.55;
        let wingBaseX = cx - (dir * 6);
        let wingBaseY = cy - 26;

        context.save();
        context.translate(wingBaseX, wingBaseY);
        context.shadowColor = "rgba(0, 225, 255, 0.9)";
        context.shadowBlur = 12;

        // Draw back & front translucent icy wings with 3 feathered blades each
        for (let w = 0; w < 2; w++) {
            context.save();
            let sideSign = w === 0 ? -dir : -dir * 0.65;
            let wingTilt = (w === 0 ? -0.35 + flapAngle : -0.15 + flapAngle * 0.85) * dir;
            context.rotate(wingTilt);

            let wingGrad = context.createLinearGradient(0, 0, sideSign * 34, -18);
            wingGrad.addColorStop(0, "rgba(224, 255, 255, 0.92)");
            wingGrad.addColorStop(0.5, "rgba(64, 210, 255, 0.72)");
            wingGrad.addColorStop(1, "rgba(0, 119, 255, 0.15)");
            context.fillStyle = wingGrad;

            // Upper wing blade
            context.beginPath();
            context.moveTo(0, 0);
            context.quadraticCurveTo(sideSign * 18, -22, sideSign * 36, -12);
            context.quadraticCurveTo(sideSign * 20, -4, 0, 4);
            context.fill();

            // Mid wing blade
            context.beginPath();
            context.moveTo(0, 2);
            context.quadraticCurveTo(sideSign * 15, -10, sideSign * 28, 2);
            context.quadraticCurveTo(sideSign * 14, 6, 0, 7);
            context.fill();

            // Lower wing feather
            context.beginPath();
            context.moveTo(0, 5);
            context.quadraticCurveTo(sideSign * 10, 2, sideSign * 19, 12);
            context.quadraticCurveTo(sideSign * 9, 12, 0, 9);
            context.fill();
            context.restore();
        }
        context.restore();
    }

    context.save();
    context.translate(cx, cy);
    context.rotate(tilt);
    context.scale(scaleX, scaleY);
    context.drawImage(heroAnimations[heroAnimationIndex][0], drawFrame*hero.spriteWidth, 0, hero.spriteWidth, hero.spriteHeight, -37, -44, 74, 44);
    context.restore();

    let collisions = checkSpriteTileCollisions({
        levelX: hero.levelX+25,
        levelY: hero.levelY,
        spriteWidth: 50,
        spriteHeight: hero.spriteHeight
    }, currentLevel);

    /* A */
    if (pressedKeys["65"]) {
        if (hero.levelX > -25 && !collisions.left) {
            hero.levelX -= 240*interval;
        }
        heroAnimationIndex = 2;
        heroDirection = 0;
    }

    /* D */
    if (pressedKeys["68"]) {
        if (hero.levelX + hero.spriteWidth - 25 - 30 < 
            currentLevel[0].length*TILE_SIZE && !collisions.right) {
            hero.levelX += 240*interval;
        }
        heroAnimationIndex = 3;
        heroDirection = 1;
    }

    if (!(pressedKeys[65] || pressedKeys[68])) {
        if (heroDirection) heroAnimationIndex = 1;
        else heroAnimationIndex = 0;
    }

    /* S */
    if (pressedKeys["83"]) {
        if (heroDirection) {
            heroAnimationIndex = 9;
        } else {
            heroAnimationIndex = 8;
        }
    }

    /* K */
    if (pressedKeys["75"]) {
        if (heroDirection) {
            if (currentFrame == 4 && previousHeroAnimationIndex == 7) {
                attackCompleted = true;
            }
            if (attackCompleted && pressedKeys["68"]) {
                heroAnimationIndex = 3;
            }  else if (attackCompleted && 
                !(pressedKeys[65] || pressedKeys[68])) {
                heroAnimationIndex = 1;
            } else {
                heroAnimationIndex = 7;
            }
        }
        else {
            if (currentFrame == 0 && previousHeroAnimationIndex == 6) {
                attackCompleted = true;
            }
            if (attackCompleted && pressedKeys["65"]) {    
                heroAnimationIndex = 2;
            } else if (attackCompleted && 
                !(pressedKeys[65] || pressedKeys[68])) {
                heroAnimationIndex = 0;
            } else {
                heroAnimationIndex = 6;
            }
        }
    } else {
        attackCompleted = false;
    }

    /* W */
    if ((pressedKeys["87"] || pressedKeys["32"])) {
        if (distanceFromFloor > 0 || hoverjump) {
            if (heroDirection) heroAnimationIndex = 5;
            else heroAnimationIndex = 4;
        }
        heroJumping = true;
    } else {
        heroJumping = false;
        heroPeakJumping = false;
    }
    

    if (previousHeroAnimationIndex != heroAnimationIndex) {
        resetAnimationTime = Date.now();
    }

    /* Physics */
    if ((hero.velocityY >= 0 && collisions.top)) {
        nearestFloorHeight = SCREEN_HEIGHT-collisions.topY;
    } else nearestFloorHeight = -hero.spriteHeight;

    distanceFromFloor = SCREEN_HEIGHT - 
        nearestFloorHeight - (hero.levelY + hero.spriteHeight);
    if (distanceFromFloor > 0 && !(hoverjump && heroJumping)) {
        hero.velocityY += 0.5;      /* Gravity */
    } else {
        hero.velocityY = 0;
    }
    if (distanceFromFloor <= 0) {
        hero.levelY = SCREEN_HEIGHT - nearestFloorHeight - 
            hero.spriteHeight;
    }

    /* Hover Jump */
    if (hoverjump) {
        if (heroJumping && !newJumpPress) {
            newJumpPress = true;
        } else newJumpPress = false;
        if (newJumpPress) {
            // hero.levelY -= 1;
            hero.velocityY = -4;
        }
    } else {
        /* Traditional Jump */
        if (heroJumping && !newJumpPress && 
            distanceFromFloor <= 0 && !jumpPressedLastFrame) {
            newJumpPress = true;
        } else newJumpPress = false;
        if (newJumpPress) {
            hero.levelY -= 1;
            hero.velocityY = -10; jumpEffects.push({x: hero.levelX + 50, y: hero.levelY + 56, r: 6, alpha: 0.95});
        }
    }

    if ((hero.velocityY > 0 && collisions.top) || 
        (hero.velocityY < 0 && hero.levelY <= -10) ||
        (hero.velocityY < 0 && collisions.bottom)) {
        hero.velocityY = 0;
    }
    hero.levelY += hero.velocityY;

    /* Wings */
    let touchedWings = {top: false, topY:null, 
        bottom:false, left: false, right: false};
    checkSpriteTileCollision({
        levelX: hero.levelX+25,
        levelY: hero.levelY,
        spriteWidth: 50,
        spriteHeight: hero.spriteHeight
    }, 82*TILE_SIZE, 13*TILE_SIZE, 10, touchedWings);
    if (touchedWings.top || touchedWings.bottom || 
        touchedWings.left || touchedWings.right) {
        if (currentLevel[13][82] == 10) {
            points += 800;
            currentLevel[13][82] = 0;
        }
        hoverjump = true;
    }

    /* Golden Cross */
    let touchedCross = {top: false, topY:null, 
        bottom:false, left: false, right: false};
    checkSpriteTileCollision({
        levelX: hero.levelX+25,
        levelY: hero.levelY,
        spriteWidth: 50,
        spriteHeight: hero.spriteHeight
    }, 102*TILE_SIZE, 2*TILE_SIZE, 10, touchedCross);
    if (touchedCross.top || touchedCross.bottom || 
        touchedCross.left || touchedCross.right) {
        if (currentLevel[2][102] == 12) {
            points += 10000;
            currentLevel[2][102] = 0;
        }
    }

    jumpPressedLastFrame = (pressedKeys["87"] || pressedKeys["32"]);
    previousHeroAnimationIndex = heroAnimationIndex;

    if (hero.levelX + hero.spriteWidth/2 >= 
        TILE_SIZE*currentLevel[0].length) {
        demoComplete = true;
        gameStarted = false;
    }

    if (hero.levelY >= SCREEN_HEIGHT) {
        gameOver = true;
        gameStarted = false;
    }
}

/* Set FPS */
let FPS = 60;
let interval = 1 / FPS;
let frameCounter = 0;
let oldTime = Date.now();
let previousFrameTime = oldTime;

/* Load Current Level */
currentLevel = JSON.parse(JSON.stringify(levels[0]));

/* Game States */
setInterval(function() {
    let now = Date.now();
    if (!gameStarted) {
        if (gameOver) {
            if (audioPlaying) {
                audioElement.pause();
                audioPlaying = false;
            }
            gameOverScreen(now, oldTime);
        } else if (demoComplete){
            demoCompleteScreen(now, oldTime);
        } else {
            if (audioPlaying) {
                audioElement.pause();
                audioPlaying = false;
            }
            titleScreenLoop(now, oldTime);
        }
    } else {
        if (!audioPlaying) {
            audioElement.currentTime = 0;
            if (enterPressedInitially) {
                audioElement.play();
                document.removeEventListener('keypress', 
                    onInitialEnterPress);
            }
            audioPlaying = true;
        }
        gameLoop(interval);
        context.font = "28px Luminari, fantasy";
        context.fillStyle = "rgb(255, 247, 227)";
        context.fillStyle="rgba(5, 22, 42, 0.72)"; context.fillRect(12, 14, 138, 44); context.strokeStyle="#7ef9ff"; context.lineWidth=2; context.strokeRect(12, 14, 138, 44); context.shadowColor="rgba(0, 210, 255, 0.85)"; context.shadowBlur=10; context.fillStyle="#e0ffff"; context.fillText(points + " Pts", 24, 46); context.shadowBlur=0;
    }
    previousFrameTime = now;
    frameCounter++;
    if (now - oldTime > 1000) {
        frameCounter = 0;
        oldTime = Date.now();
    }
}, interval * 1000);




























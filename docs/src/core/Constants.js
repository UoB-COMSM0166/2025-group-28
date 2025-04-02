// Room generation constants
var roomHeight = 37;
var roomWidth = 50;
var tileSize = 16;
var doorBuffer = 5; // To prevent door spawning too close to edges of room
var wallBuffer = 6; // To prevent wall shapes spawning too close to outer walls
var step = 4;
// Collision constants
var pushback = 1; // Prevents sticking

var knockbackForce = 5;

const GameStates = Object.freeze({
  ACTIVE: 0,
  PAUSE: 1,
  OVER: 2,
});

const tileTypes = Object.freeze({
  FLOOR: 0,
  WALL: 1,
});

const MoveDirections = Object.freeze({
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
});

const wallVariants = Object.freeze({
  SQR: 0,
  L1: 1,
  L2: 2,
});

const playerNumber = Object.freeze({
  PLAYER_1: 0,
  PLAYER_2: 1,
});

const difficultyLevels = Object.freeze({
  EASY: 0,
  NORMAL: 1,
  HARD: 2,
});

const difficultySettings = Object.freeze([
  {
    playerDamage: 10,
    spawnRate: 3000,
    maxMobs: 4,
    meleeMobHealth: 60,
    meleeMobSpeed:() => random(0.6,1.0),
    meleeMobDamage: 7,
    rangedMobHealth: 50,
    rangedMobSpeed:() => random(0.5,0.9),
    rangedMobDamage: 5,
    blinkMobHealth: 40,
    blinkMobSpeed: 0,
    blinkMobDamage: 4,
    totalMobs:() => mobTotalIncrementer(),
  }, // Easy mode
  {
    playerDamage: 10,
    spawnRate: 3000,
    maxMobs: 4,
    meleeMobHealth: 75,
    meleeMobSpeed:() => random(0.8,1.2),
    meleeMobDamage: 12,
    rangedMobHealth: 60,
    rangedMobSpeed:() => random(0.7,1.1),
    rangedMobDamage: 8,
    blinkMobHealth: 50,
    blinkMobSpeed: 0,
    blinkMobDamage: 6,
    totalMobs:() => mobTotalIncrementer(),
  }, // Normal mode
  {
    playerDamage: 10,
    spawnRate: 3000,
    maxMobs: 5,
    meleeMobHealth: 100,
    meleeMobSpeed:() => random(1.2,1.6),
    meleeMobDamage: 20,
    rangedMobHealth: 80,
    rangedMobSpeed:() => random(0.8,1.4),
    rangedMobDamage: 15,
    blinkMobHealth: 75,
    blinkMobSpeed: 0,
    blinkMobDamage: 10,
    totalMobs: () => mobTotalIncrementer(),
  }, // Hard mode
]);

let menuBacking;

let meowSound;
let acGunSound;
let gunSound_b;
let theme_a;

function preload() {
  tile_darkGrey = loadImage("assets/alternatetile1.png");
  tile_lightGrey = loadImage("assets/alternatetile2.png");
  tile_darkBlue = loadImage("assets/alternatetile3.png");
  tile_lightBlue = loadImage("assets/alternatetile4.png");
  tile_darkYellow = loadImage("assets/alternatetile5.png");
  tile_lightYellow = loadImage("assets/alternatetile6.png");
  walltile = loadImage("assets/wall_tile_m3.png");
  tileColours1 = [tile_darkGrey, tile_lightGrey];
  tileColours2 = [tile_darkBlue, tile_lightBlue];
  tileColours3 = [tile_darkYellow, tile_lightYellow];

  wallImg = loadImage("assets/wall.png");
  doorImg = loadImage("assets/spacedoor.gif");
  doorOpenImg = loadImage("assets/spacedoorOpen.gif");
  astrocat = loadImage("assets/astrocat.png");
  dogMob = loadImage("assets/dog.png");
  bullet = loadImage("assets/projectileM1.gif");
  fireball = loadImage("assets/fireballAI.png");
  buttonPrompt = loadImage("assets/doorprompt.gif");
  pixelHeart = loadImage("assets/heart.gif");
  pixelEnergy = loadImage("assets/energy.gif");

  gameFont = loadFont("assets/ARCADE_I.ttf");

  dogmob_gif = loadImage("assets/dogmob_v3.gif");
  rangedmob_gif = loadImage("assets/yellowDogMob.gif");
  blinkMobGif = loadImage("assets/purpleDogMob.gif")
  astrocat_gif = loadImage("assets/astrocatM7.gif");
  astrocat_gif_p2 = loadImage("assets/astrocatp2_m7.gif");

  // sounds

  meowSound = loadSound("assets/cat-meowing-type-02-293290.mp3");
  acGunSound = loadSound("assets/player_gun.mp3");
  gunSound_b = loadSound("assets/shot2.mp3");
  theme_a = loadSound("assets/theme.mp3");
  // menuanimated = loadImage("assets/acbackground.gif");
}

// HTML <img> paths (no need to preload):

let singlePlayerIcon = "assets/singlepbutton.png";
let coopIcon = "assets/twopbutton.png";
let helpIcon = "assets/helpbutton.png";
let menuimg = "assets/menuback.mp4";

let pageWidth = 900;
let pageHeight = 750;

// this realistically sucks but its better than nthing
function mobTotalIncrementer() {
  let start = 1
  if (gameCount < 5) {
    return start + gameCount
  } else if (gameCount < 6) {
    return 5;
  } else if (gameCount < 8) {
    return 6;
  } else if (gameCount < 11) {
    return 7;
  } else if (gameCount < 14) {
    return 8;
  } else if (gameCount < 18) {
    return 9;
  } else {
    return 10;
  }
}
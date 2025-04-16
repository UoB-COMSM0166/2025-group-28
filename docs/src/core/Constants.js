// Displacement from origin to start drawing room etc. - to centre room in new larger canvas

// USER CONFIG - move on refactor

let wasd_control = true;
let pvp_rooms = 3; //var for 'best of x' system

let p1_up = 87;
let p1_down = 83;
let p1_left = 65;
let p1_right = 68;
let p1_shoot = 32;

let p2_up = 38;
let p2_down = 40;
let p2_left = 37;
let p2_right = 39;
let p2_shoot = 13;

function switchControl(is_wasd) {
  if (is_wasd) {
    p1_up = 87;
    p1_down = 83;
    p1_left = 65;
    p1_right = 68;
    p1_shoot = 32;

    p2_up = 38;
    p2_down = 40;
    p2_left = 37;
    p2_right = 39;
    p2_shoot = 13;
  } else {
    p1_up = 38;
    p1_down = 40;
    p1_left = 37;
    p1_right = 39;
    p1_shoot = 13;

    p2_up = 87;
    p2_down = 83;
    p2_left = 65;
    p2_right = 68;
    p2_shoot = 32;
  }
}

var arena_offset = 100;

// Room generation constants
var roomHeight = 37;
var roomWidth = 50;
var tileSize = 16;
var doorBuffer = 6; // To prevent door spawning too close to edges of room
var wallBuffer = 7; // To prevent wall shapes spawning too close to outer walls
var step = 4;

var knockbackForce = 5;

// Room threat scaling constants
var baseThreatLimit = 10;
var threatScaleFactor = 2;

var playbackRate = 1; // For adjusting SFX speed in slow mo

var slowMeowGain = 10;
var slowMeowLoss = slowMeowGain / 2;
var slowMeowMax = 100;

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
    // Easy mode
    playerDamageMult: 1.0,
    spawnRate: 3000,
    maxMobs: 4,
    mobHealthMult: () => healthCalc(0.7),
    mobDamageMult: 0.65,
    mobSpeedMult: 0.85,
    totalMobs: () => mobTotalIncrementer(),
    baseThreatMult: 0.5,
    baseAggressiveRating: 7,
    baseDefensiveRating: 5,
    heatGain: 20,
    heatDecay: 0.5,
    slowMeowGainMult: 1.5,
    slowMeowLossMult: 1.0,
  },
  {
    // Normal mode
    playerDamageMult: 1.0,
    spawnRate: 3000,
    maxMobs: 4,
    mobHealthMult: () => healthCalc(1.0),
    mobDamageMult: 1.0,
    mobSpeedMult: 1.0,
    totalMobs: () => mobTotalIncrementer(),
    baseThreatMult: 1.0,
    baseAggressiveRating: 10,
    baseDefensiveRating: 4,
    heatGain: 19,
    heatDecay: 0.55,
    slowMeowGainMult: 1.0,
    slowMeowLossMult: 1.0,
  },
  {
    // Hard mode
    playerDamageMult: 1.0,
    spawnRate: 3000,
    maxMobs: 5,
    mobHealthMult: () => healthCalc(1.32),
    mobDamageMult: 1.75,
    mobSpeedMult: 1.35,
    totalMobs: () => mobTotalIncrementer(),
    baseThreatMult: 1.5,
    baseAggressiveRating: 15,
    baseDefensiveRating: 3,
    heatGain: 18,
    heatDecay: 0.6,
    slowMeowGainMult: 1.0,
    slowMeowLossMult: 2.0,
  },
]);

let menuBacking;

let meowSound;
let acGunSound;
let gunSound_b;
let theme_a;
let gameoverback;

function preload() {
  tile_darkGrey = loadImage("assets/alternatetile1.png");
  tile_lightGrey = loadImage("assets/alternatetile2.png");
  tile_darkBlue = loadImage("assets/alternatetile3.png");
  tile_lightBlue = loadImage("assets/alternatetile4.png");
  tile_darkYellow = loadImage("assets/alternatetile5.png");
  tile_lightYellow = loadImage("assets/alternatetile6.png");
  tile_darkTurquoise = loadImage("assets/alternatetile7.png");
  tile_lightTurquoise = loadImage("assets/alternatetile8.png");
  tile_darkdarkBlue = loadImage("assets/alternatetile9.png");
  tile_lightlightBlue = loadImage("assets/alternatetile10.png");
  walltile = loadImage("assets/wall_tile_m3.png");
  tileColours1 = [tile_darkGrey, tile_lightGrey];
  tileColours2 = [tile_darkBlue, tile_lightBlue];
  tileColours3 = [tile_darkYellow, tile_lightYellow];
  tileColours4 = [tile_lightTurquoise, tile_darkTurquoise];
  tileColours5 = [tile_lightlightBlue, tile_darkdarkBlue];
  

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

  heartMob_gif = loadImage("assets/HeartMobBossGif.gif");
  dogmob_gif = loadImage("assets/dogmob_v3.gif");
  rangedmob_gif = loadImage("assets/yellowDogMob.gif");
  blinkMobGif = loadImage("assets/purpleDogMob.gif");
  astrocat_gif = loadImage("assets/astrocatM7.gif");
  astrocat_gif_p2 = loadImage("assets/astrocatp2_m7.gif");

  healthbar = loadImage("assets/healthbar.gif");
  healthbar_b = loadImage("assets/healthbar.gif");

  //// SOUNDS ////
  // Player
  playerPainSound1 = loadSound("assets/playerpain1.mp3");
  playerPainSound2 = loadSound("assets/playerpain2.mp3");
  playerDeathSound = loadSound("assets/playerdeath.mp3");
  playerGunSound = loadSound("assets/player_gun.mp3");
  fireOverheatSound = loadSound("assets/playeroverheat.mp3");
  overheatEndSound = loadSound("assets/playeroverheatend.mp3");
  slowMeowStartSound = loadSound("assets/slowmeowstart.mp3");
  slowMeowEndSound = loadSound("assets/slowmeowend.mp3");
  slowMeowReadySound = loadSound("assets/slowmeowready.mp3");
  // Mobs
  mobProjectileSound = loadSound("assets/mobprojectile.mp3");
  blinkMobDeathSound = loadSound("assets/blinkmobdeath.mp3");
  blinkMobMoveSound = loadSound("assets/blinkmobmove.mp3");
  buffMobBuffSound = loadSound("assets/buffmobbuff.mp3");
  buffMobDeathSound = loadSound("assets/buffmobdeath.mp3");
  meleeMobDeathSound = loadSound("assets/meleemobdeath.mp3");
  rangedMobDeathSound = loadSound("assets/rangedmobdeath.mp3");
  // Environment
  bloodSound1 = loadSound("assets/bloodsplat1.mp3");
  bloodSound2 = loadSound("assets/bloodsplat2.mp3");
  doorOpenSound = loadSound("assets/dooropen.mp3");
  roomTransitionSound = loadSound("assets/roomtransition.mp3");
  itemSound1 = loadSound("assets/pickupitem1.mp3");
  itemSound2 = loadSound("assets/pickupitem2.mp3");
  // Music
  theme_a = loadSound("assets/theme.mp3");
}

// HTML <img> paths (no need to preload):

gameoverback = "assets/gmovertext.gif";

let singlePlayerIcon = "assets/singlepbutton.png";
let coopIcon = "assets/coopbutton.png";
let pvpIcon = "assets/pvpbutton.png";
let helpIcon = "assets/helpbutton.png";
let menuimg = "assets/menuback.mp4";

let setback = "assets/setback.png";

let wasd_icon = "assets/wasd_icon.png";
let arrow_icon = "assets/arrowpad_icon.png";

let pageWidth = 900;
let pageHeight = 750;

// this realistically sucks but its better than nthing
function mobTotalIncrementer() {
  let start = 1;
  if (gameCount < 5) {
    return start + gameCount;
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

function maxMobsCalc() {
  if (coop) {
    if (difficulty == 2) {
      return 6;
    }
    return 5;
  } else {
    if (difficulty == 2) {
      return 5;
    } else {
      return 4;
    }
  }
}

function healthCalc(healthMult) {
  if (coop) {
    return healthMult + 0.4;
  }
  return healthMult;
}

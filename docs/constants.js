// Room generation constants
var roomHeight = 37;
var roomWidth = 50;
var tileSize = 16;
var doorBuffer = 5; // To prevent door spawning too close to edges of room
var wallBuffer = 6; // To prevent wall shapes spawning too close to outer walls
var step = 4;
// Collision constants
var pushback = 1; // Prevents sticking

var playerA;
var playerB;

const GameStates = Object.freeze({
  ACTIVE: 0,
  PAUSE: 1,
  OVER: 2,
});

const tileTypes = Object.freeze({
  FLOOR: 0,
  WALL: 1,
  DOOR: 2,
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

const difficultySettings = [
  { spawnRate: 8200, maxMobs: 4, mobHealth: 50, mobSpeed: 0.8, mobDamage: 1 }, // Easy mode
  { spawnRate: 7000, maxMobs: 6, mobHealth: 55, mobSpeed: 1, mobDamage: 1 }, // Normal mode
  { spawnRate: 4800, maxMobs: 8, mobHealth: 60, mobSpeed: 1.2, mobDamage: 1 }, // Hard mode
];

let menuBacking;

function preload() {
  tileImg = loadImage("assets/tile.png");
  wallImg = loadImage("assets/wall.png");
  doorImg = loadImage("assets/door.png");
  astrocat = loadImage("assets/astrocat.png");
  dogMob = loadImage("assets/dog.png");
  bullet = loadImage("assets/bullet.png");
  gameFont = loadFont("assets/LuckiestGuy-Regular.ttf");
  // menuanimated = loadImage("assets/acbackground.gif");
}

// HTML <img> paths (no need to preload):

let singlePlayerIcon = "assets/SP3.png";
let coopIcon = "assets/TP3.png";
let helpIcon = "assets/HP3.png";
let menuimg = "assets/ac_menu.gif";

let pageWidth = 800;
let pageHeight = 600;

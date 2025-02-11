var roomHeight = 30;
var roomWidth = 40;
var tileSize = 20;
var doorBuffer = 2;
var wallBuffer = 3;
var step = 6;
var floorColour = "white";
var wallColour = "black";
var doorColour = "brown";

const tileTypes = Object.freeze({
  FLOOR: 0,
  WALL: 1,
  DOOR: 2,
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

function preload() {
  tileImg = loadImage("assets/tile.png");
  doorImg = loadImage("assets/door.png");
  astrocat = loadImage("assets/astrocat.png");
}

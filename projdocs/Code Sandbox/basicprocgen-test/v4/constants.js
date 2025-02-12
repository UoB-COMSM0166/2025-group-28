var roomHeight = 37;
var roomWidth = 50;
var tileSize = 16;
var doorBuffer = 5;
var wallBuffer = 4;
var step = 4;
var doorColour = 'black'; // temp

const tileTypes = Object.freeze({
  FLOOR: 0,
  WALL: 1,
  DOOR: 2
});

const wallVariants = Object.freeze({
  SQR: 0,
  L1: 1,
  L2: 2
});

function preload() {
   tileImg = loadImage("assets/tile.png");
   wallImg = loadImage("assets/wall.png");
   //doorImg = loadImage("assets/door.png");
   astrocat = loadImage("assets/astrocat.png");
 }

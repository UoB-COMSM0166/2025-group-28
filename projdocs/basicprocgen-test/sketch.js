var roomHeight = 25;
var roomWidth = 25;
var tileSize = 12.5;
var floorColour = 'white';
var wallColour = 'grey';
var doorColour = 'brown';

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

function setup() {
  noStroke();
  createCanvas(400, 400);
  initRoom();
  let button = createButton('Generate New Room');
  button.position(0, roomHeight * tileSize + 10);
  button.mousePressed(initRoom);
}

function initRoom() {
  var roomLayout = [];
  for (var j = 0; j < roomHeight; j++) {
    var roomTiles = [];
    for (var i = 0; i < roomWidth; i++) {
      if (j == 0 || j  == roomHeight - 1 || i == 0 || i == roomWidth - 1 ) {
        roomTiles.push(tileTypes.WALL);
      } else {
        roomTiles.push(tileTypes.FLOOR);
      }
    }
    roomLayout.push(roomTiles);
  }
  roomLayout = addWalls(roomLayout, 6);
  roomLayout = addDoor(roomLayout);
  drawRoom(roomLayout);
}

function createWallSQR(roomLayout, w, h, x, y) {
  for (var j = 0; j < h && y < roomHeight - 2; j++, y++) {
    for (var i = 0; i < w && x < roomWidth - 2; i++, x++) {
      roomLayout[y][x] = tileTypes.WALL;
    }
    x-=w;
  }
  return roomLayout;
}

function createWallL1(roomLayout, w, h, x, y) {
  for (var j = 0; j < h && y < roomHeight - 2; j++, y++) {
    for (var i = 0; i < w && x < roomWidth - 2; i++, x++) {
      if (i > 0 && j > 0) {
        roomLayout[y][x] = tileTypes.FLOOR;
      } else {
        roomLayout[y][x] = tileTypes.WALL;
      }
    }
    x-=w;
  }
  return roomLayout;
}

function createWallL2(roomLayout, w, h, x, y) {
  for (var j = 0; j < h && y < roomHeight - 2; j++, y++) {
    for (var i = 0; i < w && x < roomWidth - 2; i++, x++) {
      if (i < w - 1 && j < h - 1) {
        roomLayout[y][x] = tileTypes.FLOOR;
      } else {
        roomLayout[y][x] = tileTypes.WALL;
      }
    }
    x-=w;
  }
  return roomLayout;
}

function addWalls(roomLayout, numWalls) {
  for (var i = 0; i < numWalls; i++) {
    var wallVar = floor(random(0, 8));
    var x = floor(random(3, roomWidth - 3));
    var y = floor(random(3, roomHeight - 3));
    if (wallVar == wallVariants.SQR) {
      roomLayout = createWallSQR(roomLayout, 2, 2, x, y);
    } else if (wallVar == wallVariants.L1) {
      roomLayout = createWallL1(roomLayout, 2, 3, x, y);
    } else if (wallVar == wallVariants.L2) {
      roomLayout = createWallL2(roomLayout, 2, 3, x, y);
    }
    // Single tile wall
    else {
      roomLayout[y][x] = tileTypes.WALL;
    }
  }
  return roomLayout;
}

function addDoor(roomLayout) {
  var doorPos = random();
  var x = floor(random(2, roomWidth - 2));
  var y = floor(random(2, roomHeight - 2));
  if (doorPos < 0.5) {
    if (x < (roomWidth - 1) / 2) {
      x = 0;
    } else {
      x = roomWidth - 1;
    }
  } else {
    if (y < (roomHeight - 1) / 2) {
      y = 0;
    } else {
      y = roomHeight - 1;
    }
  }
  roomLayout[y][x] = tileTypes.DOOR;
  return roomLayout;
}

function drawRoom(roomLayout) {
  for (var j = 0; j < roomLayout.length; j++){
    for (var i = 0; i < roomLayout[j].length; i++) {
      if (roomLayout[j][i] == tileTypes.WALL) {
        fill(wallColour);
        rect(tileSize * i, tileSize * j, tileSize, tileSize);
      } else if (roomLayout[j][i] == tileTypes.DOOR) {
        fill(doorColour);
        rect(tileSize * i, tileSize * j, tileSize, tileSize);
      } else {
        fill(floorColour);
        rect(tileSize * i, tileSize * j, tileSize, tileSize);
      }
    }
  }
}

var roomHeight = 25;
var roomWidth = 25;
var tileSize = 12.5;
var doorBuffer = 2;
var wallBuffer = 3;
var step = 6;
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
  let roomLayout = [];
  for (let j = 0; j < roomHeight; j++) {
    let roomTiles = [];
    for (let i = 0; i < roomWidth; i++) {
      if (j == 0 || j  == roomHeight - 1 || i == 0 || i == roomWidth - 1 ) {
        roomTiles.push(tileTypes.WALL);
      } else {
        roomTiles.push(tileTypes.FLOOR);
      }
    }
    roomLayout.push(roomTiles);
  }
  roomLayout = addDoor(roomLayout);
  roomLayout = scanRoom(roomLayout);
  drawRoom(roomLayout);
}

function createWallSQR(roomLayout, w, h, x, y) {
  for (let j = 0; j < h && y < roomHeight - wallBuffer; j++, y++) {
    for (let i = 0; i < w && x < roomWidth - wallBuffer; i++, x++) {
      roomLayout[y][x] = tileTypes.WALL;
    }
    x-=w;
  }
  return roomLayout;
}

function createWallL1(roomLayout, w, h, x, y) {
  for (let j = 0; j < h && y < roomHeight - wallBuffer; j++, y++) {
    for (let i = 0; i < w && x < roomWidth - wallBuffer; i++, x++) {
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
  for (let j = 0; j < h && y < roomHeight - wallBuffer; j++, y++) {
    for (let i = 0; i < w && x < roomWidth - wallBuffer; i++, x++) {
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

function scanRoom(roomLayout) {
  for (let y = 3; y < roomHeight - wallBuffer; y+=step) {
    for (let x = 3; x < roomWidth - wallBuffer; x+=step) {
      let numWalls = floor(random(0, 2));
      roomLayout = addWalls(roomLayout, x, y, numWalls);
    }
  }
  return roomLayout;
}

function addWalls(roomLayout, x, y, numWalls) {
  for (let i = 0; i < numWalls; i++) {
    x = addOffset(x);
    y = addOffset(y);
    let wallVar = floor(random(0, 100));
    let shouldAddWall = rollDice();
    if (shouldAddWall) {
      if (wallVar > 74) {
        roomLayout = createWallSQR(roomLayout, 2, 2, x, y);
      } else if (wallVar > 54) {
        roomLayout = createWallL1(roomLayout, 2, 3, x, y);
      } else if (wallVar > 34) {
        roomLayout = createWallL2(roomLayout, 2, 3, x, y);
      }
      // Single tile wall
      else {
        roomLayout[y][x] = tileTypes.WALL;
      }
    }  
  }
  return roomLayout;
}

function rollDice() {
  let wallChance = random(0, 2);
  if (wallChance < 1) {
    return true;
  }
  return false;
}

function addOffset(pos) {
  if (pos < roomWidth - step) {
    return floor(random(pos, pos + 3));
  } else if (pos > step) {
    return floor(random(pos, pos - 3));
  }
}

function addDoor(roomLayout) {
  let doorPos = random();
  // Buffer of 2 to stop doors spawning in corners of room
  let x = floor(random(doorBuffer, roomWidth - doorBuffer));
  let y = floor(random(doorBuffer, roomHeight - doorBuffer));
  if (doorPos < 0.5) {
    if (x < (roomWidth - 1) / 2) {
      // Put door on left side of room
      x = 0;
    } else {
      // Put door on right side of room
      x = roomWidth - 1;
    }
  } else {
    if (y < (roomHeight - 1) / 2) {
      // Put door at top of room
      y = 0;
    } else {
      // Put door at bottom of room
      y = roomHeight - 1;
    }
  }
  roomLayout[y][x] = tileTypes.DOOR;
  return roomLayout;
}

function drawRoom(roomLayout) {
  for (let j = 0; j < roomLayout.length; j++){
    for (let i = 0; i < roomLayout[j].length; i++) {
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

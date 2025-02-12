class Room {
  
  constructor() {
    this.roomType = 0; // doesn't exist for now
    this.isCleared = false;
    this.mobs = [];
    this.items = [];
    this.roomLayout = []; // 2d array of tiles;
  }

  initRoom() {
    this.roomLayout = [];
    for (let j = 0; j < roomHeight; j++) {
      let roomTiles = [];
      for (let i = 0; i < roomWidth; i++) {
        if (j == 0 || i == 0 || j == 1 || i == 1 || j  == roomHeight - 1 || 
            i == roomWidth - 1 || j == roomHeight - 2 || i == roomWidth - 2) {
          let newWall = new Tile(tileTypes.WALL);
          roomTiles.push(newWall);
        } else {
          let newFloor = new Tile(tileTypes.FLOOR);
          roomTiles.push(newFloor);
        }
      }
      this.roomLayout.push(roomTiles);
    }
    this.addDoor();
    this.scanRoom();
    this.draw();
  }

  createWallSQR(w, h, x, y) {
    for (let j = 0; j < h && y < roomHeight - wallBuffer; j++, y++) {
      for (let i = 0; i < w && x < roomWidth - wallBuffer; i++, x++) {
        this.roomLayout[y][x] = new Tile(tileTypes.WALL);
      }
      x -= w;
    }
  }

  createWallL1(w, h, x, y) {
    for (let j = 0; j < h && y < roomHeight - wallBuffer; j++, y++) {
      for (let i = 0; i < w && x < roomWidth - wallBuffer; i++, x++) {
        if (i > 1 && j > 1) {
          this.roomLayout[y][x] = new Tile(tileTypes.FLOOR);
        } else {
          this.roomLayout[y][x] = new Tile(tileTypes.WALL);
        }
      }
      x -= w;
    }
  }

  createWallL2(w, h, x, y) {
    for (let j = 0; j < h && y < roomHeight - wallBuffer; j++, y++) {
      for (let i = 0; i < w && x < roomWidth - wallBuffer; i++, x++) {
        if (i < w - 2 && j < h - 2) {
          this.roomLayout[y][x] = new Tile(tileTypes.FLOOR);
        } else {
          this.roomLayout[y][x] = new Tile(tileTypes.WALL);
        }
      }
      x -= w;
    }
  }

  scanRoom() {
    for (let y = wallBuffer; y < roomHeight - wallBuffer; y+=step) {
      for (let x = wallBuffer; x < roomWidth - wallBuffer; x+=step) {
        let numWalls = floor(random(0, 2));
        this.addWalls(x, y, numWalls);
      }
    }
  }

  addWalls(x, y, numWalls) {
    for (let i = 0; i < numWalls; i++) {
      x = this.addOffset(x);
      y = this.addOffset(y);
      let wallVar = floor(random(0, 100));
      let shouldAddWall = this.rollDice();
      if (shouldAddWall) {
        if (wallVar > 74) {
          this.createWallSQR(this.getRanW(wallVariants.SQR), 
                             this.getRanH(wallVariants.SQR), x, y);
         } else if (wallVar > 54) {
           this.createWallL1(this.getRanW(wallVariants.L1), 
                             this.getRanH(wallVariants.L1), x, y);
         } else if (wallVar > 34) {
           this.createWallL2(this.getRanW(wallVariants.L2), 
                             this.getRanH(wallVariants.L2), x, y);
         }
         // Small square wall
         else {
           this.createWallSQR(2, 2, x, y);
         }
       }  
     }
   }

   getRanW(wallVariant) {
     if (wallVariant == wallVariants.SQR) {
       return floor(random(2, 4));
     } else if (wallVariant == wallVariants.L1 || wallVariant == wallVariants.L2) {
       return floor(random(2, 5));
     }
   }

   getRanH(wallVariant) {
     if (wallVariant == wallVariants.SQR) {
       return floor(random(2, 4));
     } else if (wallVariant == wallVariants.L1 || wallVariant == wallVariants.L2) {
       return floor(random(2, 6));
     }
   }
  
   rollDice() {
     let wallChance = random(0, 2);
     if (wallChance < 0.30) {
       return true;
     }
     return false;
   }

   addOffset(pos) {
     let offset = floor(random(0, wallBuffer));
     if (pos < roomWidth - step && pos < roomHeight - step) {
       return floor(random(pos, pos + offset));
     } else {
       return floor(random(pos, pos - offset));
     }
   }

   addDoor() {
     let doorPos = random();
     // doorBuffer stops doors spawning in corners of room
     let x = floor(random(doorBuffer, roomWidth - doorBuffer));
     let y = floor(random(doorBuffer, roomHeight - doorBuffer));
     if (doorPos < 0.5) {
       if (x < (roomWidth - 2) / 2) {
         // Put door on left side of room
         x = 1;
       } else {
         // Put door on right side of room
         x = roomWidth - 2;
       }
     } else {
       if (y < (roomHeight - 2) / 2) {
         // Put door at top of room
         y = 1;
       } else {
         // Put door at bottom of room
         y = roomHeight - 2;
       }
     }
     this.roomLayout[y][x] = new Tile(tileTypes.DOOR);
   }

   draw() {
     for (let j = 0; j < this.roomLayout.length; j++){
       for (let i = 0; i < this.roomLayout[j].length; i++) {
         if (this.roomLayout[j][i].type == tileTypes.WALL) {
           image(wallImg, tileSize * i, tileSize * j, tileSize, tileSize);
         } else if (this.roomLayout[j][i].type == tileTypes.DOOR) {
           this.rotateDoor(i, j);
         } else {
           image(tileImg, tileSize * i, tileSize * j, tileSize, tileSize);
         }
       }
     }
   }
  
   rotateDoor(x, y) {
     angleMode(DEGREES);
     if (x == 1) {
       push();
       imageMode(CENTER);
       translate(tileSize / 2, tileSize / 2);
       rotate(270);
       image(doorImg, -tileSize * y, tileSize * x, tileSize, tileSize);
       pop();
     } else if (x == roomWidth - 2) {
       push();
       imageMode(CENTER);
       translate(tileSize / 2, tileSize / 2);
       rotate(90);
       image(doorImg, tileSize * y, -tileSize * x, tileSize, tileSize);
       pop();
     } else if (y == roomHeight - 2) {
       push();
       scale(1, -1);
       y++;
       image(doorImg, tileSize * x, -tileSize * y, tileSize, tileSize);
       pop();
     } else {
       image(doorImg, tileSize * x, tileSize * y, tileSize, tileSize);
     }
   }
  
   // checkClear() {
   //    let cleared = true;
   //    for (let mob of this.mobs) {
   //       if (mob.isDead() == false) { // isDead method doesn't exist atm
   //          cleared = true;
   //       }
   //    }
   //    if (cleared == true) this.isCleared = true;
   // }

   // generateMobs(numOfMobs) {
   //    for (let i = 0; i < numOfMobs; i++) {
   //       let newMob = new Mob(); // class deosnt exist rn
   //       this.mobs.push(newMob);
   //    }
   // }
  
}

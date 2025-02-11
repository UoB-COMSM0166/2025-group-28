class Room {
   constructor() {
      this.roomType = 0; // doesnt exist for now
      this.isCleared = false;
      this.mobs = [];
      this.items = [];
      this.roomLayout = []; // 2d array of tiles;
   }

   initRoom() {
      this.roomLayout = []
      for (let j = 0; j < roomHeight; j++) {
        let roomTiles = [];
        for (let i = 0; i < roomWidth; i++) {
          if (j == 0 || j == roomHeight - 1 || i == 0 || i == roomWidth - 1 ) {
            let newWall = new Tile(tileTypes.WALL)
            roomTiles.push(newWall);
          } else {
            let newFloor = new Tile(tileTypes.FLOOR)
            roomTiles.push(newFloor);
          }
        }
        this.roomLayout.push(roomTiles);
      }
      this.addDoor();
      this.scanRoom();
      this.drawRoom();
    }
    
   createWallSQR(w, h, x, y) {
      for (let j = 0; j < h && y < roomHeight - wallBuffer; j++, y++) {
        for (let i = 0; i < w && x < roomWidth - wallBuffer; i++, x++) {
          this.roomLayout[y][x] = new Tile(tileTypes.WALL);
        }
        x-=w;
      }
    }
    
   createWallL1(w, h, x, y) {
      for (let j = 0; j < h && y < roomHeight - wallBuffer; j++, y++) {
        for (let i = 0; i < w && x < roomWidth - wallBuffer; i++, x++) {
          if (i > 0 && j > 0) {
            this.roomLayout[y][x] = new Tile(tileTypes.FLOOR);
          } else {
            this.roomLayout[y][x] = new Tile(tileTypes.WALL);
          }
        }
        x-=w;
      }
    }
    
   createWallL2(w, h, x, y) {
      for (let j = 0; j < h && y < roomHeight - wallBuffer; j++, y++) {
        for (let i = 0; i < w && x < roomWidth - wallBuffer; i++, x++) {
          if (i < w - 1 && j < h - 1) {
            this.roomLayout[y][x] = new Tile(tileTypes.FLOOR);
          } else {
            this.roomLayout[y][x] = new Tile(tileTypes.WALL);
          }
        }
        x-=w;
      }
    }
    
   scanRoom() {
      for (let y = 3; y < roomHeight - wallBuffer; y+=step) {
        for (let x = 3; x < roomWidth - wallBuffer; x+=step) {
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
            this.createWallSQR(2, 2, x, y);
         } else if (wallVar > 54) {
            this.createWallL1(6, 2, x, y);
         } else if (wallVar > 34) {
            this.createWallL2(3, 5, x, y);
         }
          // Single tile wall
         else {
            this.roomLayout[y][x] = new Tile(tileTypes.WALL);
          }
        }  
      }
    }
    
   rollDice() {
      let wallChance = random(0, 2);
      if (wallChance < 1) {
        return true;
      }
      return false;
    }
    
   addOffset(pos) {
      if (pos < roomWidth - step) {
        return floor(random(pos, pos + 3));
      } else if (pos > step) {
        return floor(random(pos, pos - 3));
      }
    }
    
   addDoor() {
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
      this.roomLayout[y][x] = new Tile(tileTypes.DOOR);
    }
    
   drawRoom() {
      for (let j = 0; j < this.roomLayout.length; j++){
        for (let i = 0; i < this.roomLayout[j].length; i++) {
          if (this.roomLayout[j][i].type == tileTypes.WALL) {
            fill(wallColour);
            // Draw the image.
            rect(tileSize * i, tileSize * j, tileSize, tileSize);
          } else if (this.roomLayout[j][i].type == tileTypes.DOOR) {
            fill(doorColour);
            rect(tileSize * i, tileSize * j, tileSize, tileSize);
            image(doorImg, tileSize*i,tileSize*j,tileSize, tileSize);
          } else {
            fill(floorColour);
            rect(tileSize * i, tileSize * j, tileSize, tileSize);
            image(tileImg, tileSize*i,tileSize*j,tileSize, tileSize);
          }
        }
      }
    }

   // checkClear() {
   //    let cleared = true;
   //    for (let mob of this.mobs) {
   //       if (mob.isDead() == false) { // isDead method deosnt exist atm
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
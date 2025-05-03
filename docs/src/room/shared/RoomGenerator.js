// Handles room generation for both room types
class RoomGenerator {
  constructor(currentRoom) {
    this.room = currentRoom;
  }

  initRoom() {
    const tileOptions = [
      tileColours1,
      tileColours2,
      tileColours3,
      tileColours4,
      tileColours5,
    ];
    this.room.currentTileColours = random(tileOptions);
    for (let j = 0; j < roomHeight; j++) {
      let roomTiles = [];
      for (let i = 0; i < roomWidth; i++) {
        if (
          j == 0 ||
          i == 0 ||
          j == 1 ||
          i == 1 ||
          j == roomHeight - 1 ||
          i == roomWidth - 1 ||
          j == roomHeight - 2 ||
          i == roomWidth - 2
        ) {
          let newWall = new Tile(tileTypes.WALL, i, j);
          roomTiles.push(newWall);
        } else {
          let newFloor = new Tile(tileTypes.FLOOR);
          roomTiles.push(newFloor);
        }
      }
      this.room.roomLayout.push(roomTiles);
    }
    this.scanRoom();
    this.addTrapTiles();
    if (this.room instanceof Room) this.addDoor();
  }

  addTrapTiles() {
    const skipTiles = Array.from({ length: roomHeight }, () =>
      Array(roomWidth).fill(false)
    );
    for (let j = trapBuffer; j < roomHeight - trapBuffer; j++) {
      for (let i = trapBuffer; i < roomWidth - trapBuffer; i++) {
        if (skipTiles[j][i]) continue;
        const tile = this.room.roomLayout[j][i];
        if (tile.type === tileTypes.FLOOR && this.rollTileTrapChance()) {
          if (game && game.difficulty == difficultyLevels.HARD) {
            const trapTypeRoll = Math.random();
            if (trapTypeRoll < 0.33 && this.canPlaceTrapSQR(i, j, 3)) {
              this.createTrapSQR(i, j, 3);
              this.markSkipTilesSQR(skipTiles, i, j, 3);
            }
            if ((trapTypeRoll >= 0.33 && trapTypeRoll < 0.66) && this.canPlaceTrapPLUS(i, j)) {
              this.createTrapPLUS(i, j);
              this.markSkipTilesPLUS(skipTiles, i, j);
            }
            if ((0.66 < trapTypeRoll) && this.canPlaceTrapSQR(i, j, 2)) {
              this.createTrapSQR(i, j, 2);
              this.markSkipTilesSQR(skipTiles, i, j, 2);
            }
          } else if (game && game.difficulty == difficultyLevels.NORMAL) {
            const trapTypeRoll = Math.random();
            if ((trapTypeRoll < 0.5) && this.canPlaceTrapPLUS(i, j)) {
              this.createTrapPLUS(i, j);
              this.markSkipTilesPLUS(skipTiles, i, j);
            }
            if ((trapTypeRoll > 0.5) && this.canPlaceTrapSQR(i, j, 2)) {
              this.createTrapSQR(i, j, 2);
              this.markSkipTilesSQR(skipTiles, i, j, 2);
            }
          } else if ((game && game.difficulty == difficultyLevels.EASY)) {
            this.createTrapSQR(i, j, 2);
            this.markSkipTilesSQR(skipTiles, i, j, 2);
          }
        }
      }
    }
  }

  canPlaceTrapSQR(x, y, trapSize) {
    for (let j = 0; j < trapSize; j++) {
      for (let i = 0; i < trapSize; i++) {
        const tx = x + i;
        const ty = y + j;
        if (
          tx >= this.room.roomLayout[0].length ||
          ty >= this.room.roomLayout.length ||
          this.room.roomLayout[ty][tx].type != tileTypes.FLOOR
        ) {
          return false;
        }
      }
    }
    return true;
  }

  createTrapSQR(x, y, trapSize) {
    for (let j = 0; j < trapSize; j++) {
      for (let i = 0; i < trapSize; i++) {
        const tx = x + i;
        const ty = y + j;
        const currentTile = this.room.roomLayout[ty][tx];
        if (currentTile.type != tileTypes.WALL) {
          this.room.roomLayout[ty][tx] = new Tile(tileTypes.TRAP, tx, ty);
        }
      }
    }
  }

  canPlaceTrapPLUS(x, y) {
    const positions = [
      [x + 1, y],
      [x, y + 1],
      [x + 1, y + 1],
      [x + 2, y + 1],
      [x + 1, y + 2],
    ];

    return positions.every(([tx, ty]) =>
      tx < roomWidth &&
      ty < roomHeight &&
      this.room.roomLayout[ty][tx].type == tileTypes.FLOOR
    );
  }

  createTrapPLUS(x, y) {
    const positions = [
      [x + 1, y],
      [x, y + 1],
      [x + 1, y + 1],
      [x + 2, y + 1],
      [x + 1, y + 2],
    ];

    for (const [tx, ty] of positions) {
      const currentTile = this.room.roomLayout[ty][tx];
      if (currentTile.type !== tileTypes.WALL) {
        this.room.roomLayout[ty][tx] = new Tile(tileTypes.TRAP, tx, ty);
      }
    }
  }

  markSkipTilesSQR(skipTiles, x, y, size) {
    for (let j = 0; j < size; j++) {
      for (let i = 0; i < size; i++) {
        skipTiles[y + j][x + i] = true;
      }
    }
  }

  markSkipTilesPLUS(skipTiles, x, y) {
    const positions = [
      [x + 1, y],
      [x, y + 1],
      [x + 1, y + 1],
      [x + 2, y + 1],
      [x + 1, y + 2],
    ];

    for (const [tx, ty] of positions) {
      skipTiles[ty][tx] = true;
    }
  }

  rollTileTrapChance() {
    if (!game) return;
    if (game.difficulty == difficultyLevels.EASY) {
      return Math.random() < 0.0015;
    } else return Math.random() < 0.002;
  }

  // Creates square wall pattern
  createWallSQR(w, h, x, y) {
    for (let j = 0; j < h && y < roomHeight - wallBuffer; j++, y++) {
      for (let i = 0; i < w && x < roomWidth - wallBuffer; i++, x++) {
        this.room.roomLayout[y][x] = new Tile(tileTypes.WALL, x, y);
      }
      x -= w;
    }
  }

  // Creates 'L' shaped wall pattern
  createWallL1(w, h, x, y) {
    for (let j = 0; j < h && y < roomHeight - wallBuffer; j++, y++) {
      for (let i = 0; i < w && x < roomWidth - wallBuffer; i++, x++) {
        if (i > 1 && j > 1) {
          this.room.roomLayout[y][x] = new Tile(tileTypes.FLOOR);
        } else {
          this.room.roomLayout[y][x] = new Tile(tileTypes.WALL, x, y);
        }
      }
      x -= w;
    }
  }

  // Creates a different 'L' shaped wall pattern
  createWallL2(w, h, x, y) {
    for (let j = 0; j < h && y < roomHeight - wallBuffer; j++, y++) {
      for (let i = 0; i < w && x < roomWidth - wallBuffer; i++, x++) {
        if (i < w - 2 && j < h - 2) {
          this.room.roomLayout[y][x] = new Tile(tileTypes.FLOOR);
        } else {
          this.room.roomLayout[y][x] = new Tile(tileTypes.WALL, x, y);
        }
      }
      x -= w;
    }
  }

  // Incrementally steps through the room and decides how many walls to place
  scanRoom() {
    for (let y = wallBuffer; y < roomHeight - wallBuffer; y += step) {
      for (let x = wallBuffer; x < roomWidth - wallBuffer; x += step) {
        let numWalls = Math.floor(random(0, 2));
        this.addWalls(x, y, numWalls);
      }
    }
  }

  addWalls(x, y, numWalls) {
    for (let i = 0; i < numWalls; i++) {
      x = this.addOffset(x);
      y = this.addOffset(y);
      let wallVar = Math.floor(random(0, 100));
      let shouldAddWall = this.rollAddWall();
      if (shouldAddWall) {
        let w, h;
        if (wallVar > 74) {
          w = this.getRanW(wallVariants.SQR);
          h = this.getRanH(wallVariants.SQR);
        } else if (wallVar > 54) {
          w = this.getRanW(wallVariants.L1);
          h = this.getRanH(wallVariants.L1);
        } else if (wallVar > 34) {
          w = this.getRanW(wallVariants.L2);
          h = this.getRanH(wallVariants.L2);
        } else {
          w = 2;
          h = 2;
        }

        if (!this.isWallWithinBounds(w, h, x, y)) {
          let adjustedPos = this.adjustWallPosition(w, h, x, y);
          x = adjustedPos.x;
          y = adjustedPos.y;
        }

        if (wallVar > 74) {
          this.createWallSQR(w, h, x, y);
        } else if (wallVar > 54) {
          this.createWallL1(w, h, x, y);
        } else if (wallVar > 34) {
          this.createWallL2(w, h, x, y);
        } else {
          this.createWallSQR(2, 2, x, y);
        }
      }
    }
  }

  // Checks if the full wall shape can be placed without being cut off by wallBuffer
  isWallWithinBounds(w, h, x, y) {
    return (
      x >= wallBuffer &&
      y >= wallBuffer &&
      x + w <= roomWidth - wallBuffer &&
      y + h <= roomHeight - wallBuffer
    );
  }

  // Adjusts any wall shapes that would be cut off by wallBuffer
  adjustWallPosition(w, h, x, y) {
    if (x + w > roomWidth - wallBuffer) {
      x = roomWidth - wallBuffer - w;
    }
    if (y + h > roomHeight - wallBuffer) {
      y = roomHeight - wallBuffer - h;
    }
    if (x < wallBuffer) {
      x = wallBuffer;
    }
    if (y < wallBuffer) {
      y = wallBuffer;
    }
    return { x, y };
  }

  // Get random width for wall shape
  getRanW(wallVariant) {
    if (wallVariant == wallVariants.SQR) {
      return Math.floor(random(2, 4));
    } else if (
      wallVariant == wallVariants.L1 ||
      wallVariant == wallVariants.L2
    ) {
      return Math.floor(random(2, 5));
    }
  }

  // Get random height for wall shape
  getRanH(wallVariant) {
    if (wallVariant == wallVariants.SQR) {
      return Math.floor(random(2, 4));
    } else if (
      wallVariant == wallVariants.L1 ||
      wallVariant == wallVariants.L2
    ) {
      return Math.floor(random(2, 6));
    }
  }

  // Probability of adding a wall
  rollAddWall() {
    let wallChance;
    if (this.room instanceof PvPRoom) {
      wallChance = 0.5;
    } else wallChance = 0.3;
    if (random() < wallChance) {
      return true;
    }
    return false;
  }

  // Adds an offset to the placement of the wall shape within the room
  // (To prevent rooms looking too symmetrical)
  addOffset(pos) {
    let offset = Math.floor(random(0, wallBuffer));
    if (pos < roomWidth - step && pos < roomHeight - step) {
      return Math.floor(random(pos, pos + offset));
    } else {
      return Math.floor(random(pos, pos - offset));
    }
  }

  addDoor() {
    let validDoor = false;
    let doorPos = random();
    let x, y;
    while (!validDoor) {
      // doorBuffer stops doors spawning in corners of room
      x = Math.floor(random(doorBuffer, roomWidth - doorBuffer));
      y = Math.floor(random(doorBuffer, roomHeight - doorBuffer));
      if (doorPos < 0.5) {
        if (x < (roomWidth - 2) / 2) {
          if (doorPrevPos != "RIGHT" && behaviourMonitor.getRoomsCleared() > 0) {
            // Put door on left side of room
            x = 1;
            doorPrevPos = "LEFT";
            validDoor = true;
          }
        } else {
          if (doorPrevPos != "LEFT") {
            // Put door on right side of room
            x = roomWidth + arena_offset / 9.5;
            doorPrevPos = "RIGHT";
            validDoor = true;
          }
        }
      } else {
        if (y < (roomHeight - 2) / 2) {
          if (doorPrevPos != "DOWN") {
            // Put door at top of room
            y = 1;
            doorPrevPos = "UP";
            validDoor = true;
          }
        } else {
          if (doorPrevPos != "UP") {
            // Put door at bottom of room
            y = roomHeight - 2;
            doorPrevPos = "DOWN";
            validDoor = true;
          }
        }
      }
    }
    this.room.door = new Door(x, y);
  }

  createParticles(type = Particle, x, y, colour, velocity = null) {
    if (childMode && type === Blood) return;
    let maxParticles;
    if (type === Spark) {
      maxParticles = Math.floor(random(3, 7));
    } else {
      maxParticles = Math.floor(random(5, 20));
    }
    for (let i = 0; i < maxParticles; i++) {
      if (type === Spark && velocity) {
        this.room.particles.push(new Spark(x, y, colour, velocity));
      } else {
        this.room.particles.push(new type(x, y, colour));
      }
    }
  }
}
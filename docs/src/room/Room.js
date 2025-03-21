class Room {
  constructor(difficultySettings) {
    this.door = null;
    this.roomType = 0; // doesn't exist for now
    this.difficultySettings = difficultySettings;
    this.isCleared = false;
    this.mobs = [];
    this.items = [];
    this.roomLayout = []; // 2d array of tiles
    this.bloodParticles = [];
    this.mobsRemaining = difficultySettings.totalMobs;
    this.lastSpawnTime = 0;
    this.promptActive = false;
    this.initRoom();
    this.addWallCollisions(playerA);
    if (coop) {
      playerA.collidables.push(playerB);
      playerB.collidables.push(playerA);
      this.addWallCollisions(playerB);
    }
  }

  destroyRoom() {
    playerA.collidables.length = 0;
    if (coop) {
      playerB.collidables.length = 0;
    }
  }

  initRoom() {
    this.roomLayout = [];
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
      this.roomLayout.push(roomTiles);
    }
    this.scanRoom();
    this.addDoor();
  }

  // Creates square wall pattern
  createWallSQR(w, h, x, y) {
    for (let j = 0; j < h && y < roomHeight - wallBuffer; j++, y++) {
      for (let i = 0; i < w && x < roomWidth - wallBuffer; i++, x++) {
        this.roomLayout[y][x] = new Tile(tileTypes.WALL, x, y);
      }
      x -= w;
    }
  }

  // Creates 'L' shaped wall pattern
  createWallL1(w, h, x, y) {
    for (let j = 0; j < h && y < roomHeight - wallBuffer; j++, y++) {
      for (let i = 0; i < w && x < roomWidth - wallBuffer; i++, x++) {
        if (i > 1 && j > 1) {
          this.roomLayout[y][x] = new Tile(tileTypes.FLOOR);
        } else {
          this.roomLayout[y][x] = new Tile(tileTypes.WALL, x, y);
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
          this.roomLayout[y][x] = new Tile(tileTypes.FLOOR);
        } else {
          this.roomLayout[y][x] = new Tile(tileTypes.WALL, x, y);
        }
      }
      x -= w;
    }
  }

  // Incrementally steps through the room and decides how many walls to place
  scanRoom() {
    for (let y = wallBuffer; y < roomHeight - wallBuffer; y += step) {
      for (let x = wallBuffer; x < roomWidth - wallBuffer; x += step) {
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
          this.createWallSQR(
            this.getRanW(wallVariants.SQR),
            this.getRanH(wallVariants.SQR),
            x,
            y
          );
        } else if (wallVar > 54) {
          this.createWallL1(
            this.getRanW(wallVariants.L1),
            this.getRanH(wallVariants.L1),
            x,
            y
          );
        } else if (wallVar > 34) {
          this.createWallL2(
            this.getRanW(wallVariants.L2),
            this.getRanH(wallVariants.L2),
            x,
            y
          );
        }
        // Create small square wall
        else {
          this.createWallSQR(2, 2, x, y);
        }
      }
    }
  }

  // Get random width for wall shape
  getRanW(wallVariant) {
    if (wallVariant == wallVariants.SQR) {
      return floor(random(2, 4));
    } else if (
      wallVariant == wallVariants.L1 ||
      wallVariant == wallVariants.L2
    ) {
      return floor(random(2, 5));
    }
  }

  // Get random height for wall shape
  getRanH(wallVariant) {
    if (wallVariant == wallVariants.SQR) {
      return floor(random(2, 4));
    } else if (
      wallVariant == wallVariants.L1 ||
      wallVariant == wallVariants.L2
    ) {
      return floor(random(2, 6));
    }
  }

  // Probability of adding a wall
  rollDice() {
    let wallChance = random(0, 2);
    if (wallChance < 0.3) {
      return true;
    }
    return false;
  }

  // Adds an offset to the placement of the wall shape within the room
  // (To prevent rooms looking too symmetrical)
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
      // Put door on right side of room
      x = roomWidth - 2;
      this.door = new Door(x, y);
    } else {
      if (y < (roomHeight - 2) / 2) {
        // Put door at top of room
        y = 1;
      } else {
        // Put door at bottom of room
        y = roomHeight - 2;
      }
      this.door = new Door(x, y);
    }
  }

  createBloodParticles(x, y, bloodColour) {
    if (!childMode) {
      for (let i = 0; i < 20; i++) {
        // y + 25 = blood stops falling below the object's feet
        this.bloodParticles.push(new Particle(x, y, y + 25, bloodColour));
      }
    }
  }

  update() {
    for (let i = this.mobs.length - 1; i >= 0; i--) {
      if (!this.mobs[i].isActive) {
        let index = playerA.collidables.indexOf(this.mobs[i]);
        if (index != -1) {
          playerA.collidables.splice(index, 1);
        }
        if (coop) {
          index = playerB.collidables.indexOf(this.mobs[i]);
          if (index != -1) {
            playerB.collidables.splice(index, 1);
          }
        }
        this.mobs.splice(i, 1);
        this.mobsRemaining -= 1;
      }
    }

    if (this.mobsRemaining <= 0) {
      this.isCleared = true;
      this.mobs.length = 0;
    }
    //projectiles
    for (let p of playerA.projectilesFired) {
      p.update();
    }
    if (coop) {
      for (let p of playerB.projectilesFired) {
        p.update();
      }
    }

    //mobs
    for (let m of this.mobs) {
      m.update();
    }

    //players
    playerA.update();
    if (coop) {
      playerB.update();
    }
  }

  spawnMobWrapper() {
    let currentTime = millis();
    if (currentTime - this.lastSpawnTime > this.difficultySettings.spawnRate) {
      this.spawnMob();
      this.lastSpawnTime = currentTime;
    }
  }

  draw() {
    let firstFrame = true;

    for (let j = 0; j < roomHeight; j++) {
      for (let i = 0; i < roomWidth; i++) {
        if (this.roomLayout[j][i].type == tileTypes.WALL) {
          image(walltile, tileSize * i, tileSize * j, tileSize, tileSize);
          if (debug) {
            // TESTING - draw collision box
            fill(0, 200, 0, 100);
            rect(
              this.roomLayout[j][i].position.x,
              this.roomLayout[j][i].position.y,
              this.roomLayout[j][i].widthHitbox,
              this.roomLayout[j][i].heightHitbox
            );
          }
        } else {
          let tiledex = 1;
          if (j % 2 == 0 && i % 2 == 0) {
            tiledex = 0;
          }
          image(
            tilecolours[tiledex],
            tileSize * i,
            tileSize * j,
            tileSize,
            tileSize
          );
        }
      }
    }
    this.door.draw();

    // Draw any blood particles after room objects so they appear behind the player/mobs
    for (let i = 0; i < this.bloodParticles.length; i++) {
      this.bloodParticles[i].update();
      this.bloodParticles[i].draw();
      if (this.bloodParticles[i].isFinished()) {
        this.bloodParticles.splice(i, 1);
      }
    }

    for (let m of this.mobs) {
      m.draw();
    }

    for (let p of playerA.projectilesFired) {
      p.draw();
    }
    if (coop) {
      for (let p of playerB.projectilesFired) {
        p.draw();
      }
    }

    playerA.move();

    if (coop) {
      playerB.move();
    }

    playerA.fire();

    if (coop) {
      playerB.fire();
    }

    playerA.draw();

    const barWidth = 200;
    const barHeight = 20;
    const padding = 10;

    playerA.drawPlayerHeatBar(
      width / 4 - barWidth / 2,
      height - barHeight - padding,
      barWidth,
      barHeight,
      playerA.fireCooldown / 200,
      "PLAYER A"
    );

    if (coop) {
      playerB.draw();
      playerB.drawPlayerHeatBar(
        width / 4 - barWidth / 2 + 400,
        height - barHeight - padding,
        barWidth,
        barHeight,
        playerB.fireCooldown / 200,
        "PLAYER B"
      );
    }

    // collision checking
    for (let i = playerA.projectilesFired.length - 1; i >= 0; i--) {
      let projectileHit = false;
      for (let mob of this.mobs) {
        if (playerA.projectilesFired[i].isCollidingWith(mob)) {
          mob.takeDamage(playerA.attackDamage);
          this.createBloodParticles(mob.position.x, mob.position.y, mob.bloodColour);
          projectileHit = true;
          break;
        }
      }
      if (projectileHit) {
        playerA.projectilesFired.splice(i, 1);
      }
    }
    if (coop) {
      for (let i = playerB.projectilesFired.length - 1; i >= 0; i--) {
        let projectileHit = false;
        for (let mob of this.mobs) {
          if (playerB.projectilesFired[i].isCollidingWith(mob)) {
            mob.takeDamage(playerB.attackDamage);
            this.createBloodParticles(mob.position.x, mob.position.y, mob.bloodColour);
            projectileHit = true;
            break;
          }
        }
        if (projectileHit) {
          playerB.projectilesFired.splice(i, 1);
        }
      }
    }
    for (let mob of this.mobs) {
      if (playerA.isCollidingWith(mob) && playerA.isActive) {
        playerA.takeDamage(mob.attackDamage); // Can be balanced here or in constants.js
        this.createBloodParticles(playerA.position.x, playerA.position.y, playerA.bloodColour);
        playerA.applyKnockback(mob.position.x, mob.position.y);
        mob.applyKnockback(playerA.position.x, playerA.position.y);
        playerA.makeInvincible();
      }

      if (coop && playerB.isCollidingWith(mob) && playerB.isActive) {
        playerB.takeDamage(mob.attackDamage); // Can be balanced here or in constants.js
        this.createBloodParticles(playerB.position.x, playerB.position.y, playerB.bloodColour);
        playerB.applyKnockback(mob.position.x, mob.position.y);
        mob.applyKnockback(playerB.position.x, playerB.position.y);
        playerB.makeInvincible();
      }
    }

    // Handles drawing the 'interact' button prompt if the player is in range of the door
    // I apologise for how ugly this is
    if (this.isCleared) {
      if (this.door.x == roomWidth - 2) { // Door on right side of room
        if ((playerA.position.x < this.door.position.x &&
          playerA.position.x > this.door.position.x - tileSize * 8 &&
          playerA.position.y < this.door.position.y + tileSize * 6 &&
          playerA.position.y > this.door.position.y - tileSize * 6) ||
          (coop && playerB.position.x < this.door.position.x &&
          playerB.position.x > this.door.position.x - tileSize * 8 &&
          playerB.position.y < this.door.position.y + tileSize * 6 &&
          playerB.position.y > this.door.position.y - tileSize * 6)) {
          image(buttonPrompt, this.door.position.x - tileSize * 2, this.door.position.y);
          this.promptActive = true;
        } else {
          this.promptActive = false;
        }
      } else if (this.door.y == roomHeight - 2) { // Door at bottom of room
        if ((playerA.position.x < this.door.position.x + tileSize * 6 &&
          playerA.position.x > this.door.position.x - tileSize * 6 &&
          playerA.position.y < this.door.position.y &&
          playerA.position.y > this.door.position.y - tileSize * 8) ||
          (coop && playerB.position.x < this.door.position.x + tileSize * 6 &&
          playerB.position.x > this.door.position.x - tileSize * 6 &&
          playerB.position.y < this.door.position.y &&
          playerB.position.y > this.door.position.y - tileSize * 8)) {
          image(buttonPrompt, this.door.position.x + tileSize + tileSize / 2, this.door.position.y - tileSize * 2);
          this.promptActive = true;
        } else {
          this.promptActive = false;
        }
      } else if (this.door.y == 1) { // Door at top of room
        if ((playerA.position.x < this.door.position.x + tileSize * 6 &&
          playerA.position.x > this.door.position.x - tileSize * 6 &&
          playerA.position.y < this.door.position.y + tileSize * 8 &&
          playerA.position.y > this.door.position.y) ||
          (coop && playerB.position.x < this.door.position.x + tileSize * 6 &&
          playerB.position.x > this.door.position.x - tileSize * 6 &&
          playerB.position.y < this.door.position.y + tileSize * 8 &&
          playerB.position.y > this.door.position.y)) {
          image(buttonPrompt, this.door.position.x + tileSize + tileSize / 2, this.door.position.y + tileSize * 2);
          this.promptActive = true;
        } else {
          this.promptActive = false;
        }
      }
    }
  }

  addWallCollisions(object) {
    for (let j = 0; j < roomHeight; j++) {
      for (let i = 0; i < roomWidth; i++) {
        if (this.roomLayout[j][i].type == tileTypes.WALL) {
          object.collidables.push(this.roomLayout[j][i]);
        }
      }
    }
  }

  spawnMob() {
    if (
      this.mobs.length >= this.difficultySettings.maxMobs ||
      this.mobs.length >= this.mobsRemaining ||
      this.isCleared
    ) {
      return;
    }

    let spawnX, spawnY;
    let validSpawn = false;
    let spawnAttempts = 0;
    while (!validSpawn && spawnAttempts < 100) {
      spawnX = random(tileSize * 3, roomWidth * tileSize - tileSize * 3);
      spawnY = random(tileSize * 3, roomHeight * tileSize - tileSize * 3);

      // Checking if the spawn is inside a wall
      let insideWall = this.checkInsideWall(spawnX, spawnY);
      if (insideWall) {
        break;
      }

      let distanceFromP1 = dist(
        spawnX,
        spawnY,
        playerA.position.x,
        playerA.position.y
      );
      let distanceFromP2 = Infinity;
      if (coop) {
        distanceFromP2 = dist(
          spawnX,
          spawnY,
          playerB.position.x,
          playerB.position.y
        );
      }
      if (!insideWall && distanceFromP1 > 150 && distanceFromP2 > 150) {
        validSpawn = true;
        break;
      }
      spawnAttempts++;
    }

    if (validSpawn) {
      let newMob = new Mob(dogmob_gif, spawnX, spawnY);
      newMob.health = this.difficultySettings.mobHealth;
      newMob.maxHealth = this.difficultySettings.mobHealth;
      newMob.speed = this.difficultySettings.mobSpeed;
      newMob.attackDamage = this.difficultySettings.mobDamage;
      //this.addWallCollisions(newMob); // adds wall collisions to mobs
      this.mobs.push(newMob);
      playerA.collidables.push(newMob);
      if (coop) {
        playerB.collidables.push(newMob);
      }
    }
  }

  checkInsideWall(x, y) {
    for (let j = 0; j < roomHeight; j++) {
      for (let i = 0; i < roomWidth; i++) {
        if (this.roomLayout[j][i].type === tileTypes.WALL) {
          let wallX = this.roomLayout[j][i].position.x;
          let wallY = this.roomLayout[j][i].position.y;
          let wallWidth = this.roomLayout[j][i].widthHitbox;
          let wallHeight = this.roomLayout[j][i].heightHitbox;

          if (
            x > wallX &&
            x < wallX + wallWidth &&
            y > wallY &&
            y < wallY + wallHeight
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }
}

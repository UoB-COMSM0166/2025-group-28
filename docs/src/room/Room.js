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
    this.mobsRemaining = difficultySettings.totalMobs();
    this.lastSpawnTime = 0;
    this.promptActive = false;
    this.currentTileColours;
    this.initRoom();
    this.roomScoreAccumaltor = 0;
  }

  initRoom() {
    const tileOptions = [tileColours1, tileColours2, tileColours3];
    this.currentTileColours = random(tileOptions);
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
        y = 1 + arena_offset;
      } else {
        // Put door at bottom of room
        y = roomHeight - 2 + arena_offset;
      }
      this.door = new Door(x, y);
    }
  }

  createBloodParticles(x, y, bloodColour) {
    if (!childMode) {
      for (let i = 0; i < 20; i++) {
        // y + 25 = blood stops falling below the object's feet
        this.bloodParticles.push(new Particle(x, y, bloodColour));
      }
    }
  }

  update() {
    // checks for dead mobs
    for (let i = this.mobs.length - 1; i >= 0; i--) {
      if (!this.mobs[i].isActive) {
        this.rollItemDrop(this.mobs[i]);
        this.mobs.splice(i, 1);
        this.mobsRemaining -= 1;
        this.roomScoreAccumaltor += 25;
      }
    }

    if (this.mobsRemaining <= 0) {
      this.isCleared = true;
      this.mobs.length = 0;
    }

    for (let p of playerA.projectilesFired) {
      p.update();
    }
    if (coop) {
      for (let p of playerB.projectilesFired) {
        p.update();
      }
    }

    //mobs
    for (let mob of this.mobs) {
      mob.update();

      if (mob instanceof RangedMob || mob instanceof BlinkMob || mob instanceof heartMob) {
        mob.fire();
        for (let p of mob.projectilesFired) {
          p.update();
        }
      }
    }

    // items
    for (let i = this.items.length - 1; i >= 0; i--) {
      this.items[i].update();
      this.items[i].draw();
      if (playerA.isCollidingWith(this.items[i])) {
        this.applyItemBuff(this.items[i], playerA);
        this.items.splice(i, 1);
      } else if (coop) {
        if (playerB.isCollidingWith(this.items[i])) {
          this.applyItemBuff(this.items[i], playerB);
          this.items.splice(i, 1);
        }
      }
    }

    // handles wall collisions
    for (let tileArr of this.roomLayout) {
      for (let tile of tileArr) {
        if (tile.type == tileTypes.WALL) {
          this.handleWallCollision(playerA, tile);
          if (coop) {
            this.handleWallCollision(playerB, tile);
          }
        }
      }
    }
    //players
    playerA.update();
    if (coop) {
      playerB.update();
    }
  }

  handleWallCollision(player, wall) {
    // First, detect if there's a collision
    if (
      player.position.x + player.widthHitbox / 2 >
        wall.position.x - wall.widthHitbox / 2 &&
      player.position.x - player.widthHitbox / 2 <
        wall.position.x + wall.widthHitbox / 2 &&
      player.position.y + player.heightHitbox / 2 >
        wall.position.y + -wall.heightHitbox / 2 &&
      player.position.y - player.heightHitbox / 2 <
        wall.position.y + wall.heightHitbox / 2
    ) {
      console.log("collision");
      // Find the overlap on each axis
      let overlapLeft =
        player.position.x +
        player.widthHitbox / 2 -
        (wall.position.x - wall.widthHitbox / 2);
      let overlapRight =
        wall.position.x +
        wall.widthHitbox / 2 -
        (player.position.x - player.widthHitbox / 2);
      let overlapTop =
        player.position.y +
        player.heightHitbox / 2 -
        (wall.position.y - wall.heightHitbox / 2);
      let overlapBottom =
        wall.position.y +
        wall.heightHitbox / 2 -
        (player.position.y - player.heightHitbox / 2);

      // Find the smallest overlap (this is the direction to push out)
      let minOverlap = Math.min(
        overlapLeft,
        overlapRight,
        overlapTop,
        overlapBottom
      );

      // Push the player out based on the smallest overlap
      if (minOverlap === overlapLeft) {
        player.position.x =
          wall.position.x - wall.widthHitbox / 2 - player.widthHitbox / 2;
        player.velocity.x = 0; // Stop horizontal movement
      } else if (minOverlap === overlapRight) {
        player.position.x =
          wall.position.x + wall.widthHitbox / 2 + player.widthHitbox / 2;
        player.velocity.x = 0; // Stop horizontal movement
      } else if (minOverlap === overlapTop) {
        player.position.y =
          wall.position.y - wall.heightHitbox / 2 - player.heightHitbox / 2;
        player.velocity.y = 0; // Stop vertical movement
      } else if (minOverlap === overlapBottom) {
        player.position.y =
          wall.position.y + wall.heightHitbox / 2 + player.heightHitbox / 2;
        player.velocity.y = 0; // Stop vertical movement
      }
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
          image(
            walltile,
            tileSize * i + arena_offset,
            tileSize * j + arena_offset,
            tileSize,
            tileSize
          );
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
            this.currentTileColours[tiledex],
            tileSize * i + arena_offset,
            tileSize * j + arena_offset,
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

    playerA.move();
    if (coop) {
      playerB.move();
    }

    playerA.fire();
    if (coop) {
      playerB.fire();
    }

    const barWidth = 200;
    const barHeight = 20;
    const padding = 10;

    playerA.draw();
    playerA.drawPlayerHealthBar();
    playerA.drawPlayerHeatBar(
      width / 4 - 90,
      height - 80,
      barWidth,
      barHeight,
      playerA.fireCooldown / 200,
      "PLAYER A"
    );

    //text("Room", width / 2, height - 100);

    if (coop) {
      playerB.draw();
      playerB.drawPlayerHealthBar();
      playerB.drawPlayerHeatBar(
        width / 4 + 400,
        height - 80,
        barWidth,
        barHeight,
        playerB.fireCooldown / 200,
        "PLAYER B"
      );
    }

    let hud_div = createDiv();

    // player collision checking
    for (let i = playerA.projectilesFired.length - 1; i >= 0; i--) {
      playerA.projectilesFired[i].draw();
      if (!playerA.projectilesFired[i].isActive) {
        playerA.projectilesFired.splice(i, 1);
        continue;
      }
      let projectileHit = false;
      for (let mob of this.mobs) {
        if (playerA.projectilesFired[i].isCollidingWith(mob)) {
          mob.takeDamage(playerA.attackDamage);
          this.createBloodParticles(
            mob.position.x,
            mob.position.y,
            mob.bloodColour
          );
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
        playerB.projectilesFired[i].draw();
        if (!playerB.projectilesFired[i].isActive) {
          playerB.projectilesFired.splice(i, 1);
          continue;
        }
        let projectileHit = false;
        for (let mob of this.mobs) {
          if (playerB.projectilesFired[i].isCollidingWith(mob)) {
            mob.takeDamage(playerB.attackDamage);
            this.createBloodParticles(
              mob.position.x,
              mob.position.y,
              mob.bloodColour
            );
            projectileHit = true;
            break;
          }
        }
        if (projectileHit) {
          playerB.projectilesFired.splice(i, 1);
        }
      }
    }

    // mob checks
    for (let mob of this.mobs) {
      mob.draw();
      mob.drawMobHealthBar();
      if (playerA.isCollidingWith(mob) && playerA.isActive) {
        playerA.takeDamage(mob.attackDamage); // Can be balanced here or in constants.js
        this.createBloodParticles(
          playerA.position.x,
          playerA.position.y,
          playerA.bloodColour
        );
        playerA.applyKnockback(mob.position.x, mob.position.y);
        mob.applyKnockback(playerA.position.x, playerA.position.y);
        playerA.makeInvincible();
      }

      if (coop && playerB.isCollidingWith(mob) && playerB.isActive) {
        playerB.takeDamage(mob.attackDamage); // Can be balanced here or in constants.js
        this.createBloodParticles(
          playerB.position.x,
          playerB.position.y,
          playerB.bloodColour
        );
        playerB.applyKnockback(mob.position.x, mob.position.y);
        mob.applyKnockback(playerB.position.x, playerB.position.y);
        playerB.makeInvincible();
      }

      if (mob instanceof RangedMob || mob instanceof BlinkMob || mob instanceof heartMob) {
        let projectileHit = false;
        for (let i = mob.projectilesFired.length - 1; i >= 0; i--) {
          mob.projectilesFired[i].draw();
          if (!mob.projectilesFired[i].isActive) {
            mob.projectilesFired.splice(i, 1);
            continue;
          }
          if (mob.projectilesFired[i].isCollidingWith(playerA)) {
            playerA.takeDamage(mob.attackDamage);
            this.createBloodParticles(
              playerA.position.x,
              playerA.position.y,
              playerA.bloodColour
            );
            playerA.makeInvincible();
            projectileHit = true;
          }
          if (coop) {
            if (mob.projectilesFired[i].isCollidingWith(playerB)) {
              playerB.takeDamage(mob.attackDamage);
              this.createBloodParticles(
                playerB.position.x,
                playerB.position.y,
                playerB.bloodColour
              );
              playerB.makeInvincible();
              projectileHit = true;
            }
          }
          if (projectileHit) {
            mob.projectilesFired.splice(i, 1);
          }
        }
      }
    }

    // Handles drawing the 'interact' button prompt if the player is in range of the door
    // I apologise for how ugly this is
    if (this.isCleared) {
      if (this.door.x == roomWidth - 2) {
        // Door on right side of room
        if (
          (playerA.position.x < this.door.position.x &&
            playerA.position.x > this.door.position.x - tileSize * 8 &&
            playerA.position.y < this.door.position.y + tileSize * 6 &&
            playerA.position.y > this.door.position.y - tileSize * 6) ||
          (coop &&
            playerB.position.x < this.door.position.x &&
            playerB.position.x > this.door.position.x - tileSize * 8 &&
            playerB.position.y < this.door.position.y + tileSize * 6 &&
            playerB.position.y > this.door.position.y - tileSize * 6)
        ) {
          image(
            buttonPrompt,
            this.door.position.x - tileSize * 2 + arena_offset,
            this.door.position.y + arena_offset
          );
          this.promptActive = true;
        } else {
          this.promptActive = false;
        }
      } else if (this.door.y == roomHeight - 2) {
        // Door at bottom of room
        if (
          (playerA.position.x < this.door.position.x + tileSize * 6 &&
            playerA.position.x > this.door.position.x - tileSize * 6 &&
            playerA.position.y < this.door.position.y &&
            playerA.position.y > this.door.position.y - tileSize * 8) ||
          (coop &&
            playerB.position.x < this.door.position.x + tileSize * 6 &&
            playerB.position.x > this.door.position.x - tileSize * 6 &&
            playerB.position.y < this.door.position.y &&
            playerB.position.y > this.door.position.y - tileSize * 8)
        ) {
          image(
            buttonPrompt,
            this.door.position.x + tileSize + tileSize / 2 + arena_offset,
            this.door.position.y - tileSize * 2 + arena_offset
          );
          this.promptActive = true;
        } else {
          this.promptActive = false;
        }
      } else if (this.door.y == 1) {
        // Door at top of room
        if (
          (playerA.position.x < this.door.position.x + tileSize * 6 &&
            playerA.position.x > this.door.position.x - tileSize * 6 &&
            playerA.position.y < this.door.position.y + tileSize * 8 &&
            playerA.position.y > this.door.position.y) ||
          (coop &&
            playerB.position.x < this.door.position.x + tileSize * 6 &&
            playerB.position.x > this.door.position.x - tileSize * 6 &&
            playerB.position.y < this.door.position.y + tileSize * 8 &&
            playerB.position.y > this.door.position.y)
        ) {
          image(
            buttonPrompt,
            this.door.position.x + tileSize + tileSize / 2 + arena_offset,
            this.door.position.y + tileSize * 2 + arena_offset
          );
          this.promptActive = true;
        } else {
          this.promptActive = false;
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
      spawnX =
        random(tileSize * 3, roomWidth * tileSize - tileSize * 3) +
        arena_offset;
      spawnY =
        random(tileSize * 3, roomHeight * tileSize - tileSize * 3) +
        arena_offset;

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
      let rand = random(1, 100);
      let newMob;
      if (rand > 60 && rand < 80) {
        newMob = new MeleeMob(
          dogmob_gif,
          spawnX,
          spawnY,
          this.difficultySettings
        );
      } else if (rand < 60 && rand > 25) {
        newMob = new RangedMob(
          rangedmob_gif,
          spawnX,
          spawnY,
          this.difficultySettings
        );

      } else if (rand < 25 && rand > 0) {
        newMob = new BlinkMob(
          blinkMobGif,
          spawnX,
          spawnY,
          this.difficultySettings
        );
      } else {
        newMob = new heartMob_gif(
          blinkMobGif,
          spawnX,
          spawnY,
          this.difficultySettings
        );
      }
      this.mobs.push(newMob);
    }
  }

  checkInsideWall(x, y) {
    for (let j = 0; j < roomHeight; j++) {
      for (let i = 0; i < roomWidth; i++) {
        if (this.roomLayout[j][i].type === tileTypes.WALL) {
          let wallX = this.roomLayout[j][i].position.x + arena_offset;
          let wallY = this.roomLayout[j][i].position.y + arena_offset;
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

  rollItemDrop(mob) {
    let roll = random(1, 200);
    let item;
    if (roll < 35) {
      item = new Heart(mob.position.x, mob.position.y, pixelHeart);
      this.items.push(item);
    } else if (roll >= 35 && roll < 70) {
      item = new Energy(mob.position.x, mob.position.y, pixelEnergy);
      this.items.push(item);
    }
  }

  applyItemBuff(item, player) {
    if (item instanceof Heart) {
      if (player.health < 71) {
        player.health += 30;
      } else {
        player.health = 100;
      }
    } else if (item instanceof Energy) {
      player.fireCooldown = 0;
      player.slowTimer = 0;
      player.fireOverheat = false;
      player.speed = 3;
    }
  }
}

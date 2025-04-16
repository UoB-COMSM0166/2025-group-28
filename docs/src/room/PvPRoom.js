class PvPRoom {
  constructor() {
    this.door = null;
    this.roomType = 0; // doesn't exist for now
    this.isCleared = false;
    this.items = [];
    this.roomLayout = []; // 2d array of tiles
    this.particles = [];
    this.lastSpawnTime = 0;
    this.currentTileColours;
    this.p1Score = 0;
    this.p2Score = 0;
    this.p1ScoreIncreased = false;
    this.p2ScoreIncreased = false;
    this.announcerSounds = [pvpAnnouncer1, pvpAnnouncer2,
                            pvpAnnouncer3, pvpAnnouncer4,
                            pvpAnnouncer5, pvpAnnouncer6];
    this.initRoom();
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
      let shouldAddWall = this.rollAddWall();
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
  rollAddWall() {
    let wallChance = random(0, 2);
    if (wallChance < 0.65) {
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

  createParticles(type = Particle, x, y, colour, velocity = null) {
    if (childMode && type == Blood) return;
    let maxParticles;
    if (type == Spark) {
      maxParticles = Math.floor(random(3, 7));
    } else {
      maxParticles = Math.floor(random(5, 20));
    }
    for (let i = 0; i < maxParticles; i++) {
      if (type == Spark && velocity) {
        this.particles.push(new Spark(x, y, colour, velocity));
      } else {
        this.particles.push(new type(x, y, colour));
      }
    }
  }

  update() {
    for (let p of projectileManager.projectilesFired) {
      if (
        p.position.x < (tileSize * 2.75) + arena_offset ||
        p.position.x > roomWidth * tileSize - (tileSize * 2.75) + arena_offset ||
        p.position.y < (tileSize * 2.75) + arena_offset ||
        p.position.y > roomHeight * tileSize - (tileSize * 2.75) + arena_offset ||
        (projectileWallCollisions && this.checkInsideWall(p.position.x, p.position.y))
      ) {
        this.createParticles(Spark, p.position.x, p.position.y, p.sparkColour, p.velocity);
        p.isActive = false;
      } else p.update();
    }

    if (!playerA.isActive) {
      if (!this.p2ScoreIncreased) {
        this.p2Score++;
        pvpScoreSound.play();
        setTimeout(() => {
          let randomAnnouncement = Math.floor(random(0, this.announcerSounds.length));
          this.announcerSounds[randomAnnouncement].play();
        }, 500);
        if (this.p2Score < 3) {
          setTimeout(() => {
            this.respawnPlayer(playerA);
            playerA.makeInvincible();
            this.p2ScoreIncreased = false;
          }, 1500);
        }
        this.p2ScoreIncreased = true;
      }
    } else if (!playerB.isActive) {
      if (!this.p1ScoreIncreased) {
        this.p1Score++;
        pvpScoreSound.play();
        setTimeout(() => {
          let randomAnnouncement = Math.floor(random(0, this.announcerSounds.length));
          this.announcerSounds[randomAnnouncement].play();
        }, 500);
        if (this.p1Score < 3) {
          setTimeout(() => {
            this.respawnPlayer(playerB);
            playerB.makeInvincible();
            this.p1ScoreIncreased = false;
          }, 1500);
        }
        this.p1ScoreIncreased = true;
      }
    }

    // items
    for (let i = this.items.length - 1; i >= 0; i--) {
      this.items[i].update();
      this.items[i].draw();
      if (playerA.isCollidingWith(this.items[i])) {
        this.applyItemBuff(this.items[i], playerA);
        this.items.splice(i, 1);
      }
    if (playerB.isCollidingWith(this.items[i])) {
        this.applyItemBuff(this.items[i], playerB);
        this.items.splice(i, 1);
    }
    }

    // handles wall collisions
    for (let tileArr of this.roomLayout) {
        for (let tile of tileArr) {
          if (tile.type == tileTypes.WALL) {
          this.handleWallCollision(playerA, tile);
          this.handleWallCollision(playerB, tile);
          }
        }
    }

    //players
    playerA.update();
    playerB.update();
  }

  handleWallCollision(player, wall) {
    // Calculate the boundaries of both objects
    const playerLeft = player.position.x - player.widthHitbox / 2;
    const playerRight = player.position.x + player.widthHitbox / 2;
    const playerTop = player.position.y - player.heightHitbox / 2;
    const playerBottom = player.position.y + player.heightHitbox / 2;

    const wallLeft = wall.position.x;
    const wallRight = wall.position.x + wall.widthHitbox;
    const wallTop = wall.position.y;
    const wallBottom = wall.position.y + wall.heightHitbox;

    // Check if there's a collision
    if (
      playerRight > wallLeft &&
      playerLeft < wallRight &&
      playerBottom > wallTop &&
      playerTop < wallBottom
    ) {
      // Calculate overlaps on each axis
      const overlapLeft = playerRight - wallLeft;
      const overlapRight = wallRight - playerLeft;
      const overlapTop = playerBottom - wallTop;
      const overlapBottom = wallBottom - playerTop;

      // Find the minimum overlap
      const minOverlap = Math.min(
        overlapLeft,
        overlapRight,
        overlapTop,
        overlapBottom
      );

      // Resolve collision based on minimum overlap
      if (minOverlap === overlapLeft) {
        // Colliding from the right side of the wall
        player.position.x = wallLeft - player.widthHitbox / 2;
        player.velocity.x = 0;
      } else if (minOverlap === overlapRight) {
        // Colliding from the left side of the wall
        player.position.x = wallRight + player.widthHitbox / 2;
        player.velocity.x = 0;
      } else if (minOverlap === overlapTop) {
        // Colliding from below the wall
        player.position.y = wallTop - player.heightHitbox / 2;
        player.velocity.y = 0;
      } else if (minOverlap === overlapBottom) {
        // Colliding from above the wall
        player.position.y = wallBottom + player.heightHitbox / 2;
        player.velocity.y = 0;
      }
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

    // Draw any particles after room objects so they appear behind the player/mobs
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      this.particles[i].draw();
      if (this.particles[i].isFinished()) {
        this.particles.splice(i, 1);
      }
    }

    playerA.move();
    playerB.move();

    playerA.fire();
    playerB.fire();

    playerA.draw();
    playerA.drawPlayerHealthBar();

    playerB.draw();
    playerB.drawPlayerHealthBar();


    // pvp bullet collisions
    for (let projectile of projectileManager.projectilesFired) {
      if (projectile.isActive) {
        projectile.draw();
        if (projectile.isCollidingWith(playerB) && projectile.owner == playerA) {
          if (!playerB.isInvincible) {
            playerB.takeDamage(playerA.attackDamage);
            this.createParticles(
              Blood,
              playerB.position.x,
              playerB.position.y,
              playerB.bloodColour
            );
          }
          projectile.isActive = false;
        }
        if (projectile.isCollidingWith(playerA) && projectile.owner == playerB) {
          if (!playerA.isInvincible) {
          playerA.takeDamage(playerB.attackDamage);
            this.createParticles(
              Blood,
              playerA.position.x,
              playerA.position.y,
              playerA.bloodColour
            );
          }
          projectile.isActive = false;
        }
      }
    }

    if (playerA.isCollidingWith(playerB)) {
      playerA.applyKnockback(playerB.position.x, playerB.position.y);
      playerB.applyKnockback(playerA.position.x, playerA.position.y);
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

  respawnPlayer(player) {
    let spawnX, spawnY;
    let validSpawn = false;
    let spawnAttempts = 0;
    let enemy;
    let gif;
    let playerNo;
    if (player === playerB) {
      enemy = playerA;
      gif = playerB.img;
      playerNo = playerB.player;
    } else {
      enemy = playerB;
      gif = playerA.img;
      playerNo = playerA.player;
    }
    while (!validSpawn && spawnAttempts < 100) {
      spawnX =
        random(tileSize * 3, roomWidth * tileSize - tileSize * 3) +
        arena_offset;
      spawnY =
        random(tileSize * 3, roomHeight * tileSize - tileSize * 3) +
        arena_offset;

      let distanceFromEnemy = dist(
        spawnX,
        spawnY,
        enemy.position.x,
        enemy.position.y
      );
      if (distanceFromEnemy > 300 && !this.checkInsideWall(spawnX, spawnY)) {
        validSpawn = true;
        break;
      }
      spawnAttempts++;
    }

    if (validSpawn) {
      if (player === playerB) {
        playerB = null;
        playerB = new Player(gif, spawnX, spawnY, playerNo);
      } else {
        playerA = null;
        playerA = new Player(gif, spawnX, spawnY, playerNo);
      }
    }
  }
}
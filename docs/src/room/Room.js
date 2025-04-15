class Room {
  constructor(difficultySettings) {
    this.door = null;
    this.roomType = 0; // doesn't exist for now
    this.difficultySettings = difficultySettings;
    this.isCleared = false;
    this.mobs = [];
    this.items = [];
    this.roomLayout = []; // 2d array of tiles
    this.particles = [];
    this.mobsRemaining = difficultySettings.totalMobs();
    this.lastSpawnTime = 0;
    this.promptActive = false; // Controls interact prompt for doors
    this.currentTileColours;
    this.roomScoreAccumaltor = 0;
    this.threatCap = behaviourMonitor.getRoomThreatCap();
    this.threatLevel = 0;
    this.threatCapReached = false;
    // BuffMob vars
    this.canSpawnBuffMob = false; // Only true if player has survived 3+ rooms & playing on normal/hard/coop
    this.mobBuffActive = false; // Set true once BuffMob is killed, applies buff to all other mobs

    // bonus point vars
    this.damageTakenP1 = 0;
    this.damageDealtP1 = 0;
    this.damageTakenP2 = 0;
    this.damageDealtP2 = 0;

    this.initRoom();
  }

  initRoom() {
    const tileOptions = [tileColours1, tileColours2, tileColours3];
    this.currentTileColours = random(tileOptions);
    this.roomLayout = [];
    for (let j = arena_offset; j < arena_offset + roomHeight; j++) {
      let roomTiles = [];
      for (let i = arena_offset; i < arena_offset + roomWidth; i++) {
        if (
          j == arena_offset ||
          i == arena_offset ||
          j == arena_offset + 1 ||
          i == arena_offset + 1 ||
          j == arena_offset + roomHeight - 1 ||
          i == arena_offset + roomWidth - 1 ||
          j == arena_offset + roomHeight - 2 ||
          i == arena_offset + roomWidth - 2
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
    let validDoor = false;
    let doorPos = random();
    let x, y;
    while (!validDoor) {
      // doorBuffer stops doors spawning in corners of room
      x = floor(random(doorBuffer, roomWidth - doorBuffer));
      y = floor(random(doorBuffer, roomHeight - doorBuffer));
      if (doorPos < 0.5) {
        if (x < (roomWidth - 2) / 2) {
          if (doorPrevPos != "right") {
            // Put door on left side of room
            x = 1;
            doorPrevPos = "left";
            validDoor = true;
          }
        } else {
          if (doorPrevPos != "left") {
            // Put door on right side of room
            x = roomWidth + arena_offset / 9.5;
            doorPrevPos = "right";
            validDoor = true;
          }
        }
      } else {
        if (y < (roomHeight - 2) / 2) {
          if (doorPrevPos != "bottom") {
            // Put door at top of room
            y = 1;
            doorPrevPos = "top";
            validDoor = true;
          }
        } else {
          if (doorPrevPos != "top") {
            // Put door at bottom of room
            y = roomHeight - 2;
            doorPrevPos = "bottom";
            validDoor = true;
          }
        }
      }
    }
    this.door = new Door(x, y);
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
    // checks for dead mobs
    for (let i = this.mobs.length - 1; i >= 0; i--) {
      if (!this.mobs[i].isActive) {
        this.rollItemDrop(this.mobs[i]);
        this.mobsRemaining -= 1;
        if (this.mobs[i] instanceof BuffMob) {
          if (this.mobs.length > 1) {
            // If other mobs are in room when BuffMob killed
            this.roomScoreAccumaltor += 5; // Give smaller score as player activated buff
            this.mobBuffActive = true; // Activate buff to all other mobs
            buffMobBuffSound.play(); // Doesn't sound good if slowed during slow mo, so play sfx normally
            if (!game.slowMeowOccurring) {
              // Give player a lower value towards their slow meow level for triggering mob buff
              game.slowMeowLevel = Math.min(slowMeowMax, game.slowMeowLevel + (game.slowMeowGain / 2));
            }
          } else {
            this.roomScoreAccumaltor += 25;
            if (!game.slowMeowOccurring) {
              game.slowMeowLevel = Math.min(slowMeowMax,game.slowMeowLevel + game.slowMeowGain);
            }
          }
        } else {
          this.roomScoreAccumaltor += 25;
          if (!game.slowMeowOccurring) {
            game.slowMeowLevel = Math.min(slowMeowMax, game.slowMeowLevel + game.slowMeowGain);
          }
        }
        this.mobs.splice(i, 1);
      }
    }

    if (this.threatLevel >= this.threatCap) {
      this.threatCapReached = true;
    }

    if (this.mobs.length == 0 && this.threatCapReached) {
      this.isCleared = true;
    }

    for (let p of projectileManager.projectilesFired) {
      if (
        p.position.x < (tileSize * 3) + arena_offset ||
        p.position.x > roomWidth * tileSize - (tileSize * 3) + arena_offset ||
        p.position.y < (tileSize * 3) + arena_offset ||
        p.position.y > roomHeight * tileSize - (tileSize * 3) + arena_offset
      ) {
        this.createParticles(Spark, p.position.x, p.position.y, p.sparkColour, p.velocity);
        p.isActive = false;
      } else p.update();
    }

    //mobs
    for (let mob of this.mobs) {
      mob.update();

      if (this.mobBuffActive) {
        mob.applyBuff();
        setTimeout(() => {
          this.mobBuffActive = false;
        }, 10000); // Buff lasts for 10 seconds
      } else mob.removeBuff();
      if (mob instanceof RangedMob || mob instanceof BlinkMob) {
        mob.fire();
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

    // Draw any particles after room objects so they appear behind the player/mobs
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      this.particles[i].draw();
      if (this.particles[i].isFinished()) {
        this.particles.splice(i, 1);
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
    playerA.drawPlayerHealthBar();

    if (coop) {
      playerB.draw();
      playerB.drawPlayerHealthBar();
    }

    // Projectile collision checking
    for (let projectile of projectileManager.projectilesFired) {
      if (projectile.isActive) {
        projectile.draw();
        for (let mob of this.mobs) {
          if (
            projectile.isCollidingWith(mob) &&
            projectile.owner instanceof Player
          ) {
            mob.takeDamage(projectile.owner.attackDamage);
            if (projectile.owner === playerA)
              this.damageDealtP1 += projectile.owner.attackDamage;
            if (projectile.owner === playerB)
              this.damageDealtP2 += projectile.owner.attackDamage;
            this.createParticles(
              Blood,
              mob.position.x,
              mob.position.y,
              mob.bloodColour
            );
            projectile.isActive = false;
          }
        }
        if (
          projectile.owner instanceof RangedMob ||
          projectile.owner instanceof BlinkMob
        ) {
          if (projectile.isCollidingWith(playerA)) {
            playerA.takeDamage(projectile.owner.attackDamage);
            this.damageTakenP1 += projectile.owner.attackDamage;
            if (!playerA.isInvincible) {
              this.createParticles(
                Blood,
                playerA.position.x,
                playerA.position.y,
                playerA.bloodColour
              );
              if (!game.slowMeowOccurring && game.slowMeowLevel < slowMeowMax) {
                game.slowMeowLevel = Math.max(0, game.slowMeowLevel - game.slowMeowLoss);
              }
            }
            projectile.isActive = false;
            playerA.makeInvincible();
          }
          if (coop && projectile.isCollidingWith(playerB)) {
            playerB.takeDamage(projectile.owner.attackDamage);
            this.damageTakenP2 += projectile.owner.attackDamage;
            if (!playerB.isInvincible) {
              this.createParticles(
                Blood,
                playerB.position.x,
                playerB.position.y,
                playerB.bloodColour
              );
              if (!game.slowMeowOccurring && game.slowMeowLevel < slowMeowMax) {
                game.slowMeowLevel = Math.max(0, game.slowMeowLevel - game.slowMeowLoss);
              }
            }
            projectile.isActive = false;
            playerB.makeInvincible();
          }
        }
      }
    }

    // mob checks
    for (let mob of this.mobs) {
      mob.draw();
      mob.drawMobHealthBar();
      if (playerA.isCollidingWith(mob) && playerA.isActive) {
        if (!(mob instanceof BlinkMob)) {
          playerA.takeDamage(mob.attackDamage);
          this.damageTakenP1 += mob.attackDamage;
          if (!playerA.isInvincible) {
            this.createParticles(
              Blood,
              playerA.position.x,
              playerA.position.y,
              playerA.bloodColour
            );
            if (!game.slowMeowOccurring && game.slowMeowLevel < slowMeowMax) {
              game.slowMeowLevel = Math.max(0, game.slowMeowLevel - game.slowMeowLoss);
            }
          }
          playerA.applyKnockback(mob.position.x, mob.position.y);
          mob.applyKnockback(playerA.position.x, playerA.position.y);
          playerA.makeInvincible();
        } else {
          mob.blinkCooldown = mob.blinkCooldownLimit;
          mob.blink();
        }
      }

      if (coop && playerB.isCollidingWith(mob) && playerB.isActive) {
        if (!(mob instanceof BlinkMob)) {
          playerB.takeDamage(mob.attackDamage);
          this.damageTakenP2 += mob.attackDamage;
          if (!playerB.isInvincible) {
            this.createParticles(
              Blood,
              playerB.position.x,
              playerB.position.y,
              playerB.bloodColour
            );
            if (!game.slowMeowOccurring && game.slowMeowLevel < slowMeowMax) {
              game.slowMeowLevel = Math.max(0, game.slowMeowLevel - game.slowMeowLoss);
            }
          }
          playerB.applyKnockback(mob.position.x, mob.position.y);
          mob.applyKnockback(playerB.position.x, playerB.position.y);
          playerB.makeInvincible();
        } else {
          mob.blinkCooldown = mob.blinkCooldownLimit;
          mob.blink();
        }
      }
    }

    // Handles drawing the 'interact' button prompt if the player is in range of the door
    // I apologise for how ugly this is
    if (this.isCleared) {
      if (this.door.x == 1) {
        // Door on left side of room
        if (
          (playerA.position.x < this.door.position.x + tileSize * 8 &&
            playerA.position.x > this.door.position.x &&
            playerA.position.y < this.door.position.y + tileSize * 6 &&
            playerA.position.y > this.door.position.y - tileSize * 4) ||
          (coop &&
            playerB.position.x < this.door.position.x + tileSize * 8 &&
            playerB.position.x > this.door.position.x &&
            playerB.position.y < this.door.position.y + tileSize * 6 &&
            playerB.position.y > this.door.position.y - tileSize * 4)
        ) {
          image(
            buttonPrompt,
            this.door.position.x + tileSize * 2,
            this.door.position.y
          );
          this.promptActive = true;
        } else {
          this.promptActive = false;
        }
      } else if (this.door.x == roomWidth + arena_offset / 9.5) {
        // Door on right side of room
        if (
          (playerA.position.x < this.door.position.x &&
            playerA.position.x >
              this.door.position.x - arena_offset * 2 - tileSize * 8 &&
            playerA.position.y < this.door.position.y + tileSize * 6 &&
            playerA.position.y > this.door.position.y - tileSize * 4) ||
          (coop &&
            playerB.position.x < this.door.position.x &&
            playerB.position.x >
              this.door.position.x - arena_offset * 2 - tileSize * 8 &&
            playerB.position.y < this.door.position.y + tileSize * 6 &&
            playerB.position.y > this.door.position.y - tileSize * 4)
        ) {
          image(
            buttonPrompt,
            this.door.position.x - tileSize * 2 - arena_offset * 2,
            this.door.position.y
          );
          this.promptActive = true;
        } else {
          this.promptActive = false;
        }
      } else if (this.door.y == roomHeight - 2) {
        // Door at bottom of room
        if (
          (playerA.position.x < this.door.position.x + tileSize * 8 &&
            playerA.position.x > this.door.position.x - tileSize * 4 &&
            playerA.position.y < this.door.position.y &&
            playerA.position.y > this.door.position.y - tileSize * 8) ||
          (coop &&
            playerB.position.x < this.door.position.x + tileSize * 8 &&
            playerB.position.x > this.door.position.x - tileSize * 4 &&
            playerB.position.y < this.door.position.y &&
            playerB.position.y > this.door.position.y - tileSize * 8)
        ) {
          image(
            buttonPrompt,
            this.door.position.x + tileSize + tileSize / 2,
            this.door.position.y - tileSize * 2
          );
          this.promptActive = true;
        } else {
          this.promptActive = false;
        }
      } else if (this.door.y == 1) {
        // Door at top of room
        if (
          (playerA.position.x < this.door.position.x + tileSize * 8 &&
            playerA.position.x > this.door.position.x - tileSize * 4 &&
            playerA.position.y < this.door.position.y + tileSize * 8 &&
            playerA.position.y > this.door.position.y) ||
          (coop &&
            playerB.position.x < this.door.position.x + tileSize * 8 &&
            playerB.position.x > this.door.position.x - tileSize * 4 &&
            playerB.position.y < this.door.position.y + tileSize * 8 &&
            playerB.position.y > this.door.position.y)
        ) {
          image(
            buttonPrompt,
            this.door.position.x + tileSize + tileSize / 2,
            this.door.position.y + tileSize * 2
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
      this.currentThreat >= this.threatCap ||
      this.threatCapReached ||
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
      if (distanceFromP1 > 200 && distanceFromP2 > 200) {
        validSpawn = true;
        break;
      }
      spawnAttempts++;
    }

    if (validSpawn) {
      this.chooseMob(spawnX, spawnY);
    }
  }

  chooseMob(spawnX, spawnY) {
    // This is here instead of Constants.js as assets and mobs need initialising before this accesses them
    const mobTypes = Object.freeze([
      {
        type: MeleeMob,
        gif: dogmob_gif,
        threat: 3,
        counters: ["defensive"],
        spawnChance: 1.1,
      },
      {
        type: RangedMob,
        gif: rangedmob_gif,
        threat: 5,
        counters: ["aggressive"],
        spawnChance: 1,
      },
      {
        type: BlinkMob,
        gif: blinkMobGif,
        threat: 10,
        counters: ["defensive"],
        spawnChance: 0.8,
      },
      {
        type: BuffMob,
        gif: heartMob_gif,
        threat: 0,
        counters: ["aggressive"],
        spawnChance: 0.5,
      },
    ]);

    let playerBehaviour = behaviourMonitor.getBehaviourProfile();
    let behaviourKeys = Object.keys(playerBehaviour).filter(
      (key) => playerBehaviour[key]
    );
    /* Filter out buff mob if it can't be spawned, also filter out any mobs whose threat level would exceed
       the threat cap too much */
    let filteredMobTypes = mobTypes.filter((m) => {
      return (
        ((this.canSpawnBuffMob && this.threatLevel > 0) ||
          m.type !== BuffMob) &&
        m.threat + this.threatLevel <=
          this.threatCap + behaviourMonitor.getRoomsCleared() / 5
      );
    });
    if (filteredMobTypes.length == 0) {
      this.threatCapReached = true;
      return;
    }
    let totalWeight = 0;
    let weightedMobs = filteredMobTypes.map((m) => {
      let weight = m.spawnChance;
      if (m.counters.some((counter) => behaviourKeys.includes(counter))) {
        weight *= 2; // Increase weighting if mob counters player's behaviour
      }
      totalWeight += weight;
      return { mob: m, weight };
    });
    let randomNum = random(0, totalWeight);
    let chosenMob = null;
    if (this.mobs.length < this.difficultySettings.maxMobs) {
      for (let mob of weightedMobs) {
        if (randomNum < mob.weight) {
          chosenMob = mob.mob;
          break;
        }
        randomNum -= mob.weight;
      }
      if (chosenMob.type == BuffMob) this.canSpawnBuffMob = false;
      this.mobs.push(
        new chosenMob.type(
          chosenMob.gif,
          spawnX,
          spawnY,
          this.difficultySettings
        )
      );
      this.threatLevel += chosenMob.threat;
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

  rollItemDrop(mob) {
    let roll = random(1, 200);
    let item;
    if (!this.checkInsideWall(mob.position.x, mob.position.y)) {
      if (roll < 35) {
        item = new Heart(mob.position.x, mob.position.y, pixelHeart);
        this.items.push(item);
      } else if (roll >= 35 && roll < 70) {
        item = new Energy(mob.position.x, mob.position.y, pixelEnergy);
        this.items.push(item);
      }
    }
  }

  applyItemBuff(item, player) {
    if (item instanceof Heart) {
      if (player.health >= player.maxHealth) itemSound1.play();
      else itemSound2.play();
      player.health = Math.min(player.maxHealth, player.health + 20);
    } else if (item instanceof Energy) {
      if (player.fireCooldown <= 0) itemSound1.play();
      else itemSound2.play();
      if (player.fireOverheat) playSound(overheatEndSound, playbackRate);
      player.resetOverheat();
    }
  }

  // Get the player's position in the next room based on position of door in current room
  getPlayerNextPos() {
    if (this.door.x == 1) {
      // Door on left side of room
      playerNextX = 840;
      playerNextY = this.door.position.y;
    }
    // Door on right side of room
    else if (this.door.x == roomWidth + arena_offset / 9.5) {
      playerNextX = 155;
      playerNextY = this.door.position.y;
      // Door at bottom of room
    } else if (this.door.y == roomHeight - 2) {
      playerNextX = this.door.position.x;
      playerNextY = 165;
      // Door at top of room
    } else if (this.door.y == 1) {
      playerNextX = this.door.position.x;
      playerNextY = 635;
    }
  }
}

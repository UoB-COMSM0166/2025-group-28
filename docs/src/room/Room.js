class Room {
  constructor(difficultySettings) {
    this.door = null;
    this.difficultySettings = difficultySettings;
    this.isCleared = false;
    this.mobs = [];
    this.items = [];
    this.roomLayout = []; // 2D array of tiles
    this.particles = [];
    this.mobsRemaining = difficultySettings.totalMobs();
    this.lastSpawnTime = 0;
    this.promptActive = false; // Controls interact prompt for doors
    this.currentTileColours;
    this.roomScoreAccumaltor = 0;
    this.threatCap = behaviourMonitor.getRoomThreatCap();
    this.threatLevel = 0;
    this.threatCapReached = false;

    // Mob spawning vars
    let roomsCleared = behaviourMonitor.getRoomsCleared();
    // Allow spawning BuffMob if player has survived 3+ rooms & playing on normal/hard/coop
    if (
      (game && game.difficulty != difficultyLevels.EASY || coop) &&
      roomsCleared >= 3
    ) {
      this.canSpawnBuffMob = true;
    } else this.canSpawnBuffMob = false;
    this.mobBuffActive = false; // Set true once BuffMob is killed, applies buff to all other mobs

    // Allow spawning BlinkMob in room 4+
    if (roomsCleared >= 3) {
      this.canSpawnBlinkMob = true;
    } else this.canSpawnBlinkMob = false;

    // bonus point vars
    this.damageTakenP1 = 0;
    this.damageDealtP1 = 0;
    this.damageTakenP2 = 0;
    this.damageDealtP2 = 0;

    // Allow the lighting to dim after 10 rooms
    if (
      (game && game.difficulty != difficultyLevels.EASY) &&
      roomsCleared >= 10 &&
      random() < Math.min(0.75, roomsCleared / 100)
    ) {
      this.addLighting = true;
      this.flickerP1Offset = 0;
      this.flickerP2Offset = 1000;
      this.flickerMobOffset = 2000;
      // Decrease transparency of lighting layer as rooms progress
      this.transparency = Math.min(240, 160 + (roomsCleared / 10));
    } else this.addLighting = false;

    this.generator = new RoomGenerator(this);
    this.handler = new RoomHandler(this);

    this.generator.initRoom();
  }

  update() {
    // Check for dead mobs
    this.checkDeadMobs();

    if (this.threatLevel >= this.threatCap) {
      this.threatCapReached = true;
    }

    if (this.mobs.length == 0 && this.threatCapReached) {
      this.isCleared = true;
    }

    this.handler.updateProjectiles();

    // Update mobs
    for (let mob of this.mobs) {
      if (!mob.isActive) continue;
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

    // Handle wall collisions
    this.handler.checkWallCollisions();

    // Update players
    playerA.update();
    if (coop) playerB.update();
  }

  checkDeadMobs() {
    for (let i = this.mobs.length - 1; i >= 0; i--) {
      if (this.mobs[i].isActive) continue;
      this.rollItemDrop(this.mobs[i]);
      this.mobsRemaining -= 1;
      if (this.mobs[i] instanceof BuffMob) {
        if (this.mobs.length > 1) {
          // If other mobs are in room when BuffMob killed
          this.roomScoreAccumaltor += 5; // Give smaller score as player activated buff
          this.mobBuffActive = true; // Activate buff to all other mobs
          if (!muted) buffMobBuffSound.play();
          if (!game.slowMeowHandler.occurring) {
            // Give player a lower value towards their slow meow level for triggering mob buff
            game.slowMeowHandler.level = Math.min(
              slowMeowMax,
              game.slowMeowHandler.level + game.slowMeowHandler.gain / 2
            );
          }
        } else {
          this.roomScoreAccumaltor += 25;
          if (!game.slowMeowHandler.occurring) {
            game.slowMeowHandler.level = Math.min(
              slowMeowMax,
              game.slowMeowHandler.level + game.slowMeowHandler.gain
            );
          }
          let item = new Heart(this.mobs[i].position.x, this.mobs[i].position.y, pixelHeart);
          this.items.push(item);
        }
      } else {
        this.roomScoreAccumaltor += 25;
        if (!game.slowMeowHandler.occurring) {
          game.slowMeowHandler.level = Math.min(
            slowMeowMax,
            game.slowMeowHandler.level + game.slowMeowHandler.gain
          );
        }
      }
      this.mobs.splice(i, 1);
    }
  }

  spawnMobWrapper() {
    let currentTime = millis();
    if (currentTime - this.lastSpawnTime > this.difficultySettings.spawnRate) {
      this.spawnMob();
      this.lastSpawnTime = currentTime;
    }
  }

  drawLighting() {
    lightingLayer.clear();

    // Draw a semi-transparent black rectangle over the playable area
    lightingLayer.fill(0, this.transparency);
    lightingLayer.rect(0, 0, lightingLayer.width, lightingLayer.height);

    // Cut out transparent circles for light sources
    lightingLayer.erase();

    let flickerP1 = noise(this.flickerP1Offset) * 20 - 10;
    lightingLayer.ellipse(playerA.position.x, playerA.position.y, 150 + flickerP1, 150 + flickerP1);
    if (coop) {
      let flickerP2 = noise(this.flickerP2Offset) * 20 - 10;
      lightingLayer.ellipse(playerB.position.x, playerB.position.y, 150 + flickerP2, 150 + flickerP2);
    }
    for (let i = 0; i < this.mobs.length; i++) {
      let mob = this.mobs[i];
      if (mob.isActive) {
        let flickerMob = noise(this.flickerMobOffset + i * 100) * 15 - 5;
        lightingLayer.ellipse(mob.position.x, mob.position.y, 120 + flickerMob, 120 + flickerMob);
      }
    }

    lightingLayer.noErase();

    image(lightingLayer, 0, 0);
    this.flickerP1Offset += random(0.03, 0.06);
    this.flickerP2Offset += random(0.03, 0.06);
    this.flickerMobOffset += random(0.03, 0.06);
    if (this.flickerP1Offset > 10000) this.flickerP1Offset = 0;
    if (this.flickerP2Offset > 10000) this.flickerP2Offset = 1000;
    if (this.flickerMobOffset > 10000) this.flickerMobOffset = 2000;
  }

  draw() {
    this.handler.drawRoomTiles();
    this.door.draw();

    // Draw any particles after room objects so they appear behind the player/mobs
    this.handler.drawParticles();

    playerA.move();
    if (coop) {
      playerB.move();
    }

    playerA.fire();
    playerA.draw();
    if (coop) {
      playerB.fire();
      playerB.draw();
    }

    // Update items
    for (let i = this.items.length - 1; i >= 0; i--) {
      if (!this.items[i].isActive) continue;
      this.items[i].update();
      this.items[i].draw();
      for (let player of [playerA, playerB]) {
        if (player === playerB && !coop) continue;
        if (player.isCollidingWith(this.items[i])) {
          this.applyItemBuff(this.items[i], player);
          this.items.splice(i, 1);
        }
      }
    }

    this.handleProjectileCollisions();

    if (this.addLighting) this.drawLighting();

    PlayerHUD.drawPlayerHealthBar();

    if (coop) {
      PlayerHUD.drawPlayerHealthBar();
    }

    this.handleMobCollisions();

    if (this.isCleared) this.drawDoorPrompt();
  }

  handleProjectileCollisions() {
    for (let projectile of projectileManager.projectilesFired) {
      if (!projectile.isActive) continue;
      projectile.draw();
      for (let mob of this.mobs) {
        if (!mob.isActive) continue;
        if (
          projectile.isCollidingWith(mob) &&
          projectile.owner instanceof Player
        ) {
          projectile.isActive = false;
          if (mob.isInvincible) continue;
          mob.takeDamage(projectile.owner.attackDamage);
          if (projectile.owner === playerA) {
            this.damageDealtP1 += projectile.owner.attackDamage;
          } else this.damageDealtP2 += projectile.owner.attackDamage;
          this.generator.createParticles(
            Blood,
            mob.position.x,
            mob.position.y,
            mob.bloodColour
          );
        }
      }
      if (
        projectile.owner instanceof RangedMob ||
        projectile.owner instanceof BlinkMob
      ) {
        for (let player of [playerA, playerB]) {
          if (player === playerB && !coop) continue;
          let damageTaken;
          if (player === playerA) damageTaken = 'damageTakenP1';
          else damageTaken = 'damageTakenP2';
          if (projectile.isCollidingWith(player)) {
            projectile.isActive = false;
            if (transitioning || player.isInvincible) continue;
            player.takeDamage(projectile.owner.attackDamage);
            this[damageTaken] += projectile.owner.attackDamage;
            this.generator.createParticles(
              Blood,
              player.position.x,
              player.position.y,
              player.bloodColour
            );
            if (!game.slowMeowHandler.occurring && game.slowMeowHandler.level < slowMeowMax) {
              game.slowMeowHandler.level = Math.max(
                0,
                game.slowMeowHandler.level - game.slowMeowHandler.loss
              );
            }
            player.makeInvincible();
          }
        }
      }
    }
  }

  handleMobCollisions() {
    for (let mob of this.mobs) {
      if (!mob.isActive) continue;
      mob.draw();
      GameUI.drawMobHealthBar(mob);
      for (let player of [playerA, playerB]) {
        if (player === playerB && !coop) continue;
        let damageTaken;
        if (player === playerA) damageTaken = 'damageTakenP1';
        else damageTaken = 'damageTakenP2';
        if (player.isCollidingWith(mob) && player.isActive) {
          if ((mob instanceof BlinkMob)) continue;
          player.applyKnockback(mob.position.x, mob.position.y);
          mob.applyKnockback(player.position.x, player.position.y);
          if (player.isInvincible) continue;
          player.takeDamage(mob.attackDamage);
          this[damageTaken] += mob.attackDamage;
          this.generator.createParticles(
            Blood,
            player.position.x,
            player.position.y,
            player.bloodColour
          );
          if (!game.slowMeowHandler.occurring && game.slowMeowHandler.level < slowMeowMax) {
            game.slowMeowHandler.level = Math.max(
              0,
              game.slowMeowHandler.level - game.slowMeowHandler.loss
            );
          }
          player.makeInvincible();
        }
      }
    }
  }

  drawDoorPrompt() {
    // Handles drawing the 'interact' button prompt if the player is in range of the door
    // I apologise for how ugly this is
    if (!this.door) return;
    let xMin, xMax, yMin, yMax, promptX, promptY;
    // Door on left side of room
    if (this.door.x == 1) {
      xMin = this.door.position.x;
      xMax = this.door.position.x + tileSize * 8;
      yMin = this.door.position.y - tileSize * 4;
      yMax = this.door.position.y + tileSize * 6;
      promptX = this.door.position.x + tileSize * 2;
      promptY = this.door.position.y;
    // Door on right side of room
    } else if (this.door.x == roomWidth + arena_offset / 9.5) {
      xMin = this.door.position.x - arena_offset * 2 - tileSize * 8;
      xMax = this.door.position.x;
      yMin = this.door.position.y - tileSize * 4;
      yMax = this.door.position.y + tileSize * 6;
      promptX = this.door.position.x - tileSize * 2 - arena_offset * 2;
      promptY = this.door.position.y;
    // Door at bottom of room
    } else if (this.door.y == roomHeight - 2) {
      xMin = this.door.position.x - tileSize * 4;
      xMax = this.door.position.x + tileSize * 8;
      yMin = this.door.position.y - tileSize * 8;
      yMax = this.door.position.y;
      promptX = this.door.position.x + tileSize + tileSize / 2;
      promptY = this.door.position.y - tileSize * 2;
    // Door at top of room
    } else if (this.door.y == 1) {
      xMin = this.door.position.x - tileSize * 4;
      xMax = this.door.position.x + tileSize * 8;
      yMin = this.door.position.y;
      yMax = this.door.position.y + tileSize * 8;
      promptX = this.door.position.x + tileSize + tileSize / 2;
      promptY = this.door.position.y + tileSize * 2;
    }
    if (this.playerInRangeOfDoor(playerA, xMin, xMax, yMin, yMax) ||
        (coop && this.playerInRangeOfDoor(playerB, xMin, xMax, yMin, yMax))) {
      image(buttonPrompt, promptX, promptY);
      this.promptActive = true;
    } else {
      this.promptActive = false;
    }
  }

  playerInRangeOfDoor(player, xMin, xMax, yMin, yMax) {
    return (
      player.position.x < xMax &&
      player.position.x > xMin &&
      player.position.y < yMax &&
      player.position.y > yMin
    );
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
        random(tileSize * 3.5, roomWidth * tileSize - tileSize * 3.5) +
        arena_offset;
      spawnY =
        random(tileSize * 3.5, roomHeight * tileSize - tileSize * 3.5) +
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
    let mobTypes = [
      { type: MeleeMob, gif: dogmob_gif, threat: 3, counters: ["defensive"], spawnChance: 1.1 },
      { type: DashMob, gif: dashmob_gif, threat: 5, counters: ["defensive"], spawnChance: 0 },
      { type: RangedMob, gif: rangedmob_gif, threat: 5, counters: ["aggressive"], spawnChance: 1 },
      { type: BlinkMob, gif: blinkMobGif, threat: 12, counters: ["defensive"], spawnChance: 0.6 },
      { type: BuffMob, gif: heartMob_gif, threat: 0, counters: ["aggressive"], spawnChance: 0.3 }
    ];

    // Gradually adjust spawn chances based on rooms cleared
    const roomsCleared = behaviourMonitor.getRoomsCleared();

    // Decrease MeleeMob chance and increase DashMob chance as rooms increase
    if (roomsCleared > this.difficultySettings.dashMobRequirement) {
      // Find the MeleeMob and DashMob in the array
      const meleeMobIndex = mobTypes.findIndex(mob => mob.type === MeleeMob);
      const dashMobIndex = mobTypes.findIndex(mob => mob.type === DashMob);

      if (meleeMobIndex !== -1 && dashMobIndex !== -1) {
        // decrease MeleeMob spawn chance by 0.05 per room
        mobTypes[meleeMobIndex].spawnChance = Math.max(0.5, 1.2 - (roomsCleared * 0.05));

        // increase DashMob spawn chance by 0.1 per room
        mobTypes[dashMobIndex].spawnChance = Math.min(0.7, 0.0 + (roomsCleared * 0.1));
      }
    }

    let playerBehaviour = behaviourMonitor.getBehaviourProfile();
    let behaviourKeys = Object.keys(playerBehaviour).filter(
      (key) => playerBehaviour[key]
    );
    /* Filter out mob types if they can't be spawned, also filter out any mobs whose threat level would exceed
       the threat cap too much */
    let filteredMobTypes = mobTypes.filter((m) => {
      return (
        ((this.canSpawnBuffMob && this.threatLevel > 0) || m.type !== BuffMob) &&
        (this.canSpawnBlinkMob || m.type !== BlinkMob) &&
        m.threat + this.threatLevel <= this.threatCap
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
      if (chosenMob.type === BuffMob) this.canSpawnBuffMob = false;
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

  rollItemDrop(mob) {
    if (!mob || mob instanceof BuffMob) return;
    let roll = random(0, 200);
    let item;
    if (!this.handler.checkInsideWall(mob.position.x, mob.position.y)) {
      if (roll < 29) {
        item = new Heart(mob.position.x, mob.position.y, pixelHeart);
        this.items.push(item);
      } else if (roll > 29 && roll < 64) {
        item = new Energy(mob.position.x, mob.position.y, pixelEnergy);
        this.items.push(item);
      }
    }
  }

  applyItemBuff(item, player) {
    if (!item || !item.isActive || !player || !player.isActive) return;
    if (item instanceof Heart) {
      if (!muted) {
        if (player.health >= player.maxHealth) itemSound1.play();
        else itemSound2.play();
      }
      player.health = Math.min(player.maxHealth, player.health + this.difficultySettings.heartHealth);
    } else if (item instanceof Energy) {
      if (!muted) {
        if (player.fireCooldown <= 0) itemSound1.play();
        else itemSound2.play();
      }
      if (player.fireOverheat) playSound(overheatEndSound, playbackRate);
      player.resetOverheat();
    }
    item.isActive = false;
  }

  // Get the player's position in the next room based on position of door in current room
  getPlayerNextPos() {
    if (!this.door) return;
    // Door on left side of room
    if (this.door.x == 1) {
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
class Game {

  constructor(room, player_1, player_2, coop, difficultyLevel = difficultyLevels.NORMAL) {
    //this.lvl_num = lvlNum;
    this.currentRoom = room;
    this.gameState = GameStates.ACTIVE;
    this.sprites = [];
    this.spritesP1 = [];
    this.player1 = player_1;
    this.difficulty = difficultyLevel;
    this.difficultySettings = difficultySettings[this.difficulty];
    this.lastSpawnTime = 0;
    this.sprites.concat(room.mobs).concat(room.items);
    this.spritesP1.concat(room.mobs).concat(room.items);
    this.mobs = [];
    this.currentRoom.mobs = this.mobs;
    this.player1.collidables.concat(room.mobs).concat(room.items);
    this.addWallCollisions(this.player1);
    if (coop) {
      this.player2 = player_2;
      this.spritesP2 = [];
      this.spritesP2.concat(room.mobs).concat(room.items);
      this.spritesP2.push(this.player1);
      this.spritesP1.push(this.player2);
      this.player2.collidables.concat(room.mobs).concat(room.items);
      this.player1.collidables.push(this.player2);
      this.player2.collidables.push(this.player1);
      this.addWallCollisions(this.player2);
    }
    this.halt = false;
  }

  // FOR NOW - when a sprite is created it is registered to the game, so it is included in draw/update call

  // Game object is 'single source of truth' for drawing the gameplay - sprite update/draw methods should only be called by the game object

  addWallCollisions(object) {
    for (let j = 0; j < roomHeight; j++) {
      for (let i = 0; i < roomWidth; i++) {
        if (this.currentRoom.roomLayout[j][i].type == tileTypes.WALL) {
          object.collidables.push(this.currentRoom.roomLayout[j][i]);
        }
      }
    }
  }

  spawnMob() {
    if (this.mobs.length >= this.difficultySettings.maxMobs) {
      return;
    }
    let spawnX, spawnY;
    let validSpawn = false;
    let spawnAttempts = 0;
    while (!validSpawn && spawnAttempts < 100) {
      spawnX = random(tileSize * 3, ((roomWidth * tileSize) - (tileSize * 3)));
      spawnY = random(tileSize * 3, ((roomHeight * tileSize) - (tileSize * 3)));

      // Checking if the spawn is inside a wall
      let insideWall = this.checkInsideWall(spawnX, spawnY);
      if (insideWall) {
          break;
      }

      let distanceFromP1 = dist(spawnX, spawnY, this.player1.position.x, this.player1.position.y);
      let distanceFromP2 = Infinity;
      if (coop){
        let distanceFromP2 = dist(spawnX, spawnY, this.player2.position.x, this.player2.position.y);
      }
      if (!insideWall && distanceFromP1 > 150 && distanceFromP2 > 150) {
        validSpawn = true;
        break;
      }
      spawnAttempts++;
    }

    if (validSpawn) {
      let newMob = new Mob(dogMob, spawnX, spawnY);
      newMob.health = this.difficultySettings.mobHealth;
      newMob.maxHealth = this.difficultySettings.mobHealth;
      newMob.speed = this.difficultySettings.mobSpeed;
      newMob.attackDamage = this.difficultySettings.mobDamage;
      this.addWallCollisions(newMob);
      this.sprites.push(newMob);
      this.mobs.push(newMob);
      this.player1.collidables.push(newMob);
      if (coop) {
        this.player2.collidables.push(newMob);
      }
      this.currentRoom.mobs = this.mobs;
    }
  }

  checkInsideWall(x, y) {
    for (let j = 0; j < roomHeight; j++) {
      for (let i = 0; i < roomWidth; i++) {
        if (this.currentRoom.roomLayout[j][i].type === tileTypes.WALL) {
          let wallX = this.currentRoom.roomLayout[j][i].position.x;
          let wallY = this.currentRoom.roomLayout[j][i].position.y;
          let wallWidth = this.currentRoom.roomLayout[j][i].widthHitbox;
          let wallHeight = this.currentRoom.roomLayout[j][i].heightHitbox;

          if (x > wallX && x < wallX + wallWidth && y > wallY && y < wallY + wallHeight) {
            return true;
          }
        }
      }
    }
    return false;
  }

  processInput() {
    //console.log();

    if (keyIsDown(LEFT_ARROW)) {
      // this.player2.move(MoveDirections.LEFT);
    }
  }

  playerChange(player) {
    //this.player1 = player;
  }

  update() {
    for (let p of this.player1.projectilesFired) {
      p.update();
    }
    if (coop) {
      for (let p of this.player2.projectilesFired) {
        p.update();
      }
    }

    for (let s of this.sprites) {
      s.update();
    }
    if (coop) {
      this.player2.update();
    }
    this.player1.update();
    let currentTime = millis();
    if (this.gameState === GameStates.ACTIVE && currentTime - this.lastSpawnTime > this.difficultySettings.spawnRate) {
      this.spawnMob();
      this.lastSpawnTime = currentTime;
    }
    for (let i = 0; i < this.mobs.length - 1; i++) {
      if (!this.mobs[i].isActive) {
        // Remove dead mob from player collidables
        let index = this.player1.collidables.indexOf(this.mobs[i]);
        if (index != -1) {
          this.player1.collidables.splice(index, 1);
        }
        if (coop) {
          index = this.player2.collidables.indexOf(this.mobs[i]);
          if (index != -1) {
            this.player2.collidables.splice(index, 1);
          }
        }
        // Remove dead mob from sprites array
        index = this.sprites.indexOf(this.mobs[i]);
        if (index > -1) {
          this.sprites.splice(index, 1);
        }
        // Remove dead mob from mobs array
        this.mobs.splice(i, 1);
      }
    }
    this.currentRoom.mobs = this.mobs;
  }

  draw() {
    // Mobs draw
    this.currentRoom.draw();
    for (let s of this.sprites) {
      s.draw();
    }
    for (let p of this.player1.projectilesFired) {
      p.draw();
    }

    if (coop) {
      for (let p of this.player2.projectilesFired) {
        p.draw();
      }
    }

    this.player1.move();

    if (coop) {
      this.player2.move();
    }

    this.player1.fire();

    if (coop) {
      this.player2.fire();
    }

    this.player1.draw();

    if (coop) {
      this.player2.draw();
    }

    // projectile collision checking - i think this ultimately needs be a loop within a loop check for a mob array
    for (let i = this.player1.projectilesFired.length - 1; i >= 0; i--) {
      let projectileHit = false;
      for (let mob of this.mobs) {
        if (this.player1.projectilesFired[i].isCollidingWith(mob)) {
          mob.takeDamage(this.player1.attackDamage);
          projectileHit = true;
          break;
        }
      }
      if (projectileHit) {
        this.player1.projectilesFired.splice(i, 1);
      }
    }
    if (coop) {
      for (let i = this.player2.projectilesFired.length - 1; i >= 0; i--) {
        let projectileHit = false;
        for (let mob of this.mobs) {
          if (this.player2.projectilesFired[i].isCollidingWith(mob)) {
            mob.takeDamage(this.player2.attackDamage);
            projectileHit = true;
            break;
          }
        }
        if (projectileHit) {
          this.player2.projectilesFired.splice(i, 1);
        }
      }
    }
    for (let mob of this.mobs) {
      if (this.player1.isCollidingWith(mob)) {
        this.player1.takeDamage(mob.attackDamage); // Can be balanced here or in constants.js
        this.player1.applyKnockback(mob.position.x, mob.position.y);
        mob.applyKnockback(this.player1.position.x, this.player1.position.y);
        this.player1.makeInvincible();
      }

      if (coop && this.player2.isCollidingWith(mob)) {
        this.player2.takeDamage(mob.attackDamage); // Can be balanced here or in constants.js
        this.player2.applyKnockback(mob.position.x, mob.position.y);
        mob.applyKnockback(this.player2.position.x, this.player2.position.y);
        this.player2.makeInvincible();
      }
    }
  }
}

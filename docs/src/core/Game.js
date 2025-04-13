class Game {
  constructor(difficultyLevel = difficultyLevels.NORMAL) {
    this.gameState = GameStates.ACTIVE;
    this.difficulty = difficultyLevel;
    this.difficultySettings = difficultySettings[this.difficulty];
    if (!pvpMode) {
      this.currentRoom = new Room(this.difficultySettings);
    } else {
      this.currentRoom = new PvPRoom();
    }

    // score variables
    this.prevScoreP1 = 0;
    this.currScoreP1 = 0;
    this.prevScoreP2 = 0;
    this.currScoreP2 = 0;

    this.roomSeq = 1;

    this.slowMeowOccuring = false;
    this.slowMeowStartTime = 0;
    this.slowMeowDuration = 5000;
    this.slowMeowMovementSpeed = 0.3;
    this.slowMeowCooldown = 15000;
    this.slowMeowLastUsed = 0;
    this.slowMeowUsable = true;
  }

  nextRoom() {
    this.roomSeq++;
    behaviourMonitor.updateRoomsCleared();
    // Clear projectile array to stop projectiles fired in previous room from persisting in next room
    projectileManager.projectilesFired = [];

    // update scores
    this.currScoreP1 += this.calculateScore(
      this.currentRoom.damageDealtP1,
      this.currentRoom.damageTakenP1
    );
    this.prevScoreP1 = this.currScoreP1;
    this.currScoreP1 = 0;

    if (coop) {
      this.currScoreP2 += this.calculateScore(
        this.currentRoom.damageDealtP2,
        this.currentRoom.damageTakenP2
      );
      this.prevScoreP2 = this.currScoreP2;
      this.currScoreP2 = 0;
    }

    this.currentRoom = null;
    if (pvpMode) {
      this.currentRoom = new PvPRoom();
      playerA = new Player(astrocat_gif, 200, 300, playerNumber.PLAYER_1);
      playerB = new Player(astrocat_gif_p2, 800, 300, playerNumber.PLAYER_2);
    } else {
      this.currentRoom = new Room(this.difficultySettings);
      // Allow spawning buff mob if player has cleared 3+ rooms (only on normal, hard or coop)
      if (
        (this.difficulty != difficultyLevels.EASY || coop) &&
        behaviourMonitor.getRoomsCleared() >= 3
      ) {
        this.currentRoom.canSpawnBuffMob = true;
      }
      if (coop) {
        if (playerA.isActive ^ playerB.isActive) {
          if (!playerA.isActive) {
            playerA = null;
            playerA = new Player(astrocat_gif, 200, 300, playerNumber.PLAYER_1);
            playerA.health = 50;
            playerADeathCount++;
            this.prevScoreP1 -= 300;
            if (this.prevScoreP1 < 0) this.prevScoreP1 = 0;
          } else {
            playerB = null;
            playerB = new Player(
              astrocat_gif_p2,
              300,
              300,
              playerNumber.PLAYER_2
            );
            playerB.health = 50;
            playerBDeathCount++;
            this.prevScoreP2 -= 300;
            if (this.prevScoreP2 < 0) this.prevScoreP2 = 0;
          }
        }
      }
      // Set player positions in room relative to door in previous room
      playerA.resetOverheat();
      playerA.position.x = playerNextX;
      playerA.position.y = playerNextY;
      if (coop) {
        playerB.resetOverheat();
        playerB.position.x = playerNextX;
        playerB.position.y = playerNextY;
      }
    }
  }

  checkIfGameOver() {
    if (
      (!playerA.isActive && !coop) ||
      (coop && !playerA.isActive && !playerB.isActive)
    ) {
      this.gameState = GameStates.OVER;
    }
  }
  draw() {
    this.checkIfGameOver();
    this.currScoreP1 = Math.round(
      this.currentRoom.roomScoreAccumaltor + this.prevScoreP1
    );
    if (coop) {
      this.currScoreP2 = Math.round(
        this.currentRoom.roomScoreAccumaltor + this.prevScoreP2
      );
    }
    this.updateSlowMeow();
    this.currentRoom.draw();
    this.currentRoom.update();
    projectileManager.update();
    if (!pvpMode) this.currentRoom.spawnMobWrapper();
    if (this.slowMeowOccuring) {
      this.drawSlowMeow();
    }
  }

  calculateScore(damageDealt, damageTaken) {
    if (!coop) {
      let bonus = (damageDealt / (damageTaken + 10)) * 10 - 120;
      if (bonus < 0) return 0;
      if (bonus > 300) return 300;
      return bonus;
    } else {
      let bonus = (damageDealt / (damageTaken + 10)) * 10 - 80;
      if (bonus < 0) return 0;
      if (bonus > 300) return 300;
      return bonus;
    }
  }

  drawSlowMeow() {
    const elapsedTime = millis() - this.slowMeowStartTime;
    const remainingTime = this.slowMeowDuration - elapsedTime;

    // Colour the screen blue while SlowMeow is occurring
    push();
    noStroke();

    const gameAreaX = 100;
    const gameAreaY = 100;
    const gameAreaWidth = 800;
    const gameAreaHeight = 590;

    fill(0, 100, 255, 50);
    rect(gameAreaX, gameAreaY, gameAreaWidth, gameAreaHeight);

    textAlign(CENTER);
    textFont(gameFont);
    textSize(24);
    fill(255);

    const textY = gameAreaY + 120;

    if (remainingTime > this.slowMeowDuration * 0.7) {
      text("SLOW MEOW STARTING", width / 2, textY);
    } else if (remainingTime < this.slowMeowDuration * 0.3) {
      text("SLOW MEOW ENDING", width / 2, textY);
    }
    pop();
  }

  activateSlowMeow() {
    const currentTime = millis();
    if (this.slowMeowUsable && !this.slowMeowOccuring) {
      this.slowMeowOccuring = true;
      this.slowMeowStartTime = currentTime;
      this.slowMeowUsable = false;
      this.slowMeowLastUsed = currentTime;
      slowMeowStartSound.play();
      this.applySlowMeow(true);
    }
  }

  updateSlowMeow() {
    const currentTime = millis();
    if (
      this.slowMeowOccuring &&
      currentTime - this.slowMeowStartTime > this.slowMeowDuration
    ) {
      this.slowMeowOccuring = false;
      this.applySlowMeow(false);
    }

    if (
      !this.slowMeowUsable &&
      currentTime - this.slowMeowLastUsed > this.slowMeowCooldown
    ) {
      this.slowMeowUsable = true;
    }
  }

  applySlowMeow(slowActive) {
    let slowFactor;
    let playerSlowFactor;
    if (slowActive) {
      slowFactor = this.slowMeowMovementSpeed;
      playerSlowFactor = slowFactor * 1.2;
      playbackRate = 0.75; // Slows SFX
    } else {
      slowFactor = 1.0;
      playerSlowFactor = 1.0;
      playbackRate = 1;
      slowMeowEndSound.play();
    }

    // Slow down players
    if (playerA && playerA.isActive) {
      if (slowActive) {
        playerA.speed = playerA.originalSpeed * playerSlowFactor;
        playerA.fireRate = playerA.originalFireRate / playerSlowFactor;
        playerA.heatDecay = 0;
      } else {
        playerA.speed = playerA.originalSpeed;
        playerA.heatDecay = this.difficultySettings.heatDecay;
        if (playerA.originalFireRate) {
          playerA.fireRate = playerA.originalFireRate;
        }
      }
    }

    if (playerB && playerB.isActive) {
      if (slowActive) {
        playerB.speed = playerB.originalSpeed * playerSlowFactor;
        playerB.fireRate = playerB.originalFireRate / playerSlowFactor;
        playerB.heatDecay = 0;
      } else {
        playerB.speed = playerB.originalSpeed;
        playerB.heatDecay = this.difficultySettings.heatDecay;
        if (playerB.originalFireRate) {
          playerB.fireRate = playerB.originalFireRate;
        }
      }
    }

    // Slow down mobs
    if (this.currentRoom && this.currentRoom.mobs) {
      for (let mob of this.currentRoom.mobs) {
        if (mob && mob.isActive) {
          if (slowActive) {
            mob.checkIfSlowMeowActive();
          } else {
            mob.speed = mob.originalSpeed;
            mob.isSlowed = false;
          }
        }
      }
    }

    // Slow down projectiles
    if (projectileManager && projectileManager.projectilesFired) {
      for (let projectile of projectileManager.projectilesFired) {
        if (projectile && projectile.isActive) {
          if (!projectile.originalVelocity) {
            projectile.originalVelocity = projectile.velocity.copy();
          }
          if (slowActive) {
            projectile.velocity = p5.Vector.mult(
              projectile.originalVelocity,
              slowFactor
            );
          } else {
            projectile.velocity = projectile.originalVelocity.copy();
          }
        }
      }
    }
  }
}

function applySlowMeowToNewMob(mob) {
  if (game && game.slowMeowOccuring && mob) {
    mob.originalSpeed = mob.speed;
    mob.speed = mob.originalSpeed * game.slowMeowMovementSpeed;
  }
}

class Game {
  constructor(difficultyLevel = difficultyLevels.NORMAL) {
    this.gameState = GameStates.ACTIVE;
    if (!pvpMode) {
      this.difficulty = difficultyLevel;
      this.difficultySettings = difficultySettings[this.difficulty];
      this.currentRoom = new Room(this.difficultySettings);
    } else {
      this.difficulty = difficultyLevels.NORMAL;
      this.difficultySettings = difficultySettings[this.difficulty];
      this.currentRoom = new PvPRoom();
    }

    // score variables
    this.prevScoreP1 = 0;
    this.currScoreP1 = 0;
    this.prevScoreP2 = 0;
    this.currScoreP2 = 0;

    this.roomSeq = 1;

    this.slowMeowLevel = 0;
    this.slowMeowOccurring = false;
    this.slowMeowStartTime = 0;
    this.slowMeowDuration = 5000;
    this.slowMeowMovementSpeed = 0.3;
    this.slowMeowCooldown = 15000;
    this.slowMeowLastUsed = 0;
    this.slowMeowUsable = false;
    this.slowMeowSoundPlayed = false;
    this.slowMeowBuffPenalty = false;
    if (!coop) {
      this.slowMeowGain = slowMeowGain * this.difficultySettings.slowMeowGainMult;
      this.slowMeowLoss = slowMeowLoss * this.difficultySettings.slowMeowLossMult;
    } else if (coop) {
      this.slowMeowGain = (slowMeowGain / 2) * this.difficultySettings.slowMeowGainMult;
      this.slowMeowLoss = (slowMeowLoss / 2) * this.difficultySettings.slowMeowLossMult;
    }
  }

  nextRoom() {
    this.roomSeq++;
    behaviourMonitor.updateRoomsCleared();
    // Clear projectile array to stop projectiles fired in previous room from persisting in next room
    projectileManager.projectilesFired = [];
    // End slow meow to prevent movement speed bugs on room transition
    if (this.slowMeowOccurring) this.slowMeowLevel = 0;
    let playSounds = this.slowMeowOccurring; // Slow mo end sound should only play if slow meow was active when moving rooms
    this.slowMeowOccurring = false;
    this.applySlowMeow(this.slowMeowOccurring, playSounds);

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
    if (!pvpMode) {
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
            playerB = new Player(astrocat_gif_p2, 300, 300, playerNumber.PLAYER_2);
            playerB.health = 50;
            playerBDeathCount++;
            this.prevScoreP2 -= 300;
            if (this.prevScoreP2 < 0) this.prevScoreP2 = 0;
          }
        }
      }
      playerA.resetOverheat();
      // Set player positions in room relative to door in previous room
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
      (!playerA.isActive && !coop && !pvpMode) ||
      (coop && !playerA.isActive && !playerB.isActive) ||
      (pvpMode && (this.currScoreP1 >= 3 || this.currScoreP2 >= 3))
    ) {
      setTimeout(() => {
        this.gameState = GameStates.OVER;
      }, 3000);
    }
  }

  draw() {
    this.checkIfGameOver();
    if (!pvpMode) {
      this.currScoreP1 = Math.round(
        this.currentRoom.roomScoreAccumaltor + this.prevScoreP1
      );
      if (coop) {
        this.currScoreP2 = Math.round(
          this.currentRoom.roomScoreAccumaltor + this.prevScoreP2
        );
      }
    } else {
      this.currScoreP1 = this.currentRoom.p1Score;
      this.currScoreP2 = this.currentRoom.p2Score;
    }
    this.updateSlowMeow();
    this.currentRoom.draw();
    this.currentRoom.update();
    projectileManager.update();
    if (!pvpMode) this.currentRoom.spawnMobWrapper();
    if (this.slowMeowOccurring) {
      this.drawSlowMeow();
    }
  }

  calculateScore(damageDealt, damageTaken) {
    if (!coop && !pvpMode) {
      let bonus = (damageDealt / (damageTaken + 10)) * 10 - 120;
      if (bonus < 0) return 0;
      if (bonus > 300) return 300;
      return bonus;
    } else if (coop) {
      let bonus = (damageDealt / (damageTaken + 10)) * 10 - 80;
      if (bonus < 0) return 0;
      if (bonus > 300) return 300;
      return bonus;
    }
  }

  drawSlowMeow() {
    const elapsedTime = millis() - this.slowMeowStartTime;
    const remainingTime = this.slowMeowDuration - elapsedTime;

    // Gradually decreases slow meow level over time while slow meow is occurring
    // Looks nicer than seeing it immediately set to 0
    if (remainingTime > 0) {
      const decrementPerMillisecond = 100 / this.slowMeowDuration;
      this.slowMeowLevel = Math.max(100 - decrementPerMillisecond * elapsedTime, 0);
    } else {
      this.slowMeowLevel = 0;
    }

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
    if (this.slowMeowUsable && !this.slowMeowOccurring) {
      this.slowMeowOccurring = true;
      this.slowMeowStartTime = currentTime;
      this.slowMeowUsable = false;
      this.slowMeowLastUsed = currentTime;
      slowMeowStartSound.play();
      this.applySlowMeow(this.slowMeowOccurring, true);
    }
  }

  updateSlowMeow() {
    const currentTime = millis();

    if (this.slowMeowLevel >= slowMeowMax) {
      this.slowMeowUsable = true;
      if (!this.slowMeowSoundPlayed) {
        slowMeowReadySound.play();
        this.slowMeowSoundPlayed = true;
      }
    }

    if (this.slowMeowLevel != slowMeowMax) {
      this.slowMeowUsable = false;
      this.slowMeowSoundPlayed = false;
    }

    if (this.currentRoom.mobBuffActive) {
      if (!this.slowMeowBuffPenalty) {
        this.slowMeowGain /= 2
        this.slowMeowBuffPenalty = true;
      }
    } else {
      this.slowMeowBuffPenalty = false;
      if (!coop) {
        this.slowMeowGain = slowMeowGain * this.difficultySettings.slowMeowGainMult;
      } else if (coop) {
        this.slowMeowGain = (slowMeowGain / 2) * this.difficultySettings.slowMeowGainMult;
      }
    }

    if (!coop && playerA.fireOverheat) {
      this.slowMeowUsable = false;
    } else if (coop && playerA.fireOverheat && playerB.fireOverheat) {
      this.slowMeowUsable = false;
    }

    if (
      this.slowMeowOccurring &&
      currentTime - this.slowMeowStartTime > this.slowMeowDuration
    ) {
      this.slowMeowOccurring = false;
      this.applySlowMeow(this.slowMeowOccurring, true);
    }
  }

  applySlowMeow(slowActive, playSounds) {
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
      if (playSounds) slowMeowEndSound.play();
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
          if (slowActive) {
            projectile.velocity = p5.Vector.mult(projectile.originalVelocity, slowFactor);
          } else {
            if (projectile.velocity.mag() < projectile.originalVelocity.mag()) {
              projectile.velocity = projectile.originalVelocity.copy();
            }
          }
        }
      }
    }
  }
}

function applySlowMeowToNewMob(mob) {
  if (this.slowMeowOccurring && mob) {
    mob.originalSpeed = mob.speed;
    mob.speed = mob.originalSpeed * this.slowMeowMovementSpeed;
  }
}

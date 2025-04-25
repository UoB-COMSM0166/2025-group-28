class SlowMeowHandler {
  constructor(game) {
    this.game = game;
    this.difficultySettings = this.game.difficultySettings;
    this.level = slowMeowMax;
    this.occurring = false;
    this.startTime = 0;
    this.duration = 3500;
    this.movementSpeed = 0.25;
    this.lastUsed = 0;
    this.usable = true;
    this.soundPlayed = true;
    this.buffPenalty = false;
    if (!coop) {
      this.gain =
        slowMeowGain * this.difficultySettings.slowMeowGainMult;
      this.loss =
        slowMeowLoss * this.difficultySettings.slowMeowLossMult;
    } else if (coop) {
      this.gain =
        (slowMeowGain / 2) * this.difficultySettings.slowMeowGainMult;
      this.loss =
        (slowMeowLoss / 2) * this.difficultySettings.slowMeowLossMult;
    }
  }

  reset() {
    if (this.occurring) this.level = 0;
    // Slow mo end sound should only play if slow meow was active when moving rooms
    let playSounds;
    if (playerA.isActive && (!coop || playerB.isActive)) {
      playSounds = this.occurring;
    } else playSounds = false;
    this.occurring = false;
    this.apply(this.occurring, playSounds);
  }

  activate() {
    const currentTime = millis();
    if (this.usable && !this.occurring) {
      this.occurring = true;
      this.startTime = currentTime;
      this.usable = false;
      this.lastUsed = currentTime;
      if (!muted) slowMeowStartSound.play();
      this.apply(this.occurring, true);
    }
  }

  update() {
    const currentTime = millis();

    if (this.level >= slowMeowMax) {
      this.usable = true;
      if (!this.soundPlayed && !muted) {
        slowMeowReadySound.play();
        this.soundPlayed = true;
      }
    } else {
      this.usable = false;
      this.soundPlayed = false;
    }

    if (this.game.currentRoom.mobBuffActive) {
      if (!this.buffPenalty) {
        this.gain /= 2;
        this.buffPenalty = true;
      }
    } else {
      this.buffPenalty = false;
      if (!coop) {
        this.gain =
          slowMeowGain * this.difficultySettings.slowMeowGainMult;
      } else if (coop) {
        this.gain =
          (slowMeowGain / 2) * this.difficultySettings.slowMeowGainMult;
      }
    }

    if (playerA.fireOverheat && (!coop || playerB.fireOverheat)) {
      this.usable = false;
  }

    if (this.occurring && currentTime - this.startTime > this.duration) {
      this.occurring = false;
      this.apply(this.occurring, true);
    }
  }

  apply(slowActive, playSounds) {
    let slowFactor;
    let playerSlowFactor;
    if (slowActive) {
      slowFactor = this.movementSpeed;
      playerSlowFactor = 1.2;
      playbackRate = 0.75; // Slows SFX
    } else {
      slowFactor = 1.0;
      playerSlowFactor = 1.0;
      playbackRate = 1;
      if (!muted && playSounds) slowMeowEndSound.play();
    }

    // Slow down players
    if (playerA && playerA.isActive) {
      this.slowPlayer(slowActive, playerA, playerSlowFactor);
    }

    if (playerB && playerB.isActive) {
      this.slowPlayer(slowActive, playerB, playerSlowFactor);
    }

    // Slow down mobs
    this.slowMobs(slowActive);

    // Slow down projectiles
    this.slowProjectiles(slowActive, slowFactor);
  }

  slowPlayer(slowActive, player, slowFactor) {
    if (slowActive) {
      player.speed = player.originalSpeed * slowFactor;
      player.fireRate = player.originalFireRate / slowFactor;
      player.heatDecay = 0;
    } else {
      player.speed = player.originalSpeed;
      player.heatDecay = this.difficultySettings.heatDecay;
      if (player.originalFireRate) {
        player.fireRate = player.originalFireRate;
      }
    }
  }

  slowMobs(slowActive) {
    if (this.game.currentRoom && this.game.currentRoom.mobs) {
      for (let mob of this.game.currentRoom.mobs) {
        if (mob && mob.isActive) {
          if (slowActive) {
            mob.checkIfSlowMeowActive();
          } else {
            mob.speed = mob.originalSpeed;
            mob.isSlowed = false;
            if (mob instanceof DashMob) {
             mob.dashSpeed = mob.originalDashSpeed;
            }
          }
        }
      }
    }
  }

  slowProjectiles(slowActive, slowFactor) {
    if (projectileManager && projectileManager.projectilesFired) {
      for (let projectile of projectileManager.projectilesFired) {
        if (projectile && projectile.isActive) {
          if (slowActive) {
            projectile.velocity = p5.Vector.mult(
              projectile.originalVelocity,
              slowFactor
            );
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
class Player extends Sprite {
  constructor(img, x, y, player_x) {
    super(img, x, y, 100);
    this.widthHitbox = 40;
    this.heightHitbox = 65;

    this.player = player_x;
    this.controls = []; // Player control scheme

    this.widthModel = 70;
    this.heightModel = 70;
    this.speed = 2.75;
    this.originalSpeed = this.speed;
    this.attackDamage = 10 * difficultySettings[difficulty].playerDamageMult;
    this.fireRate = 200; // 200ms between shots
    this.originalFireRate = this.fireRate;
    this.lastShot = 0; // Timestamp of last shot
    this.projectileSpeed = 10;
    this.direction = createVector(0, 1); // Character starts facing down
    this.lastDirection = "DOWN";
    this.fireCooldown = 0; // Cooldown between shots
    this.fireOverheat = false;
    this.overheatSoundPlayed = false;
    this.canPlayOverheatFireSound = false;
    this.lastOverheatSoundTime = 0;
    this.heatGain = difficultySettings[difficulty].heatGain;
    this.heatDecay = difficultySettings[difficulty].heatDecay;
    this.img.setFrame(7);
    this.startFrame = 7;
    this.endFrame = 9;
    this.slowTimer = 0;

    this.bloodColour = color(210, 0, 0, 0);
    this.projectileColour = color(255, 215, 80, 255);

    this.deathSound = playerDeathSound;
    this.painSound = [playerPainSound1, playerPainSound2];

    this.smokeParticles = [];
    this.smokeFrameCounter = 0; // Push smoke particles to array every x frames

    this.warpParticles = [];

    // For behaviour monitoring
    this.timesHurt = 0;
    this.timesHeatLevelHigh = 0;
    this.timesOverheated = 0;
  }

  update() {
    super.update();
    if (game.slowMeowHandler && game.slowMeowHandler.occurring && this.isActive && (this.velocity.x != 0.0 || this.velocity.y != 0.0)) {
      // slow meow particle burst
      let offsetX = random(-15, 15);
      let offsetY = random(-30, 30);
      this.warpParticles.push(new Warp(this.position.x + offsetX, this.position.y + offsetY));
    }
    for (let i = this.warpParticles.length - 1; i >= 0; i--) {
      this.warpParticles[i].update();
      if (this.warpParticles[i].isFinished()) {
        this.warpParticles.splice(i, 1);
      }
    }

    if (this.fireOverheat && this.isActive) {
      this.smokeFrameCounter++;
      if (this.smokeFrameCounter % 3 == 0) {
        // Create smoke particles from different locations based on direction player is facing
        if (this.lastDirection == "UP") {
          this.smokeParticles.push(new Smoke(this.position.x - 4, this.position.y - 1));
        } else if (this.lastDirection == "DOWN") {
          this.smokeParticles.push(new Smoke(this.position.x, this.position.y - 25));
        } else {
          let xOffset = 14 * this.direction.x;
          this.smokeParticles.push(new Smoke(this.position.x - xOffset, this.position.y + 1))
        }
      }
    }

    for (let i = this.smokeParticles.length - 1; i >= 0; i--) {
      this.smokeParticles[i].update();
      if (this.smokeParticles[i].isFinished()) {
        this.smokeParticles.splice(i, 1);
      }
    }

    // Reset frame counter to prevent overflow
    if (this.smokeFrameCounter > 1000) {
      this.smokeFrameCounter = 0;
    }
  }

  draw() {
    // Draw smoke in front/behind player based on their direction of movement
    if (this.lastDirection == "UP") {
      super.draw();
      for (let particle of this.smokeParticles) {
        particle.draw();
      }
      for (let warp of this.warpParticles) {
        warp.draw();
      }
    } else {
      for (let warp of this.warpParticles) {
        warp.draw();
      }
      for (let particle of this.smokeParticles) {
        particle.draw();
      }
      super.draw();
    }
  }

  overheatSlow() {
    if (this.fireOverheat) {
      if (this.slowTimer == 0) this.speed = 0.8;
      else if (this.slowTimer == 50) this.speed = 1.1;
      else if (this.slowTimer == 100) this.speed = 1.4;
      else if (this.slowTimer == 150) this.speed = 1.8;
      else if (this.slowTimer == 200) this.speed = 2.4;
      else if (this.slowTimer > 200) this.speed = 2.75;
      this.slowTimer++;
      this.originalSpeed = this.speed;
    }
  }

  move() {
    if (!this.isActive) return;
    this.overheatSlow();

    this.velocity.set(0, 0);

    if (this.fireCooldown > 0) {
      this.fireCooldown = Math.max(0, this.fireCooldown - this.heatDecay);
    }

    if (this.img.getCurrentFrame() == this.endFrame) {
      this.img.setFrame(this.startFrame);
    }

    // Movement logic for PLAYER_1
    if (this.player == playerNumber.PLAYER_1) {
      // Default P1 controls are WASD
      this.controls = [p1_up, p1_down, p1_left, p1_right];
      this.handleMovement(this.controls);
    }
    // Movement logic for PLAYER_2
    else if (this.player == playerNumber.PLAYER_2) {
      // Default P2 controls are arrow keys
      this.controls = [p2_up, p2_down, p2_left, p2_right];
      this.handleMovement(this.controls);
    }

    // Stops sprite animation when player isn't moving
    if (this.velocity.equals(0) || fadingOut || (pvpMode && fadingIn)) {
      if (this.lastDirection == "LEFT" || this.lastDirection == "RIGHT") {
        this.img.setFrame(1);
      } else if (this.lastDirection == "UP") {
        this.img.setFrame(13);
      } else if (this.lastDirection == "DOWN") {
        this.img.setFrame(7);
      }
    }

    if (fadingOut || (pvpMode && fadingIn)) {
      this.velocity.set(0, 0);
      if (pvpMode) {
        this.lastDirection = "DOWN";
        this.direction = (0, 1);
      }
      return;
    }

    // Apply knockback force gradually
    if (this.knockbackVelocity.mag() > 0.1) {
      this.handleKnockback();
    }

    this.normaliseDiagonalMovement();

    // Normalises diagonal firing
    if (this.velocity.mag() > 0) {
      this.direction = this.velocity.copy().normalize();
    }
    super.update();
  }

  handleMovement(controls) {
    let movingVertically = false;
    // Up/down directions are prioritised for diagonal animations to work
    if (keyIsDown(controls[0])) {
      movingVertically = true;
      if (this.lastDirection != "UP") {
        this.img.setFrame(13);
        this.startFrame = 13;
        this.endFrame = 17;
      }
      this.velocity.y = -this.speed;
      this.direction = createVector(0, -1);
      this.lastDirection = "UP";
    }
    if (keyIsDown(controls[1])) {
      movingVertically = true;
      if (this.lastDirection != "DOWN") {
        this.img.setFrame(7);
        this.startFrame = 7;
        this.endFrame = 12;
      }
      this.velocity.y = this.speed;
      this.direction = createVector(0, 1);
      this.lastDirection = "DOWN";
    }
    if (keyIsDown(controls[2])) {
      if (!movingVertically && this.lastDirection != "LEFT") {
        this.img.setFrame(1);
        this.startFrame = 1;
        this.endFrame = 5;
      }
      this.velocity.x = -this.speed;
      this.direction = createVector(1, 0);
      this.scaleX = -1; // Flip sprite to face left
      if (!movingVertically) this.lastDirection = "LEFT";
    }
    if (keyIsDown(controls[3])) {
      if (!movingVertically && this.lastDirection != "RIGHT") {
        this.img.setFrame(1);
        this.startFrame = 1;
        this.endFrame = 5;
      }
      this.velocity.x = this.speed;
      this.direction = createVector(-1, 0);
      this.scaleX = 1; // Reset sprite to face right
      if (!movingVertically) this.lastDirection = "RIGHT";
    }
  }

  fire() {
    if (
      !this.isActive ||
      fadingOut || (pvpMode && fadingIn) ||
      (!pvpMode && game.slowMeowHandler.occurring)
    ) {
      return;
    }
    if (this.fireOverheat) {
      if (!this.overheatSoundPlayed) {
        playSound(overheatStartSound, playbackRate);
        this.overheatSoundPlayed = true;
        // Timer to stop overheat indicator sound overlapping with overheat fire sound
        setTimeout(() => {
          this.canPlayOverheatFireSound = true;
        }, 750);
      }
      if (this.fireCooldown < 80) {
        this.fireOverheat = false;
        this.overheatSoundPlayed = false;
        this.canPlayOverheatFireSound = false;
        this.slowTimer = 0;
        playSound(overheatEndSound, playbackRate);
      }
    }
    let currentTime = millis();
    if (currentTime - this.lastShot > this.fireRate) {
      // SPACE key for player 1
      if (this.player === playerNumber.PLAYER_1 && keyIsDown(p1_shoot)) {
        this.handleFiring(currentTime);
      }
      // ENTER key for player 2
      else if (this.player === playerNumber.PLAYER_2 && keyIsDown(p2_shoot)) {
        this.handleFiring(currentTime);
      }
    }
  }

  handleFiring(currentTime) {
    if (this.fireOverheat) {
      if (this.canPlayOverheatFireSound &&
        currentTime - this.lastOverheatSoundTime > 750
      ) {
        playSound(overheatFireSound, playbackRate);
        this.lastOverheatSoundTime = currentTime;
      }
      return;
    }

    this.setShootingFrame();
    playSound(playerGunSound, playbackRate);
    // Try to adjust starting position of projectile to be closer to player's gun
    let xOffset = 40 * this.direction.x;
    let yOffset = 40 * this.direction.y;
    let projectile = new Projectile(
      this.position.x + xOffset,
      this.position.y + yOffset,
      this.direction.x,
      this.direction.y,
      this.projectileSpeed,
      bullet,
      this
    );
    projectile.lastDirection = this.lastDirection; // Ensures projectile inherits direction
    projectileManager.addProjectile(projectile);
    this.lastShot = currentTime;
    this.fireCooldown = Math.min(200 + this.heatGain, this.fireCooldown + this.heatGain);
    if (this.fireCooldown > 150) this.timesHeatLevelHigh++;
    if (this.fireCooldown > 200) {
      this.fireOverheat = true;
      this.timesOverheated++;
    }
  }

  setShootingFrame() {
    if (this.lastDirection == "UP") {
      this.img.setFrame(18);
    } else if (this.lastDirection == "DOWN") {
      if (this.direction.x == 0) {
        this.img.setFrame(6);
      } else if (this.direction.x != 0) {
        this.img.setFrame(19);
      }
    } else {
      this.img.setFrame(0);
    }
    setTimeout(() => {
      this.img.setFrame(this.endFrame);
    }, 60);
  }

  resetOverheat() {
    this.smokeParticles = [];
    this.fireCooldown = 0;
    this.slowTimer = 0;
    this.fireOverheat = false;
    if (!pvpMode && game.slowMeowHandler.occurring) {
      this.speed = 2.75 * 1.2;
    } else {
      this.speed = 2.75;
    }
    this.originalSpeed = 2.75;
  }

  // For behaviour monitoring
  getHighHeatFrequency() {
    return (
      this.timesHeatLevelHigh / Math.max(1, behaviourMonitor.getRoomsCleared())
    );
  }

  getOverheatFrequency() {
    return (
      this.timesOverheated / Math.max(1, behaviourMonitor.getRoomsCleared())
    );
  }
}

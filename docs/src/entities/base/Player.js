class Player extends Sprite {
  constructor(img, x, y, player_x) {
    super(img, x, y, 100);
    this.widthHitbox = 45;
    this.heightHitbox = 60;

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
    this.heatGain = difficultySettings[difficulty].heatGain;
    this.heatDecay = difficultySettings[difficulty].heatDecay;
    this.img.setFrame(7);
    this.startFrame = 7;
    this.endFrame = 9;
    this.slowTimer = 0;

    this.bloodColour = color(210, 0, 0, 0);

    this.deathSound = playerDeathSound;
    this.painSound = [playerPainSound1, playerPainSound2];

    // For behaviour monitoring
    this.timesHurt = 0;
    this.timesHeatLevelHigh = 0;
    this.timesOverheated = 0;
  }

  overheatSlow() {
    if (this.fireOverheat) {
      if (this.slowTimer == 0) this.speed = 0.8;
      else if (this.slowTimer == 50) this.speed = 1.1;
      else if (this.slowTimer == 100) this.speed = 1.4;
      else if (this.slowTimer == 150) this.speed = 1.8;
      else if (this.slowTimer == 200) this.speed = 2.4;
      else if (this.slowTimer > 200) this.speed = 2.75;
      if (!game.slowMeowHandler.occurring) this.slowTimer++;
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
      if (this.lastDirection === "LEFT") {
        this.img.setFrame(1);
      } else if (this.lastDirection === "RIGHT") {
        this.img.setFrame(1);
      } else if (this.lastDirection === "UP") {
        this.img.setFrame(13);
      } else if (this.lastDirection === "DOWN") {
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
    if (!this.isActive || fadingOut || (pvpMode && fadingIn)) return;
    if (this.fireOverheat) {
      if (!this.overheatSoundPlayed) {
        playSound(fireOverheatSound, playbackRate);
        this.overheatSoundPlayed = true;
      }
      if (this.fireCooldown < 80) {
        this.fireOverheat = false;
        this.slowTimer = 0;
        playSound(overheatEndSound, playbackRate);
      }
    }
    let currentTime = millis();
    if (
      !this.fireOverheat &&
      currentTime - this.lastShot > this.fireRate
    ) {
      if (this.overheatSoundPlayed) this.overheatSoundPlayed = false;
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
    if (this.lastDirection == "LEFT" || this.lastDirection == "RIGHT") {
      this.img.setFrame(0);
    } else {
      this.img.setFrame(6);
    }
    playSound(playerGunSound, playbackRate);
    let projectile = new Projectile(
      this.position.x,
      this.position.y,
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

  resetOverheat() {
    this.fireCooldown = 0;
    this.slowTimer = 0;
    this.fireOverheat = false;
    if (game.slowMeowHandler.occurring) {
      this.speed = 2.75 * (game.slowMeowHandler.movementSpeed * 1.2);
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

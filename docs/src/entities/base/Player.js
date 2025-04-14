class Player extends Sprite {
  constructor(img, x, y, player_x) {
    super(img, x, y, 100);
    this.widthHitbox = 45;
    this.heightHitbox = 60;

    this.player = player_x;

    this.widthModel = 70;
    this.heightModel = 70;
    this.color = color(0, 100, 255);
    this.speed = 3; // Slightly faster than base sprites
    this.originalSpeed = this.speed;
    this.attackDamage = 10 * difficultySettings[difficulty].playerDamageMult;
    this.fireRate = 200; // ms between shots
    this.originalFireRate = this.fireRate;
    this.lastShot = 0; // Timestamp of last shot
    this.projectileSpeed = 10;
    this.inventory = [];
    this.direction = createVector(-1, 0); // Character starts facing right
    this.fireCooldown = 0; // Cooldown between shots
    this.fireOverheat = false;
    this.overheatSoundPlayed = false;
    this.heatGain = difficultySettings[difficulty].heatGain;
    this.heatDecay = difficultySettings[difficulty].heatDecay;
    this.img.setFrame(7);
    this.startFrame = 7;
    this.endFrame = 9;
    this.slowTimer = 0;

    this.justFired = false;
    this.c;
    // this.img.pause();
    this.bloodColour = color(210, 0, 0, 0);

    this.deathSound = playerDeathSound;
    this.painSound = [playerPainSound1, playerPainSound2];

    // For behaviour monitoring
    this.timesHurt = 0;
    this.timesHeatLevelHigh = 0;
    this.timesOverheated = 0;
  }

  drawPlayerHealthBar() {
    let playerAHealthBarWidth = 200;
    let playerAHealthBarX = 50;
    let playerAHealthBarY = 50;
    let playerAHealthRatio = playerA.health / playerA.maxHealth;
    let frame = 13 - Math.ceil(13 * playerAHealthRatio);
    let healthgif = image(healthbar, 40, 220);
    healthbar.pause();
    healthbar.setFrame(frame);

    if (coop || pvpMode) {
      let playerBHealthBarWidth = 200;
      let playerBHealthBarX = 550;
      let playerBHealthBarY = 50;
      let playerBHealthRatio = playerB.health / playerB.maxHealth;

      let frame = 13 - Math.ceil(13 * playerBHealthRatio);
      let healthgifb = image(healthbar_b, 910, 220);
      healthbar_b.pause();
      healthbar_b.setFrame(frame);
    }
  }

  overheatSlow() {
    if (this.fireOverheat) {
      if (this.slowTimer == 0) this.speed = 0.8;
      else if (this.slowTimer == 50) this.speed = 1.1;
      else if (this.slowTimer == 100) this.speed = 1.4;
      else if (this.slowTimer == 150) this.speed = 1.8;
      else if (this.slowTimer == 200) this.speed = 2.4;
      else if (this.slowTimer > 200) this.speed = 3;
      if (!game.slowMeowOccurring) this.slowTimer++;
      this.originalSpeed = this.speed;
    }
  }

  move() {
    if (!this.isActive) return;
    this.overheatSlow();

    // Player movement using WASD / arrow keys
    this.velocity.set(0, 0);
    if (this.fireCooldown > 0) {
      this.fireCooldown = Math.max(0, this.fireCooldown - this.heatDecay);
    }

    if (this.img.getCurrentFrame() == this.endFrame) {
      this.img.setFrame(this.startFrame);
    }

    //movement logic for PLAYER_1
    if (this.player == playerNumber.PLAYER_1) {
      // A key
      if (keyIsDown(65)) {
        if (this.lastDirection != "LEFT") {
          this.img.setFrame(1);
          this.startFrame = 1;
          this.endFrame = 5;
          //  this.img.play();
        }
        this.velocity.x = -this.speed;

        // Instead of flipping we set the gif to frames 0->5
        //this.img.setFrame(1);

        this.direction = createVector(1, 0); // Facing left
        this.scaleX = -1; // Flip sprite to face left
        this.lastDirection = "LEFT";
      }
      // D key
      if (keyIsDown(68)) {
        if (this.lastDirection != "RIGHT") {
          this.img.setFrame(1);
          this.startFrame = 1;
          this.endFrame = 5;
        }
        this.velocity.x = this.speed;
        this.direction = createVector(-1, 0); // Facing right
        this.scaleX = 1; // Reset sprite to face right
        this.lastDirection = "RIGHT";
      }
      // W key
      if (keyIsDown(87)) {
        if (this.lastDirection != "UP") {
          this.img.setFrame(13);
          this.startFrame = 13;
          this.endFrame = 17;
        }
        this.velocity.y = -this.speed;
        this.direction = createVector(0, -1);
        this.lastDirection = "UP";
      }
      // S key
      if (keyIsDown(83)) {
        if (this.lastDirection != "DOWN") {
          this.img.setFrame(7);
          this.startFrame = 7;
          this.endFrame = 13;
        }
        this.velocity.y = this.speed;
        this.direction = createVector(0, 1);
        this.lastDirection = "DOWN";
      }
    }
    //movement logic for PLAYER_2
    if (this.player == playerNumber.PLAYER_2) {
      if (keyIsDown(LEFT_ARROW)) {
        if (this.lastDirection != "LEFT") {
          this.img.setFrame(1);
          this.startFrame = 1;
          this.endFrame = 5;
          //  this.img.play();
        }
        this.velocity.x = -this.speed;
        this.direction = createVector(1, 0); // Facing left
        this.scaleX = -1; // Flip sprite to face left
        this.lastDirection = "LEFT";
      }
      if (keyIsDown(RIGHT_ARROW)) {
        if (this.lastDirection != "RIGHT") {
          this.img.setFrame(1);
          this.startFrame = 1;
          this.endFrame = 5;
        }
        this.velocity.x = this.speed;
        this.direction = createVector(-1, 0); // Facing right
        this.scaleX = 1; // Reset sprite to face right
        this.lastDirection = "RIGHT";
      }
      if (keyIsDown(UP_ARROW)) {
        if (this.lastDirection != "UP") {
          this.img.setFrame(13);
          this.startFrame = 13;
          this.endFrame = 17;
        }
        this.velocity.y = -this.speed;
        this.direction = createVector(0, -1);
        this.lastDirection = "UP";
      }
      if (keyIsDown(DOWN_ARROW)) {
        if (this.lastDirection != "DOWN") {
          this.img.setFrame(7);
          this.startFrame = 7;
          this.endFrame = 13;
        }
        // Down arrow (move down)
        this.velocity.y = this.speed;
        this.direction = createVector(0, 1);
        this.lastDirection = "DOWN";
      }
    }

    // Constrain the player's position within the room boundaries
    this.position.x = constrain(
      this.position.x,
      tileSize * 2 + this.widthHitbox / 2 + arena_offset,
      roomWidth * tileSize - tileSize * 2 - this.widthHitbox / 2 + arena_offset
    );

    this.position.y = constrain(
      this.position.y,
      tileSize * 2 + this.heightHitbox / 2 + arena_offset,
      roomHeight * tileSize -tileSize * 2 - this.heightHitbox / 2 + arena_offset
    );

    // Apply knockback force gradually
    if (this.knockbackVelocity.mag() > 0.1) {
      if (game.slowMeowOccurring) { // Slow knockback speed if slow meow active
        let adjustedVelocity = p5.Vector.mult(this.knockbackVelocity, game.slowMeowMovementSpeed);
        this.position.add(adjustedVelocity);
        this.knockbackVelocity.mult(Math.pow(0.9, game.slowMeowMovementSpeed));
      } else {
        this.position.add(this.knockbackVelocity);
        this.knockbackVelocity.mult(0.9);
      }
    }

    // Normalizes diagonal movement
    if (this.velocity.x !== 0 && this.velocity.y !== 0) {
      this.velocity.setMag(this.speed);
    }
    //Normalizes diagonal firing
    if (this.velocity.mag() > 0) {
      this.direction = this.velocity.copy().normalize();
    }
    super.update();
  }

  fire() {
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
      this.isActive &&
      !this.fireOverheat &&
      currentTime - this.lastShot > this.fireRate
    ) {
      if (this.overheatSoundPlayed) this.overheatSoundPlayed = false;
      // SPACE key for player 1
      if (this.player === playerNumber.PLAYER_1 && keyIsDown(32)) {
        this.justFired = true;
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
        this.fireCooldown = Math.min(200, this.fireCooldown + this.heatGain);
        if (this.fireCooldown > 150) this.timesHeatLevelHigh++;
        if (this.fireCooldown >= 200) {
          this.fireOverheat = true;
          this.timesOverheated++;
        }
      }
      // ENTER key for player 2
      if (this.player === playerNumber.PLAYER_2 && keyIsDown(13)) {
        if (this.lastDirection == "LEFT" || this.lastDirection == "RIGHT") {
          this.img.setFrame(0);
        } else {
          this.img.setFrame(6);
        }
        let projectile = new Projectile(
          this.position.x,
          this.position.y,
          this.direction.x,
          this.direction.y,
          this.projectileSpeed,
          bullet,
          this
        );
        playSound(playerGunSound, playbackRate);

        projectile.lastDirection = this.lastDirection; // Ensures projectile inherits direction
        projectileManager.addProjectile(projectile);
        this.lastShot = currentTime;
        this.fireCooldown += this.heatGain;
        if (this.fireCooldown > 150) this.timesHeatLevelHigh++;
        if (this.fireCooldown > 200) {
          this.fireCooldown = 200; // Stop heat level going over max
          this.fireOverheat = true;
          this.timesOverheated++;
        }
      }
    }
  }

  drawPlayerHeatBar(x, y, width, height, value, label) {
    push();
    stroke(150);
    strokeWeight(2);
    noFill();
    rect(x, y, width, height, 5);

    const fillWidth = constrain(value * width, 0, width);

    let fillColor;
    if (this.fireOverheat) {
      // causes the bar to flash when overheated
      if (frameCount % 20 < 10) {
        fillColor = color(255, 0, 0); // red
      } else {
        fillColor = color(255, 150, 0); // orange
      }
    } else {
      // goes from green to yellow to red as heat increases
      if (value < 0.5) {
        let greenAmount = map(value, 0, 0.5, 255, 255);
        let redAmount = map(value, 0, 0.5, 0, 255);
        fillColor = color(redAmount, greenAmount, 0);
      } else {
        let greenAmount = map(value, 0.5, 1, 255, 0);
        fillColor = color(255, greenAmount, 0);
      }
    }
    pop();

    push();
    noStroke();
    fill(fillColor);
    rect(x, y, fillWidth, height, 5);

    // warning text if close to overheating
    if (value > 0.75 && !this.fireOverheat) {
      fill(70, 0, 0);
      textAlign(CENTER, CENTER);
      textSize(14);
      textFont(gameFont);

      text("WARNING!", x + width / 2, y + height / 2);
    }

    // overheat text
    if (this.fireOverheat) {
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(14);
      textFont(gameFont);

      text("OVERHEATED!", x + width / 2, y + height / 2);
    }
    pop();

    // label
    push();
    fill(255);
    textAlign(CENTER);
    textSize(14);
    textFont(gameFont);
    text(label, x + width / 2, y - 10);
    pop();
  }

  // Adds i-frames after taking damage - in player class as not needed for mobs
  makeInvincible() {
    if (!this.isInvincible) {
      if (this.health > 1) { // Check health > 1 to stop pain sound playing with death sound
        let randomSound = Math.floor(random(0, this.painSound.length));
        playSound(this.painSound[randomSound], playbackRate);
      }
      this.timesHurt++;
      this.isInvincible = true;
      this.invincibilityStartTime = millis();
      this.lastFlashTime = millis();
      this.isFlashing = true;
    }
  }

  resetOverheat() {
    this.fireCooldown = 0;
    this.slowTimer = 0;
    this.fireOverheat = false;
    if (game.slowMeowOccurring) {
      this.speed = 3 * (game.slowMeowMovementSpeed * 1.2);
    } else {
      this.speed = 3;
    }
    this.originalSpeed = 3;
  }

  // For behaviour monitoring
  getHighHeatFrequency() {
    return this.timesHeatLevelHigh / Math.max(1, behaviourMonitor.getRoomsCleared());
  }

  getOverheatFrequency() {
    return this.timesOverheated / Math.max(1, behaviourMonitor.getRoomsCleared());
  }
}

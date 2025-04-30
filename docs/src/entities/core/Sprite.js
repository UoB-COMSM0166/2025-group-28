class Sprite extends GameObject {
  constructor(img, x, y, maxHealth) {
    super(x, y);

    this.maxHealth = maxHealth;
    this.health = maxHealth;

    this.img = img;

    this.direction = createVector(1, 0); // Entity starts facing right

    // Properties for i-frames/flashing effect
    this.isInvincible = false;
    this.invincibilityDuration = 1000; // 1 second of invincibility
    this.invincibilityStartTime = 0;
    this.flashInterval = 100; // Flash every 100ms
    this.lastFlashTime = 0;
    this.isFlashing = false;
    this.lastSoundTime = 0;
    this.soundCooldown = 1500; // 1.5 second cooldown between sounds

    this.isBuffed = false;
    this.isSlowed = false;

    this.knockbackVelocity = createVector(0, 0);
  }

  normaliseDiagonalMovement() {
    if (this.velocity.x !== 0 && this.velocity.y !== 0) {
      this.velocity.setMag(this.speed);
    }
  }

  calculateKnockbackDirection(sourceX, sourceY) {
    let knockbackDirection = createVector(this.position.x - sourceX, this.position.y - sourceY);
    knockbackDirection.normalize();
    return knockbackDirection;
  }

  applyKnockback(sourceX, sourceY) {
    let knockbackDirection = this.calculateKnockbackDirection(sourceX, sourceY);
    this.knockbackVelocity = p5.Vector.mult(knockbackDirection, knockbackForce);
  }

  handleKnockback() {
    if (!pvpMode && game.slowMeowHandler.occurring) {
      // Slow knockback speed if slow meow active
      let adjustedVelocity = p5.Vector.mult(
        this.knockbackVelocity,
        game.slowMeowHandler.movementSpeed
      );
      this.position.add(adjustedVelocity);
      this.knockbackVelocity.mult(Math.pow(0.9, game.slowMeowHandler.movementSpeed));
    } else {
      this.position.add(this.knockbackVelocity);
      this.knockbackVelocity.mult(0.9);
    }
  }

  takeDamage(amount) {
    if (!this.isActive || this.isInvincible) return;
    if (this.lastSoundTime == 0 || millis() - this.lastSoundTime > this.soundCooldown) {
      if (!childMode && this.health - amount > 0) {
        playSound(bloodSound1, playbackRate, true);
        this.lastSoundTime = millis();
        if (this instanceof Player) {
          let randomSound = Math.floor(random(0, this.painSound.length));
          playSound(this.painSound[randomSound], playbackRate);
        }
      }
    }
    this.health = Math.max(0, this.health - amount);
    if (this.health <= 0) this.isDead();
  }

  isDead() {
    if (this.health > 0) return;
    this.isActive = false;
    if (this instanceof Player) {
      this.resetOverheat();
      if (!pvpMode) {
        if (!playerA.isActive && (!coop || !playerB.isActive)) {
          game.slowMeowHandler.reset();
        }
      }
    }
    if (!childMode) playSound(bloodSound2, playbackRate, true);
    if (this.deathSound) {
      if ((this instanceof BuffMob && game.currentRoom.mobs.length <= 1) ||
          (!(this instanceof BuffMob))
      ) {
        playSound(this.deathSound, playbackRate, true);
      }
    }
  }

  // Adds i-frames to the entity
  makeInvincible(duration = 1000) {
    if (this.isInvincible || !this.isActive) return;
    if (this instanceof Player) this.timesHurt++;
    this.isInvincible = true;
    this.invincibilityStartTime = millis();
    this.lastFlashTime = millis();
    this.isFlashing = true;
    this.invincibilityDuration = duration;
  }

  draw() {
    if (!this.isActive) return;
    // Handle invincibility/flashing effect
    if (this.isInvincible) {
      let currentTime = millis();
      if (currentTime - this.invincibilityStartTime > this.invincibilityDuration) {
        this.isInvincible = false;
        this.isFlashing = false;
      } else if (currentTime - this.lastFlashTime > this.flashInterval) {
        this.isFlashing = !this.isFlashing;
        this.lastFlashTime = currentTime;
      }
    }

    // Draw sprite only if not flashing
    if (!this.isFlashing) {
      push();
      if (this.isBuffed) tint(210, 0, 0, 255); // Apply red tint if buffed
      translate(this.position.x, this.position.y);
      scale(this.scaleX, 1); // Flip the sprite depending on the movement direction
      image(this.img, -this.widthModel / 2, -this.heightModel / 2, this.widthModel, this.heightModel);
      noTint(); // Prevent tint from affecting other sprites
      pop();
    }

    if (drawCollisions) {
      // TESTING - draw collision boxes
      fill(0, 200, 0, 100);
      rect(
        this.position.x - this.widthHitbox / 2,
        this.position.y - this.heightHitbox / 2,
        this.widthHitbox,
        this.heightHitbox
      );
    }
  }
}

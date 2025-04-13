class Sprite extends GameObject {

  constructor(img, x, y, maxHealth) {
    super(x, y);

    this.maxHealth = maxHealth;
    this.health = maxHealth;

    this.img = img;

    this.isSlowed = false;
    this.direction = createVector(1, 0); //So the character starts facing right

    // Effects like taking damage, speed boost/reduction, etc.
    this.activeEffects = []; // An array of effect type, effect duration, effect strength, etc.
    this.originalColor = this.color;
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

    this.knockbackVelocity = createVector(0, 0);
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

  takeDamage(amount) {
    if (!this.isInvincible) {
      if (this.lastSoundTime == 0 || millis() - this.lastSoundTime > this.soundCooldown) {
        let soundChance = random();
        if (soundChance < 0.5) {
          playSound(bloodSound, playbackRate);
          this.lastSoundTime = millis();
        }
      }
      this.health = Math.max(0, this.health - amount);
    }
    // Checks if the sprite is dead
    if (this.health <= 0) {
      this.health = 0;
      this.isActive = false;
      if (this.deathSound) playSound(this.deathSound, playbackRate);
    }
  }

  checkIfSlowMeowActive() {
    if (game && game.slowMeowOccurring) {
      if (this.isSlowed) return;
      if (!this.isBuffed) this.originalSpeed = this.speed;
      this.speed *= game.slowMeowMovementSpeed;
      this.isSlowed = true;
    } else this.isSlowed = false;
  }

  draw() {
    if (this.isActive) {
      // Handle flashing effect
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

      if (debug) {
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

}

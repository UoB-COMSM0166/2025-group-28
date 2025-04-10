class Sprite extends GameObject {

  constructor(img, x, y, maxHealth) {
    super(x, y);

    this.maxHealth = maxHealth;
    this.health = maxHealth;

    this.img = img;

    this.speed = 1;
    this.isSlowed = false;
    this.originalSpeed = this.speed;
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

    this.isBuffed = false;

    this.knockbackForce = createVector(0, 0); // stores remaining knockback force
  }

  calculateKnockbackDirection(sourceX, sourceY) {
    let knockbackDirection = createVector(this.position.x - sourceX, this.position.y - sourceY);
    knockbackDirection.normalize();
    return knockbackDirection;
  }

  applyKnockback(sourceX, sourceY) {
    let knockbackDirection = this.calculateKnockbackDirection(sourceX, sourceY);
    this.knockbackForce = p5.Vector.mult(knockbackDirection, knockbackForce);
  }

  takeDamage(amount) {
    if (!this.isInvincible) {
      this.health -= amount;
    }
    // Checks if the sprite is dead
    if (this.health <= 0) {
      this.health = 0;
      this.isActive = false;
    }
  }

  checkIfSlowMeowActive() {
    if (game && game.slowMeowOccuring) {
      this.originalSpeed = this.speed;
      this.speed = this.originalSpeed * game.slowMeowMovementSpeed;
    }
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

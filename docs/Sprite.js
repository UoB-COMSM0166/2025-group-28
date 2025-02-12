class Sprite extends GameObject {
  constructor(img, x, y, maxHealth = 100) {
    super(x, y);

    this.maxHealth = maxHealth;
    this.health = maxHealth;

    this.img = img;

    this.speed = 5;
    this.direction = createVector(1, 0); //So the character starts facing right

    // Effects like taking damage, speed boost/reduction, etc.
    this.activeEffects = []; // An array of effect type, effect duration, effect strength, etc.
    this.originalColor = this.color;
  }

  move() {
    // Updates the velocity based on the direction and speed
    this.velocity.set(0, 0);
    if (keyIsDown(LEFT_ARROW)) {
        this.velocity.x = -this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        this.velocity.x = this.speed;
    }
    if (keyIsDown(UP_ARROW)) {
        this.velocity.y = -this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
        this.velocity.y = this.speed;
    }

    // Makes speed feel smooth when moving diagonally
    if (this.velocity.x !== 0 && this.velocity.y !== 0) {
        this.velocity.setMag(this.speed);
    }
    // Applies the movement (if no collision)
    super.update();
  }

  haltIfColliding(otherGameObjects) {
    for (let other of otherGameObjects) {
        if (this.collidesWith(other)) {
            const overlap = 1; // small value to prevent sticking
            if (this.velocity.x > 0) {
                this.position.x = other.position.x - this.widthHitbox - overlap;
            } else if (this.velocity.x < 0) {
                this.position.x = other.position.x + other.widthHitbox + overlap;
            }
            if (this.velocity.y > 0) {
                this.position.y = other.position.y - this.heightHitbox - overlap;
            } else if (this.velocity.y < 0) {
                this.position.y = other.position.y + other.heightHitbox + overlap;
            }
        }
    }
  }

  // haltIfColliding(otherGameObjects) {
  //   for (let other of otherGameObjects) {
  //     if (this.collidesWith(other) == true) {
  //       this.velocity.x = 0;
  //       this.velocity.y = 0;
  //     }
  //   }
  // }





  takeDamage(amount) {
    this.health -= amount;

    // Checks if the sprite is dead
    if (this.health <= 0) {
      this.health = 0;
      this.isActive = false;
    }
  }

  draw() {
    if (this.isActive) {
      // Draw sprite first
      image(
        this.img,
        this.position.x - this.widthModel / 2,
        this.position.y - this.heightModel / 2,
        this.widthModel,
        this.heightModel
      );
      fill(0, 200, 0, 100);
      rect(
        this.position.x - this.widthHitbox / 2,
        this.position.y - this.heightHitbox / 2,
        this.widthHitbox,
        this.heightHitbox
      );

      // Health bar calculations
      const healthBarWidth = this.widthModel * 0.6;
      const healthBarHeight = 5;
      const healthPercentage = this.health / this.maxHealth;
      const yOffset = 6; // Space between sprite and health bar

      // Calculate center positions
      const spriteCenterX = this.position.x;
      const spriteTop = this.position.y - this.heightModel / 2;

      // Health bar positioning
      const healthBarX = spriteCenterX - healthBarWidth / 2;
      const healthBarY = spriteTop - yOffset - healthBarHeight;

      // Health bar background
      fill(255, 0, 0);
      rect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

      // Current health
      fill(0, 255, 0);
      rect(
        healthBarX,
        healthBarY,
        healthBarWidth * healthPercentage,
        healthBarHeight
      );
      //this.updateHealth();
    }
  }

  updateHealth() {
    //Test: Pressing space damages the Player
    if (keyIsDown(32)) {
      // Space key
      this.takeDamage(1);
    }
  }
}

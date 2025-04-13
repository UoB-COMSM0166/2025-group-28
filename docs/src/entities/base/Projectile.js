class Projectile extends GameObject {
  constructor(x, y, velocityX, velocityY, velocityMultiplier, image, owner) {
    super(x, y);
    this.position = createVector(x, y);
    this.velocity = createVector(
      velocityMultiplier * velocityX,
      velocityMultiplier * velocityY
    );
    this.originalVelocity = this.velocity.copy();
    this.image = image;
    this.widthHitbox = 5;
    this.heightHitbox = 5;
    this.owner = owner;
    if (game && game.slowMeowOccurring) {
      // Correct original velocity value for projectiles fired during slow meow state
      if (this.originalVelocity.equals(this.velocity)) {
        if (this.velocity.mag() < 1) {
          this.originalVelocity = p5.Vector.div(this.velocity, game.slowMeowMovementSpeed);
        } else {
          this.originalVelocity = p5.Vector.div(this.velocity, game.slowMeowMovementSpeed + 1);
        }
        if (this.owner.isBuffed && this.owner.speed > 0) {
          this.originalVelocity = p5.Vector.mult(this.originalVelocity, this.owner.originalSpeed * 2.4);
        }
      }
      this.velocity = p5.Vector.mult(this.originalVelocity, game.slowMeowMovementSpeed);
    }
  }

  update() {
    // Deactive the projectile if it leaves the room boundaries
    if (
      this.position.x < (tileSize * 2) + arena_offset ||
      this.position.x > roomWidth * tileSize - (tileSize * 2) + arena_offset ||
      this.position.y < (tileSize * 2) + arena_offset ||
      this.position.y > roomHeight * tileSize - (tileSize * 2) + arena_offset
    ) {
      this.isActive = false;
    }
    if (this.isActive) {
      this.position.add(this.velocity);
    }
  }

  draw() {
    if (this.isActive) {
      push();
      translate(this.position.x, this.position.y);
      imageMode(CENTER);
      image(this.image, 0, 0, 16, 16);
      pop();
    }
  }
}

class Projectile extends GameObject {
  constructor(x, y, velocityX, velocityY, velocityMultiplier, image, owner) {
    super(x, y);
    this.owner = owner;
    this.position = createVector(x, y);
    this.velocity = createVector(
      velocityMultiplier * velocityX,
      velocityMultiplier * velocityY
    );
    this.originalVelocity = this.velocity.copy();
    if (this.owner.speed > 0) {
      this.originalVelocity.setMag(this.owner.projectileSpeed);
    }
    this.image = image;
    this.widthHitbox = 5;
    this.heightHitbox = 5;
    this.sparkColour = color(255, 215, 80, 255);
  }

  update() {
    if (!game || !this.isActive) return;
    // Potentially fixes projectiles that sometimes get stuck in the air
    if (this.velocity.mag() == 0) this.isActive = false;

    this.position.add(this.velocity);

    if (game.slowMeowOccurring) {
      // Correct original velocity value for projectiles fired during slow meow state
      if (this.originalVelocity.mag() <= this.velocity.mag()) {
        if (this.velocity.mag() < 1) {
          this.originalVelocity = p5.Vector.div(this.velocity, game.slowMeowMovementSpeed);
        } else {
          this.originalVelocity = p5.Vector.div(this.velocity, game.slowMeowMovementSpeed + 1);
        }
        if (this.owner.isBuffed && this.owner.speed > 0) {
          this.originalVelocity.x = this.owner.velocity.x * (this.owner.projectileSpeed / game.slowMeowMovementSpeed);
          this.originalVelocity.y = this.owner.velocity.y * (this.owner.projectileSpeed / game.slowMeowMovementSpeed);
        }
      }
      this.velocity = p5.Vector.mult(this.originalVelocity, game.slowMeowMovementSpeed);
    } else {
      if (this.owner.speed > 0) {
        this.velocity.setMag(this.owner.projectileSpeed);
      }
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

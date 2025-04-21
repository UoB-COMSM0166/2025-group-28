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
    if (this.owner instanceof Player) {
      this.scale = 14;
    } else this.scale = 16;
  }

  update() {
    if (!game || !this.isActive) return;
    // Potentially fixes projectiles that sometimes get stuck in the air
    if (this.velocity.mag() == 0) this.isActive = false;

    this.position.add(this.velocity);

    if (!pvpMode && game.slowMeowHandler.occurring) {
      // Correct original velocity value for projectiles fired during slow meow state
      if (this.originalVelocity.mag() <= this.velocity.mag()) {
        if (this.velocity.mag() < 1) {
          this.originalVelocity = p5.Vector.div(this.velocity, game.slowMeowHandler.movementSpeed);
        } else {
          this.originalVelocity = p5.Vector.div(this.velocity, game.slowMeowHandler.movementSpeed + 1);
        }
        if (this.owner.isBuffed && this.owner.speed > 0) {
          this.originalVelocity.x =
            this.owner.velocity.x * (this.owner.projectileSpeed / game.slowMeowHandler.movementSpeed);
          this.originalVelocity.y =
            this.owner.velocity.y * (this.owner.projectileSpeed / game.slowMeowHandler.movementSpeed);
        }
      }
      this.velocity = p5.Vector.mult(this.originalVelocity, game.slowMeowHandler.movementSpeed);
    } else {
      if (this.owner.speed > 0) {
        this.velocity.setMag(this.owner.projectileSpeed);
      }
    }
  }

  draw() {
    if (!this.isActive) return;
    push();
    angleMode(DEGREES);
    translate(this.position.x, this.position.y);
    if (this.owner instanceof Player) {
      if (this.velocity.x != 0 && this.velocity.y == 0) {
        rotate(-45);
      } else if (this.velocity.y != 0 && this.velocity.x == 0) {
        rotate (45);
      } else if (this.velocity.x < 0 && this.velocity.y > 0) {
        rotate(-90);
      } else if (this.velocity.x > 0 && this.velocity.y < 0) {
        rotate (90);
      }
    }
    imageMode(CENTER);
    image(this.image, 0, 0, this.scale, this.scale);
    pop();
  }
}

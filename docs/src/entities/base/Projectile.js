class Projectile extends GameObject {
  // maybe extend game object to avoid the health sprite mechanic

  constructor(x, y, velocityX, velocityY, velocityMultiplier, image) {
    super(x, y);
    this.position = createVector(x, y);
    this.velocity = createVector(velocityMultiplier * velocityX, velocityMultiplier * velocityY);
    this.image = image
  }

  update() {
    // Deactive the projectile if it leaves the room boundaries for performance reasons ;)
    if (
      this.position.x < tileSize ||
      this.position.x > roomWidth * tileSize - tileSize ||
      this.position.y < tileSize ||
      this.position.y > roomHeight * tileSize - tileSize
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

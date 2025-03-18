class Particle {

  constructor(x, y, maxHeight, colour) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D().mult(random(2, 5));
    this.size = random(2, 7);
    this.lifespan = 600; // 10 seconds (60 frames per second)
    this.gravity = createVector(0, 0.3);
    this.maxHeight = maxHeight;
    this.colour = colour;
  }

  applyGravity() {
    this.velocity.add(this.gravity);
  }

  isFinished() {
    return this.lifespan <= 0;
  }

  update() {
    this.position.add(this.velocity);
    if (this.position.y >= this.maxHeight) {
        this.velocity.x = 0;
        this.position.y = this.maxHeight;
    }
    this.lifespan -= 5;
  }

  draw() {
    noStroke();
    fill(red(this.colour), green(this.colour), blue(this.colour), this.lifespan);
    rect(this.position.x, this.position.y, this.size);
  }

}
class Particle {
  constructor(x, y, colour) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D().mult(random(3, 8));
    this.size = random(2, 7);
    this.lifespan = random(650, 750);
    this.colour = colour;
  }

  update() {
    // Apply damping to simulate friction/resistance in space
    this.velocity.mult(random(0.8,0.95));
    
    // Move particle according to velocity
    this.position.add(this.velocity);
    
    // Reduce lifespan
    this.lifespan -= 5;
  }

  isFinished() {
    return this.lifespan <= 0;
  }

  draw() {
    noStroke();
    fill(red(this.colour), green(this.colour), blue(this.colour), this.lifespan);
    rect(this.position.x, this.position.y, this.size);
  }
}
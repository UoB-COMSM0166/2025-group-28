class Particle {
  constructor(x, y, maxHeight, colour) {
    this.position = createVector(x, y);
    // Create more varied initial velocities for a better splatter effect
    this.velocity = p5.Vector.random2D().mult(random(3, 8));
    this.size = random(2, 7);
    this.lifespan = 700;
    this.colour = colour;
    // Remove gravity-related properties
    this.maxHeight = maxHeight; // Keep for compatibility
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
    // Use ellipse instead of rect for more blood-like appearance
    rect(this.position.x, this.position.y, this.size);
  }
}
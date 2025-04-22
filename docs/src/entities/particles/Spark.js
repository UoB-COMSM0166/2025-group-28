class Spark extends Particle {
  constructor(x, y, colour, sourceVelocity) {
    super(x, y, colour);
    this.velocity = sourceVelocity.copy().mult(-0.25).add(p5.Vector.random2D().mult(random(1, 4)));
    this.size = random(2, 5);
    this.lifespan = random(200, 255);
    this.colour = color(
      random(Math.max(0, red(colour) - 50), red(colour)),
      random(Math.max(0, green(colour) - 75), green(colour)),
      blue(colour)
    );
  }

  update() {
    super.update();
    this.lifespan = Math.max(0, this.lifespan - 7.5);
  }

  draw() {
    noStroke();
    fill(red(this.colour), green(this.colour), blue(this.colour), this.lifespan);
    rect(this.position.x, this.position.y, this.size);
  }
}
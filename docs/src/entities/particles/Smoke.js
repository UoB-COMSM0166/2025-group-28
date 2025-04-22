class Smoke extends Particle {
  constructor(x, y) {
    let greyShade = Math.floor(random(150, 200))
    super(x, y, color(greyShade, greyShade, greyShade, 200));
    this.velocity = p5.Vector.random2D().mult(random(0.5, 2));
    this.velocity.y -= random(0.5, 1.5);
    this.size = random(5, 12);
    this.lifespan = random(400, 600);
  }

  update() {
    super.update();
    this.velocity.y -= 0.05;
    this.size *= 0.98;
  }
}
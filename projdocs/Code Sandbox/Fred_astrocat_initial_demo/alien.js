class Alien {
  constructor(x, y, a) {
    this.mass = 25;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.position.x -= 1;
    this.acceleration.mult(0);
  }

  display() {
    //tint("red");
    image(alien, this.position.x, this.position.y, 100, 150);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }
}

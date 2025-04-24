class Warp extends Particle {
   constructor(x, y) {
      // For a lighter, bubbly blue color
      let blueValue = Math.floor(random(180, 255));
      let greenValue = Math.floor(random(140, 200)); // Adding more green for a lighter feel
      super(x, y, color(50, greenValue, blueValue, 100));
      this.velocity = p5.Vector.random2D().mult(random(0.5, 2));
      // this.velocity.y -= random(0.5, 1);
      this.size = random(4, 7);
      this.lifespan = random(300, 450);
   }
 
   update() {
     super.update();
     this.velocity.y -= 0.05;
     this.size *= 0.97;
   }
 }
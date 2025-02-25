class Projectile extends GameObject { // maybe extend game object to avoid the health sprite mechanic

   constructor(x, y, velocityX, velocityY) {
      super(x, y);
      this.position = createVector(x, y);
      this.velocity = createVector(2.5 * velocityX, 2.5 * velocityY);
   }

   update() {
      this.position.add(this.velocity);
   }

   draw() {
      // Proper circle rendering with fill and stroke
      fill(255, 0, 0);  // Red fill color
      circle(this.position.x, this.position.y, 10);
   }

}

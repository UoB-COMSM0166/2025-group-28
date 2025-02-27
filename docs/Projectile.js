class Projectile extends GameObject { // maybe extend game object to avoid the health sprite mechanic

   constructor(x, y, velocityX, velocityY, lastDirection) {
      super(x, y);
      this.position = createVector(x, y);
      this.velocity = createVector(10 * velocityX, 10 * velocityY);
      this.lastDirection = lastDirection;
   }

   update() {
      this.position.add(this.velocity);
   }

   draw() {
      // Proper circle rendering with fill and stroke
      push();
      translate(this.position.x, this.position.y);
      imageMode(CENTER);
      //not used yet, trying to rotate the bullets by 45 degrees depending on the angle 
      // const directionAngles = {
      //     "UP": -90,
      //     "DOWN": 90,
      //     "LEFT": 180,
      //     "RIGHT": 0,
      //     "UP-RIGHT": -45,
      //     "UP-LEFT": -135,
      //     "DOWN-RIGHT": 45,
      //     "DOWN-LEFT": 135,
      // };
   
      // 
      // let angle = directionAngles[this.lastDirection] || 0; // Default to 0 if not found
      // rotate(radians(angle));
   
      image(bullet, 0, 0, 150, 150);
      pop();
   }

}

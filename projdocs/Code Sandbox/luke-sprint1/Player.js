class Player extends Sprite {
   constructor(x, y) {
   super(x, y, 150); 
   this.color = color(0, 100, 255);
   this.speed = 6; // Slightly faster than base sprites
   this.attackDamage = 25;
   this.attackCooldown = 0.5; // Seconds
   this.lastAttackTime = 0;

   }
  
   move() {
   //Player movement using WASD
      this.velocity.set(0, 0);
      if (keyIsDown(65)) { // A key
         this.velocity.x = -this.speed;
      }
      if (keyIsDown(68)) { // D key
         this.velocity.x = this.speed;
      }
      if (keyIsDown(87)) { // W key
         this.velocity.y = -this.speed;
      }
      if (keyIsDown(83)) { // S key
         this.velocity.y = this.speed;
      }
      // Normalises diagonal movement
      if (this.velocity.x !== 0 && this.velocity.y !== 0) {
       this.velocity.setMag(this.speed);
      }
      super.update();
   }
}
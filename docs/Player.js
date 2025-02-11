class Player extends Sprite {
   constructor(x, y /*, player_x*/) {
      //this.player = player_x;
      super(x, y, 100); 
      this.widthHitbox = 30
      this.heightHitbox = 50
    
      this.widthModel = 40
      this.heightModel = 60
      this.color = color(0, 100, 255);
      this.speed = 5; // Slightly faster than base sprites
      this.attackDamage = 50;
      this.fireRate = 0.5; // Seconds
      this.lastShot = 0; // Seconds
      this.inventory = [];
      this.direction = createVector(1, 0); //Character starts facing right
   }
  
   move() {
      //Player movement using WASD
      this.velocity.set(0, 0);
      //if(player_x == PLAYER_1){
         if (keyIsDown(65)) { // A key
            this.velocity.x = -this.speed;
            this.direction = createVector(-1, 0);
         }
         if (keyIsDown(68)) { // D key
            this.velocity.x = this.speed;
            this.direction = createVector(1, 0);
         }
         if (keyIsDown(87)) { // W key
            this.velocity.y = -this.speed;
            this.direction = createVector(0, -1);
         }
         if (keyIsDown(83)) { // S key
            this.velocity.y = this.speed;
            this.direction = createVector(0, 1);
         }
         // Normalises diagonal movement
         if (this.velocity.x !== 0 && this.velocity.y !== 0) {
         this.velocity.setMag(this.speed);
         }
      //}
      /*if(player_x == PLAYER_2){
         if (keyIsDown(LEFT_ARROW)) { 
            this.velocity.x = -this.speed;
            this.direction = createVector(-1, 0);
         }
         if (keyIsDown(RIGHT_ARROW)) {
            this.velocity.x = this.speed;
            this.direction = createVector(1, 0);
         }
         if (keyIsDown(UP_ARROW)) {
            this.velocity.y = -this.speed;
            this.direction = createVector(0, -1);
         }
         if (keyIsDown(DOWN_ARROW)) {
            this.velocity.y = this.speed;
            this.direction = createVector(0, 1);
         }
         // Normalises diagonal movement
         if (this.velocity.x !== 0 && this.velocity.y !== 0) {
         this.velocity.setMag(this.speed);
         }
      }*/

      super.update();
   }

   shootProjectile(){
      let projectile = new Projectile(bullet);
      projectile.direction = this.direction;
      //projectile.type = bullet;
      //projectile.velocity = 4;
      //projectile.widthModel = 10;
      //projectile.heightModel = 4;
      projectile.initLocation = (this.position.x - this.widthModel / 2, this.position.y - this.heightModel / 2, projectile.widthModel, projectile.heightModel);
   }

   pickupItem(){

   }
}
class Sprite extends Sprite {
   constructor(x, y){
      this.speed = this.speed * 2;
      this.projectileDirection = this.direction;
   }
}
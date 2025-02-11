class GameObject{
  constructor(x, y){
    this.position = createVector(x,y);
    this.velocity = createVector(0,0);
    
    this.widthHitbox = 30
    this.heightHitbox = 50
    
    this.widthModel = 40
    this.heightModel = 60
    
    this.color = color(40, 100, 40);
    this.isActive = true;
  }
  update(){
    if(this.isActive){
      this.position.add(this.velocity);
      
      // We can potentially add friction, gravity, walls
    }
  }
  isColliding(otherGameObject) {
    // Check if two game objects' hitboxes overlap
    return (
      this.position.x - this.widthHitbox/2 < otherGameObject.position.x + otherGameObject.widthHitbox/2 &&
      this.position.x + this.widthHitbox/2 > otherGameObject.position.x - otherGameObject.widthHitbox/2 &&
      this.position.y - this.heightHitbox/2 < otherGameObject.position.y + otherGameObject.heightHitbox/2 &&
      this.position.y + this.heightHitbox/2 > otherGameObject.position.y - otherGameObject.heightHitbox/2
    );
  }
  
  draw(){
    if(this.isActive){
      fill(this.color);
      rect(
        this.position.x - this.widthModel / 2, this.position.y - this.heightModel / 2, this.widthModel, this.heightModel
      );
    }
  }
}

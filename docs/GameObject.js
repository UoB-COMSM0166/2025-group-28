class GameObject{
  constructor(x, y){
    this.position = createVector(x,y);
    this.velocity = createVector(0,0);
    
    this.widthHitbox = 40
    this.heightHitbox = 60
    
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

  collidesWith(other) {
    // Check if the hitboxes of the two objects overlap
    return (
        this.position.x < other.position.x + other.widthHitbox &&
        this.position.x + this.widthHitbox > other.position.x &&
        this.position.y < other.position.y + other.heightHitbox &&
        this.position.y + this.heightHitbox > other.position.y
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

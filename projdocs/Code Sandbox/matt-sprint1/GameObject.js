class GameObject{
  constructor(x, y){
    this.position = createVector(x,y);
    this.velocity = createVector(0,0);
    
    this.widthHitbox = 30
    this.heightHitbox = 40
    
    this.widthModel = 30
    this.heightModel = 40
    
    //this.color = color(40, 100, 40);
    this.isActive = true;
  }
  update(){
    if(this.isActive){
      this.position.add(this.velocity);
      
      // We can potentially add friction, gravity, walls
    }
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
let astrocat;

class GameObject{
  constructor(x, y){
    this.position = createVector(x,y);
    this.velocity = createVector(0,0);
    
    this.widthHitbox = 70
    this.heightHitbox = 70
    
    this.widthModel = 70
    this.heightModel = 70
    
    this.color = color(40, 100, 40);
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

class Sprite extends GameObject {
  constructor(img, x, y, maxHealth = 100) {
    super(x, y);
    
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    
    this.img = img;
    
    this.speed = 5;
    this.direction = createVector(1, 0); //So the character starts facing right
    
    // Effects like taking damage, speed boost/reduction, etc.
    this.activeEffects = [];  // An array of effect type, effect duration, effect strength, etc.
    this.originalColor = this.color;
  }
  
  move() {
    // Updates the velocity based on the direction and speed
    this.velocity.set(0, 0);
    if(keyIsDown(LEFT_ARROW)){
      this.velocity.x = -this.speed;
    }
    if(keyIsDown(RIGHT_ARROW)){
      this.velocity.x = this.speed;
    }
    if(keyIsDown(UP_ARROW)){
      this.velocity.y = -this.speed;
    }
    if(keyIsDown(DOWN_ARROW)){
      this.velocity.y = this.speed;
    }
    
    //Makes speed feel smooth when moving diagonally
    if (this.velocity.x !== 0 && this.velocity.y !== 0) {
      this.velocity.setMag(this.speed);
    }
    
    // Applies the movement
    super.update();
  }
  
  isColliding(otherSprite) {
    // Check if two sprites' hitboxes overlap
    return (
      this.position.x - this.widthHitbox/2 < otherSprite.position.x + otherSprite.widthHitbox/2 &&
      this.position.x + this.widthHitbox/2 > otherSprite.position.x - otherSprite.widthHitbox/2 &&
      this.position.y - this.heightHitbox/2 < otherSprite.position.y + otherSprite.heightHitbox/2 &&
      this.position.y + this.heightHitbox/2 > otherSprite.position.y - otherSprite.heightHitbox/2
    );
  }
  
  takeDamage(amount) {
    this.health -= amount;
    
    // Checks if the sprite is dead
    if (this.health <= 0) {
      this.health = 0;
      this.isActive = false;
    }
  }
  
  draw() {
    if (this.isActive) {
      image(this.img, this.position.x,this.position.y, 70, 70)
      // Draws the sprite in
      fill(this.color);
      
      // Draws a health bar
      const healthBarWidth = this.widthModel * 0.6;
      const healthBarHeight = 5;
      const healthPercentage = this.health / this.maxHealth;
      
      // Health bar background
      fill(255, 0, 0);
      rect(
        this.position.x - healthBarWidth/2,
        this.position.y - this.heightModel/2 - 10,
        healthBarWidth,
        healthBarHeight
      );
      
      // Current health
      fill(0, 255, 0);
      rect(
        this.position.x - healthBarWidth/2,
        this.position.y - this.heightModel/2 - 10,
        healthBarWidth * healthPercentage,
        healthBarHeight
      );
    }
  }
}



let sprite;
function preload(){
  astrocat = loadImage("astrocat.png");
}
function setup() {
  createCanvas(800, 600);
  imageMode(CENTER);
  sprite = new Sprite(astrocat, 400, 300);
}

function draw() {
  background(0);
  
  
  sprite.move();
  sprite.draw();
  
  // Click space to damage the sprite
  if (keyIsDown(32)) {
    sprite.takeDamage(1);
  }
}

class Sprite extends GameObject {
  constructor(x, y, maxHealth = 100) {
    super(x, y);
    
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    
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
      // Draws the sprite in
      fill(this.color);
      rect(
        this.position.x - this.widthModel/2,
        this.position.y - this.heightModel/2,
        this.widthModel,
        this.heightModel
      );
      
      // Draws a health bar
      const healthBarWidth = this.widthModel;
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

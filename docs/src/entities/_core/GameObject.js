class GameObject {

  constructor(x, y) {
    this.position = createVector(x,y);
    this.velocity = createVector(0,0);

    this.widthHitbox = 40
    this.heightHitbox = 60

    this.widthModel = 40
    this.heightModel = 60

    this.color = color(40, 100, 40);
    this.isActive = true;
  }

  update() {
    if (this.isActive){
      this.position.add(this.velocity);

      // We can potentially add friction, gravity, walls
    }
    // Stops the object moving outside the outer walls (just in case)
    this.position.x = constrain(this.position.x, tileSize * 2,
      (roomWidth * tileSize) - tileSize * 2);
    this.position.y = constrain(this.position.y, tileSize * 2,
      (roomHeight * tileSize) - tileSize * 2);
  }

  // For detecting collisions between objects in collidables array (walls, other player etc)
  isColliding(x, y, w, h, collidables) {
    for (let i = 0; i < collidables.length; i++) {
      let collidable = collidables[i];
      if (
        // Width & height / 2 to account for how AstroCat is drawn :/
        x + (w / 2) > collidable.position.x &&
        x < collidable.position.x + collidable.widthHitbox &&
        y + (h / 2) > collidable.position.y &&
        y < collidable.position.y + collidable.heightHitbox &&
        collidable.isActive
      ) {
        return true;
      }
    }
    return false;
  }

  isCollidingWith(mob) {
    if (mob.isActive) {
      return(this.position.x < mob.position.x + mob.widthHitbox &&
        this.position.x + this.widthHitbox > mob.position.x &&
        this.position.y < mob.position.y + mob.heightHitbox &&
        this.position.y + this.heightHitbox > mob.position.y
      );
    }
  }

  draw() {
    if (this.isActive){
      fill(this.color);
      rect(
        this.position.x - this.widthModel / 2, this.position.y - this.heightModel / 2, this.widthModel, this.heightModel
      );
    }
  }

}

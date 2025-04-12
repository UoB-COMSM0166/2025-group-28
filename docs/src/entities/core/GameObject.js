class GameObject {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);

    this.widthHitbox = 40;
    this.heightHitbox = 60;

    this.widthModel = 40;
    this.heightModel = 60;

    this.color = color(40, 100, 40);
    this.isActive = true;
  }

  update() {
    if (this.isActive) {
      this.position.add(this.velocity);

      // We can potentially add friction, gravity, walls
    }
    // Stops the object moving outside the outer walls (just in case)
    this.position.x = constrain(
      this.position.x,
      tileSize * 2 + arena_offset,
      roomWidth * tileSize - tileSize * 2 + arena_offset
    );
    this.position.y = constrain(
      this.position.y,
      tileSize * 2 + arena_offset,
      roomHeight * tileSize - tileSize * 2 + arena_offset
    );
  }

  isCollidingWith(mob) {
    if (mob.isActive) {
      // Calculate the top-left corners based on center positions
      const thisLeft = this.position.x - this.widthHitbox / 2;
      const thisTop = this.position.y - this.heightHitbox / 2;

      const mobLeft = mob.position.x - mob.widthHitbox / 2;
      const mobTop = mob.position.y - mob.heightHitbox / 2;

      // Now use these adjusted positions in the collision test
      return (
        thisLeft < mobLeft + mob.widthHitbox &&
        thisLeft + this.widthHitbox > mobLeft &&
        thisTop < mobTop + mob.heightHitbox &&
        thisTop + this.heightHitbox > mobTop
      );
    }
  }

  draw() {
    if (this.isActive) {
      fill(this.color);
      rect(
        this.position.x - this.widthModel / 2,
        this.position.y - this.heightModel / 2,
        this.widthModel,
        this.heightModel
      );
    }
  }
}

class GameObject {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);

    this.widthHitbox = 40;
    this.heightHitbox = 60;

    this.widthModel = 40;
    this.heightModel = 60;

    this.isActive = true;
  }

  update() {
    if (!this.isActive) return;
    // Stops object moving beyond outer walls
    this.position.x = constrain(
      this.position.x,
      (tileSize * 2) + (this.widthHitbox / 2) + arena_offset,
      (roomWidth * tileSize) - (tileSize * 2) - (this.widthHitbox / 2) + arena_offset
    );
    this.position.y = constrain(
      this.position.y,
      (tileSize * 2) + (this.heightHitbox / 2) + arena_offset,
      (roomHeight * tileSize) - (tileSize * 2) - (this.heightHitbox / 2) + arena_offset
    );
    this.position.add(this.velocity);
  }

  isCollidingWith(entity) {
    if ((this && !this.isActive) || (entity && !entity.isActive)) return;
    // Calculate the top-left corners based on center positions
    const thisLeft = this.position.x - this.widthHitbox / 2;
    const thisTop = this.position.y - this.heightHitbox / 2;

    const entityLeft = entity.position.x - entity.widthHitbox / 2;
    const entityTop = entity.position.y - entity.heightHitbox / 2;

    // Now use these adjusted positions in the collision test
    return (
      thisLeft < entityLeft + entity.widthHitbox &&
      thisLeft + this.widthHitbox > entityLeft &&
      thisTop < entityTop + entity.heightHitbox &&
      thisTop + this.heightHitbox > entityTop
    );
  }
}

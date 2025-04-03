class Tile extends GameObject {
  constructor(type, x, y) {
    super();
    this.type = type;
    if (type == tileTypes.WALL) {
      this.widthHitbox = tileSize;
      this.heightHitbox = tileSize;
      this.position.x = tileSize * x + arena_offset;
      this.position.y = tileSize * y + arena_offset;
    }
  }
}

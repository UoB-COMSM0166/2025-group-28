class Tile extends GameObject {
  constructor(type, x, y) {
    super();
    this.type = type;
    if (this.type != tileTypes.FLOOR) {
      this.widthHitbox = tileSize;
      this.heightHitbox = tileSize;
      this.position.x = tileSize * x + arena_offset;
      this.position.y = tileSize * y + arena_offset;
      if (this.type == tileTypes.TRAP) {
        this.damage = game.difficultySettings.trapDamage;
      }
    }
  }
}

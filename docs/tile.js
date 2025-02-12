class Tile {
  constructor(type) {
    this.type = type;
    if (type == tileTypes.FLOOR) {
      this.isWalkable = true;
    } else {
      this.isWalkable = false;
    }

  }
}

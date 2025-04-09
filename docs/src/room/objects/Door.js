class Door extends GameObject {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.position.x = (tileSize * x) + arena_offset;
    this.position.y = (tileSize * y) + arena_offset;
    this.isUnlocked = false;
    this.sprite = doorImg;
  }

  update() {
    if (this.isUnlocked) {
      this.sprite = doorOpenImg;
    } else {
      this.sprite = doorImg;
    }
  }

  draw() {
    angleMode(DEGREES);
    if (this.x == 1) {
      // Door on left side of room
      push();
      imageMode(CENTER);
      translate(tileSize / 2, tileSize / 2);
      rotate(270);
      image(
        this.sprite,
        -tileSize * this.y - arena_offset,
        tileSize * this.x + arena_offset,
        tileSize * 4,
        tileSize
      );
      pop();
    } else if (this.x == roomWidth + (arena_offset / 9.5)) {
      // Door on right side of room
      push();
      imageMode(CENTER);
      translate(tileSize / 2, tileSize / 2);
      rotate(90);
      image(
        this.sprite,
        tileSize * this.y + arena_offset,
        -tileSize * this.x + arena_offset,
        tileSize * 4,
        tileSize
      );
      pop();
    } else if (this.y == roomHeight - 2) {
      // Door at bottom of room
      push();
      scale(1, -1);
      image(
        this.sprite,
        tileSize * this.x + arena_offset,
        -tileSize * (this.y + 1) - arena_offset,
        tileSize * 4,
        tileSize
      );
      pop();
    } else if (this.y == 1) {
      // Door at top of room
      image(
        this.sprite,
        tileSize * this.x + arena_offset,
        tileSize * this.y + arena_offset,
        tileSize * 4,
        tileSize
      );
    }
  }
}

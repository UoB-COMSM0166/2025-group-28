class Door extends GameObject {

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.position.x = tileSize * x;
    this.position.y = tileSize * y;
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
    if (this.x == roomWidth - 2) { // Door on right side of room
      push();
      imageMode(CENTER);
      translate(tileSize / 2, tileSize / 2);
      rotate(90);
      image(this.sprite, tileSize * this.y, -tileSize * this.x, tileSize * 4, tileSize);
      pop();
    } else if (this.y == roomHeight - 2) { // Door at bottom of room
      push();
      scale(1, -1);
      image(this.sprite, tileSize * this.x, -tileSize * (this.y + 1), tileSize * 4, tileSize);
      pop();
    } else if (this.y == 1) { // Door at top of room
      image(this.sprite, tileSize * this.x, tileSize * this.y, tileSize * 4, tileSize);
    }
  }

}
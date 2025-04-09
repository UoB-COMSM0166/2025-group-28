class Heart extends Item {
  constructor(x, y, image) {
    super(x, y, image);
  }

  draw() {
    image(this.image, this.position.x - 20, this.position.y - 20, 30, 30);
  }
}

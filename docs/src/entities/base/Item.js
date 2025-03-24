class Item extends GameObject {
   constructor(x, y, image) {
      super(x, y)
      this.widthHitbox = 10;
      this.heightHitbox = 10;
      this.widthModel = 10;
      this.heightModel = 10;
      this.image = image;
   }

   draw() {
      image(this.image, 0, 0, 16, 16);
   }

}
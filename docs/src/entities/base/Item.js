class Item extends GameObject {
   constructor(x, y, image) {
      super(x, y)
      this.widthHitbox = 40;
      this.heightHitbox = 40;
      this.widthModel = 40;
      this.heightModel = 40;
      this.image = image;
   }
}
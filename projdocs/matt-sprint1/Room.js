class Room {
   constructor() {
      this.roomType = getType(); // doesnt exist for now
      this.isCleared = false;
      this.mobs = [];
      this.items = [];
      this.door = new Door();
      this.tiles = []; // 2d array of tiles;
   }

   checkClear() {
      let cleared = true;
      for (let mob of this.mobs) {
         if (mob.isDead() == false) { // isDead method deosnt exist atm
            cleared = true;
         }
      }
      if (cleared == true) this.isCleared = true;
   }

   generateMobs(numOfMobs) {
      for (let i = 0; i < numOfMobs; i++) {
         let newMob = new Mob(); // class deosnt exist rn
         this.mobs.push(newMob);
      }
   }

   

}
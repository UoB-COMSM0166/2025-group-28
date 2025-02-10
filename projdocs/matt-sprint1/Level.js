class Level { 
   constructor(levelNum) { // Game class will need a method that creates new levels
      this.levelNum = levelNum; 
      this.roomsRemaining = 5; // this should be a randomly generated num between say 3 and 6..
      this.currentRoom = new Room();
      this.isCleared = false; // should be publicly accessible from Game?
      this.difficultyMultiplier = 1;
   }

   // if currentRoom.isCleared() then call the 3 methods below in order
   reduceRoomsRemaining() {
      this.roomsRemaining--;
   }

   checkClear() {
      if (this.roomsRemaining == 0) {
         this.isCleared = true;
      }
   }

   goToNextRoom() {
      // if player is within certain range of door
      this.currentRoom = new Room();
   }

   nextLevel() {
      this.levelNum++;
      this.roomsRemaining = 5;
      this.goToNextRoom();
      this.isCleared = false;
      this.difficultyMultiplier += 0.02;
   }

   



}
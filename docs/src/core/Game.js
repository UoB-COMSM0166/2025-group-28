class Game {

  constructor(difficultyLevel = difficultyLevels.NORMAL) {
    this.gameState = GameStates.ACTIVE;
    this.difficulty = difficultyLevel;
    this.difficultySettings = difficultySettings[this.difficulty];
    this.currentRoom = new Room(this.difficultySettings);
  }

  processInput() {
    //console.log();

    if (keyIsDown(LEFT_ARROW)) {
      // playerB.move(MoveDirections.LEFT);
    }
  }

  nextRoom() {
    this.currentRoom.destroyRoom();
    this.currentRoom = null;
    this.currentRoom = new Room(this.difficultySettings);
  }

  draw() {
    this.currentRoom.draw();
    this.currentRoom.update();
    this.currentRoom.spawnMobWrapper();
  }
}

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
    if (coop) {
      if (playerA.isActive ^ playerB.isActive) {
        if (!playerA.isActive) {
          playerA = null;
          playerA = new Player(astrocat_gif, 200, 300, playerNumber.PLAYER_1);
          playerA.health = 50;
          playerADeathCount++;
        } else {
          playerB = null;
          playerB = new Player(astrocat_gif_p2, 300, 300, playerNumber.PLAYER_2);
          playerB.health = 50;
          playerBDeathCount++;
        }
      }
    }
  }

  draw() {
    this.currentRoom.draw();
    this.currentRoom.update();
    this.currentRoom.spawnMobWrapper();
  }
}

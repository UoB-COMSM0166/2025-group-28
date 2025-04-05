class Game {
  constructor(difficultyLevel = difficultyLevels.NORMAL) {
    this.gameState = GameStates.ACTIVE;
    this.difficulty = difficultyLevel;
    this.difficultySettings = difficultySettings[this.difficulty];
    if (pvpMode == true) {
      this.currentRoom = new Room(this.difficultySettings);
    } else {
      this.currentRoom = new PvPRoom();
    }
    

    this.meta_score = 0;
    this.score = 0;
    this.frameCount = 0;
    this.timeCounter = 0;

    this.roomSeq = 1;
  }

  processInput() {
    //console.log();

    if (keyIsDown(LEFT_ARROW)) {
      // playerB.move(MoveDirections.LEFT);
    }
  }

  nextRoom() {
    this.roomSeq++;
    this.meta_score += 1000 / this.timeCounter;
    this.timeCounter = 0;

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
          playerB = new Player(
            astrocat_gif_p2,
            300,
            300,
            playerNumber.PLAYER_2
          );
          playerB.health = 50;
          playerBDeathCount++;
        }
      }
    }
  }

  draw() {
    this.frameCount++;
    if (this.frameCount % 600 == 0) {
      this.timeCounter++;
    }
    this.score = Math.round(
      this.currentRoom.roomScoreAccumaltor + this.meta_score
    );
    this.currentRoom.draw();
    this.currentRoom.update();
    if (!pvpMode) this.currentRoom.spawnMobWrapper();
  }
}

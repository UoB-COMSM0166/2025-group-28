class Game {
  constructor(difficultyLevel = difficultyLevels.NORMAL) {
    this.gameState = GameStates.ACTIVE;
    this.difficulty = difficultyLevel;
    this.difficultySettings = difficultySettings[this.difficulty];
    if (!pvpMode) {
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

  nextRoom() {
    this.roomSeq++;
    behaviourMonitor.updateRoomsCleared();
    // Clear projectile array to stop projectiles fired in previous room from persisting in next room
    projectileManager.projectilesFired.splice(0, projectileManager.projectilesFired.length);
    if (this.timeCounter > 0) {
      this.meta_score += 1000 / this.timeCounter;
    }
    this.timeCounter = 0;

    this.currentRoom = null;
    if (pvpMode) {
      this.currentRoom = new PvPRoom();
      playerA = new Player(astrocat_gif, 200, 300, playerNumber.PLAYER_1);
      playerB = new Player(astrocat_gif_p2, 800, 300, playerNumber.PLAYER_2);
    } else {
      this.currentRoom = new Room(this.difficultySettings);
      // Allow spawning buff mob if player has cleared 3+ rooms (only on normal, hard or coop)
      if ((this.difficulty != difficultyLevels.EASY || coop) && behaviourMonitor.getRoomsCleared() >= 3) {
        this.currentRoom.canSpawnBuffMob = true;
      }
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
      // Set player positions in room relative to door in previous room
      playerA.position.x = playerNextX;
      playerA.position.y = playerNextY;
      if (coop) {
        playerB.position.x = playerNextX;
        playerB.position.y = playerNextY;
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
    projectileManager.update();
    if (!pvpMode) this.currentRoom.spawnMobWrapper();
  }
}

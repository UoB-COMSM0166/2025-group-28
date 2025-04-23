class Game {
  constructor(difficultyLevel = difficultyLevels.NORMAL) {
    this.gameState = GameStates.ACTIVE;
    if (!pvpMode) {
      this.difficulty = difficultyLevel;
      this.difficultySettings = difficultySettings[this.difficulty];
      this.currentRoom = new Room(this.difficultySettings);
      this.slowMeowHandler = new SlowMeowHandler(this);
    } else {
      this.difficulty = difficultyLevels.NORMAL;
      this.difficultySettings = difficultySettings[this.difficulty];
      this.currentRoom = new PvPRoom();
    }

    // Score variables
    this.prevScoreP1 = 0;
    this.currScoreP1 = 0;
    this.prevScoreP2 = 0;
    this.currScoreP2 = 0;

    this.roomSeq = 1;

    this.p1PVPTotal = 0;
    this.p2PVPTotal = 0;
    this.p1ScoreIncreased = false;
    this.p2ScoreIncreased = false;
    this.winningPVP;
  }

  nextRoom() {
    this.roomSeq++;
    // Clear projectile array to stop projectiles in previous room persisting in next room
    projectileManager.projectilesFired = [];
    this.updateScores();
    if (!pvpMode) {
      behaviourMonitor.updateRoomsCleared();
      // End slow meow to prevent movement speed bugs on room transition
      this.slowMeowHandler.reset();
      // Set up next room
      this.currentRoom = new Room(this.difficultySettings);
      if (coop) {
        if (!playerA.isActive) {
          playerADeathCount++;
          playerA = this.revivePlayer(playerA, this.prevScoreP1);
        } else if (!playerB.isActive) {
          playerBDeathCount++;
          playerB = this.revivePlayer(playerB, this.prevScoreP2);
        }
      }
      playerA.resetOverheat();
      // Set player positions in room relative to door in previous room
      playerA.position.x = playerNextX;
      playerA.position.y = playerNextY;
      if (coop) {
        playerB.resetOverheat();
        playerB.position.x = playerNextX;
        playerB.position.y = playerNextY;
      }
    } else {
      if (!this.pvpCheckmate()) {
        this.currentRoom = new PvPRoom();
        playerA = new Player(astrocat_gif, 160, 300, playerNumber.PLAYER_1);
        playerB = new Player(astrocat_gif_p2, 835, 300, playerNumber.PLAYER_2);
      }
    }
  }

  revivePlayer(player, playerScore) {
    player = new Player(player.img, playerNextX, playerNextY, player.player);
    player.health = 50;
    this[playerScore] = Math.max(0, this[playerScore] - 300);
    return player;
  }

  pvpCheckmate() {
    let winThreshhold = pvp_rounds == 1 ? 1 : Math.round(pvp_rounds / 2);
    let gameWon =
      this.p1PVPTotal == winThreshhold || this.p2PVPTotal == winThreshhold;

    console.log("*** " + gameWon);
    return gameWon;
  }

  pvpGameCycleCheck() {
    if (this.currScoreP1 >= 2 || this.currScoreP2 >= 2) {
      if (this.roomSeq < pvp_rounds && !transitioning && !this.pvpCheckmate()) {
        console.log("next room");
        transitioning = true;
        setTimeout(() => {
          fadingOut = true;
        }, 3000);
      } else if (this.roomSeq >= pvp_rounds) {
        if (this.currScoreP1 >= 2 && !this.p1ScoreIncreased) {
          this.p1PVPTotal++;
          this.p1ScoreIncreased = true;
        }
        if (this.currScoreP2 >= 2 && !this.p2ScoreIncreased) {
          this.p2PVPTotal++;
          this.p2ScoreIncreased = true;
        }
      }
    }
  }

  checkIfGameOver() {
    if (
      (!playerA.isActive && !coop && !pvpMode) ||
      (coop && !playerA.isActive && !playerB.isActive) ||
      (pvpMode && this.pvpCheckmate())
    ) {
      setTimeout(() => {
        this.gameState = GameStates.OVER;
      }, 3000);
    }
  }

  draw() {
    if (pvpMode) this.pvpGameCycleCheck();
    this.checkIfGameOver();
    if (!pvpMode) {
      this.currScoreP1 = Math.round(
        this.currentRoom.roomScoreAccumaltor + this.prevScoreP1
      );
      if (coop) {
        this.currScoreP2 = Math.round(
          this.currentRoom.roomScoreAccumaltor + this.prevScoreP2
        );
      }
    } else {
      this.currScoreP1 = this.currentRoom.p1Score;
      this.currScoreP2 = this.currentRoom.p2Score;
    }

    this.currentRoom.draw();
    this.currentRoom.update();
    projectileManager.update();
    if (!pvpMode) {
      this.slowMeowHandler.update();
      this.currentRoom.spawnMobWrapper();
      if (this.slowMeowHandler.occurring) {
        PlayerHUD.drawSlowMeow(this);
      }
    }
  }

  calculateScore(damageDealt, damageTaken) {
    if (!coop && !pvpMode) {
      let bonus = (damageDealt / (damageTaken + 10)) * 10 - 120;
      if (bonus < 0) return 0;
      if (bonus > 300) return 300;
      return bonus;
    } else if (coop) {
      let bonus = (damageDealt / (damageTaken + 10)) * 10 - 80;
      if (bonus < 0) return 0;
      if (bonus > 300) return 300;
      return bonus;
    }
  }

  updateScores() {
    if (pvpMode) {
      if (this.currScoreP1 >= 2) {
        this.p1PVPTotal++;
      }
      if (this.currScoreP2 >= 2) {
        this.p2PVPTotal++;
      }
      this.currScoreP1 = 0;
      this.currScoreP2 = 0;
    } else {
      this.currScoreP1 += this.calculateScore(
        this.currentRoom.damageDealtP1,
        this.currentRoom.damageTakenP1
      );
      this.prevScoreP1 = this.currScoreP1;
      this.currScoreP1 = 0;

      if (coop) {
        this.currScoreP2 += this.calculateScore(
          this.currentRoom.damageDealtP2,
          this.currentRoom.damageTakenP2
        );
        this.prevScoreP2 = this.currScoreP2;
        this.currScoreP2 = 0;
      }
    }
  }
}

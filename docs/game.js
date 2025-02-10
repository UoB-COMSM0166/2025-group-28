const GameStates = Object.freeze({
  ACTIVE: 0,
});

class Game {
  constructor(lvlNum, player1, player2) {
    this.lvl_num = lvlNum;
    this.currentRoom = 0;
    this.gameState = GameStates.ACTIVE;
    this.player_1 = player1;
    this.player_2 = player2;
    this.level = new Level(lvlNum);
  }

  update() {
    this.player_1.update();
    this.player_2.update();
    for (m in this.level.currentRoom.mobs) {
      m.update();
    }
    // similar for projectiles
  }
  draw() {
    // Mobs draw
    this.player_1.draw();
    this.player_2.draw();

    for (m in this.level.currentRoom.mobs) {
      m.draw();
    }
  }

  handlleInput(key) {}
}

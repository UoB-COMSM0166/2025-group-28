class Game {
  // Arrays to keep track of active game assets

  constructor(lvlNum, player) {
    this.lvl_num = lvlNum;
    this.currentRoom = 0;
    this.gameState = 0;
    this.player = player;

    this.level = new Level(lvlNum);
  }

  handlleInput(key) {}
}

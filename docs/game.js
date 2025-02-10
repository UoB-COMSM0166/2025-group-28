const GameStates = Object.freeze({
  ACTIVE: 0,
});

class Game {
  constructor(lvlNum, player1) {
    this.lvl_num = lvlNum;
    this.currentRoom = 0;
    this.gameState = GameStates.ACTIVE;
    this.player_1 = player1;
    this.level = new Level(lvlNum);
    this.sprites = { player1 };
  }

  registerSprite(sprite) {
    this.sprites.push(sprite);
  }
  update() {
    // similar for projectiles
    for (let s of this.sprites) {
      s.update();
    }
  }

  draw() {
    // Mobs draw
    for (let s of this.sprites) {
      s.draw();
    }
  }
}

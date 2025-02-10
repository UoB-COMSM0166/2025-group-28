const GameStates = Object.freeze({
  ACTIVE: 0,
});

class Game {
  constructor(lvlNum, player1) {
    this.lvl_num = lvlNum;
    this.currentRoom = 0;
    this.gameState = GameStates.ACTIVE;
    this.player_1 = player1;

    // Instantiate a new level object with initial level value

    this.level = new Level(lvlNum);

    // Start with just players (1 or 2)
    this.sprites = { player1 };
  }

  // FOR NOW - when a sprite is created it is registered to the game, so it is included in draw/update call

  registerSprite(sprite) {
    this.sprites.push(sprite);
  }

  // Game object is 'single source of truth' for drawing the gameplay - sprite update/draw methods should only be called by the game object

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

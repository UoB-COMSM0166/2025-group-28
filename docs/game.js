const GameStates = Object.freeze({
  ACTIVE: 0,
});

class Game {
  constructor(room, player) {
    //this.lvl_num = lvlNum;
    this.currentRoom = room;
    this.gameState = GameStates.ACTIVE;
    this.sprites = [];
    this.player1 = player;
    this.sprites.concat(room.mobs).concat(room.items);
  }

  // FOR NOW - when a sprite is created it is registered to the game, so it is included in draw/update call

  // Game object is 'single source of truth' for drawing the gameplay - sprite update/draw methods should only be called by the game object

  playerChange(player) {
    this.player1 = player;
  }
  update() {
    // similar for projectiles
    for (let s of this.sprites) {
      s.update();
    }
    this.player1.update();
  }

  draw() {
    // Mobs draw
    this.currentRoom.draw();
    for (let s of this.sprites) {
      s.draw();
    }
    this.player1.move();

    this.player1.draw();
  }
}

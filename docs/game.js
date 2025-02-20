class Game {
  constructor(room, player_1, player_2) {
    //this.lvl_num = lvlNum;
    this.currentRoom = room;
    this.gameState = GameStates.ACTIVE;
    this.sprites = [];
    this.spritesP1 = []; // this currently holds things that are "collidable"
    this.spritesP2 = []; // this currently holds things that are "collidable"
    this.player1 = player_1;
    this.player2 = player_2;
    this.sprites.concat(room.mobs).concat(room.items);
    this.spritesP1.concat(room.mobs).concat(room.items);
    this.spritesP2.concat(room.mobs).concat(room.items);
    this.spritesP1.push(this.player2);
    this.spritesP2.push(this.player1);
    this.sprites.push(testMob);
    this.spritesP1.push(testMob);
    this.spritesP2.push(testMob);
    // this.addWallCollisions();
    //this.sprites.push(this.player2);
    this.halt = false;
  }

  // FOR NOW - when a sprite is created it is registered to the game, so it is included in draw/update call

  // Game object is 'single source of truth' for drawing the gameplay - sprite update/draw methods should only be called by the game object

  // addWallCollisions() {
  //   for (let j = 0; j < this.currentRoom.roomLayout.length; j++) {
  //     for (let i = 0; i < this.currentRoom.roomLayout[j].length; i++) {
  //       if (this.currentRoom.roomLayout[j][i].type == tileTypes.WALL) {
  //         this.spritesP1.push(this.currentRoom.roomLayout[j][i]);
  //         this.spritesP2.push(this.currentRoom.roomLayout[j][i]);
  //       }
  //     }
  //   }
  // }


  processInput() {
    console.log();

    if (keyIsDown(LEFT_ARROW)) {
      // this.player2.move(MoveDirections.LEFT);
    }
  }

  playerChange(player) {
    //this.player1 = player;
  }
  update() {
    // similar for projectiles
    for (let s of this.sprites) {
      s.update();
    }

    this.player2.updateHealth();
    this.player2.update();

    this.player1.updateHealth();
    this.player1.update();
  }

  draw() {
    // Mobs draw
    this.currentRoom.draw();
    for (let s of this.sprites) {
      s.draw();
    }
    this.player1.move();
    this.player1.haltIfColliding(this.spritesP1);
    this.player2.move();
    this.player2.haltIfColliding(this.spritesP2);

    this.player1.draw();
    this.player2.draw();
  }
}

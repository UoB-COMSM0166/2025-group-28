class Game {
  constructor(room, player_1, player_2, coop) {
    //this.lvl_num = lvlNum;
    this.currentRoom = room;
    this.gameState = GameStates.ACTIVE;
    this.sprites = [];
    this.spritesP1 = [];
    this.collidablesP1 = []; // this currently holds things that are "collidable"
    if (coop) {
      this.collidablesP2 = []; // this currently holds things that are "collidable"
      this.player2 = player_2;
      this.spritesP2 = [];
      this.spritesP2.concat(room.mobs).concat(room.items);
      this.spritesP2.push(this.player1);
      this.spritesP1.push(this.player2);
      this.collidablesP2.push(testMob);
      this.collidablesP2.concat(room.mobs).concat(room.items);
      this.collidablesP1.push(this.player2);
    }
    this.player1 = player_1;
    this.sprites.concat(room.mobs).concat(room.items);

    this.spritesP1.concat(room.mobs).concat(room.items);

    this.sprites.push(testMob);
    this.collidablesP1.push(testMob);
    //this.sprites.push(this.player2);
    this.halt = false;
    this.collidablesP1.concat(room.mobs).concat(room.items);
    this.addWallCollisions();
    // this.sprites.push(this.player2);
  }

  // FOR NOW - when a sprite is created it is registered to the game, so it is included in draw/update call

  // Game object is 'single source of truth' for drawing the gameplay - sprite update/draw methods should only be called by the game object

  addWallCollisions() {
    for (let j = 0; j < roomHeight; j++) {
      for (let i = 0; i < roomWidth; i++) {
        if (this.currentRoom.roomLayout[j][i].type == tileTypes.WALL) {
          this.collidablesP1.push(this.currentRoom.roomLayout[j][i]);
          if (coop) {
            this.collidablesP2.push(this.currentRoom.roomLayout[j][i]);
          }
        }
      }
    }
  }

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
    for (let p of this.player1.projectilesFired) {
      p.update();
    }
    if (coop) {
      for (let p of this.player2.projectilesFired) {
        p.update();
      }
    }

    for (let s of this.sprites) {
      s.update();
    }
    if (coop) {
      this.player2.update();
    }
    this.player1.update();
  }

  draw() {
    // Mobs draw
    this.currentRoom.draw();
    for (let s of this.sprites) {
      s.draw();
    }
    for (let p of this.player1.projectilesFired) {
      p.draw();
    }

    if (coop) {
      for (let p of this.player2.projectilesFired) {
        p.draw();
      }
    }

    this.player1.move();
    if (coop) {
      this.player2.move();
    }
    this.player1.fire();

    if (coop) {
      this.player2.fire();
    }

    this.player1.draw();

    if (coop) {
      this.player2.draw();
    }

    // projectile collision checking - i think this ultimately needs be a loop within a loop check for a mob array
    for (let i = this.player1.projectilesFired.length - 1; i >= 0; i--) {
      if (this.player1.projectilesFired[i].isCollidingWith(testMob)) {
        this.player1.projectilesFired.splice(i, 1);
        testMob.takeDamage(this.player1.attackDamage);
      }
    }
    if (coop) {
      for (let i = this.player2.projectilesFired.length - 1; i >= 0; i--) {
        if (this.player2.projectilesFired[i].isCollidingWith(testMob)) {
          this.player2.projectilesFired.splice(i, 1);
          testMob.takeDamage(this.player1.attackDamage);
        }
      }
    }
  }
}

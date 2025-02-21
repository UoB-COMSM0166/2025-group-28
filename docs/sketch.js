/* GLOBAL CONSTANTS */
let game;
let asset_astrocat;
let newRoom;
let testMob;

function setup() {
  noStroke();
  rectMode(CORNER);
  createCanvas(800, 600);

  newRoom = new Room();
  newRoom.initRoom();

  playerA = new Player(astrocat, 200, 300, playerNumber.PLAYER_1);
  playerB = new Player(astrocat, 300, 300, playerNumber.PLAYER_2);
  testMob = new Mob(dogMob, 700, 350);

  game = new Game(newRoom, playerA, playerB);

  let button = createButton("Generate New Room");
  button.position(0, roomHeight * tileSize + 10);
  button.mousePressed(() => {
    newRoom.initRoom();
    playerA = new Player(astrocat, 400, 300, playerNumber.PLAYER_1);
    playerB = new Player(astrocat, 500, 300, playerNumber.PLAYER_2);

    testMob = new Mob(dogMob, 600, 350);
    game.playerChange(player);

    // Temp way to reset contents of collidables arrays
    // (otherwise old wall collisions will persist on new room)
    game = new Game(newRoom, playerA, playerB);
    //game.playerChange(Player);
  });
}

function draw() {
  // background(50, 11, 28);

  if (game.gameState == GameStates.ACTIVE) {
    //console.log("drawing");
    game.update();
    game.draw();
  }

  if(playerA.isCollidingWith(testMob)){
    playerA.takeDamage(testMob.attackDamage);
  }
  if(playerB.isCollidingWith(testMob)){
    playerB.takeDamage(testMob.attackDamage);
  }
}

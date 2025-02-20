/* GLOBAL CONSTANTS */
let game;
let asset_astrocat;
let newRoom;

function setup() {
  noStroke();
  createCanvas(800, 600);

  newRoom = new Room();
  newRoom.initRoom();

  playerA = new Player(astrocat, 400, 300, playerNumber.PLAYER_1);
  playerB = new Player(astrocat, 500, 300, playerNumber.PLAYER_2);
  testMob = new Mob(dogMob, 600, 350);

  game = new Game(newRoom, playerA, playerB);

  let button = createButton("Generate New Room");
  button.position(0, roomHeight * tileSize + 10);
  button.mousePressed(() => {
    newRoom.initRoom();
    playerA = new Player(astrocat, 400, 300, playerNumber.PLAYER_1);
    playerB = new Player(astrocat, 500, 300, playerNumber.PLAYER_2);
    testMob = new Mob(dogMob, 600, 350);
    game.playerChange(player);
  });
}

function draw() {
  // background(50, 11, 28);

  if (game.gameState == GameStates.ACTIVE) {
    console.log("drawing");
    game.update();
    game.draw();
  }

  if(player.isCollidingWith(mob)){
    player.takeDamage(mob.attackDamage);
  }
}

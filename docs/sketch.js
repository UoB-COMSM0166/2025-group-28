/* GLOBAL CONSTANTS */
let game;
let asset_astrocat;
let newRoom;

function setup() {
  noStroke();
  createCanvas(800, 600);

  newRoom = new Room();
  newRoom.initRoom();
  player = new Sprite(astrocat, 400, 300);

  game = new Game(newRoom, player);

  let button = createButton("Generate New Room");
  button.position(0, roomHeight * tileSize + 10);
  button.mousePressed(() => {
    newRoom.initRoom();
    player = new Sprite(astrocat, 400, 300);
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
}

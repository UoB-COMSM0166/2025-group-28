/* GLOBAL CONSTANTS */
let game;
let asset_astrocat;

function preload() {
  // preload images in to global vars here

  asset_astrocat = loadImage("./Sprites/astrocat.png");
}

function setup() {
  createCanvas(750, 750);

  game = new Game();
}

function draw() {
  background(10, 11, 28);
  var sprite = new Sprite(100, 100, 100);

  if (game.currentStatus == GameStatus.ACTIVE) {
    game.update();
    game.draw();
  }
}

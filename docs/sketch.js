/* GLOBAL CONSTANTS */
let game;
let asset_astrocat;
let newRoom;
let testMob;

let coop = false;
let inGame = false;
let menuBack;
let sp_button;
let coop_button;
let stng_button;

function gameSwitch(starting) {
  // Used to switch between game start/menu
  if (starting) {
    gameSetUp();
    sp_button.remove();
    coop_button.remove();
    menuBack.remove();
    stng_button.remove();
    inGame = true;
  }
}
function singlePlayerStart() {
  coop = false;
  gameSwitch(true);
}
function coopPlayerStart() {
  coop = true;
  gameSwitch(true);
}

function renderMenu() {
  menuBack = createImg(menuimg);
  menuBack.position(0, 0);

  sp_button = createImg(singlePlayerIcon);
  sp_button.position(pageWidth / 4, pageHeight * 0.75);
  sp_button.size(150, 200);
  sp_button.mouseClicked(singlePlayerStart);

  coop_button = createImg(coopIcon);
  coop_button.position(pageWidth / 2, pageHeight * 0.75);
  coop_button.size(150, 200);
  coop_button.mouseClicked(coopPlayerStart);

  stng_button = createImg(helpIcon);
  stng_button.position(pageWidth * 0.75, pageHeight * 0.75);
  stng_button.size(150, 200);
}

function gameSetUp() {
  loop();
  newRoom = new Room();
  newRoom.initRoom();

  playerA = new Player(astrocat, 200, 300, playerNumber.PLAYER_1);
  if (coop) {
    playerB = new Player(astrocat, 300, 300, playerNumber.PLAYER_2);
  }
  testMob = new Mob(dogMob, 700, 350);

  game = new Game(newRoom, playerA, playerB, coop);

  let button = createButton("Generate New Room");
  button.position(0, roomHeight * tileSize + 10);
  button.mousePressed(() => {
    newRoom.initRoom();
    playerA = new Player(astrocat, 400, 300, playerNumber.PLAYER_1);
    if (coop) {
      playerB = new Player(astrocat, 500, 300, playerNumber.PLAYER_2);
    }

    testMob = new Mob(dogMob, 600, 350);
    game.playerChange(player);

    // Temp way to reset contents of collidables arrays
    // (otherwise old wall collisions will persist on new room)
    game = new Game(newRoom, playerA, playerB);
    //game.playerChange(Player);
  });
}
function setup() {
  noStroke();
  rectMode(CORNER);
  createCanvas(800, 600);
  if (inGame) {
    gameSetUp();
  } else {
    renderMenu();
  }
}

function draw() {
  if (inGame) {
    if (game.gameState == GameStates.ACTIVE) {
      game.update();
      game.draw();
    }

    if (playerA.isCollidingWith(testMob)) {
      playerA.takeDamage(testMob.attackDamage);
    }

    if (coop) {
      if (playerB.isCollidingWith(testMob)) {
        playerB.takeDamage(testMob.attackDamage);
      }
    }
  }
}

function keyPressed() {
  if (inGame) {
    if (keyCode === ESCAPE) {
      if (game.gameState == GameStates.ACTIVE) {
        game.gameState = GameStates.PAUSE;
        noLoop();
      } else {
        loop();
        game.gameState = GameStates.ACTIVE;
      }
    }
  }
}

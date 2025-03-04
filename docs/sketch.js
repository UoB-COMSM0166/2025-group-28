/* GLOBAL CONSTANTS */
let game;
let asset_astrocat;
let newRoom;
let testMob;

let coop = false;
let inGame = false;
let debug = false;
let menuBack;
let sp_button;
let coop_button;
let stng_button;

let difficulty = difficultyLevels.NORMAL;
let difficultyNames = ["Easy", "Normal", "Hard"];
let difficultyTints = ["#4d63445A", "#a6aba45A", "#ba29225A"];
let diffTint = difficultyTints[1];
let difficultyButton;

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

function gameSwitch(starting) {
  // Used to switch between game start/menu
  if (starting) {
    sp_button.remove();
    coop_button.remove();
    menuBack.remove();
    stng_button.remove();
    difficultyButton.remove();
    inGame = true;
    gameSetUp();
    loop();
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
  menuBack.size(pageWidth, pageHeight);

  sp_button = createImg(singlePlayerIcon);
  sp_button.position(pageWidth / 9, pageHeight * 0.62);
  sp_button.size(120, 170);
  sp_button.mouseClicked(singlePlayerStart);

  coop_button = createImg(coopIcon);
  coop_button.position(pageWidth / 3 + 75, pageHeight * 0.62);
  coop_button.size(120, 170);
  coop_button.mouseClicked(coopPlayerStart);

  stng_button = createImg(helpIcon);
  stng_button.position(pageWidth * 0.75, pageHeight * 0.62);
  stng_button.size(120, 170);

  difficultyButton = createButton("Difficulty: " + difficultyNames[difficulty]);
  difficultyButton.position(pageWidth / 3 + 60, pageHeight * 0.9);
  difficultyButton.mouseClicked(changeDifficulty);
  difficultyButton.size(160, 55);
  difficultyButton.class("menu-button");
  difficultyButton.style("background-color", diffTint);
  difficultyButton.style("color", "white");
  difficultyButton.style("padding", "10px 10px");
  difficultyButton.style("font-size", "20px");
  difficultyButton.style("font-family", "LuckiestGuy-Regular");
  difficultyButton.style("border", "none");
  difficultyButton.style("text-align", "center");
  difficultyButton.style("vertical-align", "middle");
  difficultyButton.style("border-radius", "10%");
}

function changeDifficulty() {
  if (difficulty < difficultyNames.length - 1) {
    difficulty = difficulty + 1;
    diffTint = difficultyTints[difficulty];
  } else {
    difficulty = 0;
    diffTint = difficultyTints[difficulty];
  }
  difficultyButton.style("background-color", diffTint);
  difficultyButton.html("Difficulty: " + difficultyNames[difficulty]);
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

  game = new Game(newRoom, playerA, playerB, coop, difficulty);

  let button = createButton("Generate New Room");
  button.position(0, roomHeight * tileSize + 10);
  button.mousePressed(() => {
    newRoom.initRoom();
    playerA = new Player(astrocat, 400, 300, playerNumber.PLAYER_1);
    if (coop) {
      playerB = new Player(astrocat, 500, 300, playerNumber.PLAYER_2);
    }

    testMob = new Mob(dogMob, 600, 350);

    // Temp way to reset contents of collidables arrays
    // (otherwise old wall collisions will persist on new room)
    game = new Game(newRoom, playerA, playerB, coop, difficulty);

    game.playerChange(Player);
  });
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
    // 192 = ` (key under Esc)
    if (keyCode == 192) {
      if (!debug) {
        debug = true;
      } else {
        debug = false;
      }
    }
  }
}

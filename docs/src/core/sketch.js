/* GLOBAL CONSTANTS */
let game;
let projectileManager;
let behaviourMonitor;

let playerA;
let playerB;
let roomButton = null;
let pvpMode = false;

let gameCanvas;
let themeMusic;

let coop = false;
let inGame = false;
let childMode = false;
let debug = false;
let menuBack;
let sp_button;
let coop_button;
let stng_button;
let pvp_button;

let game_over_back;
let scoretotal;
let returnToMenu;

let difficulty = difficultyLevels.EASY;
let difficultyNames = ["Kitten", "Hunter", "Apex"];
let difficultyTints = ["#4d63445A", "#a6aba45A", "#ba29225A"];
let diffTint = difficultyTints[0];
let difficultyButton;

let gameOver = false;
let gameCount = 1;
let playerADeathCount = 0;
let playerBDeathCount = 0;

// Screen fade vars
let fadeAlpha = 0;
let fadingOut = false;
let fadingIn = false;
let transitioning = false;

// Room transition positioning vars
let doorPrevPos = null;
let playerNextX, playerNextY;

let frame = 0;

function setup() {
  noStroke();
  rectMode(CORNER);
  gameCanvas = createCanvas(950, 800);
  // Prevent the user from right-clicking on the canvas
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
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
    pvp_button.remove();
    menuBack.remove();
    stng_button.remove();
    difficultyButton.remove();
    inGame = true;

    gameSetUp();
    loop();
    //theme_a.play();
  } else {
    inGame = false;
    gameOver = false;
    game = null;
    projectileManager = null;
    behaviourMonitor = null;
    playbackRate = 1;
    clear();
    renderMenu();
    loop();
  }
}

function singlePlayerStart() {
  coop = false;
  pvpMode = false;
  gameSwitch(true);
}

function coopPlayerStart() {
  pvpMode = false;
  coop = true;
  gameSwitch(true);
}

function pvpStart() {
  coop = false;
  pvpMode = true;
  gameSwitch(true);
}

function singlePlayerHover() {
  sp_button.style("opacity", "1");
}

function coopHover() {
  coop_button.style("opacity", "1");
}

function stngHover() {
  stng_button.style("opacity", "1");
}

function pvpHover() {
  pvp_button.style("opacity", "1");
}

function singlePlayerEndHover() {
  sp_button.style("opacity", "0.5");
}

function coopEndHover() {
  coop_button.style("opacity", "0.5");
}

function stngEndHover() {
  stng_button.style("opacity", "0.5");
}

function pvpEndHover() {
  pvp_button.style("opacity", "0.5");
}

function menuStart() {
  menuBack.play();
  themeMusic.play();
  menuBack.loop();
  themeMusic.loop();
}

function gameoverPlay() {
  game_over_back.play();
  game_over_back.loop();
}

function renderGameOverInterface() {
  clear();
  let gameOverContainer = createDiv();
  gameOverContainer.id("gameover");
  gameOverContainer.size(pageWidth, pageHeight);

  game_over_back = createImg(gameoverback);
  game_over_back.parent(gameOverContainer);
  game_over_back.size(pageWidth, pageHeight);
  // game_over_back.mouseOver(gameoverPlay);

  let scoretext_p1;

  if (coop) {
    scoretext_p1 =
      "Player A: " + game.currScoreP1 + "\n" + "Player B: " + game.currScoreP2;
  } else if (pvpMode) {
    scoretext_p1 = "";
  } else {
    scoretext_p1 = "Total Score: " + game.currScoreP1;
  }

  scoretotal = createP(scoretext_p1);
  let xpos = 400 - scoretext_p1.width;
  scoretotal.position(xpos, 400);
  scoretotal.parent(gameOverContainer);
  scoretotal.style("color", "white");
  scoretotal.style("font-size", "25px");
  scoretotal.style("font-family", "ARCADE_I");
  scoretotal.style("text-align", "center");
  scoretotal.style("vertical-align", "middle");

  returnToMenu = createP("Return to Menu");
  let rtm_xpos = 400 - returnToMenu.width;

  returnToMenu.position(rtm_xpos, 500);
  returnToMenu.parent(gameOverContainer);
  returnToMenu.style("color", "orange");
  returnToMenu.style("font-size", "18px");
  returnToMenu.style("font-family", "ARCADE_I");
  returnToMenu.style("text-align", "center");
  returnToMenu.style("vertical-align", "middle");
  returnToMenu.mouseClicked(gameOverReturn);
}

function gameOverReturn() {
  game_over_back.remove();
  scoretotal.remove();
  returnToMenu.remove();
  themeMusic.stop();

  gameSwitch(false);
}

function renderMenu() {
  let menuContainer = createDiv();
  menuContainer.id("menuContainer");
  menuContainer.size(pageWidth, pageHeight);

  themeMusic = createAudio("assets/theme.mp3");

  menuBack = createVideo(menuimg);
  menuBack.parent(menuContainer);
  menuBack.size(pageWidth, pageHeight);
  menuBack.mouseOver(menuStart);
  //menuBack.play();
  //menuBack.loop();

  sp_button = createImg(singlePlayerIcon);
  sp_button.parent(menuContainer);
  sp_button.position(pageWidth / 4 - 170, pageHeight * 0.62);
  sp_button.size(170, 120);
  sp_button.mouseClicked(singlePlayerStart);
  sp_button.style("opacity", "0.5");
  sp_button.mouseOver(singlePlayerHover);
  sp_button.mouseOut(singlePlayerEndHover);

  coop_button = createImg(coopIcon);
  coop_button.parent(menuContainer);
  coop_button.position(pageWidth / 2 - 190, pageHeight * 0.62);
  coop_button.size(170, 120);
  coop_button.mouseClicked(coopPlayerStart);
  coop_button.style("opacity", "0.5");
  coop_button.mouseOver(coopHover);
  coop_button.mouseOut(coopEndHover);

  pvp_button = createImg(pvpIcon);
  pvp_button.parent(menuContainer);
  pvp_button.position(pageWidth / 2 + 25, pageHeight * 0.62);
  pvp_button.size(170, 120);
  pvp_button.mouseClicked(pvpStart);
  pvp_button.style("opacity", "0.5");
  pvp_button.mouseOver(pvpHover);
  pvp_button.mouseOut(pvpEndHover);

  stng_button = createImg(helpIcon);
  stng_button.parent(menuContainer);
  stng_button.position(pageWidth * 0.75, pageHeight * 0.62);
  stng_button.size(170, 120);
  stng_button.style("opacity", "0.5");
  stng_button.mouseOver(stngHover);
  stng_button.mouseOut(stngEndHover);

  difficultyButton = createButton("Difficulty: " + difficultyNames[difficulty]);
  difficultyButton.parent(menuContainer);
  difficultyButton.position(pageWidth / 3 + 60, pageHeight * 0.8);
  difficultyButton.mouseClicked(changeDifficulty);
  difficultyButton.size(160, 55);
  difficultyButton.class("menu-button");
  difficultyButton.style("background-color", diffTint);
  difficultyButton.style("color", "white");
  difficultyButton.style("padding", "10px 10px");
  difficultyButton.style("font-size", "12px");
  difficultyButton.style("font-family", "ARCADE_I");
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
  if (pvpMode) {
    playerA = new Player(astrocat_gif, 200, 300, playerNumber.PLAYER_1);
    playerB = new Player(astrocat_gif_p2, 800, 300, playerNumber.PLAYER_2);
  } else {
    playerA = new Player(astrocat_gif, 200, 300, playerNumber.PLAYER_1);
    if (coop) {
      playerB = new Player(astrocat_gif_p2, 300, 300, playerNumber.PLAYER_2);
    }
    behaviourMonitor = new BehaviourMonitor(difficultySettings[difficulty]);
  }
  game = new Game(difficulty);
  projectileManager = new ProjectileManager();
}

function draw() {
  if (inGame) {
    if (game.gameState == GameStates.ACTIVE) {
      // game.draw calls room.draw and update
      if (game.currentRoom.isCleared == true) {
        game.currentRoom.door.isUnlocked = true;
        game.currentRoom.door.update();
        if (game.currentRoom.promptActive) {
          if (keyIsDown(69) && !transitioning) {
            gameCount += 1;
            roomTransitionSound.play();
            fadingOut = true;
            transitioning = true;
          }
        }
      }

      // top UI block
      fill(0, 0, 0);
      let backing = rect(100, 50, 800, 50);

      push();
      textSize(28);
      textFont(gameFont);
      textAlign(CENTER);
      fill(255, 255, 255);
      var roomNumber = "Room " + game.roomSeq;
      text(roomNumber, 200, 80);
      if (!pvpMode) {
        if (!coop) {
          var scoreNumber = "Score:" + game.currScoreP1;
          text(scoreNumber, 750, 80);
        } else {
          textSize(16);
          var scoreNumber = "Score A:" + game.currScoreP1;
          text(scoreNumber, 750, 70);
          var scoreNumber = "Score B:" + game.currScoreP2;
          text(scoreNumber, 750, 90);
        }
      }
      pop();

      // bottom ui block
      fill(0, 0, 0);
      let footer_backing = rect(100, 690, 800, 50);

      // Player heat bars
      const barWidth = 200;
      const barHeight = 20;
      const padding = 10;
      playerA.drawPlayerHeatBar(
        width / 4 - 90,
        height - 80,
        barWidth,
        barHeight,
        playerA.fireCooldown / 200,
        "PLAYER A"
      );
      if (coop || pvpMode) {
        playerB.drawPlayerHeatBar(
          width / 4 + 400,
          height - 80,
          barWidth,
          barHeight,
          playerB.fireCooldown / 200,
          "PLAYER B"
        );
      }
      push();
      textSize(16);
      textFont(gameFont);
      textAlign(CENTER);
      if (!pvpMode) {
        if (coop && game.slowMeowLevel == slowMeowMax &&
            playerA.fireOverheat && playerB.fireOverheat) {
          fill(210, 0, 0);
          text("SLOW MEOW:BLOCKED", width / 2 + 20, height - 63);
        } else if (!coop && game.slowMeowLevel == slowMeowMax && playerA.fireOverheat) {
          fill(210, 0, 0);
          text("SLOW MEOW:BLOCKED", width / 2 + 20, height - 63);
        } else if (!game.slowMeowUsable || game.slowMeowOccurring) {
          fill(100, 150, 255);
          text("SLOW MEOW:" + Math.floor(game.slowMeowLevel) + "%", width / 2 + 20, height - 63);
        } else if (!game.slowMeowOccurring && game.slowMeowUsable) {
          fill(0, 255, 255);
          text("SLOW MEOW:READY", width / 2 + 20, height - 63);
        }
      }
      pop();
      game.draw();
    }

    if (fadingOut) {
      fadeAlpha += 10;
      if (fadeAlpha >= 255) {
        fadeAlpha = 255;
        fadingOut = false;
        fadingIn = true;
        game.currentRoom.getPlayerNextPos();
        game.nextRoom();
      }
    } else if (fadingIn) {
      fadeAlpha -= 10;
      if (fadeAlpha <= 0) {
        fadeAlpha = 0;
        fadingIn = false;
        transitioning = false;
      }
    }
    noStroke();
    fill(0, fadeAlpha);
    rect(0, 0, pageWidth, pageHeight);
    if (game.gameState == GameStates.OVER && !gameOver) {
      renderGameOverInterface();
      gameOver = true;
    }
  }
}

function keyPressed() {
  if (inGame) {
    // 'press q to quit'
    if (game.gameState == GameStates.PAUSE) {
      if (keyCode == 81) {
        themeMusic.stop();
        gameSwitch(false);
      }
    }

    if (keyCode == ESCAPE) {
      if (game.gameState == GameStates.ACTIVE && !transitioning) {
        game.gameState = GameStates.PAUSE;
        push();
        fill("rgba(0, 0, 0, 0.6)");
        let pauseMask = rect(0, 0, pageWidth, pageHeight);
        textSize(38);
        textFont(gameFont);
        textAlign(CENTER);
        fill(255, 255, 255);
        text("Game Paused", 500, 300);
        textSize(19);
        text("Press Q to quit game", 500, 350);
        text("Press ESC to resume", 500, 400);
        pop();
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
    // SlowMeow gets activated with 'Q' or '/'
    if (game && game.gameState == GameStates.ACTIVE) {
      if (!transitioning && !pvpMode) {
        if (keyCode == 81 || keyCode == 191) {
          game.activateSlowMeow();
        }
      }
    }
  }
}

// Used for slowing down sounds in slow mo
function playSound(sound, rate, randomVolume = false) {
  let audioContext = getAudioContext();
  let source = audioContext.createBufferSource();
  source.buffer = sound.buffer;
  source.playbackRate.value = rate;
  // For volume control
  let gainNode = audioContext.createGain();
  if (randomVolume) {
    gainNode.gain.value = random(0.65, 1);
  } else {
    gainNode.gain.value = 1;
  }
  source.connect(gainNode);
  gainNode.connect(audioContext.destination);
  // Disconnect after sound ends to prevent memory leaks etc.
  source.onended = () => {
    source.disconnect();
    gainNode.disconnect();
  };
  source.start();
}

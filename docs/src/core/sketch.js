/* GLOBAL CONSTANTS */
let game;
let projectileManager;
let behaviourMonitor;

let playerA;
let playerB;
let roomButton = null;
let pvpMode = false;
let projectileWallCollisions = false;

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
let menuContainer;
let scoretotal;
let returnToMenu;
let gameOverContainer;
let settingsMode = true;

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
  } else {
    inGame = false;
    gameOver = false;
    game = null;
    projectileManager = null;
    behaviourMonitor = null;
    coop = false;
    pvpMode = false;
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

function renderGameOverInterface() {
  // clear();

  fill("rgba(0, 0, 0, 0.7)");
  let endMask = rect(0, 0, 950, 800);

  gameOverContainer = createDiv();
  gameOverContainer.id("gameover");
  gameOverContainer.size(pageWidth, pageHeight);

  let game_over_txt = createImg(gameoverback);
  game_over_txt.parent(gameOverContainer);
  game_over_txt.size(pageWidth, pageHeight);
  game_over_txt.position(0, 0);

  let scoretext_p1;
  if (coop) {
    scoretext_p1 =
      "Player A: " + game.currScoreP1 + "<br>" + "Player B: " + game.currScoreP2;
  } else if (pvpMode) {
    let winText;
    if (game.currScoreP1 >= 3 && game.currScoreP2 >= 3) {
      winText = "<br>" + "It's a tie!";
    } else if (game.currScoreP1 >= 3) {
      winText = "<br>" + "Player A wins!";
    } else {
      winText = "<br>" + "Player B wins!";
    }
    scoretext_p1 =
      "Player A: " + game.currScoreP1 + "<br>" + "Player B: " + game.currScoreP2 + winText;
  } else {
    scoretext_p1 = "Total Score: " + game.currScoreP1;
  }

  scoretotal = createP(scoretext_p1);
  let xpos = 400 - scoretext_p1.width;
  scoretotal.position(xpos, 400);
  scoretotal.parent(gameOverContainer);
  scoretotal.style("color", "orange");
  scoretotal.style("font-size", "25px");
  scoretotal.style("font-family", "ARCADE_I");
  scoretotal.style("text-align", "center");
  scoretotal.style("vertical-align", "middle");

  returnToMenu = createP("Return to Menu");
  let rtm_xpos = 425 - returnToMenu.width;

  returnToMenu.position(rtm_xpos, 525);
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
  if (pvpMode) {
    pvpMusic.stop();
  } else {
    gameMusic.stop();
  }

  gameSwitch(false);
}

function switchToHelp() {
  settingsMode = false;

  toggle_help.style("background-color", "rgb(255, 109, 0)");
  toggle_settings.style("background-color", "transparent");

  settingpanel.remove();
  renderHowTo();
}
function switchToStngs() {
  settingsMode = true;
  toggle_settings.style("background-color", "rgb(255, 109, 0)");
  toggle_help.style("background-color", "transparent");
  howtopanel.remove();
  renderSettingPanel();
}

let stng_div;
let set_back;
let toggle_settings;
let toggle_help;

let wasd;
let arrow;
let settingpanel;

function switchToWasd() {
  wasd.style("border", "2px solid white");
  arrow.style("border", "none");

  switchControl(true);
}

function switchToArrow() {
  arrow.style("border", "2px solid white");
  wasd.style("border", "none");

  switchControl(false);
}

let howtopanel;
function renderHowTo() {
  howtopanel = createDiv();
  howtopanel.id("howtopanel");
  howtopanel.size(pageWidth, pageHeight);
  howtopanel.parent(stng_div);

  let intro = createP(
    "You are AstroCat. You chased a mouse on to a spaceship. The humans were killed by invading space dogs. Silly humans. You need to fight your way through the endless rooms of rampaging space dogs."
  );
  intro.parent(howtopanel);
  intro.position(20, 80);
}

function renderSettingPanel() {
  settingpanel = createDiv();
  settingpanel.id("settingpanel");
  settingpanel.size(pageWidth, pageHeight);
  settingpanel.parent(stng_div);

  let controlLegend = createP("Default controls");
  controlLegend.parent(settingpanel);
  controlLegend.position(20, 100);

  let p2control = createP("Player 2 will use <br> non-default controls");
  p2control.parent(settingpanel);
  p2control.position(20, 150);
  p2control.style("font-size", "10px");

  wasd = createImg(wasd_icon);
  wasd.parent(settingpanel);
  wasd.position(320, 100);
  wasd.size(150, 160);
  wasd.mouseClicked(switchToWasd);
  wasd.style("border", "2px solid white");

  arrow = createImg(arrow_icon);
  arrow.parent(settingpanel);
  arrow.position(500, 100);
  arrow.size(150, 160);
  arrow.mouseClicked(switchToArrow);
}

function quitSettings() {
  stng_div.remove();
}

function gotoSettings() {
  stng_div = createDiv();
  stng_div.id("settings_content");
  stng_div.size(pageWidth, pageHeight);
  set_back = createImg(setback);
  set_back.parent(stng_div);
  set_back.position(0, 0);

  let exit = createP("X");
  exit.parent(stng_div);
  exit.position(10, 10);
  exit.style("color", "white");
  exit.style("background-color", "red");

  exit.mouseClicked(quitSettings);

  toggle_settings = createP("Settings");
  toggle_settings.parent(stng_div);
  toggle_settings.position(200, 10);
  toggle_settings.mouseClicked(switchToStngs);
  toggle_settings.style("background-color", "rgb(255, 109, 0)");

  toggle_help = createP("How to Play");
  toggle_help.parent(stng_div);
  toggle_help.position(500, 10);
  toggle_help.mouseClicked(switchToHelp);

  // defualt to setting panel
  renderSettingPanel();
}

function renderMenu() {
  menuContainer = createDiv();
  menuContainer.id("menuContainer");
  menuContainer.size(pageWidth, pageHeight);

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
  stng_button.mouseClicked(gotoSettings);

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
  themeMusic.stop();
  if (pvpMode) {
    pvpMusic.play();
    pvpMusic.loop();
    playerA = new Player(astrocat_gif, 200, 300, playerNumber.PLAYER_1);
    playerB = new Player(astrocat_gif_p2, 800, 300, playerNumber.PLAYER_2);

  } else {
    gameMusic.play();
    gameMusic.loop();
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
      if (game.currentRoom && game.currentRoom.isCleared == true) {
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
      var roomNumber;
      if (!pvpMode) {
        roomNumber = "Room " + game.roomSeq;
      } else {
        roomNumber = "Round " + game.roomSeq;
      }
      text(roomNumber, 200, 80);
      if (!coop && !pvpMode) {
        var scoreNumber = "Score:" + game.currScoreP1;
        text(scoreNumber, 750, 80);
      } else {
        textSize(16);
        var scoreNumber = "Score A:" + game.currScoreP1;
        text(scoreNumber, 750, 70);
        var scoreNumber = "Score B:" + game.currScoreP2;
        text(scoreNumber, 750, 90);
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
        if (
          coop &&
          game.slowMeowLevel == slowMeowMax &&
          playerA.fireOverheat &&
          playerB.fireOverheat
        ) {
          fill(210, 0, 0);
          text("SLOW MEOW:BLOCKED", width / 2 + 20, height - 63);
        } else if (
          !coop &&
          game.slowMeowLevel == slowMeowMax &&
          playerA.fireOverheat
        ) {
          fill(210, 0, 0);
          text("SLOW MEOW:BLOCKED", width / 2 + 20, height - 63);
        } else if (!game.slowMeowUsable || game.slowMeowOccurring) {
          fill(100, 150, 255);
          text(
            "SLOW MEOW:" + Math.floor(game.slowMeowLevel) + "%",
            width / 2 + 20,
            height - 63
          );
        } else if (!game.slowMeowOccurring && game.slowMeowUsable) {
          fill(0, 255, 255);
          text("SLOW MEOW:READY", width / 2 + 20, height - 63);
        }
      }
      pop();
      game.draw();
    }

    if (game.gameState == GameStates.OVER && !gameOver) {
      fadingOut = true;
      transitioning = true;
      gameOver = true;
    }

    if (fadingOut) {
      fadeAlpha += 10;
      if (fadeAlpha >= 255) {
        fadeAlpha = 255;
        fadingOut = false;
        fadingIn = true;
        if (!pvpMode && game.currentRoom) {
          game.currentRoom.getPlayerNextPos();
          game.nextRoom();
        }
        if (gameOver) {
          renderGameOverInterface();
          gameOver = true;
        }
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

  }
}

function keyPressed() {
  if (inGame) {
    // 'press q to quit'
    if (game && game.gameState == GameStates.PAUSE) {
      if (keyCode == 81) {
        if (!pvpMode) {
          gameMusic.stop();
        } else {
          pvpMusic.stop();
        }
        gameSwitch(false);
      }
    }

    if (keyCode == ESCAPE) {
      if (game && game.gameState == GameStates.ACTIVE && !transitioning) {
        game.gameState = GameStates.PAUSE;
        if (!pvpMode) {
          gameMusic.pause();
        } else {
          pvpMusic.pause();
        }
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
        if (!pvpMode) {
          gameMusic.play();
        } else {
          pvpMusic.play();
        }
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

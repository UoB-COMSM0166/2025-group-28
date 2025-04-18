/* GLOBAL CONSTANTS */
let game;
let projectileManager;
let behaviourMonitor;

let muted = false;

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
let howtopanel;

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
  // Prevent the user from highlighting text
  document.addEventListener("selectstart", (event) => {
    event.preventDefault();
  });
  if (inGame) {
    gameSetUp();
  } else {
    Menu.renderMenu();
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
    Menu.renderMenu();
    loop();
  }
}

function menuStart() {
  menuBack.play();
  if (!muted) {
    themeMusic.play();
    themeMusic.loop();
  }
  menuBack.loop();
}

let stng_div;
let set_back;
let toggle_settings;
let toggle_help;

let wasd;
let arrow;
let settingpanel;

function quitSettings() {
  stng_div.remove();
}

function gameSetUp() {
  themeMusic.stop();
  if (pvpMode) {
    if (!muted) {
      pvpMusic.play();
      pvpMusic.loop();
    }
    playerA = new Player(astrocat_gif, 200, 300, playerNumber.PLAYER_1);
    playerB = new Player(astrocat_gif_p2, 800, 300, playerNumber.PLAYER_2);
  } else {
    if (!muted) {
      gameMusic.play();
      gameMusic.loop();
    }
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
            if (!muted) {
              roomTransitionSound.play();
            }
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
      var scoreNumber;
      if (!pvpMode) {
        roomNumber = "Room " + game.roomSeq;
      } else {
        roomNumber = "Round " + game.roomSeq;
      }
      text(roomNumber, 200, 80);
      if (!coop && !pvpMode) {
        scoreNumber = "Score:" + game.currScoreP1;
        text(scoreNumber, 750, 80);
      } else {
        textSize(16);
        if (coop) {
          scoreNumber = "Score A:" + game.currScoreP1;
          text(scoreNumber, 750, 70);
          scoreNumber = "Score B:" + game.currScoreP2;
          text(scoreNumber, 750, 90);
        } else if (pvpMode) {
          push();
          textSize(40);
          var divider = "|";
          text(divider, 312, 85);
          pop();
          scoreNumber = "Kills A:" + game.currScoreP1;
          text(scoreNumber, 400, 65);
          scoreNumber = "Kills B:" + game.currScoreP2;
          text(scoreNumber, 400, 85);
          scoreNumber = "Total A:" + game.p1PVPTotal;
          text(scoreNumber, 825, 65);
          scoreNumber = "Total B:" + game.p2PVPTotal;
          text(scoreNumber, 825, 85);
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

    if (fadingOut) {
      fadeAlpha += 10;
      if (fadeAlpha >= 255) {
        fadeAlpha = 255;
        fadingOut = false;
        fadingIn = true;
        if (!pvpMode) {
          game.currentRoom.getPlayerNextPos();
        }
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
    rect(0, 0, windowWidth, windowHeight);
    if (game.gameState == GameStates.OVER && !gameOver) {
      GameOver.renderGameOverInterface();
      gameOver = true;
    }
  }
}

function keyPressed() {
  if (inGame) {
    let music;
    if (pvpMode) {
      music = pvpMusic;
    } else {
      music = gameMusic;
    }
    // 'press q to quit'
    if (game && keyCode == 81) {
      if (game.gameState == GameStates.PAUSE) {
        music.stop();
        gameSwitch(false);
      } else if (game.gameState == GameStates.OVER) {
        music.stop();
        GameOver.gameOverReturn();
      }
    }

    if (game && keyCode == ESCAPE) {
      if (game.gameState == GameStates.ACTIVE && !transitioning) {
        game.gameState = GameStates.PAUSE;
        music.pause();
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

        if (!muted) {
          music.play();
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
  if (!muted) {
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
}

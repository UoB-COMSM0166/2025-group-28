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
  menuBack = createVideo(menuimg, Menu.renderMenu);
  if (inGame) {
    gameSetUp();
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
    doorPrevPos = null;
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
    playerA = new Player(astrocat_gif, 160, 300, playerNumber.PLAYER_1);
    playerB = new Player(astrocat_gif_p2, 835, 300, playerNumber.PLAYER_2);
  } else {
    if (!muted) {
      gameMusic.play();
      gameMusic.loop();
    }
    playerA = new Player(astrocat_gif, 160, 300, playerNumber.PLAYER_1);
    if (coop) {
      playerB = new Player(astrocat_gif_p2, 160, 400, playerNumber.PLAYER_2);
    }
    behaviourMonitor = new BehaviourMonitor(difficultySettings[difficulty]);
  }
  game = new Game(difficulty);
  projectileManager = new ProjectileManager();
}

function draw() {
  if (!inGame) return;
  if (game.gameState == GameStates.ACTIVE) {
    background(0); // Refreshes the canvas background to fix the sprite ghosting effect
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
    GameUI.drawUITop();
    // bottom ui block
    GameUI.drawUIBottom();
    game.draw();
  }

  // Draw fade out/in effect
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

function keyPressed() {
  if (!inGame) return;
  let music;
  if (pvpMode) music = pvpMusic;
  else music = gameMusic;
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

// Used for slowing down sounds in slow mo
function playSound(sound, rate, randomVolume = false) {
  if (muted) return;
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

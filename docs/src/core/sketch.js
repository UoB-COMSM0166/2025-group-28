function setup() {
  noStroke();
  rectMode(CORNER);
  gameCanvas = createCanvas(pageWidth, pageHeight);
  lightingLayer = createGraphics(roomWidth * tileSize + arena_offset, roomHeight * tileSize + arena_offset);
  lightingLayer.noStroke();
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
    transitioning = true;
    fadingOut = true;
    sp_button.remove();
    coop_button.remove();
    pvp_button.remove();
    menuBack.remove();
    stng_button.remove();
    //  difficultyButton.remove();
    themeMusic.stop();
    setTimeout(() => {
      inGame = true;
      gameSetUp();
      loop();
    }, 750);
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

function gameSetUp() {
  if (pvpMode) {
    if (!muted) {
      let pvpMusic = [pvpMusic1, pvpMusic2, pvpMusic3];
      let track = Math.floor(random(0, pvpMusic.length));
      pvpTrack = pvpMusic[track];
      pvpTrack.play();
      pvpTrack.loop();
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
  if (!inGame) {
    if (fadingOut) fade();
    return;
  }
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
    game.draw();
    // Top UI block
    GameUI.drawUITop();
    // Bottom UI block
    GameUI.drawUIBottom();
  }

  // Draw fade out/in effect
  if (fadingOut || fadingIn) fade();
  if (game.gameState == GameStates.OVER && !gameOver) {
    GameOver.renderGameOverInterface();
    gameOver = true;
  }
}

function fade() {
  if (fadingOut) {
    fadeAlpha += 10;
    if (fadeAlpha >= 255) {
      fadeAlpha = 255;
      fadingOut = false;
      fadingIn = true;
      if (inGame) {
        if (!pvpMode) {
          game.currentRoom.getPlayerNextPos();
        }
        game.nextRoom();
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
  rect(0, 0, windowWidth, windowHeight);
}

// MOVE TO ROOM CLASS IN FUTURE //
let flickerP1Offset = 0;
let flickerP2Offset = 1000;
let flickerMobOffset = 2000;
function drawLighting() {
  lightingLayer.clear();

  // Draw a semi-transparent black rectangle over the playable area
  lightingLayer.fill(0, 190);
  lightingLayer.rect(0, 0, lightingLayer.width, lightingLayer.height);

  let flickerP1 = noise(flickerP1Offset) * 20 - 10;

  // Cut out transparent circles for light sources
  lightingLayer.erase();
  lightingLayer.ellipse(playerA.position.x, playerA.position.y, 150 + flickerP1, 150 + flickerP1);
  if (coop) {
    let flickerP2 = noise(flickerP1Offset) * 20 - 10;
    lightingLayer.ellipse(playerB.position.x, playerB.position.y, 150 + flickerP2, 150 + flickerP2);
  }
  for (let i = 0; i < game.currentRoom.mobs.length; i++) {
    let mob = game.currentRoom.mobs[i];
    if (mob.isActive) {
      let flickerMob = noise(flickerMobOffset + i * 100) * 15 - 5;
      lightingLayer.ellipse(mob.position.x, mob.position.y, 120 + flickerMob, 120 + flickerMob);
    }
  }
  lightingLayer.noErase();

  image(lightingLayer, 0, 0);
  flickerP1Offset += random(0.03, 0.06);
  flickerP2Offset += random(0.03, 0.06);
  flickerMobOffset += random(0.03, 0.06);
  if (flickerP1Offset > 10000) flickerP1Offset = 0;
  if (flickerP2Offset > 10000) flickerP2Offset = 1000;
  if (flickerMobOffset > 10000) flickerMobOffset = 2000;
}

function keyPressed() {
  if (!inGame) return;
  let music;
  if (pvpMode) music = pvpTrack;
  else music = gameMusic;

  // H for show settings
  if (game && keyCode == 72) {
    if (game.gameState == GameStates.PAUSE) {
      if (!pause_stng_overlay) {
        Settings.gotoSettings();
        switchToHelp();
        pause_stng_overlay = true;
      }
    }
  }

  // Quit the game with 'Q' from pause menu
  if (game && keyCode == 81) {
    if (game.gameState == GameStates.PAUSE && !pause_stng_overlay) {
      music.stop();
      gameSwitch(false);
    } else if (game.gameState == GameStates.OVER && !pause_stng_overlay) {
      music.stop();
      GameOver.gameOverReturn();
    }
  }

  if (game && keyCode == ESCAPE && !pause_stng_overlay) {
    if (game.gameState == GameStates.ACTIVE && !transitioning) {
      if ((playerA && playerA.isActive) || (playerB && playerB.isActive)) {
        game.gameState = GameStates.PAUSE;
        if (!muted) {
          menuClickSound.play();
          music.pause();
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
        text("Press H to show controls", 500, 400);
        text("Press ESC to resume", 500, 450);
        pop();
        noLoop();
      }
    } else if (game.gameState == GameStates.PAUSE) {
      loop();
      game.gameState = GameStates.ACTIVE;
      if (!muted) music.play();
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
        game.slowMeowHandler.activate();
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

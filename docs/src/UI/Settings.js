let disabBlood_on;
let disabBlood_off;
let wpc_on;
let wpc_off;
let sound_off;
let sound_on;
let gameOrange = "rgb(255, 109, 0)";
let controlsToggle;
let helpTextToggle;

let instruction_set = [instr_1, instr_2, instr_3, instr_4,
                      instr_5, instr_6, instr_7, instr_8];
let instr_count = 0;

let instNext;
let instBack;

let instr;

function switchToHelp() {
  settingsMode = false;

  toggle_help.style("background-color", "rgb(255, 109, 0)");
  toggle_settings.style("background-color", "transparent");

  settingpanel.remove();
  Settings.renderHowTo();
}

function toggleBloodDisable() {
  childMode = !childMode;
  if (childMode) {
    disabBlood_on.style("background-color", "rgb(255, 109, 0)");
    disabBlood_off.style("background-color", "transparent");
  } else {
    disabBlood_off.style("background-color", "rgb(106, 104, 102)");
    disabBlood_on.style("background-color", "transparent");
  }
}

function switchToStngs() {
  settingsMode = true;
  instr_count = 0;
  toggle_settings.style("background-color", "rgb(255, 109, 0)");
  toggle_help.style("background-color", "transparent");
  howtopanel.remove();
  Settings.renderSettingPanel();
}

class Settings {
  static disableProjectileWallCollision() {
    projectileWallCollisions = !projectileWallCollisions;
    if (projectileWallCollisions) {
      wpc_on.style("background-color", "rgb(255, 109, 0)");
      wpc_off.style("background-color", "transparent");
    } else {
      wpc_off.style("background-color", "rgb(106, 104, 102)");
      wpc_on.style("background-color", "transparent");
    }
  }

  static switchToWasd() {
    wasd_control = true;
    wasd.style("border", "2px solid white");
    arrow.style("border", "none");

    Settings.switchControl(true);
  }

  static switchToArrow() {
    wasd_control = false;
    arrow.style("border", "2px solid white");
    wasd.style("border", "none");

    Settings.switchControl(false);
  }

  static renderHowTo() {
    howtopanel = createDiv();
    howtopanel.id("howtopanel");
    howtopanel.size(pageWidth, pageHeight);

    howtopanel.attribute("draggable", "false");
    howtopanel.parent(stng_div);

    let intro = createP(
      "You are AstroCat. You chased a mouse on to a spaceship. The humans were killed by invading space dogs. Silly humans. Defeat the space dogs and explore the spaceship. Don't let curiosity kill the cat!"
    );
    intro.parent(howtopanel);
    intro.position(20, 80);

    controlsToggle = createP("Controls");
    controlsToggle.position(20, 250);
    controlsToggle.style("color", "black");
    controlsToggle.style("background-color", "white");
    controlsToggle.parent(howtopanel);
    let controlDisplay;
    if (wasd_control) {
      controlDisplay = createImg(wasd_icon);
    } else {
      controlDisplay = createImg(arrow_icon);
    }
    controlDisplay.parent(howtopanel);
    controlDisplay.position(0, 310);
    controlDisplay.size(230, 250);
    controlDisplay.attribute("draggable", "false");

    let slowmeowhelp = createImg(add_ctrls);
    slowmeowhelp.parent(howtopanel);
    slowmeowhelp.position(210, 325);
    slowmeowhelp.size(120, 75);
    slowmeowhelp.attribute("draggable", "false");

    instBack = createP("<<");
    instBack.position(450, 250);
    instBack.style("background-color", "gray");
    instBack.parent(howtopanel);
    instBack.attribute("draggable", "false");
    instBack.mouseClicked(() => {
      if (!muted && instr_count > 0) {
        menuClickSound.play();
      }
      Settings.changeInstr(-1);
    });

    let objectiveHeader = createP("Game Instructions");
    objectiveHeader.position(505, 250);
    objectiveHeader.style("color", "black");
    objectiveHeader.style("background-color", "white");
    objectiveHeader.parent(howtopanel);
    objectiveHeader.attribute("draggable", "false");

    instNext = createP(">>");
    instNext.position(820, 250);
    instNext.style("background-color", gameOrange);
    instNext.parent(howtopanel);
    instNext.attribute("draggable", "false");
    instNext.mouseClicked(() => {
      if (!muted && instr_count < instruction_set.length - 1) {
        menuClickSound.play();
      }
      Settings.changeInstr(1);
    });

    instr = createImg(instr_1);
    instr.parent(howtopanel);
    instr.position(475, 310);
    instr.size(360, 360);
    instr.attribute("draggable", "false");
  }

  static changeInstr(increment) {
    let newInstrCount = instr_count + increment;
    if (newInstrCount < 0 || newInstrCount > instruction_set.length - 1) {
      return;
    }
    instr_count = newInstrCount;
    instr.remove();
    instr = createImg(instruction_set[instr_count]);
    instr.parent(howtopanel);
    instr.position(475, 310);
    instr.size(360, 360);
    instr.attribute("draggable", "false");
    Settings.updateArrowColours();
  }

  static updateArrowColours() {
    if (instr_count >= instruction_set.length - 1) {
      instNext.style("background-color", "gray");
      instBack.style("background-color", gameOrange);
    } else {
      instNext.style("background-color", gameOrange);
    }
    if (instr_count > 0) {
      instBack.style("background-color", gameOrange);
    } else {
      instBack.style("background-color", "gray");
    }
  }

  static gotoSettings() {
    stng_div = createDiv();
    stng_div.id("settings_content");
    stng_div.size(pageWidth, pageHeight);

    set_back = createImg(setback);
    set_back.size(pageWidth, pageHeight);
    set_back.parent(stng_div);
    set_back.attribute("draggable", "false");

    let exit = createP("X");
    exit.parent(stng_div);
    exit.position(10, 10);
    exit.style("color", "white");
    exit.style("background-color", "red");
    exit.attribute("draggable", "false");
    exit.mouseClicked(() => {
      if (!muted) menuClickSound.play();
      Settings.quitSettings();
    });

    toggle_settings = createP("Settings");
    toggle_settings.parent(stng_div);
    toggle_settings.position(200, 10);
    toggle_settings.attribute("draggable", "false");
    toggle_settings.mouseClicked(() => {
      if (!muted) menuClickSound.play();
      if (!settingsMode) switchToStngs();
    });
    toggle_settings.style("background-color", "rgb(255, 109, 0)");

    toggle_help = createP("How to Play");
    toggle_help.parent(stng_div);
    toggle_help.position(500, 10);
    toggle_help.attribute("draggable", "false");
    toggle_help.mouseClicked(() => {
      if (!muted) menuClickSound.play();
      if (settingsMode) switchToHelp();
    });

    // Default to setting panel
    Settings.renderSettingPanel();
  }

  static renderSettingPanel() {
    settingpanel = createDiv();
    settingpanel.id("settingpanel");
    settingpanel.size(pageWidth, pageHeight);
    settingpanel.attribute("draggable", "false");
    settingpanel.parent(stng_div);
    let controlLegend = createP("Default controls");
    controlLegend.parent(settingpanel);
    controlLegend.position(20, 100);
    let p2control = createP("Player 2 will use <br> non-default controls");
    p2control.parent(settingpanel);
    p2control.position(20, 137);
    p2control.style("font-size", "10px");
    p2control.style("opacity", "0.6");

    wasd = createImg(wasd_icon);
    wasd.parent(settingpanel);
    wasd.position(320, 100);
    wasd.size(170, 180);
    wasd.attribute("draggable", "false");
    wasd.mouseClicked(() => {
      if (!muted) menuClickSound.play();
      Settings.switchToWasd();
    });

    arrow = createImg(arrow_icon);
    arrow.parent(settingpanel);
    arrow.position(500, 100);
    arrow.size(160, 180);
    arrow.attribute("draggable", "false");
    arrow.mouseClicked(() => {
      if (!muted) menuClickSound.play();
      Settings.switchToArrow();
    });

    if (wasd_control) {
      wasd.style("border", "2px solid white");
    } else arrow.style("border", "2px solid white");

    let disableSounds = createP("Enable Audio");
    disableSounds.parent(settingpanel);
    disableSounds.position(20, 370);

    sound_on = createP("ON");
    sound_on.parent(settingpanel);
    sound_on.position(320, 370);
    sound_on.mouseClicked(() => {
      menuClickSound.play();
      if (muted) Settings.soundToggle();
    });

    sound_off = createP("OFF");
    sound_off.parent(settingpanel);
    sound_off.position(360, 370);
    sound_off.mouseClicked(() => {
      if (!muted) Settings.soundToggle();
    });

    if (!muted) {
      sound_on.style("background-color", "rgb(255, 109, 0)");
      sound_off.style("background-color", "transparent");
    } else {
      sound_off.style("background-color", "rgb(106, 104, 102)");
      sound_on.style("background-color", "transparent");
    }

    let wallProjCollisions = createP("Wall Projectile <br> Collisions");
    wallProjCollisions.parent(settingpanel);
    wallProjCollisions.position(20, 440);
    let wpc_cap = createP(
      "Allow projectiles to collide <br> with walls within the room"
    );
    wpc_cap.parent(settingpanel);
    wpc_cap.position(20, 500);
    wpc_cap.style("font-size", "10px");
    wpc_cap.style("opacity", "0.6");

    wpc_on = createP("ON");
    wpc_on.parent(settingpanel);
    wpc_on.position(320, 440);
    wpc_on.mouseClicked(() => {
      if (!muted) menuClickSound.play();
      if (!projectileWallCollisions) Settings.disableProjectileWallCollision();
    });

    wpc_off = createP("OFF");
    wpc_off.parent(settingpanel);
    wpc_off.position(360, 440);
    wpc_off.mouseClicked(() => {
      if (!muted) menuClickSound.play();
      if (projectileWallCollisions) Settings.disableProjectileWallCollision();
    });

    if (projectileWallCollisions) {
      wpc_on.style("background-color", "rgb(255, 109, 0)");
      wpc_off.style("background-color", "transparent");
    } else {
      wpc_off.style("background-color", "rgb(106, 104, 102)");
      wpc_on.style("background-color", "transparent");
    }

    let disableBlood = createP("Child Mode");
    disableBlood.parent(settingpanel);
    disableBlood.position(20, 300);

    disabBlood_on = createP("ON");
    disabBlood_on.parent(settingpanel);
    disabBlood_on.position(320, 300);
    disabBlood_on.mouseClicked(() => {
      if (!muted) menuClickSound.play();
      if (!childMode) toggleBloodDisable();
    });

    disabBlood_off = createP("OFF");
    disabBlood_off.parent(settingpanel);
    disabBlood_off.position(360, 300);
    disabBlood_off.mouseClicked(() => {
      if (!muted) menuClickSound.play();
      if (childMode) toggleBloodDisable();
    });

    let childModeCap = createP(
      "Disable blood particle<br>effects and gore sounds"
    );
    childModeCap.parent(settingpanel);
    childModeCap.position(20, 335);
    childModeCap.style("font-size", "10px");
    childModeCap.style("opacity", "0.6");

    if (childMode) {
      disabBlood_on.style("background-color", "rgb(255, 109, 0)");
      disabBlood_off.style("background-color", "transparent");
    } else {
      disabBlood_off.style("background-color", "rgb(106, 104, 102)");
      disabBlood_on.style("background-color", "transparent");
    }
  }

  static soundToggle() {
    muted = !muted;
    let music;
    if (pvpMode) music = pvpTrack;
    else music = gameMusic;
    if (!muted) {
      if (!inGame) themeMusic.play();
      else music.play();
      sound_on.style("background-color", "rgb(255, 109, 0)");
      sound_off.style("background-color", "transparent");
    } else {
      if (!inGame) themeMusic.stop();
      else music.stop();
      sound_off.style("background-color", "rgb(106, 104, 102)");
      sound_on.style("background-color", "transparent");
    }
  }

  static quitSettings() {
    instr_count = 0;
    settingsMode = true;
    pause_stng_overlay = false;
    stng_div.remove();
  }

  static switchControl(is_wasd) {
    if (is_wasd) {
      p1_up = 87;
      p1_down = 83;
      p1_left = 65;
      p1_right = 68;
      p1_shoot = 32;
      p1_slowmeow = 81;

      p2_up = 38;
      p2_down = 40;
      p2_left = 37;
      p2_right = 39;
      p2_shoot = 13;
      p2_slowmeow = 191;
    } else {
      p1_up = 38;
      p1_down = 40;
      p1_left = 37;
      p1_right = 39;
      p1_shoot = 13;
      p1_slowmeow = 191;

      p2_up = 87;
      p2_down = 83;
      p2_left = 65;
      p2_right = 68;
      p2_shoot = 32;
      p2_slowmeow = 81;
    }
  }
}

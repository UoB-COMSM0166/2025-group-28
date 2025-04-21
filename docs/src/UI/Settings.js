let disabBlood_on;
let disabBlood_off;
let sound_off;
let sound_on;

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
  toggle_settings.style("background-color", "rgb(255, 109, 0)");
  toggle_help.style("background-color", "transparent");
  howtopanel.remove();
  Settings.renderSettingPanel();
}

class Settings {
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
      "You are AstroCat. You chased a mouse on to a spaceship. The humans were killed by invading space dogs. Silly humans. You need to fight your way through the endless rooms of rampaging space dogs."
    );
    intro.parent(howtopanel);
    intro.position(20, 80);
  }

  static gotoSettings() {
    stng_div = createDiv();
    stng_div.id("settings_content");
    stng_div.size(pageWidth, pageHeight);
    set_back = createImg(setback);
    set_back.parent(stng_div);
    set_back.position(0, 0);
    set_back.attribute("draggable", "false");

    let exit = createP("X");
    exit.parent(stng_div);
    exit.position(10, 10);
    exit.style("color", "white");
    exit.style("background-color", "red");
    exit.attribute("draggable", "false");
    exit.mouseClicked(() => {
      if (!muted) menuClickSound.play();
      quitSettings();
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
    wasd.size(150, 160);
    wasd.attribute("draggable", "false");
    wasd.mouseClicked(() => {
      if (!muted) menuClickSound.play();
      Settings.switchToWasd();
    });

    arrow = createImg(arrow_icon);
    arrow.parent(settingpanel);
    arrow.position(500, 100);
    arrow.size(150, 160);
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

    let childModeCap = createP("Disable blood particle<br>effects and gore sounds");
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
    if (!muted) {
      themeMusic.play();
      sound_on.style("background-color", "rgb(255, 109, 0)");
      sound_off.style("background-color", "transparent");
    } else {
      themeMusic.stop();
      sound_off.style("background-color", "rgb(106, 104, 102)");
      sound_on.style("background-color", "transparent");
    }
  }

  static quitSettings() {
    stng_div.remove();
  }

  static switchControl(is_wasd) {
    if (is_wasd) {
      p1_up = 87;
      p1_down = 83;
      p1_left = 65;
      p1_right = 68;
      p1_shoot = 32;

      p2_up = 38;
      p2_down = 40;
      p2_left = 37;
      p2_right = 39;
      p2_shoot = 13;
    } else {
      p1_up = 38;
      p1_down = 40;
      p1_left = 37;
      p1_right = 39;
      p1_shoot = 13;

      p2_up = 87;
      p2_down = 83;
      p2_left = 65;
      p2_right = 68;
      p2_shoot = 32;
    }
  }
}
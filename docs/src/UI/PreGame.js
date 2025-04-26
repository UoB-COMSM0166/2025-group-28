let pregameWindow;
let bestof_opts = [1, 3, 5];
var roundIndex = 0;
var difficultyIndex = 0;
var pvpBestOfCount;
let root_x = 100;
let root_y = 275;
let toolLineY = 225;
let toolLineX = 75;
let footerY = 580;

let standard_mini_obj =
  "Kill the space dogs to unlock the door to the next room. Use slow meow to slow it down when things get hairy. Recover from overheating and regain health by collecting treats from dead mobs.";
let pvp_mini_obj =
  "Cats aren't loyal. You've turned on your fellow feline. Each round is a best of 3 - choose between 1, 3 or 5 rounds.";

class PreGameInterface {
  static exitPreGameMenu() {
    // Reset to defaults...
    if (!muted) menuClickSound.play();
    pregameWindow.remove();
  }

  static startGame() {
    gameSwitch(true);
    if (!muted) menuSelectSound.play();
    pregameWindow.remove();
  }

  static renderPregame() {
    // Determine UI/options based on globals...
    pregameWindow = createDiv();
    pregameWindow.id("pregame");
    pregameWindow.size(pageWidth, pageHeight);

    let backing = createImg(pg_back);
    backing.parent(pregameWindow);
    backing.size(pageWidth, pageHeight);
    backing.position(0, 0);
    backing.attribute("draggable", "false");

    let gameType = "single player game";
    if (coop) {
      gameType = "co-op game";
    }
    if (pvpMode) {
      gameType = "player vs player game";
    }

    let exit = createP("X");
    exit.style("color", "white");
    exit.style("background-color", "red");
    exit.style("font-size", "18px");
    exit.style("font-family", "ARCADE_I");
    exit.style("padding", "2px");
    exit.mouseClicked(PreGameInterface.exitPreGameMenu);

    exit.parent(pregameWindow);
    exit.position(toolLineX, toolLineY);

    let title = createP(" New " + gameType);
    title.style("color", "white");
    title.style("font-size", "18px");
    title.style("font-family", "ARCADE_I");
    title.position(pageWidth / 2 - title.size.width / 2, toolLineY);
    title.parent(pregameWindow);
    title.style("text-align", "center");

    let go = createImg(pg_ganestart);
    go.parent(pregameWindow);
    go.size(120, 80);
    go.position(750, footerY - 30);
    go.mouseClicked(PreGameInterface.startGame);

    let diff = createP(pvpMode ? "Rounds" : "Difficulty");
    diff.style("color", "black");
    diff.style("background-color", "white");
    diff.style("font-size", "18px");
    diff.style("font-family", "ARCADE_I");
    diff.style("padding", "2px");
    diff.parent(pregameWindow);
    diff.position(100, footerY - 40);

    if (pvpMode) {
      PreGameInterface.renderDifficultySelect(true);
    } else {
      PreGameInterface.renderDifficultySelect(false);
    }
    PreGameInterface.renderControlShow(pvpMode || coop);
    PreGameInterface.renderObjectives();
  }

  static renderObjectives() {
    let title = createP("Your Mission");
    title.style("color", "black");
    title.style("background-color", "white");
    title.style("font-size", "18px");
    title.style("font-family", "ARCADE_I");
    title.style("padding", "2px");
    title.position(575, root_y);
    title.parent(pregameWindow);

    let objText = standard_mini_obj;
    if (pvpMode) {
      objText = pvp_mini_obj;
    }
    let blurb = createP(objText);
    blurb.parent(pregameWindow);
    blurb.style("font-size", "12px");
    blurb.style("font-family", "ARCADE_I");
    blurb.style("color", "white");
    blurb.position(575, root_y + 50);
    blurb.size(305, 200);

    let linkto = createP("How to play >");
    linkto.parent(pregameWindow);
    linkto.style("font-size", "16px");
    linkto.style("padding", "2px");

    linkto.style("font-family", "ARCADE_I");
    linkto.style("color", "white");
    linkto.style("background-color", gameOrange);
    linkto.position(660, 500);
    linkto.mouseClicked(() => {
      if (!muted) menuClickSound.play();
      PreGameInterface.showHTP();
    });
  }

  static showHTP() {
    Settings.gotoSettings();
    switchToHelp();
  }

  static renderControlShow(multiplayer) {
    let controls;
    let addControls;

    let offset_x = root_x + 150;
    let offset_y;

    let ctrl_pad_x = 160;
    let ctrl_pad_y = ctrl_pad_x * 1.1;

    let add_contrl_x = 110;
    let add_contrl_y;

    let control_title = createP("controls");
    control_title.style("color", "black");
    control_title.style("background-color", "white");
    control_title.style("font-size", "18px");
    control_title.style("padding", "2px");
    control_title.style("font-family", "ARCADE_I");
    control_title.parent(pregameWindow);
    control_title.position(100, root_y);

    if (wasd_control) {
      controls = createImg(wasd_icon);
    } else {
      controls = createImg(arrow_icon);
    }
    controls.parent(pregameWindow);
    controls.position(85, 340);
    controls.size(ctrl_pad_x, ctrl_pad_y);
    controls.attribute("draggable", "false");

    if (multiplayer) {
      let secondary_controls;

      if (wasd_control) {
        secondary_controls = createImg(arrow_icon);
      } else {
        secondary_controls = createImg(wasd_icon);
      }
      secondary_controls.parent(pregameWindow);
      secondary_controls.position(offset_x, 340);
      secondary_controls.size(ctrl_pad_x, ctrl_pad_y);
      secondary_controls.attribute("draggable", "false");
      offset_x += 170;
    }
    if (pvpMode) {
      addControls = createImg(add_ctrls_pvp);
      add_contrl_y = add_contrl_x / 1.6;
      offset_y = 345;
    } else {
      addControls = createImg(add_ctrls);
      add_contrl_y = add_contrl_x * 1.2;
      offset_y = 360;
    }
    addControls.parent(pregameWindow);
    addControls.position(offset_x, offset_y);
    addControls.size(add_contrl_x, add_contrl_y);
    addControls.attribute("draggable", "false");
  }

  static renderDifficultySelect(pvp) {
    let roundMarker = ["A", "B", "C"];
    let offset = 120;
    let diff_lvl;
    for (let i = 0; i < 3; i++) {
      if (pvp) {
        diff_lvl = createP(bestof_opts[i]);
      } else {
        diff_lvl = createP(difficultyNames[i]);
      }
      if (pvp) {
        diff_lvl.id(roundMarker[i]);
      } else {
        diff_lvl.id(difficultyNames[i]);
      }

      diff_lvl.parent(pregameWindow);
      diff_lvl.style("font-size", pvp ? "18px" : "15px");
      if (pvp) {
        diff_lvl.style("padding", "7px");

        diff_lvl.style("padding-left", "20px");
        diff_lvl.style("padding-right", "20px");
      } else {
        diff_lvl.style("padding", "7px");
      }
      diff_lvl.style("font-family", "ARCADE_I");
      diff_lvl.style("color", pvp ? "black" : "white");
      if (!pvp) {
        diff_lvl.style("background-color", difficultyTints[i]);
      } else {
        diff_lvl.style("background-color", "white");
      }

      if ((pvp && roundIndex != i) || (!pvp && difficultyIndex != i)) {
        diff_lvl.style("opacity", "0.35");
      }
      diff_lvl.position(100 + offset * i, footerY);
      diff_lvl.mouseClicked(() => {
        if (!muted) menuClickSound.play();
        if (pvp) {
          pvp_rounds = bestof_opts[i];
          roundIndex = i;
        } else {
          difficulty = i;
          difficultyIndex = i;
        }
        let current = select(
          pvp ? "#" + roundMarker[i] : "#" + difficultyNames[i]
        );
        current.style("opacity", "1");

        for (let j = 0; j < 3; j++) {
          let other = select(
            pvp ? "#" + roundMarker[j] : "#" + difficultyNames[j]
          );
          if (i != j) {
            other.style("opacity", "0.35");
          }
        }
      });
    }
  }

  static renderPregamePVP() {
    pvpBestOfCount = createP(pvp_rounds);
    pvpBestOfCount.style("color", "white");
    pvpBestOfCount.style("font-size", "18px");
    pvpBestOfCount.style("font-family", "ARCADE_I");
    pvpBestOfCount.parent(pregameWindow);
    pvpBestOfCount.position(root_x + 50, footerY);

    let back = UniversalUI.backStepper(pregameWindow);
    back.position(root_x, footerY - 20);
    back.mouseClicked(() => {
      if (!muted) menuClickSound.play();
      roundIndex = UniversalUI.stepperUpdate(0, 2, roundIndex, back, next, -1);
      PreGameInterface.displayUpdate();
    });

    let next = UniversalUI.forwardStepper(pregameWindow);
    next.position(root_x + 100, footerY - 20);
    next.mouseClicked(() => {
      if (!muted) menuClickSound.play();
      roundIndex = UniversalUI.stepperUpdate(0, 2, roundIndex, back, next, 1);
      PreGameInterface.displayUpdate();
    });
  }

  static displayUpdate() {
    pvpBestOfCount.remove();

    pvp_rounds = bestof_opts[roundIndex];

    pvpBestOfCount = createP(pvp_rounds);
    pvpBestOfCount.style("color", "white");
    pvpBestOfCount.style("font-size", "18px");
    pvpBestOfCount.style("font-family", "ARCADE_I");
    pvpBestOfCount.parent(pregameWindow);
    pvpBestOfCount.position(root_x + 50, footerY);
  }
}
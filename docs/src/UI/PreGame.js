let pregameWindow;
let bestof_opts = [1, 3, 5];
var matchIndex = 0;
var pvpBestOfCount;
let root_x = 250;
let root_y = 300;
let toolLineY = 225;
let toolLineX = 75;
let footerY = 580;

let standard_mini_obj =
  "Kill the space dogs <br> to unlock the door to <br> the next room. Use slow <br> meow to slow it down <br> when things get hairy.";
let pvp_mini_obj =
  "Cat's aren't loyal. <br> You've turned on your <br> fellow feline. Choose <br> the number of rounds, <br> best killer of these <br> wins!";

class PreGameInterface {
  static exitPreGameMenu() {
    // Reset to defaults...

    pregameWindow.remove();
  }

  static startGame() {
    gameSwitch(true);
    pregameWindow.remove();
  }
  static renderPregame() {
    // determine UI/options based on globals...
    pregameWindow = createDiv();
    pregameWindow.id("pregame");
    pregameWindow.size(pageWidth, pageHeight);

    let backing = createImg(pg_back);
    backing.parent(pregameWindow);
    backing.size(pageWidth, pageHeight);
    backing.position(0, 0);

    let gameType = "single player game *";
    if (coop) {
      gameType = "co-op game *";
    }
    if (pvpMode) {
      gameType = "player vs player game *";
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

    let title = createP(" * New " + gameType);
    title.style("color", "white");
    // title.style("background-color", "white");

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
      PreGameInterface.renderPregamePVP();
    } else {
      PreGameInterface.renderDifficultySelect();
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
    title.position(600, root_y);
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

    blurb.position(600, root_y + 50);
  }

  static renderControlShow(multiplayer) {
    let controls;
    let offset = root_x + 20;

    let ctrl_pad_x = 150;
    let ctrl_pad_y = ctrl_pad_x * 1.1;

    let add_contrl_x = 100;
    let add_contrl_y = add_contrl_x * 1.2;

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
    controls.position(100, 350);
    controls.size(ctrl_pad_x, ctrl_pad_y);

    if (multiplayer) {
      let secondary_controls;

      if (wasd_control) {
        secondary_controls = createImg(arrow_icon);
      } else {
        secondary_controls = createImg(wasd_icon);
      }
      secondary_controls.parent(pregameWindow);
      secondary_controls.position(offset, 350);
      secondary_controls.size(ctrl_pad_x, ctrl_pad_y);
      offset += 150;
    }
    let addControls = createImg(add_ctrls);
    addControls.parent(pregameWindow);
    addControls.position(offset, 350);
    addControls.size(add_contrl_x, add_contrl_y);
  }
  static renderDifficultySelect() {
    let baseDiffX = 320;
    let offset = 120;

    for (let i = 0; i < 3; i++) {
      let diff_lvl = createP(difficultyNames[i]);
      diff_lvl.id(difficultyNames[i]);
      diff_lvl.parent(pregameWindow);
      diff_lvl.style("font-size", "15px");
      diff_lvl.style("padding", "7px");
      diff_lvl.style("font-family", "ARCADE_I");
      diff_lvl.style("color", "white");
      diff_lvl.style("background-color", difficultyTints[i]);
      if (difficulty != i) {
        diff_lvl.style("opacity", "0.35");
      }
      diff_lvl.position(100 + offset * i, footerY);
      diff_lvl.mouseClicked(() => {
        if (!muted) menuSelectSound.play();
        difficulty = i;
        diff_lvl.style("opacity", "1");
        for (let j = 0; j < 3; j++) {
          if (j != i) {
            console.log(pregameWindow.child());
            let other = select("#" + difficultyNames[j]);
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
    pvpBestOfCount.position(root_x + 30, footerY);

    let back = UniversalUI.backStepper(pregameWindow);
    back.position(root_x, footerY);
    back.mouseClicked(() => {
      if (!muted) menuSelectSound.play();
      matchIndex = UniversalUI.stepperUpdate(0, 2, matchIndex, back, next, -1);
      PreGameInterface.displayUpdate();
    });

    let next = UniversalUI.forwardStepper(pregameWindow);
    next.position(root_x + 65, footerY);
    next.mouseClicked(() => {
      if (!muted) menuSelectSound.play();
      matchIndex = UniversalUI.stepperUpdate(0, 2, matchIndex, back, next, 1);
      PreGameInterface.displayUpdate();
    });
  }

  static displayUpdate() {
    pvpBestOfCount.remove();

    pvp_rounds = bestof_opts[matchIndex];

    pvpBestOfCount = createP(pvp_rounds);
    pvpBestOfCount.style("color", "white");
    pvpBestOfCount.style("font-size", "18px");
    pvpBestOfCount.style("font-family", "ARCADE_I");
    pvpBestOfCount.parent(pregameWindow);
    pvpBestOfCount.position(root_x + 30, footerY);
  }
}

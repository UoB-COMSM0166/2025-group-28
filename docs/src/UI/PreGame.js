let pregameWindow;
let bestof_opts = [3, 5, 7, 11];
var matchIndex = 0;
var pvpBestOfCount;
let root_x = 245;
let root_y = 300;
let toolLineY = 240;
let toolLineX = 90;

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

    let gameType = "single player *";
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
    exit.mouseClicked(PreGameInterface.exitPreGameMenu);

    exit.parent(pregameWindow);
    exit.position(toolLineX, toolLineY);

    let title = createP(" * New " + gameType);
    title.style("color", "black");
    title.style("background-color", "white");

    title.style("font-size", "18px");
    title.style("font-family", "ARCADE_I");
    title.position(255, toolLineY);
    title.parent(pregameWindow);

    let go = createImg(pg_ganestart);
    go.parent(pregameWindow);
    go.size(120, 80);
    go.position(700, 550);
    go.mouseClicked(PreGameInterface.startGame);

    if (pvpMode) {
      PreGameInterface.renderPregamePVP();
    } else {
      PreGameInterface.renderDifficultySelect();
    }
  }

  static renderDifficultySelect() {
    let diff = createP("Difficulty:");
    diff.style("color", "white");
    diff.style("font-size", "18px");
    diff.style("font-family", "ARCADE_I");
    diff.parent(pregameWindow);
    diff.position(120, 300);

    let baseDiffX = 350;
    let offset = 140;

    for (let i = 0; i < 3; i++) {
      let diff_lvl = createP(difficultyNames[i]);
      diff_lvl.parent(pregameWindow);
      diff_lvl.style("font-size", "18px");
      diff_lvl.style("font-family", "ARCADE_I");
      diff_lvl.style("color", "white");
      diff_lvl.position(baseDiffX + offset * i, 300);
    }
  }

  static renderPregamePVP() {
    let pvpBestOf = createP("Rounds");
    pvpBestOf.style("color", "white");
    pvpBestOf.style("font-size", "18px");
    pvpBestOf.style("font-family", "ARCADE_I");
    pvpBestOf.parent(pregameWindow);
    pvpBestOf.position(120, root_y);

    pvpBestOfCount = createP(pvp_rounds);
    pvpBestOfCount.style("color", "white");
    pvpBestOfCount.style("font-size", "18px");
    pvpBestOfCount.style("font-family", "ARCADE_I");
    pvpBestOfCount.parent(pregameWindow);
    pvpBestOfCount.position(root_x + 30, root_y);

    let back = UniversalUI.backStepper(pregameWindow);
    back.position(root_x, root_y);
    back.mouseClicked(() => {
      matchIndex = UniversalUI.stepperUpdate(0, 3, matchIndex, back, next, -1);
      PreGameInterface.displayUpdate();
    });

    let next = UniversalUI.forwardStepper(pregameWindow);
    next.position(root_x + 65, root_y);
    next.mouseClicked(() => {
      matchIndex = UniversalUI.stepperUpdate(0, 3, matchIndex, back, next, 1);
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
    pvpBestOfCount.position(root_x + 30, root_y);
  }
}

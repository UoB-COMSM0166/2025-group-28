let pregameWindow;
let bestof_opts = [3, 5, 7, 11];
var matchIndex = 0;
var pvpBestOfCount;
class PreGameInterface {
  static renderPregame() {
    // determine UI/options based on globals...
    pregameWindow = createDiv();
    pregameWindow.id("pregame");
    pregameWindow.size(pageWidth, pageWidth);
    let backing = createImg(pg_back);
    backing.parent(pregameWindow);
    backing.position(0, 0);

    let gameType = "single player *";
    if (coop) {
      gameType = "co-op game *";
    }
    if (pvpMode) {
      gameType = "player vs player game *";
    }

    let title = createP(" * New " + gameType);
    title.style("color", "black");
    title.style("background-color", "white");

    title.style("font-size", "18px");
    title.style("font-family", "ARCADE_I");
    title.position(265, 320);
    title.parent(pregameWindow);

    if (pvpMode) {
      PreGameInterface.renderPregamePVP();
    }
  }
  static renderPregamePVP() {
    let pvpBestOf = createP("Rounds");
    pvpBestOf.style("color", "white");
    pvpBestOf.style("font-size", "18px");
    pvpBestOf.style("font-family", "ARCADE_I");
    pvpBestOf.parent(pregameWindow);
    pvpBestOf.position(200, 400);

    pvpBestOfCount = createP(pvp_rounds);
    pvpBestOfCount.style("color", "white");
    pvpBestOfCount.style("font-size", "18px");
    pvpBestOfCount.style("font-family", "ARCADE_I");
    pvpBestOfCount.parent(pregameWindow);
    pvpBestOfCount.position(550, 400);

    let back = UniversalUI.backStepper(pregameWindow);
    back.position(520, 400);
    back.mouseClicked(() => {
      UniversalUI.stepperUpdate(0, 3, matchIndex, back, next, -1);
      PreGameInterface.displayUpdate();
    });

    let next = UniversalUI.forwardStepper(pregameWindow);
    next.position(580, 400);
    next.mouseClicked(() => {
      UniversalUI.stepperUpdate(0, 3, matchIndex, back, next, 1);
      PreGameInterface.displayUpdate();
    });
  }

  static displayUpdate() {
    pvpBestOfCount.remove();

    pvp_rounds = bestof_opts[matchIndex];
    console.log(pvp_rounds);
    console.log(matchIndex);
    pvpBestOfCount = createP(pvp_rounds);
    pvpBestOfCount.style("color", "white");
    pvpBestOfCount.style("font-size", "18px");
    pvpBestOfCount.style("font-family", "ARCADE_I");
    pvpBestOfCount.parent(pregameWindow);
    pvpBestOfCount.position(550, 400);
  }
}

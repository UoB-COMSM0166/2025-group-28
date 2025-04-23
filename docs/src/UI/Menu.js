class Menu {
  static renderMenu() {
    menuContainer = createDiv();
    menuContainer.id("menuContainer");
    menuContainer.size(pageWidth, pageHeight);

    menuBack.parent(menuContainer);
    menuBack.size(pageWidth, pageHeight);
    menuBack.attribute("draggable", "false");

    menuStart();
    setTimeout(() => {
      // Sets the menu to play on hover if browser is blocking autoplay
      if (menuBack.time() <= 0) {
        menuBack.mouseOver(menuStart);
      }
    }, 1000);

    sp_button = createImg(singlePlayerIcon);
    sp_button.parent(menuContainer);
    sp_button.position(pageWidth / 4 - 170, pageHeight * 0.62);
    sp_button.size(170, 120);
    sp_button.mouseClicked(() => {
      if (!muted) menuSelectSound.play();
      Menu.singlePlayerStart();
    });
    sp_button.style("opacity", "0.5");
    sp_button.attribute("draggable", "false");
    sp_button.mouseOver(Menu.singlePlayerHover);
    sp_button.mouseOut(Menu.singlePlayerEndHover);

    coop_button = createImg(coopIcon);
    coop_button.parent(menuContainer);
    coop_button.position(pageWidth / 2 - 190, pageHeight * 0.62);
    coop_button.size(170, 120);
    coop_button.mouseClicked(() => {
      if (!muted) menuSelectSound.play();
      Menu.coopPlayerStart();
    });
    coop_button.style("opacity", "0.5");
    coop_button.attribute("draggable", "false");
    coop_button.mouseOver(Menu.coopHover);
    coop_button.mouseOut(Menu.coopEndHover);

    pvp_button = createImg(pvpIcon);
    pvp_button.parent(menuContainer);
    pvp_button.position(pageWidth / 2 + 25, pageHeight * 0.62);
    pvp_button.size(170, 120);
    pvp_button.mouseClicked(() => {
      if (!muted) menuSelectSound.play();
      Menu.pvpStart();
    });
    pvp_button.style("opacity", "0.5");
    pvp_button.attribute("draggable", "false");
    pvp_button.mouseOver(Menu.pvpHover);
    pvp_button.mouseOut(Menu.pvpEndHover);

    stng_button = createImg(helpIcon);
    stng_button.parent(menuContainer);
    stng_button.position(pageWidth * 0.75, pageHeight * 0.62);
    stng_button.size(170, 120);
    stng_button.style("opacity", "0.5");
    stng_button.attribute("draggable", "false");
    stng_button.mouseOver(Menu.stngHover);
    stng_button.mouseOut(Menu.stngEndHover);
    stng_button.mouseClicked(() => {
      if (!muted) menuSelectSound.play();
      Settings.gotoSettings();
    });

    difficultyButton = createButton(
      "Difficulty: " + difficultyNames[difficulty]
    );
    difficultyButton.parent(menuContainer);
    difficultyButton.position(pageWidth / 3 + 60, pageHeight * 0.8);
    difficultyButton.mouseClicked(() => {
      if (!muted) menuClickSound.play();
      Menu.changeDifficulty();
    });
    difficultyButton.size(160, 55);
    difficultyButton.attribute("draggable", "false");
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

  static changeDifficulty() {
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

  static singlePlayerStart() {
    coop = false;
    pvpMode = false;
    PreGameInterface.renderPregame();

    //gameSwitch(true);
  }

  static coopPlayerStart() {
    pvpMode = false;
    coop = true;
    PreGameInterface.renderPregame();

    //gameSwitch(true);
  }

  static pvpStart() {
    coop = false;
    pvpMode = true;
    PreGameInterface.renderPregame();

    // gameSwitch(true);
  }

  static singlePlayerHover() {
    sp_button.style("opacity", "1");
  }

  static coopHover() {
    coop_button.style("opacity", "1");
  }

  static stngHover() {
    stng_button.style("opacity", "1");
  }

  static pvpHover() {
    pvp_button.style("opacity", "1");
  }

  static singlePlayerEndHover() {
    sp_button.style("opacity", "0.5");
  }

  static coopEndHover() {
    coop_button.style("opacity", "0.5");
  }

  static stngEndHover() {
    stng_button.style("opacity", "0.5");
  }

  static pvpEndHover() {
    pvp_button.style("opacity", "0.5");
  }
}

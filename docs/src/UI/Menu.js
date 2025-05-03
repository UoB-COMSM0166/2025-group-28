let menu_hover_caption;

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
      if (!muted) menuClickSound.play();
      Menu.singlePlayerStart();
    });
    sp_button.style("opacity", "0.5");
    sp_button.attribute("draggable", "false");
    sp_button.mouseOver(Menu.singlePlayerHover);
    sp_button.mouseOut(Menu.singlePlayerEndHover);
    sp_button.class("navigation");

    menu_hover_caption = createP("-");
    menu_hover_caption.parent(menuContainer);
    menu_hover_caption.position(pageWidth / 2 - 200, pageHeight * 0.62 + 130);
    menu_hover_caption.size(400, 50);
    menu_hover_caption.style("font-family", "ARCADE_I");
    menu_hover_caption.style("color", "white");
    menu_hover_caption.style("display", "none");
    menu_hover_caption.style("text-align", "center");

    coop_button = createImg(coopIcon);
    coop_button.parent(menuContainer);
    coop_button.position(pageWidth / 2 - 190, pageHeight * 0.62);
    coop_button.size(170, 120);
    coop_button.mouseClicked(() => {
      if (!muted) menuClickSound.play();
      Menu.coopPlayerStart();
    });
    coop_button.style("opacity", "0.5");
    coop_button.attribute("draggable", "false");
    coop_button.mouseOver(Menu.coopHover);
    coop_button.mouseOut(Menu.coopEndHover);
    coop_button.class("navigation");

    pvp_button = createImg(pvpIcon);
    pvp_button.parent(menuContainer);
    pvp_button.position(pageWidth / 2 + 25, pageHeight * 0.62);
    pvp_button.size(170, 120);
    pvp_button.mouseClicked(() => {
      if (!muted) menuClickSound.play();
      Menu.pvpStart();
    });
    pvp_button.style("opacity", "0.5");
    pvp_button.attribute("draggable", "false");
    pvp_button.mouseOver(Menu.pvpHover);
    pvp_button.mouseOut(Menu.pvpEndHover);
    pvp_button.class("navigation");

    stng_button = createImg(helpIcon);
    stng_button.parent(menuContainer);
    stng_button.position(pageWidth * 0.75, pageHeight * 0.62);
    stng_button.size(170, 120);
    stng_button.style("opacity", "0.5");
    stng_button.attribute("draggable", "false");
    stng_button.mouseOver(Menu.stngHover);
    stng_button.mouseOut(Menu.stngEndHover);
    stng_button.class("navigation");
    stng_button.mouseClicked(() => {
      if (!muted) menuClickSound.play();
      Settings.gotoSettings();
    });
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
  }

  static coopPlayerStart() {
    pvpMode = false;
    coop = true;
    PreGameInterface.renderPregame();
  }

  static pvpStart() {
    coop = false;
    pvpMode = true;
    PreGameInterface.renderPregame();
  }

  static singlePlayerHover() {
    menu_hover_caption.html("Explore the spaceship alone");
    sp_button.style("opacity", "1");
    menu_hover_caption.style("display", "inline");
  }

  static coopHover() {
    menu_hover_caption.html("Explore the spaceship together");
    menu_hover_caption.style("display", "inline");
    coop_button.style("opacity", "1");
  }

  static stngHover() {
    menu_hover_caption.html("Settings and How-to-play");
    menu_hover_caption.style("display", "inline");
    stng_button.style("opacity", "1");
  }

  static pvpHover() {
    menu_hover_caption.html("Fight each other in a deathmatch");
    menu_hover_caption.style("display", "inline");
    pvp_button.style("opacity", "1");
  }

  static singlePlayerEndHover() {
    sp_button.style("opacity", "0.5");
    menu_hover_caption.style("display", "none");
  }

  static coopEndHover() {
    coop_button.style("opacity", "0.5");
    menu_hover_caption.style("display", "none");
  }

  static stngEndHover() {
    stng_button.style("opacity", "0.5");
    menu_hover_caption.style("display", "none");
  }

  static pvpEndHover() {
    pvp_button.style("opacity", "0.5");
    menu_hover_caption.style("display", "none");
  }
}

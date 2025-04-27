class GameUI {
  static drawUITop() {
    push();
    textSize(28);
    textFont(gameFont);
    textAlign(CENTER);
    fill(255, 255, 255);
    var roomNumber;
    var scoreNumber;
    if (!pvpMode) {
      roomNumber = "Room " + game.roomSeq;
    } else {
      roomNumber = "Round " + game.roomSeq;
    }

    if (pvpMode) {
      pop();
      push();
      textSize(16);
      textFont(gameFont);
      textAlign(CENTER);
      fill(gameOrange);
      text("Best of " + pvp_rounds + " round(s)", 245, 40);
      pop();
      push();
      textSize(28);
      textFont(gameFont);
      textAlign(CENTER);
      fill(255, 255, 255);
    }

    text(roomNumber, 200, 80);
    if (!coop && !pvpMode) {
      scoreNumber = "Score:" + game.currScoreP1;
      text(scoreNumber, 750, 80);
    } else {
      textSize(16);
      if (coop) {
        scoreNumber = "Score A:" + game.currScoreP1;
        text(scoreNumber, 750, 70);
        scoreNumber = "Score B:" + game.currScoreP2;
        text(scoreNumber, 750, 90);
      } else if (pvpMode) {
        push();
        textSize(40);
        var divider = "|";
        text(divider, 312, 85);
        pop();
        scoreNumber = "Kills A:" + game.currScoreP1;
        text(scoreNumber, 400, 65);
        scoreNumber = "Kills B:" + game.currScoreP2;
        text(scoreNumber, 400, 85);
        scoreNumber = "Total A:" + game.p1PVPTotal;
        text(scoreNumber, 825, 65);
        scoreNumber = "Total B:" + game.p2PVPTotal;
        text(scoreNumber, 825, 85);
      }
    }
    pop();
  }

  static drawUIBottom() {
    // Player heat bars
    const barWidth = 200;
    const barHeight = 20;
    PlayerHUD.drawPlayerHeatBar(
      width / 4 - 90,
      height - 80,
      barWidth,
      barHeight,
      playerA.fireCooldown / 200,
      "PLAYER A"
    );
    if (coop || pvpMode) {
      PlayerHUD.drawPlayerHeatBar(
        width / 4 + 400,
        height - 80,
        barWidth,
        barHeight,
        playerB.fireCooldown / 200,
        "PLAYER B"
      );
    }
    push();
    textSize(16);
    textFont(gameFont);
    textAlign(CENTER);
    if (!pvpMode) {
      let slowMeowIndicator = "";
      let textColour;
      if (
        game.slowMeowHandler.level == slowMeowMax &&
        playerA.fireOverheat &&
        (!coop || playerB.fireOverheat)
      ) {
        slowMeowIndicator = "SLOW MEOW:BLOCKED";
        textColour = [210, 0, 0];
      } else if (
        !game.slowMeowHandler.usable ||
        game.slowMeowHandler.occurring
      ) {
        slowMeowIndicator =
          "SLOW MEOW:" + Math.floor(game.slowMeowHandler.level) + "%";
        textColour = [100, 150, 255];
      } else if (game.slowMeowHandler.usable) {
        slowMeowIndicator = "SLOW MEOW:READY";
        textColour = [0, 255, 255];
      }
      if (slowMeowIndicator) {
        fill(...textColour);
        text(slowMeowIndicator, width / 2 + 20, height - 63);
      }
    }
    pop();
  }

  static drawMobHealthBar(mob) {
    // Health bar calculations
    const healthBarWidth = mob.widthModel * 0.6;
    const healthBarHeight = 5;
    const healthPercentage = mob.health / mob.maxHealth;

    // Calculate center positions
    const yOffset = 6; // Space between sprite and health bar
    const spriteCenterX = mob.position.x;
    const spriteTop = mob.position.y - mob.heightModel / 2;

    // Health bar positioning
    const healthBarX = spriteCenterX - healthBarWidth / 2;
    const healthBarY = spriteTop - yOffset - healthBarHeight;

    // Health bar background
    fill(255, 0, 0);
    rect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

    // Current health
    fill(0, 255, 0);
    rect(
      healthBarX,
      healthBarY,
      healthBarWidth * healthPercentage,
      healthBarHeight
    );
  }
}

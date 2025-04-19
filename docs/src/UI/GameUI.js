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
    playerA.drawPlayerHeatBar(
      width / 4 - 90,
      height - 80,
      barWidth,
      barHeight,
      playerA.fireCooldown / 200,
      "PLAYER A"
    );
    if (coop || pvpMode) {
      playerB.drawPlayerHeatBar(
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
      if (
        coop &&
        game.slowMeowLevel == slowMeowMax &&
        playerA.fireOverheat &&
        playerB.fireOverheat
      ) {
        fill(210, 0, 0);
        text("SLOW MEOW:BLOCKED", width / 2 + 20, height - 63);
      } else if (
        !coop &&
        game.slowMeowLevel == slowMeowMax &&
        playerA.fireOverheat
      ) {
        fill(210, 0, 0);
        text("SLOW MEOW:BLOCKED", width / 2 + 20, height - 63);
      } else if (!game.slowMeowUsable || game.slowMeowOccurring) {
        fill(100, 150, 255);
        text(
          "SLOW MEOW:" + Math.floor(game.slowMeowLevel) + "%",
          width / 2 + 20,
          height - 63
        );
      } else if (!game.slowMeowOccurring && game.slowMeowUsable) {
        fill(0, 255, 255);
        text("SLOW MEOW:READY", width / 2 + 20, height - 63);
      }
    }
    pop();
  }
}
class GameOver {
  static renderGameOverInterface() {
    fill("rgba(0, 0, 0, 0.7)");
    let endMask = rect(0, 0, 950, 800);

    gameOverContainer = createDiv();
    gameOverContainer.id("gameover");
    gameOverContainer.size(pageWidth, pageHeight);

    let game_over_txt = createImg(gameoverback);
    game_over_txt.parent(gameOverContainer);
    game_over_txt.size(pageWidth, pageHeight);
    game_over_txt.position(0, 0);
    game_over_txt.attribute("draggable", "false");

    let scoretext_p1;
    if (coop) {
      scoretext_p1 =
        "Player A: " +
        game.currScoreP1 +
        "<br>" +
        "Player B: " +
        game.currScoreP2;
    } else if (pvpMode) {
      let winText;
      if (game.p1PVPTotal == game.p2PVPTotal) {
        winText = "<br>" + "It's a tie!";
      } else if (game.p1PVPTotal > game.p2PVPTotal) {
        winText = "<br>" + "Player A wins!";
      } else {
        winText = "<br>" + "Player B wins!";
      }
      scoretext_p1 =
        "Player A: " +
        game.p1PVPTotal +
        "<br>" +
        "Player B: " +
        game.p2PVPTotal +
        winText;
    } else {
      scoretext_p1 = "Total Score: " + game.currScoreP1;
    }

    scoretotal = createP(scoretext_p1);
    let xpos = 400 - scoretext_p1.width;
    scoretotal.position(xpos, 400);
    scoretotal.parent(gameOverContainer);
    scoretotal.style("color", "orange");
    scoretotal.style("font-size", "25px");
    scoretotal.style("font-family", "ARCADE_I");
    scoretotal.style("text-align", "center");
    scoretotal.style("vertical-align", "middle");
  }

  static gameOverReturn() {
    gameOverContainer.remove();
    if (pvpMode) {
      pvpMusic.stop();
    } else {
      gameMusic.stop();
    }

    gameSwitch(false);
  }
}

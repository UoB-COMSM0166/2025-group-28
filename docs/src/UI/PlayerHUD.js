class PlayerHUD {
  static drawPlayerHealthBar() {
    let playerAHealthRatio = playerA.health / playerA.maxHealth;
    let frame = 13 - Math.ceil(13 * playerAHealthRatio);
    image(healthbar, 40, 220);
    healthbar.pause();
    healthbar.setFrame(frame);

    if (coop || pvpMode) {
      let playerBHealthRatio = playerB.health / playerB.maxHealth;
      let frame = 13 - Math.ceil(13 * playerBHealthRatio);
      image(healthbar_b, 910, 220);
      healthbar_b.pause();
      healthbar_b.setFrame(frame);
    }
  }

  static drawPlayerHeatBar(x, y, width, height, value, label) {
    let player;
    if (label == "PLAYER A") player = playerA;
    else player = playerB;
    // Draw outer bar
    push();
    stroke(150);
    strokeWeight(2);
    noFill();
    rect(x, y, width, height, 5);
    pop();

    const fillWidth = constrain(value * width, 0, width);
    let fillColor;
    if (player.fireOverheat) {
      // Causes the bar to flash when overheated
      if (frameCount % 20 < 10) {
        fillColor = color(255, 0, 0); // Red
      } else {
        fillColor = color(255, 150, 0); // Orange
      }
    } else {
      let greenAmount, redAmount;
      // Goes from green to yellow to red as heat increases
      if (value < 0.5) {
        greenAmount = map(value, 0, 0.5, 255, 255);
        redAmount = map(value, 0, 0.5, 0, 255);
      } else {
        greenAmount = map(value, 0.5, 1, 255, 0);
        redAmount = 255;
      }
      fillColor = color(redAmount, greenAmount, 0);
    }

    push();
    noStroke();
    fill(fillColor);
    rect(x, y, fillWidth, height, 5);
    pop();

    // Warning text if close to overheating
    if (value > 0.75 || player.fireOverheat) {
      push();
      let textColor;
      if (player.fireOverheat) textColor = color(255);
      else textColor = color(70, 0, 0);
      fill(textColor);
      textAlign(CENTER, CENTER);
      textSize(14);
      textFont(gameFont);
      let statusText;
      if (player.fireOverheat) {
        statusText = "OVERHEATED!";
      } else {
        statusText = "WARNING!";
      }
      text(statusText, x + width / 2, y + height / 2);
      pop();
    }

    // Label
    push();
    fill(255);
    textAlign(CENTER);
    textSize(14);
    textFont(gameFont);
    text(label, x + width / 2, y - 10);
    pop();
  }

  static drawSlowMeow(game) {
    const elapsedTime = millis() - game.slowMeowHandler.startTime;
    const remainingTime = game.slowMeowHandler.duration - elapsedTime;

    // Gradually decreases slow meow level over time while slow meow is occurring
    // Looks nicer than seeing it immediately set to 0
    if (remainingTime > 0) {
      const decrementPerMillisecond = 100 / game.slowMeowHandler.duration;
      game.slowMeowHandler.level = Math.max(
        100 - decrementPerMillisecond * elapsedTime,
        0
      );
    } else {
      game.slowMeowHandler.level = 0;
    }

    // Colour the screen blue while SlowMeow is occurring
    push();
    noStroke();

    const gameAreaX = 100;
    const gameAreaY = 100;
    const gameAreaWidth = 800;
    const gameAreaHeight = 590;

    fill(0, 100, 255, 50);
    rect(gameAreaX, gameAreaY, gameAreaWidth, gameAreaHeight);

    textAlign(CENTER);
    textFont(gameFont);
    textSize(24);
    fill(255);

    const textY = gameAreaY + 120;

    if (remainingTime > game.slowMeowHandler.duration * 0.7) {
      text("SLOW MEOW STARTING", width / 2, textY);
    } else if (remainingTime < game.slowMeowHandler.duration * 0.3) {
      text("SLOW MEOW ENDING", width / 2, textY);
    }
    pop();
  }
}
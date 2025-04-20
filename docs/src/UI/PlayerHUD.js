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
    push();
    stroke(150);
    strokeWeight(2);
    noFill();
    rect(x, y, width, height, 5);

    const fillWidth = constrain(value * width, 0, width);

    let fillColor;
    if (this.fireOverheat) {
      // Causes the bar to flash when overheated
      if (frameCount % 20 < 10) {
        fillColor = color(255, 0, 0); // Red
      } else {
        fillColor = color(255, 150, 0); // Orange
      }
    } else {
      // Goes from green to yellow to red as heat increases
      if (value < 0.5) {
        let greenAmount = map(value, 0, 0.5, 255, 255);
        let redAmount = map(value, 0, 0.5, 0, 255);
        fillColor = color(redAmount, greenAmount, 0);
      } else {
        let greenAmount = map(value, 0.5, 1, 255, 0);
        fillColor = color(255, greenAmount, 0);
      }
    }
    pop();

    push();
    noStroke();
    fill(fillColor);
    rect(x, y, fillWidth, height, 5);

    // Warning text if close to overheating
    if (value > 0.75 && !this.fireOverheat) {
      fill(70, 0, 0);
      textAlign(CENTER, CENTER);
      textSize(14);
      textFont(gameFont);

      text("WARNING!", x + width / 2, y + height / 2);
    }

    // Overheat text
    if (this.fireOverheat) {
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(14);
      textFont(gameFont);

      text("OVERHEATED!", x + width / 2, y + height / 2);
    }
    pop();

    // Label
    push();
    fill(255);
    textAlign(CENTER);
    textSize(14);
    textFont(gameFont);
    text(label, x + width / 2, y - 10);
    pop();
  }
}
class Mob extends Sprite {
  constructor(img, x, y, difficultySettings) {
    super(img, x, y, 50);
    this.widthHitbox = 55;
    this.heightHitbox = 55;
    this.widthModel = 65;
    this.heightModel = 65;
    this.fireCooldown = 50;
    // Base mob should have fire cooldown limit even if mobs that inherit don't fire due to BuffMob buff
    this.fireCooldownLimit = 100;
    this.fireReady = false;
    this.difficultySettings = difficultySettings

    this.color = color(0, 255, 100);
    this.img = img;

    this.speed = 1; //Slightly slower than players
    this.direction = createVector(-1, 0); //Mob starts facing left
    this.bloodColour = color(150, 225, 75, 0);
  }

  update() {
    if (!this.isActive) {
      return;
    }
    let nearestPlayer = this.findNearestPlayer();
    if (nearestPlayer) {
      this.moveTowards(nearestPlayer);
    } else {
      this.velocity.set(0, 0);
    }
    this.fireUpdate();
    super.update();
  }

  drawMobHealthBar(){
    // Health bar calculations
    const healthBarWidth = this.widthModel * 0.6;
    const healthBarHeight = 5;
    const healthPercentage = this.health / this.maxHealth;

    // Calculate center positions
    const yOffset = 6; // Space between sprite and health bar
    const spriteCenterX = this.position.x;
    const spriteTop = this.position.y - this.heightModel / 2;

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

  fireUpdate() {
    this.fireCooldown += 1;
    if (this.fireCooldown > this.fireCooldownLimit) {
      this.fireReady = true;
      this.fireCooldown = 0;
    }
  }

  moveTowards(player) {
    if (!player.isActive) {
      return;
    }
    this.velocity.set(0, 0);
    //Moves smoothly towards whichever player is nearest
    let xDirection = player.position.x - this.position.x;
    let yDirection = player.position.y - this.position.y;
    this.direction = createVector(xDirection, yDirection);
    if (!this.isCollidingWith(player)) {
      this.velocity.x = xDirection * this.speed;
      this.velocity.y = yDirection * this.speed;
    } else {
      if (this.direction.x > 0) {
        this.position.x -= pushback;
      } else if (this.direction.x < 0) {
        this.position.x += pushback;
      }
      if (this.direction.y > 0) {
        this.position.y -= pushback;
      } else if (this.direction.y < 0) {
        this.position.y += pushback;
      }
    }
    // Normalises diagonal movement
    if (this.velocity.x !== 0 && this.velocity.y !== 0) {
      this.velocity.setMag(this.speed);
    }
    // Apply knockback force gradually
    if (this.knockbackForce.mag() > 0) {
      this.position.add(this.knockbackForce);
      this.knockbackForce.mult(0.9); // Reduce knockback force gradually
      if (this.knockbackForce.mag() < 0.1) {
        this.knockbackForce.set(0, 0); // Stop knockback when force is very small
      }
    }
  }

  findDistanceToPlayer(player) {
    let xDirection = this.position.x - player.position.x;
    let yDirection = this.position.y - player.position.y;
    let distance = sqrt(xDirection * xDirection + yDirection * yDirection);
    return distance;
  }

  findNearestPlayer() {
    if (coop) {
      if (!playerA.isActive && !playerB.isActive) {
        return null;
      }
      if (!playerA.isActive && playerB.isActive) {
        return playerB;
      }
      if (playerA.isActive && !playerB.isActive) {
        return playerA;
      }
      let distanceToPlayerA = this.findDistanceToPlayer(playerA);
      let distanceToPlayerB = this.findDistanceToPlayer(playerB);
      if (distanceToPlayerA < distanceToPlayerB) {
        return playerA;
      } else {
        return playerB;
      }
    } else {
      return playerA;
    }
  }

  // For adding/removing BuffMob buff
  applyBuff() {
    if (!this.isBuffed) {
      if (!this.isSlowed) this.originalSpeed = this.speed;
      this.speed *= 1.75;
      this.originalSpeed *= 1.75;
      this.attackDamage *= 1.5;
      this.maxHealth *= 2;
      this.health *= 2;
      this.fireCooldownLimit *= 0.5;
      this.isBuffed = true;
    }
  }

  removeBuff() {
    if (this.isBuffed) {
      this.speed /= 1.75;
      this.originalSpeed /= 1.75;
      this.attackDamage /= 1.5;
      this.maxHealth /= 2;
      this.health /= 2;
      this.fireCooldownLimit /= 0.5;
      this.isBuffed = false;
    }
  }
}

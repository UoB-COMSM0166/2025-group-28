class Mob extends Sprite {
  constructor(img, x, y, difficultySettings) {
    super(img, x, y, 50);
    this.img = img;
    this.widthHitbox = 55;
    this.heightHitbox = 55;
    this.widthModel = 65;
    this.heightModel = 65;
    this.fireCooldown = 50;
    this.fireCooldownLimit = 100;
    this.fireReady = false;
    this.difficultySettings = difficultySettings
    this.speed = 1; // Slightly slower than players
    this.direction = createVector(-1, 0); // Mob starts facing left
    this.bloodColour = color(150, 225, 75, 0);
  }

  update() {
    if (!this.isActive) return;
    let nearestPlayer = this.findNearestPlayer();
    if (nearestPlayer) {
      this.moveTowards(nearestPlayer);
    } else {
      this.velocity.set(0, 0);
    }
    this.fireUpdate();
    super.update();
  }

  fireUpdate() {
    if (
      (playerA && !playerA.isActive) &&
      (!coop || (playerB && !playerB.isActive))
    ) {
      return;
    }
    this.fireCooldown += 1;
    if (this.fireCooldown > this.fireCooldownLimit) {
      this.fireReady = true;
      this.fireCooldown = 0;
    }
  }

  moveTowards(player) {
    if (!player || !player.isActive) return;
    // Moves smoothly towards whichever player is nearest
    let xDirection = player.position.x - this.position.x;
    let yDirection = player.position.y - this.position.y;
    this.direction = createVector(xDirection, yDirection);
    if (!this.isCollidingWith(player)) {
      this.velocity.x = xDirection * this.speed;
      this.velocity.y = yDirection * this.speed;
    }
    this.normaliseDiagonalMovement();
    // Apply knockback force gradually
    if (this.knockbackVelocity.mag() > 0.1) {
      this.handleKnockback();
    }
  }

  findDistanceToPlayer(player) {
    if (!player) return;
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
      if (playerA.isActive) return playerA;
      else return null;
    }
  }

  // For adding/removing BuffMob buff
  applyBuff() {
    if (this.isBuffed || !this.isActive) return;
    this.isInvincible = false;
    this.invincibilityStartTime = 0;
    this.isFlashing = false;
    this.lastFlashTime = 0;
    if (!this.isSlowed) this.originalSpeed = this.speed;
    this.speed *= 1.75;
    this.originalSpeed *= 1.75;
    this.attackDamage *= 1.5;
    this.maxHealth *= 2;
    this.health *= 2;
    this.fireCooldownLimit *= 0.5;
    this.isBuffed = true;
  }

  removeBuff() {
    if (!this.isBuffed || !this.isActive) return;
    this.speed /= 1.75;
    this.originalSpeed /= 1.75;
    this.attackDamage /= 1.5;
    this.maxHealth /= 2;
    this.health /= 2;
    this.fireCooldownLimit /= 0.5;
    this.isBuffed = false;
  }
}

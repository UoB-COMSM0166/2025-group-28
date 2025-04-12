class BuffMob extends Mob {
  constructor(img, x, y, difficultySettings) {
    super(img, x, y, difficultySettings);
    this.widthHitbox = 65;
    this.heightHitbox = 50;
    // Health scales with player damage so player will always kill in 2 shots
    this.maxHealth = 20 * difficultySettings.playerDamageMult;
    this.health = this.maxHealth;
    // Very slow to increase chance of stray player bullets hitting mob
    this.speed = 0.2 * difficultySettings.mobSpeedMult;
    this.originalSpeed = this.speed;
    // Very low damage as mob not intended to 'attack' player
    this.attackDamage = 2 * difficultySettings.mobDamageMult;
    this.bloodColour = color(210, 0, 75, 0);
    this.target = null;
    this.isIdle = false;
    this.idleTime = null;
    this.deathSound = buffMobDeathSound;
    this.checkIfSlowMeowActive();
  }

  update() {
    if (!this.isActive) return;
    let nearestPlayer = this.findNearestPlayer();
    // If a player is nearby, move towards them
    if (nearestPlayer && nearestPlayer.position.dist(this.position) < 150) {
      this.target = nearestPlayer.position.copy();
      this.isIdle = false;
      this.idleTime = null;
    // Otherwise, move towards a random position in the room
    } else {
      if (!this.target || this.position.dist(this.target) < 5) {
        if (!this.isIdle && random(1) < 0.1) { // 10% chance to enter idle state
          this.isIdle = true;
          this.idleTime = millis();
          return;
        }
        if (this.isIdle && millis() - this.idleTime > 2000) { // Stop idling after 2 seconds
          this.isIdle = false;
          this.idleTime = null;
        }
        if (!this.isIdle) {
          let xPos = random(
              tileSize * 2 + this.widthHitbox / 2 + arena_offset,
              roomWidth * tileSize - tileSize * 2 - this.widthHitbox / 2 - arena_offset
            );
          let yPos = random(
              tileSize * 2 + this.heightHitbox / 2 + arena_offset,
              roomHeight * tileSize - tileSize * 2 - this.heightHitbox / 2 - arena_offset
            );
          this.target = createVector(xPos, yPos);
        }
      }
    }
    if (!this.isIdle && this.target) {
      this.moveToPosition(this.target);
    }
  }

  moveToPosition(target) {
    let direction = p5.Vector.sub(target, this.position);
    // Normalise speed
    if (direction.mag() > this.speed) {
      direction.setMag(this.speed);
    }
    this.velocity = direction;
    this.position.add(this.velocity);
  }
}

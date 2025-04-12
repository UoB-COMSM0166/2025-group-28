class BlinkMob extends Mob {
  constructor(img, x, y, difficultySettings) {
    super(img, x, y, difficultySettings);
    this.widthHitbox = 60;
    this.heightHitbox = 60;
    this.widthModel = 75;
    this.heightModel = 75;
    this.maxHealth = 50 * difficultySettings.mobHealthMult();
    this.health = this.maxHealth;
    this.speed = 0;
    this.originalSpeed = this.speed;
    this.attackDamage = 6 * difficultySettings.mobDamageMult;
    this.bloodColour = color(135, 20, 103, 255);
    this.fireCooldownLimit = 175;
    this.checkIfSlowMeowActive();
  }

  fire() {
    if (this.fireReady) {
      this.blink();
      let projectileCount = 9;
      let angleIncrement = (2 * Math.PI) / projectileCount;
      let projectileSpeed = 2;

      for (let i = 0; i < projectileCount; i++) {
        let angle = i * angleIncrement;

        let velocityX = Math.cos(angle) * projectileSpeed;
        let velocityY = Math.sin(angle) * projectileSpeed;

        let newProjectile = new Projectile(
          this.position.x,
          this.position.y,
          velocityX,
          velocityY,
          3,
          fireball,
          this
        );
        projectileManager.addProjectile(newProjectile);
      }
      behaviourMonitor.updateTimesMobsFired(projectileCount);
      this.fireReady = false;
    }
  }

  blink() {
    let spawnX, spawnY;
    let spawnAttempts = 0;
    while (spawnAttempts < 100) {
      spawnX = random(
        tileSize * 2 + this.widthHitbox / 2 + arena_offset,
        roomWidth * tileSize - tileSize * 2 - this.widthHitbox / 2 - arena_offset
      );
      spawnY = random(
        tileSize * 2 + this.heightHitbox / 2 + arena_offset,
        roomHeight * tileSize - tileSize * 2 - this.heightHitbox / 2 - arena_offset
      );
      let distanceFromP1 = dist(
        spawnX,
        spawnY,
        playerA.position.x,
        playerA.position.y
      );
      let distanceFromP2 = Infinity;
      if (coop) {
        distanceFromP2 = dist(
          spawnX,
          spawnY,
          playerB.position.x,
          playerB.position.y
        );
      }
      if (distanceFromP1 > 150 && distanceFromP2 > 150) {
        break;
      }
      spawnAttempts++;
    }
    this.position.x = spawnX;
    this.position.y = spawnY;
    playSound(blinkMobMoveSound, playbackRate);
  }
}

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
    this.projectileSpeed = 2;
    this.bloodColour = color(135, 20, 103, 255);
    this.fireCooldown = Math.floor(random(35, 50));
    this.fireCooldownLimit = Math.floor(random(160, 175));
    this.blinkCooldown = this.fireCooldown;
    this.blinkCooldownLimit = this.fireCooldownLimit;
    this.deathSound = blinkMobDeathSound;
    this.checkIfSlowMeowActive();
  }

  update() {
    if (!this.isActive) return;
    super.update();
    if (!game.slowMeowHandler.occurring && this.blinkCooldown < this.blinkCooldownLimit) {
      this.blinkCooldown++;
    }
    let nearestPlayer = this.findNearestPlayer();
    let distanceToPlayer = this.findDistanceToPlayer(nearestPlayer);
    if (nearestPlayer && distanceToPlayer < 125 && !game.slowMeowHandler.occuring) {
      this.blinkCooldown = this.blinkCooldownLimit;
      this.blink();
    }
  }

  fire() {
    if (!this.isActive || !this.fireReady || game.slowMeowHandler.occurring) return;
    if (this.blinkCooldown >= this.blinkCooldownLimit) {
      this.blink();
    }
    let projectileCount = 9;
    let angleIncrement = (2 * Math.PI) / projectileCount;

    for (let i = 0; i < projectileCount; i++) {
      let angle = i * angleIncrement;

      let velocityX = Math.cos(angle) * this.projectileSpeed;
      let velocityY = Math.sin(angle) * this.projectileSpeed;

      let newProjectile = new Projectile(
        this.position.x,
        this.position.y,
        velocityX,
        velocityY,
        this.projectileSpeed + 1,
        mobProjectileB,
        this
      );
      projectileManager.addProjectile(newProjectile);
    }
    behaviourMonitor.updateTimesMobsFired(projectileCount);
    playSound(mobProjectileSound, playbackRate);
    this.fireReady = false;
  }

  blink() {
    if (this.blinkCooldown < this.blinkCooldownLimit || game.slowMeowHandler.occurring) return;
    let spawnX, spawnY;
    let spawnAttempts = 0;
    while (spawnAttempts < 100) {
      spawnX = random(
        (tileSize * 3) + (this.widthHitbox / 2) + arena_offset,
        (roomWidth * tileSize) - (tileSize * 3) - (this.widthHitbox / 2) + arena_offset
      );
      spawnY = random(
        (tileSize * 3) + (this.heightHitbox / 2) + arena_offset,
        (roomHeight * tileSize) - (tileSize * 3) - (this.heightHitbox / 2) + arena_offset
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
      if (distanceFromP1 > 200 && distanceFromP2 > 200) {
        break;
      }
      spawnAttempts++;
    }
    this.position.x = spawnX;
    this.position.y = spawnY;
    this.blinkCooldown = 0;
    playSound(blinkMobMoveSound, playbackRate, true);
  }
}

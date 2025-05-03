class RangedMob extends Mob {
  constructor(img, x, y, difficultySettings) {
    super(img, x, y, difficultySettings);
    this.widthHitbox = 45;
    this.widthModel = 75;
    this.heightModel = 70;
    this.maxHealth = 60 * difficultySettings.mobHealthMult();
    this.health = this.maxHealth;
    this.speed = random(0.7, 1.0) * difficultySettings.mobSpeedMult;
    this.originalSpeed = this.speed;
    this.attackDamage = 8 * difficultySettings.mobDamageMult;
    this.projectileSpeed = 4;
    this.bloodColour = color(255, 215, 80, 255);
    this.projectileColour = color(255, 132, 93, 255);
    this.fireCooldownLimit = 100 * difficultySettings.mobCooldownMult;
    this.deathSound = rangedMobDeathSound;
    this.checkIfSlowMeowActive();
  }

  fire() {
    if (!this.isActive) return;
    if (this.fireReady) {
      let newProjectile = new Projectile(
        this.position.x,
        this.position.y,
        this.velocity.x,
        this.velocity.y,
        this.projectileSpeed,
        mobProjectileA,
        this
      );
      projectileManager.addProjectile(newProjectile);
      behaviourMonitor.updateTimesMobsFired(1);
      playSound(mobProjectileSound, playbackRate, true);
      this.fireReady = false;
    }
  }
}

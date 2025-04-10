class RangedMob extends Mob {
  constructor(img, x, y, difficultySettings) {
    super(img, x, y, difficultySettings);
    this.widthHitbox = 45;
    this.heightHitbox = 60;
    this.maxHealth = 60 * difficultySettings.mobHealthMult();
    this.health = this.maxHealth;
    this.speed = random(0.7, 1.1) * difficultySettings.mobSpeedMult;
    this.attackDamage = 8 * difficultySettings.mobDamageMult;
    this.bloodColour = color(255, 215, 80, 255);
    this.fireCooldownLimit = 100;
    this.checkIfSlowMeowActive();
  }

  fire() {
    let newProjectile;
    if (this.fireReady == true) {
      let projectileSpeed = 3;
      if (game && game.slowMeowOccuring) {
        projectileSpeed = 3 / game.slowMeowMovementSpeed;
      }
      newProjectile = new Projectile (
        this.position.x,
        this.position.y,
        this.velocity.x,
        this.velocity.y,
        projectileSpeed,
        fireball,
        this
      );
      projectileManager.addProjectile(newProjectile);
      behaviourMonitor.updateTimesMobsFired(1);
      this.fireReady = false;
    }
  }
}

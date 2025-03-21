class RangedMob extends Mob {
  constructor(img, x, y, difficultySettings) {
    super(img, x, y, difficultySettings)
    this.health = difficultySettings.rangedMobHealth;
    this.maxHealth = difficultySettings.rangedMobHealth;
    this.speed = difficultySettings.rangedMobSpeed;
    this.attackDamage = difficultySettings.rangedMobDamage;
    this.projectilesFired = [];
  }


  fire() {
    let newProjectile;
    if (this.fireReady == true) {
        newProjectile = new Projectile(
        this.position.x,
        this.position.y,
        this.velocity.x,
        this.velocity.y,
        3,
        fireball
      );
      this.projectilesFired.push(newProjectile);
      this.fireReady = false;
    }
  }
}

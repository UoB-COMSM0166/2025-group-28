class MeleeMob extends Mob {
  constructor(img, x, y, difficultySettings) {
    super(img, x, y, difficultySettings);
    this.heightHitbox = 60;
    this.maxHealth = 75 * difficultySettings.mobHealthMult();
    this.speed = random(0.8, 1.1) * difficultySettings.mobSpeedMult;
    this.attackDamage = 10 * difficultySettings.mobDamageMult;
    this.deathSound = meleeMobDeathSound;

    this.health = this.maxHealth;
    this.originalSpeed = this.speed;

    this.checkIfSlowMeowActive();
  }
}

class MeleeMob extends Mob {
  constructor(img, x, y, difficultySettings) {
    super(img, x, y, difficultySettings);
    this.maxHealth = 75 * difficultySettings.mobHealthMult();
    this.health = this.maxHealth;
    this.speed = random(0.8, 1.2) * difficultySettings.mobSpeedMult;
    this.originalSpeed = this.speed;
    this.attackDamage = 12 * difficultySettings.mobDamageMult;
    this.deathSound = meleeMobDeathSound;
    this.checkIfSlowMeowActive();
  }
}

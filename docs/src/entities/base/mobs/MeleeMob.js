class MeleeMob extends Mob {
  constructor(img, x, y, difficultySettings) {
    super(img, x, y, difficultySettings)
    this.health = difficultySettings.meleeMobHealth;
    this.maxHealth = difficultySettings.meleeMobHealth;
    this.speed = difficultySettings.meleeMobSpeed();
    this.attackDamage = difficultySettings.meleeMobDamage;
  }
}

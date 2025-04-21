class RangedMob extends Mob {
  constructor(img, x, y, difficultySettings) {
    super(img, x, y, difficultySettings);
    this.widthHitbox = 45;
    this.maxHealth = 60 * difficultySettings.mobHealthMult();
    this.health = this.maxHealth;
    this.speed = random(0.7, 1.0) * difficultySettings.mobSpeedMult;
    this.originalSpeed = this.speed;
    this.attackDamage = 8 * difficultySettings.mobDamageMult;
    this.projectileSpeed = 4;
    this.bloodColour = color(255, 215, 80, 255);
    this.fireCooldownLimit = 100;
    this.deathSound = rangedMobDeathSound;
    if (game.difficulty != difficultyLevels.EASY &&
      random() < 0.4
    ) {
      this.canRapidFire = true;
      this.isRapidFiring = false;
      this.shootingPauseTimer = 0; // Duration to pause shooting after rapid firing
      this.maxProjectiles; // Number of projectiles to rapid fire
      this.projectilesFired = 0;
      this.rapidFireTimer = 0; // Time between shots
      this.rapidFireReady = false;
      this.targetPosition = null;
      this.rapidFireCooldown = Math.floor(random(0, 350));
      this.rapidFireCooldownLimit = Math.floor(random(500, 600));
    } else {
      this.canRapidFire = false;
    }
    this.checkIfSlowMeowActive();
  }

  update() {
    if (!this.isActive || this.isInvincible) return;
    if (!this.canRapidFire || this.handleBuffedState()) {
      super.update();
      return;
    }

    let nearestPlayer = this.findNearestPlayer();
    if (!nearestPlayer) return;

    this.handleRapidFire(nearestPlayer);
    if (this.isRapidFiring) return;

    this.handleRapidFireCooldown();

    if (this.rapidFireReady) {
      this.beginRapidFire();
    } else {
      this.fire();
      super.update();
    }
  }

  handleBuffedState() {
    if (this.isBuffed) {
      this.shootingPauseTimer = 0;
      this.rapidFireCooldown = 0;
      this.isRapidFiring = false;
      this.rapidFireReady = false;
      return true;
    }
    return false;
  }

  fire() {
    if (!this.isActive || (this.canRapidFire && this.isRapidFiring)) {
      return;
    }
    if (this.fireReady) {
      let newProjectile = new Projectile(
        this.position.x,
        this.position.y,
        this.velocity.x,
        this.velocity.y,
        this.projectileSpeed,
        fireball,
        this
      );
      projectileManager.addProjectile(newProjectile);
      behaviourMonitor.updateTimesMobsFired(1);
      playSound(mobProjectileSound, playbackRate, true);
      this.fireReady = false;
    }
  }

  handleRapidFire(target) {
    if (!target || !target.isActive || !this.isRapidFiring) return;
    if (this.rapidFireTimer > 0) {
      this.rapidFireTimer--;
    } else if (this.projectilesFired < this.maxProjectiles) {
      this.targetPosition = createVector(target.position.x, target.position.y);
      this.fireRapid();
      this.projectilesFired++;
      if (behaviourMonitor.getBehaviourProfile().defensive) {
        this.rapidFireTimer = 10;
      } else this.rapidFireTimer = 20;
    } else {
      this.shootingPauseTimer--;
      if (this.shootingPauseTimer <= 0) {
        this.isRapidFiring = false;
        this.projectilesFired = 0;
        this.rapidFireReady = false;
        this.rapidFireCooldown = 0;
      }
    }
  }

  beginRapidFire() {
    if (!this.isActive) return;
    this.isRapidFiring = true;
    this.shootingPauseTimer = 10;
    this.projectilesFired = 0;
    this.rapidFireTimer = 0;
    this.maxProjectiles = Math.floor(random(4, 6));
  }

  fireRapid() {
    if (!this.targetPosition) return;
    let direction = p5.Vector.sub(this.targetPosition, this.position).normalize();
    let newProjectile = new Projectile(
      this.position.x,
      this.position.y,
      direction.x,
      direction.y,
      this.projectileSpeed,
      fireball,
      this
    );
    projectileManager.addProjectile(newProjectile);
    behaviourMonitor.updateTimesMobsFired(1);
    playSound(mobProjectileSound, playbackRate, true);
  }

  handleRapidFireCooldown() {
    if (this.rapidFireCooldown < this.rapidFireCooldownLimit) {
      this.rapidFireCooldown++;
    } else {
      let rapidFireChance = random();
      if (rapidFireChance < 0.2) {
        this.makeInvincible();
        playSound(rapidFireChargeSound, playbackRate, true);
        this.rapidFireReady = true;
      } else {
        this.rapidFireCooldown = Math.max(0, this.rapidFireCooldown - 25);
      }
    }
  }
}

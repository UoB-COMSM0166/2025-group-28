class RapidFireMob extends RangedMob {
  constructor(img, x, y, difficultySettings) {
    super(img, x, y, difficultySettings);
    this.isRapidFiring = false;
    this.shootingPauseTimer = 0; // Duration to pause shooting after rapid firing
    this.maxProjectiles; // Number of projectiles to rapid fire
    this.projectilesFired = 0;
    this.rapidFireTimer = 0; // Time between shots in rapid fire
    this.rapidFireReady = false;
    this.targetPosition = null;
    this.rapidFireCooldown = Math.floor(random(0, 350));
    this.rapidFireCooldownLimit = Math.floor(random(500, 600));
    this.bloodColour = color(255, 155, 200, 255);
    this.checkIfSlowMeowActive();
  }

  update() {
    if (this.handleBuffedState() || game.slowMeowHandler.occurring) {
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
      this.targetPosition = null;
      return true;
    }
    return false;
  }

  handleRapidFire(target) {
    if (!target || !target.isActive || !this.isRapidFiring) return;
    if (this.rapidFireTimer > 0) {
      this.rapidFireTimer--;
    } else if (this.projectilesFired < this.maxProjectiles) {
      this.targetPosition = createVector(target.position.x, target.position.y);
      this.fireRapid();
      this.projectilesFired++;
      // Decrease time between shots if player is defensive
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
      mobProjectileA,
      this
    );
    projectileManager.addProjectile(newProjectile);
    behaviourMonitor.updateTimesMobsFired(this.maxProjectiles);
    playSound(mobProjectileSound, playbackRate, true);
  }

  handleRapidFireCooldown() {
    // Slow meow pauses cooldown
    if (game.slowMeowHandler.occurring) return;
    if (this.rapidFireCooldown < this.rapidFireCooldownLimit) {
      this.rapidFireCooldown++;
    } else {
      if (random() < 0.2) {
        this.makeInvincible();
        playSound(rapidFireChargeSound, playbackRate, true);
        this.rapidFireReady = true;
      } else {
        this.rapidFireCooldown = Math.max(0, this.rapidFireCooldown - 25);
      }
    }
  }
}

class DashMob extends MeleeMob {
  constructor(img, x, y, difficultySettings) {
    super(img, x, y, difficultySettings);

    this.maxHealth = 80 * difficultySettings.mobHealthMult();
    this.attackDamage = 12 * difficultySettings.mobDamageMult;
    this.speed = random(1.1, 1.4) * difficultySettings.mobSpeedMult;
    this.dashSpeed = this.speed * 3;
    this.originalDashSpeed = this.dashSpeed;
    this.dashDuration = 20;
    this.dashCooldown = Math.floor(random(25, 75));
    this.dashCooldownLimit = Math.floor(random(180, 250));
    this.dashTimer = 0;
    this.isDashing = false;
    this.dashProgress = 0;
    this.dashTarget = null;
    this.isPreparingToDash = false;
    this.preDashPauseTimer = 0;
    this.trail = [];
    this.trailMaxLength = 10;

    this.health = this.maxHealth;
    this.originalSpeed = this.speed;
    this.bloodColour = color(0, 251, 127, 0);

    this.checkIfSlowMeowActive();
  }

  update() {
    if (!this.isActive) return;
    if (this.handleBuffedState()) {
      super.update();
      return;
    }
    if (this.isPreparingToDash && !game.slowMeowHandler.occurring) {
      this.preDashPauseTimer--;
      if (this.preDashPauseTimer <= 0) {
        this.isPreparingToDash = false;
        this.dashTowards(this.dashTarget);
      }
      return;
    }
    if (this.isDashing) {
      this.dashProgress += 1 / this.dashDuration;
      if (this.dashProgress >= 1) {
        this.isDashing = false;
        this.dashCooldown = 0;
        this.trail = []; // Clear trail after dash ends
      } else {
        // Gradually move towards dash location
        this.position.x = lerp(this.position.x, this.dashTarget.x, this.dashProgress);
        this.position.y = lerp(this.position.y, this.dashTarget.y, this.dashProgress);
        this.updateTrail();
      }
    } else if (this.dashCooldown < this.dashCooldownLimit) {
      if (!game.slowMeowHandler.occurring) this.dashCooldown++;
    } else {
      let nearestPlayer = this.findNearestPlayer();
      if (nearestPlayer && this.findDistanceToPlayer(nearestPlayer) < 175) {
        let dashChance = random(0, 5);
        if (dashChance < 0.2) {
          this.prepareToDash(nearestPlayer);
        }
      }
    }
    super.update();
  }

  handleBuffedState() {
    if (this.isBuffed) {
      this.trail = [];
      this.dashCooldown = 0;
      this.dashTimer = 0;
      this.isDashing = false;
      this.dashProgress = 0;
      this.dashTarget = null;
      this.isPreparingToDash = false;
      this.preDashPauseTimer = 0;
      return true;
    }
    return false;
  }

  updateTrail() {
    let movementDirection = createVector(
        this.position.x - this.dashTarget.x,
        this.position.y - this.dashTarget.y
    ).normalize();
    let trailOffset = movementDirection.mult(10);
    this.trail.push({
        x: this.position.x + trailOffset.x,
        y: this.position.y + trailOffset.y,
        opacity: 255,
    });
    if (this.trail.length > this.trailMaxLength) {
      this.trail.shift();
    }
    // Gradually decrease opacity of each trail segment
    for (let i = 0; i < this.trail.length; i++) {
      this.trail[i].opacity -= 25;
      // Remove fully transparent segments
      if (this.trail[i].opacity <= 0) {
        this.trail.splice(i, 1);
        i--;
      }
    }
  }

  draw() {
    if (!this.isActive) return;
    // Draw dash trail effect
    for (let i = 0; i < this.trail.length; i++) {
      let segment = this.trail[i];
      push();
      translate(segment.x, segment.y);
      tint(255, segment.opacity);
      image(this.img, -this.widthModel / 2, -this.heightModel / 2, this.widthModel, this.heightModel);
      pop();
    }
    super.draw();
  }

  prepareToDash(player) {
    if (this.isPreparingToDash ||
      this.isDashing ||
      this.dashCooldown < this.dashCooldownLimit ||
      !player ||
      player.isInvincible ||
      !player.isActive ||
      game.slowMeowHandler.occurring
    ) return;
    this.isPreparingToDash = true;
    this.makeInvincible();
    this.preDashPauseTimer = 30;
    this.dashTarget = player;
  }

  dashTowards(player) {
    if (!player || !player.isActive ||
      this.isDashing || this.dashCooldown < this.dashCooldownLimit
    ) return;

    playSound(dashMobDashSound, playbackRate, true);
    this.isDashing = true;
    this.isInvincible = false;
    this.isFlashing = false;
    this.dashTimer = this.dashDuration;
    this.dashProgress = 0;

    let dashDirection = createVector(
      player.position.x - this.position.x,
      player.position.y - this.position.y
    ).normalize();

    let distanceToPlayer = this.findDistanceToPlayer(player);
    let dashDistance;
    if (!player.velocity.equals(0)) {
      dashDistance = min(random(150,200), distanceToPlayer);
    // Dash closer to/to player's position if they are stationary
    } else {
      dashDistance = min(150, distanceToPlayer);
    }

    let dashOffset = dashDirection.mult(dashDistance);
    this.dashTarget = createVector(
      this.position.x + dashOffset.x,
      this.position.y + dashOffset.y
    );

    if (random() < 0.45) playSound(dashMobAttackSound, playbackRate, true);
  }
}

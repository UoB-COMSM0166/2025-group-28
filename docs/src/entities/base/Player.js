class Player extends Sprite {

  constructor(img, x, y, player_x) {
    super(img, x, y, 100);
    this.widthHitbox = 30;
    this.heightHitbox = 50;

    this.player = player_x;

    this.widthModel = 40;
    this.heightModel = 60;
    this.color = color(0, 100, 255);
    this.speed = 3; // Slightly faster than base sprites
    this.attackDamage = 5;
    this.fireRate = 200; // ms between shots
    this.lastShot = 0; // Timestamp of last shot
    this.inventory = [];
    this.direction = createVector(-1, 0); // Character starts facing right
    this.projectilesFired = []; // holds live projectiles in game
    this.fireCooldown = 0; // Cooldown between shots
    this.fireOverheat = false;
  }

  move() {
    if (!this.isActive) {
      return;
    }
    // Player movement using WASD / arrow keys
    this.velocity.set(0, 0);
    if (this.fireCooldown > 0) {
      this.fireCooldown -= 0.5;
    }

    //movement logic for PLAYER_1
    if (this.player === playerNumber.PLAYER_1) {
      // A key
      if (keyIsDown(65)) {
        if (!this.isColliding(this.position.x - this.speed, this.position.y,
                              this.widthHitbox, this.heightHitbox, this.collidables)) {
          this.velocity.x = -this.speed;
          this.direction = createVector(-1, 0); // Facing left
          this.scaleX = 1; // Flip sprite to face left
          this.lastDirection = "LEFT";
        } else {
          this.velocity.x = 0;
          this.position.x += pushback;
        }
      }
      // D key
      if (keyIsDown(68)) {
        if (!this.isColliding(this.position.x + this.speed, this.position.y,
                              this.widthHitbox, this.heightHitbox, this.collidables)) {
          this.velocity.x = this.speed;
          this.direction = createVector(1, 0); // Facing right
          this.scaleX = -1; // Reset sprite to face right
          this.lastDirection = "RIGHT";
        } else {
          this.velocity.x = 0;
          this.position.x -= pushback;
        }
      }
      // W key
      if (keyIsDown(87)) {
        if (!this.isColliding(this.position.x, this.position.y - this.speed,
                              this.widthHitbox, this.heightHitbox, this.collidables)) {
          this.velocity.y = -this.speed;
          this.direction = createVector(0, -1);
          this.lastDirection = "UP";
        } else {
          this.velocity.y = 0;
          this.position.y += pushback;
        }
      }
      // S key
      if (keyIsDown(83)) {
        if (!this.isColliding(this.position.x, this.position.y + this.speed,
                              this.widthHitbox, this.heightHitbox, this.collidables)) {
          this.velocity.y = this.speed;
          this.direction = createVector(0, 1);
          this.lastDirection = "DOWN";
        } else {
          this.velocity.y = 0;
          this.position.y -= pushback;
        }
      }
    }

    //movement logic for PLAYER_2
    if (this.player == playerNumber.PLAYER_2) {
      if (keyIsDown(LEFT_ARROW)) {
        if (!this.isColliding(this.position.x - this.speed, this.position.y,
                              this.widthHitbox, this.heightHitbox, this.collidables)) {
          this.velocity.x = -this.speed;
          this.direction = createVector(-1, 0); // Facing left
          this.scaleX = 1; // Flip sprite to face left
          this.lastDirection = "LEFT";
        } else {
          this.velocity.x = 0;
          this.position.x += pushback;
        }
      }
      if (keyIsDown(RIGHT_ARROW)) {
        if (!this.isColliding(this.position.x + this.speed, this.position.y,
                              this.widthHitbox, this.heightHitbox, this.collidables)) {
          this.velocity.x = this.speed;
          this.direction = createVector(1, 0); // Facing right
          this.scaleX = -1; // Reset sprite to face right
          this.lastDirection = "RIGHT";
        } else {
          this.velocity.x = 0;
          this.position.x -= pushback;
        }
      }
      if (keyIsDown(UP_ARROW)) {
        if (!this.isColliding(this.position.x, this.position.y - this.speed,
                              this.widthHitbox, this.heightHitbox, this.collidables)) {
          this.velocity.y = -this.speed;
          this.direction = createVector(0, -1);
          this.lastDirection = "UP";
        } else {
          this.velocity.y = 0;
          this.position.y += pushback;
        }
      }
      if (keyIsDown(DOWN_ARROW)) { // Down arrow (move down)
        if (!this.isColliding(this.position.x, this.position.y + this.speed,
                              this.widthHitbox, this.heightHitbox, this.collidables)) {
          this.velocity.y = this.speed;
          this.direction = createVector(0, 1);
          this.lastDirection = "DOWN";
        } else {
          this.velocity.y = 0;
          this.position.y -= pushback;
        }
      }
    }

    // Constrain the player's position within the room boundaries
    this.position.x = constrain(this.position.x, tileSize * 2 + this.widthHitbox / 2, (roomWidth * tileSize) - tileSize * 2 - this.widthHitbox / 2);
    this.position.y = constrain(this.position.y, tileSize * 2 + this.heightHitbox / 2, (roomHeight * tileSize) - tileSize * 2 - this.heightHitbox / 2);

    // Apply knockback force gradually
    if (this.knockbackForce.mag() > 0) {
      this.position.add(this.knockbackForce);
      this.knockbackForce.mult(0.9);
      if (this.knockbackForce.mag() < 0.1) {
        this.knockbackForce.set(0, 0); // Stop knockback when force is very small
      }
    }

    // Normalizes diagonal movement
    if (this.velocity.x !== 0 && this.velocity.y !== 0) {
      this.velocity.setMag(this.speed);
    }
    //Normalizes diagonal firing
    if (this.velocity.mag() > 0) {
      this.direction = this.velocity.copy().normalize();
    }

    super.update();
  }

  fire() {
    if (this.fireOverheat && this.fireCooldown < 80) {
      this.fireOverheat = false;
    }
    let currentTime = millis();
    if (this.isActive && !this.fireOverheat && (currentTime - this.lastShot) > this.fireRate) {
        if (this.player === playerNumber.PLAYER_1 && keyIsDown(32)) { // SPACE key for player 1
            let projectile = new Projectile(this.position.x, this.position.y, this.direction.x, this.direction.y, this.lastDirection);
            projectile.lastDirection = this.lastDirection; // Ensures projectile inherits direction
            this.projectilesFired.push(projectile);
            this.lastShot = currentTime;
            this.fireCooldown += 20;
            console.log(this.fireCooldown);
            if (this.fireCooldown > 200) {
              this.fireOverheat = true;
            }

        }
        if (this.isActive && this.player === playerNumber.PLAYER_2 && keyIsDown(13)) { // ENTER key for player 2
            let projectile = new Projectile(this.position.x, this.position.y, this.direction.x, this.direction.y, this.lastDirection);
            projectile.lastDirection = this.lastDirection; // Ensures projectile inherits direction
            this.projectilesFired.push(projectile);
            this.lastShot = currentTime;
            this.fireCooldown += 20
            console.log(this.fireCooldown);
            if (this.fireCooldown > 200) {
              this.fireOverheat = true;
            }
        }
    }
  }

  drawPlayerHeatBar(x, y, width, height, value, label) {
    if (!this.isActive) return;
    stroke(150);
    strokeWeight(2);
    noFill();
    rect(x, y, width, height, 5);
  
    const fillWidth = constrain(value * width, 0, width);
    
    let fillColor;
    if (this.fireOverheat) {
      // causes the bar to flash when overheated
      if (frameCount % 20 < 10) {
        fillColor = color(255, 0, 0);  // red
      } else {
        fillColor = color(255, 150, 0);  // orange
      }
    } else {
      // goes from green to yellow to red as heat increases
      if (value < 0.5) {
        let greenAmount = map(value, 0, 0.5, 255, 255);
        let redAmount = map(value, 0, 0.5, 0, 255);
        fillColor = color(redAmount, greenAmount, 0);
      } else {
        let greenAmount = map(value, 0.5, 1, 255, 0);
        fillColor = color(255, greenAmount, 0);
      }
    }
    
    noStroke();
    fill(fillColor);
    rect(x, y, fillWidth, height, 5);
    
    
    // warning text if close to overheating
    if (value > 0.75 && !this.fireOverheat) {
      fill(70, 0, 0);
      textAlign(CENTER, CENTER);
      textSize(12);
      textStyle(BOLD);
      text("WARNING!", x + width/2, y + height/2);
    }
    
    // overheat text
    if (this.fireOverheat) {
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(12);
      textStyle(BOLD);
      text("OVERHEATED!", x + width/2, y + height/2);
    }
    
    // label
    fill(255);
    textAlign(CENTER);
    textSize(14);
    text(label, x + width/2, y - 10);
  }

  

  // Adds i-frames after taking damage - in player class as not needed for mobs
  makeInvincible() {
    if (!this.isInvincible) {
      this.isInvincible = true;
      this.invincibilityStartTime = millis();
      this.lastFlashTime = millis();
      this.isFlashing = true;
    }
  }

  pickupItem() {}

}

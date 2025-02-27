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
    this.attackDamage = 2;
    this.fireRate = 0.5; // Seconds between shots
    this.lastShot = 0; // Timestamp of last shot
    this.inventory = [];
    this.collidables = [];
    this.direction = createVector(-1, 0); // Character starts facing right
    this.projectilesFired = []; // holds live projectiles in game
    this.fireCooldown = 500; // Cooldown between shots
  }

  move() {
    // Player movement using WASD / arrow keys
    this.velocity.set(0, 0);
    let pushback = 1; // To prevent sticking

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

    // Normalizes diagonal movement
    if (this.velocity.x !== 0 && this.velocity.y !== 0) {
      this.velocity.setMag(this.speed);
    }
    //Normalizes diagonal firing
    if (this.velocity.mag() > 0) {
      this.direction = this.velocity.copy().normalize();
    }

    // Stops the player moving outside the outer walls (just in case)
    this.position.x = constrain(this.position.x, tileSize * 2.5,
                                (roomWidth * tileSize) - tileSize * 2.5);
    this.position.y = constrain(this.position.y, tileSize * 2.5,
                                (roomHeight * tileSize) - tileSize * 2.5);

    super.update();
  }

  fire() {
    let currentTime = millis();
    if (currentTime - this.lastShot > this.fireRate * 250) {
        if (this.player === playerNumber.PLAYER_1 && keyIsDown(32)) { // SPACE key for player 1
            let projectile = new Projectile(this.position.x, this.position.y, this.direction.x, this.direction.y, this.lastDirection);
            projectile.lastDirection = this.lastDirection; // Ensures projectile inherits direction
            this.projectilesFired.push(projectile);
            this.lastShot = currentTime;
        }
        if (this.player === playerNumber.PLAYER_2 && keyIsDown(13)) { // ENTER key for player 2
            let projectile = new Projectile(this.position.x, this.position.y, this.direction.x, this.direction.y, this.lastDirection);
            projectile.lastDirection = this.lastDirection; // Ensures projectile inherits direction
            this.projectilesFired.push(projectile);
            this.lastShot = currentTime;
        }
    }
  }

  draw() {
    if (this.isActive) {
      fill(255, 0, 0, 100);
      noStroke();
      rect(
        this.position.x - this.widthHitbox / 2, 
        this.position.y - this.heightHitbox / 2, 
        this.widthHitbox, 
        this.heightHitbox
      );
      push();
      translate(this.position.x, this.position.y);
      scale(this.scaleX, 1); // Flip the sprite depending on the movement direction
      image(this.img, -this.widthModel / 2, -this.heightModel / 2, this.widthModel, this.heightModel);
      pop();  
    }  
  }

  pickupItem() {}
}

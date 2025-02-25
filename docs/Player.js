class Player extends Sprite {
  constructor(img, x, y, player_x) {
    super(img, x, y, 100);
    this.widthHitbox = 30;
    this.heightHitbox = 50;

    this.player = player_x;

    this.widthModel = 40;
    this.heightModel = 60;
    this.color = color(0, 100, 255);
    this.speed = 5; // Slightly faster than base sprites
    this.attackDamage = 2;
    this.fireRate = 0.5; // Seconds
    this.lastShot = 0; // Seconds
    this.inventory = [];
    this.collidables = [];
    this.direction = createVector(1, 0); //Character starts facing right
    this.projectilesFired = []; // holds live projectiles in game
    this.fireCooldown = 500; // 0.5 seconds between shots - not used rn

  }

  moveAndFire() {
    //Player movement using WASD
    this.velocity.set(0, 0);
    let pushback = 1; // To prevent sticking

    if (this.player === playerNumber.PLAYER_1) {
      // A key
      if (keyIsDown(65)) {
        if (!this.isColliding(this.position.x - this.speed, this.position.y,
                              this.widthHitbox, this.heightHitbox, this.collidables)) {
          this.velocity.x = -this.speed;
          this.direction = createVector(-1, 0);
        } else {
          this.velocity.x = 0;
          this.position.x += pushback;
        }
        this.fireProjectile();
      }
      // D key
      if (keyIsDown(68)) {
        if (!this.isColliding(this.position.x + this.speed, this.position.y,
                              this.widthHitbox, this.heightHitbox, this.collidables)) {
          this.velocity.x = this.speed;
          this.direction = createVector(1, 0);
        } else {
          this.velocity.x = 0;
          this.position.x -= pushback;
        }
        this.fireProjectile();
      }
      // W key
      if (keyIsDown(87)) {
        if (!this.isColliding(this.position.x, this.position.y - this.speed,
                              this.widthHitbox, this.heightHitbox, this.collidables)) {
          this.velocity.y = -this.speed;
          this.direction = createVector(0, -1);
        } else {
          this.velocity.y = 0;
          this.position.y += pushback;
        }
        this.fireProjectile();
      }
      // S key
      if (keyIsDown(83)) {
        if (!this.isColliding(this.position.x, this.position.y + this.speed,
                              this.widthHitbox, this.heightHitbox, this.collidables)) {
          this.velocity.y = this.speed;
          this.direction = createVector(0, 1);
        } else {
          this.velocity.y = 0;
          this.position.y -= pushback;
        }
        this.fireProjectile();
      }
    }

    if (this.player == playerNumber.PLAYER_2) {
      if (keyIsDown(LEFT_ARROW)) {
        if (!this.isColliding(this.position.x - this.speed, this.position.y,
                              this.widthHitbox, this.heightHitbox, this.collidables)) {
          this.velocity.x = -this.speed;
          this.direction = createVector(-1, 0);
        } else {
          this.velocity.x = 0;
          this.position.x += pushback;
        }
        this.fireProjectile();
      }
      if (keyIsDown(RIGHT_ARROW)) {
        if (!this.isColliding(this.position.x + this.speed, this.position.y,
                              this.widthHitbox, this.heightHitbox, this.collidables)) {
          this.velocity.x = this.speed;
          this.direction = createVector(1, 0);
        } else {
          this.velocity.x = 0;
          this.position.x -= pushback;
        }
        this.fireProjectile();
      }
      if (keyIsDown(UP_ARROW)) {
        if (!this.isColliding(this.position.x, this.position.y - this.speed,
                              this.widthHitbox, this.heightHitbox, this.collidables)) {
          this.velocity.y = -this.speed;
          this.direction = createVector(0, -1);
        } else {
          this.velocity.y = 0;
          this.position.y += pushback;
        }
        this.fireProjectile();
      }
      if (keyIsDown(DOWN_ARROW)) {
        if (!this.isColliding(this.position.x, this.position.y + this.speed,
                              this.widthHitbox, this.heightHitbox, this.collidables)) {
          this.velocity.y = this.speed;
          this.direction = createVector(0, 1);
        } else {
          this.velocity.y = 0;
          this.position.y -= pushback;
        }
        this.fireProjectile();
      }

    }
    
    // Normalises diagonal movement
    if (this.velocity.x !== 0 && this.velocity.y !== 0) {
      this.velocity.setMag(this.speed);
    }

    // Stops the player moving outside the outer walls (just in case)
    this.position.x = constrain(this.position.x, tileSize * 2.5,
                                (roomWidth * tileSize) - tileSize * 2.5);
    this.position.y = constrain(this.position.y, tileSize * 2.5,
                                (roomHeight * tileSize) - tileSize * 2.5);
                   
                                                       
    super.update();


  }

  // only called from moveAndFire()
  fireProjectile() {
    if (this.player == playerNumber.PLAYER_1) {
      // space
      if (keyIsDown(32)) {
        let projectile = new Projectile(this.position.x, this.position.y, this.velocity.x, this.velocity.y);
        this.projectilesFired.push(projectile);
      }
    }
    if (this.player == playerNumber.PLAYER_2) {
      // enter
      if (keyIsDown(13)) {
        let projectile = new Projectile(this.position.x, this.position.y, this.velocity.x, this.velocity.y);
        this.projectilesFired.push(projectile);
      }
    }
  }



  pickupItem() {}
}

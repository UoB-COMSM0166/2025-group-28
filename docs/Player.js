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
    this.attackDamage = 50;
    this.fireRate = 0.5; // Seconds
    this.lastShot = 0; // Seconds
    this.inventory = [];
    this.collidables = [];
    this.direction = createVector(1, 0); //Character starts facing right
  }

  move() {
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

  isCollidingWith(mob){
    return(this.position.x < mob.position.x + mob.widthHitbox && 
       this.position.x + this.widthHitbox > mob.position.x &&  
       this.position.y < mob.position.y + mob.heightHitbox &&
       this.position.y + this.heightHitbox > mob.position.y
    );
  }

  // shootProjectile() {
  //   let projectile = new Projectile(bullet);
  //   projectile.direction = this.direction;
  //   //projectile.type = bullet;
  //   //projectile.velocity = 4;
  //   //projectile.widthModel = 10;
  //   //projectile.heightModel = 4;
  //   projectile.initLocation =
  //     (this.position.x - this.widthModel / 2,
  //     this.position.y - this.heightModel / 2,
  //     projectile.widthModel,
  //     projectile.heightModel);
  // }

  pickupItem() {}
}

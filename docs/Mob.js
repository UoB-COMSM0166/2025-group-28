class Mob extends Sprite {

  constructor(img, x, y) {
    super(img, x, y, 50);
    this.widthHitbox = 30;
    this.heightHitbox = 50;
    this.widthModel = 40;
    this.heightModel = 60;

    this.color = color(0, 255, 100);
    this.attackDamage = 30;
    this.fireRate = 0.5; //Seconds
    this.lastShot = 0; //Seconds

    this.img = img;

    this.speed = 1; //Slightly slower than players
    this.direction = createVector(-1, 0); //Mob starts facing left
  }

  update() {
    if (!this.isActive) {
      return;
    }
    let nearestPlayer = this.findNearestPlayer();
    if (nearestPlayer) {
      this.moveTowards(nearestPlayer);
    } else {
      this.velocity.set(0, 0);
    }
    super.update();
  }

  moveTowards(player) {
    if (!player.isActive) {
      return;
    }
    this.velocity.set(0, 0);
    //Moves smoothly towards whichever player is nearest
    let xDirection = player.position.x - this.position.x;
    let yDirection = player.position.y - this.position.y;
    this.direction = createVector(xDirection, yDirection);
    if (!this.isColliding(this.position.x, this.position.y, this.widthHitbox, this.heightHitbox, this.collidables)) {
      this.velocity.x = xDirection * this.speed;
      this.velocity.y = yDirection * this.speed;
    } else {
      if (this.direction.x > 0) {
        this.position.x -= pushback;
      } else if (this.direction.x < 0) {
        this.position.x += pushback;
      }
      if (this.direction.y > 0) {
        this.position.y -= pushback;
      } else if (this.direction.y < 0) {
        this.position.y += pushback;
      }
    }
    // Normalises diagonal movement
    if (this.velocity.x !== 0 && this.velocity.y !== 0) {
      this.velocity.setMag(this.speed);
    }
  }

  findDistanceToPlayer(player) {
    let xDirection = this.position.x - player.position.x;
    let yDirection = this.position.y - player.position.y;
    let distance = sqrt(xDirection * xDirection + yDirection * yDirection);
    return distance;
  }

  findNearestPlayer() {
    if (coop) {
      if (!playerA.isActive && !playerB.isActive) {
        return null;
      }
      if (!playerA.isActive && playerB.isActive) {
        return playerB;
      }
      if (playerA.isActive && !playerB.isActive) {
        return playerA;
      }
      let distanceToPlayerA = this.findDistanceToPlayer(playerA);
      let distanceToPlayerB = this.findDistanceToPlayer(playerB);
      if (distanceToPlayerA < distanceToPlayerB) {
        return playerA;
      } else {
        return playerB;
      }
    } else {
      return playerA;
    }
  }

}

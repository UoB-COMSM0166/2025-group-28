class PvPRoom {
  constructor() {
    this.roomLayout = []; // 2D array of tiles
    this.particles = [];
    this.lastSpawnTime = 0;
    this.currentTileColours;
    this.p1Score = 0;
    this.p2Score = 0;
    this.p1ScoreIncreased = false;
    this.p2ScoreIncreased = false;
    this.announcerSounds = [
      pvpAnnouncer1,
      pvpAnnouncer2,
      pvpAnnouncer3,
      pvpAnnouncer4,
      pvpAnnouncer5,
      pvpAnnouncer6,
    ];
    this.prevAnnouncement = null;
    this.generator = new RoomGenerator(this);
    this.handler = new RoomHandler(this);
    this.generator.initRoom();
  }

  update() {
    this.handler.updateProjectiles();

    // Resets every cycle - stops two announcements being played in the same update cycle
    let announcementPlayed = false;

    if (!playerA.isActive) {
      this.handlePlayerScores(
        playerA,
        "p2Score",
        "p2ScoreIncreased",
        announcementPlayed
      );
      announcementPlayed = true;
    }
    if (!playerB.isActive) {
      this.handlePlayerScores(
        playerB,
        "p1Score",
        "p1ScoreIncreased",
        announcementPlayed
      );
      announcementPlayed = true;
    }

    // Handle trap collisions
    this.handler.handleTrapCollisions();

    // Handles wall collisions
    this.handler.checkWallCollisions();

    // Players
    playerA.update();
    playerB.update();
  }

  handlePlayerScores(player, playerScore, scoreIncreased, announcementPlayed) {
    if (!player) return;
    if (!player.isActive && !this[scoreIncreased]) {
      this[playerScore]++;
      if (!muted) {
        pvpScoreSound.play();
      }
      setTimeout(() => {
        let randomAnnouncement;
        do {
          randomAnnouncement = Math.floor(
            random(0, this.announcerSounds.length)
          );
        } while (randomAnnouncement === this.prevAnnouncement);
        if (!muted && !announcementPlayed) {
          this.announcerSounds[randomAnnouncement].play();
        }
        this.prevAnnouncement = randomAnnouncement;
      }, 500);
      if (this[playerScore] < 2) {
        setTimeout(() => {
          this.respawnPlayer(player);
          this[scoreIncreased] = false;
        }, 1500);
      }
      this[scoreIncreased] = true;
    }
  }

  draw() {
    this.handler.drawRoomTiles();

    // Draw any particles after room objects so they appear behind the player/mobs
    this.handler.drawParticles();

    playerA.move();
    playerB.move();

    playerA.fire();
    playerB.fire();

    playerA.draw();
    PlayerHUD.drawPlayerHealthBar();

    playerB.draw();
    PlayerHUD.drawPlayerHealthBar();

    // PvP bullet collisions
    for (let projectile of projectileManager.projectilesFired) {
      if (!projectile.isActive) continue;
      projectile.draw();
      let target;
      if (projectile.owner === playerA) {
        target = playerB;
      } else if (projectile.owner === playerB) {
        target = playerA;
      }
      if (projectile.isCollidingWith(target)) {
        if (!target.isInvincible) {
          target.takeDamage(projectile.owner.attackDamage);
          this.generator.createParticles(
            Blood,
            target.position.x,
            target.position.y,
            target.bloodColour
          );
        }
        projectile.isActive = false;
      }
    }

    if (playerA.isCollidingWith(playerB) || playerB.isCollidingWith(playerA)) {
      playerA.applyKnockback(playerB.position.x, playerB.position.y);
      playerB.applyKnockback(playerA.position.x, playerA.position.y);
    }
  }

  respawnPlayer(player) {
    if (!player) return;
    let spawnX, spawnY;
    let validSpawn = false;
    let spawnAttempts = 0;
    let enemy;
    if (player === playerB) {
      enemy = playerA;
    } else {
      enemy = playerB;
    }
    while (!validSpawn && spawnAttempts < 100) {
      spawnX =
        random(tileSize * 3, roomWidth * tileSize - tileSize * 3) +
        arena_offset;
      spawnY =
        random(tileSize * 3, roomHeight * tileSize - tileSize * 3) +
        arena_offset;

      let distanceFromEnemy = dist(
        spawnX,
        spawnY,
        enemy.position.x,
        enemy.position.y
      );
      if (
        distanceFromEnemy > 300 &&
        !this.handler.checkInsideWall(spawnX, spawnY, true)
      ) {
        validSpawn = true;
        break;
      }
      spawnAttempts++;
    }

    if (validSpawn) {
      if (player === playerB) {
        playerB = new Player(player.img, spawnX, spawnY, player.player);
        playerB.makeInvincible(500);
      } else {
        playerA = new Player(player.img, spawnX, spawnY, player.player);
        playerA.makeInvincible(500);
      }
    }
  }
}

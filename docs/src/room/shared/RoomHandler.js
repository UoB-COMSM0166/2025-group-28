// Handles methods required by both room types
class RoomHandler {
  constructor(currentRoom) {
    this.room = currentRoom;
  }

  updateProjectiles() {
    for (let p of projectileManager.projectilesFired) {
      if (!p.isActive) continue;
      if (
        p.position.x < (tileSize * 2.75) + arena_offset ||
        p.position.x > (roomWidth * tileSize) - (tileSize * 2.75) + arena_offset ||
        p.position.y < (tileSize * 2.75) + arena_offset ||
        p.position.y > (roomHeight * tileSize) - (tileSize * 2.75) + arena_offset ||
        (projectileWallCollisions && this.checkInsideWall(p.position.x, p.position.y))
      ) {
        this.room.generator.createParticles(
          Spark,
          p.position.x,
          p.position.y,
          p.sparkColour,
          p.velocity
        );
        p.isActive = false;
      } else p.update();
    }
  }

  handleWallCollision(player, wall) {
    if (!player || !player.isActive || !wall) return;
    // Calculate the boundaries of both objects
    const playerLeft = player.position.x - player.widthHitbox / 2;
    const playerRight = player.position.x + player.widthHitbox / 2;
    const playerTop = player.position.y - player.heightHitbox / 2;
    const playerBottom = player.position.y + player.heightHitbox / 2;

    const wallLeft = wall.position.x;
    const wallRight = wall.position.x + wall.widthHitbox;
    const wallTop = wall.position.y;
    const wallBottom = wall.position.y + wall.heightHitbox;

    // Check if there's a collision
    if (
      playerRight > wallLeft &&
      playerLeft < wallRight &&
      playerBottom > wallTop &&
      playerTop < wallBottom
    ) {
      // Calculate overlaps on each axis
      const overlapLeft = playerRight - wallLeft;
      const overlapRight = wallRight - playerLeft;
      const overlapTop = playerBottom - wallTop;
      const overlapBottom = wallBottom - playerTop;

      // Find the minimum overlap
      const minOverlap = Math.min(
        overlapLeft,
        overlapRight,
        overlapTop,
        overlapBottom
      );

      // Resolve collision based on minimum overlap
      if (minOverlap === overlapLeft) {
        // Colliding from the right side of the wall
        player.position.x = wallLeft - player.widthHitbox / 2;
        player.velocity.x = 0;
      } else if (minOverlap === overlapRight) {
        // Colliding from the left side of the wall
        player.position.x = wallRight + player.widthHitbox / 2;
        player.velocity.x = 0;
      } else if (minOverlap === overlapTop) {
        // Colliding from below the wall
        player.position.y = wallTop - player.heightHitbox / 2;
        player.velocity.y = 0;
      } else if (minOverlap === overlapBottom) {
        // Colliding from above the wall
        player.position.y = wallBottom + player.heightHitbox / 2;
        player.velocity.y = 0;
      }
    }
  }

  checkWallCollisions() {
    for (let tileArr of this.room.roomLayout) {
      for (let tile of tileArr) {
        if (tile.type == tileTypes.WALL) {
          this.handleWallCollision(playerA, tile);
          if (coop || pvpMode) {
            this.handleWallCollision(playerB, tile);
          }
        }
      }
    }
  }

  checkInsideWall(x, y) {
    for (let j = 0; j < roomHeight; j++) {
      for (let i = 0; i < roomWidth; i++) {
        if (this.room.roomLayout[j][i].type == tileTypes.WALL) {
          let wallX = this.room.roomLayout[j][i].position.x;
          let wallY = this.room.roomLayout[j][i].position.y;
          let wallWidth = this.room.roomLayout[j][i].widthHitbox;
          let wallHeight = this.room.roomLayout[j][i].heightHitbox;

          if (
            x > wallX &&
            x < wallX + wallWidth &&
            y > wallY &&
            y < wallY + wallHeight
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  drawRoomTiles() {
    for (let j = 0; j < roomHeight; j++) {
      for (let i = 0; i < roomWidth; i++) {
        if (this.room.roomLayout[j][i].type == tileTypes.WALL) {
          image(
            walltile,
            tileSize * i + arena_offset,
            tileSize * j + arena_offset,
            tileSize,
            tileSize
          );
          if (drawCollisions) {
            // TESTING - draw collision box
            fill(0, 200, 0, 100);
            rect(
              this.room.roomLayout[j][i].position.x,
              this.room.roomLayout[j][i].position.y,
              this.room.roomLayout[j][i].widthHitbox,
              this.room.roomLayout[j][i].heightHitbox
            );
          }
        } else if (this.room.roomLayout[j][i].type == tileTypes.FLOOR){
          let tiledex = 1;
          if (j % 2 == 0 && i % 2 == 0) {
            tiledex = 0;
          }
          image(
            this.room.currentTileColours[tiledex],
            tileSize * i + arena_offset,
            tileSize * j + arena_offset,
            tileSize,
            tileSize
          );
        }
        else if (this.room.roomLayout[j][i].type == tileTypes.TRAP){
          image(
            this.room.currentTileColours[2],
            tileSize * i + arena_offset,
            tileSize * j + arena_offset,
            tileSize,
            tileSize
          );
        }
      }
    }
  }

  drawParticles() {
    for (let i = 0; i < this.room.particles.length; i++) {
      this.room.particles[i].update();
      this.room.particles[i].draw();
      if (this.room.particles[i].isFinished()) {
        this.room.particles.splice(i, 1);
      }
    }
  }
}
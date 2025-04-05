class PvPRoom {
   constructor() {
     this.door = null;
     this.roomType = 0; // doesn't exist for now
     this.isCleared = false;
     this.items = [];
     this.roomLayout = []; // 2d array of tiles
     this.bloodParticles = [];
     this.lastSpawnTime = 0;
     this.promptActive = false;
     this.currentTileColours;
     this.initRoom();
   }
 
   initRoom() {
     const tileOptions = [tileColours1, tileColours2, tileColours3];
     this.currentTileColours = random(tileOptions);
     this.roomLayout = [];
     for (let j = 0; j < roomHeight; j++) {
       let roomTiles = [];
       for (let i = 0; i < roomWidth; i++) {
         if (
           j == 0 ||
           i == 0 ||
           j == 1 ||
           i == 1 ||
           j == roomHeight - 1 ||
           i == roomWidth - 1 ||
           j == roomHeight - 2 ||
           i == roomWidth - 2
         ) {
           let newWall = new Tile(tileTypes.WALL, i, j);
           roomTiles.push(newWall);
         } else {
           let newFloor = new Tile(tileTypes.FLOOR);
           roomTiles.push(newFloor);
         }
       }
       this.roomLayout.push(roomTiles);
     }
     this.scanRoom();
   }
 
   // Creates square wall pattern
   createWallSQR(w, h, x, y) {
     for (let j = 0; j < h && y < roomHeight - wallBuffer; j++, y++) {
       for (let i = 0; i < w && x < roomWidth - wallBuffer; i++, x++) {
         this.roomLayout[y][x] = new Tile(tileTypes.WALL, x, y);
       }
       x -= w;
     }
   }
 
   // Creates 'L' shaped wall pattern
   createWallL1(w, h, x, y) {
     for (let j = 0; j < h && y < roomHeight - wallBuffer; j++, y++) {
       for (let i = 0; i < w && x < roomWidth - wallBuffer; i++, x++) {
         if (i > 1 && j > 1) {
           this.roomLayout[y][x] = new Tile(tileTypes.FLOOR);
         } else {
           this.roomLayout[y][x] = new Tile(tileTypes.WALL, x, y);
         }
       }
       x -= w;
     }
   }
 
   // Creates a different 'L' shaped wall pattern
   createWallL2(w, h, x, y) {
     for (let j = 0; j < h && y < roomHeight - wallBuffer; j++, y++) {
       for (let i = 0; i < w && x < roomWidth - wallBuffer; i++, x++) {
         if (i < w - 2 && j < h - 2) {
           this.roomLayout[y][x] = new Tile(tileTypes.FLOOR);
         } else {
           this.roomLayout[y][x] = new Tile(tileTypes.WALL, x, y);
         }
       }
       x -= w;
     }
   }
 
   // Incrementally steps through the room and decides how many walls to place
   scanRoom() {
     for (let y = wallBuffer; y < roomHeight - wallBuffer; y += step) {
       for (let x = wallBuffer; x < roomWidth - wallBuffer; x += step) {
         let numWalls = floor(random(0, 2));
         this.addWalls(x, y, numWalls);
       }
     }
   }
 
   addWalls(x, y, numWalls) {
     for (let i = 0; i < numWalls; i++) {
       x = this.addOffset(x);
       y = this.addOffset(y);
       let wallVar = floor(random(0, 100));
       let shouldAddWall = this.rollDice();
       if (shouldAddWall) {
         if (wallVar > 74) {
           this.createWallSQR(
             this.getRanW(wallVariants.SQR),
             this.getRanH(wallVariants.SQR),
             x,
             y
           );
         } else if (wallVar > 54) {
           this.createWallL1(
             this.getRanW(wallVariants.L1),
             this.getRanH(wallVariants.L1),
             x,
             y
           );
         } else if (wallVar > 34) {
           this.createWallL2(
             this.getRanW(wallVariants.L2),
             this.getRanH(wallVariants.L2),
             x,
             y
           );
         }
         // Create small square wall
         else {
           this.createWallSQR(2, 2, x, y);
         }
       }
     }
   }
 
   // Get random width for wall shape
   getRanW(wallVariant) {
     if (wallVariant == wallVariants.SQR) {
       return floor(random(2, 4));
     } else if (
       wallVariant == wallVariants.L1 ||
       wallVariant == wallVariants.L2
     ) {
       return floor(random(2, 5));
     }
   }
 
   // Get random height for wall shape
   getRanH(wallVariant) {
     if (wallVariant == wallVariants.SQR) {
       return floor(random(2, 4));
     } else if (
       wallVariant == wallVariants.L1 ||
       wallVariant == wallVariants.L2
     ) {
       return floor(random(2, 6));
     }
   }
 
   // Probability of adding a wall
   rollDice() {
     let wallChance = random(0, 2);
     if (wallChance < 0.3) {
       return true;
     }
     return false;
   }
 
   // Adds an offset to the placement of the wall shape within the room
   // (To prevent rooms looking too symmetrical)
   addOffset(pos) {
     let offset = floor(random(0, wallBuffer));
     if (pos < roomWidth - step && pos < roomHeight - step) {
       return floor(random(pos, pos + offset));
     } else {
       return floor(random(pos, pos - offset));
     }
   }
 
   createBloodParticles(x, y, bloodColour) {
     if (!childMode) {
       for (let i = 0; i < 20; i++) {
         // y + 25 = blood stops falling below the object's feet
         this.bloodParticles.push(new Particle(x, y, bloodColour));
       }
     }
   }
 
   update() {
      for (let p of playerA.projectilesFired) {
         p.update();
      }
      for (let p of playerB.projectilesFired) {
      p.update();
      }
 
     // items
     for (let i = this.items.length - 1; i >= 0; i--) {
       this.items[i].update();
       this.items[i].draw();
       if (playerA.isCollidingWith(this.items[i])) {
         this.applyItemBuff(this.items[i], playerA);
         this.items.splice(i, 1);
       }
      if (playerB.isCollidingWith(this.items[i])) {
         this.applyItemBuff(this.items[i], playerB);
         this.items.splice(i, 1);
      }
     }
 
     // handles wall collisions
      for (let tileArr of this.roomLayout) {
         for (let tile of tileArr) {
            if (tile.type == tileTypes.WALL) {
            this.handleWallCollision(playerA, tile);
            this.handleWallCollision(playerB, tile);
            }
         }
      }
   
     //players
      playerA.update();
      playerB.update();
   }
 
   handleWallCollision(player, wall) {
     // First, detect if there's a collision
     if (player.position.x + player.widthHitbox/2 > wall.position.x - wall.widthHitbox/2 && 
         player.position.x - player.widthHitbox/2 < wall.position.x + wall.widthHitbox/2 &&
         player.position.y + player.heightHitbox/2 > wall.position.y - wall.heightHitbox/2 &&
         player.position.y - player.heightHitbox/2 < wall.position.y + wall.heightHitbox/2) {
       
       // Find the overlap on each axis
       let overlapLeft = (player.position.x + player.widthHitbox/2) - (wall.position.x - wall.widthHitbox/2);
       let overlapRight = (wall.position.x + wall.widthHitbox/2) - (player.position.x - player.widthHitbox/2);
       let overlapTop = (player.position.y + player.heightHitbox/2) - (wall.position.y - wall.heightHitbox/2);
       let overlapBottom = (wall.position.y + wall.heightHitbox/2) - (player.position.y - player.heightHitbox/2);
       
       // Find the smallest overlap (this is the direction to push out)
       let minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
       
       // Push the player out based on the smallest overlap
       if (minOverlap === overlapLeft) {
         player.position.x = wall.position.x - wall.widthHitbox/2 - player.widthHitbox/2;
         player.velocity.x = 0; // Stop horizontal movement
       } else if (minOverlap === overlapRight) {
         player.position.x = wall.position.x + wall.widthHitbox/2 + player.widthHitbox/2;
         player.velocity.x = 0; // Stop horizontal movement
       } else if (minOverlap === overlapTop) {
         player.position.y = wall.position.y - wall.heightHitbox/2 - player.heightHitbox/2;
         player.velocity.y = 0; // Stop vertical movement
       } else if (minOverlap === overlapBottom) {
         player.position.y = wall.position.y + wall.heightHitbox/2 + player.heightHitbox/2;
         player.velocity.y = 0; // Stop vertical movement
       }
     }
   }
 
   draw() {
      let firstFrame = true;

      for (let j = 0; j < roomHeight; j++) {
        for (let i = 0; i < roomWidth; i++) {
          if (this.roomLayout[j][i].type == tileTypes.WALL) {
            image(
              walltile,
              tileSize * i + arena_offset,
              tileSize * j + arena_offset,
              tileSize,
              tileSize
            );
            if (debug) {
              // TESTING - draw collision box
              fill(0, 200, 0, 100);
              rect(
                this.roomLayout[j][i].position.x,
                this.roomLayout[j][i].position.y,
                this.roomLayout[j][i].widthHitbox,
                this.roomLayout[j][i].heightHitbox
              );
            }
          } else {
            let tiledex = 1;
            if (j % 2 == 0 && i % 2 == 0) {
              tiledex = 0;
            }
            image(
              this.currentTileColours[tiledex],
              tileSize * i + arena_offset,
              tileSize * j + arena_offset,
              tileSize,
              tileSize
            );
          }
        }
      }
  
      // Draw any blood particles after room objects so they appear behind the player/mobs
      for (let i = 0; i < this.bloodParticles.length; i++) {
        this.bloodParticles[i].update();
        this.bloodParticles[i].draw();
        if (this.bloodParticles[i].isFinished()) {
          this.bloodParticles.splice(i, 1);
        }
      }
  
      playerA.move();
      playerB.move();
  
      playerA.fire();
      playerB.fire();
  
      const barWidth = 200;
      const barHeight = 20;
      const padding = 10;
  
      playerA.draw();
      playerA.drawPlayerHealthBar();
      playerA.drawPlayerHeatBar(
        width / 4 - 90,
        height - 80,
        barWidth,
        barHeight,
        playerA.fireCooldown / 200,
        "PLAYER A"
      );
  
      //text("Room", width / 2, height - 100);
      playerB.draw();
      playerB.drawPlayerHealthBar();
      playerB.drawPlayerHeatBar(
        width / 4 + 400,
        height - 80,
        barWidth,
        barHeight,
        playerB.fireCooldown / 200,
        "PLAYER B"
      );
  
  
      let hud_div = createDiv();
 
     // pvp bullet collisions
      for (let i = playerA.projectilesFired.length - 1; i >= 0; i--) {
         playerA.projectilesFired[i].draw();
         if (!playerA.projectilesFired[i].isActive) {
            playerA.projectilesFired.splice(i, 1);
            continue;
         }
         let projectileHit = false;
         if (playerA.projectilesFired[i].isCollidingWith(playerB)) {
            playerB.takeDamage(playerA.attackDamage);
            this.createBloodParticles(
            playerB.position.x,
            playerB.position.y,
            playerB.bloodColour
            );
            projectileHit = true;
         }
         if (projectileHit) {
            playerA.projectilesFired.splice(i, 1);
         }
      }
      

      for (let i = playerB.projectilesFired.length - 1; i >= 0; i--) {
         playerB.projectilesFired[i].draw();
         if (!playerB.projectilesFired[i].isActive) {
            playerB.projectilesFired.splice(i, 1);
            continue;
         }
         let projectileHit = false;
         if (playerB.projectilesFired[i].isCollidingWith(playerA)) {
            playerA.takeDamage(playerB.attackDamage);
            this.createBloodParticles(
            playerA.position.x,
            playerA.position.y,
            playerA.bloodColour
            );
            projectileHit = true;
         }
         if (projectileHit) {
            playerB.projectilesFired.splice(i, 1);
         }
         }
      }

 }
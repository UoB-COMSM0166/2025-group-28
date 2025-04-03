class BlinkMob extends Mob {
   constructor(img, x, y, difficultySettings) {
     super(img, x, y, difficultySettings)
     this.widthHitbox = 60;
     this.heightHitbox = 60;
     this.widthModel = 75;
     this.heightModel = 75;
     this.health = difficultySettings.blinkMobHealth();
     this.maxHealth = difficultySettings.blinkMobHealth();
     this.speed = difficultySettings.blinkMobSpeed;
     this.attackDamage = difficultySettings.blinkMobDamage;
     this.projectilesFired = [];
     this.bloodColour = color(135, 20, 103, 255); 
     this.fireCooldownLimit = 175;
   }

   fire() {
      if (this.fireReady) {
         this.blink();
         let projectileCount = 9;
         let angleIncrement = (2 * Math.PI) / projectileCount;
         let projectileSpeed = 2;
         
         for (let i = 0; i < projectileCount; i++) {
            let angle = i * angleIncrement;
            
            let velocityX = Math.cos(angle) * projectileSpeed;
            let velocityY = Math.sin(angle) * projectileSpeed;
            
            let newProjectile = new Projectile(
               this.position.x,
               this.position.y,
               velocityX,
               velocityY,
               3,
               fireball
            );
            this.projectilesFired.push(newProjectile);
         }
         this.fireReady = false;
      }
    }

   blink () {
      let spawnX, spawnY;
      let spawnAttempts = 0;
      while (spawnAttempts < 100) {
         spawnX = random(tileSize * 3, roomWidth * tileSize - tileSize * 3);
         spawnY = random(tileSize * 3, roomHeight * tileSize - tileSize * 3);
         let distanceFromP1 = dist(
         spawnX,
         spawnY,
         playerA.position.x,
         playerA.position.y
         );
         let distanceFromP2 = Infinity;
         if (coop) {
         distanceFromP2 = dist(
            spawnX,
            spawnY,
            playerB.position.x,
            playerB.position.y
         );
         }
         if (distanceFromP1 > 150 && distanceFromP2 > 150) {
         break;
         }
         spawnAttempts++;
      }
      this.position.x = spawnX;
      this.position.y = spawnY;
   }

 }
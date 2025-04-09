class ProjectileManager {
  constructor() {
    this.projectilesFired = []; // Holds all projectiles fired in a room (players' & mobs')
  }

  update() {
    for (let i = this.projectilesFired.length - 1; i >= 0; i--) {
      if (!this.projectilesFired[i].isActive) {
        this.projectilesFired.splice(i, 1);
      }
    }
  }

  addProjectile(projectile) {
    this.projectilesFired.push(projectile);
  }
}
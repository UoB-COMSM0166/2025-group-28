class Mob extends Sprite{
    constructor(img, x, y){
        super(img, x, y, 50);
        this.widthHitbox = 30;
        this.heightHitbox = 50;
        this.widthModel = 40;
        this.heightModel = 60;

        this.color = color(0, 255, 100);
        this.attackDamage = 30;
        this.fireRate = 0.5; // Seconds
        this.lastShot = 0; // Seconds

        this.maxHealth = maxHealth;
        this.health = maxHealth;

        this.img = img;
        
        this.speed = 3; //Slightly slower than players
        this.direction = createVector(-1, 0); //Mob starts facing left
    }

    draw(){
        let nearestPlayer = this.findNearestPlayer();
        if(nearestPlayer){
            this.moveTowards(nearestPlayer);
        }
    }

    moveTowards(player){
        this.velocity.set(0, 0);
        //Move towards the nearest player
        let x_dist = this.position.x - player.position.x;
        let y_dist = this.position.y - player.position.y;
        let distance = sqrt(x_dist * x_dist + y_dist * y_dist);
        this.velocity.x = - (x_dist / distance) * this.speed;
        this.velocity.y = - (y_dist / distance) * this.speed;
        this.direction = createVector(x_dist, y_dist);
        // Normalises diagonal movement
        if (this.velocity.x !== 0 && this.velocity.y !== 0) {
            this.velocity.setMag(this.speed);
        
        }
    }
    findDistanceToPlayer(player){
        let x_dist = abs(this.position.x - player.position.x);
        let y_dist = abs(this.position.y - player.position.y);
        let distance = sqrt(x_dist * x_dist + y_dist * y_dist);
        return distance;
    }

    findNearestPlayer(){
        let nearestPlayer = null;
        let smallestDistance = 1000000;
        for(let player of players){
            let distance = this.findDistanceToPlayer(player);
            if(distance < smallestDistance){
                smallestDistance = distance;
                nearestPlayer = player;
            }
        }
        return nearestPlayer;
    }
}
//(square root (Mob.x - player.x ) + square root (Mob.y - player.y) ) ^2;
//if(Mob.isCollidingWith(Player)){
//    Player.takeDamage(attackDamage);
//}
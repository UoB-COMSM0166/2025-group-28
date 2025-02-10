let newRoom;

function setup() {
  noStroke();
  createCanvas(800, 600);
  
  newRoom = new Room();
  newRoom.initRoom();
  player = new Sprite(astrocat, 400, 300);
  
  let button = createButton('Generate New Room');
  button.position(0, roomHeight * tileSize + 10);
  button.mousePressed(() => {
    newRoom.initRoom()
    player = new Sprite(astrocat, 400, 300);
  });
}

function draw() {

  newRoom.drawRoom();
  player.move();
  player.draw();
  
  // Click space to damage the sprite
  if (keyIsDown(32)) {
    player.takeDamage(1);
  }
}


let bg;
let pageHeight = 600;
let pageWidth = 800;

function preload() {
  bg = loadImage('space_bg.jpg');
  myFont = loadFont('LuckiestGuy-Regular.ttf');
  pauseCat = loadImage('pauseCat.png');
  //helmet = loadImage('helmet.png');
  gear = loadImage('gear.png');
}

function setup() {
  createCanvas(pageWidth, pageHeight);
  background(bg);
  
}

function draw() {
  textFont(myFont);
  fill(255);
  stroke(0);
  strokeWeight(4);
  textAlign(CENTER, CENTER);
  textSize(140);
  text('You Died', pageWidth/2, pageHeight*2.3/8);
  textSize(50);
  text('Cusiosity Killed the Cat', pageWidth/2, pageHeight*4/8);
  
  fill(220);
  stroke(100);
  strokeWeight(4);
  circle(pageWidth*2/6, pageHeight*6.2/8, 100);
  circle(pageWidth*3/6, pageHeight*6.2/8, 100);
  circle(pageWidth*4/6, pageHeight*6.2/8, 100);
  
  fill(255);
  stroke(0);
  textSize(20);
  text('Restart', pageWidth*2/6, pageHeight*6.2/8);
  textSize(20);
  text('Exit\r\nGame', pageWidth*3/6, pageHeight*6.2/8);
  //image(pauseCat,0,0,200,200)
  
  image(gear,pageWidth*4/6-57, pageHeight*6.2/8-50,110,110);
}

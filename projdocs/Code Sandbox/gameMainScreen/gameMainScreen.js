let bg;
let pageHeight = 600;
let pageWidth = 800;

function preload() {
  bg = loadImage('space_bg.jpg');
  myFont = loadFont('LuckiestGuy-Regular.ttf');
}

function setup() {
  createCanvas(pageWidth, pageHeight);
  background(bg);
  
}

//cat at o
//3 buttons

function draw() {
  textSize(120);
  textFont(myFont);
  fill(255);
  stroke(0);
  strokeWeight(4);
  textAlign(CENTER, CENTER);
  text('Astro\nCat', pageWidth/2, pageHeight*2/5);
  
}

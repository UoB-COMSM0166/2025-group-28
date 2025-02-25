let bg;
let pageHeight = 600;
let pageWidth = 800;

function preload() {
  bg = loadImage('space_bg.jpg');
  myFont = loadFont('LuckiestGuy-Regular.ttf');
  blackCat = loadImage('black-cat_12553199.png');
  bigCat = loadImage('big_cat.png');
  helmet = loadImage('helmet.png');
  gear = loadImage('gear.png');
}

function setup() {
  createCanvas(pageWidth, pageHeight);
  background(bg);
  
}

//cat at o
//3 buttons

function draw() {
  
  textFont(myFont);
  fill(255);
  stroke(0);
  strokeWeight(4);
  textAlign(CENTER, CENTER);
  textSize(140);
  text('Astr o', pageWidth/2, pageHeight*2.3/8);
  textSize(160);
  text('Cat', pageWidth/2, pageHeight*4/8);
  
  fill(220);
  stroke(100)
  strokeWeight(4);
  circle(pageWidth*2/6, pageHeight*6.2/8, 100);
  circle(pageWidth*3/6, pageHeight*6.2/8, 100);
  circle(pageWidth*4/6, pageHeight*6.2/8, 100);
  
  image(blackCat,pageWidth*2/6-30, pageHeight*6.2/8-30,60,60)
  
  push();
  translate(pageWidth*3/6-37, pageHeight*6.2/8-30);
  //let angle = frameCount * 0.01;
  rotate(PI/16);
  image(blackCat,0,0,40,40);
  rotate(-PI/8);
  image(blackCat,30,30,40,40);
  pop();
  
  push();
  translate(pageWidth*5.1/8+5, pageHeight*1.4/8-35);
  rotate(PI/12);
  image(helmet,0,0,180,180);
  image(bigCat,30,30,120,120);
  pop();
  
  image(gear,pageWidth*4/6-57, pageHeight*6.2/8-50,110,110);
}

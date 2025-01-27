function setup() {
  createCanvas(600, 720);
  // Set background to canvas-like colour
  background(250,240,230)

}

// YOU CAN CHOOSE WHAT COLOUR TO DRAW IN. IF YOU HOLD THE MOUSE IT WILL DRAW IN BLACK.
// IF YOU HOLD '1','2','3','4','5' OR '6' WHILE DRAWING IT WILL CHOOSE ANOTHER COLOUR.
// IF YOU HOLD '0' WHILE DRAWING IT WILL ERASE.
// IF YOU TAP 'B' WHILE NOT DRAWING, IT WILL BLUR THE IMAGE RAPIDLY.
// IF YOU TAP 'S' IT WILL SAVE THE IMAGE. YOU CAN ONLY DO THIS ONCE PER ARTWORK.
// WHILE DRAWING IF YOU HOLD iomageDOWN THE UP ARROW KEY, IT WILL INCREASE BRUSH SIZE.
// WHILE DRAWING IF YOU HOLD DOWN THE DOWN ARROW KEY, IT WILL DECREASE BRUSH SIZE.

//If you would like to save, hold the 's' key.
function c_press(){
  if(key === '1'){
    // Red
    fill(255, 99, 71, 160);  
  }
    if(key === '2'){
    // Blue
    fill(135, 206, 250, 160);  
  }
    if(key === '3'){
    // Green
    fill(144, 238, 144, 160);  
  }
    if(key === '4'){
    // Orange
    fill(255, 165, 0, 160);  
  }
    if(key === '5'){
    // Brown
    fill(160, 82, 45, 160);  
  }
    if(key === '6'){
      // Purple
      
      fill(160, 82, 45, 160);  
    }
    if(key === '0'){
      //Eraser
    fill(250,240,230, 160);
    }
}

let bSize = 10;

function brushSize(){
  if(keyCode === UP_ARROW){
    bSize = bSize + 1;
  }
  if(keyCode === DOWN_ARROW){
    if(bSize > 2){
      bSize = bSize - 1;
    }
  }
}
let isSaved = 0;

function draw() {
  if(keyIsPressed){
    if(key === 'b'){
     filter(BLUR, 0.000001)
    }
    if(key === 's' && isSaved === 0){
      //Save
      save('myArtwork.jpg');
      isSaved = 1;
    }
  }

  
  if(mouseIsPressed){
    noStroke();

    if(keyIsPressed){
      //fill(0, 100, 200, 160);
      c_press();
      brushSize();
     // filter(BLUR, 0.0001);
      //text("Update");
      
    }
    else{
      fill(105, 105, 105, 160);
    }
    
    ellipse(mouseX, mouseY, bSize, bSize)
    ellipse(mouseX + 5, mouseY, bSize, bSize)
    ellipse(mouseX, mouseY + 5, bSize, bSize)
    
    
    //line(pmouseX, pmouseY, mouseX, mouseY)
    //pmouseX = mouseX;
    //pmouseY = mouseY;
  }
}
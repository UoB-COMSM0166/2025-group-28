let player;
let player2;
let ac;
let ac2;

let ast;
let plan;
let star;
let alien;

let first;
let navVec;

let scenery = [];
let aliens = [];
let asset_lookup = [];
let mass_lookup = [];
let size_lookup = [];

let multiplayer = false;
let muultiplayer_player_number = 1;

class Asteroid {
  constructor(x, y, t) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.type = t;
  }
  display() {
    image(
      asset_lookup[this.type],
      this.position.x,
      this.position.y,
      size_lookup[this.type],
      size_lookup[this.type]
    );
  }
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force) {
    let m = mass_lookup[this.type];

    let f = p5.Vector.div(force, m);
    this.acceleration.add(f);
  }
}

function backdropDistro() {
  for (let i = 0; i < 600; i += 1) {
    let rx = random(0, width * 7);
    let ry = random(0, height * 5);
    let a = new Asteroid(rx, ry, 2);
    scenery.push(a);
  }
}
function backgroundDistro() {
  for (let i = 0; i < 15; i += 1) {
    let rx = random(0, width * 7);
    let ry = random(0, height * 5);
    let a = new Asteroid(rx, ry, 1);
    scenery.push(a);
  }
}

function astroDistro() {
  for (let i = 0; i < 50; i += 1) {
    let rx = random(0, width * 7);
    let ry = random(0, height * 5);
    let a = new Asteroid(rx, ry, 0);
    scenery[i] = a;
  }
}

function preload() {
  player = loadImage("astrocat3.png");
  player2 = loadImage("astrocat1.png");

  ast = loadImage("asteroid.png");
  plan = loadImage("planet.png");
  star = loadImage("star.png");
  alien = loadImage("alien.png");
}

function setup() {
  //fb_setup();

  console.log("Supabase Instance: ", supabase);

  // TEST - test game instance id: 902 -

  createCanvas(1000, 600);

  asset_lookup = [ast, plan, star];
  mass_lookup = [5, 10, 25];
  size_lookup = [25, 200, 5];

  ac = new AstroCat(width / 2, height / 2, 10, 1);
  // ac2 = new AstroCat(100, 100, 10, 2);

  // registerGame();
  checkForSecondPlayer();
  registerSelf();

  astroDistro();
  backgroundDistro();
  backdropDistro();
  createAlien();
}

const handleInserts = (payload) => {
  console.log("Change received!", payload);
};

function draw() {
  background(10, 11, 28);
  let gravity = createVector(0, 0.1 * -1);
  supabase
    .channel("player")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "player" },
      handleInserts
    )
    .subscribe();

  for (let item of scenery) {
    if (navVec != null) {
      item.applyForce(navVec);
      item.applyForce(gravity);
    }
    item.update();

    item.display();
  }
  ac.applyForce(gravity);
  ac.display();
  ac.update();
  reportState();

  for (let a of aliens) {
    if (navVec != null) {
      a.applyForce(navVec);
    }
    //   a.applyForce(createVector(-10, 0));
    a.update();
    a.display();
  }

  navVec = null;
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    ac2.applyForce(createVector(100, 0));
  }

  if (key === "x") {
    // shotFired();
  }
  if (key === "d") {
    // ac.applyForce(createVector(100, 0));
    navVec = createVector(-10, 0);
  }

  if (keyCode == RIGHT_ARROW) {
    // ac.applyForce(createVector(100, 0));
    navVec = createVector(-10, 0);
  }

  if (key === "a") {
    // ac.applyForce(createVector(-100, 0));
    navVec = createVector(10, 0);
  }
  if (key === "s") {
    // ac.applyForce(createVector(0, 100));
    navVec = createVector(0, -10);
  }
  if (key === "w") {
    //  ac.applyForce(createVector(0, -100));
    navVec = createVector(0, 10);
  }
}

async function reportState() {
  const { error } = await supabase
    .from("player")
    .update({ xpos: ac.position.x, ypos: ac.position.y })
    .eq("id", 1);
}
async function registerGame() {
  const { error } = await supabase.from("game").insert({
    id: 902,
    level: 0,
    mode: 2,
  });
}
async function registerSelf() {
  const { error } = await supabase.from("player").insert({
    id: muultiplayer_player_number,
    xpos: ac.position.x,
    ypos: ac.position.y,
    variant: 1,
    state: 1,
    game: 99022, //default test game constant instance
  });
}

class AstroCat {
  constructor(x, y, a, v) {
    this.mass = 100;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.variant = v;

    // used to identify player in DB for multiplayer
    this.id = random(1, 256);
  }
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    if (this.variant == 1) {
      image(player, this.position.x, this.position.y, 100, 150);
    } else {
      image(player2, this.position.x, this.position.y, 100, 150);
    }
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }
}

function createAlien() {
  let alien = new Alien(1400, 300, 1);
  aliens[0] = alien;
}

async function checkForSecondPlayer() {
  //check if player is present in current game. If so, join game as player 2 and listen for player 1's changes
  // player 1 should switch to multiplayer mode
  const { data, error } = await supabase.from("player").select("id").eq(1);

  if (data != null) {
    console.log("data found");
    muultiplayer_player_number = 2;
  }
}

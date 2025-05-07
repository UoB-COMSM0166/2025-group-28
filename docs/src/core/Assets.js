function preload() {
  tile_darkPurple = loadImage("assets/alternatetile20.png");
  tile_lightPurple = loadImage("assets/alternatetile21.png");
  tile_darkGrey = loadImage("assets/alternatetile1.png");
  tile_lightGrey = loadImage("assets/alternatetile2.png");
  tile_darkBlue = loadImage("assets/alternatetile3.png");
  tile_lightBlue = loadImage("assets/alternatetile4.png");
  tile_darkYellow = loadImage("assets/alternatetile5.png");
  tile_lightYellow = loadImage("assets/alternatetile6.png");
  tile_darkTurquoise = loadImage("assets/alternatetile7.png");
  tile_lightTurquoise = loadImage("assets/alternatetile8.png");
  tile_darkdarkBlue = loadImage("assets/alternatetile9.png");
  tile_lightlightBlue = loadImage("assets/alternatetile10.png");
  walltile = loadImage("assets/wall_tile_m3.png");
  trapTile = loadImage("assets/Trap.png");
  trapTileAlt = loadImage("assets/TrapAlt.png");

  tileColours1 = [tile_darkGrey, tile_lightGrey, trapTileAlt];
  tileColours2 = [tile_darkBlue, tile_lightBlue, trapTileAlt];
  tileColours3 = [tile_darkYellow, tile_lightYellow, trapTile];
  tileColours4 = [tile_lightTurquoise, tile_darkTurquoise, trapTile];
  tileColours5 = [tile_lightlightBlue, tile_darkdarkBlue, trapTileAlt];
  tileColours5 = [tile_darkPurple, tile_lightPurple, trapTile];

  doorImg = loadImage("assets/spacedoor.gif");
  doorOpenImg = loadImage("assets/spacedoorOpen.gif");
  bullet = loadImage("assets/projectileM1.gif");
  mobProjectileA = loadImage("assets/projectileM2v2.gif");
  mobProjectileB = loadImage("assets/projectileM3.gif");
  buttonPrompt = loadImage("assets/doorprompt.gif");
  pixelHeart = loadImage("assets/heart.gif");
  pixelEnergy = loadImage("assets/energy.gif");

  gameFont = loadFont("assets/ARCADE_I.ttf");

  heartMob_gif = loadImage("assets/HeartMobBossGif.gif");
  dogmob_gif = loadImage("assets/dogmob_v3.gif");
  dashmob_gif = loadImage("assets/dashmob.gif");
  rangedmob_gif = loadImage("assets/yellowDogMob2.gif");
  rapidfiremob_gif = loadImage("assets/rapidfiremob.gif");
  blinkMobGif = loadImage("assets/purpleDogMob.gif");

  // special 'talking astrocat'

  astrocat_gif = loadImage("assets/astrocat_hw2.gif");
  astrocat_gif_p2 = loadImage("assets/astrocatp2_m7.gif");

  healthbar = loadImage("assets/healthbar.gif");
  healthbar_b = loadImage("assets/healthbar.gif");

  //// SOUNDS ////
  // Player
  playerPainSound1 = loadSound("assets/playerpain1.mp3");
  playerPainSound2 = loadSound("assets/playerpain2.mp3");
  playerDeathSound = loadSound("assets/playerdeath.mp3");
  playerGunSound = loadSound("assets/player_gun.mp3");
  overheatStartSound = loadSound("assets/playeroverheatstart.mp3");
  overheatEndSound = loadSound("assets/playeroverheatend.mp3");
  overheatFireSound = loadSound("assets/playeroverheatfire.mp3");
  slowMeowStartSound = loadSound("assets/slowmeowstart.mp3");
  slowMeowEndSound = loadSound("assets/slowmeowend.mp3");
  slowMeowReadySound = loadSound("assets/slowmeowready.mp3");
  // Mobs
  mobProjectileSound = loadSound("assets/mobprojectile.mp3");
  blinkMobDeathSound = loadSound("assets/blinkmobdeath.mp3");
  blinkMobMoveSound = loadSound("assets/blinkmobmove.mp3");
  buffMobBuffSound = loadSound("assets/buffmobbuff.mp3");
  buffMobDeathSound = loadSound("assets/buffmobdeath.mp3");
  dashMobAttackSound = loadSound("assets/dashmobattack.mp3");
  dashMobDashSound = loadSound("assets/dashmobdash.mp3");
  meleeMobDeathSound = loadSound("assets/meleemobdeath.mp3");
  rangedMobDeathSound = loadSound("assets/rangedmobdeath.mp3");
  rapidFireChargeSound = loadSound("assets/rapidfirecharge.mp3");
  // Environment
  bloodSound1 = loadSound("assets/bloodsplat1.mp3");
  bloodSound2 = loadSound("assets/bloodsplat2.mp3");
  doorOpenSound = loadSound("assets/dooropen.mp3");
  roomTransitionSound = loadSound("assets/roomtransition.mp3");
  itemSound1 = loadSound("assets/pickupitem1.mp3");
  itemSound2 = loadSound("assets/pickupitem2.mp3");
  pvpScoreSound = loadSound("assets/pvpscoreincrease.mp3");
  pvpAnnouncer1 = loadSound("assets/pvpannouncer1.mp3");
  pvpAnnouncer2 = loadSound("assets/pvpannouncer2.mp3");
  pvpAnnouncer3 = loadSound("assets/pvpannouncer3.mp3");
  pvpAnnouncer4 = loadSound("assets/pvpannouncer4.mp3");
  pvpAnnouncer5 = loadSound("assets/pvpannouncer5.mp3");
  pvpAnnouncer6 = loadSound("assets/pvpannouncer6.mp3");
  // Menus
  menuClickSound = loadSound("assets/menuclick.mp3");
  menuSelectSound = loadSound("assets/menuselect.mp3");
  // Music
  themeMusic = createAudio("assets/theme.mp3");
  gameMusic = createAudio("assets/gamemusic.mp3");
  pvpMusic1 = createAudio("assets/pvpmusic1.mp3");
  pvpMusic2 = createAudio("assets/pvpmusic2.mp3");
  pvpMusic3 = createAudio("assets/pvpmusic3.mp3");
}

// HTML <img> paths (no need to preload):

let gameoverback = "assets/gmovertext.gif";

let singlePlayerIcon = "assets/singlepbutton.png";
let coopIcon = "assets/coopbutton.png";
let pvpIcon = "assets/pvpbutton.png";
let helpIcon = "assets/helpbutton.png";
let menuimg = "assets/menuback.mp4";
let radiobutton_off = "assets/radio_off";
let radiobutton_on = "assets/radio_on";

let setback = "assets/setback.png";

let wasd_icon = "assets/wasd_icon.png";
let arrow_icon = "assets/arrowpad_icon.png";
let wasd_icon_pvp = "assets/wasd_icon_pvp.png";
let arrow_icon_pvp = "assets/arrowpad_icon_pvp.png";

let add_ctrls = "assets/additional_controls.png";

let instr_1 = "assets/instruction_a.png";
let instr_2 = "assets/instruction_pickups.png";
let instr_3 = "assets/instruction_overheat.png";
let instr_4 = "assets/instruction_sm.png";
let instr_5 = "assets/instruction_traps.png";
let instr_6 = "assets/instruction_greendog.gif";
let instr_7 = "assets/instruction_yellowdog.gif";
let instr_8 = "assets/instruction_purpledog.gif";
let instr_9 = "assets/instruction_heartmob.gif";
let pg_back = "assets/pg_back6.png";
let pg_gamestart = "assets/pg_gamestart.gif";

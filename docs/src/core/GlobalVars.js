/* GLOBAL VARS */
let game;
let projectileManager;
let behaviourMonitor;

let muted = false;

let playerA;
let playerB;
let roomButton = null;
let pvpMode = false;
let projectileWallCollisions = false;

let gameCanvas;
let themeMusic;

let coop = false;
let inGame = false;
let childMode = false;
let debug = false;
let sp_button;
let coop_button;
let stng_button;
let pvp_button;
let stng_div;
let set_back;
let toggle_settings;
let toggle_help;

let wasd;
let arrow;
let settingpanel;

let menuContainer;
let scoretotal;
let returnToMenu;
let gameOverContainer;
let settingsMode = true;
let howtopanel;

let pause_stng_overlay = false;

let difficulty = difficultyLevels.EASY;
let difficultyNames = ["Kitten", "Hunter", "Apex"];

let difficultyTints = ["#52BB36", "#969190", "#D14042"];

//77,99,68
//166,171,164
//186,41,34

let diffTint = difficultyTints[0];
let difficultyButton;

let gameOver = false;
let gameCount = 1;
let playerADeathCount = 0;
let playerBDeathCount = 0;

// Screen fade vars
let fadeAlpha = 0;
let fadingOut = false;
let fadingIn = false;
let transitioning = false;

// Room transition positioning vars
let doorPrevPos = null;
let playerNextX, playerNextY;

// Room threat scaling vars
let baseThreatLimit = 10;
let threatScaleFactor = 2;

let slowMeowGain = 10;
let slowMeowLoss = slowMeowGain / 2;

let playbackRate = 1; // For adjusting SFX speed in slow mo

let wasd_control = true;
let pvp_rounds = 1; //var for 'best of x' system

let p1_up = 87;
let p1_down = 83;
let p1_left = 65;
let p1_right = 68;
let p1_shoot = 32;

let p2_up = 38;
let p2_down = 40;
let p2_left = 37;
let p2_right = 39;
let p2_shoot = 13;

let frame = 0;

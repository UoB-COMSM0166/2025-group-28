const pageWidth = 950;
const pageHeight = 800;

// Displacement from origin to start drawing room etc. - to centre room in new larger canvas
const arena_offset = 100;

// Room generation constants
const roomHeight = 37;
const roomWidth = 50;
const tileSize = 16;
const doorBuffer = 6; // To prevent door spawning too close to edges of room
const wallBuffer = 7; // To prevent wall shapes spawning too close to outer walls
const step = 4;

const knockbackForce = 4;

const slowMeowMax = 100;

const GameStates = Object.freeze({
  ACTIVE: 0,
  PAUSE: 1,
  OVER: 2,
});

const tileTypes = Object.freeze({
  FLOOR: 0,
  WALL: 1,
});

const MoveDirections = Object.freeze({
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
});

const wallVariants = Object.freeze({
  SQR: 0,
  L1: 1,
  L2: 2,
});

const playerNumber = Object.freeze({
  PLAYER_1: 0,
  PLAYER_2: 1,
});

const difficultyLevels = Object.freeze({
  EASY: 0,
  NORMAL: 1,
  HARD: 2,
});

const difficultySettings = Object.freeze([
  {
    // Easy mode
    playerDamageMult: 1.0,
    spawnRate: 3000,
    maxMobs: 4,
    mobHealthMult: () => healthCalc(0.7),
    mobDamageMult: 0.65,
    mobSpeedMult: 0.85,
    totalMobs: () => mobTotalIncrementer(),
    baseThreatMult: 0.5,
    baseAggressiveRating: 7,
    baseDefensiveRating: 5,
    heatGain: 20,
    heatDecay: 0.5,
    slowMeowGainMult: 1.25,
    slowMeowLossMult: 0.75,
    heartHealth: 25,
    newMobRequirement: 4,
  },
  {
    // Normal mode
    playerDamageMult: 1.0,
    spawnRate: 3000,
    maxMobs: 4,
    mobHealthMult: () => healthCalc(1.0),
    mobDamageMult: 1.0,
    mobSpeedMult: 1.0,
    totalMobs: () => mobTotalIncrementer(),
    baseThreatMult: 1.0,
    baseAggressiveRating: 10,
    baseDefensiveRating: 4,
    heatGain: 19,
    heatDecay: 0.55,
    slowMeowGainMult: 1.0,
    slowMeowLossMult: 1.0,
    heartHealth: 20,
    newMobRequirement: 2,
  },
  {
    // Hard mode
    playerDamageMult: 1.0,
    spawnRate: 3000,
    maxMobs: 5,
    mobHealthMult: () => healthCalc(1.32),
    mobDamageMult: 1.75,
    mobSpeedMult: 1.35,
    totalMobs: () => mobTotalIncrementer(),
    baseThreatMult: 1.5,
    baseAggressiveRating: 15,
    baseDefensiveRating: 3,
    heatGain: 18,
    heatDecay: 0.6,
    slowMeowGainMult: 0.75,
    slowMeowLossMult: 1.5,
    heartHealth: 15,
    newMobRequirement: 0,
  },
]);

function mobTotalIncrementer() {
  let start = 1;
  if (gameCount < 5) {
    return start + gameCount;
  } else if (gameCount < 6) {
    return 5;
  } else if (gameCount < 8) {
    return 6;
  } else if (gameCount < 11) {
    return 7;
  } else if (gameCount < 14) {
    return 8;
  } else if (gameCount < 18) {
    return 9;
  } else {
    return 10;
  }
}

function healthCalc(healthMult) {
  if (coop) {
    return healthMult + 0.4;
  }
  return healthMult;
}
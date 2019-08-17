import Phaser from "phaser";

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

//------ Global Variables -------
var game = new Phaser.Game(config);
var player, moveKeys, shootKeys, cursors;
//-------------------------------

function preload() {
  this.load.spritesheet("player", "assets/sprites/uglyarmyman.png", {
    frameWidth: 66,
    frameHeight: 60
  });

  this.load.image("background", "assets/backgrounds/background.png");
}

function create() {
  this.physics.world.setBounds(0, 0, 800, 600);
  this.add.image(400, 300, "background");

  player = this.physics.add.sprite(400, 300, "player");

  player
    .setOrigin(0.5, 0.5)
    .setDisplaySize(66, 60)
    .setCollideWorldBounds(true)
    .setDrag(500, 500);

  player.body.setMaxSpeed(300);

  // Creates object for input with WASD kets
  moveKeys = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D
  });

  this.input.keyboard.on("keydown_W", function(event) {
    player.setAccelerationY(-800);
  });
  this.input.keyboard.on("keydown_S", function(event) {
    player.setAccelerationY(800);
  });
  this.input.keyboard.on("keydown_A", function(event) {
    player.setAccelerationX(-800);
  });
  this.input.keyboard.on("keydown_D", function(event) {
    player.setAccelerationX(800);
  });

  this.input.keyboard.on("keyup_W", function(event) {
    if (moveKeys["down"].isUp) player.setAccelerationY(0);
  });
  this.input.keyboard.on("keyup_S", function(event) {
    if (moveKeys["up"].isUp) player.setAccelerationY(0);
  });
  this.input.keyboard.on("keyup_A", function(event) {
    if (moveKeys["right"].isUp) player.setAccelerationX(0);
  });
  this.input.keyboard.on("keyup_D", function(event) {
    if (moveKeys["left"].isUp) player.setAccelerationX(0);
  });

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  const upLeft = cursors.left.isDown && cursors.up.isDown;
  const up = cursors.up.isDown;
  const upRight = cursors.right.isDown && cursors.up.isDown;
  const right = cursors.right.isDown;
  const rightDown = cursors.right.isDown && cursors.down.isDown;
  const down = cursors.down.isDown;
  const leftDown = cursors.left.isDown && cursors.down.isDown;
  const left = cursors.left.isDown;

  //single directions first
  if (left) {
    player.angle = 270;
  } else if (right) {
    player.angle = 90;
  } else if (up) {
    player.angle = 0;
  } else if (down) {
    player.angle = 180;
  }

  //multikey directions
  if (upLeft) {
    player.angle = 315;
  } else if (upRight) {
    player.angle = 45;
  } else if (rightDown) {
    player.angle = 135;
  } else if (leftDown) {
    player.angle = 225;
  }
}

var greenBalloon, Green;
var redBalloon, Red;
var pinkBalloon, Pink;
var bg, Moving_bg;
var bow, Moving_bow;
var arrow, arrowImage;
var select_balloon;
var score = 0;
var whoosh, blast;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var greenB, redB, pinkB, arrowG;

function preload() {

  Green = loadImage("green_balloon0.png");
  Red = loadImage("red_balloon0.png");
  Pink = loadImage("pink_balloon0.png");
  Moving_bg = loadImage("background0.png");
  Moving_bow = loadImage("bow0.png");
  arrowImage = loadImage("arrow0.png");
  whoosh = loadSound( "whoosh.mp3");
  blast = loadSound("blast.mp3");
}

function setup() {
  createCanvas(600, 500);

  background = "white";

  bg = createSprite(400, 380, 400, 20);
  bg.addImage("Move", Moving_bg);
  bg.scale = 2;

  bow = createSprite(450, 200);
  bow.addImage("moving", Moving_bow);
  bow.scale = 1.5;

  redB = new Group();
  greenB = new Group();
  pinkB = new Group();
  arrowG = new Group();
}

function createArrow() {
  arrow = createSprite(360, 100, 5, 10);
  arrow.velocityX = -6;
  arrow.addImage("shoot", arrowImage);
  arrow.scale = 0.3;
  whoosh.play();
  arrow.lifetime = 320;
  arrowG.add(arrow);
}

function draw() {

  if (gameState === PLAY) {
    bg.velocityX = -4;

    if (bg.x < 0) {
      bg.x = bg.width / 2
    }
    bow.y = World.mouseY;

    if (keyDown("space")) {
      createArrow();
      arrow.y = bow.y;
    }
    var select_balloon = Math.round(random(1, 4));

    if (World.frameCount % 80 === 0) {
      if (select_balloon === 1) {
        red_balloon();
      } else if (select_balloon === 2) {
        pink_balloon();
      } else if (select_balloon === 3) {
        green_balloon();
      }
    }

    if (arrowG.isTouching(greenB)) {
     score++;
     greenB.destroyEach();
      arrowG.destroyEach();
      blast.play();

     }
      if (arrowG.isTouching(redB)) {
        score += 2;
       redB.destroyEach();
      arrowG.destroyEach();
      blast.play();

    }
    if (arrowG.isTouching(pinkB)) {
      score += 3;
      pinkB.destroyEach();
      arrowG.destroyEach();
     blast.play();

    }
  }


   else if (gameState === END) {

  }








  drawSprites();
  text("YOUR SCORE : " + score, 30, 50);

}

function red_balloon() {
  var redBalloon = createSprite(0, Math.round(random(100, 300)), 10, 10);
  redBalloon.addImage(Red);
  redBalloon.velocityX = 3;
  redBalloon.scale = 0.1;
  redBalloon.lifetime = 150;
  redB.add(redBalloon);
}

function green_balloon() {
  var greenBalloon = createSprite(0, Math.round(random(100, 300)), 10, 10);
  greenBalloon.addImage(Green);
  greenBalloon.velocityX = 3;
  greenBalloon.scale = 0.1;
  greenBalloon.lifetime = 150;
  greenB.add(greenBalloon);
}

function pink_balloon() {
  var pinkBalloon = createSprite(0, Math.round(random(100, 300)), 10, 10);
  pinkBalloon.addImage(Pink);
  pinkBalloon.velocityX = 3;
  pinkBalloon.scale = 1.5;
  pinkBalloon.lifetime = 145;
  pinkB.add(pinkBalloon);
}
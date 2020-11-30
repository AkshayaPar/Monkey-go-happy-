// creating the global variables
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survivalTime;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY

function preload(){
  
// loading the images
monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
createCanvas(600,400);
  
// creating sprite for monkey
monkey=createSprite(80, 315, 20, 20);
monkey.addAnimation("moving", monkey_running);
monkey.scale=0.1;
  
// creating sprite for the ground
ground=createSprite(400,350,900,10);
ground.shapeColor="brown";
ground.velocityX=-4;
ground.x=ground.width/2;
console.log(ground.x);
  
// Creating the groups
obstacleGroup= createGroup();
FoodGroup=createGroup();
  
score=0;
   
}


function draw() {
  
// creating the background
background("lightgreen");
  
//displaying score
stroke("black");
fill("black");
textSize(20);
text("Score:"+  survivalTime, 520, 30);
  
if(gameState === PLAY){
survivalTime = Math.ceil(frameCount/frameRate());
// To give the ground a scrolling effect
if(ground.x<0){
ground.x=300;
}
// when space is pressed the monkey should jump
if(keyDown("space")&& monkey.y>=262){
monkey.velocityY=-16;
}
// To give gravity to the monkey
monkey.velocityY=monkey.velocityY+0.8
// to collide the monkey with the ground
monkey.collide(ground);
// if the monkey touches the food then the food will destroy itself
if(FoodGroup.isTouching(monkey)) {
FoodGroup.destroyEach();
score = score+1;
}
//groups lifetime
obstacleGroup.setLifetimeEach(-1);
//calling the functions 
food();
obstacles();
// If the monkey touches the obstacle then the game ends
if(obstacleGroup.isTouching(monkey)){  
gameState = END;
}
}
  
if (gameState === END) {
obstacleGroup.destroyEach();
FoodGroup.destroyEach();
survivalTime.visible = false;
ground.velocityX=0;
monkey.velocityY=0;
monkey.pause();
stroke("red");
fill("red");
textSize(30);
text("Game Over", 200, 200);
stroke("black");
fill("black");
textSize(30);
text("The Monkey Is Dead Now", 190, 250);
}
  
// To draw the sprites  
drawSprites();
  
}

function food() {
if (frameCount % 80 === 0) {
banana = createSprite(600,350,40,10);
banana.addImage(bananaImage);
banana.y = Math.round(random(120,200));
banana.scale = 0.1;
banana.velocityX = -3;
banana.lifetime = 200;
FoodGroup.add(banana);
}
}


function obstacles(){
if (frameCount % 300 === 0){
obstacle = createSprite(600,325,10,10);
obstacle.addImage(obstacleImage);
obstacle.velocityX = -3;
obstacle.lifetime = 200;
obstacle.scale = 0.1 ;
obstacleGroup.add(obstacle);
}
}




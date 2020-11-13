
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground;

var PLAY=1;
var END=0;

var gameState=PLAY;

var score;
var SurvivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);

  //creates monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  //creates ground
  ground=createSprite(400,350,900,10);
  ground.x = ground.width /2;


     //createsGroup
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  
  score=0;
  SurvivalTime=0;
}


function draw() {
background(200);
  
  if(gameState===PLAY){
    
   spawnBanana();
  spawnObstacles();
  
     //to make the monkey jump
  if(keyDown("space")&& monkey.y >= 314) {
    monkey.velocityY = -20;
  }
    
      //adds gravity
   monkey.velocityY =  monkey.velocityY + 1;
    
   ground.velocityX = -4;
     
  //destroys banana
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score=score+1;
    
  }
 
    
    stroke("black");
    textSize(20);
    fill("black");
    SurvivalTime=Math.ceil(frameCount/frameRate())
    text("Survival Time :"+SurvivalTime,100,50);
    
    if(monkey.isTouching(obstacleGroup)){
gameState=END;
    }
  }
  else if(gameState===END){
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
  }
  

  
 
  

  
  //reloads ground
  if (ground.x < 300){
    ground.x = ground.width/2;
  }
  
  //prevents monkey from falling
  monkey.collide(ground);

stroke("white");
  textSize(20);
  fill("white");
  text("score :"+score,500,50);  
  drawSprites();
  
}

function spawnBanana(){
  if(World.frameCount%80===0){
    var banana=createSprite(350,Math.round(random(120,200),10,10));
    banana.addImage(bananaImage);
    banana.velocityX=-5;
    banana.lifetime=70;
    banana.scale=0.1;
    FoodGroup.add(banana);
  }
  
  }

function spawnObstacles(){
  if(World.frameCount%300===0){
    obstacle=createSprite(350,314);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-5;
    obstacle.lifetime=80;
    obstacle.scale=0.2;
    obstacleGroup.add(obstacle);
  }
  
}







var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
 spookySound.loop(); 
 
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY= 2;
  
  doorsGroup = new Group();
  
  climbersGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg)
  ghost.scale=0.3;
  
  invisibleBlockGroup = new Group();
  
}

function draw(){
  background(0);
  
  if(gameState==="play"){
 if(tower.y>400){
   tower.y=300;
 }
  
  if(keyDown("left")){
    ghost.x=ghost.x-3
  }
  
    if(keyDown("right")){
    ghost.x=ghost.x+3
  }
  
  
    if(keyDown("space")){
    ghost.velocityY=-3
      }
  ghost.velocityY=ghost.velocityY+0.5    
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
     ghost.destroy();
    gameState="end"
  }
    
  
  spawnDoors();
    
  drawSprites();
}
  if(gameState==="end"){
    text("game over", 230, 250)
  }
}

function spawnDoors() {
  //write code here to spawn the doors in the tower
   if(frameCount%240===0){
     door = createSprite(200,0)
      door.addImage(doorImg)
     climber = createSprite(200,50)
     climber.addImage(climberImg)
       door.velocityY=2
     door.x = Math.round(random(120,400))
     door.lifetime=600;
     doorsGroup.add(door);
     ghost.depth=door.depth;
     ghost.depth+=1
     climber.velocityY=2
     climber.x = door.x
    climber.lifetime=600;
     climbersGroup.add(climber);
     invisibleBlock=createSprite(200, 65,climber.width,2)
     invisibleBlock.x=door.x;
     invisibleBlock.velocityY=2;
     invisibleBlock.debug=false
     invisibleBlockGroup.add(invisibleBlock);
     
   }
}


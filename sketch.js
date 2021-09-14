var bg,bgImg;
var player, shooterImg, shooter_shooting;
var bullet
var life = 3;
var gameState = "play";
var score = 0;
var bullets  = 60;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bulletImage = loadImage("assets/21882-9-bullet.png")
  zombieImage = loadImage("assets/R.gif")
  zombie1Image = loadImage("assets/zombie.png")
  zombie2Image = loadImage("assets/d8rb0ke-e4f79e7a-5a15-4b36-be64-046fb76149a4.png")
  heart1Image = loadImage("assets/heart_1.png")
  heart2Image = loadImage("assets/heart_2.png")
  heart3Image = loadImage("assets/heart_3.png")
  
  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  
zombieGroup = createGroup();
bulletGroup = createGroup();



//creating the player sprite
player = createSprite(displayWidth-1000, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.4
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   // creating hearts

  //heart1
   heart1 = createSprite(width-150,40,20,20)
   heart1.addImage(heart1Image);
   heart1.scale = 0.5;
 //heart2
   heart2 = createSprite(width-100,40,20,20)
   heart2.addImage(heart2Image);
   heart2.scale = 0.5;
 //heart3
   heart3 = createSprite(width-150,40,20,20)
   heart3.addImage(heart3Image);
   heart3.scale = 0.5;

}

function draw() {
  background(0);

   if(gameState === "play"){

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}

// showing the lives for player after touching zombies

if(life === 3){
heart1.visible = false;
heart2.visible = false;
heart3.visible = true;

}

if(life === 2){
  heart1.visible = false;
  heart2.visible = true;
  heart3.visible = false;
  
  }

  if(life === 1){
    heart1.visible = true;
    heart2.visible = false;
    heart3.visible = false;
    
    }

    if(life === 0){
      heart1.visible = false;
      heart2.visible = false;
      heart3.visible = false;
      
      gameState = "lost"
      }

  
  



//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  createBullet();
  bullets = bullets-1

}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}


if(bullets === 0){

  gameState = "bulletState"

}

//if bullet the zombie the bullet and the zombie will die
if(zombieGroup.isTouching(bulletGroup))
{

 for(var i=0;i<zombieGroup.length;i++){
   
  if(zombieGroup[i].isTouching(bulletGroup)){
    zombieGroup[i].destroy();
    bulletGroup.destroyEach();
    score+=1
    
  }

 }

}

//changing to gamestate win
if(score === 50){

gameState = "win";

}
//destroying the player and the zombit touches
if(zombieGroup.isTouching(player))
{

for(var i=0;i<zombieGroup.length;i++){
 
  if(zombieGroup[i].isTouching(player)){
  
    zombieGroup[i].destroy();
    life = life - 1;

  }


}


}





spawnZombie2();
spawnZombie1();
spawnZombie();

}

if(gameState === "lost"){

  text("You Lost (Try Again)",470,410);

  zombieGroup.destroyEach();
  bulletGroup.destroyEach();
  player.destroy();
  

}
else if(gameState === "win"){

  text("You Win :)",470,410);

  zombieGroup.destroyEach();
  bulletGroup.destroyEach();


}
else if(gameState === "bulletState"){

  text("You Ran Out Of Bullets",470,410);

  zombieGroup.destroyEach();
  bulletGroup.destroyEach();
  player.destroy();
   

}


drawSprites();
fill ("white")
textSize (20)

text("Bullets:"+bullets,displayWidth-210,displayHeight/2-250);
text("Score:"+score,displayWidth-210,displayHeight/2-220);
text("Lives:"+life,displayWidth-200,displayHeight/2-280);



} 





function spawnZombie(){

  if (frameCount % 200 === 0)
  {
    var zombie = createSprite(width+20,height,40,10);
    zombie.y = Math.round(random(100,600));
    zombie.addImage(zombieImage);
    zombie.velocityX = -4;
    zombie.scale = 0.2;
    zombie.lifetime = 400
    zombieGroup.add(zombie);


  }



}

function spawnZombie1(){

  if (frameCount % 450 === 0)
  {
    var zombie1 = createSprite(width+20,height,40,10);
    zombie1.y = Math.round(random(100,600));
    zombie1.addImage(zombie1Image);
    zombie1.velocityX = -6;
    zombie1.scale = 0.2;
    zombie1.lifetime = 400
    zombieGroup.add(zombie1);


  }



}

function spawnZombie2(){

  if (frameCount % 750 === 0)
  {
    var zombie2 = createSprite(width+20,height,40,10);
    zombie2.y = Math.round(random(100,600));
    zombie2.addImage(zombie2Image);
    zombie2.velocityX = -10;
    zombie2.scale = 0.4;
    zombie2.lifetime = 400
    zombieGroup.add(zombie2);


  }



}


function createBullet()
{

 bullet = createSprite(displayWidth-1150,player.y-24,20,10);
 bullet.velocityX = 50;
 bullet.lifetime = 400
 bulletGroup.add(bullet);
 bullet.addImage(bulletImage);
 bullet.scale = 0.02 

}




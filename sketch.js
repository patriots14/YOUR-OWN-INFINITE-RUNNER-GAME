var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, zombieGroup;
var heart1, heart1Img;
var hear2, heart2Img;
var heart3, heart3Img;
var bulletImg;
var winMp3;
var explosionMp3;
var loseMp3;
var life = 3;
var gamestate = "play"

function preload(){
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  bgImg = loadImage("assets/bg.jpeg");
  zombieImg = loadImage("assets/zombie.png");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");
  bulletImg = loadImage("assets/bullet.png");
  winMp3 = loadSound("assets/win.mp3");
  explosionMp3 = loadSound("assets/explosion.mp3");
  loseMp3 = loadSound("assets/lose.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
  bg.addImage(bgImg);
  bg.scale = 1.1;
  zombieGroup = createGroup();
  bulletGroup = createGroup();

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
 
   player.debug = true
   //player.debug = false
    // player.Debug =false
    // Player.debug = true

   //player.Collider("rectagle",0,0,300,300)
   //player.setcollider("rectangle",0,0)
   player.setCollider("rectangle",0,0,300,300)
  // player.Setcollider("rectangle",0,0,300,300)

  heart = createSprite(width-200, 100)
  heart.addAnimation ("heart3", heart3Img);
  heart.addAnimation ("heart2", heart2Img);
  heart.addAnimation ("heart1", heart1Img);
  heart.scale = 0.3

}

function draw() {
  background(0); 
  if(gamestate=="play"){


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
for(var i=0; i<bulletGroup.length;i++){
  for(j=0; j<zombieGroup.length; j++){
    if(bulletGroup[i]&&zombieGroup[j]){
      if(bulletGroup[i].isTouching(zombieGroup[j])){
        bulletGroup[i].destroy();
        zombieGroup[j].destroy();
      }
    }
  }
}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  player.addImage(shooter_shooting);
  spawnBullet();
  explosionMp3.play();
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  //player.addImage( shooter_shooting )
 // player.addImage()
 player.addImage(shooterImg)
 //player.addImage(shooter_2.png)
}
if(zombieGroup.isTouching(player)){
  life = life-1;
  zombieGroup.destroyEach();
  if(life==0){
    gamestate = "end";
    loseMp3.play();
  }
}
switch (life) {
  case 3:
    heart.changeAnimation ("heart3", heart3Img);
    break;
  case 2: 
    heart.changeAnimation ("heart2", heart2Img);
    break;
  case 1: 
    heart.changeAnimation ("heart1", heart1Img);
    break;
   default:
    break;
}
drawSprites();
spawnZombies();
  }
else if(gamestate=="end"){
  zombieGroup.destroyEach()
  textSize(100);
  fill("red")
  textAlign(CENTER)
  text("GAME OVER",width/2, height/2);
  
}

}

function spawnZombies(){
  if(frameCount % 60 === 0){
    zombie = createSprite(windowWidth,windowHeight-30);
    zombie.y = Math.round(random(600,660));
    zombie.addImage(zombieImg);
    zombie.scale = 0.15;
    zombie.velocityX = -3;
    zombie.lifetime = 600;
    zombieGroup.add(zombie);
  }
}

function spawnBullet(){
  bullet = createSprite(player.x, player.y,30,10)
  bullet.velocityX = 5
  bullet.addImage(bulletImg);
  bullet. scale = 0.2
  bullet.lifetime = 300
  bulletGroup.add (bullet);
  bullet.debug=true
  bullet.setCollider("rectangle",0,0,100,100)
}
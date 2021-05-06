//Create variables here
var dogimg, dogimg2,dog
var database
var foodstock,food
function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png")
  dogImg2 = loadImage("images/dogImg1.png")

}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,300,15,15);
  
  dog.addImage(dogImg);
  dog.scale = 0.25;
  foodstock = database.ref('Food')
  foodstock.on("value",readStock)
}


function draw() {  
  background(46,139,87);
  if(keyWentDown("UP")) {
    writeStock(food)
    dog.addImage(dogImg2);
  }
  drawSprites();                                                                            
  //add styles here
  fill("white")
  stroke("black")
  textSize(20);
  text("Press Up Arrow to Feed the Dog",100,30);
  text("Remaning Food: " + food,200,70)
}


function readStock(data) {
  food = data.val();

}

function writeStock(x) {
  if(x <= 0) {
    x = 0
  } else {
    x--;
  }
  database.ref('/').update({
    Food : x
  })
  
}

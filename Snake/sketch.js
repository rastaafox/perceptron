// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AaGK-fj-BAM

var s;
var scl = 20;
var CanvasSize = 600;
var Clength = CanvasSize / 20;
var food;
var MousePCount = 0;
var Head = [];
var TailD = [];
var FoodA = [];
var action = 2;
const T_UP_ARROW = 0;
const T_DOWN_ARROW = 1;
const T_RIGHT_ARROW = 2;
const T_LEFT_ARROW = 3;
var nn;
var auto = 0;


function setup() {
  createCanvas(CanvasSize, CanvasSize);
  s = new Snake();
  //frameRate(50);
  pickLocation();
  nn = new NeuralNetwork(2700, 16, 4); 

}

function pickLocation() {
  var cols = (floor(width/scl));
  var rows = (floor(height/scl));
  food = createVector(floor(random(cols-2)+1), floor(random(rows-2)+1));
  food.mult(scl);
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}

function mousePressed() {
	if (MousePCount % 2 == 0)
		noLoop();
	else
		loop();
  MousePCount++;
  nn.weights_ih.print();
}

function draw() {
  background(51);

  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  s.update();
  s.show();
  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
  for (var i = 0; i < (Clength)*(Clength); i++){
	  if ((s.x)/scl + ((s.y/scl)*Clength) == i) {
		  Head[i] = 1;
	  } else {
		  Head[i] = 0;
	  }
  }
	for(var i = 0; i < (Clength)*(Clength); i++){
		TailD[i] = 0;
	}
  for(var j = 0; j < s.tail.length; j++){
	for (var i = 0; i < (Clength)*(Clength); i++){
	  if ((s.tail[j].x)/scl + (s.tail[j].y/scl)*Clength == i) {
		  TailD[i] = 1;
	  }
	}
  }
  	for(var i = 0; i < (Clength)*(Clength); i++){
		if(food.x/scl + (food.y/scl)*Clength == i)
		{
			FoodA[i] = 1;
		}
		FoodA[i] = 0;
	}
  // Randomizing the data
  let training = [];
  training = training.concat(Head);
  training = training.concat(TailD);
  training = training.concat(FoodA);
	
  let dir = [5];
  for(i=0; i < 4;i++){
	  if (i == action)
		  dir[i] = 1;
	  else
		  dir[i] = 0;
  }
   if (auto == 1){
	  let result = nn.predict(training);
      action = indexOfMax(result);
   }
   else
   {
	   let xdir = s.x -food.x;
	   let ydir = s.y -food.y;
	   if (xdir < 0 && action != T_LEFT_ARROW)
		   action = T_RIGHT_ARROW;
	   else if (xdir > 0 && action != T_RIGHT_ARROW)
		   action = T_LEFT_ARROW;
	   else if (ydir > 0 && action != T_DOWN_ARROW)
		   action = T_UP_ARROW;
	   else if (ydir < 0 && action != T_UP_ARROW)
		   action = T_DOWN_ARROW;
	   nn.train(training, dir);
	
   }
  


  if (action == T_UP_ARROW) {
    s.dir(0, -1);
  } else if (action == T_DOWN_ARROW) {
    s.dir(0, 1);
  } else if (action == T_RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (action == T_LEFT_ARROW) {
    s.dir(-1, 0);
  }
  
}




function keyPressed() {
  if (keyCode === UP_ARROW) {
    action = T_UP_ARROW
  } else if (keyCode === DOWN_ARROW) {
    action = T_DOWN_ARROW
  } else if (keyCode === RIGHT_ARROW) {
     action = T_RIGHT_ARROW
  } else if (keyCode === LEFT_ARROW) {
     action = T_LEFT_ARROW
  } else if (keyCode === 71) { //G pour GO
	  auto = 1;
  } else if (keyCode === 83) { //S pour STOP
	  auto = 0;
  }
}
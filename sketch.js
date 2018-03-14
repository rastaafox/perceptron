// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Perceptron Example
// See: http://en.wikipedia.org/wiki/Perceptron

// Code based on text "Artificial Intelligence", George Luger

// A list of points we will use to "train" the perceptron
var training = new Array(3000);
// A Perceptron object
var ptron;

// We will train the perceptron with one "Point" object at a time
var count = 0;
var NbRun = 1;
var Verbose = 0;
//Slowmode value : 0 - 1
var SlowMode = 0;

// Coordinate space
var xmin = -1;
var ymin = -1;
var xmax = 1;
var ymax = 1;
//var Fxs = "x * " + xVariation.toString() + " + " + yVariation.toString();
//console.log(Fxs);
//Verbose function
function logs(text){
	if (Verbose == 1){
		console.log(text);
	}
}

// The function to describe a line
// Fx Cube
/*
var xVariation = Math.random()-0.5;
var yVariation = (Math.random()-0.5)*10;
console.log(xVariation);
console.log(yVariation);
function f(x) {
  var y = -2 * x * x * x + x + xVariation;
  return y;
}
*/

//Fx Line

var xVariation = Math.random()-0.5;
var yVariation = (Math.random()-0.5)*10;
console.log(xVariation);
console.log(yVariation);
function f(x) {
  var y = yVariation * x *x *x+ x + xVariation;
  return y;
}


//Fx Between


/*
var xVariation = 0.42718610010263318 ;
var yVariation = -2.344317042061228;
*/
/*
var xVariation = 0.027963905603754613 ;
var yVariation = 1.8024400438060284;
*/
/*
var xVariation = -0.31788289900475579 ;
var yVariation = 3.2853140244496837;
var xVariation2 = 0.00109776522923005;
var yVariation2 = -0.7104641877531814;
*/

/*
var xVariation = (Math.random()-0.5) ;
var yVariation = (Math.random()-0.5);
var xVariation2 = (Math.random()-0.5) ;
var yVariation2 = (Math.random()-0.5)*10;
*//*
console.log(xVariation);
console.log(yVariation);
function f1(x) {
  var y = -yVariation * x  + x + xVariation;
  return y;
}
function f2(x) {
  var y = yVariation * x *x *x+ x + xVariation - 0.51;
  return y;
}
*/
function setup() {
  createCanvas(400, 400);
  logs("Initialize NN");
  nn = new NeuralNetwork(3, 12, 1); 
  logs("Initialize End NN");

  // Create a random set of training points and calculate the "known" answer
    logs("START Generate Random data");
  for (var i = 0; i < training.length; i++) {
    var x = random(xmin, xmax);
    var y = random(ymin, ymax);
    var answer = 1;
  //  if (y < f1(x) && y > f2(x)) answer = 0;
    if (y < f(x)) answer = 0;
    training[i] = {
      input: [x, y, 1],
	  output: [answer]
    };
//	console.log(training[i].output[0]);
  }
  
  logs("END Generate Random data");
}


function draw() {
	if(NbRun %10 ==0) {
		for (var i = 0; i < training.length; i++) {
		var x = random(xmin, xmax);
		var y = random(ymin, ymax);
		var answer = 1;
  //  if (y < f1(x) && y > f2(x)) answer = 0;
    if (y < f(x)) answer = 0;
		training[i] = {
		  input: [x, y, 1],
		  output: [answer]
		};
		}
	}
//	console.log(training[i].output[0]);

  background(255);
  // Draw the line
  strokeWeight(1);
  stroke(0);
  fill(1)
  let it = -1;
  while(it <= 1) {
		stroke(1);
		fill(1);
	  var x1 = map(it, xmin, xmax, 0, width);
	  var y1 = map(f(it), ymin, ymax, height, 0);	 
	/*  var x2 = map(xmax, xmin, xmax, 0, width);
	  var y2 = map(f(xmax), ymin, ymax, height, 0);*/
	  //line(x1, y1, x2, y2);
	  ellipse(x1, y1, 1, 1);
	    stroke(1);
		fill(1);	
	/*  var x2 = map(it, xmin, xmax, 0, width);
	  var y2 = map(f2(it), ymin, ymax, height, 0);	 
	  ellipse(x2, y2, 1, 1);*/

	  
	  it = it + 0.01;
  }


  // Train the Perceptron with one "training" point at a time
   logs("START Training");
   if(SlowMode == 1){
	   //console.log("Slow");
		nn.train(training[count].input, training[count].output);
   } else {
		for (var n = 0; n < 10; n++)
		{
		   let data = shuffle(training);
		   for (var i = 0; i < data.length; i++) {
				nn.train(data[i].input, data[i].output);
		   }
		}
   }

   logs("End Training");
   
	

  count = (count + 1) % training.length;

  // Set % success
  var GuessOK = 0;
  // Draw all the points based on what the Perceptron would "guess"
  // Does not use the "known" correct answer
  for (var i = 0; i < training.length; i++) {
    stroke(0);
    strokeWeight(1);
    fill(0);
    var guess = nn.predict(training[i].input);
    if (guess > 0) noFill();

    var x = map(training[i].input[0], xmin, xmax, 0, width);
    var y = map(training[i].input[1], ymin, ymax, height, 0);
	//if(guess == training[i].output) {
	//console.log(abs(guess[0] + training[i].output[0]));
	var Result = training[i].output[0] + guess[0]-1;
	//console.log(Result);
	if(abs(Result) >= 0.5) {
		GuessOK++;
		if (guess[0] <= 0.5){
		stroke('rgb(0,255,0)');
		fill('rgb(0,255,0)');
		} else {
		stroke('rgb(0,0,255)');
		fill('rgb(0,0,255)');	
		}
		ellipse(x, y, 4, 4);
	} else {
		stroke('rgb(255,0,0)');
		fill('rgb(255,0,0)');
		ellipse(x, y, 4, 4);
	}

  }
  if (GuessOK/training.length == 1 /*|| (SlowMode == 1 && GuessOK/training.length >= 0.99*/){
	  noLoop();
  } /*else if (NbRun > 5000&& SlowMode == 0){ 
	nn.setLearningRate(0.00001);
	stroke('rgb(0,0,255)');
	noLoop();
  } else if (NbRun > 1000 && SlowMode == 0){ 
	nn.setLearningRate(0.0001);
	stroke('rgb(0,0,255)');
  } */else if (GuessOK/training.length > 0.995){ 
	nn.setLearningRate(0.0001);
	stroke('rgb(0,0,255)');
  }else if (GuessOK/training.length > 0.98){ 
	nn.setLearningRate(0.001);
	stroke('rgb(0,0,255)');
  } else if (GuessOK/training.length > 0.97){ 
	nn.setLearningRate(0.005);
	stroke('rgb(0,0,255)');
  } else if (GuessOK/training.length > 0.95) {
	nn.setLearningRate(0.01);
	stroke('rgb(0,255,0)');
  } else {
	nn.setLearningRate(0.1);
	stroke('rgb(255,0,0)');
  }
	document.getElementById("Percent").value = GuessOK/training.length;
	document.getElementById("Learning").value = nn.learning_rate;
	document.getElementById("NbRun").value = NbRun;
	//nn.weights_ho.print();
  // Draw the line based on the current weights
  // Formula is weights[0]*x + weights[1]*y + weights[2] = 0
 /* strokeWeight(2);
  var weights = ptron.getWeights();
  var x1 = xmin;
  var y1 = (-weights[2] - weights[0] * x1) / weights[1];
  var x2 = xmax;
  var y2 = (-weights[2] - weights[0] * x2) / weights[1];

  var x1 = map(x1, xmin, xmax, 0, width);
  var y1 = map(y1, ymin, ymax, height, 0);
  var x2 = map(x2, xmin, xmax, 0, width);
  var y2 = map(y2, ymin, ymax, height, 0);
  line(x1, y1, x2, y2);*/
  NbRun++;
}
var Agent = function() {
	this.num_states = 10*2 + 3;
	//this.num_states = 3;
	this.last_reward = 0;
	this.speed = 0;
    this.digestion_signal = 0.0;
	this.actions = [];
	//this.actions.push([0,0]);
	this.actions.push(0);
	this.actions.push(1);
	this.actions.push(2);
	this.actions.push(3);
	this.actions.push(4);
	this.actions.push(5);
	this.actions.push(6);
	this.actions.push(7);
    this.action = 0;
	
}

Agent.prototype = {
  getNumStates: function() {
    return this.num_states;
  },
  getMaxNumActions: function() {
    return this.actions.length;
  },
  forward: function() {
    var input_array = new Array(this.num_states);
	var X = position;
	var A = 0; //min speed
	var B = trackLength; //Max speed
	var C = 0; //normalized Min
	var D = 1; //normalized Max
	  
	/*  for(n = 0 ; n < 10 ; n++) {
		var B = trackLength;
		input_array[n*2]		= (cars[n].z-A)/(B-A) * (D-C) + C;
		var B = maxSpeed;
		input_array[n*2 + 1]	= cars[n].offset;
	  }
	var B = maxSpeed; //Max speed
	input_array[10*2+1] = playerX;
	input_array[10*2+2] = (a.brain.env.speed-A)/(B-A) * (D-C) + C;
	var B = trackLength;
	input_array[10*2+3] = (position-A)/(B-A) * (D-C) + C;*/
	
	var B = maxSpeed; //Max speed
	input_array[0] = playerX;
	input_array[1] = (a.brain.env.speed-A)/(B-A) * (D-C) + C;
	var B = trackLength;
	input_array[2] = (position-A)/(B-A) * (D-C) + C;
	var WorkingCars = [];
	for(n = 0 ; n < totalCars ; n++) {
		WorkingCars[n] = cars[n];
	  }
	 var i = 0;
	for(n = 0 ; n < totalCars ; n++) {
		if (cars[n].z - position > 0 && cars[n].z - position < 30000 && i < 10)
		{
			var B = trackLength;
			input_array[3 + i*2]		= (cars[n].z-A)/(B-A) * (D-C) + C;
			var B = maxSpeed;
			input_array[3 + i*2 + 1]	= cars[n].offset;
			i++;
		}
	  }
	 // console.log(i);
	  for (n = i;i < 10;i++){
		  input_array[3 + i*2] = -1;
		  input_array[3 + i*2 + 1] = -1;
	  }
	  
    this.action = this.brain.act(input_array);
    //var action = this.actions[actionix];
    // demultiplex into behavior variables
    //this.action = action;
  },
  backward: function() {
var reward = this.digestion_signal;
    var reward = this.digestion_signal;
    // var proximity_reward = 0.0;
    // var num_eyes = this.eyes.length;
    // for(var i=0;i<num_eyes;i++) {
    //   var e = this.eyes[i];
    //   // agents dont like to see walls, especially up close
    //   proximity_reward += e.sensed_type === 0 ? e.sensed_proximity/e.max_range : 1.0;
    // }
    // proximity_reward = proximity_reward/num_eyes;
    // reward += proximity_reward;

    //var forward_reward = 0.0;
    //if(this.actionix === 0) forward_reward = 1;

    this.last_reward = reward; // for vis
    this.brain.learn(reward);
  }
}
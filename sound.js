// Play the sound of the corresponding animial
function playSound(bufferList, i) {

  var source1 = soundContext.createBufferSource();
  source1.buffer = bufferList[i];
  source1.connect(soundContext.destination);
  source1.start(i);
}


// Only play the animial sound if the distance is within 10 unit
function calcDistance(cam, animial_pos, i) {
  var pos = mult_vec(animial_pos, vec4(0,0,0,1));

  var dist_vec = vec2(cam[0] - pos[0], cam[3], pos[3]);
  var dist_len = length(dist_vec);

  return dist_len;
}

// Map between given animial and its sound index
function soundAnimialMap(animial) {
  var i;

  if (animial == "background") {
  	i = 0;
  } else if (animial == "fox") {
  	i = 1;
  } 
  else if (animial == "lion") {
  	i = 2;
  } 
  else if (animial == "ealge") {
  	i = 3;
  } 
  else if (animial == "horse") {
  	i = 4;
  } 
  else if (animial == "bear") {
  	i = 5;
  } else {
  	i = -1;
  }

  return i;
}

// Process the sound for the given animial and time
function processSound(animial, time, cam, model_transform) {
	var animial_index = soundAnimialMap(animial);
	var animial_distance = calcDistance(cam, model_transform, animial_index);
	if (animial_distance < sound_play_distance) {
		if_play[animial_index] = false;
		played_time[animial_index] = 0;
	} else {
		if (if_play[animial_index]){
			if ((time - played_time[animial_index]) > play_period) {
				playSound(soundBuffer.bufferList, animial_index);
				played_time[animial_index] = time;
			} else {
				playSound(soundBuffer.bufferList, animial_index);
				if_play[animial_index] = true;
				played_time[animial_index] = time;
			}
		}
	}
}

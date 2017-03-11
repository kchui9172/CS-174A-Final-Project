// Play the sound of the corresponding animial
function playSound(soundContext, bufferList, i) {

  var source1 = soundContext.createBufferSource();
  source1.buffer = bufferList[i];
  source1.connect(soundContext.destination);
  source1.start(0);
}


// Only play the animial sound if the distance is within 10 unit
function calcDistance(cam, animial_pos) {
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
function processSound(model_class, model_id, time, cam, model_transform, sound_manager, soundBuffer, soundContext) {
	var class_index = soundAnimialMap(model_class);
	var model_distance = calcDistance(cam, model_transform);
	if (model_distance < sound_manager.sound_play_distance) {
		sound_manager.if_play[model_id] = false;
		sound_manager.played_time[model_id] = 0;
	} else {
		if (sound_manager.if_play[model_id]){
			if ((time - sound_manager.played_time[model_id]) > sound_manager.play_period) {
				playSound(soundContext, soundBuffer.bufferList, class_index);
				sound_manager.played_time[class_index] = time;
			} else {
				playSound(soundContext, soundBuffer.bufferList, class_index);
				sound_manager.if_play[model_id] = true;
				sound_manager.played_time[model_id] = time;
			}
		}
	}
}

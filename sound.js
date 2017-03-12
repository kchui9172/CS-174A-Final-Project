// Play the sound of the corresponding animial
function playSound(soundContext, bufferList, i) {

  var source = soundContext.createBufferSource();
  source.buffer = bufferList[i];
  source.loop = true;
  var gainNode = context.createGain();
  source.connect(gainNode);
  gainNode.connect(soundContext.destination);
  source.start(0);
  return gainNode;
}


// Only play the animial sound if the distance is within 10 unit
function calcDistance(cam, animial_pos) {
  var pos = mult_vec(animial_pos, vec4(0,0,0,1));

  var dist_vec = vec2(cam[0] - pos[0], cam[3], pos[3]);
  var dist_len = length(dist_vec);

  return dist_len;
}

function playAllSound(scratchpad) {
  for(var i = 1; i < scratchpad.soundBuffer.bufferList.length; i++ ) {
    scratchpad.sound_manager.class_sound_gain[i] = playSound(scratchpad.soundContext, scratchpad.soundBuffer.bufferList, i);
    scratchpad.sound_manager.class_sound_gain[i].gain.value = 0;
  }
  scratchpad.sound_manager.class_sound_gain[0] = scratchpad.soundBuffer.initial_background;
}


// Process the sound for the given animial and time
function processSound(model_class, model_id, cam, model_transform, sound_manager, soundBuffer, soundContext) {
	var model_distance = calcDistance(cam, model_transform);
	if (model_distance > sound_manager.sound_play_distance) {
		sound_manager.if_play[model_id] = false;
    if (sound_manager.source[model_id] != null){
      console.log(sound_manager.source[model_id]);
      sound_manager.source[model_id].stop();
    }
	} else {
    var class_index = soundAnimialMap(model_class);
    console.log(class_index);
		sound_manager.source[model_id] = playSound(soundContext, soundBuffer.bufferList, class_index);
		sound_manager.if_play[model_id] = true;
	}
}

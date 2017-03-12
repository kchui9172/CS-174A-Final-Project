// Play the sound of the corresponding animial
function playSound(soundContext, bufferList, i) {

  var source = soundContext.createBufferSource();
  source.buffer = bufferList[i];
  source.loop = true;
  var gainNode = soundContext.createGain();
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

// Process the sound for the given animial and time
function processSound(model_class, cam, model_transform, sound_manager) {
	var model_distance = calcDistance(cam, model_transform);
	if (model_distance < sound_manager.sound_play_distance) {
    var class_index = sound_manager.class_index_map[model_class];
    sound_manager.class_sound_count[class_index]++;
	}
}

function adjustGain(sound_manager, scratchpad) {
  if (scratchpad.soundBuffer.class_sound_gain.length != 0) {
    for (var i = 3; i < sound_manager.num_sound_class; i++) {
      if (sound_manager.class_sound_count[i] > 0) {
        scratchpad.soundBuffer.class_sound_gain[i].gain.value = 1;
      } else {
        scratchpad.soundBuffer.class_sound_gain[i].gain.value = 0;
      }
      sound_manager.class_sound_count[i] = 0;
    }
  }
}

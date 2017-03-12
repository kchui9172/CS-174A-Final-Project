// Play the sound of a given buffer at index i and return its gain node
function playSound(soundContext, bufferList, i) {

  var source = soundContext.createBufferSource();
  source.buffer = bufferList[i];
  source.loop = true;        // Have the sound looping forever
  var gainNode = soundContext.createGain();
  source.connect(gainNode);
  gainNode.connect(soundContext.destination);
  source.start(0);
  return gainNode;
}

// Calculate the relative distance of a given animal to the position of the camera
function calcDistance(cam, animal_pos) {
  var pos = mult_vec(animal_pos, vec4(0,0,0,1));

  var dist_vec = vec2(cam[0] - pos[0], cam[3], pos[3]);
  var dist_len = length(dist_vec);
  return dist_len;
}

// Count for all models in the current scenes, 
// if there are any animal of each class is within sound play distance to the camera
function processSound(model_class, cam, model_transform, sound_manager) {
	var model_distance = calcDistance(cam, model_transform);
	if (model_distance < sound_manager.sound_play_distance) {
    var class_index = sound_manager.class_index_map[model_class];
    sound_manager.class_sound_count[class_index]++;
	}
}

// If there are at least one animal of each class within the distance to play sound,
// Adjust the gain of the sound of that particular class to make the sound audible 
function adjustGain(sound_manager, scratchpad, time) {
  if (scratchpad.soundBuffer.class_sound_gain.length != 0) {
    for (var i = 3; i < sound_manager.num_sound_class; i++) {
      if (sound_manager.class_sound_count[i] > 0) {
        scratchpad.soundBuffer.class_sound_gain[i].gain.value = sound_manager.class_sound_gain[i];
      } else {
        scratchpad.soundBuffer.class_sound_gain[i].gain.value = 0;
      }
      // Reset the class model count for next iteration of the display scene
      sound_manager.class_sound_count[i] = 0;
    }
  }
}

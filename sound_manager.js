Declare_Any_Class( "Sound_Manager", {
  'construct': function(models) {
    this.sound_play_distance = 10;   // The distance in unit within the animial to have the sound played
    this.play_period = 5000;         // The time to replay the sound

    this.if_play = {};        // If the corresponding sound is currently being played for each model
    this.played_time = {};    // How long the corresponding sound is being played since the last time within distance

    for (var i = 0; i < models.length; i++) {     // Initialize the sound play and play time arrays
      if_play[model[i].id] = false;
      played_time[model[i].id] = 0;
    }

    // This needs to be updated according to the 
    this.class_index_map = {};
    class_index_map['background'] = 0;
    class_index_map['fox'] = 1;
    class_index_map['lion'] = 2;
    class_index_map['eagle'] = 3;
    class_index_map['horse'] = 4;
    class_index_map['bear'] = 5;
    class_index_map['parrot'] = 6;

    this.num_sounds_class = 7;             // Number of sounds class in the list
  },
} );
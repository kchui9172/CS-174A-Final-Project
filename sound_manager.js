Declare_Any_Class( "Sound_Manager", {
  'construct': function(models) {
    this.sound_play_distance = 10;   // The distance in unit within the animial to have the sound played
    this.play_period = 5000;         // The time to replay the sound

    this.if_play = {};        // If the corresponding sound is currently being played for each model
    this.played_time = {};    // How long the corresponding sound is being played since the last time within distance

    for (var i = 0; i < models.length; i++) {     // Initialize the sound play and play time arrays
      this.if_play[models[i].id] = false;
      this.played_time[models[i].id] = 0;
    }

    // This needs to be updated according to the 
    this.class_index_map = {};
    this.class_index_map['background'] = 0;
    this.class_index_map['farm'] = 1;
    this.class_index_map['city'] = 3;
    this.class_index_map['forest'] = 2;
    this.class_index_map['wolf'] = 4;
    this.class_index_map['cow'] = 5;
    this.class_index_map['goat'] = 6;
    this.class_index_map['fox'] = 7;
    this.class_index_map['lion'] = 8;
    this.class_index_map['eagle'] = 9;
    this.class_index_map['horse'] = 10;
    this.class_index_map['bear'] = 11;
    this.class_index_map['parrot'] = 12;

    this.num_sounds_class = 13;             // Number of sounds class in the list

  },
} );
Declare_Any_Class( "Sound_Manager", {
  'construct': function() {
    this.sound_play_distance = 10;   // The distance in unit within the animial to have the sound played

    // This needs to be updated according to the 
    this.class_index_map = {};
    this.class_index_map['farm'] = 0;
    this.class_index_map['forest'] = 1;
    this.class_index_map['city'] = 2;
    this.class_index_map['wolf'] = 3;
    this.class_index_map['goat'] = 4;
    this.class_index_map['fox'] = 5;
    this.class_index_map['lion'] = 6;
    this.class_index_map['eagle'] = 7;
    this.class_index_map['horse'] = 8;
    this.class_index_map['bear'] = 9;
    this.class_index_map['parrot'] = 10;
    this.class_index_map['deer'] = 11;
    this.class_index_map['raven'] = 12;

    this.num_sound_class = 13;             // Number of sounds class in the list

    this.class_sound_count = [];

    for (var i = 0; i < this.num_sound_class; i++) {     // Initialize the sound play and play time arrays
      this.class_sound_count.push(0);
    }

  },
} );
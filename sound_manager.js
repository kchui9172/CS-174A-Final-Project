// The sound class manager to store sound mapping and useful information of sound buffers
Declare_Any_Class( "Sound_Manager", {
  'construct': function() {
    this.sound_play_distance = 20;   // The distance in unit within the animal to have the sound played

    // This needs to be updated according to the index.html when loading sound buffer
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

    this.class_sound_count = [];           // The array of counts of number of models of each class within sound play distance to camera

    // Generate a corresponding valume gain of each sound to normalize them when played
    this.class_sound_gain = [];
    this.class_sound_gain.push(0.4);  // scene1
    this.class_sound_gain.push(1);    // scene2
    this.class_sound_gain.push(0.6);  // scene3
    this.class_sound_gain.push(1);    // wolf
    this.class_sound_gain.push(0.8);  // goat
    this.class_sound_gain.push(1);    // fox
    this.class_sound_gain.push(1);    // lion
    this.class_sound_gain.push(0.5);  // eagle
    this.class_sound_gain.push(0.2);  // horse
    this.class_sound_gain.push(0.8);  // bear
    this.class_sound_gain.push(0.4);  // parrot 
    this.class_sound_gain.push(0.8);  // deer
    this.class_sound_gain.push(1);  // raven


    for (var i = 0; i < this.num_sound_class; i++) {     // Initialize the sound counts array
      this.class_sound_count.push(0);
    }

  },
} );
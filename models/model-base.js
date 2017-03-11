Declare_Any_Class( "ModelBase", { 
  'populate': function() {
    var model = this.getModel();
    var vil = this.getVil();
    var vil3 = vil * 3;
    var morph = model.morphTargets.length;

    var model_loaded = load_rome_model(model, vil, morph, this.getZOffset());
    var p1 = model_loaded.p1;
    var norms = model_loaded.norm;
    var cols = model_loaded.col1;
    var fi = model_loaded.fi;

    for (var i = 0; i < morph - 1; i++) {
      for (var j = 0; j < vil * 3; j+=3) {
        this.positions.push(vec3(p1[i][j], p1[i][j+1], p1[i][j+2]));
        this.positions2.push(vec3(p1[i+1][j], p1[i+1][j+1], p1[i+1][j+2]));
        this.normals.push(vec3(norms[i][j], norms[i][j+1], norms[i][j+2]));
        this.normals2.push(vec3(norms[i+1][j], norms[i+1][j+1], norms[i+1][j+2]));
        this.colors.push(vec4(cols[j], cols[j+1], cols[j+2], 1));
      }
    }
    for (var j = 0; j < vil * 3; j+=3) {
      this.positions.push(vec3(p1[morph - 1][j], p1[morph - 1][j+1], p1[morph - 1][j+2]));
      this.positions2.push(vec3(p1[0][j], p1[0][j+1], p1[0][j+2]));
      this.normals.push(vec3(norms[morph - 1][j], norms[morph - 1][j+1], norms[morph - 1][j+2]));
      this.normals2.push(vec3(norms[0][j], norms[0][j+1], norms[0][j+2]));
      this.colors.push(vec4(cols[j], cols[j+1], cols[j+2], 1));
    }
    this.all_indices = [];
    for (var i = 0; i < morph; i++) {
      var ind = [];
      for (var j = 0; j < fi.length; j++) {
        ind.push (fi[j].P0 + i*vil, fi[j].P1 + i*vil, fi[j].P2 + i*vil)
      }
      this.all_indices.push(ind);
    }
    this.indices = this.all_indices[0];
    this.color_vertices = true;
    this.animated = true;
    this.set_interval(10);
  },
  'set_interval': function( interval ) {
    this.interval = interval;
    this.step_per_frame = interval / this.all_indices.length;
  },
  'set_step': function( step ) {
    var current_frame = Math.floor(step / this.step_per_frame) % this.all_indices.length;
    if (current_frame != this.current_frame) {
      this.current_frame = current_frame;
      this.indices = this.all_indices[this.current_frame];
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.index_buffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(this.indices), gl.STATIC_DRAW);
    }
    this.animatefactor = ( step % this.step_per_frame )/ this.step_per_frame;
  },
  'draw': function( graphics_state, model_transform, material ) {
    Shape.prototype.draw.call(this, graphics_state, model_transform, material);
  },
  'getVil': function() {
    return 0;
  },
  'getZOffset': function() {
    return 0;
  },
  'getModel': function() {
    return {
    "morphTargets": [],
    "colors": [],
    "faces": [],
  }},
}, Shape );


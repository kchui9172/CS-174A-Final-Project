Declare_Any_Class( "Scene_Manager", {
  'construct': function(params) {
    this.define_data_members( {
      x_min: params.x_min,
      x_max: params.x_max,
      y_min: params.y_min,
      y_max: params.y_max,
      z_min: params.z_min,
      z_max: params.z_max,
      min_speed: params.min_speed,
      max_speed: params.max_speed,
      objects: [],
      blockers: [],
      repulsion_const: 80,
      wall_weight: 200,
      time_factor: 10,
    });
    if (params.repulsion_const) {
      this.repulsion_const = param.repulsion_const;
    }
    if (params.wall_weight) {
      this.wall_weight = param.wall_weight;
    }
    if (params.time_factor) {
      this.time_factor = param.time_factor;
    }
  },
  'register_shape': function(shape, type, id ,loc, scale, weight, animation_factor, y_axis_enabled = false ) {
    var velocity = scale_vec( this.min_speed, normalize( vec3( Math.random(), Math.random(), Math.random() ) ) );
    this.objects.push({
      type: type,
      id: id,
      position: loc,
      velocity: velocity,
      accel: vec3(0,0,0),
      shape: shape,
      scale: scale,
      weight: weight,
      y_axis_enabled: y_axis_enabled,
      animation_factor: animation_factor,
      animation_step: 0,
    });
  },
  'set_blocker': function(blockers) {
    if( blockers ) {
      this.blockers = blockers;
    }
  },
  'get_shape_positions': function() {
    var result = [];
    for( obj of this.objects ) {
      result.push({type: obj.type, id: obj.id, position: obj.position});
    }
    return result;
  },
  'get_shape_transforms': function() {
    var result = [];
    for( obj of this.objects ) {
      result.push({
        id: obj.id,
        shape: obj.shape,
        transform: this.transform(obj),
        animation_step: obj.animation_step
      });
    }
    return result;
  },
  'transform': function(obj) {
    var model_transform = scale(obj.scale, obj.scale, obj.scale);
    var angle = Math.acos( dot( obj.velocity, vec3(0, 0, 1) ) / length( obj.velocity )) * 180 / Math.PI;
    var axis = cross( vec3(0, 0, 1), obj.velocity );
    model_transform = mult( rotation( angle, axis ), model_transform );
    model_transform = mult( translation( obj.position[0], obj.position[1], obj.position[2] ), model_transform );
    return model_transform;
  },
  'elaps_time': function(time_delta) {
    for( obj of this.objects ) {
      this.calc_location(obj, time_delta);
      this.calc_animation_step(obj, time_delta);
      this.calc_velocity(obj, time_delta);
      this.calc_acceleration(obj);
    }
  },
  'calc_acceleration': function(thisObj) {
    var result_force = vec3( 0, 0, 0 );
    for( thatObj of this.objects ) {
      if ( thatObj.id == thisObj.id ) { continue; }
      var dist = subtract( thisObj.position, thatObj.position );
      var force = this.repulsion_const * thatObj.weight / dot(dist, dist);
      result_force = add( result_force, scale_vec( force, normalize( dist ) ) );  
    }
    for( thatObj of this.blockers ) {
      var dist = subtract( thisObj.position, thatObj.position );
      var force = this.repulsion_const * thatObj.weight / dot(dist, dist);
      result_force = add( result_force, scale_vec( force, normalize( dist ) ) );  
    }
    var force_x = this.repulsion_const * this.wall_weight 
      * ( 1 / Math.pow( ( thisObj.position[0] - this.x_min ), 2 ) 
        - 1 / Math.pow( ( this.x_max - thisObj.position[0] ), 2 ) 
        );
    result_force = add( result_force, scale_vec( force_x, vec3( 1, 0, 0 ) ) );
    var force_y = this.repulsion_const * this.wall_weight 
      * ( 1 / Math.pow( ( thisObj.position[1] - this.y_min ), 2 ) 
        - 1 / Math.pow( ( this.y_max - thisObj.position[1] ), 2 ) 
        );
    result_force = add( result_force, scale_vec( force_y, vec3( 0, 1, 0 ) ) );
    var force_z = this.repulsion_const * this.wall_weight 
      * ( 1 / Math.pow( ( thisObj.position[2] - this.z_min ), 2 ) 
        - 1 / Math.pow( ( this.z_max - thisObj.position[2] ), 2 ) 
        );
    result_force = add( result_force, scale_vec( force_z, vec3( 0, 0, 1 ) ) );
    thisObj.accel = scale_vec( 1/thisObj.weight, result_force ); 
  },
  'calc_velocity': function(obj, time_delta) {
    obj.velocity = add( obj.velocity, scale_vec( time_delta * this.time_factor, obj.accel ) );
    if( ! obj.y_axis_enabled ) {
      obj.velocity[1] = 0;
    }
    var scaler_v = length(obj.velocity);
    if (this.min_speed && scaler_v < this.min_speed) {
      this.velocity = scale_vec( this.min_speed, normalize( obj.velocity ) );
    }
    if (this.max_speed && scaler_v > this.max_speed) {
      this.velocity = scale_vec( this.max_speed, normalize( obj.velocity ) );
    }
  },
  'calc_location': function(obj, time_delta) {
    var p_y = obj.position[1];
    obj.position = add( obj.position, scale_vec( time_delta * this.time_factor, obj.velocity ) );
    if( ! obj.y_axis_enabled ) {
      obj.position[1] = p_y;
    }
  },
  'calc_animation_step': function(obj, time_delta) {
    obj.animation_step += obj.animation_factor * time_delta * length( obj.velocity );
  },
} );

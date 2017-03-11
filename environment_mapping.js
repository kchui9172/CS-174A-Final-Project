Declare_Any_Class( "Environment_Mapping",  // An example of a displayable object that our class Canvas_Manager can manage.  This one draws the scene's 3D shapes.
  { 'construct': function( context )
      { this.graphics_state  = context.shared_scratchpad.graphics_state;
        this.shared_scratchpad    = context.shared_scratchpad;

        //Load animal models
        shapes_in_use.model_fox       = new ModelFox();
        shapes_in_use.model_bear       = new ModelBear();
        shapes_in_use.model_eagle       = new ModelEagle();
        shapes_in_use.model_horse       = new ModelHorse();
        shapes_in_use.model_lion       = new ModelLion();
        shapes_in_use.model_parrot       = new ModelParrot();

        //Load faces for environment mapping cube 
        shapes_in_use["face"] = new Square();
        //load door object
        shapes_in_use["door"] = new Cube();
        this.graphics_state.lights = [ new Light( vec4( 0, 0, 0, 1 ), Color( 0, 0, 0, 1 ), 100000000)];
        scene_param = {
          x_min: -100,
          x_max: 100,
          y_min: 0,
          y_max: 100,
          z_min: -100,
          z_max: 100,
          min_speed: 10,
          max_speed: 100,
        };
        var scene_manager = new Scene_Manager(scene_param);
        this.last_t = 0;
        scene_manager.register_shape(shapes_in_use.model_horse, 'horse1', vec3(-10, -12, -40), 1/60, 100, 4);
        scene_manager.register_shape(shapes_in_use.model_horse, 'horse2', vec3(10, -12, -40), 1/60, 100, 4);
        scene_manager.register_shape(shapes_in_use.model_horse, 'horse3', vec3(10, -12, -20), 1/60, 100, 4);
        scene_manager.register_shape(shapes_in_use.model_horse, 'horse4', vec3(-10, -12, -20), 1/60, 100, 4);
        scene_manager.register_shape(shapes_in_use.model_horse, 'horse5', vec3(-10, -12, 20), 1/60, 100, 4);
        scene_manager.register_shape(shapes_in_use.model_horse, 'horse6', vec3(10, -12, 20), 1/60, 100, 4);
        scene_manager.register_shape(shapes_in_use.model_horse, 'horse7', vec3(10, -12, 40), 1/60, 100, 4);
        scene_manager.register_shape(shapes_in_use.model_horse, 'horse8', vec3(-10, -12, 40), 1/60, 100, 4);
        this.scene_manager = scene_manager;
      },
    'init_keys': function( controls )   // init_keys():  Define any extra keyboard shortcuts here
      {
        controls.add( "ALT+g", this, function() { this.shared_scratchpad.graphics_state.gouraud       ^= 1; } );   // Make the keyboard toggle some
        controls.add( "ALT+n", this, function() { this.shared_scratchpad.graphics_state.color_normals ^= 1; } );   // GPU flags on and off.
        controls.add( "ALT+a", this, function() { this.shared_scratchpad.animate                      ^= 1; } );
      },
    'update_strings': function( user_interface_string_manager )       // Strings that this displayable object (Animation) contributes to the UI:
      {
        user_interface_string_manager.string_map["time"]    = "Animation Time: " + Math.round( this.shared_scratchpad.graphics_state.animation_time )/1000 + "s";
        user_interface_string_manager.string_map["animate"] = "Animation " + (this.shared_scratchpad.animate ? "on" : "off") ;
      },
    'display': function(time)
      {
        var model_transform = mat4(); 
        shaders_in_use[ "Default" ].activate();

        var faceTextures1 = ["pics/negy1.jpg","pics/posy1.jpg","pics/posx1.jpg","pics/negx1.jpg","pics/posz1.jpg","pics/negz1.jpg"];
        var faceTextures2 = ["/pics/negy2.jpg","/pics/posy2.jpg","/pics/posx2.jpg","/pics/negx2.jpg","/pics/posz2.jpg","/pics/negz2.jpg"];
        var faceTextures3 = ["/pics/negy3.jpg","/pics/posy3.jpg","/pics/posx3.jpg","/pics/negx3.jpg","/pics/posz3.jpg","/pics/negz3.jpg"];
        
        var purplePlastic = new Material( Color( .9,.5,.9,1 ), .9, .4, .8, 40 );

        //Set environment mapping
        for (var i = 0; i < 3; i++){
          for (var j = 0; j < 2; j++){
            if (this.shared_scratchpad.worldNum == 2){
              var faceImage = new Material( Color( 0,0,0,1), 1, 0, 0, 0, faceTextures2[(i*2)+j]);
            }
            else if (this.shared_scratchpad.worldNum == 3){
              var faceImage = new Material( Color( 0,0,0,1), 1, 0, 0, 0, faceTextures3[(i*2)+j]);
            }
            else{
              var faceImage = new Material( Color( 0,0,0,1), 1, 0, 0, 0, faceTextures1[(i*2)+j]);                 
            }
                         
            var square_transform = mult( rotation( i == 0 ? 90 : 0, vec3( 100, 0, 0 ) ), rotation( 180 * j - ( i == 1 ? 90 : 0 ), vec3( 0, 100, 0 ) ) );
            square_transform = mult( square_transform, translation(0, 0, 100) );
            shapes_in_use.face.draw(this.graphics_state, square_transform, faceImage);               
          }
        }

        //draw door
        var doorMaterial = new Material( Color (0,0,0,1), 1,0,0,0, "door.png");
        model_transform = mat4();
        model_transform = mult( mult( model_transform, translation( -45, 0, -90 ) ), scale(10,20,.2));
        shapes_in_use.door.draw(this.graphics_state, model_transform, doorMaterial);


        //Draw animals, different depending on world
        var t = this.graphics_state.animation_time/1000, light_orbit = [ Math.cos(t), Math.sin(t) ];

        if (this.shared_scratchpad.worldNum == 1){
          this.scene_manager.elaps_time( t - this.last_t );
          var objs = this.scene_manager.get_shape_transforms();
          for (obj of objs) {
            obj.shape.set_step(obj.animation_step);
            obj.shape.draw( this.graphics_state, obj.transform, purplePlastic );
          }

        }
        else if (this.shared_scratchpad.worldNum == 2){ //want: elk, moose, bear, and fox
          model_transform = mat4();
          model_transform = mult( mult( model_transform, translation( 10, -12, -80 ) ), scale(1/90, 1/90, 1/90));
          shapes_in_use.model_fox.set_step( t * 8 );
          shapes_in_use.model_fox       .draw( this.graphics_state, model_transform, purplePlastic );

          model_transform = mat4();
          model_transform = mult( mult( model_transform, translation( -90, -12, -30 ) ), scale(1/80, 1/80, 1/80));
          shapes_in_use.model_bear.set_step( t * 1 );
          shapes_in_use.model_bear       .draw( this.graphics_state, model_transform, purplePlastic );
        }
        else{ //want: eagle, owl, raven
          model_transform = mat4();
          model_transform = mult( mult( model_transform, translation( -10, 40, -80 ) ), scale(1/100, 1/100, 1/100));
          shapes_in_use.model_eagle.set_step( t * 4 );
          shapes_in_use.model_eagle       .draw( this.graphics_state, model_transform, purplePlastic );

          model_transform = mat4();
          model_transform = mult( mult( model_transform, translation( -30, -12, -60 ) ), scale(1/60, 1/60, 1/60));
          shapes_in_use.model_lion.set_step( t * 4 );
          shapes_in_use.model_lion       .draw( this.graphics_state, model_transform, purplePlastic );
        }
        this.last_t = t;

      }
  }, Animation );

Declare_Any_Class( "Environment_Mapping",  // An example of a displayable object that our class Canvas_Manager can manage.  This one draws the scene's 3D shapes.
  { 'construct': function( context )
      { this.graphics_state  = context.shared_scratchpad.graphics_state;
        this.shared_scratchpad    = context.shared_scratchpad;
        shapes_in_use["face"] = new Square();
        shapes_in_use.model_fox       = new ModelFox();
        shapes_in_use.model_bear       = new ModelBear();
        shapes_in_use["door"] = new Square1();
        this.graphics_state.lights = [ new Light( vec4( 0, 0, 0, 1 ), Color( 0, 0, 0, 1 ), 100000000)];
      },
    'init_keys': function( controls )   // init_keys():  Define any extra keyboard shortcuts here
      {
        controls.add( "ALT+g", this, function() { this.shared_scratchpad.graphics_state.gouraud       ^= 1; } );   // Make the keyboard toggle some
        controls.add( "ALT+n", this, function() { this.shared_scratchpad.graphics_state.color_normals ^= 1; } );   // GPU flags on and off.
        controls.add( "ALT+a", this, function() { this.shared_scratchpad.animate                      ^= 1; } );
        //console.log("mew: ",this.shared_scratchpad);
      },
    'update_strings': function( user_interface_string_manager )       // Strings that this displayable object (Animation) contributes to the UI:
      {
        user_interface_string_manager.string_map["time"]    = "Animation Time: " + Math.round( this.shared_scratchpad.graphics_state.animation_time )/1000 + "s";
        user_interface_string_manager.string_map["animate"] = "Animation " + (this.shared_scratchpad.animate ? "on" : "off") ;
      },
    'display': function(time)
      {

        console.log("meow:", this.shared_scratchpad.cameraPos);
        var model_transform = mat4(); 
        shaders_in_use[ "Default" ].activate();

        var faceTextures = ["negy.jpg","posy.jpg","posx.jpg","negx.jpg","posz.jpg","negz.jpg"];
        
        var purplePlastic = new Material( Color( .9,.5,.9,1 ), .9, .4, .8, 40 );
        var standardMat = new Material (Color(1,0,0,1), .9,.4,.8,40);

        //Set environment mapping
        for (var i = 0; i < 3; i++){
          for (var j = 0; j < 2; j++){
            if (this.shared_scratchpad.worldNum == 2){
              var faceImage = purplePlastic;
            }
            else{
              var faceImage = new Material( Color( 0,0,0,1), 1, 0, 0, 0, faceTextures[(i*2)+j]);                 
            }
    
                     
            var square_transform = mult( rotation( i == 0 ? 90 : 0, vec3( 100, 0, 0 ) ), rotation( 180 * j - ( i == 1 ? 90 : 0 ), vec3( 0, 100, 0 ) ) );
            square_transform = mult( square_transform, translation(0, 0, 100) );
            //square_transform = mult( square_transform, translation(0, 0, 1) );
            shapes_in_use.face.draw(this.graphics_state, square_transform, faceImage);               
          }
        }

        model_transform = mat4();
        model_transform = mult( mult( model_transform, translation( -45, 0, -90 ) ), scale(10,10,10));
        shapes_in_use.door.draw(this.graphics_state, model_transform, standardMat);

        var t = this.graphics_state.animation_time/1000, light_orbit = [ Math.cos(t), Math.sin(t) ];

        //Draw animals
        model_transform = mat4();
        model_transform = mult( mult( model_transform, translation( 10, -12, -80 ) ), scale(1/90, 1/90, 1/90));
        shapes_in_use.model_fox.set_step( t * 8 );
        shapes_in_use.model_fox       .draw( this.graphics_state, model_transform, purplePlastic );

        model_transform = mat4();
        model_transform = mult( mult( model_transform, translation( -90, -12, -30 ) ), scale(1/80, 1/80, 1/80));
        shapes_in_use.model_bear.set_step( t * 1 );
        shapes_in_use.model_bear       .draw( this.graphics_state, model_transform, purplePlastic );



      }
  }, Animation );

Declare_Any_Class( "Environment_Mapping",  // An example of a displayable object that our class Canvas_Manager can manage.  This one draws the scene's 3D shapes.
  { 'construct': function( context )
      { this.graphics_state  = context.shared_scratchpad.graphics_state;
        shapes_in_use["face"] = new Square();
      },

    'display': function(time)
      {
        var model_transform = mat4(); 
        shaders_in_use[ "Default" ].activate();

        this.graphics_state.lights = [ new Light( vec4( 0 % 7 - 3, 0 % 6 - 3, 0 % 5 - 3, 1 ), Color( 1, 0, 0, 1 ), 100000000 ),
                                         new Light( vec4( 0 % 6 - 3, 0 % 5 - 3, 0 % 7 - 3, 1 ), Color( 0, 1, 0, 1 ), 100000000 ) ];

        var faceTextures = ["negy.jpg","posy.jpg","posx.jpg","negx.jpg","posz.jpg","negz.jpg"];
        
        var random_material = new Material( Color( 0,0,0,1), 1, 0, 0, 0, faceTextures[0]);


        for (var i = 0; i < 3; i++){
          for (var j = 0; j < 2; j++){
            var faceImage = new Material( Color( 0,0,0,1), 1, 0, 0, 0, faceTextures[(i*2)+j]);              
            var square_transform = mult( rotation( i == 0 ? 90 : 0, vec3( 1, 0, 0 ) ), rotation( 180 * j - ( i == 1 ? 90 : 0 ), vec3( 0, 1, 0 ) ) );
            square_transform = mult( square_transform, translation(0, 0, 100) );
            shapes_in_use.face.draw(this.graphics_state, square_transform, faceImage); 
          }
        }
 
      }
  }, Animation );
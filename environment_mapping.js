Declare_Any_Class( "Environment_Mapping",  // An example of a displayable object that our class Canvas_Manager can manage.  This one draws the scene's 3D shapes.
  { 'construct': function( context )
      { this.graphics_state  = context.shared_scratchpad.graphics_state;
        shapes_in_use[ "box"  ] = new Cube();
        //maybe better to create 6 squares so can map different textures;

      },
    'display': function(time)
      {
        var model_transform = mat4(); 
        shaders_in_use[ "Default" ].activate();

        this.graphics_state.lights = [ new Light( vec4( 0 % 7 - 3, 0 % 6 - 3, 0 % 5 - 3, 1 ), Color( 1, 0, 0, 1 ), 100000000 ),
                                         new Light( vec4( 0 % 6 - 3, 0 % 5 - 3, 0 % 7 - 3, 1 ), Color( 0, 1, 0, 1 ), 100000000 ) ];
        
        var random_material = new Material( Color( 0,0,0,1), 1, 0, 0, 0, "negx.jpg");
        shapes_in_use.box.draw( this.graphics_state, model_transform, random_material);
 
      }
  }, Animation );
// UCLA's Graphics Example Code (Javascript and C++ translations available), by Garett Ridge for CS174a.
// example-displayables.js - The subclass definitions here each describe different independent animation processes that you want to fire off each frame, by defining a display
// event and how to react to key and mouse input events.  Make one or two of your own subclasses, and fill them in with all your shape drawing calls and any extra key / mouse controls.


Declare_Any_Class( "Example_Camera",     // An example of a displayable object that our class Canvas_Manager can manage.  Adds both first-person and
  { 'construct': function( context )     // third-person style camera matrix controls to the canvas.
      { // 1st parameter below is our starting camera matrix.  2nd is the projection:  The matrix that determines how depth is treated.  It projects 3D points onto a plane.
        context.shared_scratchpad.graphics_state = new Graphics_State( translation(0, 0, 0), perspective(90, canvas.width/canvas.height, .1, 1000), 0 );
        this.define_data_members( { graphics_state: context.shared_scratchpad.graphics_state, thrust: vec3(), origin: vec3( 0, 0, 0 ), looking: false, scratchPad: context.shared_scratchpad, rotationMatrix: mat4() } );

        // *** Mouse controls: ***
        // this.mouse = { "from_center": vec2() };
        console.log("camera transform:",this.graphics_state.camera_transform);
        console.log("rotation matrix:", this.rotationMatrix);
      },
    'init_keys': function( controls )   // init_keys():  Define any extra keyboard shortcuts here
      {
        controls.add( "Space", this, 
          function() 
          { 
            if (this.check_bounds(2)){
              this.thrust[1] = -1;
            }else{
              this.thrust[1] = 0;
            }
          } );     

        controls.add( "Space", this, function() { this.thrust[1] =  0; }, {'type':'keyup'} );

        controls.add( "z",     this, 
          function() 
          { 
            if (this.check_bounds(-2)){
              this.thrust[1] = 1;
            }else{
              this.thrust[1] = 0;
            }
          } );     

        controls.add( "z",     this, function() { this.thrust[1] =  0; }, {'type':'keyup'} );
        controls.add( "r",     this, function() { this.graphics_state.camera_transform = mat4(); this.cameraPos = [0,0,0,1];} );

        controls.add( "w",     this, 
          function() { 
            if (this.check_bounds(-3)){
              this.thrust[2] = 1;
            }else{
              this.thrust[2] = 0;
            }
          } );     
        controls.add( "w",     this, function() { this.thrust[2] =  0; }, {'type':'keyup'} );

        controls.add( "a",     this, 
          function() { 
            if (this.check_bounds(-1)){
              this.thrust[0] = 1;
            }else{
              this.thrust[0] = 0;
            }
          } );     

        controls.add( "a",     this, function() { this.thrust[0] =  0; }, {'type':'keyup'} );

        controls.add( "s",     this, 
          function() { 
            if (this.check_bounds(3)){
              this.thrust[2] = -1;
            }else{
              this.thrust[2] = 0;
            }
          } );    
        controls.add( "s",     this, function() { this.thrust[2] =  0; }, {'type':'keyup'} );

        controls.add( "d",     this, 
          function() {
            if (this.check_bounds(1)){
              this.thrust[0] = -1;
            }else{
              this.thrust[0] = 0;
            }
          } );     

        controls.add( "d",     this, function() { this.thrust[0] =  0; }, {'type':'keyup'} );


        //Added control to rotate camera direction
        controls.add( "left",     this, function() { console.log("left"); this.graphics_state.camera_transform = mult( rotation( 1, 0, -1, 0 ), this.graphics_state.camera_transform ); this.rotationMatrix = mult(rotation(1,0,-1,0), this.rotationMatrix); } );
        controls.add( "right",     this, function() { console.log("right"); this.graphics_state.camera_transform = mult( rotation( 1, 0, 1, 0 ), this.graphics_state.camera_transform ); this.rotationMatrix = mult(rotation(1,0,1,0), this.rotationMatrix);} );
        controls.add( "up",     this, function() { console.log("up"); this.graphics_state.camera_transform = mult( rotation( 1, -1, 0, 0 ), this.graphics_state.camera_transform ); this.rotationMatrix = mult(rotation(1,-1,0,0), this.rotationMatrix);} );
        controls.add( "down",     this, function() { console.log("down"); this.graphics_state.camera_transform = mult( rotation( 1, 1, 0, 0 ), this.graphics_state.camera_transform ); this.rotationMatrix = mult(rotation(1,1,0,0), this.rotationMatrix);} );

      },
      //left = -1, right = 1, up = 2, down = -2, in = 3, out= -3

    'check_bounds' : function(dir){
      console.log("checking bounds");

      //calculate current position of camera
      var C_inv1 = inverse( this.graphics_state.camera_transform );
      var pos1 = mult_vec( C_inv1, vec4( 0, 0, 0, 1 ) );
      console.log("cur pos:", pos1);

      //create potential thrust vector
      var newThrust = vec3();
      if (dir < 0){
        var move = 1;
      }else{
        var move = -1;
      }
      newThrust[Math.abs(dir) - 1 ] = move;
      console.log("new thrust:", newThrust);

      //calculate new position with potential thrust vector
      var x = mult(translation(scale_vec(1.0,newThrust)), this.graphics_state.camera_transform);
      var C_inv = inverse(x);
      var pos = mult_vec(C_inv, vec4(0,0,0,1));
      this.scratchPad.cameraPos = pos;
      console.log("pos:" , pos);

      //if new position is out of range, don't move (return false)
      if (pos[0] > 80 || pos[0] < -80 || pos[1] < 0 || pos[1] > 70 || pos[2] < -90 || pos[2] > 90){
        console.log("can't leave cube");
        return false;
      }
      else{
        return true;
      }
    },
    'update_strings': function( user_interface_string_manager )       // Strings that this displayable object (Animation) contributes to the UI:
      { var C_inv = inverse( this.graphics_state.camera_transform ), pos = mult_vec( C_inv, vec4( 0, 0, 0, 1 ) ),
                                                                  z_axis = mult_vec( C_inv, vec4( 0, 0, 1, 0 ) );                                                                 
        user_interface_string_manager.string_map["origin" ] = "Center of rotation: " + this.origin[0].toFixed(0) + ", " + this.origin[1].toFixed(0) + ", " + this.origin[2].toFixed(0);                                                       
        user_interface_string_manager.string_map["cam_pos"] = "Cam Position: " + pos[0].toFixed(2) + ", " + pos[1].toFixed(2) + ", " + pos[2].toFixed(2);    // The below is affected by left hand rule:
        user_interface_string_manager.string_map["facing" ] = "Facing: "       + ( ( z_axis[0] > 0 ? "West " : "East ") + ( z_axis[1] > 0 ? "Down " : "Up " ) + ( z_axis[2] > 0 ? "North" : "South" ) );
      },
    'display': function( time )
      { 
        if (this.scratchPad.cameraPos[2] <= -80 && this.scratchPad.cameraPos[0] <= -40 && this.scratchPad.cameraPos[0] >= -50 && this.scratchPad.cameraPos[1] <= 7 && this.scratchPad.cameraPos[1] >= 0){
          console.log("changing worlds");
          this.scratchPad.worldNum = (this.scratchPad.worldNum % 3) + 1;
          console.log(this.scratchPad.worldNum);
          this.scratchPad.cameraPos = [0,0,0,1];
          this.graphics_state.camera_transform = mat4();
        }
        var meters_per_frame  =   .01 * this.graphics_state.animation_delta_time;

        this.graphics_state.camera_transform = mult( translation( scale_vec( meters_per_frame, this.thrust ) ), this.graphics_state.camera_transform );
      }
  }, Animation );


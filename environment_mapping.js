Declare_Any_Class( "Environment_Mapping",  // An example of a displayable object that our class Canvas_Manager can manage.  This one draws the scene's 3D shapes.
  { 'construct': function( context )
      { this.graphics_state  = context.shared_scratchpad.graphics_state;
        this.shared_scratchpad    = context.shared_scratchpad;

        //Load animal models

        shapes_in_use["face"] = new Square();
        shapes_in_use["door"] = new Cube();
        this.graphics_state.lights = [ new Light( vec4( 0, 0, 0, 1 ), Color( 0, 0, 0, 1 ), 100000000)];

        shapes_in_use.model_fox       = new ModelFox();
        shapes_in_use.model_bear       = new ModelBear();
        shapes_in_use.model_eagle       = new ModelEagle();
        shapes_in_use.model_horse       = new ModelHorse();
        shapes_in_use.model_lion       = new ModelLion();
        shapes_in_use.model_parrot       = new ModelParrot();
        shapes_in_use.model_goat       = new ModelGoat();
        shapes_in_use.model_wolf       = new ModelWolf();
        shapes_in_use.model_raven       = new ModelRaven();
        shapes_in_use.model_deer       = new ModelDeer();

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
          min_speed: 1,
          max_speed: 5,
          repulsion_const: 80,
          wall_weight: 200,
          time_factor: 10 
        };
        var scene_manager1 = new Scene_Manager(scene_param);
        var scene_manager2 = new Scene_Manager(scene_param);
        var scene_manager3 = new Scene_Manager(scene_param);
        this.last_t = 0;
        scene_manager1.register_shape(shapes_in_use.model_horse, 'horse', 'horse1', vec3(-10, -12, -40), 1/60, 50, 4);
        scene_manager1.register_shape(shapes_in_use.model_horse, 'horse', 'horse2', vec3(-10, -12, -20), 1/60, 50, 4);
        scene_manager1.register_shape(shapes_in_use.model_goat, 'goat', 'goat1', vec3(20, -15, -20), 1/10, 30, 5);
        scene_manager1.register_shape(shapes_in_use.model_goat, 'goat', 'goat2', vec3(20, -15, -40), 1/10, 30, 5);
        scene_manager1.register_shape(shapes_in_use.model_goat, 'goat', 'goat3', vec3(-40, -15, 30), 1/10, 30, 5);
        scene_manager1.register_shape(shapes_in_use.model_raven, 'raven', 'raven1', vec3(-20, 40, -40), 1/8, 30, 5, true);
        scene_manager1.register_shape(shapes_in_use.model_raven, 'raven', 'raven2', vec3(-10, 40, -40), 1/8, 30, 5, true);
        scene_manager1.register_shape(shapes_in_use.model_raven, 'raven', 'raven3', vec3(-30, 40, 40), 1/8, 30, 5, true);
        scene_manager1.register_shape(shapes_in_use.model_raven, 'raven', 'raven4', vec3(10, 40, -20), 1/8, 30, 5, true);
        scene_manager1.register_shape(shapes_in_use.model_raven, 'raven', 'raven5', vec3(-10, 40, -10), 1/8, 30, 5, true);

        scene_manager2.register_shape(shapes_in_use.model_bear, 'bear', 'bear1', vec3(40, -14, 30), 1/60, 50, 1);
        scene_manager2.register_shape(shapes_in_use.model_lion, 'lion', 'lion1', vec3(30, -12, 60), 1/70, 40, 4);
        scene_manager2.register_shape(shapes_in_use.model_lion, 'lion', 'lion2', vec3(-30, -12, -60), 1/70, 40, 4);
        scene_manager2.register_shape(shapes_in_use.model_parrot, 'parrot', 'parrot1', vec3(-10, 40, -60), 1/10, 10, 4, true);
        scene_manager2.register_shape(shapes_in_use.model_parrot, 'parrot', 'parrot2', vec3(40, 40, 50), 1/10, 10, 4, true);
        scene_manager2.register_shape(shapes_in_use.model_parrot, 'parrot', 'parrot3', vec3(0, 40, 10), 1/10, 10, 4, true);
        scene_manager2.register_shape(shapes_in_use.model_wolf, 'wolf', 'wolf1', vec3(20, -10, -40), 1/10, 30, 5);
        scene_manager2.register_shape(shapes_in_use.model_wolf, 'wolf', 'wolf2', vec3(-20, -10, 10), 1/10, 30, 5);

        scene_manager3.register_shape(shapes_in_use.model_eagle, 'eagle', 'eagle1', vec3(-20, 40, -40), 1/100, 30, 4, true);
        scene_manager3.register_shape(shapes_in_use.model_eagle, 'eagle', 'eagle2', vec3(20, 40, -10), 1/100, 30, 4, true);
        scene_manager3.register_shape(shapes_in_use.model_deer, 'deer', 'deer1', vec3(0, -12, 0), 1/15, 50, 5);
        scene_manager3.register_shape(shapes_in_use.model_deer, 'deer', 'deer2', vec3(-30, -12, -10), 1/15, 50, 5);
        scene_manager3.register_shape(shapes_in_use.model_deer, 'deer', 'deer3', vec3(10, -12, 10), 1/15, 50, 5);
        scene_manager3.register_shape(shapes_in_use.model_deer, 'deer', 'deer4', vec3(40, -12, 0), 1/15, 50, 5);
        scene_manager3.register_shape(shapes_in_use.model_fox, 'fox', 'fox1', vec3(10, -12, 80), 1/90, 20, 4);
        scene_manager3.register_shape(shapes_in_use.model_fox, 'fox', 'fox2', vec3(-10, -12, 80), 1/90, 20, 4);
      

        this.scene_managers = [];
        this.scene_managers.push(scene_manager1);
        this.scene_managers.push(scene_manager2);
        this.scene_managers.push(scene_manager3);

        this.sound_managers = [];
        var sound_manager1 = new Sound_Manager(scene_manager1.get_shape_positions());
        var sound_manager2 = new Sound_Manager(scene_manager2.get_shape_positions());
        var sound_manager3 = new Sound_Manager(scene_manager3.get_shape_positions());
        this.sound_managers.push(sound_manager1);
        this.sound_managers.push(sound_manager2);
        this.sound_managers.push(sound_manager3);

        this.last_scene = 0;
        this.last_background_sound = null;

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
        var faceTextures2 = ["pics/negy2.jpg","pics/posy2.jpg","pics/posx2.jpg","pics/negx2.jpg","pics/posz2.jpg","pics/negz2.jpg"];
        var faceTextures3 = ["pics/negy3.jpg","pics/posy3.jpg","pics/posx3.jpg","pics/negx3.jpg","pics/posz3.jpg","pics/negz3.jpg"];

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

        // Camera position extraction
        var C_inv = inverse(this.graphics_state.camera_transform);
        var cam = mult_vec(C_inv, vec4(0,0,0,1));

        var doorMaterial = new Material( Color (0,0,0,1), 1,0,0,0, "door.png");

        //draw door
        var doorMaterial = new Material( Color (0,0,0,1), 1,0,0,0, "door.png");
        model_transform = mat4();
        model_transform = mult( mult( model_transform, translation( -45, 0, -90 ) ), scale(10,20,.2));
        shapes_in_use.door.draw(this.graphics_state, model_transform, doorMaterial);


        //Draw animals, different depending on world
        var t = this.graphics_state.animation_time/1000, light_orbit = [ Math.cos(t), Math.sin(t) ];

        //Draw animals

        var scene = this.shared_scratchpad.worldNum - 1;
        var cam_blocker = {position: vec3(cam[0], cam[1], cam[2]), weight: 50};
        this.scene_managers[scene].set_blockers([cam_blocker]);
        this.scene_managers[scene].elaps_time( t - this.last_t );
        var objs = this.scene_managers[scene].get_shape_transforms();
        for (obj of objs) {
          obj.shape.set_step(obj.animation_step);
          obj.shape.draw( this.graphics_state, obj.transform, purplePlastic );
          processSound(obj.type, obj.id, cam, obj.transform, this.sound_managers[scene], this.shared_scratchpad.soundBuffer, this.shared_scratchpad.soundContext);
        }
        this.last_t = t;

        if (this.last_scene != scene) {
            this.last_scene = scene;
            if (this.last_background_sound != null) {
                this.last_background_sound.stop();    
            } else {
                this.shared_scratchpad.soundBuffer.initial_background.stop();
            }

            this.last_background_sound = playSound(this.shared_scratchpad.soundContext, this.shared_scratchpad.soundBuffer.bufferList, scene);
        }
        
      }
  }, Animation );

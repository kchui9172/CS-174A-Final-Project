# Zootopia

CS 174a Final Project: Team 7
Authors:  Kristen Chui - kwchui@g.ucla.edu
          Libin Bai
          Mushi Zhou - zmushi@ucla.edu

# Introduction
The primary idea of our project was to simulate a virtual walk-around of a 3D world filled with animals complete with features such as environment mapping, sound, collision avoidance, modeling and animation. These topics will be discussed in further detail below. The user takes on the viewpoint of the camera and can manipulate the viewing position using w,a,s,d and the arrow keys to observe the surroundings. Moving through the door will transport the user into a new environment with different animals and sounds.

# Environment Map
Environment mapping was implemented using the cube mapping technique introduced in lecture. Six images were rendered and mapped to the inside of the cube in which the camera was located. When switching between worlds, different images were mapped depending on the worldNum variable stored in the Canvas_Manager's shared scratchpad. 

# Sound
- The sound is been played for all scenes and all animals classes. 
- Each scene has a unique background music and each animial class has its corresponding sound from that type of animial.
- The sound for each type of animal class is been played when there is at least one animal model of that class is within a pre-defined distance relative to the current camera position. The control distance is defined in sound_manager.js.
- All sounds are loaded whe program initilizes in index.html. 
- All sounds are been updated during the display function in environment_mapping along with models updates. 
- The mechanism to control sound is having all sounds been played and looping forever. The gain node is used to disable and enable the sound to be audiable. This speeds up the processing of sound buffers to catch up with scene updates.
- The gain volume of each sound is manually normilzed and the playing gain values of each sound is stored in an array in the sound manager class.
- souce files are : sound_buffer_loader.js[ref1], sound_utilities.js, sound_mamager.js.


# Collision Avoidance Engine
Source Code: `scene_manager.js`

The collision avoidance engine is adapted from Netwon's law of universal gravitation [ref2] but with direction reversed. So each objects will apply an repulsion force to other objects in the scene and change each other's direction. Each face of the container cube also apply force to objects in the scene when they approach the cube boundry. Each object in the scene is assigned a weight(mass), an initial location and a random initial velocity. Addidional properties like scale and animation_factor helps adjust model to the world coordinate and apply proper animation. The model transformation matrix is calculated using object's velocity and position. Position, velocity and acceleration are updated every frame.

### Scene_Manager Properties
- x_min, x_max, y_min, y_max, z_min, z_max: scaler, define boundry of the scene
- min_speed: scaler, speed lower bound to keep objects moving
- max_speed: scaler, speed upper bound to prevent objects going wild
- objects: objects[], list of movable objects registered with scene
- blockers: objects[], list of stationary objects that doesn't move but affects movement of other objects
- repulsion_const: scaler, constant for force calculation
- wall_weight: scaler, amount of force each wall applies to objects in the scene
- time_factor: scaler, constant factor scaled to time, speed up or slow down the emulation

### Object Properties
- type: string, type of the object, all objects with the same type should share the same model
- id: string, unique id for each object
- model: ModelBase, Model conaining all vertices and render method
- weight: scaler, How much force this object applies to other objects, and how much acceleration as a result of force from other objects
- acceleration: vec3, delta velocity per time step
- velocity: vec3, delta position per time step
- position: vec3, center position in world coordinate
- scale: scaler, scale of the model when translating to world coordinate
- animation_factor: scaler, velocity impact on model's animation speed.
- animation_step: scaler, At which step should the animation of the model be rendered, updated by velocity and time
- y_axis_enabled: bool, should the object experience force in y direction. If disabled, model will stay at same hight.

### Time Step Calculation
- location += velocity * time_delta * time_factor
- velocity += acceleration * time_delta * time_factor
- acceleration = force / weight
- force = sum ( force_by_other_objects, force_by_other_blockers, force_by_walls )
- force_by_object = repulsion_const * weight_of_object / |distance_delta|^2
- force_by_wall = repulsion_const * wall_weight / distance_to_wall^2

# Models and Animation
Animal models and animation (everything in models folder except `model_base.js`) come from ROME project "3 Dreams of Black" [ref3]. Model loader (`rome_model_loader.js`) comes from www.ibiblio.org [ref4] with minor adjustments. Neither the models nor the loader supports texture.

Each model has several animation key frames. Every displayed frame we load 2 key frames to GLSL and apply a morphing factor between two key frames. Morphing factor is calculated with animation_step and total number of key frames.

# Reference

[1]https://www.html5rocks.com/en/tutorials/webaudio/intro/

[2]https://en.wikipedia.org/wiki/Newton's_law_of_universal_gravitation

[3]https://github.com/dataarts/3-dreams-of-black/tree/master/deploy/asset_viewer/files/models/animals

[4]https://www.ibiblio.org/e-notes/webgl/models.htm 




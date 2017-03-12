# Zootopia

CS 174a Final Project: Team 7

# Introduction
The primary idea of our project was to simulate a virtual walk-around of a 3D world filled with animals complete with features such as environment mapping, sound, collision avoidance, modeling and animation. These topics will be discussed in further detail below. The user takes on the viewpoint of the camera and can manipulate the viewing position using w,a,s,d and the arrow keys to observe the surroundings. Moving through the door will transport the user into a new environment with different animals and sounds.

# Environment Map
Environment mapping was implemented using the cube mapping technique introduced in lecture. Six images were rendered and mapped to the inside of the cube in which the camera was located. When switching between worlds, different images were mapped depending on the worldNum variable stored in the Canvas_Manager's shared scratchpad. 

# Sound

# Collision Avoidance Engine
Source Code: scene_manager.js

The collision avoidance engine is adapted from Netwon's law of universal gravitation. Each object in the scene is assigned a weight(mass), an initial location and a random initial velocity.

## Scene_Manager Properties
```
```

## Object Properties
```
type: type of the object, all objects with the same type should share the same model
id: unique id for each object
model: Model conaining all vertices and render method
weight: How much force this object applies to other objects, and how much acceleration as a result of force from other objects
acceleration: 
velocity:
position:
scale: Scale of the model when translating to world coordinate
animation_step: At which step should the animation of the model be rendered, updated by velocity and time
y_axis_enabled: should the object experience force in y direction. If disabled, model will stay at same hight.
```

## Time Step Calculation

# Models and Animation

# Reference
https://en.wikipedia.org/wiki/Newton's_law_of_universal_gravitation
https://github.com/dataarts/3-dreams-of-black/tree/master/deploy/asset_viewer/files/models/animals
https://www.ibiblio.org/e-notes/webgl/models.htm   animal section

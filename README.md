# Introduction

# Environment Map

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

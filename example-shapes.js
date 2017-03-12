// UCLA's Graphics Example Code (Javascript and C++ translations available), by Garett Ridge for CS174a.
// example_shapes.js is where you can define a number of objects that inherit from class Shape.  All Shapes have certain arrays.  These each manage either
// the shape's 3D vertex positions, 3D vertex normal vectors, 2D texture coordinates, or any other per-vertex quantity.  All subclasses of Shape inherit
// instantiation, any Shape subclass populates these lists in their own way, so we can use GL calls -- special kernel functions to copy each of the lists
// one-to-one into new buffers in the graphics card's memory.


// *********** SQUARE ***********
Declare_Any_Class( "Square",    // A square, demonstrating shared vertices.  On any planar surface, the interior edges don't make any important seams.
  { 'populate': function()      // In these cases there's no reason not to re-use values of the common vertices between triangles.  This makes all the
      {                         // vertex arrays (position, normals, etc) smaller and more cache friendly.
         this.positions     .push( vec3(-100,-100,0), vec3(100,-100,0), vec3(-100,100,0), vec3(100,100,0) ); // Specify the 4 vertices -- the point cloud that our Square needs.
         //this.positions     .push( vec3(-1,-1,0), vec3(1,-1,0), vec3(-1,1,0), vec3(1,1,0) );
         this.normals       .push( vec3(0,0,-100), vec3(0,0,-100), vec3(0,0,-100), vec3(0,0,-100) );     // ...
         //this.normals       .push( vec3(0,0,1), vec3(0,0,1), vec3(0,0,1), vec3(0,0,1) ); 
         this.texture_coords.push( vec2(0,0),   vec2(1,0),   vec2(0,1),   vec2(1,1)   );     // ...
         this.indices       .push( 0, 1, 2,     1, 3, 2 );                                   // Two triangles this time, indexing into four distinct vertices.
      }
  }, Shape )

Declare_Any_Class( "Square1",    // A square, demonstrating shared vertices.  On any planar surface, the interior edges don't make any important seams.
  { 'populate': function()      // In these cases there's no reason not to re-use values of the common vertices between triangles.  This makes all the
      {                         // vertex arrays (position, normals, etc) smaller and more cache friendly.
         //this.positions     .push( vec3(-100,-100,0), vec3(100,-100,0), vec3(-100,100,0), vec3(100,100,0) ); // Specify the 4 vertices -- the point cloud that our Square needs.
         this.positions     .push( vec3(-1,-1,0), vec3(1,-1,0), vec3(-1,1,0), vec3(1,1,0) );
         //this.normals       .push( vec3(0,0,-100), vec3(0,0,-100), vec3(0,0,-100), vec3(0,0,-100) );     // ...
         this.normals       .push( vec3(0,0,1), vec3(0,0,1), vec3(0,0,1), vec3(0,0,1) ); 
         this.texture_coords.push( vec2(0,0),   vec2(1,0),   vec2(0,1),   vec2(1,1)   );     // ...
         this.indices       .push( 0, 1, 2,     1, 3, 2 );                                   // Two triangles this time, indexing into four distinct vertices.
      }
  }, Shape )

Declare_Any_Class( "Cube",    // A cube inserts six square strips into its lists.
  { populate: function()  
      { for( var i = 0; i < 3; i++ )                    
          for( var j = 0; j < 2; j++ )
          { //var square_transform = mult( rotation( i == 0 ? 90 : 0, vec3( 10, 0, 0 ) ), rotation( 180 * j - ( i == 1 ? 90 : 0 ), vec3( 0, 10, 0 ) ) );
            var square_transform = mult( rotation( i == 0 ? 90 : 0, vec3( 1, 0, 0 ) ), rotation( 180 * j - ( i == 1 ? 90 : 0 ), vec3( 0, 1, 0 ) ) );
            //square_transform = mult( square_transform, translation(0, 0, 10) );
            square_transform = mult( square_transform, translation(0, 0, 1) );
            Square1.prototype.insert_transformed_copy_into( this, [], square_transform );             
          } 
      } }, Shape )

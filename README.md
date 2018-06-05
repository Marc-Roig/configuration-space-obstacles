# Configuration Space with Obstacles

For the purpose of path planning it is useful to work with the ocnfiguration space. This space transforms the common xy (2D in this case but it can be extrapolated to 3D) to the so called C-Space, where the angles of the robot are the variables of the system.

This program will be able to transform normal xy coordinates of a SCARA robot and also transform the obstacles that will be in his surroundings to the C-Space. Applying some sort of path finding algorithm such as A* the best and fast movement of the arm will be executed.

I divided the key concepts of the algorithm in various subfolders.

Topics | Summary
------------ | -------------
![polygon intersection](https://i.gyazo.com/d386f17837f0d655cceb4f24702e04a7.gif) | Polygons intersect with each other
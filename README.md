# Configuration-Space with obstacles

For the purpose of path planning it is useful to work with the configuration space. This space transforms the common xy (2D in this case but it can be extrapolated to 3D) to the so called C-Space, where the angles of the robot are the variables of the system.

This program will be able to transform normal xy coordinates of a SCARA robot and also transform the obstacles that will be in his surroundings to the C-Space. Applying some sort of path finding algorithm such as A* the fastest movement will be executed.

I divided the key concepts of the algorithm in various subfolders (click on images to see it in action).

|  Topics  | GIF |  Summary  |
| :------: | --- | :-------: |
|2. Detect point in polygon | <a href="https://marc-roig.github.io/Configuration_Space_Obstacles/2_PointInsidePolygon/"  target="_blank"> <img border="0" alt="PolygonCollision" src="https://i.gyazo.com/2223a7548d772c8a543c8f28522ab258.gif" width="200" height="225"> </a> | Ray Trace mouse to check if it is inside a drawn polygon. If ray intersects an even number of times through the polygon mouse is outside, and inside if it is odd. |
|3. Polygon collision | <a href="https://marc-roig.github.io/Configuration_Space_Obstacles/3_PolygonCollision/"  target="_blank"> <img border="0" alt="PolygonCollision" src="https://i.gyazo.com/d386f17837f0d655cceb4f24702e04a7.gif" width="200" height="225"> </a> | Polygons intersect with each other. Could have implemented sweep algorithm, but in this case it wouldn't make much of a difference. |
|4. Scara Inverse Kinematics | <a href="https://marc-roig.github.io/Configuration_Space_Obstacles/4_ScaraArm/"  target="_blank"> <img border="0" alt="PolygonCollision" src="https://i.gyazo.com/51a2de29d5d6c4ce748dcf9a76d15256.gif" width="200" height="225"> </a> | 2 DoF(degrees of freedom) scara arm follows mouse with inverse kinematics |

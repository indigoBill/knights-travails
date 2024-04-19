# knights-travails

## Project Description

The objective of this project is to build a function `knightMoves` that shows the shortest possible way to get from one square to another by outputting all squares the knight will stop on along the way.

I used an array to collect all the possible moves a knight could make from its current position on the board and created node objects to represent each spot. With that information I implemented the BFS algorithm to go through all the possible moves until the desired end position was detected. From there I used the node object's parent property to backtrack until I arrived to the knight's original position on the board. During this step the moves are collected and stored in an array which represents one of the shortest paths the knight can take.
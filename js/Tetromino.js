/**
 * Each tetromino is made of a group of 4 squares (divs).
 */

function Tetromino(tetrominoName, x, y) {
  this.tetrominoName = tetrominoName;
  this.x = x;
  this.y = y;

  /* Array of squares that conform this tetromino. See TETROMINOS */ 
  this.squares = tfBuildTetromino(this.x, this.y, this.tetrominoName);
}

/**
 *  return:
 *    true  - if the move completed
 *    false - if the move wasn't completed
 */
Tetromino.prototype.move = function(movementDirection) {
  var nextX = this.x;
  var nextY = this.y;
  switch(movementDirection) {
    case MOVEMENT_DIRECTION.LEFT:
      nextX -= 1;
      break;
    case MOVEMENT_DIRECTION.RIGHT:
      nextX += 1;
      break;
    case MOVEMENT_DIRECTION.DOWN:
      nextY += 1;
      break;
    case MOVEMENT_DIRECTION.ROTATE:
      this.rotate();
      return; 
  }
  for(var i = 0; i < this.quares.length; i++) {
    var square = squares[i];
    tfSetSquareCoordinates(square, nextX, nextY);
  }
}

/**
 * Rotation is done to the right, example:
 *
 * STRAIGHT:
 *  1111  0001
 *  0000  0001
 *  0000  0001
 *  0000  0001
 *
 *  0,0 0,2 x = y, y = x+2 
 *  0,1 1,2 x = y, y = x+2
 *  0,2 2,2 x = y, y = x+2
 *  0,3 3,2 x = y, y = x+2
 *
 * T:
 *  111  001
 *  010  011
 *  000  001
 *
 *  0,0 0,2 x = y, y = x+2 
 *  0,1 1,2 x = y, y = x+2
 *  0,2 2,2 x = y, y = x+2
 *  
 *  1,0 0,1 x = y, y = x 
 *  1,1 1,1 x = y, y = x 
 *  1,2 2,1 x = y, y = x
 *  
 *  2,0 0,0 x = y, y = x-2 
 *  2,1 1,0 x = y, y = x-2
 *  2,2 2,0 x = y, y = x-2
 *  
 */
Tetromino.prototype.rotate = function() {
  if(this.tetrominoName == TETROMINOS.SQUARE)
    return;                 /* The tetromino is a square, nothing to do here. */
  
  for(var i = 0; i < this.squares.length; i++) {
    var square = this.squares[i];
    var coordinates = tfGetSquareCoordinates(square);
    var x = coordinates[0];
    var y = coordinates[1];
    var dir = x == 2 ? -1 : 1;
    var shiftVal = x == 1 ? 0 : 2;  
    var newX = y;
    var newY = x + (shiftVal * dir);
    tfSetSquareCoordinates(square, newX, newY);
  }
}

Tetromino.prototype.getSquares = function() { return this.squares; }

/* EOF */

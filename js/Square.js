
/**
 * Build a new Square. Later on Tetrominos, tetris shapes, will be built with
 * four Squares each.
 */
function Square(x, y, tetrominoType = 'noType') {

  this.x  = x  < 0 ? 0 : x;
  this.y = y < 0 ? 0 : y;

  this.div = document.createElement('div');

  var SQUARE_CLASS_NAMES = 'square ' + tetrominoType;
  this.div.className = SQUARE_CLASS_NAMES;

  /* Positioning */
  this.div.style.left = this.x * SQUARE_SIZE + 'px';                                     
  this.div.style.top  = this.y * SQUARE_SIZE + 'px';
}

/* Square functions */

Square.prototype.getX = function() { return this.x; }

Square.prototype.getY = function() { return this.y; }

Square.prototype.getDiv = function() { return this.div; }

/* EOF */

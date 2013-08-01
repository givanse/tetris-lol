
/**
 * Build a new Square. Later on Tetrominos, tetris shapes, will be built with
 * four Squares each.
 */
function Square(x, y, tetrominoType = 'noType') {

  this.div = document.createElement('div');

  var SQUARE_CLASS_NAMES = 'square ' + tetrominoType;
  this.div.className = SQUARE_CLASS_NAMES;

  x  = x  < 0 ? 0 : x;
  y = y < 0 ? 0 : y;
  this.setX(x);
  this.setY(y);

}

/* Square functions */

Square.prototype.getX = function() { return this.x; }

Square.prototype.setX = function(x) { 
    this.x = x; 
    /* Update positioning */
    this.div.style.left = this.x * SQUARE_SIZE + 'px';                                     
}

Square.prototype.getY = function() { return this.y; }

Square.prototype.setY = function(y) { 
    this.y = y; 
    /* Update positioning */
    this.div.style.top  = this.y * SQUARE_SIZE + 'px';
}

Square.prototype.getDiv = function() { return this.div; }

/* EOF */


/**
 * Build a new Square. Later on Tetrominos, tetris shapes, will be built with
 * four Squares each.
 */
function Square(x, y, squareType) {

    squareType = (squareType == undefined) ? 'noType' : squareType;

    this.div = document.createElement('div');

    this.setX(x);
    this.setY(y);

    var SQUARE_CLASS_NAMES = 'square ' + squareType;
    this.div.className = SQUARE_CLASS_NAMES;
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
    if(y < 2)
        this.div.setAttribute("buffer", "true");
    else
        this.div.setAttribute("buffer", "false");
}

Square.prototype.getDiv = function() { return this.div; }

/* EOF */

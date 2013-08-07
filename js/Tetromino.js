/**
 *
 */

function Tetromino(x, y, tetrominoName = "invalidTetrominoName") {

    /**
      * TODO: Review, the values are altered. This helps to compensate for 
      *       the +2 offset used during creation in _addCoordinatesOffset(). 
      *       This goes back to the use of negative values for the 
      *       baseCoordinates, which eases the rotation routine.
      */
    this.xOffset = x - 1;
    this.yOffset = y - 2;

    this.tetrominoName = tetrominoName;

    this.baseCoordinates = TETROMINO_BASE_COORDINATES[tetrominoName];
    this.squares = this.getSquares();
}

Tetromino.prototype.getTetrominoName = function() {
    return this.tetrominoName;
}

Tetromino.prototype.getSquares = function() {

    if(this.baseCoordinates == undefined)
        return this.squares;

    if(this.squares == null)
        this.squares = new Array(4);

    for(var i = 0; i < this.baseCoordinates.length; i++) {
        var baseCoords = this.baseCoordinates[i];
        var newCoords = this._addCoordinatesOffset(baseCoords);
        var x = newCoords[0];
        var y = newCoords[1];

        var square = this.squares[i];
        if(square instanceof Square) {
            square.setX(x);
            square.setY(y);
        } else {
            this.squares[i] = new Square(x, y, this.tetrominoName);
        }
    }
    return this.squares;
}

/* Calculate new positions. */

Tetromino.prototype.getPositions = function() {
    return this._getPositions(this.squares);
}

Tetromino.prototype._getPositions = function(squares, 
                                             xModifier = 0, yModifier = 0) {
    var newPositions = Array(4);
    for(var i = 0; i < 4; i++) {
        var square = squares[i];

        var x = square.getX();
        var y = square.getY();

        var nextX = square.getX() + xModifier;
        var nextY = square.getY() + yModifier;

        newPositions[i] = [nextX, nextY];
    }
    return newPositions;
}

/**
 * @coordinatesPair Is an array of two numbers, a (x, y) pair.
 */
Tetromino.prototype._addCoordinatesOffset = function(coordinatesPair) {

    if(coordinatesPair.length != 2)
        return;

    /* +2 to ensure that the base coords have positive values */             
    var x = coordinatesPair[0] + 2;                                                   
    var y = coordinatesPair[1] + 2;                                                   
                                                                                 
    /* add coordinates offset */                                             
    x += this.xOffset;                                                         
    y += this.yOffset;

    var newPair = [x, y];

    return newPair;
}

Tetromino.prototype._rotateBaseCoordinates = function(baseCoords) {

    var rotatedBaseCoords = new Array(baseCoords.length);

    for(var i = 0; i < baseCoords.length; i++) {
        var coords = baseCoords[i];
        /* (-y, x) */
        var x = coords[1] * -1;
        var y = coords[0];
        rotatedBaseCoords[i] = [x, y];
    }

    return rotatedBaseCoords;
}

Tetromino.prototype._getRotatedPositions = function() {
    var coordinates = this._rotateBaseCoordinates(this.baseCoordinates);
    for(var i = 0; i < coordinates.length; i++) {
        coordinates[i] = this._addCoordinatesOffset(coordinates[i]);
    }
    return coordinates;
}

Tetromino.prototype.getNewPositions = function(movDirection) {                    
    var xModifier = 0;                                                           
    var yModifier = 0;                                                           
    switch(movDirection) {                                                          
        case UP: /* rotate */                                                    
            return this._getRotatedPositions();                  
        case DOWN:                                                               
            xModifier = 0;                                                       
            yModifier = 1;                                                       
            break;
        case RIGHT:                                                              
            xModifier = 1;                                                       
            yModifier = 0;                                                       
            break;
        case LEFT:                                                               
            xModifier = -1;                                                      
            yModifier = 0;                                                       
            break;
    }                                                                            
    var squares = this.getSquares();
    return this._getPositions(squares, xModifier, yModifier);
} 

/* Perform movements. */

Tetromino.prototype._rotate = function() {
    this.baseCoordinates = this._rotateBaseCoordinates(this.baseCoordinates);
    return this.getSquares();
}

Tetromino.prototype.move = function(movDirection) {
    switch(movDirection) {
        case    UP: this._rotate(); return;
        case  DOWN: this.yOffset += 1; return;
        case  LEFT: this.xOffset -= 1; return;
        case RIGHT: this.xOffset += 1; return;
    }
}

/* EOF */

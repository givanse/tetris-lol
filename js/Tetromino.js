/**
 *
 */

function Tetromino(x, y, tetrominoName) {

	tetrominoName = (tetrominoName == undefined) ? "invalidTetrominoName" : 
                                                    tetrominoName;

    /**
      * TODO: Review, the values are altered. This helps to compensate for 
      *       the +2 offset used during creation in _addOffsetToCoordsPair(). 
      *       This goes back to the use of negative values for the 
      *       baseCoordinates, which eases the rotation routine.
      */
    this.xOffset = x - 1;
    this.yOffset = y - 2;

    this.tetrominoName = tetrominoName;

    this.baseCoordinates = TETROMINO_BASE_COORDINATES[tetrominoName];
    this.squares = this.getSquares();
}

/* Calculate new positions. */

/**
 *
 * return - The positions of the Squares that belong to this Tetromino.
 */
Tetromino.prototype.getPositions = function() {
    return this._getPositions(this.squares);
}

/**
 *
 * return - The positions of the Squares that belong to this Tetromino with
 *          an offset added to each of them.
 */
Tetromino.prototype._getPositions = function(squares, xModifier, yModifier) {
    
    xModifier = (xModifier == undefined) ? 0 : xModifier;
    yModifier = (yModifier == undefined) ? 0 : yModifier;
    
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
Tetromino.prototype._addOffsetToCoordsPair = function(coordinatesPair) {

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
        coordinates[i] = this._addOffsetToCoordsPair(coordinates[i]);
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

Tetromino.prototype.updateSquares = function(baseCoordinates) {
    for(var i = 0; i < this.squares.length; i++) {
        var baseCoords = baseCoordinates[i];
        var newCoords = this._addOffsetToCoordsPair(baseCoords);
        var x = newCoords[0];
        var y = newCoords[1];

        var square = this.squares[i];
        square.setX(x);
        square.setY(y);
    }
}

Tetromino.prototype.buildSquares = function() {

    var noxiousTrapPosition = null;
    if(this.tetrominoName == SQUARESHP)
        noxiousTrapPosition = 0;
    
    var squares = new Array(4);
    for(var i = 0; i < this.baseCoordinates.length; i++) {
        var baseCoords = this.baseCoordinates[i];
        var newCoords = this._addOffsetToCoordsPair(baseCoords);
        var x = newCoords[0];
        var y = newCoords[1];
        
        var squareType = (noxiousTrapPosition == i) ? MUSHROOM : 
                                                      this.tetrominoName; 
        
        squares[i] = new Square(x, y, squareType);
    }
    
    return squares;
}

/* Getters and Setter. */

Tetromino.prototype.getTetrominoName = function() {
    return this.tetrominoName;
}

Tetromino.prototype.getSquares = function() {

    if(this.baseCoordinates == undefined)
        return null;

    /* Guarantee the most up to date coordinates for the squares. */
    if(this.squares)
        this.updateSquares(this.baseCoordinates);
    else
        this.squares = this.buildSquares();
        
    return this.squares;
}

Tetromino.prototype.getRows = function() {
    var rowsToDelete = new Array(0);
    var coordinates = this.getPositions();
    for(var i = 0; i < coordinates.length; i++) {
        var position = coordinates[i];
        var rowNum = position[1];
        
        /* Don't process duplicates. */
        if(isDuplicate(rowsToDelete, rowNum))
            continue;
        else
            rowsToDelete.push(rowNum);
    }
    
    rowsToDelete.sort(function(a, b) { return a - b; });
    return rowsToDelete;
}

/* EOF */

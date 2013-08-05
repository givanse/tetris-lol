/**
 *
 */

function Tetromino(x, y, tetrominoName = "invalidTetrominoName") {
    
    this.realX = x < 0 ? 0 : x;
    this.realY = y < 0 ? 0 : y;
    this.tetrominoName = tetrominoName;

    this.baseCoordinates = TETROMINO_BASE_COORDINATES[tetrominoName];
    this.squares = null;
}

Tetromino.prototype.getSquares = function() {

    if(this.baseCoordinates == undefined)
        return this.squares;

    if(this.squares == null)
        this.squares = new Array(4);

    for(var i = 0; i < this.baseCoordinates.length; i++) {
        var coords = this.baseCoordinates[i];

        /* +2 to ensure that the base coords have positive values */
        var x = coords[0] + 2; 
        var y = coords[1] + 2;

        /* add coordinates offset */
        x += this.realX; 
        y += this.realY;

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

Tetromino.prototype.move = function(direction) {
    switch(direction) {
        case UP:
            this.rotate(); return;
        case DOWN:
            this.realY++; return; 
        case LEFT:
            this.realX--; return; 
        case RIGHT:
            this.realX++; return; 
    }
}

Tetromino.prototype.getNewMovementPositions = function(xModifier, yModifier) {           
    var squares = this.getSquares();
    return this._getNewMovementPositions(squares, xModifier, yModifier);
}

Tetromino.prototype._getNewMovementPositions = function(squares, xModifier, 
                                                                 yModifier) {           
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
                                                                                 
Tetromino.prototype.getRotatedPositions = function() {                              
    var matrixCopy = this.matrix.slice();
    matrixCopy = rotateMatrix(matrixCopy);
    var squares = this._getSquares(matrixCopy); 
    /* shift by -2 columns the new positions */
    var newPositions = this._getNewMovementPositions(squares, -2, 0);
    return newPositions;
} 


Tetromino.prototype.rotate = function() {                              
    for(var i = 0; i < this.baseCoordinates.length; i++) {
        var coords = this.baseCoordinates[i];
        /* (-y, x) */
        var x = coords[1] * -1;
        var y = coords[0];
        this.baseCoordinates[i] = [x, y];
    }
    return this.getSquares();
}

/* EOF */

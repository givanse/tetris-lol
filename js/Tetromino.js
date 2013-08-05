/**
 *
 */

function Tetromino(x, y, tetrominoName = "invalidTetrominoName") {
    
    this.realX = x < 0 ? 0 : x;
    this.realY = y < 0 ? 0 : y;
    this.baseCoordinates = TETROMINO_BASE_COORDINATES[tetrominoName];
    this.squares = null;

    if(this.baseCoordinates == undefined)
        this.squares = [tetrominoName];
    else
        this._buildTetrominoSquares(tetrominoName);
}

Tetromino.prototype._buildTetrominoSquares = function(tetrominoName) {
    this.squares = new Array(4);

    var c = this.baseCoordinates[0];

    for(var i = 0; i < 4; i++) {
        var coords = this.baseCoordinates[i];

        /* +2 to ensure that the base coords have positive values */
        var x = coords[0] + 2; 
        var y = coords[1] + 2;

        /* coordinates offset */
        x += this.realX; 
        y += this.realY;

        this.squares[i] = new Square(x, y, tetrominoName);
    }
}

Tetromino.prototype.getSquares = function() {
    return this.squares;
}

Tetromino.prototype._getSquares = function(matrix) {
    var squaresCount = 0;
    var squares = new Array(0);
    for(var x = 0; x < 4; x++) {
        for(var y = 0; y < 4; y++) {
            var square = matrix[x][y];

            if(square instanceof Square)
                squaresCount++;
            else
                continue;

            square.setX(x + this.realX);
            square.setY(y + this.realY);
            squares.push(square);

            if(squaresCount == 4)
                return squares;
        }
    }
    return squares;
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
    this.matrix =  rotateMatrix(this.matrix);
}

/* EOF */

/**
 *
 */

function Tetromino(x, y, tetrominoType = "invalidTetrominoType") {
    
    this.shiftX = x < 0 ? 1 : x + 1;
    this.shiftY = y < 0 ? 1 : y + 1;

    this.matrix = new Array(4);
    for(var i = 0; i < 4; i++) {
        this.matrix[i] = new Array(4);
        for(var j = 0; j < 4; j++)
            this.matrix[i][j] = null;
    }

    if(tetrominoType != "invalidTetrominoType")
        this._buildTetrominoSquares(tetrominoType);
}

Tetromino.prototype._buildTetrominoSquares = function(tetrominoType) {
    /* Origin coordinates, start point for the shape. */
    var x = 0; 
    var y = 0;

    /* The x and y values for the Square are garbage. */
    this.matrix[x][y] = new Square(x, y, tetrominoType);

    switch(tetrominoType) {
        case LINESHP:
            this.matrix[x+1][y] = new Square(x, y, tetrominoType);
            this.matrix[x+2][y] = new Square(x, y, tetrominoType);
            this.matrix[x+3][y] = new Square(x, y, tetrominoType);
            return;
        case SQUARESHP:
            this.matrix[x  ][y+1] = new Square(x, y, tetrominoType);
            this.matrix[x+1][y  ] = new Square(x, y, tetrominoType);
            this.matrix[x+1][y+1] = new Square(x, y, tetrominoType);
            return;
        case TSHP:
            this.matrix[x+1][y  ] = new Square(x, y, tetrominoType);
            this.matrix[x+2][y  ] = new Square(x, y, tetrominoType);
            this.matrix[x+1][y+1] = new Square(x, y, tetrominoType);
            return;
        case SSHP_R: /* special case */
            this.matrix[x  ][y  ] = null; 
            this.matrix[x  ][y+1] = new Square(x, y, tetrominoType);
            this.matrix[x+1][y  ] = new Square(x, y, tetrominoType);
            this.matrix[x+1][y+1] = new Square(x, y, tetrominoType);
            this.matrix[x+2][y  ] = new Square(x, y, tetrominoType);
            return;
        case SSHP_L:
            this.matrix[x+1][y  ] = new Square(x, y, tetrominoType);
            this.matrix[x+1][y+1] = new Square(x, y, tetrominoType);
            this.matrix[x+2][y+1] = new Square(x, y, tetrominoType);
            return;
        case LSHP_R:
            this.matrix[x  ][y+1] = new Square(x, y, tetrominoType);
            this.matrix[x+1][y+1] = new Square(x, y, tetrominoType);
            this.matrix[x+2][y+1] = new Square(x, y, tetrominoType);
            return;
        case LSHP_L: /* special case */
            this.matrix[x  ][y  ] = null; 
            this.matrix[x  ][y+1] = new Square(x, y, tetrominoType);
            this.matrix[x+1][y+1] = new Square(x, y, tetrominoType);
            this.matrix[x+2][y  ] = new Square(x, y, tetrominoType);
            this.matrix[x+2][y+1] = new Square(x, y, tetrominoType);
            return;
    }
}

Tetromino.prototype.getSquares = function() {
    var squares = new Array(0);
    for(var x = 0; x < 4; x++) {
        for(var y = 0; y < 4; y++) {
            var square = this.matrix[x][y];

            if(! (square instanceof Square))
                continue;

            square.setX(x * this.shiftX);
            square.setY(y * this.shiftY);
            squares.push(square);
        }
    }
    return squares;
}

/* EOF */

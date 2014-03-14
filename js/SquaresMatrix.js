
function SquaresMatrix(columns, rows) {

    this.columns = columns < 0 ? 0 : columns;
    this.rows = rows < 0 ? 0 : rows;
    
    this.squaresMatrix = new Array(this.columns);
    for(var col = 0; col < this.columns; col++) {
        this.squaresMatrix[col] = new Array(this.rows);
        for(var row = 0; row < this.rows; row++) {
            this.squaresMatrix[col][row] = null;
        }
    }
}

/**
 *
 */
SquaresMatrix.prototype.arePositionsAvailable = function(positions) {
    if (!positions || !tlol.util.isArray(positions) || positions.length <= 0 ) {
        return false;
    }

    for (var i = 0; i < positions.length; i++) {
        var coordinates = positions[i];
        var x = coordinates[0];
        var y = coordinates[1];

        /* validate that the position is within matrix bounds */
        if (x < 0 || x >= this.getWidth() || y < 0 || y >= this.getHeight()) {
            return false;
        }

        /* validate that no other square is at that position */
        var elem = this.squaresMatrix[x][y];
        if (elem && elem.hasOwnProperty("isEqual")) {
            return false;
        }
    }

    return true; /* a square can be inserted in any of the passed positions */
}

SquaresMatrix.prototype.packColumn = function(xConstant, y) {

    var startingSquare = this.squaresMatrix[xConstant][y];
    if(startingSquare !== null) {
        return;
    }

    for( ; y > 0; y--) { /* bottom to top */
        var upperVal = this.squaresMatrix[xConstant][y - 1];

        if(upperVal !== null) {
            /* ran out of free space, insert here */
            this.insertSquareAt(xConstant, y, upperVal);
        } else {
            this.squaresMatrix[xConstant][y] = null;
        }
        this.squaresMatrix[xConstant][y - 1] = null;
    }
}

/**
  *
  * return - The state of the row: tlol.row.empty, tlol.row.full or tlol.row.used.
  */
SquaresMatrix.prototype.getRowState = function(y) {
    var squaresCount = 0;

    var width = this.getWidth();
    for(var x = 0; x < width; x++) {
        var square = this.squaresMatrix[x][y];
        if(square !== null) {
            squaresCount++;
        }
    }
    
    if (squaresCount === 0) {
        return tlol.row.empty;
    }

    if (squaresCount === width) {
        return tlol.row.full;
    }

    return tlol.row.used;
}

/**
 * One row deleted triggers the process of packing and deleting all 
 * the upper rows, if valid. 
 */
SquaresMatrix.prototype.deleteRows = function(rowNums) {

    rowNums = (!rowNums) ? [] : rowNums;

    var lastRow = rowNums[rowNums.length - 1]; /* closest to bottom row */   
 
    var deletedRowsCount = 0;
    for (var y = lastRow; ; y--) {

        if (this.getRowState(y) === tlol.row.full) {
            this._deleteRow(y);
            deletedRowsCount++;

            for (var x = 0; x < this.getWidth(); x++) {
                this.packColumn(x, y);
            }

            /* Re-process the same row, it might have been filled again. */
            y++;
        }

        if (this.getRowState(y) === tlol.row.empty) {
            return deletedRowsCount;
        }
    }

    return deletedRowsCount;
}

SquaresMatrix.prototype._deleteRow = function(y) {
    var width = this.getWidth();
    for(var x = 0; x < width; x++) {
        this.squaresMatrix[x][y] = null;
    }
}

/* Setters and Getters. */

SquaresMatrix.prototype.insertTetromino = function(tetromino) {
    if (!tetromino) {
        return this;
    }
     
    var squares = tetromino.getSquares();
    for(var i = 0; i < squares.length; i++) {
        var square = squares[i];
        this.insertSquare(square);                                       
    }

    return this;                       
}

SquaresMatrix.prototype.insertSquare = function(square) {
    var x = square.getX();
    var y = square.getY();
    this.squaresMatrix[x][y] = square;
    return this;
}

SquaresMatrix.prototype.insertSquareAt = function(x, y, square) {
    square.setX(x);
    square.setY(y);
    return this.insertSquare(square);
}

SquaresMatrix.prototype.getWidth = function() { return this.columns; }

SquaresMatrix.prototype.getHeight = function() { return this.rows; }

SquaresMatrix.prototype.getMatrix = function() { return this.squaresMatrix; }

/* EOF */

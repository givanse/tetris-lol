
function SquaresMatrix(columns, rows) {

    this.columns = (columns < 0) ? 0 : columns;
    this.rows    = (rows    < 0) ? 0 : rows;
    
    /* Fill the matrix with NULLs */
    this.squaresMatrix = [];
    for(var col = 0; col < this.columns; col++) {
        this.squaresMatrix[col] = [];
        for(var row = 0; row < this.rows; row++) {
            this.squaresMatrix[col][row] = null;
        }
    }
    
}

/**
 *
 */
SquaresMatrix.prototype.arePositionsAvailable = function (positions) {
    if ( ! positions || 
         ! tlol.util.isArray( positions ) || 
         positions.length <= 0 ) {
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
  * return - The state of the row: 
             tlol.row.EMPTY, tlol.row.FULL or tlol.row.USED.
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
        return tlol.row.EMPTY;
    }

    if (squaresCount === width) {
        return tlol.row.FULL;
    }

    return tlol.row.USED;
}

/**
 * Delete any of the Square rows if it fills its matrix row.
 *
 * One row deleted triggers the process of packing and deleting all 
 * the upper rows, if valid.
 *
 * rowNum - The row number used to start searching from bottom to top.
 * return - A list with the row numbers of the deleted rows.
 */
SquaresMatrix.prototype.findCompletedRows = function(rowNum) {

    if ( rowNum < 0 || rowNum >= this.rows ) {
        throw {
            name: "SquaresMatrixIndexError",
            message: "The row number is out of bounds."
        };
    }
 
    var completedRows = [];

    for ( ; rowNum >= 0; rowNum--) {
        var rowState = this.getRowState(rowNum);

        if (rowState === tlol.row.FULL) {
            completedRows.push(rowNum);
        } else if (rowState === tlol.row.EMPTY) {
            break; 
        }
    }

    return completedRows;
}

/**
 * Pack all the columns at a given row number.
 */
SquaresMatrix.prototype.packColumns = function(rowNums) {
    for(var i = 0; i < rowNums.length; i++) {
        y = rowNums[i];
        for (var x = 0; x < this.getWidth(); x++) {
            this.packColumn(x, y);
        }
    }
}

SquaresMatrix.prototype.deleteRows = function(rowNums) {
    for(var i = 0; i < rowNums.length; i++) {
        y = rowNums[i];
        var width = this.getWidth();
        for(var x = 0; x < width; x++) {
            this.squaresMatrix[x][y] = null;
        }
    }
}

/* Setters and Getters. */

SquaresMatrix.prototype.insertTetromino = function(tetromino) {
    if ( ! tetromino ) {
        return this;
    }

    var squares = tetromino.getSquares();
    for(var i = 0; i < squares.length; i++) {
        var square = squares[i];
        this.insertSquare(square);                                     
    }

    return this;                       
}

SquaresMatrix.prototype.insertSquare = function (square) {
    var x = square.getX();
    var y = square.getY();

    if ( x < 0 || x >= this.columns || 
         y < 0 || y >= this.rows ) {
        throw {
            name: "SquaresMatrixIndexError",
            message: "The Square's coordinates are out of bounds:" +
                     "(" + x + ", " + y + ")"
        };
    }

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

/**
 * return - A list of all the squares in the rows indicated by rowNums.
 */
SquaresMatrix.prototype.getRowsSquares = function(rowNums) { 
    
    if ( ! tlol.util.isArray(rowNums) ) {
        throw {
            name: "TypeError",
            message: "A list of row numbers is expected."
        };
    }

    var squares = [];
    for(var i = 0; i < rowNums.length; i++) {
        var rowNum = rowNums[i];
        
        if (rowNum < 0 || rowNum >= this.rows) {
            continue;
        }

        for(var x = 0; x < this.columns; x++) {
            squares.push( this.squaresMatrix[x][rowNum] );
        }
    }
 
    return squares;
}

SquaresMatrix.prototype.removeSquare = function (x, y) {
    this.squaresMatrix[x][y] = null;
}

/* EOF */

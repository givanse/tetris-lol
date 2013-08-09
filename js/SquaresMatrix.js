
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

SquaresMatrix.prototype.arePositionsAvailable = function(positions) {
    if(!(positions instanceof Array) || positions.length == 0)
        return false;

    for(var i = 0; i < positions.length; i++) {
        var coordinates = positions[i];
        var x = coordinates[0];
        var y = coordinates[1];
        if(x < 0 || x >= this.getWidth() || y < 0 || y >= this.getHeight())
            return false;
        if(this.squaresMatrix[x][y] instanceof Square)
            return false;
    }

    return true;
}

SquaresMatrix.prototype.packColumn = function(xConstant, y) {

    var startingSquare = this.squaresMatrix[xConstant][y];
    if(startingSquare instanceof Square)
        return;

    for( ; y > 0; y--) { /* bottom to top */
        var upperVal = this.squaresMatrix[xConstant][y - 1];

        if(upperVal instanceof Square)
            this.insertSquareAt(xConstant, y, upperVal);
        else
            this.squaresMatrix[xConstant][y] = null;

        this.squaresMatrix[xConstant][y - 1] = null;
    }
}

/**
  *
  * return - The state of the row: ROW_EMPTY, ROW_FULL or ROW_USED.
  */
SquaresMatrix.prototype.getRowState = function(y) {
    var squaresCount = 0;

    var width = this.getWidth();
    for(var x = 0; x < width; x++) {
        var square = this.squaresMatrix[x][y];
        if(square instanceof Square)
            squaresCount++;
    }
    
    if(squaresCount == 0)
        return ROW_EMPTY;

    if(squaresCount == width)
        return ROW_FULL;
    
    return ROW_USED;
}

SquaresMatrix.prototype.deleteRows = function(rowNums = []) {
    rowNums.sort();
    var lastRow = rowNums[rowNums.length - 1]; /* closest to bottom */   
 
    for(var y = lastRow; ; y--) {

        if(this.getRowState(y) == ROW_FULL) {
            this._deleteRow(y);

            for(var x = 0; x < this.getWidth(); x++) {
                this.packColumn(x, y);
            }
            /* Re-process the same row, it might have been filled again. */
            y++;
        }

        if(this.getRowState(y) == ROW_EMPTY) {
            return;
        }
    }
}

SquaresMatrix.prototype._deleteRow = function(y) {
    var width = this.getWidth();
    for(var x = 0; x < width; x++) {
        this.squaresMatrix[x][y] = null;
    }
}

/* Setters and Getters. */

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

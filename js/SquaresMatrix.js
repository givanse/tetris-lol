
function SquaresMatrix(columns, rows) {                                            

    this.columns = columns < 0 ? 0 : columns;                                                 
    this.rows = rows < 0 ? 0 : rows;                                              

    this.squaresMatrix = new Array(this.columns);                                                 

    for(var col = 0; col < this.columns; col++) {
        this.squaresMatrix[col] = new Array(this.rows);
    }
}          

SquaresMatrix.prototype.getWidth = function() { return this.columns; }
                                                                                 
SquaresMatrix.prototype.getHeight = function() { return this.rows; }

SquaresMatrix.prototype.insertSquare = function(square) {
    var x = square.getX(); 
    var y = square.getY(); 
    this.squaresMatrix[x][y] = square;
}

SquaresMatrix.prototype.getSquares = function() {
    return this.squaresMatrix;
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

/* EOF */

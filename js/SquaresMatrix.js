
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

/* EOF */

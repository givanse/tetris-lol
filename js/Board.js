
function Board(canvasDiv, widthInSquares = 0, heightInSquares = 0) {

  this.squaresMatrix = new SquaresMatrix(widthInSquares, heightInSquares);

  this.canvasDiv = canvasDiv; 
  this.canvasDiv.setAttribute("style", "display: block; width: 0px; height: 0px");
  /* canvasDiv dimensions */
  var width  = widthInSquares  * SQUARE_SIZE;
  var height = heightInSquares * SQUARE_SIZE;
  /* set canvasDiv dimensions */
  this.canvasDiv.style.width  = width  + "px";
  this.canvasDiv.style.height = height + "px";

}

Board.prototype.insertSquare = function(square) {
  this.squaresMatrix.insertSquare(square);
}

Board.prototype.getWidth = function() { 
  return parseInt(this.canvasDiv.style.width); 
}

Board.prototype.getHeight = function() { 
  return parseInt(this.canvasDiv.style.height); 
}

Board.prototype.drawSquares = function() { 
  var squares = this.squaresMatrix.getSquares();
  var width = this.squaresMatrix.getWidth();
  var height =  this.squaresMatrix.getHeight();
  for(var col = 0; col < width; col++) {
    for(var row = 0; row < height; row++) {
      var square = squares[col][row];
      if(square)
        this.canvasDiv.appendChild(square.getDiv());
    }
  }
}

/* EOF */

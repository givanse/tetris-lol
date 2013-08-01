
function Board(canvasDiv, widthInSquares = 0, heightInSquares = 0) {

    this.squaresMatrix = new SquaresMatrix(widthInSquares, heightInSquares);
    this.fallingSquares = new Array(4); /* Only 4 squares may fall at a time. */
    this.insertFallingShape();

    this.canvasDiv = canvasDiv; 
    this.canvasDiv.setAttribute("style", 
                                "display: block; width: 0px; height: 0px");
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

/**
 * Draw, append, the squares to the canvas div.
 */
Board.prototype.drawSquares = function() { 
    /*TODO: Optimization, remove and append only the squares that have moved. */
    while(this.canvasDiv.hasChildNodes()) {                                           
        this.canvasDiv.removeChild(this.canvasDiv.lastChild);                              
    }     
    /* draw board squares */
    var squares = this.squaresMatrix.getSquares();
    for(var col= 0; col < this.squaresMatrix.getWidth(); col++)
        this.drawSquaresArray(squares[col]); 
    /* draw falling squares */
    this.drawSquaresArray(this.fallingSquares); 
}

Board.prototype.drawSquaresArray = function(squaresArray) { 
    if(!(squaresArray instanceof Array))
        return;

    for(var i = 0; i < squaresArray.length; i++) {
        var square = squaresArray[i];
        if(square)
            this.canvasDiv.appendChild(square.getDiv());
    }
}

Board.prototype.insertFallingShape = function() { 
    this.fallingSquares[0] = new Square(4, 0, LSHP_R);
    this.fallingSquares[1] = new Square(5, 0, LSHP_L);
    this.fallingSquares[2] = new Square(4, 1, SSHP_R);
    this.fallingSquares[3] = new Square(5, 1, SSHP_L);
}

Board.prototype.moveFallingSquares = function() { 
    for(var i = 0; i < 4; i++) {
        var square = this.fallingSquares[i];
        square.setY(square.getY() + 1);
    }
}

/* EOF */

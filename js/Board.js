
function Board(canvasDiv, widthInSquares = 0, heightInSquares = 0) {

    this.squaresMatrix = new SquaresMatrix(widthInSquares, heightInSquares);
    this.fallingSquares = new Array(4); /* Only 4 squares may fall at a time. */

    this.canvasDiv = canvasDiv; 
    this.canvasDiv.setAttribute("style", 
                                "display: block; width: 0px; height: 0px");
    /* canvasDiv dimensions */
    var width  = widthInSquares  * SQUARE_SIZE;
    var height = heightInSquares * SQUARE_SIZE;
    /* set canvasDiv dimensions */
    this.canvasDiv.style.width  = width  + "px";
    this.canvasDiv.style.height = height + "px";

    this.generateRandomInitialRows();
    this.generateRandomFallingShape();
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
    /*TODO: consider "for in"*/
    for(var i = 0; i < squaresArray.length; i++) {
        var square = squaresArray[i];
        if(square)
            this.canvasDiv.appendChild(square.getDiv());
    }
}

Board.prototype.generateRandomFallingShape = function() { 
    var tetrominoType = getRandonTetrominoType();
    var y = 0;
    var x = Math.floor(this.squaresMatrix.getWidth() / 2) - 1;
    this.fallingSquares = getTetrominoSquares(x, y, tetrominoType);
}

Board.prototype.updateSquares = function() { 
    this.move(DOWN);
}

Board.prototype.move = function(direction) { 
    switch(direction) {
        case UP: /* rotate */
            return ;
        case DOWN:
            var xModifier = 0;
            var yModifier = 1;
            return this.shiftSquares(xModifier, yModifier);
        case RIGHT:
            var xModifier = 1;
            var yModifier = 0;
            return this.shiftSquares(xModifier, yModifier);
        case LEFT:
            var xModifier = -1;
            var yModifier = 0;
            return this.shiftSquares(xModifier, yModifier);
    } 
    return null;
}

Board.prototype.shiftSquares = function(xModifier, yModifier) { 
    var nextPositions = Array(4);
    for(var i = 0; i < 4; i++) {
        var square = this.fallingSquares[i];

        var x = square.getX();
        var y = square.getY();

        var nextX = square.getX() + xModifier;
        var nextY = square.getY() + yModifier;

        nextPositions[i] = [nextX, nextY];
    }

    if(!this.squaresMatrix.arePositionsAvailable(nextPositions))
        return false;

    for(var i = 0; i < 4; i++) {
        var square = this.fallingSquares[i];
        var coordinates = nextPositions[i];

        var x = coordinates[0];
        var y = coordinates[1];

        square.setX(x);
        square.setY(y);
    }
    return true;
}

Board.prototype.generateRandomInitialRows = function() { 
    var numFilledRows = 3;
    var positionsLeftEmpty = this.squaresMatrix.getWidth() * 1;
    var totalSquaresNeeded = (this.squaresMatrix.getWidth() * numFilledRows) -
                        positionsLeftEmpty;
    var xMin = 0;
    var xMax = this.squaresMatrix.getWidth() - 1;
    var yMin = this.squaresMatrix.getHeight() - numFilledRows;
    var yMax = this.squaresMatrix.getHeight() - 1;
    for(var i = 0; i < totalSquaresNeeded; i++) {
        var xRnd = Math.floor(Math.random() * (xMax - xMin + 1)) + xMin;
        var yRnd = Math.floor(Math.random() * (yMax - yMin + 1)) + yMin;
        var tetrominoType = getRandonTetrominoType();
        var square = new Square(xRnd, yRnd, tetrominoType);
        this.squaresMatrix.insertSquare(square); 
    }
}

/* EOF */

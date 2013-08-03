
function Board(canvasDiv, widthInSquares = 0, heightInSquares = 0) {

    this.squaresMatrix = new SquaresMatrix(widthInSquares, heightInSquares);

    this.canvasDiv = canvasDiv;
    this.canvasDiv.setAttribute("style",
                                "display: block; width: 0px; height: 0px");
    /* canvasDiv dimensions */
    var width  = widthInSquares  * SQUARE_SIZE;
    var height = heightInSquares * SQUARE_SIZE;
    /* set canvasDiv dimensions */
    this.canvasDiv.style.width  = width  + "px";
    this.canvasDiv.style.height = height + "px";

    this.currentTetromino = null; 
    this.generateRandomTetromino();
    this.generateRandomInitialRows();
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
    var squares = this.squaresMatrix.getMatrix();
    for(var col= 0; col < this.squaresMatrix.getWidth(); col++)
        this.drawSquaresArray(squares[col]);
    /* draw falling squares */
    this.drawSquaresArray(this.currentTetromino.getSquares());
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

Board.prototype.generateRandomTetromino = function() {
    var tetrominoType = getRandonTetrominoType();
    var x = Math.floor(this.squaresMatrix.getWidth() / 2) - 1;
    var y = 0;
    this.currentTetromino = new Tetromino(x, y, tetrominoType); 
}

Board.prototype.updateSquares = function(direction) {
    var newPositions = this.moveCurrentTetromino(direction);

    if(!this.squaresMatrix.arePositionsAvailable(newPositions))
        return false;

    this.currentTetromino.move(direction);
}

Board.prototype.moveCurrentTetromino = function(direction) {
    var xModifier = 0;
    var yModifier = 0;
    switch(direction) {
        case UP: /* rotate */
            return this.currentTetromino.getRotatePositions();
        case DOWN:
            xModifier = 0;
            yModifier = 1;
        case RIGHT:
            xModifier = 1;
            yModifier = 0;
        case LEFT:
            xModifier = -1;
            yModifier = 0;
    }
    return this.currentTetromino
               .getNewMovementPositions(xModifier, yModifier);
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

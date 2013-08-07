
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

    this.currTetromino = null; 
    this.generateRandomTetromino();
    this.generateRandomInitialRows();
}

Board.prototype.updateBoard = function(movDirection) {
    var newTetroPositions = this.currTetromino.getNewPositions(movDirection);

    if(!this.squaresMatrix.arePositionsAvailable(newTetroPositions))
        return false;

    this.currTetromino.move(movDirection);
}

/* Drawing into the canvas. */

/**
 * Draw, append, the squares to the canvas div.
 */
Board.prototype.drawSquares = function() {
    /*TODO: Optimization, remove and append only the squares that have moved. */

    /* Clear the canvas. */
    while(this.canvasDiv.hasChildNodes()) {
        this.canvasDiv.removeChild(this.canvasDiv.lastChild);
    }

    /* Draw board squares. */
    var squares = this.squaresMatrix.getMatrix();
    for(var col= 0; col < this.squaresMatrix.getWidth(); col++)
        this._drawSquaresArray(squares[col]);

    /* Draw falling squares. */
    this._drawSquaresArray(this.currTetromino.getSquares());
}

Board.prototype._drawSquaresArray = function(squaresArray) {
    if(!(squaresArray instanceof Array))
        return;

    for(var i = 0; i < squaresArray.length; i++) {
        var square = squaresArray[i];
        if(square instanceof Square)
            this.canvasDiv.appendChild(square.getDiv());
    }
}

/* Generate random pieces. */

Board.prototype.generateRandomTetromino = function() {
    var tetrominoName = getRandomTetrominoName();
    /* TODO: Tetromino uses by default a +2 offset, needs to be adressed. */
    var x = Math.floor(this.squaresMatrix.getWidth() / 2) - 1;
    var y = 0; 
    this.currTetromino = new Tetromino(x, y, tetrominoName); 
}

Board.prototype.generateRandomInitialRows = function() {
    var numFilledRows = 3;
    var positionsLeftEmpty = this.squaresMatrix.getWidth() * 1;
    var totalSquaresNeeded = (this.squaresMatrix.getWidth() * numFilledRows) -
                              positionsLeftEmpty;
    var xMin = 0;
    var xMax = this.squaresMatrix.getWidth()  - 1;
    var yMin = this.squaresMatrix.getHeight() - numFilledRows;
    var yMax = this.squaresMatrix.getHeight() - 1;
    for(var i = 0; i < totalSquaresNeeded; i++) {
        var xRnd = Math.floor(Math.random() * (xMax - xMin + 1)) + xMin;
        var yRnd = Math.floor(Math.random() * (yMax - yMin + 1)) + yMin;
        var tetrominoName = getRandomTetrominoName();
        var square = new Square(xRnd, yRnd, tetrominoName);
        this.squaresMatrix.insertSquare(square);
    }
}

/* Setters and Getters. */

Board.prototype.insertSquare = function(square) {
    this.squaresMatrix.insertSquare(square);
}

Board.prototype.getWidth = function() {
    return parseInt(this.canvasDiv.style.width);
}

Board.prototype.getHeight = function() {
    return parseInt(this.canvasDiv.style.height);
}

/* EOF */

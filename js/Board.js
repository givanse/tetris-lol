
function Board(canvasDiv, widthInSquares, heightInSquares) {

    widthInSquares = (widthInSquares == undefined) ? 0 : widthInSquares;
    heightInSquares = (heightInSquares == undefined) ? 0 : heightInSquares;
    
    this.squaresMatrix = new SquaresMatrix(widthInSquares, heightInSquares);

    this.canvasDiv = canvasDiv;
    this.canvasDiv.setAttribute("style",
                                "display: block; width: 0px; height: 0px");
    /* canvasDiv dimensions */
    this.width  = widthInSquares  * SQUARE_SIZE;
    this.height = heightInSquares * SQUARE_SIZE;
    /* set canvasDiv dimensions */
    this.canvasDiv.style.width  = this.width  + "px";
    this.canvasDiv.style.height = this.height + "px";

    this.currTetromino = getRandomTetromino(this.squaresMatrix.getWidth()); 
    this.nextTetromino = getRandomTetromino(this.squaresMatrix.getWidth()); 

    this.generateRandomInitialRows();
    this.drawSquares();
}

/* Board business logic. */

/**
 *
 * return - true if the falling shape performed a movement, false otherwise.
 */
Board.prototype.updateBoard = function(movDirection) {

    var newTetroPositions = this.currTetromino.getNewPositions(movDirection);

    if(!this.squaresMatrix.arePositionsAvailable(newTetroPositions))
        return false;

    this.currTetromino.move(movDirection);

    return true;
}


/** 
 * Asumes that this function is called when this.currTetromino still is valid 
 * and the current Tetromino that is falling.
 *
 * return - The number of rows that were complete and deleted.
 */
Board.prototype.deleteCompletedRows = function() {
    var rowsToDelete = new Array(0);
    var coordinates = this.currTetromino.getPositions();
    for(var i = 0; i < coordinates.length; i++) {
        var position = coordinates[i];
        var rowNum = position[1];
        
        /* Don't process duplicates. */
        if(isDuplicate(rowsToDelete, rowNum))
            continue;
        else
            rowsToDelete.push(rowNum);
    }

    var deletedRowsCount = this.squaresMatrix.deleteRows(rowsToDelete);

    return deletedRowsCount;
}

/* Drawing into the canvas. */

Board.prototype.gameOver = function() {
    this.drawSquares();
}

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

Board.prototype.useNextTetromino = function() {

    this.currTetromino = this.nextTetromino;
    this.nextTetromino = getRandomTetromino(this.squaresMatrix.getWidth()); 

    /* Check if the tetromino can be shown on the board. */
    var newTetroPositions = this.currTetromino.getPositions();
    return this.squaresMatrix.arePositionsAvailable(newTetroPositions);
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

Board.prototype.insertTetromino = function(tetromino) {
    this.squaresMatrix.insertTetromino(tetromino);
}

Board.prototype.getWidth = function() {
    return parseInt(this.canvasDiv.style.width);
}

Board.prototype.getHeight = function() {
    return parseInt(this.canvasDiv.style.height);
}

Board.prototype.getCurrentTetromino = function() {
    return this.currTetromino;
}

Board.prototype.getNextTetromino = function() {
    return this.nextTetromino;
}

/* EOF */

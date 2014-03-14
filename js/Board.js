
function Board(canvas, playField, gameInfoDiv, widthInSquares, heightInSquares) {
    widthInSquares = (widthInSquares == undefined) ? 0 : widthInSquares;
    heightInSquares = (heightInSquares == undefined) ? 0 : heightInSquares;
    
    this.squaresMatrix = tlol.squareFactory
                             .buildSquaresMatrix(widthInSquares, heightInSquares);

    this.playField = playField;
    /* set playField dimensions */
    this.playField.setAttribute("style",
                         "display: block; width: 0px; height: 0px; top: 0px;");
    this.width  = widthInSquares  * tlol.square_size;
    this.height = heightInSquares * tlol.square_size;
    this.playField.style.width  = this.width  + "px";
    this.playField.style.height = this.height + "px";
    this.playField.style.top = - (tlol.square_size * 2) + "px";/* two rows buffer */
    
    /* set canvas dimensions */
    var canvasHeight = ((heightInSquares - 2) * tlol.square_size);
    canvas.setAttribute("style", "display: block; width: 0px; height: 0px");
    canvas.style.width  = this.width  + "px";
    canvas.style.height = canvasHeight + "px";
    
    /* set gameInfo height*/
    gameInfoDiv.setAttribute("style", "height: " + canvasHeight + "px");

    this.currTetromino = tlol.tetrominoFactory
                             .buildRandomTetromino(this.squaresMatrix.getWidth()); 
    this.nextTetromino = tlol.tetrominoFactory
                             .buildRandomTetromino(this.squaresMatrix.getWidth()); 

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
    var rowsToDelete = this.currTetromino.getRows();
    var deletedRowsCount = this.squaresMatrix.deleteRows(rowsToDelete);
    return deletedRowsCount;
}

/* Drawing into the canvas. */

Board.prototype.gameOver = function() {
    this.drawSquares();

    var div = document.createElement('div');
    div.id = "gameover"
    div.setAttribute("style", "display: block; width: 0px; height: 0px");         
    div.style.width = this.width + "px";
    div.style.height = "200px";
    this.playField.appendChild(div);
}

/**
 * Draw, append, the squares to the canvas div.
 */
Board.prototype.drawSquares = function() {
    /*TODO: Optimization, remove and append only the squares that have moved. */

    /* Clear the canvas. */
    while(this.playField.hasChildNodes()) {
        this.playField.removeChild(this.playField.lastChild);
    }

    /* Draw board squares. */
    var squares = this.squaresMatrix.getMatrix();
    for(var col= 0; col < this.squaresMatrix.getWidth(); col++)
        this._drawSquaresArray(squares[col]);

    /* Draw falling squares. */
    this._drawSquaresArray(this.currTetromino.getSquares());
}

Board.prototype._drawSquaresArray = function(squaresArray) {
    if ( ! tlol.util.isArray(squaresArray) ) {
        return;
    }

    for (var i = 0; i < squaresArray.length; i++) {
        var square = squaresArray[i];
        if (square) {
            this.playField.appendChild(square.getDiv());
        }
    }
}

/* Generate random pieces. */

Board.prototype.useNextTetromino = function() {

    this.currTetromino = this.nextTetromino;
    this.nextTetromino = tlol.tetrominoFactory
                             .buildRandomTetromino(this.squaresMatrix.getWidth()); 

    /* Check if the tetromino can be shown on the board. */
    var newTetroPositions = this.currTetromino.getPositions();
    return this.squaresMatrix.arePositionsAvailable(newTetroPositions);
}

Board.prototype.generateRandomInitialRows = function() {
    var numFilledRows = 1;
    
    var totalSquares = this.squaresMatrix.getWidth() * numFilledRows;
    var positionsLeftEmpty = totalSquares / 2; /* use only half */
    var totalSquaresNeeded = totalSquares - positionsLeftEmpty;
    
    var xMin = 0;
    var xMax = this.squaresMatrix.getWidth()  - 1;
    
    var yMin = this.squaresMatrix.getHeight() - numFilledRows;
    var yMax = this.squaresMatrix.getHeight() - 1;
    
    for(var i = 0; i < totalSquaresNeeded; i++) {
        var xRnd = Math.floor(Math.random() * ((xMax - xMin) + 1)) + xMin;
        var yRnd = Math.floor(Math.random() * ((yMax - yMin) + 1)) + yMin;
        var tSpec = tlol.tetrominoFactory.buildRandomTetrominoSpec();
        var square = tlol.squareFactory.buildSquare(xRnd, yRnd, tSpec.cssClass);
        this.squaresMatrix.insertSquare(square);
    }
}

/* Setters and Getters. */

Board.prototype.insertTetromino = function(tetromino) {
    this.squaresMatrix.insertTetromino(tetromino);
}

Board.prototype.getWidth = function() {
    return parseInt(this.playField.style.width);
}

Board.prototype.getHeight = function() {
    return parseInt(this.playField.style.height);
}

Board.prototype.getCurrentTetromino = function() {
    return this.currTetromino;
}

Board.prototype.getNextTetromino = function() {
    return this.nextTetromino;
}

/* EOF */

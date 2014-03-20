
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
    var simulatedPositions = this.currTetromino
                                 .getNextPositionCoords(movDirection);
    var isValidMovement = this.squaresMatrix
                              .arePositionsAvailable(simulatedPositions);
    if ( isValidMovement ) {
        this.currTetromino.move(movDirection);
    }
    return isValidMovement;
}

/** 
 * Find and delete any rows that are complete. 
 *
 * Also, upper squares that are left hanging will fall until they collide 
 * with another square.
 *
 * return - The number of rows that were complete and deleted at the moment of
 *          invocation.
 */
Board.prototype.deleteCompletedRows = function() {
    var candidateRows = this.currTetromino.getRows();

    var lowerRowNum = Math.max.apply(Math, candidateRows);
    var completedRows = this.squaresMatrix.findCompletedRows(lowerRowNum);
    var squares = this.squaresMatrix.getRowsSquares(completedRows);
    this.deleteAndPackSquares(completedRows, squares);

    var deletedRowsCount = completedRows.length;
    return deletedRowsCount;
}

/**
 * squares - An array of Squares.
 */
Board.prototype.deleteAndPackSquares = function(completedRows, squares) {
    function animateSquares(opacity) {
        for(var i = 0; i < squares.length; i++) {
            var div = squares[i].getDiv();
            div.style.backgroundColor = "#fff"; 

            /* Change opacity */
            /* IE */ 
            div.style.opacity = "alpha(opacity=" + opacity + ")";       
            /* Other browsers */
            div.style.opacity = (opacity / 100);            
        }
    }
    var opacity = 100;
    var animationSpeed = tlol.settings.rowFadeOutSpeed;
    var squaresMatrix = this.squaresMatrix;
    var timerId = setInterval(function() {
        if ( opacity > 0 ) {
            opacity--;
            animateSquares(opacity);
        } else {
            clearInterval(timerId);
            squaresMatrix.deleteRows(completedRows);
            completedRows = completedRows.reverse();   /* order top to bottom */
            squaresMatrix.packColumns(completedRows);
        }
    }, animationSpeed);
}

/* Drawing into the canvas. */

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
        var square = tlol.squareFactory
                         .buildSquare(xRnd, yRnd, tSpec.getCSSClass());
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

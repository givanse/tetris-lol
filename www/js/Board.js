
function Board(canvasBackground, canvas) {
    var dimSettings = {
        /* Based on Tetris guidelines. */
        total_columns: 10, 
        total_rows: 20, /* visible rows only */
        screen_width: tlol.browser.getWidth(), 
        screen_height: tlol.browser.getHeight(),
        /* div#canvasFrame border width */
        border_width: {top: 14, rigth: 7, bottom: 42, left: 7},
        safety_net_width: 7, /* give room for possible unprecisions */
        square_border_w: 1
    };
    var dimensions = tlol.calculateDimensions(dimSettings);

    /* +2 rows, invisible buffer */
    dimSettings.total_rows = dimSettings.total_rows + 2;
    
    this.squaresMatrix = tlol.squareFactory
                             .buildSquaresMatrix(dimSettings.total_columns, 
                                                 dimSettings.total_rows);

    this.canvas = canvas;

    canvasBackground.setAttribute("style", 
                                  "width: 0px; height: 0px; top: 0px;");
    canvasBackground.style.width =  dimensions.canvas_width  + "px";
    canvasBackground.style.height = dimensions.canvas_height + "px";

    /* take into account the two rows tall, invisible,  buffer */
    this.canvas.setAttribute("style", "top: 0px;");
    this.canvas.style.top = "-" + ( (tlol.square_size * 2) + 
                                    (tlol.square_border_w * 2) ) + "px";

    this.currTetromino = tlol.
                         tetrominoFactory.
                         buildRandomTetromino(this.squaresMatrix.getWidth());
    this.nextTetromino = tlol.
                         tetrominoFactory.
                         buildRandomTetromino(this.squaresMatrix.getWidth());

    this.generateRandomInitialRows();
    this.drawSquares();
}

/**
 *
 * return - true if the falling shape completed the movement, false otherwise.
 */
Board.prototype.updateBoard = function(movDirection) {
    var simulatedPositions = this.currTetromino
                                 .getNextPositionCoords(movDirection);
    var isValidMovement = this.squaresMatrix
                              .arePositionsAvailable(simulatedPositions);
    if ( isValidMovement ) {
        this.currTetromino.move(movDirection);
        return true;
    }

    return false;
}

/** 
 * Find and delete the rows that are complete, if any. 
 *
 * Also, upper squares that are left hanging will fall.
 *
 * return - The number of rows that were complete and deleted at the moment of
 *          invocation.
 */
Board.prototype.deleteCompletedRows = function() {

    var candidateRows = this.currTetromino.getRows();
    var lowerRowNum = Math.max.apply(Math, candidateRows);
    var completedRows = this.squaresMatrix.findCompletedRows(lowerRowNum);

    if ( ! completedRows.length > 0 ) {
        return 0;
    }

    var squares = this.squaresMatrix.getRowsSquares(completedRows);

    for (var i = 0; i < squares.length; i++) {
       var div = squares[i].getDiv();
       div.style.backgroundColor = "#fff"; 
    }

    var squaresMatrix = this.squaresMatrix;
    tlol.squareFactory.fadeOut(squares, tlol.rowFadeOutSpeed, function () {
        squaresMatrix.deleteRows(completedRows);
        completedRows = completedRows.reverse(); /* order top to bottom */
        squaresMatrix.packColumns(completedRows);
    });

    return completedRows.length; /* The number of rows that were deleted. */
}


/* Drawing into the canvas. */

/**
 * Draw, append, the squares to the canvas div.
 */
Board.prototype.drawSquares = function() {
    /*TODO: Optimization, remove and append only the squares that have moved. */
    /* Clear the canvas. */
    while(this.canvas.hasChildNodes()) {
        this.canvas.removeChild(this.canvas.lastChild);
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
            this.canvas.appendChild(square.getDiv());
        }
    }
}

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

Board.prototype.getCurrentTetromino = function() {
    return this.currTetromino;
}

Board.prototype.getHeight = function() {
    return parseInt(this.canvas.style.height);
}

Board.prototype.getNextTetromino = function() {
    return this.nextTetromino;
}

Board.prototype.getWidth = function() {
    return parseInt(this.canvas.style.width);
}

Board.prototype.insertTetromino = function(tetromino) {
    this.squaresMatrix.insertTetromino(tetromino);
}

/* EOF */

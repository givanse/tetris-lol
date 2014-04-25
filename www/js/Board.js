/**
 *
 */
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
    this.appendSquaresBoard();
}

/**
 * After calling this function, the Tetromino is no longer falling and its
 * made part of the board.
 */
Board.prototype.appendFallingTetromino = function () {
    this.squaresMatrix.insertTetromino( this.getCurrentTetromino() );
}

Board.prototype.appendSquaresArray = function (squaresArray) {
    for (var i = 0; i < squaresArray.length; i++) {
       var square = squaresArray[i];
       if (square) {
           this.canvas.appendChild(square.getDiv());
       }
    }
}

/**
 * Draw, append, the squares to the canvas div.
 */
Board.prototype.appendSquaresBoard = function () {
    /* In case of a restart, delete everything. */
    while ( this.canvas.hasChildNodes() ) {
        this.canvas.removeChild(this.canvas.lastChild);
    }

    /* Append board squares. */
    var sqrsMtx = this.squaresMatrix.getMatrix();
    for (var col = 0; col < this.squaresMatrix.getWidth(); col++) {
        this.appendSquaresArray( sqrsMtx[col] );
    }

    /* Append falling squares. */
    this.appendSquaresArray( this.currTetromino.getSquares() );
}

/** 
 * Find and delete the rows that are complete, if any. 
 *
 * Also, upper squares that are left hanging will fall.
 *
 * return - The number of rows that were complete and deleted at the moment of
 *          invocation.
 */
Board.prototype.deleteCompletedRows = function () {

    var candidateRows = this.currTetromino.getRows();
    var lowerRowNum = Math.max.apply(Math, candidateRows);
    var completedRows = this.squaresMatrix.findCompletedRows(lowerRowNum);

    if ( ! completedRows.length > 0 ) {
        return 0;
    }

    /* Squares selected for deletion. */
    var squares = this.squaresMatrix.getRowsSquares(completedRows);

    /* make them all white */
    for (var i = 0; i < squares.length; i++) {
       var div = squares[i].getDiv();
       div.style.backgroundColor = "#fff"; 
    }

    /* animate, fade out and delete */
    var squaresMatrix = this.squaresMatrix;
    function afterFadeCallback() {
        squaresMatrix.deleteRows(completedRows);
        completedRows = completedRows.reverse(); /* order rows, top to bottom */
        squaresMatrix.packColumns(completedRows);
    }
    tlol.ui.fadeOutSqrsArr(squares, tlol.rowFadeOutTime, afterFadeCallback);

    return completedRows.length; /* The number of rows that were deleted. */
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

/**
 *
 * return - true if the falling shape completed the movement, false otherwise.
 */
Board.prototype.moveTetromino = function (movDirection) {
    var simulatedPositions = this.currTetromino
                                 .simulatePositions(movDirection);
    var isValidMovement = this.squaresMatrix
                              .arePositionsAvailable(simulatedPositions);
    if ( isValidMovement ) {
        this.currTetromino.applySimulatedPositions();
        return true;
    }

    return false;
}

Board.prototype.useNextTetromino = function() {

    this.currTetromino = this.nextTetromino;
    this.nextTetromino = tlol.tetrominoFactory
                             .buildRandomTetromino(this.squaresMatrix.getWidth()); 

    /* Append falling squares. */
    this.appendSquaresArray( this.currTetromino.getSquares() );

    /* Check if the tetromino can be shown on the board. */
    var newTetroPositions = this.currTetromino.getPositions();
    return this.squaresMatrix.arePositionsAvailable(newTetroPositions);
}

/*EOF*/

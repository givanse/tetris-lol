/**
 *
 */
function Board(canvasBackground, canvas, screen_width, screen_height) {

    this.canvas = canvas;
    var dimensions = tlol.calculateDimensions(screen_width, screen_height);

    this.canvas.setAttribute("style", "width: 0px; height: 0px; top: 0px;");
    this.canvas.style.width =  dimensions.canvas_width  + "px";
    this.canvas.style.height = dimensions.canvas_height + "px";
    /* take into account the two rows tall, invisible,  buffer */
    this.canvas.style.top = "-" + ((tlol.settings.square_size * 2) + 
                                   (tlol.settings.square_border_w * 2)) + "px";

    canvasBackground.setAttribute("style", 
                                  "width: 0px; height: 0px; top: 0px;");
    canvasBackground.style.width =  dimensions.canvas_width  + "px";
    canvasBackground.style.height = dimensions.canvas_height + "px";

    /* +2 rows, invisible buffer */
    this.squaresMatrix = tlol.
                         squareFactory.
                         buildSquaresMatrix(tlol.settings.board.total_columns, 
                                            tlol.settings.board.total_rows + 2);
    this.currTetromino = tlol.
                         tetrominoFactory.
                         buildRandomTetromino( this.squaresMatrix.getWidth() );
    this.nextTetromino = tlol.
                         tetrominoFactory.
                         buildRandomTetromino( this.squaresMatrix.getWidth() );

    this.generateRandomInitialRows();
    this.appendSquaresBoard();
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
 * Also, upper squares that are left hanging will fall.
 *
 * Note that the whole board will NOT be checked, only the rows where
 * the current tetromino is.
 *
 * return - The number of rows that were complete and deleted at the moment of
 *          invocation.
 */
Board.prototype.deleteCompletedRows = function (candidateRows) {

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
    tlol.ui.fadeOutSqrsArr(squares, 
                           tlol.settings.rowFadeOutTime, 
                           afterFadeCallback);

    return completedRows.length; /* The number of rows that were deleted. */
}

Board.prototype.generateRandomInitialRows = function () {
    'use strict';

    var numFilledRows = tlol.settings.numRowsRandomlyInit;
    var totalCols = this.squaresMatrix.getWidth();
    var totalRows = this.squaresMatrix.getHeight();
    
    var totalSquares = totalCols * numFilledRows;
    var totalSquaresUneeded = totalSquares * 
                              (1 - tlol.settings.initFillPercentagePerRow);
    
    var xMin = 0;
    var xMax = totalCols - 1;
    
    var yMin = totalRows - numFilledRows;
    var yMax = totalRows - 1;
    
    /* fill all */
    for (var i = xMin; i <= xMax; i++) {
        for (var j = yMin; j <= yMax; j++) {
            var tSpec = tlol.tetrominoFactory.buildRandomTetrominoSpec();
            var square = tlol.squareFactory
                             .buildSquare(i, j, tSpec.getCSSClass());
            this.squaresMatrix.insertSquare(square);
        }
    }

    /* remove uneeded */
    while ( totalSquaresUneeded > 0 ) {
        var xRnd = Math.floor(Math.random() * ((xMax - xMin) + 1)) + xMin;
        var yRnd = Math.floor(Math.random() * ((yMax - yMin) + 1)) + yMin;
        var pos = [[xRnd, yRnd]];
        if ( ! this.squaresMatrix.arePositionsAvailable( pos ) ) {
            this.squaresMatrix.removeSquare(xRnd, yRnd);
            totalSquaresUneeded--;
        }
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
 * After calling this function, the Tetromino is no longer falling and its
 * made part of the board.
 */
Board.prototype.insertFallingTetromino = function () {
    this.squaresMatrix.insertTetromino( this.getCurrentTetromino() );
}

/**
 *
 * return - true if the falling shape completed the movement, false otherwise.
 */
Board.prototype.moveTetromino = function (movDirection) {
    if ( movDirection === tlol.direction.DROP ) {
        var me = this;
        var canMove = true;
        intervalId = setInterval(function () {
            if ( canMove ) {
                canMove = me.moveTetromino( tlol.direction.DOWN );
            } else {
                clearInterval(intervalId);
            }
        }, tlol.settings.dropSpeedPerMov);
        return true;
    }

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

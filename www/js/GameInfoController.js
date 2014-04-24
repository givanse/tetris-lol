
function GameInfoController(scoreDiv, nextTetrominoDiv) {

    if (scoreDiv === undefined || nextTetrominoDiv === undefined) {
        throw {
            name: 'TypeError',
            message: 'GameInfoController must receive two DOM elements.'
        };
    }

    this.scoreDiv = scoreDiv;
    this.nextTetrominoDiv = nextTetrominoDiv;

    this.score = 0;

    this.tetromino = null;

    this.scoreDiv.innerHTML = "" + this.score;
}

/**
 * Called whenever a Tetromino lands.
 */
GameInfoController.prototype.increaseScore = function() {
    this.score += 10;
    this.scoreDiv.innerHTML = "" + this.score;
}

GameInfoController.prototype.addDeletedRowsScorePoints = function(deletedRowsCount) {
    /* Exponential, to reward big combos. */
    var points = (deletedRowsCount * deletedRowsCount * deletedRowsCount) * 10;
    this.score += points;
    this.scoreDiv.innerHTML = "" + this.score;
}

GameInfoController.prototype.removeNextTetromino = function() {
    if ( ! this.tetromino ) {
        return;
    }

    var squares = this.tetromino.getSquares(); 

    //for (var i = 0; i < squares.length; i++) {
    //    squares[i].getDiv().style.backgroundColor = "#004D9B";
    //}

    var me = this;
    //tlol.squareFactory.fadeOut(squares, tlol.nextTetroFadeSpeed, function() {
        while ( me.nextTetrominoDiv.hasChildNodes() ) {
            var child = me.nextTetrominoDiv.lastChild;
            me.nextTetrominoDiv.removeChild( child );
        }
    //});
}

GameInfoController.prototype.appendNextTetromino = function(nextTetromino) {
    /* TODO: review magic number, tetrominoFactory.buildRandomTetromino */
    this.tetromino = new Tetromino(3, 0, nextTetromino.getTetrominoName());
    var squares = this.tetromino.getSquares();
    for (var i = 0; i < squares.length; i++) {
        var square = squares[i];
        this.nextTetrominoDiv.appendChild(square.getDiv());
    }
}

/* EOF */

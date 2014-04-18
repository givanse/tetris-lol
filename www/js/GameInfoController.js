
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
    var points = deletedRowsCount * deletedRowsCount * deletedRowsCount * 10;
    this.score += points;
    this.scoreDiv.innerHTML = "" + this.score;
}

GameInfoController.prototype.clearNextTetromino = function(nextTetromino) {
    while ( this.nextTetrominoDiv.hasChildNodes() ) {
        var child = this.nextTetrominoDiv.lastChild;
        this.nextTetrominoDiv.removeChild( child );
    }
}

GameInfoController.prototype.drawNextTetromino = function(nextTetromino) {
    this.clearNextTetromino();

    if (! (nextTetromino instanceof Tetromino) ) {
        return;
    }

    var tetrominoName = nextTetromino.getTetrominoName();
    /* TODO: review magic number, tetrominoFactory.buildRandomTetromino */
    var baseT = new Tetromino(3, 0, tetrominoName);
    var squares = baseT.getSquares();
    var tetroWrapper = this.nextTetrominoDiv;
    for (var i = 0; i < squares.length; i++) {
        var square = squares[i];
        tetroWrapper.appendChild(square.getDiv());
    }
}

/* EOF */

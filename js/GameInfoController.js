
function GameInfoController(scoreField, nextTetrominoField) {

    if (scoreField === undefined || nextTetrominoField === undefined) {
        throw {
            name: 'TypeError',
            message: 'GameInfoController must receive two DOM elements.'
        };
    }

    this.scoreField = scoreField;
    this.nextTetrominoField = nextTetrominoField;

    this.score = 0;

    this.scoreField.innerHTML = "" + this.score;
    this.drawNextTetromino(null);
}

GameInfoController.prototype.increaseScore = function() {
    this.score += 10;
    this.scoreField.innerHTML = "" + this.score;
}

GameInfoController.prototype.addDeletedRowsScorePoints = function(deletedRowsCount) {
    /* Exponential, to reward big combos. */
    var points = deletedRowsCount * deletedRowsCount * deletedRowsCount * 10;
    this.score += points;
    this.scoreField.innerHTML = "" + this.score;
}

GameInfoController.prototype.drawNextTetromino = function(nextTetromino) {
    /* Clear the field. */
    while(this.nextTetrominoField.hasChildNodes()) {
        var child = this.nextTetrominoField.lastChild;
        this.nextTetrominoField.removeChild(child);
    }

    if(! (nextTetromino instanceof Tetromino))
        return;

    var tetrominoName = nextTetromino.getTetrominoName();
    var baseT = new Tetromino(0, 0, tetrominoName);
    var squares = baseT.getSquares();
    var tetroWrapper = this.getTWrapper(tetrominoName); 
    for(var i in squares) {
        var square = squares[i];
        tetroWrapper.appendChild(square.getDiv());
    }
    this.nextTetrominoField.appendChild(tetroWrapper);
}

GameInfoController.prototype.getTWrapper = function(tetrominoName) {
    var tetroWrapper = document.createElement('div'); 
    tetroWrapper.className = 'nextTWrapper';
    var width = null;
    var height = null;
    switch(tetrominoName) {
        case tlol.tSpec.line():
            width  = tlol.square_size * 4;
            height = tlol.square_size;
            break;
        case tlol.tSpec.square():
            width  = tlol.square_size * 2;
            height = tlol.square_size * 2;
            break;
        case tlol.tSpec.t():
        case tlol.tSpec.s_right(): case tlol.tSpec.s_left():
        case tlol.tSpec.l_right(): case tlol.tSpec.l_left():
            width  = tlol.square_size * 3;
            height = tlol.square_size * 2;
            break;
    }
    tetroWrapper.style.width  = width  + "px";                            
    tetroWrapper.style.height = height + "px";
    return tetroWrapper;
}

/* EOF */

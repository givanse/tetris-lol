/******************************************************************************
 *
 * Tetris game functions.
 *
 *****************************************************************************/

function startNewGame() {
    resetGame();

    boardController = new Board(canvas, widthInSquares, heightInSquares);
    gInfoController = new GameInfoController(scoreField, nextTetrominoField);
    
    var nextTetromino = boardController.getNextTetromino();
    gInfoController.drawNextTetromino(nextTetromino);
    
    intervalID = gameLoopService.start();
    
    if(gameoverSplash.parentNode)
        tetrisGame.removeChild(gameoverSplash);
}

/**
 * This is where all the magic happens. It is the callback passed to the
 * GameLoopService.
 *
 * It will be invoked with a wrong <this> value.
 * The <this> keyword will be set to the <window> (or <global>) object.
 * More info: developer.mozilla.org/en-US/docs/Web/API/window.setInterval
 *
 * That is why we can use th following variables (defined in index.html):
 *   gInfoController
 *   boardController
 *   intervalID
 */
function run(movementDirection) {

    movementDirection = (movementDirection == undefined) ? DOWN :
                                                           movementDirection;
    
    if(boardController == null)
        return;

    var movementPerformed = boardController.updateBoard(movementDirection);

    if(movementPerformed) {

        boardController.drawSquares();

    } else if(movementDirection == DOWN) { /* Collisioned with squares. */

        boardController.insertCurrTetromino();
        var deletedRowsCount = boardController.deleteCompletedRows();
        gInfoController.addDeletedRowsPoints(deletedRowsCount);

        /* Use the next falling Tetromino. */
        var isNextTetroValid = boardController.useNextTetromino();
        var newNextTetromino = boardController.getNextTetromino();
        gInfoController.drawNextTetromino(newNextTetromino);

        /* Check if the game is over. */
        if(isNextTetroValid) {
            gInfoController.increaseScore(); /* Keep rolling ;) */
        } else {
            gameOver();
        }
    }
}

function resetGame() {
    if(intervalID == null)
        return;

    clearInterval(intervalID);
    intervalID = null;
    
    boardController.gameOver();
    boardController = null;
    gInfoController = null;    
}

function gameOver() {
    resetGame();
    tetrisGame.appendChild(gameoverSplash);
}

/* EOF */
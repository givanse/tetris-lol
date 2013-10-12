/******************************************************************************
 *
 * Tetris game functions.
 *
 *****************************************************************************/

function startNewGame() {
    resetGame();

    BOARD_CONTROLLER = new Board(CANVAS, PLAY_FIELD, GAME_INFO, 
                                 WIDTH_IN_SQUARES, HEIGHT_IN_SQUARES + 2);
                                                 /* plus two for rows buffer */
    G_INFO_CONTROLLER = new GameInfoController(SCORE_FIELD, 
                                               NEXT_TETROMINO_FIELD);
    
    var nextTetromino = BOARD_CONTROLLER.getNextTetromino();
    G_INFO_CONTROLLER.drawNextTetromino(nextTetromino);
    
    INTERVAL_ID = GAMELOOPSERVICE.start();
    
    gameoverSplash.style.height = '0px';
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
 *   G_INFO_CONTROLLER
 *   BOARD_CONTROLLER
 *   INTERVAL_ID
 */
function run(movementDirection) {

    movementDirection = (movementDirection == undefined) ? DOWN :
                                                           movementDirection;
    
    if(BOARD_CONTROLLER == null)
        return;

    var movementPerformed = BOARD_CONTROLLER.updateBoard(movementDirection);

    if(movementPerformed) {

        BOARD_CONTROLLER.drawSquares();

    } else if(movementDirection == DOWN) { /* Collisioned with squares. */

        var currTetromino = BOARD_CONTROLLER.getCurrentTetromino();
        BOARD_CONTROLLER.insertTetromino(currTetromino);
        var deletedRowsCount = BOARD_CONTROLLER.deleteCompletedRows();
        G_INFO_CONTROLLER.addDeletedRowsScorePoints(deletedRowsCount);

        /* Use the next falling Tetromino. */
        var isNextTetroValid = BOARD_CONTROLLER.useNextTetromino();
        var newNextTetromino = BOARD_CONTROLLER.getNextTetromino();
        G_INFO_CONTROLLER.drawNextTetromino(newNextTetromino);

        /* Check if the game is over. */
        if(isNextTetroValid) {
            G_INFO_CONTROLLER.increaseScore(); /* Keep rolling ;) */
        } else {
            gameOver();
        }
    }
}

function resetGame() {
    if(INTERVAL_ID == null)
        return;

    clearInterval(INTERVAL_ID);
    INTERVAL_ID = null;
    BOARD_CONTROLLER.gameOver();
    BOARD_CONTROLLER = null;
    G_INFO_CONTROLLER = null;    
}

function gameOver() {
    resetGame();
    GAMEOVER_SPLASH.style.height = '200px';
}

/* EOF */

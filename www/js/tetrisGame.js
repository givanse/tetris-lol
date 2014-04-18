/******************************************************************************
 *
 * Tetris game singleton object.
 *
 *****************************************************************************/

tlol.tetrisGame = (function() {

    /* Gives access to the ID of the interval used by the gameLoopService. */
    var gameTimer = null;
    var boardController = null;
    var gameInfoController = null;
    /* The user hasn't lost yet and can perform actions. */
    var areGameActionsStillPossible = true;
    var dom = null;

    /**
     * This is where all the magic happens. It is the function executed by the 
     * callback passed to the gameLoopService object when the game is started in
     * function startNewGame().
     *
     */
    var run = function(movementDirection) {

        if ( ! areGameActionsStillPossible ) {
            return;
        }

        movementDirection = (movementDirection === undefined) ? 
                            tlol.direction.down : movementDirection;

        var movementPerformed = boardController.updateBoard(movementDirection);

        var currTetromino = boardController.getCurrentTetromino();

        if (movementPerformed) {
            /* tetromino descended */
            boardController.drawSquares();
        } else if ( movementDirection === tlol.direction.down ) { 

            /* tetromino collisioned with the bottom squares */
            boardController.insertTetromino(currTetromino);
            var deletedRowsCount = boardController.deleteCompletedRows();
            gameInfoController.addDeletedRowsScorePoints(deletedRowsCount);

            /* Prepare the next Tetromino. */
            var isNextTetroValid = boardController.useNextTetromino();
            //var newNextTetromino = boardController.getNextTetromino();

            /* Check if the game is over. */
            if ( isNextTetroValid ) {
                gameInfoController.increaseScore(); /* Keep rolling */

                gameInfoController.clearNextTetromino();
                return;
            } else {
                gameOver();
                
                return;
            }

        }

        var newNextTetromino = boardController.getNextTetromino();
        var numRowsDrawDelay = 2;
        if ( currTetromino.getRows()[0] > numRowsDrawDelay ) {
            // TODO: on first time do a fade in
            gameInfoController.drawNextTetromino(newNextTetromino);
        } else {
            gameInfoController.clearNextTetromino();
        }

    }; /* run */

    var startNewGame = function(newDOM, dimensions) {
        endGame();

        dom = newDOM;

        if ( ! dom ||
             ! dom.canvasBackground ||
             ! dom.canvas || 
             ! dom.nextTetrominoField ||
             ! dom.scoreField || 
             ! dom.gameoverSplash ) {
            throw {
                name: "TypeError",
                message: "A DOM element is missing."
            };
        }

        areGameActionsStillPossible = true;
        boardController = new Board(dom.canvasBackground, dom.canvas);
        gameInfoController = new GameInfoController(dom.scoreField, 
                                                    dom.nextTetrominoField);

        dom.gameoverSplash.style.display = 'none';

        tlol.gameLoopService.setGameRunCallback( run ); 
        gameTimer = tlol.gameLoopService.startLoop();
    }; /* startNewGame */

    /**
     * Changes the state of the game to finished.
     * Deal here with any variables or objects that need to be reset or changed to
     * the defaults used when a new game is started.
     */
    var endGame = function() {
        if ( ! gameTimer ) {
            return;
        }
        gameTimer.stop();
        areGameActionsStillPossible = false;
    };

    /**
     * Called when a user loses the game, it updates the state of the game and
     * updates UI elements as necessary.
     */
    var gameOver = function() {
        endGame();
        dom.gameoverSplash.style.display = 'block';
    };

    /* Public interface */
    var tetrisGame = {
        startNewGame: startNewGame
    };

    return tetrisGame;

})(); /* tetrisGame */

/* EOF */

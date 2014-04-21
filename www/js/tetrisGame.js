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
    var arePlayerActionsStillPossible = true;
    var dom = null;

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
        arePlayerActionsStillPossible = false;
    };

    /**
     * Called when a user loses the game, it updates the state of the game and
     * updates UI elements as necessary.
     */
    var gameOver = function() {
        endGame();
        dom.gameoverSplash.style.display = 'block';
    };

    /**
     * This is where all the magic happens. It is the function executed as the 
     * callback passed to the gameLoopService object when the game is started in
     * function startNewGame().
     *
     */
    var run = function (movementDirection) {

        if ( ! arePlayerActionsStillPossible ) {
            return;
        }

        movementDirection = ( movementDirection === tlol.direction.UP ||
                              movementDirection === tlol.direction.RIGHT ||
                              movementDirection === tlol.direction.LEFT ) ? 
                              movementDirection : tlol.direction.DOWN;

        var tMoveSuccessful = boardController.updateBoard(movementDirection);

        var currTetromino = boardController.getCurrentTetromino();
        var nextTetromino = boardController.getNextTetromino();

        /* up, right, down, left success */
        if ( tMoveSuccessful ) {
            boardController.drawSquares();

            var numRowsDrawDelay = 2;
            if ( currTetromino.getRows()[0] > numRowsDrawDelay ) {
                gameInfoController.clearNextTetromino();
                gameInfoController.drawNextTetromino(nextTetromino);
            }

            return;
        }

        /** 
         * Couldn't move downward anymore. The falling tetromino 
         * collisioned with the bottom line / squares.
         */
        if ( ! tMoveSuccessful &&
             movementDirection === tlol.direction.DOWN ) { 

            //gameInfoController.clearNextTetromino();

            boardController.insertTetromino(currTetromino);
            gameInfoController.increaseScore(); 
            var deletedRowsCount = boardController.deleteCompletedRows();
            gameInfoController.addDeletedRowsScorePoints(deletedRowsCount);

            /* Prepare the next Tetromino. */
            var isNextTetroValid = boardController.useNextTetromino();
            if ( ! isNextTetroValid ) {         /* Check if the game is over. */
                gameOver();
                return;
            }

            return;
        }

    }; /* run */

    var startNewGame = function(newDOM) {
        endGame();

        if ( newDOM ) {
            dom = newDOM;
        }

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

        arePlayerActionsStillPossible = true;
        boardController = new Board(dom.canvasBackground, dom.canvas);
        gameInfoController = new GameInfoController(dom.scoreField, 
                                                    dom.nextTetrominoField);

        dom.gameoverSplash.style.display = 'none';

        tlol.gameLoopService.setGameRunCallback( run ); 
        gameTimer = tlol.gameLoopService.startLoop();
    }; /* startNewGame */

    /* Public interface */
    var tetrisGame = {
        startNewGame: startNewGame
    };

    return tetrisGame;

})(); /* tetrisGame */

/* EOF */

/******************************************************************************
 *
 * Tetris game singleton object.
 *
 *****************************************************************************/

tlol.tetrisGame = (function() {

    var interval_id = null;/* The ID of the interval used by gameLoopService. */
    var board_controller = null;
    var g_info_controller = null;
    var gls = null;
    var isGameRunning = true;
    var dom = null;

    /**
     * This is where all the magic happens. It is the function executed by the 
     * callback passed to the gameLoopService object when the game is started in
     * function startNewGame().
     *
     */
    var run = function(movementDirection) {

        if ( ! isGameRunning ) {
            return;
        }

        movementDirection = (movementDirection === undefined) ? 
                            tlol.direction.down : movementDirection;

        var movementPerformed = board_controller.updateBoard(movementDirection);

        if (movementPerformed) {
            board_controller.drawSquares();
        } else if(movementDirection === tlol.direction.down) { 
            /* Collisioned with squares. */

            var currTetromino = board_controller.getCurrentTetromino();
            board_controller.insertTetromino(currTetromino);
            var deletedRowsCount = board_controller.deleteCompletedRows();
            g_info_controller.addDeletedRowsScorePoints(deletedRowsCount);

            /* Use the next falling Tetromino. */
            var isNextTetroValid = board_controller.useNextTetromino();
            var newNextTetromino = board_controller.getNextTetromino();
            g_info_controller.drawNextTetromino(newNextTetromino);

            /* Check if the game is over. */
            if(isNextTetroValid) {
                g_info_controller.increaseScore(); /* Keep rolling ;) */
            } else {
                gameOver();
            }
        }
    }; /* run */

    var resetGame = function() {
        endGame();

        if ( ! dom.canvas ||
             ! dom.playField || 
             ! dom.gameInfo || 
             ! dom.nextTetrominoField ||
             ! dom.scoreField || 
             ! dom.gameoverSplash ) {
            throw {
                name: "TypeError",
                message: "A DOM element is missing. Please use setDOM()."
            };
        }

        isGameRunning = true;
        /** 
         * Playfield is 10 cells wide and at least 22 cells tall, where 
         * rows above 20 are hidden or obstructed by the field frame.
         */
        var width = 10;
        var height = 18; /* top two are logical, added internally */
        board_controller = new Board(dom.canvas, 
                                     dom.playField, 
                                     dom.gameInfo, 
                                     width, 
                                     height + 2); /*+2 next shape buffer*/
        g_info_controller = new GameInfoController(dom.scoreField, 
                                                   dom.nextTetrominoField);
        var nextTetromino = board_controller.getNextTetromino();
        g_info_controller.drawNextTetromino(nextTetromino);

        dom.gameoverSplash.style.height = '0px';
    
        var gameRunCallback = function(movementDirection) {
            run(movementDirection);
        };

        tlol.gameLoopService.setGameRunCallback(gameRunCallback); 
        interval_id = tlol.gameLoopService.start();
    }; /* resetGame */

    /**
     * Changes the state of the game to finished.
     * Deal here with any variables or objects that need to be reset or changed to
     * the defaults used when a new game is started.
     */
    var endGame = function() {
        if ( ! interval_id ) {
            return;
        }
        clearInterval(interval_id);
        interval_id = null;
        isGameRunning = false;
    };

    /**
     * Called when a user loses the game, it updates the state of the game and
     * updates UI elements as necessary.
     */
    var gameOver = function() {
        endGame();
        dom.gameoverSplash.style.height = '200px';
    };

    /* Public interface */
    var tetrisGame = {
        startNewGame: resetGame,
        setDOM: function(newDOM) {
            dom = newDOM;
        }
    };

    return tetrisGame;

})(); /* tetrisGame */

/* EOF */

/******************************************************************************
 *
 * Tetris game singleton object.
 *
 *****************************************************************************/

tlol.tetrisGame = (function() {

    var intervalID = null;/* The ID of the interval used by gameLoopService. */
    var boardController = null;
    var gameInfoController = null;
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

        var movementPerformed = boardController.updateBoard(movementDirection);

        if (movementPerformed) {
            boardController.drawSquares();
        } else if(movementDirection === tlol.direction.down) { 
            /* Collisioned with squares. */

            var currTetromino = boardController.getCurrentTetromino();
            boardController.insertTetromino(currTetromino);
            var deletedRowsCount = boardController.deleteCompletedRows();
            gameInfoController.addDeletedRowsScorePoints(deletedRowsCount);

            /* Use the next falling Tetromino. */
            var isNextTetroValid = boardController.useNextTetromino();
            var newNextTetromino = boardController.getNextTetromino();
            gameInfoController.drawNextTetromino(newNextTetromino);

            /* Check if the game is over. */
            if(isNextTetroValid) {
                gameInfoController.increaseScore(); /* Keep rolling ;) */
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
        boardController = new Board(dom.canvas, 
                                     dom.playField, 
                                     dom.gameInfo, 
                                     width, 
                                     height + 2); /*+2 next shape buffer*/
        gameInfoController = new GameInfoController(dom.scoreField, 
                                                   dom.nextTetrominoField);
        var nextTetromino = boardController.getNextTetromino();
        gameInfoController.drawNextTetromino(nextTetromino);

        dom.gameoverSplash.style.height = '0px';
    
        var gameRunCallback = function(movementDirection) {
            run(movementDirection);
        };

        tlol.gameLoopService.setGameRunCallback(gameRunCallback); 
        intervalID = tlol.gameLoopService.start();
    }; /* resetGame */

    /**
     * Changes the state of the game to finished.
     * Deal here with any variables or objects that need to be reset or changed to
     * the defaults used when a new game is started.
     */
    var endGame = function() {
        if ( ! intervalID ) {
            return;
        }
        clearInterval(intervalID);
        intervalID = null;
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

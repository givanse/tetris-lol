/******************************************************************************
 *
 * Tetris game object.
 *
 *****************************************************************************/

tlol.tetrisGame = {

interval_id: null,         /* The ID of the interval used by gameLoopService. */
board_controller: null,
g_info_controller: null,
gls: null,
isGameRunning: true,

/* Just listing the expected properties. */
dom: {canvas: null, 
      playField: null, 
      gameInfo: null, 
      scoreField: null, 
      nextTetrominoField: null, 
      gameoverSplash: null},

/**
 * This is where all the magic happens. It is the function executed by the 
 * callback passed to the gameLoopService object when the game is started in
 * function startNewGame().
 *
 */
run: function(movementDirection) {

    if ( ! this.isGameRunning ) {
        return;
    }

    movementDirection = (movementDirection === undefined) ? 
                        tlol.direction.down : movementDirection;

    var movementPerformed = this.board_controller.updateBoard(movementDirection);

    if(movementPerformed) {

        this.board_controller.drawSquares();

    } else if(movementDirection === tlol.direction.down) { /* Collisioned with squares. */

        var currTetromino = this.board_controller.getCurrentTetromino();
        this.board_controller.insertTetromino(currTetromino);
        var deletedRowsCount = this.board_controller.deleteCompletedRows();
        this.g_info_controller.addDeletedRowsScorePoints(deletedRowsCount);

        /* Use the next falling Tetromino. */
        var isNextTetroValid = this.board_controller.useNextTetromino();
        var newNextTetromino = this.board_controller.getNextTetromino();
        this.g_info_controller.drawNextTetromino(newNextTetromino);

        /* Check if the game is over. */
        if(isNextTetroValid) {
            this.g_info_controller.increaseScore(); /* Keep rolling ;) */
        } else {
            this.gameOver();
        }
    }
},

resetGame: function() {
    this.endGame();
    this.isGameRunning = true;
    /** 
     * Playfield is 10 cells wide and at least 22 cells tall, where 
     * rows above 20 are hidden or obstructed by the field frame.
     */
    var width = 10;
    var height = 18; /* top two are logical, added internally */
    this.board_controller = new Board(this.dom.canvas, 
                                 this.dom.playField, 
                                 this.dom.gameInfo, 
                                 width, 
                                 height + 2); /*plus two for next shape buffer*/
    this.g_info_controller = new GameInfoController(this.dom.scoreField, 
                                                    this.dom.nextTetrominoField);
    var nextTetromino = this.board_controller.getNextTetromino();
    this.g_info_controller.drawNextTetromino(nextTetromino);

    this.dom.gameoverSplash.style.height = '0px';
    
    var gameRunCallBack = function(movementDirection) {
        /**
         * Error, won't work:
         *   this.run();
         * Reason:
         *   this = global; 
         * It happends when the function is called by setInterval()
         * More info: developer.mozilla.org/en-US/docs/Web/API/window.setInterval
         */
        tlol.tetrisGame.run(movementDirection);
    };

    /* singleton object, or key bindings get registered multiple times */
    this.gls = (this.gls === null) ? tlol.gameLoopService(gameRunCallBack) : 
                                     this.gls ;
    this.interval_id = this.gls.start();
},

/**
 * Changes the state of the game to finished.
 * Deal here with any variables or objects that need to be reset or changed to
 * the defaults used when a new game is started.
 */
endGame: function() {
    if ( ! this.interval_id ) {
        return;
    }
    clearInterval(this.interval_id);
    this.interval_id = null;
    this.isGameRunning = false;
},

/**
 * Called when a user loses the game, it updates the state of the game and
 * updates UI elements as necessary.
 */
gameOver: function() {
    this.endGame();
    this.dom.gameoverSplash.style.height = '200px';
},

startNewGame: function(dom) {
    this.dom = dom;
    this.resetGame();
}

}; /* tetrisGame */

/* EOF */

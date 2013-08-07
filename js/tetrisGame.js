
/*******************************************************************************
  *
  * Tetris game start up.
  *
  *****************************************************************************/

var canvas = document.getElementById("gameCanvas");
var widthInSquares = 12;
var heightInSquares = 18;
var scoreField = document.getElementById("scoreField");
var nextTetrominoField = document.getElementById("nextTetrominoField");
var gameLoopService = new GameLoopService(run);

var boardController = null;
var gInfoController = null;
var intervalID = null;

/* Start right away. */
startNewGame();


/*******************************************************************************
 *
 * Tetris game functions.
 *
 ******************************************************************************/

function startNewGame() {
    gameOver();

    boardController = new Board(canvas,
                                        widthInSquares, heightInSquares);
    gInfoController = new GameInfoController(scoreField, nextTetrominoField);
    var nextTetromino = boardController.getNextTetromino();
    gInfoController.drawNextTetromino(nextTetromino);
    intervalID = gameLoopService.start();
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
function run(movementDirection = DOWN) {

    if(boardController == null)
        return;

    var movementPerformed = boardController.updateBoard(movementDirection);

    if(movementPerformed) {
        boardController.drawSquares();
    }

    /* Collisioned with the board's squares. */
    else if(movementDirection == DOWN) {


        /* Add next falling Tetromino. */
        var isNewTetroValid = boardController.generateRandomTetromino();

        var nextTetromino = boardController.getNextTetromino();
        gInfoController.drawNextTetromino(nextTetromino);

        /* Check if the game is over. */
        if(! isNewTetroValid) {
            gameOver();
        } else {
            gInfoController.increaseScore(); /* And keep rolling ;) */
        }
    }
}

function gameOver() {
    if(intervalID == null)
        return;

    clearInterval(intervalID);
    intervalID = null;

    boardController.gameOver();
    boardController = null;

    gInfoController = null;
}

/* EOF */

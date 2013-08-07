
var canvas = document.getElementById("gameCanvas");                           
var widthInSquares = 12;                                                 
var heightInSquares = 18;                                                
var scoreField = document.getElementById("scoreField");                           
var gameLoopService = new GameLoopService(run);                             

var boardController = null;                                              
var gInfoController = null;                                              
var intervalID = null;                                                   

/* Start right away. */                                                  
startNewGame();

/* Methods: */

function startNewGame() {                                                
    gameOver();                                                          
                                                                                 
    boardController = new Board(canvas,                                  
                                        widthInSquares, heightInSquares);        
    gInfoController = new GameInfoController(scoreField);                
    intervalID = gameLoopService.start();                                
}                                                                        
                                                                                 
/**                                                                              
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
                                                                                 
        gInfoController.increaseScore();                                         
                                                                                 
        /* Add next falling Tetromino. */                                        
        var isNewTetroValid = boardController.generateRandomTetromino();         
                                                                                 
        /* Check if the game is over. */                                         
        if(! isNewTetroValid) {                                                  
            gameOver();
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

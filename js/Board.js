
function Board(canvasDiv, widthInSquares = 0, heightInSquares = 0) {

    this.squaresMatrix = new SquaresMatrix(widthInSquares, heightInSquares);

    this.canvasDiv = canvasDiv;
    this.canvasDiv.setAttribute("style",
                                "display: block; width: 0px; height: 0px");
    /* canvasDiv dimensions */
    this.width  = widthInSquares  * SQUARE_SIZE;
    this.height = heightInSquares * SQUARE_SIZE;
    /* set canvasDiv dimensions */
    this.canvasDiv.style.width  = this.width  + "px";
    this.canvasDiv.style.height = this.height + "px";

    this.currTetromino = null; 
    this.generateRandomTetromino();
    this.generateRandomInitialRows();
    this.drawSquares();
}

/**
 *
 * return - true if the falling shape performed a movement, false otherwise.
 */
Board.prototype.updateBoard = function(movDirection) {

    var newTetroPositions = this.currTetromino.getNewPositions(movDirection);

    if(!this.squaresMatrix.arePositionsAvailable(newTetroPositions))
        return false;

    this.currTetromino.move(movDirection);

    return true;
}

/* Drawing into the canvas. */

Board.prototype.gameOver = function() {
    var div = document.createElement('div');
    div.id = "gameover"
    div.setAttribute("style", "display: block; width: 0px; height: 0px");         
    div.style.width = this.width + "px";
    div.style.height = this.height / 3 + "px";
    div.innerHTML = "Defeat";
    this.canvasDiv.appendChild(div);
}

/**
 * Draw, append, the squares to the canvas div.
 */
Board.prototype.drawSquares = function() {
    /*TODO: Optimization, remove and append only the squares that have moved. */

    /* Clear the canvas. */
    while(this.canvasDiv.hasChildNodes()) {
        this.canvasDiv.removeChild(this.canvasDiv.lastChild);
    }

    /* Draw board squares. */
    var squares = this.squaresMatrix.getMatrix();
    for(var col= 0; col < this.squaresMatrix.getWidth(); col++)
        this._drawSquaresArray(squares[col]);

    /* Draw falling squares. */
    this._drawSquaresArray(this.currTetromino.getSquares());
}

Board.prototype._drawSquaresArray = function(squaresArray) {
    if(!(squaresArray instanceof Array))
        return;

    for(var i = 0; i < squaresArray.length; i++) {
        var square = squaresArray[i];
        if(square instanceof Square)
            this.canvasDiv.appendChild(square.getDiv());
    }
}

/* Generate random pieces. */

Board.prototype.generateRandomTetromino = function() {
    /* First, save the current falling shape. */
    this._insertCurrTetromino();

    var tetrominoName = getRandomTetrominoName();
    /* TODO: Tetromino uses by default a +2 offset, needs to be adressed. */
    var x = Math.floor(this.squaresMatrix.getWidth() / 2) - 1;
    var y = 0; 
    this.currTetromino = new Tetromino(x, y, tetrominoName); 

    /* Check if the tetromino can be shown on the board. */
    var newTetroPositions = this.currTetromino.getPositions();

    return this.squaresMatrix.arePositionsAvailable(newTetroPositions);
}

Board.prototype.generateRandomInitialRows = function() {
    var numFilledRows = 3;
    var positionsLeftEmpty = this.squaresMatrix.getWidth() * 1;
    var totalSquaresNeeded = (this.squaresMatrix.getWidth() * numFilledRows) -
                              positionsLeftEmpty;
    var xMin = 0;
    var xMax = this.squaresMatrix.getWidth()  - 1;
    var yMin = this.squaresMatrix.getHeight() - numFilledRows;
    var yMax = this.squaresMatrix.getHeight() - 1;
    for(var i = 0; i < totalSquaresNeeded; i++) {
        var xRnd = Math.floor(Math.random() * (xMax - xMin + 1)) + xMin;
        var yRnd = Math.floor(Math.random() * (yMax - yMin + 1)) + yMin;
        var tetrominoName = getRandomTetrominoName();
        var square = new Square(xRnd, yRnd, tetrominoName);
        this.squaresMatrix.insertSquare(square);
    }
}

/* Setters and Getters. */

Board.prototype._insertCurrTetromino = function() {
    if(this.currTetromino instanceof Tetromino) {                                
        var squares = this.currTetromino.getSquares();                           
        for(var i in squares) {                                                  
            this.insertSquare(squares[i]);                                       
        }                                                                        
    } 
}

Board.prototype.insertSquare = function(square) {
    this.squaresMatrix.insertSquare(square);
}

Board.prototype.getWidth = function() {
    return parseInt(this.canvasDiv.style.width);
}

Board.prototype.getHeight = function() {
    return parseInt(this.canvasDiv.style.height);
}

/* EOF */

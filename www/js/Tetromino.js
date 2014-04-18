/**
 *
 */

function Tetromino(xOffset, yOffset, tSpec) {

    if (! tSpec || tSpec === undefined) {
        throw {
            name: "TypeError",
            message: "Tetromino() received an empty tSpec."
        };
    }

    this.xOffset = (xOffset < 0) ? 0 : xOffset;
    this.yOffset = (yOffset < 0) ? 0 : yOffset;
    this.tSpec = tSpec;

    /* Used to select the correct base coordinates from this.tSpec */
    this.rotationIndx = 0; 

    this.squares = this.getSquares();
}

Tetromino.prototype.getSquares = function() {
    /* Guarantee the most up to date coordinates for the squares. */
    if (this.squares) {
        this.updateSquares(this.tSpec.getBaseCoords(this.rotationIndx));
    } else {
        this.squares = this.buildSquares();
    }
    return this.squares;
}

Tetromino.prototype.updateSquares = function(baseCoordinates) {
    for(var i = 0; i < this.squares.length; i++) {
        var baseCoordsPair = baseCoordinates[i];
        var x = baseCoordsPair[0] + this.xOffset;
        var y = baseCoordsPair[1] + this.yOffset;

        var square = this.squares[i];
        square.setX(x);
        square.setY(y);
    }
}

Tetromino.prototype.buildSquares = function() {

    var noxiousTrapPosition = null;
    if (this.tSpec === tlol.tSpec.square()) {
        noxiousTrapPosition = 0;
    }

    var squares = [];
    var baseCoords = this.tSpec.getBaseCoords(this.rotationIndx);
    for (var i = 0; i < baseCoords.length; i++) {

        var cssClass = (noxiousTrapPosition === i) ? tlol.cssClass.mushroom :
                                                     this.tSpec.getCSSClass();

        var baseCoordsPair = baseCoords[i];
        var x = baseCoordsPair[0] + this.xOffset;
        var y = baseCoordsPair[1] + this.yOffset;
        squares[i] = tlol.squareFactory.buildSquare(x, y, cssClass);
    }

    return squares;
}

Tetromino.prototype.getNextRotationIndx = function() {
    return (this.rotationIndx === 3) ? 0 : this.rotationIndx + 1;
}

/**
 * Returns the a list of the coordinates that the Tetromino will use if
 * the received movement direction is applied.
 */
Tetromino.prototype.getNextPositionCoords = function(movDirection) {
    var rotIndx = this.rotationIndx;
    var xOffsetIncrement = null;
    var yOffsetIncrement = null;

    switch(movDirection) {
        case tlol.direction.up: 
            /* rotate */
            rotIndx = this.getNextRotationIndx();
            xOffsetIncrement = 0;
            yOffsetIncrement = 0;
            break;
        case tlol.direction.down:
            xOffsetIncrement = 0;
            yOffsetIncrement = 1;
            break;
        case tlol.direction.right:
            xOffsetIncrement = 1;
            yOffsetIncrement = 0;
            break;
        case tlol.direction.left:
            xOffsetIncrement = -1;
            yOffsetIncrement = 0;
            break;
    }
    return this.getOffsetIncrementPosCoords(rotIndx, xOffsetIncrement, yOffsetIncrement);
}

/**
 * return - The positions of the Squares that conform this Tetromino.
 */
Tetromino.prototype.getPositions = function() {
    return this.getOffsetIncrementPosCoords(this.rotationIndx, 0, 0);
}

/**
 *
 * return - The positions of the Squares that belong to this Tetromino with
 *          an offset added to each of them.
 */
Tetromino.prototype.getOffsetIncrementPosCoords = 
function(rotIndx, xOffsetIncrement, yOffsetIncrement) {

    xOffsetIncrement = (xOffsetIncrement === undefined) ? 0 : xOffsetIncrement;
    yOffsetIncrement = (yOffsetIncrement === undefined) ? 0 : yOffsetIncrement;

    var baseCoordinates = this.tSpec.getBaseCoords(rotIndx);

    var newPosCoords = [];
    for(var i = 0; i < baseCoordinates.length; i++) {
        var coordsPair = baseCoordinates[i];

        var x = coordsPair[0];
        var y = coordsPair[1];

        var nextX = x + this.xOffset + xOffsetIncrement;
        var nextY = y + this.yOffset + yOffsetIncrement;

        newPosCoords[i] = [nextX, nextY];
    }
    return newPosCoords;
}

/**
 * Apply the received movement direction.
 */
Tetromino.prototype.move = function(movDirection) {
    switch(movDirection) {
        case    tlol.direction.up: 
            this.rotationIndx = this.getNextRotationIndx(); 
            return;
        case  tlol.direction.down: this.yOffset += 1;   return;
        case  tlol.direction.left: this.xOffset -= 1;   return;
        case tlol.direction.right: this.xOffset += 1;   return;
    }
}

Tetromino.prototype.getTetrominoName = function() {
    return this.tSpec;
}

/**
 * return - A list with the numbers of the rows being used by this Tetromino.
 *          The list is sorted from top to bottom, ex: [0, 1, 2, 3]
 */
Tetromino.prototype.getRows = function() {
    var rowNums = [];
    var coordinates = this.getPositions();
    for (var i = 0; i < coordinates.length; i++) {
        var position = coordinates[i];
        var rowNum = position[1];

        /* Don't process duplicates. */
        if ( rowNums.isDuplicate(rowNum) ) {
            continue;
        } else {
            rowNums.push(rowNum);
        }
    }
    rowNums.sort(function(a, b) { return a - b; });

    return rowNums;
}

/* EOF */

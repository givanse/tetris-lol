/**
 *
 */

function Tetromino(x, y, tSpec) {

    if (! tSpec || tSpec === undefined) {
        throw {
            name: "TypeError",
            message: "Tetromino() received an empty tSpec."
        };
    }

    this.x = (x < 0) ? 0 : x;
    this.y = (y < 0) ? 0 : y;
    this.tSpec = tSpec;

    /* Used to select the correct base coordinates from this.tSpec */
    this.rotationIndx = 0; 

    this.squares = this.buildSquares(x, y);

    this.simMovDirection = null;
    this.simulatedPositions = null;
}

Tetromino.prototype.getSquares = function() {
    return this.squares;
}

Tetromino.prototype.buildSquares = function(x, y) {

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
        var xSqr = baseCoordsPair[0] + x;
        var ySqr = baseCoordsPair[1] + y;
        squares[i] = tlol.squareFactory.buildSquare(xSqr, ySqr, cssClass);
    }

    return squares;
}

Tetromino.prototype.getNextRotationIndx = function() {
    return (this.rotationIndx === 3) ? 0 : this.rotationIndx + 1;
}

/**
 * Returns a list of the coordinates that the Tetromino will use if
 * the received movement direction is applied.
 */
Tetromino.prototype.simulatePositions = function (movDirection) {

    this.simMovDirection = movDirection;
    var newPosCoords = [];

    if ( movDirection === tlol.direction.UP ) {
        /* Simulate rotation */
        var tmpRotIndx = this.getNextRotationIndx();
        var baseCoords = this.tSpec.getBaseCoords(tmpRotIndx);

        for (var i = 0; i < baseCoords.length; i++) {
            var square = this.squares[i];

            var baseCoordsPair = baseCoords[i];
            var nextX = baseCoordsPair[0] + this.x;
            var nextY = baseCoordsPair[1] + this.y;

            newPosCoords[i] = [nextX, nextY];
        }
    } else {
        /* Simulate slide */
        var xIncrement = 0;
        var yIncrement = 0;
        switch( movDirection ) {
            case tlol.direction.DOWN:
                yIncrement = 1; break;
            case tlol.direction.RIGHT:
                xIncrement = 1; break;
            case tlol.direction.LEFT:
                xIncrement = -1; break;
        }

        for (var i = 0; i < this.squares.length; i++) {
            var square = this.squares[i];
            var nextX = square.getX() + xIncrement;
            var nextY = square.getY() + yIncrement;
            newPosCoords[i] = [nextX, nextY];
        }
    }
    this.simulatedPositions = newPosCoords;
    return this.simulatedPositions;
}

/**
 * return - The positions of the Squares that conform this Tetromino.
 */
Tetromino.prototype.getPositions = function() {
    var coordinates = [];
    for (var i = 0; i < this.squares.length; i++) {
        var square = this.squares[i];
        coordinates.push( [ square.getX(), square.getY() ] );
    }
    return coordinates;
}

/**
 * Move by applying the received positions.
 */
Tetromino.prototype.applySimulatedPositions = function () {
    switch ( this.simMovDirection ) {
        case tlol.direction.UP:
            this.rotationIndx = this.getNextRotationIndx(); break;
        case tlol.direction.DOWN:
            this.y += 1; break;
        case tlol.direction.RIGHT:
            this.x += 1; break;
        case tlol.direction.LEFT:
            this.x += -1; break;
    }
    for (var i = 0; i < this.simulatedPositions.length; i++) {
        var square = this.squares[i];
        var pos = this.simulatedPositions[i];
        square.setX( pos[0] );
        square.setY( pos[1] );
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

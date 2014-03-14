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

    /**
      * TODO: Review, the values are altered. This helps to compensate for
      *       the +2 offset used during creation in _addOffsetToCoordsPair().
      *       This goes back to the use of negative values for the
      *       baseCoordinates, which eases the rotation routine.
      */
    this.xOffset = x - 1;
    this.yOffset = y - 2;
    this.tSpec = tSpec;

    this.baseCoordinates = this.tSpec.baseCoords;
    this.squares = this.getSquares();
}

/* Calculate new positions. */

/**
 *
 * return - The positions of the Squares that belong to this Tetromino.
 */
Tetromino.prototype.getPositions = function() {
    return this._getPositions(this.squares);
}

/**
 *
 * return - The positions of the Squares that belong to this Tetromino with
 *          an offset added to each of them.
 */
Tetromino.prototype._getPositions = function(squares, xModifier, yModifier) {

    xModifier = (xModifier === undefined) ? 0 : xModifier;
    yModifier = (yModifier === undefined) ? 0 : yModifier;

    var newPositions = Array(4);
    for(var i = 0; i < 4; i++) {
        var square = squares[i];

        var x = square.getX();
        var y = square.getY();

        var nextX = square.getX() + xModifier;
        var nextY = square.getY() + yModifier;

        newPositions[i] = [nextX, nextY];
    }
    return newPositions;
}

/**
 * @coordinatesPair Is an array of two numbers, a (x, y) pair.
 */
Tetromino.prototype._addOffsetToCoordsPair = function(coordinatesPair) {

    if(coordinatesPair.length != 2)
        return;

    /* +2 to ensure that the base coords have positive values */
    var x = coordinatesPair[0] + 2;
    var y = coordinatesPair[1] + 2;

    /* add coordinates offset */
    x += this.xOffset;
    y += this.yOffset;

    var newPair = [x, y];

    return newPair;
}

Tetromino.prototype._rotateBaseCoordinates = function(baseCoords) {

    var rotatedBaseCoords = new Array(baseCoords.length);

    for(var i = 0; i < baseCoords.length; i++) {
        var coords = baseCoords[i];
        /* (-y, x) */
        var x = coords[1] * -1;
        var y = coords[0];
        rotatedBaseCoords[i] = [x, y];
    }

    return rotatedBaseCoords;
}

Tetromino.prototype._getRotatedPositions = function() {
    var coordinates = this._rotateBaseCoordinates(this.baseCoordinates);
    for(var i = 0; i < coordinates.length; i++) {
        coordinates[i] = this._addOffsetToCoordsPair(coordinates[i]);
    }

    return coordinates;
}

Tetromino.prototype.getNewPositions = function(movDirection) {
    var xModifier = 0;
    var yModifier = 0;
    switch(movDirection) {
        case tlol.direction.up: /* rotate */
            return this._getRotatedPositions();
        case tlol.direction.down:
            xModifier = 0;
            yModifier = 1;
            break;
        case tlol.direction.right:
            xModifier = 1;
            yModifier = 0;
            break;
        case tlol.direction.left:
            xModifier = -1;
            yModifier = 0;
            break;
    }
    var squares = this.getSquares();
    return this._getPositions(squares, xModifier, yModifier);
}

/* Perform movements. */

Tetromino.prototype._rotate = function() {
    this.baseCoordinates = this._rotateBaseCoordinates(this.baseCoordinates);
    return this.getSquares();
}

Tetromino.prototype.move = function(movDirection) {
    switch(movDirection) {
        case    tlol.direction.up: this._rotate(); return;
        case  tlol.direction.down: this.yOffset += 1; return;
        case  tlol.direction.left: this.xOffset -= 1; return;
        case tlol.direction.right: this.xOffset += 1; return;
    }
}

Tetromino.prototype.updateSquares = function(baseCoordinates) {
    for(var i = 0; i < this.squares.length; i++) {
        var baseCoords = baseCoordinates[i];
        var newCoords = this._addOffsetToCoordsPair(baseCoords);
        var x = newCoords[0];
        var y = newCoords[1];

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
    for(var i = 0; i < this.baseCoordinates.length; i++) {
        var baseCoords = this.baseCoordinates[i];
        var newCoords = this._addOffsetToCoordsPair(baseCoords);
        var x = newCoords[0];
        var y = newCoords[1];

        var cssClass = (noxiousTrapPosition === i) ? tlol.cssClass.mushroom :
                                                     this.tSpec.cssClass;
        squares[i] = tlol.squareFactory.buildSquare(x, y, cssClass);
    }

    return squares;
}

/* Getters and Setter. */

Tetromino.prototype.getTetrominoName = function() {
    return this.tSpec;
}

Tetromino.prototype.getSquares = function() {
    if (! this.baseCoordinates) {
        return null;
    }
    /* Guarantee the most up to date coordinates for the squares. */
    if (this.squares) {
        this.updateSquares(this.baseCoordinates);
    } else {
        this.squares = this.buildSquares();
    }
    return this.squares;
}

/**
 * return - A list with the numbers of the rows being used by this Tetromino.
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

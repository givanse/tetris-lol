/**
 * We can predict the order in which the squares array will be filled because
 * of the way we iterate. First all the squares within the first column and 
 * then all the squares in the second column and so on.
 */
test("Tetromino.getSquares", function(assert) {
    var buildSquare = tlol.squareFactory.buildSquare;

    throws(function() {
        new Tetromino(0, 0) 
    }, "Tetromino throws TypeError");

    /**
     *   -1 0 1 2
     *  1
     *  0 x x x x
     * -1
     */
    var tetromino = new Tetromino(0, 0, tlol.tSpec.line());
    var actuals = tetromino.getSquares();
    var cssClass = tlol.tSpec.line().cssClass;
    var expecteds = [buildSquare(0, 0, cssClass),
                     buildSquare(1, 0, cssClass),
                     buildSquare(2, 0, cssClass),
                     buildSquare(3, 0, cssClass)];
    assert.equalSqrArr(actuals, expecteds, "tlol.tSpec.line()");

    /**
     *   -1 0 1
     *  1 x x
     *  0 x x
     * -1
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.square());
    actuals = tetromino.getSquares();
    cssClass = tlol.tSpec.square().cssClass;
    expecteds = [buildSquare(0, 1, tlol.cssClass.mushroom),
                 buildSquare(0, 0, cssClass),
                 buildSquare(1, 1, cssClass),
                 buildSquare(1, 0, cssClass)];
    assert.equalSqrArr(actuals, expecteds, "tlol.tSpec.square()");

    /**
     *   -1 0 1
     *  1 x x x
     *  0   x
     * -1
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.t());
    actuals = tetromino.getSquares();
    cssClass = tlol.tSpec.t().cssClass;
    expecteds = [buildSquare(0, 1, cssClass),
                 buildSquare(1, 1, cssClass),
                 buildSquare(1, 0, cssClass),
                 buildSquare(2, 1, cssClass)];
    assert.equalSqrArr(actuals, expecteds, "tlol.tSpec.t()");

    /**
     *   -1 0 1
     *  1 x x
     *  0   x x
     * -1
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.s_left());
    actuals = tetromino.getSquares();
    cssClass = tlol.tSpec.s_left().cssClass;
    expecteds = [buildSquare(0, 1, cssClass),
                 buildSquare(1, 1, cssClass),
                 buildSquare(1, 0, cssClass),
                 buildSquare(2, 0, cssClass)];
    assert.equalSqrArr(actuals, expecteds, "tlol.tSpec.s_left()");

    /**
     *   -1 0 1
     *  1   x x
     *  0 x x
     * -1
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.s_right());
    actuals = tetromino.getSquares();
    cssClass = tlol.tSpec.s_right().cssClass;
    expecteds = [buildSquare(0, 0, cssClass),
                 buildSquare(1, 1, cssClass),
                 buildSquare(1, 0, cssClass),
                 buildSquare(2, 1, cssClass)];
    assert.equalSqrArr(actuals, expecteds, "tlol.tSpec.s_right()");

    /**
     *   -1 0 1
     *  1 x x x
     *  0 x 
     * -1
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.l_right());
    actuals = tetromino.getSquares();
    /* x += 1 */
    cssClass = tlol.tSpec.l_right().cssClass;
    expecteds = [buildSquare( 0, 1, cssClass),
                 buildSquare( 0, 0, cssClass),
                 buildSquare( 1, 1, cssClass),
                 buildSquare( 2, 1, cssClass)];
    assert.equalSqrArr(actuals, expecteds, "tlol.tSpec.l_right()");

    /**
     *   -1 0 1
     *  1 x x x
     *  0     x
     * -1
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.l_left());
    actuals = tetromino.getSquares();
    /* x += 1 */
    cssClass = tlol.tSpec.l_left().cssClass;
    expecteds = [buildSquare( 0, 1, cssClass),
                 buildSquare( 1, 1, cssClass),
                 buildSquare( 2, 1, cssClass),
                 buildSquare( 2, 0, cssClass)];
    assert.equalSqrArr(actuals, expecteds, "tlol.tSpec.l_left()");

    /* Tests with a random origin. */

    /**
     *   -1 0 1
     *  1   x x
     *  0 x x
     * -1
     */
    tetromino = new Tetromino(10, 10, tlol.tSpec.s_right());
    actuals = tetromino.getSquares();
    cssClass = tlol.tSpec.s_right().cssClass;
    expecteds = [buildSquare(10, 10, cssClass),
                 buildSquare(11, 11, cssClass),
                 buildSquare(11, 10, cssClass),
                 buildSquare(12, 11, cssClass)];
    assert.equalSqrArr(actuals, expecteds, "(10, 10)");

    /**
     *   -1 0 1
     *  1 x x
     *  0 x x
     * -1
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.square());
    actuals = tetromino.getSquares();
    tetromino = new Tetromino(65, 86, tlol.tSpec.square());
    actuals = tetromino.getSquares();
    cssClass = tlol.tSpec.square().cssClass;
    expecteds = [buildSquare(65, 87, tlol.cssClass.mushroom),
                 buildSquare(65, 86, cssClass),
                 buildSquare(66, 87, cssClass),
                 buildSquare(66, 86, cssClass)];
    assert.equalSqrArr(actuals, expecteds, "tlol.tSpec.square() (65, 86)");
});

test("Tetromino._getRotatedPositions", function() {

    /**
     *   -1 0 1 2
     *  1
     *  0 x x x x
     * -1
     */
    var tetromino = new Tetromino(0, 0, tlol.tSpec.line());
    var actuals = tetromino._getRotatedPositions();
    /**
     *   -1 0 1 
     *  2     x 
     *  1     x  
     *  0     x 
     * -1     x 
     */
    var expecteds = [[1, -1], [1, 0], [1, 1], [1, 2]];
    deepEqual(actuals, expecteds, "tlol.tSpec.line()");

    /**
     *   -1 0 1
     *  1 x x
     *  0 x x
     * -1
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.square());
    actuals = tetromino._getRotatedPositions();
    /**
     *   -1 0 1
     *  1 
     *  0   x x
     * -1   x x
     */
    expecteds = [[ 0, -1], [1,  -1], [ 0, 0], [1, 0]];
    deepEqual(actuals, expecteds, "tlol.tSpec.square()");

    /**
     *   -1 0 1
     *  1 x x x
     *  0   x
     * -1
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.t());
    actuals = tetromino._getRotatedPositions();
    /**
     *   -1 0 1
     *  1   x
     *  0   x x
     * -1   x
     */
    expecteds = [[ 0, -1], [ 0, 0], [1, 0], [ 0, 1]];
    deepEqual(actuals, expecteds, "tlol.tSpec.t()");

    /**
     *   -1 0 1
     *  1 x x
     *  0   x x
     * -1
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.s_left());
    actuals = tetromino._getRotatedPositions();
    /**
     *   -1 0 1
     *  1     x
     *  0   x x
     * -1   x
     */
    expecteds = [[ 0,  -1], [ 0, 0], [1, 0], [1, 1]];
    deepEqual(actuals, expecteds, "tlol.tSpec.s_left()");

    /**
     *   -1 0 1
     *  1   x x
     *  0 x x
     * -1
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.s_right());
    actuals = tetromino._getRotatedPositions();
    /**
     *   -1 0 1
     *  1   x
     *  0   x x
     * -1     x
     */
    expecteds = [[1, -1], [0, 0], [1, 0], [ 0, 1]];
    deepEqual(actuals, expecteds, "tlol.tSpec.s_right()");

    /**
     *   -1 0 1
     *  1 x x x
     *  0 x 
     * -1
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.l_right());
    actuals = tetromino._getRotatedPositions();
    /**
     *   -1 0 1
     *  1   x
     *  0   x
     * -1   x x
     */
    expecteds = [[ 0, -1], [ 1, -1], [ 0, 0], [ 0, 1]];
    deepEqual(actuals, expecteds, "tlol.tSpec.l_right()");

    /**
     *   -1 0 1
     *  1 x x x
     *  0     x
     * -1
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.l_left());
    actuals = tetromino._getRotatedPositions();
    /**
     *   -1 0 1
     *  1   x x
     *  0   x
     * -1   x
     */
    expecteds = [[0, -1], [0, 0], [ 0, 1], [1, 1]];
    deepEqual(actuals, expecteds, "tlol.tSpec.l_left()");
});

test("Tetromino._rotate", function(assert) {
    var buildSquare = tlol.squareFactory.buildSquare;

    /**
     *   -1 0 1
     *  1 x x
     *  0   x x
     * -1
     */
    var tetromino = new Tetromino(0, 0, tlol.tSpec.s_left());
    var actuals = tetromino._rotate();
    /**
     *   -1 0 1
     *  1     x 
     *  0   x x 
     * -1   x  
     */
    var cssClass = tlol.tSpec.s_left().cssClass;
    var expecteds = [buildSquare(0, -1, cssClass),
                     buildSquare(0,  0, cssClass),
                     buildSquare(1,  0, cssClass),
                     buildSquare(1,  1, cssClass)];
    assert.equalSqrArr(actuals, expecteds, "tlol.tSpec.s_left()");
    
});

test("Tetromino.getRows", function() {
    var tetromino = new Tetromino(0, 0, tlol.tSpec.line());
    var actuals = tetromino.getRows();
    var expecteds = [0];
    deepEqual(actuals, expecteds);
    
    tetromino = new Tetromino(0, 0, tlol.tSpec.square());
    actuals = tetromino.getRows();
    expecteds = [0, 1];
    deepEqual(actuals, expecteds);
    
    tetromino = new Tetromino(0, 0, tlol.tSpec.t());
    actuals = tetromino.getRows();
    expecteds = [0, 1];
    deepEqual(actuals, expecteds);
    
    tetromino = new Tetromino(5, 6, tlol.tSpec.s_right());
    actuals = tetromino.getRows();
    expecteds = [6, 7];
    deepEqual(actuals, expecteds);
    
    tetromino = new Tetromino(7, 8, tlol.tSpec.s_left());
    actuals = tetromino.getRows();
    expecteds = [8, 9];
    deepEqual(actuals, expecteds);
    
    tetromino = new Tetromino(55, 66, tlol.tSpec.l_right());
    actuals = tetromino.getRows();
    expecteds = [66, 67];
    deepEqual(actuals, expecteds);
    
    tetromino = new Tetromino(77, 88, tlol.tSpec.l_left());
    actuals = tetromino.getRows();
    expecteds = [88, 89];
    deepEqual(actuals, expecteds);
    
    /* After rotation */
    
    tetromino = new Tetromino(0, 0, tlol.tSpec.line());
    tetromino.move(tlol.direction.up);
    actuals = tetromino.getRows();
    expecteds = [-1, 0, 1, 2];
    deepEqual(actuals, expecteds, "tlol.tSpec.line() rotated (0, 0)");

    tetromino = new Tetromino(4, 8, tlol.tSpec.line());
    tetromino.move(tlol.direction.up);
    actuals = tetromino.getRows();
    expecteds = [7, 8, 9, 10];
    deepEqual(actuals, expecteds, "tlol.tSpec.line() rotated (4, 8)");
    
    tetromino = new Tetromino(0, 0, tlol.tSpec.square());
    tetromino.move(tlol.direction.up);
    actuals = tetromino.getRows();
    expecteds = [-1, 0];
    deepEqual(actuals, expecteds);
    
    tetromino = new Tetromino(0, 0, tlol.tSpec.t());
    tetromino.move(tlol.direction.up);
    actuals = tetromino.getRows();
    expecteds = [-1, 0, 1];
    deepEqual(actuals, expecteds, "tlol.tSpec.t() rotated");
    
    tetromino = new Tetromino(5, 6, tlol.tSpec.s_right());
    tetromino.move(tlol.direction.up);
    actuals = tetromino.getRows();
    expecteds = [5, 6, 7];
    deepEqual(actuals, expecteds);
    
    tetromino = new Tetromino(7, 8, tlol.tSpec.s_left());
    tetromino.move(tlol.direction.up);
    actuals = tetromino.getRows();
    expecteds = [7, 8, 9];
    deepEqual(actuals, expecteds);
    
    tetromino = new Tetromino(55, 66, tlol.tSpec.l_right());
    tetromino.move(tlol.direction.up);
    actuals = tetromino.getRows();
    expecteds = [65, 66, 67];
    deepEqual(actuals, expecteds);
    
    tetromino = new Tetromino(77, 88, tlol.tSpec.l_left());
    tetromino.move(tlol.direction.up);
    actuals = tetromino.getRows();
    expecteds = [87, 88, 89];
    deepEqual(actuals, expecteds);    
});
    
/* EOF */

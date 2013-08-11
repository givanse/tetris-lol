
/**
 * We can predict the order in which the squares array will be filled because
 * of the way we iterate. First all the squares within the first column and then
 * all the squares in the second column and so on.
 */
test("Tetromino.getSquares", function() {
    var tetromino = new Tetromino(0, 0);
    var actuals = tetromino.getSquares();
    var expecteds = null;
    equal(actuals, expecteds);

    /**
     *   -1 0 1 2
     *  1
     *  0 x x x x
     * -1
     */
    tetromino = new Tetromino(0, 0, LINESHP);
    actuals = tetromino.getSquares();
    expecteds = [new Square(0, 0, LINESHP),
                 new Square(1, 0, LINESHP),
                 new Square(2, 0, LINESHP),
                 new Square(3, 0, LINESHP)];
    deepEqual(actuals, expecteds, "LINESHP");

    /**
     *   -1 0 1
     *  1 x x
     *  0 x x
     * -1
     */
    tetromino = new Tetromino(0, 0, SQUARESHP);
    actuals = tetromino.getSquares();
    expecteds = [new Square(0, 1, SQUARESHP),
                 new Square(0, 0, SQUARESHP),
                 new Square(1, 1, SQUARESHP),
                 new Square(1, 0, SQUARESHP)];
    deepEqual(actuals, expecteds, "SQUARESHP");

    /**
     *   -1 0 1
     *  1 x x x
     *  0   x
     * -1
     */
    tetromino = new Tetromino(0, 0, TSHP);
    actuals = tetromino.getSquares();
    expecteds = [new Square(0, 1, TSHP),
                 new Square(1, 1, TSHP),
                 new Square(1, 0, TSHP),
                 new Square(2, 1, TSHP)];
    deepEqual(actuals, expecteds, "TSHP");

    /**
     *   -1 0 1
     *  1 x x
     *  0   x x
     * -1
     */
    tetromino = new Tetromino(0, 0, SSHP_L);
    actuals = tetromino.getSquares();
    expecteds = [new Square(0, 1, SSHP_L),
                 new Square(1, 1, SSHP_L),
                 new Square(1, 0, SSHP_L),
                 new Square(2, 0, SSHP_L)];
    deepEqual(actuals, expecteds, "SSHP_L");

    /**
     *   -1 0 1
     *  1   x x
     *  0 x x
     * -1
     */
    tetromino = new Tetromino(0, 0, SSHP_R);
    actuals = tetromino.getSquares();
    expecteds = [new Square(0, 0, SSHP_R),
                 new Square(1, 1, SSHP_R),
                 new Square(1, 0, SSHP_R),
                 new Square(2, 1, SSHP_R)];
    deepEqual(actuals, expecteds, "SSHP_R");

    /**
     *   -1 0 1
     *  1 x
     *  0 x x x
     * -1
     */
    tetromino = new Tetromino(0, 0, LSHP_R);
    actuals = tetromino.getSquares();
    expecteds = [new Square(0, 1, LSHP_R),
                 new Square(0, 0, LSHP_R),
                 new Square(1, 0, LSHP_R),
                 new Square(2, 0, LSHP_R)];
    deepEqual(actuals, expecteds, "LSHP_R");

    /**
     *   -1 0 1
     *  1     x
     *  0 x x x
     * -1
     */
    tetromino = new Tetromino(0, 0, LSHP_L);
    actuals = tetromino.getSquares();
    expecteds = [new Square(0, 0, LSHP_L),
                 new Square(1, 0, LSHP_L),
                 new Square(2, 1, LSHP_L),
                 new Square(2, 0, LSHP_L)];
    deepEqual(actuals, expecteds, "LSHP_L");

    /* Tests with a random origin. */

    /**
     *   -1 0 1
     *  1   x x
     *  0 x x
     * -1
     */
    tetromino = new Tetromino(10, 10, SSHP_R);
    actuals = tetromino.getSquares();
    expecteds = [new Square(10, 10, SSHP_R),
                 new Square(11, 11, SSHP_R),
                 new Square(11, 10, SSHP_R),
                 new Square(12, 11, SSHP_R)];
    deepEqual(actuals, expecteds, "(10, 10)");

    /**
     *   -1 0 1
     *  1 x x
     *  0 x x
     * -1
     */
    tetromino = new Tetromino(0, 0, SQUARESHP);
    actuals = tetromino.getSquares();
    tetromino = new Tetromino(65, 86, SQUARESHP);
    actuals = tetromino.getSquares();
    expecteds = [new Square(65, 87, SQUARESHP),
                 new Square(65, 86, SQUARESHP),
                 new Square(66, 87, SQUARESHP),
                 new Square(66, 86, SQUARESHP)];
    deepEqual(actuals, expecteds, "(65, 86)");
});

test("Tetromino._getRotatedPositions", function() {

    /**
     *   -1 0 1 2
     *  1
     *  0 x x x x
     * -1
     */
    var tetromino = new Tetromino(0, 0, LINESHP);
    var actuals = tetromino._getRotatedPositions();
    /**
     *   -1 0 1 
     *  2     x 
     *  1     x  
     *  0     x 
     * -1     x 
     */
    var expecteds = [[1, -1], [1, 0], [1, 1], [1, 2]];
    deepEqual(actuals, expecteds, "LINESHP");

    /**
     *   -1 0 1
     *  1 x x
     *  0 x x
     * -1
     */
    tetromino = new Tetromino(0, 0, SQUARESHP);
    actuals = tetromino._getRotatedPositions();
    /**
     *   -1 0 1
     *  1 
     *  0   x x
     * -1   x x
     */
    expecteds = [[ 0, -1], [1,  -1], [ 0, 0], [1, 0]];
    deepEqual(actuals, expecteds, "SQUARESHP");

    /**
     *   -1 0 1
     *  1 x x x
     *  0   x
     * -1
     */
    tetromino = new Tetromino(0, 0, TSHP);
    actuals = tetromino._getRotatedPositions();
    /**
     *   -1 0 1
     *  1   x
     *  0   x x
     * -1   x
     */
    expecteds = [[ 0, -1], [ 0, 0], [1, 0], [ 0, 1]];
    deepEqual(actuals, expecteds, "TSHP");

    /**
     *   -1 0 1
     *  1 x x
     *  0   x x
     * -1
     */
    tetromino = new Tetromino(0, 0, SSHP_L);
    actuals = tetromino._getRotatedPositions();
    /**
     *   -1 0 1
     *  1     x
     *  0   x x
     * -1   x
     */
    expecteds = [[ 0,  -1], [ 0, 0], [1, 0], [1, 1]];
    deepEqual(actuals, expecteds, "SSHP_L");

    /**
     *   -1 0 1
     *  1   x x
     *  0 x x
     * -1
     */
    tetromino = new Tetromino(0, 0, SSHP_R);
    actuals = tetromino._getRotatedPositions();
    /**
     *   -1 0 1
     *  1   x
     *  0   x x
     * -1     x
     */
    expecteds = [[1, -1], [0, 0], [1, 0], [ 0, 1]];
    deepEqual(actuals, expecteds, "SSHP_R");

    /**
     *   -1 0 1
     *  1 x
     *  0 x x x
     * -1
     */
    tetromino = new Tetromino(0, 0, LSHP_R);
    actuals = tetromino._getRotatedPositions();
    /**
     *   -1 0 1
     *  1     x
     *  0     x
     * -1   x x
     */
    expecteds = [[ 0, -1], [ 1, -1], [ 1, 0], [ 1, 1]];
    deepEqual(actuals, expecteds, "LSHP_R");

    /**
     *   -1 0 1
     *  1     x
     *  0 x x x
     * -1
     */
    tetromino = new Tetromino(0, 0, LSHP_L);
    actuals = tetromino._getRotatedPositions();
    /**
     *   -1 0 1
     *  1   x x
     *  0     x
     * -1     x
     */
    expecteds = [[1,  -1], [1, 0], [ 0, 1], [1, 1]];
    deepEqual(actuals, expecteds, "LSHP_L");
});

test("Tetromino._rotate", function() {
    /**
     *   -1 0 1
     *  1 x x
     *  0   x x
     * -1
     */
    var tetromino = new Tetromino(0, 0, SSHP_L);
    var actuals = tetromino._rotate();
    /**
     *   -1 0 1
     *  1     x 
     *  0   x x 
     * -1   x  
     */
    var expecteds = [new Square(0, -1, SSHP_L),
                     new Square(0,  0, SSHP_L),
                     new Square(1,  0, SSHP_L),
                     new Square(1,  1, SSHP_L)];
    deepEqual(actuals, expecteds, "SSHP_L");
    
});

/* EOF */

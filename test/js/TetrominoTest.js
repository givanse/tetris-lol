
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
    /* +2 */
    expecteds = [new Square(1, 2, LINESHP),
                 new Square(2, 2, LINESHP),
                 new Square(3, 2, LINESHP),
                 new Square(4, 2, LINESHP)];
    deepEqual(actuals, expecteds, "LINESHP");

    /**
     *   -1 0 1
     *  1 x x
     *  0 x x
     * -1
     */
    tetromino = new Tetromino(0, 0, SQUARESHP);
    actuals = tetromino.getSquares();
    expecteds = [new Square(1, 3, SQUARESHP),
                 new Square(1, 2, SQUARESHP),
                 new Square(2, 3, SQUARESHP),
                 new Square(2, 2, SQUARESHP)];
    deepEqual(actuals, expecteds, "SQUARESHP");

    /**
     *   -1 0 1
     *  1 x x x
     *  0   x
     * -1
     */
    tetromino = new Tetromino(0, 0, TSHP);
    actuals = tetromino.getSquares();
    expecteds = [new Square(1, 3, TSHP),
                 new Square(2, 3, TSHP),
                 new Square(2, 2, TSHP),
                 new Square(3, 3, TSHP)];
    deepEqual(actuals, expecteds, "TSHP");

    /**
     *   -1 0 1
     *  1 x x
     *  0   x x
     * -1
     */
    tetromino = new Tetromino(0, 0, SSHP_L);
    actuals = tetromino.getSquares();
    expecteds = [new Square(1, 3, SSHP_L),
                 new Square(2, 3, SSHP_L),
                 new Square(2, 2, SSHP_L),
                 new Square(3, 2, SSHP_L)];
    deepEqual(actuals, expecteds, "SSHP_L");

    /**
     *   -1 0 1
     *  1   x x
     *  0 x x
     * -1
     */
    tetromino = new Tetromino(0, 0, SSHP_R);
    actuals = tetromino.getSquares();
    expecteds = [new Square(1, 2, SSHP_R),
                 new Square(2, 3, SSHP_R),
                 new Square(2, 2, SSHP_R),
                 new Square(3, 3, SSHP_R)];
    deepEqual(actuals, expecteds, "SSHP_R");

    /**
     *   -1 0 1
     *  1 x
     *  0 x x x
     * -1
     */
    tetromino = new Tetromino(0, 0, LSHP_R);
    actuals = tetromino.getSquares();
    expecteds = [new Square(1, 3, LSHP_R),
                 new Square(1, 2, LSHP_R),
                 new Square(2, 2, LSHP_R),
                 new Square(3, 2, LSHP_R)];
    deepEqual(actuals, expecteds, "LSHP_R");

    /**
     *   -1 0 1
     *  1     x
     *  0 x x x
     * -1
     */
    tetromino = new Tetromino(0, 0, LSHP_L);
    actuals = tetromino.getSquares();
    expecteds = [new Square(1, 2, LSHP_L),
                 new Square(2, 2, LSHP_L),
                 new Square(3, 3, LSHP_L),
                 new Square(3, 2, LSHP_L)];
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
    expecteds = [new Square(11, 12, SSHP_R),
                 new Square(12, 13, SSHP_R),
                 new Square(12, 12, SSHP_R),
                 new Square(13, 13, SSHP_R)];
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
    expecteds = [new Square(66, 89, SQUARESHP),
                 new Square(66, 88, SQUARESHP),
                 new Square(67, 89, SQUARESHP),
                 new Square(67, 88, SQUARESHP)];
    deepEqual(actuals, expecteds, "(65, 86)");
});

test("Tetromino.rotate", function() {
    /**
     *   -1 0 1
     *  1 x x
     *  0   x x
     * -1
     */
    var tetromino = new Tetromino(0, 0, SSHP_L);
    var actuals = tetromino.rotate();
    /**
     *   -1 0 1
     *  1   x  
     *  0 x x 
     * -1 x   
     */
    var expecteds = [new Square(1, 1, SSHP_L),
                     new Square(1, 2, SSHP_L),
                     new Square(2, 2, SSHP_L),
                     new Square(2, 3, SSHP_L)];
    deepEqual(actuals, expecteds, "SSHP_L");
    
});

/* EOF */

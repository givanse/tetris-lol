/**
 *
 */

test("GLOBALS", function() {

  strictEqual(SQUARE_SIZE, 32, "SQUARE_SIZE");

  strictEqual(TETROMINO_NAME.length, 7, "TETROMINOS.length");

});

test("GLOBALS TETROMINO_BASE_COORDINATES", function() {

    strictEqual(TETROMINO_BASE_COORDINATES.LINESHP.length, 4);
    strictEqual(TETROMINO_BASE_COORDINATES.SQUARESHP.length, 4);
    strictEqual(TETROMINO_BASE_COORDINATES.TSHP.length, 4);
    strictEqual(TETROMINO_BASE_COORDINATES.SSHP_R.length, 4);
    strictEqual(TETROMINO_BASE_COORDINATES.SSHP_L.length, 4);
    strictEqual(TETROMINO_BASE_COORDINATES.LSHP_R.length, 4);
    strictEqual(TETROMINO_BASE_COORDINATES.LSHP_L.length, 4);

    var actuals = TETROMINO_BASE_COORDINATES.LINESHP;
    var expecteds = [[-1, 0], [0,0], [1, 0], [2, 0]];
    deepEqual(actuals, expecteds, "LINESHP");

    /**
     *   -1 0 1
     *  1 x x
     *  0 x x
     * -1 
     */
    actuals = TETROMINO_BASE_COORDINATES.SQUARESHP;
    expecteds = [[-1, 1], [-1, 0], [0, 1], [0, 0]];
    deepEqual(actuals, expecteds, "SQUARESHP");

    /**
     *   -1 0 1
     *  1 x x x 
     *  0   x 
     * -1   
     */
    actuals = TETROMINO_BASE_COORDINATES.TSHP;
    expecteds = [[-1, 1], [0, 1], [0, 0], [1, 1]];
    deepEqual(actuals, expecteds, "TSHP");

    /**
     *   -1 0 1
     *  1   x x 
     *  0 x x 
     * -1  
     */
    actuals = TETROMINO_BASE_COORDINATES.SSHP_R;
    expecteds = [[-1, 0], [0, 1], [0, 0], [1, 0]];
    deepEqual(actuals, expecteds);

    /**
     *   -1 0 1
     *  1 x x 
     *  0   x x
     * -1  
     */
    actuals = TETROMINO_BASE_COORDINATES.SSHP_L;
    expecteds = [[-1, 1], [0, 1], [0, 0], [1, 0]];
    deepEqual(actuals, expecteds);

    /**
     *   -1 0 1
     *  1 x
     *  0 x x x
     * -1  
     */
    actuals = TETROMINO_BASE_COORDINATES.LSHP_R;
    expecteds = [[-1, 1], [-1, 0], [0, 0], [1, 0]];
    deepEqual(actuals, expecteds);

    /**
     *   -1 0 1
     *  1     x
     *  0 x x x
     * -1  
     */
    actuals = TETROMINO_BASE_COORDINATES.LSHP_L;
    expecteds = [[-1, 0], [0, 0], [1, 1], [1, 0]];
    deepEqual(actuals, expecteds);

});

/* EOF */

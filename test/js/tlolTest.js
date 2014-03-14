/**
 *
 */

test("tlol", function() {

  strictEqual(tlol.square_size, 32, "tlol.square_size");

  strictEqual(tlol.tetrominoSpecs.length, 7, "tlol.tetrominoSpecs.length");

});

test("tlol tetrominoSpecs base coordinates", function() {

    for (var i = 0; i < 7 ; i += 1) {
        strictEqual(tlol.tetrominoSpecs[i].baseCoords.length, 4);
    }

    /**
     *   -1 0 1 2
     *  1  
     *  0 x x x x
     * -1 
     */
    var actuals = tlol.tSpec.line().baseCoords;
    var expecteds = [[-1, 0], [0, 0], [1, 0], [2, 0]];
    deepEqual(actuals, expecteds, "tlol.tSpec.line");

    /**
     *   -1 0 1
     *  1 x x
     *  0 x x
     * -1 
     */
    actuals = tlol.tSpec.square().baseCoords;
    expecteds = [[-1, 1], [-1, 0], [0, 1], [0, 0]];
    deepEqual(actuals, expecteds, "tlol.tSpec.square");

    /**
     *   -1 0 1
     *  1 x x x 
     *  0   x 
     * -1   
     */
    actuals = tlol.tSpec.t().baseCoords;
    expecteds = [[-1, 1], [0, 1], [0, 0], [1, 1]];
    deepEqual(actuals, expecteds, "tlol.tSpec.t");

    /**
     *   -1 0 1
     *  1   x x 
     *  0 x x 
     * -1  
     */
    actuals = tlol.tSpec.s_right().baseCoords;
    expecteds = [[-1, 0], [0, 1], [0, 0], [1, 1]];
    deepEqual(actuals, expecteds, "tlol.tSpec.s_right");

    /**
     *   -1 0 1
     *  1 x x 
     *  0   x x
     * -1  
     */
    actuals = tlol.tSpec.s_left().baseCoords;
    expecteds = [[-1, 1], [0, 1], [0, 0], [1, 0]];
    deepEqual(actuals, expecteds, "tlol.tSpec.s_left");

    /**
     *   -1 0 1
     *  1 x x x
     *  0 x
     * -1  
     */
    actuals = tlol.tSpec.l_right().baseCoords;
    expecteds = [[-1, 1], [-1, 0], [0, 1], [1, 1]];
    deepEqual(actuals, expecteds, "tlol.tSpec.l_right");

    /**
     *   -1 0 1
     *  1 x x x  
     *  0     x
     * -1  
     */
    actuals = tlol.tSpec.l_left().baseCoords;
    expecteds = [[-1, 1], [0, 1], [1, 1], [1, 0]];
    deepEqual(actuals, expecteds, "tlol.tSpec.l_left");

});

/* EOF */

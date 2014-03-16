/**
 *
 */

test("tlol", function() {

  strictEqual(tlol.square_size, 32, "tlol.square_size is 32 pixels");

});

test("tlol tetrominoSpecs", function() {

  ok(tlol.util.isArray(tlol.tetrominoSpecs), "tlol.tetrominoSpecs is an array");

  strictEqual(tlol.tetrominoSpecs.length, 7, "tlol.tetrominoSpecs.length");

    for (var i = 0; i < 7 ; i += 1) {
        strictEqual(tlol.tetrominoSpecs[i].getBaseCoords(0).length, 4);
    }

    /**
     *    0 1 2 3
     *  0  
     *  1 x x x x
     */
    var actuals = tlol.tSpec.line().getBaseCoords(0);
    var expecteds = [[0, 1], [1, 1], [2, 1], [3, 1]];
    deepEqual(actuals, expecteds, "tlol.tSpec.line");

    /**
     *   0 1 2 
     *  0  a b
     *  1  d c
     */
    actuals = tlol.tSpec.square().getBaseCoords(0);
    expecteds = [[1, 0], [2, 0], [2, 1], [1, 1]];
    deepEqual(actuals, expecteds, "tlol.tSpec.square");

    /**
     *    0 1 2
     *  0   x  
     *  1 x x x 
     */
    actuals = tlol.tSpec.t().getBaseCoords(0);
    expecteds = [[0, 1], [1, 0], [1, 1], [2, 1]];
    deepEqual(actuals, expecteds, "tlol.tSpec.t");

    /**
     *    0 1 2
     *  0   x x 
     *  1 x x 
     */
    actuals = tlol.tSpec.s_right().getBaseCoords(0);
    expecteds = [[0, 1], [1, 0], [1, 1], [2, 0]];
    deepEqual(actuals, expecteds, "tlol.tSpec.s_right");

    /**
     *    0 1 2
     *  0 x x
     *  1   x x 
     */
    actuals = tlol.tSpec.s_left().getBaseCoords(0);
    expecteds = [[0, 0], [1, 0], [1, 1], [2, 1]];
    deepEqual(actuals, expecteds, "tlol.tSpec.s_left");

    /**
     *    0 1 2
     *  0 x 
     *  1 x x x
     */
    actuals = tlol.tSpec.l_right().getBaseCoords(0);
    expecteds = [[0, 0], [0, 1], [1, 1], [2, 1]];
    deepEqual(actuals, expecteds, "tlol.tSpec.l_right");

    /**
     *    0 1 2
     *  0     x  
     *  1 x x x
     */
    actuals = tlol.tSpec.l_left().getBaseCoords(0);
    expecteds = [[0, 1], [1, 1], [2, 0], [2, 1]];
    deepEqual(actuals, expecteds, "tlol.tSpec.l_left");

});

/* EOF */

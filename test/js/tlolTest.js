/**
 *
 */

test("tlol", function() {

  strictEqual(tlol.dimensions.square_size, 32, 
              "tlol.dimensions.square_size is 32 pixels");

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

test("tlol calculateDimensions", function() { 
    var dimSettings = {
        total_columns: 0,
        total_rows: 0,
        screen_width: 0, 
        screen_height: 0,
        border_width: {top: 0, rigth: 0, bottom: 0, left: 0},
        safety_net_width: 0,
        square_border_w: 0};
    var actuals = tlol.calculateDimensions(dimSettings);
    var expecteds = {
        //square_size: 0,
        canvas_width: 0, 
        canvas_height: 0};
    notDeepEqual(actuals, expecteds, "missing property");
    expecteds = {
        square_size: 0,
        canvas_width: 0, 
        canvas_height: 0};
    deepEqual(actuals, expecteds, "all zero");

    dimSettings = {
        total_columns: 1,
        total_rows: 1,
        screen_width: 10, 
        screen_height: 10,
        border_width: {top: 0, rigth: 0, bottom: 0, left: 0},
        safety_net_width: 0,
        square_border_w: 0};
    actuals = tlol.calculateDimensions(dimSettings);
    expecteds = {
        square_size: 10,
        canvas_width: 10, 
        canvas_height: 10};
    deepEqual(actuals, expecteds, 
              "screen 10x10, c. border 0, matrix 1x1, s. border 0, net 0");

    dimSettings = {
        total_columns: 1,
        total_rows: 1,
        screen_width: 10, 
        screen_height: 10,
        border_width: {top: 2, rigth: 2, bottom: 2, left: 2},
        safety_net_width: 0,
        square_border_w: 0};
    actuals = tlol.calculateDimensions(dimSettings);
    expecteds = {
        square_size: 6,
        canvas_width: 6, 
        canvas_height: 6};
    deepEqual(actuals, expecteds, 
              "screen 10x10, c. border 2, matrix 1x1, s. border 0, net 0");

    dimSettings = {
        total_columns: 1,
        total_rows: 1,
        screen_width: 10, 
        screen_height: 10,
        border_width: {top: 2, rigth: 2, bottom: 2, left: 2},
        safety_net_width: 0,
        square_border_w: 1};
    actuals = tlol.calculateDimensions(dimSettings);
    expecteds = {
        square_size: 4,
        canvas_width: 6, 
        canvas_height: 6};
    deepEqual(actuals, expecteds, 
              "screen 10x10, c. border 2, matrix 1x1, s. border 1, net 0");

    dimSettings = {
        total_columns: 1,
        total_rows: 1,
        screen_width: 10, 
        screen_height: 10,
        border_width: {top: 2, rigth: 2, bottom: 2, left: 2},
        safety_net_width: 1,
        square_border_w: 1};
    actuals = tlol.calculateDimensions(dimSettings);
    expecteds = {
        square_size: 2,
        canvas_width: 4, 
        canvas_height: 4};
    deepEqual(actuals, expecteds, 
              "screen 10x10, c. border 2, matrix 1x1, s. border 1, net 1");

    dimSettings = {
        total_columns: 3,
        total_rows: 2,
        screen_width: 1000, 
        screen_height: 2000,
        border_width: {top: 14, rigth: 7, bottom: 42, left: 7},
        safety_net_width: 0,
        square_border_w: 50};
    actuals = tlol.calculateDimensions(dimSettings);
    expecteds = {
        square_size: 262,
        canvas_width: 986, 
        canvas_height: 674};
    deepEqual(actuals, expecteds, 
      "screen 1000x2000, c. border 14,7,42,7, matrix 3x2, s. border 50, net 0");

    dimSettings = {
        total_columns: 10,
        total_rows: 20,
        screen_width: 1023, 
        screen_height: 994,
        border_width: {top: 14, rigth: 7, bottom: 42, left: 7},
        safety_net_width: 14,
        square_border_w: 1};
    actuals = tlol.calculateDimensions(dimSettings);
    expecteds = {
        square_size: 44,
        canvas_width: 451, 
        canvas_height: 901};
    deepEqual(actuals, expecteds, 
     "screen 1023x994, c. border 14,7,42,7, matrix 10x20, s. border 1, net 14");
});

/* EOF */

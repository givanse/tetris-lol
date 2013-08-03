/**
 *
 */

test("invertMatrixRows", function() {
    /* 1x1 */
    var matrix = [7];
    var actuals = invertMatrixRows(matrix);
    var expecteds = [7];
    deepEqual(actuals, expecteds);

    /* 2x1 */
    var matrix = [[7], [9]];
    var actuals = invertMatrixRows(matrix);
    var expecteds = [[7], [9]];
    deepEqual(actuals, expecteds);

    /* 1x2 */
    var matrix = [[4, 1]];
    var actuals = invertMatrixRows(matrix);
    var expecteds = [[1, 4]];
    deepEqual(actuals, expecteds);

    /* 2x2 */
    var matrix = [[9, 3], [0, 1]];
    var actuals = invertMatrixRows(matrix);
    var expecteds = [[3, 9], [1, 0]];
    deepEqual(actuals, expecteds);

    /* 2x2 */
    var matrix = [new Array(2), new Array(2)];
    matrix[0][0] = 8;
    matrix[1][1] = 6;
    var actuals = invertMatrixRows(matrix);
    var expecteds = [new Array(2), new Array(2)];
    expecteds[1][0] = 6;
    expecteds[0][1] = 8;
    deepEqual(actuals, expecteds);
});

test("transposeMatrix", function() {
    /* 1x1 */
    var matrix = [7];
    var actuals = transposeMatrix(matrix);
    var expecteds = [7];
    deepEqual(actuals, expecteds);

    /** 2x2
     *   01 
     * 0|12
     * 1|12
     */
    var matrix = [[1, 1], [2, 2]];
    var actuals = transposeMatrix(matrix);
    /**
     * 0|11
     * 1|22
     */
    var expecteds = [[1, 2], [1, 2]];
    deepEqual(actuals, expecteds);

    /* 3x3 */
    var matrix = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];
    var actuals = transposeMatrix(matrix);
    var expecteds = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    deepEqual(actuals, expecteds);

    /** 
     * 1x2
     *   0 
     * 0|4
     * 1|2
     */
    var matrix = [[4, 2]];
    var actuals = transposeMatrix(matrix);
    var expecteds = [[4, 2]];
    deepEqual(actuals, expecteds, "1x2 to 2x1");

    /** 
     * 2x1
     *   01 
     * 0|42
     */
    var matrix = [[4], [2]];
    var actuals = transposeMatrix(matrix);
    var expecteds = [[4], [2]];
    deepEqual(actuals, expecteds, "2x1 to 1x2");
});

/* EOF */

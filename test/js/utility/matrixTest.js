/**
 * Tests for ../js/utility/matrix.js
 */

test("matrix invertMatrixCols", function() {
    /* 1x1 */
    var matrix = [7];
    var actuals = invertMatrixCols(matrix);
    var expecteds = [7];
    deepEqual(actuals, expecteds);

    /**
     * 2x1
     * 7 9
     */
    matrix = [[7], [9]];
    actuals = invertMatrixCols(matrix);
    /**
     * 2x1
     * 9 7
     */
    expecteds = [[9], [7]];
    deepEqual(actuals, expecteds);

    /* 1x2 */
    matrix = [[4, 1]];
    actuals = invertMatrixCols(matrix);
    expecteds = [[4, 1]];
    deepEqual(actuals, expecteds);

    /* 2x2 */
    matrix = [[9, 3], [0, 1]];
    actuals = invertMatrixCols(matrix);
    expecteds = [[0, 1], [9, 3]];
    deepEqual(actuals, expecteds);

    /* 2x2 */
    matrix = [new Array(2), new Array(2)];
    matrix[0][0] = 8;
    matrix[1][1] = 6;
    actuals = invertMatrixCols(matrix);
    expecteds = [new Array(2), new Array(2)];
    expecteds[1][0] = 8;
    expecteds[0][1] = 6;
    deepEqual(actuals, expecteds);

    /**
     * 4x4
     *  1  5  9 13
     *  2  6 10 14
     *  3  7 11 15
     *  4  8 12 16
     */
    matrix = [[ 1,  2,  3,  4],
                  [ 5,  6,  7,  8],
                  [ 9, 10, 11, 12],
                  [13, 14, 15, 16]];
    actuals = invertMatrixCols(matrix);
    /**
     *  13  9  5  1
     *  14 10  6  2
     *  15 11  7  3
     *  16 12  8  4
     */
    expecteds = [[13, 14, 15, 16],
                     [ 9, 10, 11, 12],
                     [ 5,  6,  7,  8],
                     [ 1,  2,  3,  4]];
    deepEqual(actuals, expecteds, "4x4");
});

test("matrix transposeMatrix", function() {
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
    matrix = [[1, 1], [2, 2]];
    actuals = transposeMatrix(matrix);
    /**
     * 0|11
     * 1|22
     */
    expecteds = [[1, 2], [1, 2]];
    deepEqual(actuals, expecteds);

    /* 3x3 */
    var matrix = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];
    var actuals = transposeMatrix(matrix);
    var expecteds = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    deepEqual(actuals, expecteds);

    /**
     * 4x4
     *  1  2  3  4
     *  5  6  7  8
     *  9 10 11 12
     * 13 14 15 16
     */
    matrix = [[ 1,  5,  9, 13],
                  [ 2,  6, 10, 14],
                  [ 3,  7, 11, 15],
                  [ 4,  8, 12, 16]];
    actuals = transposeMatrix(matrix);
    /**
     *  1  5  9 13
     *  2  6 10 14
     *  3  7 11 15
     *  4  8 12 16
     */
    expecteds = [[ 1,  2,  3,  4],
                     [ 5,  6,  7,  8],
                     [ 9, 10, 11, 12],
                     [13, 14, 15, 16]];
    deepEqual(actuals, expecteds, "4x4");

    /**
     * 1x2
     *   0
     * 0|4
     * 1|2
     */
    matrix = [[4, 2]];
    actuals = transposeMatrix(matrix);
    expecteds = [[4, 2]];
    deepEqual(actuals, expecteds, "1x2 to 2x1");

    /**
     * 2x1
     *   01
     * 0|42
     */
    matrix = [[4], [2]];
    actuals = transposeMatrix(matrix);
    expecteds = [[4], [2]];
    deepEqual(actuals, expecteds, "2x1 to 1x2");
    /**
     * 1x2
     *   0
     * 0|4
     * 1|2
     */
    matrix = [[4, 2]];
    actuals = transposeMatrix(matrix);
    expecteds = [[4, 2]];
    deepEqual(actuals, expecteds, "1x2 to 2x1");

    /**
     * 2x1
     *   01
     * 0|42
     */
    matrix = [[4], [2]];
    actuals = transposeMatrix(matrix);
    expecteds = [[4], [2]];
    deepEqual(actuals, expecteds, "2x1 to 1x2");
});

test("matrix rotateMatrix", function() {
    var matrix = [1];
    var actuals = rotateMatrix(matrix);
    var expecteds = [1];
    deepEqual(actuals, expecteds);

    matrix = [7, 3];
    actuals = rotateMatrix(matrix);
    expecteds = [3, 7];
    deepEqual(actuals, expecteds, "no transpose, inverted only");

    matrix = [[7], [3]];
    actuals = rotateMatrix(matrix);
    expecteds = [[3], [7]];
    deepEqual(actuals, expecteds, "no transpose, inverted only");

    /**
     * 12
     * 34
     */
    matrix = [[1, 3], [2, 4]];
    actuals = rotateMatrix(matrix);
    /**
     * 31
     * 42
     */
    expecteds = [[3, 4], [1, 2]];
    deepEqual(actuals, expecteds);

    /**
     * 4x4
     *  1  2  3  4
     *  5  6  7  8
     *  9 10 11 12
     * 13 14 15 16
     */
    matrix = [[ 1,  5,  9, 13],
              [ 2,  6, 10, 14],
              [ 3,  7, 11, 15],
              [ 4,  8, 12, 16]];
    actuals = rotateMatrix(matrix);
    /**
     *  13  9  5  1
     *  14 10  6  2
     *  15 11  7  3
     *  16 12  8  4
     */
    expecteds = [[13, 14, 15, 16],
                 [ 9, 10, 11, 12],
                 [ 5,  6,  7,  8],
                 [ 1,  2,  3,  4]];
    deepEqual(actuals, expecteds, "4x4");

    /**
     * 011
     * 110
     * 000
     */
    matrix = [[ 0, 1, 0],
              [ 1, 1, 0],
              [ 1, 0, 0]];
    actuals = rotateMatrix(matrix);
    /**
     * 010
     * 011
     * 001
     */
    expecteds = [[ 0, 0, 0],
                 [ 1, 1, 0],
                 [ 0, 1, 1]];
    deepEqual(actuals, expecteds, "1/4 rotations");

    /**
     * 000
     * 011
     * 110
     */
    actuals = rotateMatrix(actuals);
    expecteds = [[ 0, 0, 1],
                 [ 0, 1, 1],
                 [ 0, 1, 0]];
    deepEqual(actuals, expecteds, "2/4 rotations");

    /**
     * 100
     * 110
     * 010
     */
    actuals = rotateMatrix(actuals);
    expecteds = [[ 1, 1, 0],
                 [ 0, 1, 1],
                 [ 0, 0, 0]];
    deepEqual(actuals, expecteds, "3/4 rotations");

    /**
     * 011
     * 110
     * 000
     */
    actuals = rotateMatrix(actuals);
    expecteds = matrix; 
    deepEqual(actuals, expecteds, "4/4 rotations");
});

/* EOF */

/**
 *
 *   A         E
 *   0         0
 * 0[x] 0[x] 0[ ]
 * 1[x] 1[ ] 1[x]
 *
 * Matrix notation:
 *
 *   A - stands for Actual
 *   E - stands for Expected
 *
 *   The matrix in between indicates the result of an intermediate step that
 *   is expected to be done internally by the function being tested.
 *
 */

test("SquaresMatrix constructor", function() {
    var squaresMatrix = new SquaresMatrix(0, 0);
    var expecteds = [];
    var actuals = squaresMatrix.getMatrix();
    deepEqual(actuals, expecteds, "0x0");

    squaresMatrix = new SquaresMatrix(1, 1);
    expecteds = [[null]];
    actuals = squaresMatrix.getMatrix();
    deepEqual(actuals, expecteds, "1x1 empty");

    squaresMatrix = new SquaresMatrix(2, 2);
    expecteds = [[null, null], [null, null]];
    actuals = squaresMatrix.getMatrix();
    deepEqual(actuals, expecteds, "2x2 empty");

    squaresMatrix = new SquaresMatrix(1, 2);
    expecteds = [[null, null]];
    actuals = squaresMatrix.getMatrix();
    deepEqual(actuals, expecteds, "1x2 empty");

    squaresMatrix = new SquaresMatrix(2, 1);
    expecteds = [[null], [null]];
    actuals = squaresMatrix.getMatrix();
    deepEqual(actuals, expecteds, "2x1 empty");
});

test("SquaresMatrix.insertSquare", function(assert) {
    var buildSquare = tlol.squareFactory.buildSquare;
    var cssClass = tlol.tSpec.square().getCSSClass();

    var squaresMatrix = new SquaresMatrix(2, 2);
    var expecteds = [[],[]];
    expecteds[0][0] = buildSquare(0, 0, cssClass);
    expecteds[1][0] = null;
    expecteds[0][1] = null;
    expecteds[1][1] = null;
    squaresMatrix.insertSquare(buildSquare(0, 0, cssClass));
    var actuals = squaresMatrix.getMatrix();
    assert.equalSqrArr(actuals, expecteds, "insert a square at 0,0");

    expecteds[0][0] = buildSquare(0, 0, cssClass);
    expecteds[1][0] = null;
    expecteds[0][1] = buildSquare(0, 1, cssClass);
    expecteds[1][1] = null;
    squaresMatrix.insertSquare(buildSquare(0, 1, cssClass));
    actuals = squaresMatrix.getMatrix();
    assert.equalSqrArr(actuals, expecteds, "insert a square at 0,1");

    expecteds[0][0] = buildSquare(0, 0, cssClass);
    expecteds[1][0] = buildSquare(1, 0, cssClass);
    expecteds[0][1] = buildSquare(0, 1, cssClass);
    expecteds[1][1] = null;
    squaresMatrix.insertSquare(buildSquare(1, 0, cssClass));
    actuals = squaresMatrix.getMatrix();
    assert.equalSqrArr(actuals, expecteds, "insert a square at 1,0");

    expecteds[0][0] = buildSquare(0, 0, cssClass);
    expecteds[1][0] = buildSquare(1, 0, cssClass);
    expecteds[0][1] = buildSquare(0, 1, cssClass);
    expecteds[1][1] = buildSquare(1, 1, cssClass);;
    squaresMatrix.insertSquare(buildSquare(1, 1, cssClass));
    actuals = squaresMatrix.getMatrix();
    assert.equalSqrArr(actuals, expecteds, "insert a square at 1,1");
});

test("SquaresMatrix.arePositionsAvailable", function() {
    var buildSquare = tlol.squareFactory.buildSquare;
    var cssClass = tlol.cssClass.mushroom;

    /**
     *   0
     * 0[ ]
     */
    var squaresMatrix = new SquaresMatrix(1, 1);
    var positions;
    ok( ! squaresMatrix.arePositionsAvailable(positions), "undefined");
    positions = [];
    ok( ! squaresMatrix.arePositionsAvailable(positions), "empty array");
    positions = [[-1, -1]];
    ok( ! squaresMatrix.arePositionsAvailable(positions), "coordinates -1, -1");
    positions = [[-1, 1]];
    ok( ! squaresMatrix.arePositionsAvailable(positions), "coordinates -1, 1");
    positions = [[1, -1]];
    ok( ! squaresMatrix.arePositionsAvailable(positions), "coordinates 1, -1");
    positions = [[0, 1]];
    ok( ! squaresMatrix.arePositionsAvailable(positions), "coordinates 0, 1");
    positions = [[1, 0]];
    ok( ! squaresMatrix.arePositionsAvailable(positions), "coordinates 1, 0");
    positions = [[1, 1]];
    ok( ! squaresMatrix.arePositionsAvailable(positions), "coordinates 1, 1");

    positions = [[0, 0]];
    ok( squaresMatrix.arePositionsAvailable(positions), "0, 0 available");

    squaresMatrix.insertSquare(buildSquare(0, 0, cssClass));
    ok( ! squaresMatrix.arePositionsAvailable(positions), "0, 0 unavailable");

    /**
     *   01
     * 0[x ]
     */
    squaresMatrix = new SquaresMatrix(2, 1)
                        .insertSquare(buildSquare(0, 0, cssClass));
    positions = [[0, 1]];
    ok(!squaresMatrix.arePositionsAvailable(positions), "0,1 unavailable");
    positions = [[2, 0]];
    ok(!squaresMatrix.arePositionsAvailable(positions), "0,1 unavailable");
    positions = [[0, 1]];
    ok(!squaresMatrix.arePositionsAvailable(positions), "0,1 unavailable");
    positions = [[1, 1]];
    ok(!squaresMatrix.arePositionsAvailable(positions), "0,1 unavailable");
    positions = [[1, 0]];
    ok(squaresMatrix.arePositionsAvailable(positions), "1,0 available");
    positions = [[0, 0], [1, 0]];
    ok(!squaresMatrix.arePositionsAvailable(positions), "line unavailable");
    positions = [[1, 0], [0, 0]];
    ok(!squaresMatrix.arePositionsAvailable(positions), "line unavailable");

    /**
     *   0
     * 0[x]
     * 1[x]
     */
    squaresMatrix = new SquaresMatrix(1, 2)
                        .insertSquare(buildSquare(0, 0, cssClass))
                        .insertSquare(buildSquare(0, 1, cssClass));
    positions = [[0, 0]];
    ok(!squaresMatrix.arePositionsAvailable(positions));
    positions = [[0, 1]];
    ok(!squaresMatrix.arePositionsAvailable(positions));
    positions = [[0, 0], [0, 1]];
    ok(!squaresMatrix.arePositionsAvailable(positions));
    positions = [[0, 1], [0, 0]];
    ok(!squaresMatrix.arePositionsAvailable(positions));

    /**
     *   0
     * 0[ ]
     * 1[x]
     * 2[ ]
     */
    squaresMatrix = new SquaresMatrix(1, 3)
                        .insertSquare(buildSquare(0, 1, cssClass));
    positions = [[0, 0]];
    ok(squaresMatrix.arePositionsAvailable(positions));
    positions = [[0, 1]];
    ok(!squaresMatrix.arePositionsAvailable(positions));
    positions = [[0, 2]];
    ok(squaresMatrix.arePositionsAvailable(positions));
    positions = [[0, 0], [0, 1], [0, 2]];
    ok(!squaresMatrix.arePositionsAvailable(positions));
    positions = [[0, 1], [0, 2], [0, 0]];
    ok(!squaresMatrix.arePositionsAvailable(positions));
    positions = [[0, 2], [0, 0], [0, 1]];
    ok(!squaresMatrix.arePositionsAvailable(positions));

    /**
     *   0123
     * 0[    ]
     * 1[    ]
     * 2[    ]
     * 3[    ]
     */
    squaresMatrix = new SquaresMatrix(4, 4);

    positions = [[0, 0], [0, 1], [1, 0], [1, 1]];
    ok(squaresMatrix.arePositionsAvailable(positions));

    positions = [[1, 2], [1, 3], [2, 3], [3, 3]];
    ok(squaresMatrix.arePositionsAvailable(positions));

    /* right border */
    positions = [[2, 2], [3, 2], [3, 3], [4, 2]];
    ok(!squaresMatrix.arePositionsAvailable(positions), "T out of borders");

    /* left border */
    positions = [[-1, 0], [1, 0], [2, 0], [3, 0]];
    ok(!squaresMatrix.arePositionsAvailable(positions), "line out of borders");

    /* top border */
    positions = [[1, -1], [2, -1], [0, 0], [1, 0]];
    ok(!squaresMatrix.arePositionsAvailable(positions), "S out of borders");

    /* bottom border */
    positions = [[0, 2], [1, 2], [1, 3], [1, 4]];
    ok(!squaresMatrix.arePositionsAvailable(positions), "L out of borders");
});

test("SquaresMatrix.packColumn", function(assert) {
    var buildSquare = tlol.squareFactory.buildSquare;
    var cssClass = tlol.cssClass.mushroom;

    /**
      *   A    E
      *   0    0
      * 0[ ] 0[ ]
      */
    var squaresMatrix = new SquaresMatrix(1, 1);
    var expecteds = [[null]];
    var actuals = squaresMatrix.getMatrix();

    ok(squaresMatrix.arePositionsAvailable([[0, 0]]));    
    assert.equalSqrArr(actuals, expecteds, "1x1 empty matrix");

    squaresMatrix.packColumn(0, 0);

    ok(squaresMatrix.arePositionsAvailable([[0, 0]]));    
    assert.equalSqrArr(actuals, expecteds, "1x1 empty matrix");

    /**
     *   0
     * 0[x]
     * 1[ ]
     */
    squaresMatrix = new SquaresMatrix(1, 2)
                            .insertSquare(buildSquare(0, 0, cssClass));
    squaresMatrix.packColumn(0, 1);
    expecteds = new SquaresMatrix(1, 2)
                        .insertSquare(buildSquare(0, 1, cssClass)).getMatrix();
    actuals = squaresMatrix.getMatrix();
    assert.equalSqrArr(actuals, expecteds, "single column, move one position");

    /**
     *   0
     * 0[ ]
     * 1[x]
     */
    squaresMatrix = new SquaresMatrix(1, 2)
                        .insertSquare(buildSquare(0, 1, cssClass));
    squaresMatrix.packColumn(0, 1);
    expecteds = new SquaresMatrix(1, 2)
                    .insertSquare(buildSquare(0, 1, cssClass)).getMatrix();
    actuals = squaresMatrix.getMatrix();
    assert.equalSqrArr(actuals, expecteds, "single column, move none");

    /**
     *  A E
     *  0 
     * 0x 
     * 1  x
     * 2
     */
    squaresMatrix = new SquaresMatrix(1, 3)
                        .insertSquare(buildSquare(0, 0, cssClass));
    squaresMatrix.packColumn(0, 2);
    expecteds = [[null, null, null]]; 
    expecteds[0][1] = buildSquare(0, 1, cssClass); 
    actuals = squaresMatrix.getMatrix();
    assert.equalSqrArr(actuals, expecteds, "single column, move one position");

    /**
     *   A    E
     *   0    0
     * 0[ ] 0[ ]
     * 1[x] 1[ ]
     * 2[ ] 2[x]
     */
    squaresMatrix = new SquaresMatrix(1, 3)
                        .insertSquare(buildSquare(0, 1, cssClass));
    squaresMatrix.packColumn(0, 2);
    expecteds = new SquaresMatrix(1, 3)
                    .insertSquare(buildSquare(0, 2, cssClass))
                    .getMatrix();
    actuals = squaresMatrix.getMatrix();
    assert.equalSqrArr(actuals, expecteds, "single column, move one position");

    /**
     *   0
     * 0[x]
     * 1[ ]
     * 2[x]
     */
    squaresMatrix = new SquaresMatrix(1, 3)
                        .insertSquare(buildSquare(0, 0, tlol.tSpec.square().getCSSClass()))
                        .insertSquare(buildSquare(0, 2, tlol.tSpec.line().getCSSClass()));
    squaresMatrix.packColumn(0, 2);
    expecteds = new SquaresMatrix(1, 3)
                    .insertSquare(buildSquare(0, 0, tlol.tSpec.square().getCSSClass()))
                    .insertSquare(buildSquare(0, 2, tlol.tSpec.line().getCSSClass())).getMatrix();
    actuals = squaresMatrix.getMatrix();
    assert.equalSqrArr(actuals, expecteds, "single column, move one position");

    /**
     *   0
     * 0[x]
     * 1[ ]
     * 2[ ]
     * 3[x]
     */
    squaresMatrix = new SquaresMatrix(1, 4)
                        .insertSquare(buildSquare(0, 0, tlol.tSpec.square().getCSSClass()))
                        .insertSquare(buildSquare(0, 3, tlol.tSpec.line().getCSSClass()));
    squaresMatrix.packColumn(0, 2);
    expecteds = new SquaresMatrix(1, 4)
                    .insertSquare(buildSquare(0, 1, tlol.tSpec.square().getCSSClass()))
                    .insertSquare(buildSquare(0, 3, tlol.tSpec.line().getCSSClass())).getMatrix();
    actuals = squaresMatrix.getMatrix();
    assert.equalSqrArr(actuals, expecteds, "single column, move two positions");

    /**
     *   0
     * 0[x]
     * 1[ ]
     * 2[x]
     * 3[ ]
     */
    squaresMatrix = new SquaresMatrix(1, 4)
                        .insertSquare(buildSquare(0, 0, tlol.tSpec.square().getCSSClass()))
                        .insertSquare(buildSquare(0, 2, tlol.tSpec.line().getCSSClass()));
    squaresMatrix.packColumn(0, 3);
    expecteds = new SquaresMatrix(1, 4)
                    .insertSquare(buildSquare(0, 1, tlol.tSpec.square().getCSSClass()))
                    .insertSquare(buildSquare(0, 3, tlol.tSpec.line().getCSSClass())).getMatrix();
    actuals = squaresMatrix.getMatrix();
    assert.equalSqrArr(actuals, expecteds, "single column, move two positions");

});

test("SquaresMatrix.getRowState", function() {
    var buildSquare = tlol.squareFactory.buildSquare;

    var squaresMatrix = new SquaresMatrix(0, 0);
    var expected = tlol.row.EMPTY;
    var actual = squaresMatrix.getRowState(0);
    equal(actual, expected, "0x0");

    squaresMatrix = new SquaresMatrix(1, 1);
    expected = tlol.row.EMPTY;
    actual = squaresMatrix.getRowState(0);
    equal(actual, expected, "1x1 empty");

    squaresMatrix = new SquaresMatrix(3, 1);
    expected = tlol.row.EMPTY;
    actual = squaresMatrix.getRowState(0);
    equal(actual, expected, "3x1 empty");

    var cssClass = tlol.cssClass.mushroom;

    /* [__x] */
    squaresMatrix = new SquaresMatrix(3, 1)
                        .insertSquare(buildSquare(2, 0, cssClass));
    expected = tlol.row.USED;
    actual = squaresMatrix.getRowState(0);
    equal(actual, expected, "[__x]");

    /* [_x_] */
    squaresMatrix = new SquaresMatrix(3, 1)
                        .insertSquare(buildSquare(2, 0, cssClass));
    expected = tlol.row.USED;
    actual = squaresMatrix.getRowState(0);
    equal(actual, expected, "[_x_]");

    /* [x__] */
    squaresMatrix = new SquaresMatrix(3, 1)
                        .insertSquare(buildSquare(2, 0, cssClass));
    expected = tlol.row.USED;
    actual = squaresMatrix.getRowState(0);
    equal(actual, expected, "[x__]");

    /* [xxx] */
    squaresMatrix = new SquaresMatrix(3, 1)
                        .insertSquare(buildSquare(0, 0, cssClass))
                        .insertSquare(buildSquare(1, 0, cssClass))
                        .insertSquare(buildSquare(2, 0, cssClass));
    expected = tlol.row.FULL;
    actual = squaresMatrix.getRowState(0);
    equal(actual, expected, "3 columns, full");

    /**
      * [ ]
      * [ ]
      */
    squaresMatrix = new SquaresMatrix(1, 2);
    expected = tlol.row.EMPTY;
    actual = squaresMatrix.getRowState(0);
    equal(actual, expected, "1x2 empty, row 0");

    expected = tlol.row.EMPTY;
    actual = squaresMatrix.getRowState(1);
    equal(actual, expected, "1x2 empty, row 1");

    /**
      * [x]
      * [x]
      */
    squaresMatrix = new SquaresMatrix(1, 2)
                        .insertSquare(buildSquare(0, 0, cssClass))
                        .insertSquare(buildSquare(0, 1, cssClass));
    expected = tlol.row.FULL;
    actual = squaresMatrix.getRowState(0);
    equal(actual, expected, "1x2 full, row 0");

    expected = tlol.row.FULL;
    actual = squaresMatrix.getRowState(1);
    equal(actual, expected, "1x2 full, row 1");

    /**
      *   01
      * 0 x
      * 1 xx
      * 2  x
      */
    squaresMatrix = new SquaresMatrix(2, 3)
                        .insertSquare(buildSquare(0, 0, cssClass))
                        .insertSquare(buildSquare(0, 1, cssClass))
                        .insertSquare(buildSquare(1, 1, cssClass))
                        .insertSquare(buildSquare(1, 2, cssClass));
    expected = tlol.row.USED;
    actual = squaresMatrix.getRowState(0);
    equal(actual, expected, "first row");

    expected = tlol.row.FULL;
    actual = squaresMatrix.getRowState(1);
    equal(actual, expected, "second row");

    expected = tlol.row.USED;
    actual = squaresMatrix.getRowState(2);
    equal(actual, expected, "third row");
});

test("SquaresMatrix.deleteRows", function(assert) {
    var buildSquare = tlol.squareFactory.buildSquare;
    var cssClass = tlol.cssClass.mushroom;

    /**
      *   A    E
      *   0    0
      * 0[ ] 0[ ]
      */
    var squaresMatrix = new SquaresMatrix(1, 1);

    var actual = squaresMatrix.arePositionsAvailable([[0, 0]]);
    ok(actual, "0x0 before, available");
    actual = squaresMatrix.getMatrix();
    assert.equalSqrArr(actual, [[null]]);

    squaresMatrix.deleteRows([0]);

    actual = squaresMatrix.arePositionsAvailable([[0, 0]]);
    ok(actual, "0x0 after, available");
    actual = squaresMatrix.getMatrix();
    assert.equalSqrArr(actual, [[null]]);

    /**   0
      * 0[x] 
      */
    squaresMatrix = new SquaresMatrix(1, 1)
                        .insertSquare(buildSquare(0, 0, cssClass));

    actual = squaresMatrix.arePositionsAvailable([[0, 0]]);
    ok(!actual, "0x0 before, unavailable");

    squaresMatrix.deleteRows([0]);

    actual = squaresMatrix.arePositionsAvailable([[0, 0]]);
    ok(actual, "0x0 after, available");

    /* [xx] */
    squaresMatrix = new SquaresMatrix(2, 1)
                        .insertSquare(buildSquare(0, 0, cssClass))
                        .insertSquare(buildSquare(1, 0, cssClass));

    actual = squaresMatrix.arePositionsAvailable([[0, 0], [1, 0]]);
    ok(!actual, "two cols row after, unavailable");

    squaresMatrix.deleteRows([0]);

    actual = squaresMatrix.arePositionsAvailable([[0, 0], [1, 0]]);
    ok(actual, "two cols row after, available");

    /**
      * [_]
      * [x]
      */
    squaresMatrix = new SquaresMatrix(1, 2)
                        .insertSquare(buildSquare(0, 1, cssClass));
    squaresMatrix.deleteRows([1]);
    actual = squaresMatrix.arePositionsAvailable([[0, 0], [0, 1]]);
    ok(actual);

    /**
      * [x]
      * [_]
      */
    squaresMatrix = new SquaresMatrix(1, 2)
                        .insertSquare(buildSquare(0, 0, cssClass));
    squaresMatrix.deleteRows([0]);
    actual = squaresMatrix.arePositionsAvailable([[0, 0], [0, 1]]);
    ok(actual);

    /**
      * [__]
      * [xx]
      */
    squaresMatrix = new SquaresMatrix(2, 2)
                        .insertSquare(buildSquare(0, 1, cssClass))
                        .insertSquare(buildSquare(1, 1, cssClass));
    squaresMatrix.deleteRows([1]);
    actual = squaresMatrix.arePositionsAvailable([[0, 0], [1, 0],
                                                  [0, 1], [1, 1]]);
    ok(actual);

    /**
      * [xx]
      * [__]
      */
    squaresMatrix = new SquaresMatrix(2, 2)
                        .insertSquare(buildSquare(0, 0, cssClass))
                        .insertSquare(buildSquare(1, 0, cssClass));
    squaresMatrix.deleteRows([0]);
    actual = squaresMatrix.arePositionsAvailable([[0, 0], [1, 0],
                                                  [0, 1], [1, 1]]);
    ok(actual);
});

test("SquaresMatrix.findCompletedRows", function(assert) {
    var buildSquare = tlol.squareFactory.buildSquare;
    var cssClass = tlol.cssClass.mushroom;

    /**
      *     
      *   0
      * 0[ ]
      */
    var squaresMatrix = new SquaresMatrix(1, 1);

    var actual = squaresMatrix.getMatrix();
    var expected = [[null]];
    assert.equalSqrArr(actual, expected, "1x1 empty, compare arrays");

    actual = squaresMatrix.arePositionsAvailable([[0, 0]]);
    ok(actual, "1x1 empty, (0,0) available");

    var completedRowsList = squaresMatrix.findCompletedRows(0);
    deepEqual(completedRowsList, [], "1x1 empty, 0 rows completed");

    actual = squaresMatrix.arePositionsAvailable([[0, 0]]);
    ok(actual, "1x1 empty, (0,0) available");

    actual = squaresMatrix.getMatrix();
    expected = [[null]];
    assert.equalSqrArr(actual, expected, "1x1 empty, compare arrays");

    /**
      *   
      *   0 
      * 0[x] 
      */
    squaresMatrix = new SquaresMatrix(1, 1)
                        .insertSquare(buildSquare(0, 0, cssClass));

    actual = squaresMatrix.getMatrix();
    expected = [[buildSquare(0, 0, cssClass)]];
    assert.equalSqrArr(actual, expected, "1x1 full, compare arrays");

    actual = squaresMatrix.arePositionsAvailable([[0, 0]]);
    ok(!actual, "1x1 full, (0, 0) unavailable");

    completedRowsList = squaresMatrix.findCompletedRows(0);
    deepEqual(completedRowsList, [0], "1x1 full, row completed 1");

    /**
      *      
      *   0
      * 0[ ]
      * 1[x]
      */
    squaresMatrix = new SquaresMatrix(1, 2)
                        .insertSquare(buildSquare(0, 1, cssClass));

    actual = squaresMatrix.arePositionsAvailable([[0, 0]]);
    ok( actual, "1x2 partial (0, 0) available");
    actual = squaresMatrix.arePositionsAvailable([[0, 1]]);
    ok(!actual, "1x2 partial (0, 1) unavailable");
    actual = squaresMatrix.arePositionsAvailable([[0, 0], [0, 1]]);
    ok(!actual, "1x2 partial (0, 0)(0, 1) unavailable");
    actual = squaresMatrix.arePositionsAvailable([[0, 1], [0, 0]]);
    ok(!actual, "1x2 partial (0, 1)(0, 0) unavailable");

    completedRowsList = squaresMatrix.findCompletedRows(1);
    deepEqual(completedRowsList, [1], "1x2 partial, total rows completed 1");

    /**
      *     
      *   0 
      * 0[x]
      * 1[x]
      */
    squaresMatrix = new SquaresMatrix(1, 2)
                        .insertSquare(buildSquare(0, 0, cssClass))
                        .insertSquare(buildSquare(0, 1, cssClass));

    actual = squaresMatrix.getMatrix();
    expected = [[ buildSquare(0, 0, cssClass), 
                  buildSquare(0, 1, cssClass) ]]; 
    assert.equalSqrArr(actual, expected, "1x2 full, compare squares matrix");

    actual = squaresMatrix.arePositionsAvailable([[0, 0]]);
    ok(!actual, "1x2 full (0, 0) unavailable (top row)");
    actual = squaresMatrix.arePositionsAvailable([[0, 1]]);
    ok(!actual, "1x2 full (0, 1) unavailable (bottom row)");
    actual = squaresMatrix.arePositionsAvailable([[0, 0], [0, 1]]);
    ok(!actual, "1x2 full (0, 0)(0, 1) whole column unavailable");
    actual = squaresMatrix.arePositionsAvailable([[0, 1], [0, 0]]);
    ok(!actual, "1x2 full (0, 1)(0, 0) whole column unavailable");

    /* one row deleted triggers the process of packing and deleting upper rows*/
    completedRowsList = squaresMatrix.findCompletedRows(1);
    deepEqual(completedRowsList, [1, 0], "1x2 full, total rows completed 2");

    /**   
      *      
      *    01
      * 0 [xx]
      * 1 [xx]
      */
    squaresMatrix = new SquaresMatrix(2, 2)
                        .insertSquare(buildSquare(0, 0, cssClass))
                        .insertSquare(buildSquare(0, 1, cssClass))
                        .insertSquare(buildSquare(1, 0, cssClass))
                        .insertSquare(buildSquare(1, 1, cssClass));

    actual = squaresMatrix.getMatrix();
    expected = [[ buildSquare(0, 0, cssClass), buildSquare(0, 1, cssClass) ],
                [ buildSquare(1, 0, cssClass), buildSquare(1, 1, cssClass) ]]; 
    assert.equalSqrArr(actual, expected, "2x2 full, compare squares matrix");

    actual = squaresMatrix
             .arePositionsAvailable([[0, 0]]);
    ok(!actual, "2x2 (0,0) unavailable");
    actual = squaresMatrix
             .arePositionsAvailable([[1, 0]]);
    ok(!actual, "2x2 (1,0) unavailable");
    actual = squaresMatrix
             .arePositionsAvailable([[0, 1]]);
    ok(!actual, "2x2 (0,1) unavailable");
    actual = squaresMatrix
             .arePositionsAvailable([[1, 1]]);
    ok(!actual, "2x2 (1,1) unavailable");

    /* one row deleted triggers the process of packing and deleting upper rows*/
    completedRowsList = squaresMatrix.findCompletedRows(1);
    deepEqual(completedRowsList, [1, 0], "2x2 total rows completed 2");

    /**
      * 0[x ]
      * 1[ x]
      * 2[xx]
      */
    squaresMatrix = new SquaresMatrix(2, 3)
                        .insertSquare(buildSquare(0, 0, cssClass))
                        .insertSquare(buildSquare(1, 1, cssClass))
                        .insertSquare(buildSquare(0, 2, cssClass))
                        .insertSquare(buildSquare(1, 2, cssClass));

    actual = squaresMatrix.arePositionsAvailable([[1, 0], [0, 1]]);
    ok(actual, "2x3 before, available positions");

    completedRowsList = squaresMatrix.findCompletedRows(2);
    deepEqual(completedRowsList, [2], "2x3 total rows completed 1");

    /**
      * 0[ x]
      * 1[xx]
      * 2[xx]
      * 3[x ]
      */
    squaresMatrix = new SquaresMatrix(2, 4)
                        .insertSquare(buildSquare(1, 0, cssClass))
                        .insertSquare(buildSquare(0, 1, cssClass))
                        .insertSquare(buildSquare(1, 1, cssClass))
                        .insertSquare(buildSquare(0, 2, cssClass))
                        .insertSquare(buildSquare(1, 2, cssClass))
                        .insertSquare(buildSquare(0, 3, cssClass));
    actual = squaresMatrix.arePositionsAvailable([[0, 0], [1, 3]]);
    ok(actual, "2x4 before, (0,0) (1,3) available");

    completedRowsList = squaresMatrix.findCompletedRows(2);
    deepEqual(completedRowsList, [2, 1], "2x4 total rows completed 2");

    /**
      *   01
      * 0[  ]
      * 1[xx]
      * 2[x ]
      * 3[xx]
      * 4[  ]
      */
    squaresMatrix = new SquaresMatrix(2, 5)
                        .insertSquare(buildSquare(0, 1, cssClass))
                        .insertSquare(buildSquare(0, 2, cssClass))
                        .insertSquare(buildSquare(0, 3, cssClass))
                        .insertSquare(buildSquare(1, 1, cssClass))
                        .insertSquare(buildSquare(1, 3, cssClass));

    completedRowsList = squaresMatrix.findCompletedRows(0);
    deepEqual(completedRowsList, [], "2x5 0");

    completedRowsList = squaresMatrix.findCompletedRows(1);
    deepEqual(completedRowsList, [1], "2x5 1");

    completedRowsList = squaresMatrix.findCompletedRows(2);
    deepEqual(completedRowsList, [1], "2x5 2");

    completedRowsList = squaresMatrix.findCompletedRows(3);
    deepEqual(completedRowsList, [3, 1], "2x5 3");
});

test("SquaresMatrix.insertTetromino", function(assert) {
    var buildSquare = tlol.squareFactory.buildSquare;

    var tSpec = tlol.tSpec.line();

    /**
     *   0123
     * 0
     * # xxxx
     */
    var squaresMatrix = new SquaresMatrix(4, 1);

    var expecteds = [[null], [null], [null], [null]];
    var actuals = squaresMatrix.getMatrix();
    assert.equalSqrArr(actuals, expecteds, "tlol.tSpec.line() empty matrix"); 

    throws(function() {
               squaresMatrix.insertTetromino(new Tetromino(0, 0, tSpec))
           },
           "tlol.tSpec.line() out of bounds");

    expecteds = [[null], [null], [null], [null]];
    actuals = squaresMatrix.getMatrix();
    assert.equalSqrArr(actuals, expecteds, 
                       "insert tlol.tSpec.line(), matrix not big enough");

    /**
     *   0123
     * 0
     * 1 xxxx
     */
    squaresMatrix = new SquaresMatrix(4, 2)
                        .insertTetromino(new Tetromino(0, 0, tSpec));
    expecteds = [[null], [null], [null], [null]];
    expecteds[0][1] = buildSquare(0, 1, tSpec.getCSSClass());
    expecteds[1][1] = buildSquare(1, 1, tSpec.getCSSClass());
    expecteds[2][1] = buildSquare(2, 1, tSpec.getCSSClass());
    expecteds[3][1] = buildSquare(3, 1, tSpec.getCSSClass());
    actuals = squaresMatrix.getMatrix();
    assert.equalSqrArr(actuals, expecteds, "insert tlol.tSpec.line()");

    /**
     *   01234
     * 0
     * 1
     * 2  xxxx
     */
    tSpec = tlol.tSpec.line();
    squaresMatrix = new SquaresMatrix(5, 3)
                        .insertTetromino(new Tetromino(1, 1, tSpec));
    expecteds = [[], [], [], [], []];
    expecteds[0][0] = null;
    expecteds[0][1] = null;
    expecteds[0][2] = null;

    expecteds[1][0] = null;
    expecteds[1][1] = null;
    expecteds[1][2] = buildSquare(1, 2, tSpec.getCSSClass()); 

    expecteds[2][0] = null;
    expecteds[2][1] = null;
    expecteds[2][2] = buildSquare(2, 2, tSpec.getCSSClass());

    expecteds[3][0] = null;
    expecteds[3][1] = null;
    expecteds[3][2] = buildSquare(3, 2, tSpec.getCSSClass()); 

    expecteds[4][0] = null;
    expecteds[4][1] = null;
    expecteds[4][2] = buildSquare(4, 2, tSpec.getCSSClass());
    actuals = squaresMatrix.getMatrix();
    assert.equalSqrArr(actuals, expecteds, 
                       "insert tlol.tSpec.line() (1,1) offset");
    
    /**
     *   012
     * 0  x
     * 1 xxx
     */
    tSpec = tlol.tSpec.t();
    squaresMatrix = new SquaresMatrix(3, 2)
                        .insertTetromino(new Tetromino(0, 0, tSpec));
    expecteds = [[], [], []];
    expecteds[0][0] = null;
    expecteds[0][1] = buildSquare(0, 1, tSpec.getCSSClass());

    expecteds[1][0] = buildSquare(1, 0, tSpec.getCSSClass());
    expecteds[1][1] = buildSquare(1, 1, tSpec.getCSSClass());

    expecteds[2][0] = null;
    expecteds[2][1] = buildSquare(2, 1, tSpec.getCSSClass());

    actuals = squaresMatrix.getMatrix();
    assert.equalSqrArr(actuals, expecteds, "insert tlol.tSpec.t()");

    /**
     *   012
     * 0  ab
     * 1  dc
     */
    tSpec = tlol.tSpec.square();
    squaresMatrix = new SquaresMatrix(3, 2)
                        .insertTetromino(new Tetromino(0, 0, tSpec));
    expecteds = [[], [], []];
    expecteds[0][0] = null;
    expecteds[0][1] = null;

    expecteds[1][0] = buildSquare(1, 0, tlol.cssClass.mushroom);
    expecteds[1][1] = buildSquare(1, 1, tSpec.getCSSClass());

    expecteds[2][0] = buildSquare(2, 0, tSpec.getCSSClass());
    expecteds[2][1] = buildSquare(2, 1, tSpec.getCSSClass());

    actuals = squaresMatrix.getMatrix();
    assert.equalSqrArr(actuals, expecteds, "insert tlol.tSpec.square()");

    /**
     *   012
     * 0[   ] 
     */
    tSpec = tlol.tSpec.line();
    squaresMatrix = new SquaresMatrix(3, 1);
    try {
        squaresMatrix.insertTetromino(new Tetromino(0, 0, tSpec));
    } catch(ev) { 
        ok(ev.name, "TypeError", ev.message);
    }

});

test("SquaresMatrix.getRowsSquares", function(assert) {
    var buildSquare = tlol.squareFactory.buildSquare;
    var cssClass = tlol.cssClass.mushroom;

    /**
      *   0
      * 0[ ]
      */
    var squaresMatrix = new SquaresMatrix(1, 1);

    throws(function() {
               squaresMatrix.getRowsSquares(0);
           }, 
           "1x1 invalid number arg");

    var actual = squaresMatrix.getRowsSquares([-7]);
    var expected = [];
    assert.equalSqrArr(actual, expected, "1x1 -7");

    actual = squaresMatrix.getRowsSquares([-7, 0]);
    expected = [null];
    assert.equalSqrArr(actual, expected, "1x1 -7, 0");

    actual = squaresMatrix.getRowsSquares([0, -7]);
    expected = [null];
    assert.equalSqrArr(actual, expected, "1x1 0, -7");

    actual = squaresMatrix.getRowsSquares([0]);
    expected = [null];
    assert.equalSqrArr(actual, expected, "1x1 0");

    actual = squaresMatrix.getRowsSquares([9000]);
    expected = [];
    assert.equalSqrArr(actual, expected, "1x1 9000");

    actual = squaresMatrix.getRowsSquares([9000, 0]);
    expected = [null];
    assert.equalSqrArr(actual, expected, "1x1 rows 9000, 0");

    actual = squaresMatrix.getRowsSquares([0, 9000]);
    expected = [null];
    assert.equalSqrArr(actual, expected, "1x1 0, 9000");

    /**
      *   012
      * 0[ x ]
      * 1[x x]
      * 2[ x ]
      */
    var squaresMatrix = new SquaresMatrix(3, 3)
                        .insertSquare(buildSquare(0, 1, cssClass))
                        .insertSquare(buildSquare(1, 0, cssClass))
                        .insertSquare(buildSquare(1, 2, cssClass))
                        .insertSquare(buildSquare(2, 1, cssClass));

    var actual = squaresMatrix.getRowsSquares([0]);
    var expected = [null, 
                    buildSquare(1, 0, cssClass), 
                    null];
    assert.equalSqrArr(actual, expected, "3x3 0");

    actual = squaresMatrix.getRowsSquares([1]);
    expected = [buildSquare(0, 1, cssClass), 
                null,
                buildSquare(2, 1, cssClass)];
    assert.equalSqrArr(actual, expected, "3x3 1");

    actual = squaresMatrix.getRowsSquares([2]);
    expected = [null, 
                buildSquare(1, 2, cssClass), 
                null];
    assert.equalSqrArr(actual, expected, "3x3 2");

    actual = squaresMatrix.getRowsSquares([0, 2]);
    expected = [null, 
                buildSquare(1, 0, cssClass), 
                null,
                null,
                buildSquare(1, 2, cssClass), 
                null];
    assert.equalSqrArr(actual, expected, "3x3 0,1");

    actual = squaresMatrix.getRowsSquares([1, 2, 0]);
    expected = [
                buildSquare(0, 1, cssClass), 
                null, 
                buildSquare(2, 1, cssClass), 
                null,
                buildSquare(1, 2, cssClass), 
                null,
                null,
                buildSquare(1, 0, cssClass), 
                null];
    assert.equalSqrArr(actual, expected, "3x3 1, 2, 0");
});

test("SquaresMatrix.packColumns", function(assert) {
    var buildSquare = tlol.squareFactory.buildSquare;
    var cssClass = tlol.cssClass.mushroom;

    /**
     *  012
     * 0x x
     * 1xx
     * 2  x
     */
    squaresMatrix = new SquaresMatrix(3, 3)
                        .insertSquare(buildSquare(0, 0, cssClass))
                        .insertSquare(buildSquare(0, 1, cssClass))
                        .insertSquare(buildSquare(1, 1, cssClass))
                        .insertSquare(buildSquare(2, 0, cssClass))
                        .insertSquare(buildSquare(2, 2, cssClass));
    squaresMatrix.packColumns([0]);
    expecteds = [[null, null, null], 
                 [null, null, null], 
                 [null, null, null]]; 
    expecteds[0][0] = buildSquare(0, 0, cssClass); 
    expecteds[0][1] = buildSquare(0, 1, cssClass); 
    expecteds[1][1] = buildSquare(1, 1, cssClass); 
    expecteds[2][0] = buildSquare(2, 0, cssClass); 
    expecteds[2][2] = buildSquare(2, 2, cssClass); 
    actuals = squaresMatrix.getMatrix();
    assert.equalSqrArr(actuals, expecteds, "no column was packed");

    /**
     *  012 012
     * 0x x x
     * 1xx  xxx
     * 2  x   x
     */
    squaresMatrix = new SquaresMatrix(3, 3)
                        .insertSquare(buildSquare(0, 0, cssClass))
                        .insertSquare(buildSquare(0, 1, cssClass))
                        .insertSquare(buildSquare(1, 1, cssClass))
                        .insertSquare(buildSquare(2, 0, cssClass))
                        .insertSquare(buildSquare(2, 2, cssClass));
    squaresMatrix.packColumns([1]);
    expecteds = [[null, null, null], 
                 [null, null, null], 
                 [null, null, null]]; 
    expecteds[0][0] = buildSquare(0, 0, cssClass); 
    expecteds[0][1] = buildSquare(0, 1, cssClass); 
    expecteds[1][1] = buildSquare(1, 1, cssClass); 
    expecteds[2][1] = buildSquare(2, 1, cssClass); 
    expecteds[2][2] = buildSquare(2, 2, cssClass); 
    actuals = squaresMatrix.getMatrix();
    assert.equalSqrArr(actuals, expecteds, "one column was packed, 1");

    /**
     *  012 012
     * 0x x   x
     * 1xx  x
     * 2  x xxx
     */
    squaresMatrix = new SquaresMatrix(3, 3)
                        .insertSquare(buildSquare(0, 0, cssClass))
                        .insertSquare(buildSquare(0, 1, cssClass))
                        .insertSquare(buildSquare(1, 1, cssClass))
                        .insertSquare(buildSquare(2, 0, cssClass))
                        .insertSquare(buildSquare(2, 2, cssClass));
    squaresMatrix.packColumns([2]);
    expecteds = [[null, null, null], 
                 [null, null, null], 
                 [null, null, null]]; 
    expecteds[0][1] = buildSquare(0, 1, cssClass); 
    expecteds[0][2] = buildSquare(0, 2, cssClass); 
    expecteds[1][2] = buildSquare(1, 2, cssClass); 
    expecteds[2][0] = buildSquare(2, 0, cssClass); 
    expecteds[2][2] = buildSquare(2, 2, cssClass); 
    actuals = squaresMatrix.getMatrix();
    assert.equalSqrArr(actuals, expecteds, "one column was packed, 2");

    /**
     *  012 012
     * 0x x 
     * 1xx  x x
     * 2  x xxx
     */
    squaresMatrix = new SquaresMatrix(3, 3)
                        .insertSquare(buildSquare(0, 0, cssClass))
                        .insertSquare(buildSquare(0, 1, cssClass))
                        .insertSquare(buildSquare(1, 1, cssClass))
                        .insertSquare(buildSquare(2, 0, cssClass))
                        .insertSquare(buildSquare(2, 2, cssClass));
    squaresMatrix.packColumns([1, 2]);
    expecteds = [[null, null, null], 
                 [null, null, null], 
                 [null, null, null]]; 
    expecteds[0][1] = buildSquare(0, 1, cssClass); 
    expecteds[0][2] = buildSquare(0, 2, cssClass); 
    expecteds[1][2] = buildSquare(1, 2, cssClass); 
    expecteds[2][1] = buildSquare(2, 1, cssClass); 
    expecteds[2][2] = buildSquare(2, 2, cssClass); 
    actuals = squaresMatrix.getMatrix();
    assert.equalSqrArr(actuals, expecteds, "pack all");
});

/* EOF */

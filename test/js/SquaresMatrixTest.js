/**
 *
 */

test("SquaresMatrix constructor", function() {
    var squaresMatrix = new SquaresMatrix(2, 2);
    var expecteds = [[null, null], [null, null]];
    var actuals = squaresMatrix.getMatrix();
    deepEqual(actuals, expecteds);
});

test("SquaresMatrix.insertSquare", function() {
    var squaresMatrix = new SquaresMatrix(2, 2)
                            .insertSquare(new Square(1, 0));
    var expecteds = [[null, null], [new Square(1, 0), null]];
    var actuals = squaresMatrix.getMatrix();
    deepEqual(actuals, expecteds);

    var squaresMatrix = new SquaresMatrix(2, 2)
                            .insertSquare(new Square(1, 0));
    var expecteds = [[null, null], [new Square(1, 0), null]];
    var actuals = squaresMatrix.getMatrix();
    deepEqual(actuals, expecteds);
});

test("SquaresMatrix.arePositionsAvailable", function() {
    var squaresMatrix = new SquaresMatrix(1, 1);
    var positions;
    ok(!squaresMatrix.arePositionsAvailable(positions));
    positions = [];
    ok(!squaresMatrix.arePositionsAvailable(positions));
    positions = [[-1, -1]];
    ok(!squaresMatrix.arePositionsAvailable(positions));
    positions = [[-1, 1]];
    ok(!squaresMatrix.arePositionsAvailable(positions));
    positions = [[1, -1]];
    ok(!squaresMatrix.arePositionsAvailable(positions));
    positions = [[1, 1]];
    ok(!squaresMatrix.arePositionsAvailable(positions));
    positions = [[0, 0]];
    ok(squaresMatrix.arePositionsAvailable(positions));

    /**
     *   01
     * 0[x ]
     */
    squaresMatrix = new SquaresMatrix(2, 1)
                        .insertSquare(new Square(0, 0));
    positions = [[1, 0]];
    ok(squaresMatrix.arePositionsAvailable(positions));
    positions = [[0, 0], [1, 0]];
    ok(!squaresMatrix.arePositionsAvailable(positions));

    /**
     *   0
     * 0[ ]
     * 1[x]
     * 2[ ]
     */
    squaresMatrix = new SquaresMatrix(1, 3)
                        .insertSquare(new Square(0, 1));
    positions = [[0, 1]];
    ok(!squaresMatrix.arePositionsAvailable(positions));
    positions = [[0, 0], [0, 2]];
    ok(squaresMatrix.arePositionsAvailable(positions));
    positions = [[0, 0], [0, 1], [0, 2]];
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

test("SquaresMatrix.packColumn", function() {
    /**
     *   0
     * 0[x]
     * 1[ ]
     */
    var squaresMatrix = new SquaresMatrix(1, 2)
                            .insertSquare(new Square(0, 0));
    squaresMatrix.packColumn(0, 1);
    var expecteds = new SquaresMatrix(1, 2)
                        .insertSquare(new Square(0, 1)).getMatrix();
    var actuals = squaresMatrix.getMatrix();
    deepEqual(actuals, expecteds);

    /**
     *   0
     * 0[ ]
     * 1[x]
     */
    squaresMatrix = new SquaresMatrix(1, 2)
                        .insertSquare(new Square(0, 1));
    squaresMatrix.packColumn(0, 1);
    expecteds = new SquaresMatrix(1, 2)
                    .insertSquare(new Square(0, 1)).getMatrix();
    actuals = squaresMatrix.getMatrix();
    deepEqual(actuals, expecteds);

    /**
     *   0
     * 0[x]
     * 1[ ]
     * 2[ ]
     */
    squaresMatrix = new SquaresMatrix(1, 3)
                        .insertSquare(new Square(0, 0));
    squaresMatrix.packColumn(0, 2);
    expecteds = new SquaresMatrix(1, 3)
                    .insertSquare(new Square(0, 1)).getMatrix();
    actuals = squaresMatrix.getMatrix();
    deepEqual(actuals, expecteds);

    /**
     *   0
     * 0[ ]
     * 1[x]
     * 2[ ]
     */
    squaresMatrix = new SquaresMatrix(1, 3)
                        .insertSquare(new Square(0, 1));
    squaresMatrix.packColumn(0, 2);
    expecteds = new SquaresMatrix(1, 3)
                    .insertSquare(new Square(0, 2)).getMatrix();
    actuals = squaresMatrix.getMatrix();
    deepEqual(actuals, expecteds);

    /**
     *   0
     * 0[x]
     * 1[ ]
     * 2[x]
     */
    squaresMatrix = new SquaresMatrix(1, 3)
                        .insertSquare(new Square(0, 0, SQUARESHP))
                        .insertSquare(new Square(0, 2, LINESHP));
    squaresMatrix.packColumn(0, 2);
    expecteds = new SquaresMatrix(1, 3)
                    .insertSquare(new Square(0, 0, SQUARESHP))
                    .insertSquare(new Square(0, 2, LINESHP)).getMatrix();
    actuals = squaresMatrix.getMatrix();
    deepEqual(actuals, expecteds);

    /**
     *   0
     * 0[x]
     * 1[ ]
     * 2[ ]
     * 3[x]
     */
    squaresMatrix = new SquaresMatrix(1, 4)
                        .insertSquare(new Square(0, 0, SQUARESHP))
                        .insertSquare(new Square(0, 3, LINESHP));
    squaresMatrix.packColumn(0, 2);
    expecteds = new SquaresMatrix(1, 4)
                    .insertSquare(new Square(0, 1, SQUARESHP))
                    .insertSquare(new Square(0, 3, LINESHP)).getMatrix();
    actuals = squaresMatrix.getMatrix();
    deepEqual(actuals, expecteds);

    /**
     *   0
     * 0[x]
     * 1[ ]
     * 2[x]
     * 3[ ]
     */
    squaresMatrix = new SquaresMatrix(1, 4)
                        .insertSquare(new Square(0, 0, SQUARESHP))
                        .insertSquare(new Square(0, 2, LINESHP));
    squaresMatrix.packColumn(0, 3);
    expecteds = new SquaresMatrix(1, 4)
                    .insertSquare(new Square(0, 1, SQUARESHP))
                    .insertSquare(new Square(0, 3, LINESHP)).getMatrix();
    actuals = squaresMatrix.getMatrix();
    deepEqual(actuals, expecteds);

});

test("SquaresMatrix.getRowState", function() {
    var squaresMatrix = new SquaresMatrix(0, 0);
    var expected = ROW_EMPTY;
    var actual = squaresMatrix.getRowState(0);
    equal(actual, expected, '0x0');

    squaresMatrix = new SquaresMatrix(1, 1);
    expected = ROW_EMPTY;
    actual = squaresMatrix.getRowState(0);
    equal(actual, expected, '1x1 empty');

    squaresMatrix = new SquaresMatrix(3, 1);
    expected = ROW_EMPTY;
    actual = squaresMatrix.getRowState(0);
    equal(actual, expected, '3x1 empty');

    /* [__x] */
    squaresMatrix = new SquaresMatrix(3, 1)
                        .insertSquare(new Square(2, 0));
    expected = ROW_USED;
    actual = squaresMatrix.getRowState(0);
    equal(actual, expected, '[__x]');

    /* [_x_] */
    squaresMatrix = new SquaresMatrix(3, 1)
                        .insertSquare(new Square(2, 0));
    expected = ROW_USED;
    actual = squaresMatrix.getRowState(0);
    equal(actual, expected, '[_x_]');

    /* [x__] */
    squaresMatrix = new SquaresMatrix(3, 1)
                        .insertSquare(new Square(2, 0));
    expected = ROW_USED;
    actual = squaresMatrix.getRowState(0);
    equal(actual, expected, '[x__]');

    /* [xxx] */
    squaresMatrix = new SquaresMatrix(3, 1)
                        .insertSquare(new Square(0, 0))
                        .insertSquare(new Square(1, 0))
                        .insertSquare(new Square(2, 0));
    expected = ROW_FULL;
    actual = squaresMatrix.getRowState(0);
    equal(actual, expected, '3 columns, full');

    /**
      * [ ]
      * [ ]
      */
    squaresMatrix = new SquaresMatrix(1, 2);
    expected = ROW_EMPTY;
    actual = squaresMatrix.getRowState(0);
    equal(actual, expected, '1x2 empty, row 0');

    expected = ROW_EMPTY;
    actual = squaresMatrix.getRowState(1);
    equal(actual, expected, '1x2 empty, row 1');

    /**
      * [x]
      * [x]
      */
    squaresMatrix = new SquaresMatrix(1, 2)
                        .insertSquare(new Square(0, 0))
                        .insertSquare(new Square(0, 1));
    expected = ROW_FULL;
    actual = squaresMatrix.getRowState(0);
    equal(actual, expected, '1x2 full, row 0');

    expected = ROW_FULL;
    actual = squaresMatrix.getRowState(1);
    equal(actual, expected, '1x2 full, row 1');

    /**
      *   01
      * 0 x
      * 1 xx
      * 2  x
      */
    squaresMatrix = new SquaresMatrix(2, 3)
                        .insertSquare(new Square(0, 0))
                        .insertSquare(new Square(0, 1))
                        .insertSquare(new Square(1, 1))
                        .insertSquare(new Square(1, 2));
    expected = ROW_USED;
    actual = squaresMatrix.getRowState(0);
    equal(actual, expected, 'first row');

    expected = ROW_FULL;
    actual = squaresMatrix.getRowState(1);
    equal(actual, expected, 'second row');

    expected = ROW_USED;
    actual = squaresMatrix.getRowState(2);
    equal(actual, expected, 'third row');
});

test("SquaresMatrix._deleteRow", function() {

    /* [x] */
    var squaresMatrix = new SquaresMatrix(1, 1)
                        .insertSquare(new Square(0, 0));
    squaresMatrix._deleteRow(0);
    var actual = squaresMatrix.arePositionsAvailable([[0, 0]]);
    ok(actual);

    /* [xx] */
    squaresMatrix = new SquaresMatrix(2, 1)
                        .insertSquare(new Square(0, 0))
                        .insertSquare(new Square(1, 0));
    squaresMatrix._deleteRow(0);
    actual = squaresMatrix.arePositionsAvailable([[0, 0], [1, 0]]);
    ok(actual);

    /**
      * [_]
      * [x]
      */
    squaresMatrix = new SquaresMatrix(1, 2)
                        .insertSquare(new Square(0, 1));
    squaresMatrix._deleteRow(1);
    actual = squaresMatrix.arePositionsAvailable([[0, 0], [0, 1]]);
    ok(actual);

    /**
      * [x]
      * [_]
      */
    squaresMatrix = new SquaresMatrix(1, 2)
                        .insertSquare(new Square(0, 0));
    squaresMatrix._deleteRow(0);
    actual = squaresMatrix.arePositionsAvailable([[0, 0], [0, 1]]);
    ok(actual);

    /**
      * [__]
      * [xx]
      */
    squaresMatrix = new SquaresMatrix(2, 2)
                        .insertSquare(new Square(0, 1))
                        .insertSquare(new Square(1, 1));
    squaresMatrix._deleteRow(1);
    actual = squaresMatrix.arePositionsAvailable([[0, 0], [1, 0],
                                                  [0, 1], [1, 1]]);
    ok(actual);

    /**
      * [xx]
      * [__]
      */
    squaresMatrix = new SquaresMatrix(2, 2)
                        .insertSquare(new Square(0, 0))
                        .insertSquare(new Square(1, 0));
    squaresMatrix._deleteRow(0);
    actual = squaresMatrix.arePositionsAvailable([[0, 0], [1, 0],
                                                  [0, 1], [1, 1]]);
    ok(actual);
});

test("SquaresMatrix.deleteRows", function() {
    /**
      * [x]
      * [x]
      */
    var squaresMatrix = new SquaresMatrix(1, 2)
                            .insertSquare(new Square(0, 0))
                            .insertSquare(new Square(0, 1));
    squaresMatrix.deleteRows([1]);

    var actual = squaresMatrix.arePositionsAvailable([[0, 0]]);
    ok(actual, '1x2, (0, 0) available');

    actual = squaresMatrix.arePositionsAvailable([[0, 1]]);
    ok(!actual, '1x2 (0, 1) unavailable');

    /**
      * [xx]
      * [xx]
      */
    squaresMatrix = new SquaresMatrix(2, 2)
                        .insertSquare(new Square(0, 0))
                        .insertSquare(new Square(0, 1))
                        .insertSquare(new Square(1, 0))
                        .insertSquare(new Square(1, 1));
    squaresMatrix.deleteRows([1]);

    actual = squaresMatrix.arePositionsAvailable([[0, 0], [1, 0]]);
    ok(actual);

    actual = squaresMatrix.arePositionsAvailable([[0, 1]]);
    ok(!actual);

    actual = squaresMatrix.arePositionsAvailable([[1, 1]]);
    ok(!actual);

    /**
      * [x ]
      * [ x]
      * [xx]
      */
    squaresMatrix = new SquaresMatrix(2, 3)
                        .insertSquare(new Square(0, 0))
                        .insertSquare(new Square(1, 1))
                        .insertSquare(new Square(0, 2))
                        .insertSquare(new Square(1, 2));
    actual = squaresMatrix.arePositionsAvailable([[1, 0], [0, 1]]);
    ok(actual, "2x3: available positions, before delete");

    squaresMatrix.deleteRows([2]);
    /**
      * [  ]
      * [x ]
      * [ x]
      */
    actual = squaresMatrix.arePositionsAvailable([[0, 0], [1, 0],
                                                          [1, 1],
                                                  [0, 2]         ]);
    ok(actual, "2x3: available positions, after delete");

    actual = squaresMatrix.arePositionsAvailable([[0, 1]]);
    ok(!actual, "2x3: unavailable positions");

    actual = squaresMatrix.arePositionsAvailable([[1, 2]]);
    ok(!actual, "2x3: unavailable positions");

    /**
      * [ x]
      * [xx]
      * [xx]
      * [x ]
      */
    squaresMatrix = new SquaresMatrix(2, 4)
                        .insertSquare(new Square(1, 0))
                        .insertSquare(new Square(0, 1))
                        .insertSquare(new Square(1, 1))
                        .insertSquare(new Square(0, 2))
                        .insertSquare(new Square(1, 2))
                        .insertSquare(new Square(0, 3));
    actual = squaresMatrix.arePositionsAvailable([[0, 0], [1, 3]]);
    ok(actual, "2x4: available positions, before delete");

    squaresMatrix.deleteRows([2]);
    /**
      * [  ]
      * [  ]
      * [ x]
      * [x ]
      */
    actual = squaresMatrix.arePositionsAvailable([[0, 0], [1, 0],
                                                  [0, 1], [1, 1],
                                                  [0, 2],
                                                          [1, 3]]);
    ok(actual, "2x4: available positions, after delete");

    actual = squaresMatrix.arePositionsAvailable([[0, 3]]);
    ok(!actual, "2x4: unavailable positions");

    actual = squaresMatrix.arePositionsAvailable([[1, 2]]);
    ok(!actual, "2x4: unavailable positions");
});

test("SquaresMatrix.insertTetromino", function() {
    var squaresMatrix = new SquaresMatrix(4, 1);
    squaresMatrix.insertTetromino(new Tetromino(0, 0, LINESHP));
    var expecteds = [[new Square(0, 0, LINESHP)], 
                     [new Square(1, 0, LINESHP)],
                     [new Square(2, 0, LINESHP)], 
                     [new Square(3, 0, LINESHP)]];
    var actuals = squaresMatrix.getMatrix();
    deepEqual(actuals, expecteds);
    
    squaresMatrix = new SquaresMatrix(3, 2);
    squaresMatrix.insertTetromino(new Tetromino(0, 0, TSHP));
    /* Not intuitive, will change if Tetromino:11 is addressed. */
    expecteds = [
                [null, new Square(0, 1, TSHP)], 
                [new Square(1, 0, TSHP), new Square(1, 1, TSHP)], 
                [null, new Square(2, 1, TSHP)]
                ];
    actuals = squaresMatrix.getMatrix();
    deepEqual(actuals, expecteds);
});

/* EOF */

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
    var positions = []; 
    ok(!squaresMatrix.arePositionsAvailable(positions));
    var positions = [[-1, -1]]; 
    ok(!squaresMatrix.arePositionsAvailable(positions));
    var positions = [[-1, 1]]; 
    ok(!squaresMatrix.arePositionsAvailable(positions));
    var positions = [[1, -1]]; 
    ok(!squaresMatrix.arePositionsAvailable(positions));
    var positions = [[1, 1]]; 
    ok(!squaresMatrix.arePositionsAvailable(positions));
    var positions = [[0, 0]]; 
    ok(squaresMatrix.arePositionsAvailable(positions));

    /**
     *   01
     * 0[x ]
     */
    var squaresMatrix = new SquaresMatrix(2, 1)
                        .insertSquare(new Square(0, 0));
    var positions = [[1, 0]]; 
    ok(squaresMatrix.arePositionsAvailable(positions));
    var positions = [[0, 0], [1, 0]]; 
    ok(!squaresMatrix.arePositionsAvailable(positions));

    /**
     *   0
     * 0[ ]
     * 1[x]
     * 2[ ]
     */
    var squaresMatrix = new SquaresMatrix(1, 3)
                        .insertSquare(new Square(0, 1));
    var positions = [[0, 1]]; 
    ok(!squaresMatrix.arePositionsAvailable(positions));
    var positions = [[0, 0], [0, 2]]; 
    ok(squaresMatrix.arePositionsAvailable(positions));
    var positions = [[0, 0], [0, 1], [0, 2]]; 
    ok(!squaresMatrix.arePositionsAvailable(positions));
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
                    .insertSquare(new Square(0, 2)).getMatrix();
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
                    .insertSquare(new Square(0, 1, SQUARESHP))
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
    squaresMatrix.packColumn(0, 3); 
    expecteds = new SquaresMatrix(1, 4)                                  
                    .insertSquare(new Square(0, 2, SQUARESHP))
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
    squaresMatrix.packColumn(0, 2); 
    expecteds = new SquaresMatrix(1, 4)                                  
                    .insertSquare(new Square(0, 1, SQUARESHP))
                    .insertSquare(new Square(0, 2, LINESHP)).getMatrix();
    actuals = squaresMatrix.getMatrix();
    deepEqual(actuals, expecteds);
});

/* EOF */

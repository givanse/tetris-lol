/**
 *
 */

test("Square.arePositionsAvailable", function() {
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

/* EOF */

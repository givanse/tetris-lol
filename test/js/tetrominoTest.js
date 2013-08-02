/**
 *
 */

test("getTetrominoSquares", function() {
    var actuals = getTetrominoSquares(4, 0, SQUARESHP);
    var expecteds = [new Square(4, 0, SQUARESHP),
                     new Square(5, 0, SQUARESHP),
                     new Square(4, 1, SQUARESHP),
                     new Square(5, 1, SQUARESHP)];
    deepEqual(actuals, expecteds);

    var actuals = getTetrominoSquares(4, 0, LINESHP);
    var expecteds = [new Square(4, 0, LINESHP),
                     new Square(5, 0, LINESHP),
                     new Square(6, 0, LINESHP),
                     new Square(7, 0, LINESHP)];
    deepEqual(actuals, expecteds);

    var actuals = getTetrominoSquares(4, 0, TSHP);
    var expecteds = [new Square(4, 0, TSHP),
                     new Square(5, 0, TSHP),
                     new Square(6, 0, TSHP),
                     new Square(5, 1, TSHP)];
    deepEqual(actuals, expecteds);

    var actuals = getTetrominoSquares(4, 0, SSHP_R);
    var expecteds = [new Square(4, 0, SSHP_R),
                     new Square(5, 0, SSHP_R),
                     new Square(4, 1, SSHP_R),
                     new Square(3, 1, SSHP_R)];
    deepEqual(actuals, expecteds);

    var actuals = getTetrominoSquares(4, 0, SSHP_L);
    var expecteds = [new Square(4, 0, SSHP_L),
                     new Square(3, 0, SSHP_L),
                     new Square(4, 1, SSHP_L),
                     new Square(5, 1, SSHP_L)];
    deepEqual(actuals, expecteds);

    var actuals = getTetrominoSquares(4, 0, LSHP_R);
    var expecteds = [new Square(4, 0, LSHP_R),
                     new Square(4, 1, LSHP_R),
                     new Square(5, 1, LSHP_R),
                     new Square(6, 1, LSHP_R)];
    deepEqual(actuals, expecteds);

    var actuals = getTetrominoSquares(4, 0, LSHP_L);
    var expecteds = [new Square(4, 0, LSHP_L),
                     new Square(4, 1, LSHP_L),
                     new Square(3, 1, LSHP_L),
                     new Square(2, 1, LSHP_L)];
    deepEqual(actuals, expecteds);

});

/* EOF */

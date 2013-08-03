/**
 * We can predict the order in which the squares array will be filled because
 * of the way we iterate. First all the squares within the first column and then
 * all the squares in the second column and so on.
 */
test("Tetromino.getSquares", function() {
    var tetromino = new Tetromino(0, 0);
    var actuals = tetromino.getSquares();
    var expecteds = new Array(0);
    deepEqual(actuals, expecteds);

    tetromino = new Tetromino(0, 0, SQUARESHP);
    actuals = tetromino.getSquares();
    expecteds = [new Square(0, 0, SQUARESHP),
                 new Square(0, 1, SQUARESHP),
                 new Square(1, 0, SQUARESHP),
                 new Square(1, 1, SQUARESHP)];
    deepEqual(actuals, expecteds);

    tetromino = new Tetromino(0, 0, LINESHP);
    actuals = tetromino.getSquares();
    expecteds = [new Square(0, 0, LINESHP),
                 new Square(1, 0, LINESHP),
                 new Square(2, 0, LINESHP),
                 new Square(3, 0, LINESHP)];
    deepEqual(actuals, expecteds);

    tetromino = new Tetromino(0, 0, TSHP);
    actuals = tetromino.getSquares();
    expecteds = [new Square(0, 0, TSHP),
                 new Square(1, 0, TSHP),
                 new Square(1, 1, TSHP),
                 new Square(2, 0, TSHP)];
    deepEqual(actuals, expecteds);

    tetromino = new Tetromino(0, 0, SSHP_L);
    actuals = tetromino.getSquares();
    expecteds = [new Square(0, 0, SSHP_L),
                 new Square(1, 0, SSHP_L),
                 new Square(1, 1, SSHP_L),
                 new Square(2, 1, SSHP_L)];
    deepEqual(actuals, expecteds);

    tetromino = new Tetromino(0, 0, SSHP_R);
    actuals = tetromino.getSquares();
    expecteds = [new Square(0, 1, SSHP_R),
                 new Square(1, 0, SSHP_R),
                 new Square(1, 1, SSHP_R),
                 new Square(2, 0, SSHP_R)];
    deepEqual(actuals, expecteds);

    tetromino = new Tetromino(0, 0, LSHP_R);
    actuals = tetromino.getSquares();
    expecteds = [new Square(0, 0, LSHP_R),
                 new Square(0, 1, LSHP_R),
                 new Square(1, 1, LSHP_R),
                 new Square(2, 1, LSHP_R)];
    deepEqual(actuals, expecteds);

    tetromino = new Tetromino(0, 0, LSHP_L);
    actuals = tetromino.getSquares();
    expecteds = [new Square(0, 1, LSHP_L),
                 new Square(1, 1, LSHP_L),
                 new Square(2, 0, LSHP_L),
                 new Square(2, 1, LSHP_L)];
    deepEqual(actuals, expecteds);

});

/* EOF */

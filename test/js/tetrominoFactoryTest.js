/**
 *
 */
test("tetrominoFactory.buildRandomTetromino", function() {

    var N = 25; /* Repeat the tests below this many times. */
    for(var repeatTestN = 0; repeatTestN < N; repeatTestN++) {

        var randomTetrominos = [];

        /* Push into the array 7 random tetrominos. */
        for(var i = 0; i < tlol.tetrominoSpecs.length; i++) {
            var tetromino = tlol.tetrominoFactory.buildRandomTetromino();
            randomTetrominos.push(tetromino);
        }

        /* Verify that each tetromino is unique. */
        if ( randomTetrominos.hasDuplicates() ) {
            ok(false, "Found a duplicate Tetromino.");
            return;
        } else {
            ok(true, "No duplicates were found.");

        }
    }

    expect(N);
});

/* EOF */

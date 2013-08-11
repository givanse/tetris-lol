/**
 *
 */

test("random _getShuffledTetrominoNames", function() {

    var N = 25; /* Repeat the tests below this many times. */
    for(var repeatTestN = 0; repeatTestN < N; repeatTestN++) {

        var shuffledNames = _getShuffledTetrominoNames();

        /* Verify that each name is unique. */
        if(hasDuplicates(shuffledNames)) {
            ok(false, "Found a repeated name.");
            return;
        }

        equal(shuffledNames.length, TETROMINO_NAMES.length);
    }

    expect(N);
});

test("random getRandomTetrominoName", function() {

    var N = 25; /* Repeat the tests below this many times. */
    for(var repeatTestN = 0; repeatTestN < N; repeatTestN++) {

        var randomTNames = new Array(0);

        /* Push into the array 7 random names. */
        for(var i = 0; i < TETROMINO_NAMES.length; i++) {
            var tName = getRandomTetrominoName();
            randomTNames.push(tName);
        }

        /* Verify that each name is unique. */
        if(hasDuplicates(randomTNames)) {
            ok(false, "Found a repeated name.");
            return;
        }

        equal(randomTNames.length, TETROMINO_NAMES.length);
    }

    expect(N);
});

/* EOF */

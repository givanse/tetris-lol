/**
 *
 */

test("random getShuffledTetrominoNames", function() {

    var orderedKeys = Object.keys(TETROMINO_NAMES);

    var N = 25; /* Repeat the tests below this many times. */
    for(var repeatTestN = 0; repeatTestN < N; repeatTestN++) {
        var shuffledNames = getShuffledTetrominoNames();
        notDeepEqual(TETROMINO_NAMES, shuffledNames, 
                     "should: ordered names != shuffled names");
        console.log(shuffledNames);

        var  shuffledKeys = Object.keys(shuffledNames);
        equal(orderedKeys.length, shuffledKeys.length, 
              "ordered & shuffled same length");

        for(var i = 0; i < TETROMINO_NAMES.lenght; i++) {
            var nameA = orderedKeys[i];

            shuffledLoop:
            for(var j = 0; j < shuffledNames.lenght; j++) {
                var nameB = shuffledNames[j];

                if(nameA == nameB)
                    break shuffledLoop;

                if(j == shuffledNames.lenght - 1) {
                    var message = "Tetromino name <" + nameA + 
                                  "> was not found in the shuffled array.";
                    ok(false, message); 
                }
            }
        }
    }
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

        equal(randomTNames.length, TETROMINO_NAMES.length);

        /* Verify that each name is unique. */
        if(hasDuplicates(randomTNames)) {
            ok(false, "found a repeated name");
        }
    }
});

/* EOF */

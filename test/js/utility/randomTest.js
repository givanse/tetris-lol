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

        var  shuffledKeys = Object.keys(shuffledNames);
        equal(orderedKeys.length, shuffledKeys.length, 
              "ordered & shuffled same length");

        for(var i = 0; i < TETROMINO_NAMES.lenght; i++) {
            var nameA = orderedKeys[i];

            shuffledLoop:
            for(var j = 0; j < shuffledNames.lenght; j++) {
                var nameB = shuffledNames[j];

                if(nameA === nameB)
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
        for(var i = 0; i < TETROMINO_NAMES.length; i++) {
            var tName = getRandomTetrominoName();
        
            /* verify that the name is unique */
            for(var storedName in randomTNames) {
                if(storedName == tName) {
                    ok(false, "found a repeated name");
                }
            }

            /* add the name to the list */
            randomTNames.push(tName);
        }

        equal(randomTNames.length, TETROMINO_NAMES.length);
    }
});

/* EOF */

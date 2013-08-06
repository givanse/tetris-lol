
/* Do not access this from anywhere, except from getRandonTetrominoType() */
var _SHUFFLED_TETROMINOS = [];

function getRandomTetrominoName() {

    if(_SHUFFLED_TETROMINOS.length > 0) {
        return _SHUFFLED_TETROMINOS.pop();
    }  

    _SHUFFLED_TETROMINOS = getShuffledTetrominoNames();

    return _SHUFFLED_TETROMINOS.pop();
}

function getShuffledTetrominoNames() {

    /* Make a clone of TETROMINOS */
    var tNames = TETROMINO_NAMES.slice(0); 

    /* Fisher-Yates shuffle, modern version */
    for(var i = tNames.length - 1; i > 0; i--) {
       /* j ← random integer with 0 ≤ j ≤ i */
       var min = 0;
       var max = i;
       var j = Math.floor(Math.random() * (max - min + 1)) + min;
       /* exchange a[j] and a[i] */
       var tmp = tNames[i];
       tNames[j] = tNames[i];
       tNames[i] = tmp; 
    }

    return tNames;
}

/* EOF */

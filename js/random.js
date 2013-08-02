
/* Do not access this from anywhere, except from getRandonTetrominoType() */
var _SHUFFLED_TETROMINOS = [];

function getRandonTetrominoType() {

    if(_SHUFFLED_TETROMINOS.length > 0) {
        return _SHUFFLED_TETROMINOS.pop();
    }  

    /* Make a clone of TETROMINOS */
    /* Not a deep copy, not sure yet if this affects. */
    _SHUFFLED_TETROMINOS = TETROMINOS.slice(0); 

    /* Fisher-Yates shuffle, modern version */
    for(var i = _SHUFFLED_TETROMINOS.length - 1; i > 0; i--) {
       // j ← random integer with 0 ≤ j ≤ i
       var min = 0;
       var max = i;
       var j = Math.floor(Math.random() * (max - min + 1)) + min;
       // exchange a[j] and a[i]
       var tmp = _SHUFFLED_TETROMINOS[i];
       _SHUFFLED_TETROMINOS[j] = _SHUFFLED_TETROMINOS[i];
       _SHUFFLED_TETROMINOS[i] = tmp; 
    }
    return _SHUFFLED_TETROMINOS.pop();
}

/* EOF */

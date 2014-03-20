/**
 *
 */
tlol.tetrominoFactory = (function() {

    var shuffledTSpecs = [];

    var buildRandomTetrominoSpec = function() {
        if (shuffledTSpecs.length > 0) {
            return shuffledTSpecs.pop();
        } 
        shuffledTSpecs = getShuffledTetrominoSpecs();
        return shuffledTSpecs.pop();
    };

    var getShuffledTetrominoSpecs = function() {
        /* Make a clone of tlol.tetrominoSpecs */
        var tSpecs = tlol.tetrominoSpecs.slice(0); 
        /* Fisher-Yates shuffle, modern version */
        for(var i = tSpecs.length - 1; i > 0; i--) {
            /* j ← random integer with 0 ≤ j ≤ i */
            var min = 0;
            var max = i;
            var j = Math.floor(Math.random() * (max - min + 1)) + min;
            /* swap a[j] and a[i] */
            var tmp = tSpecs[j];
            tSpecs[j] = tSpecs[i];
            tSpecs[i] = tmp; 
        }
        return tSpecs;
    };

    var that = {
        buildRandomTetrominoSpec: buildRandomTetrominoSpec, 
        buildRandomTetromino: function(width) {
            var tSpec = buildRandomTetrominoSpec();                             
            /* assumes that width is always an even number */                   
            var x = width / 2; 
            var y = 0;                                                                   
            return new Tetromino(x, y, tSpec);
        }
    };

    return that;
}());

/* EOF */

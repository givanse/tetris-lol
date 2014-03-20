/**                                                                              
 * Application namespace, everything is contained here.
 *
 * The properties defined as null are actually defined in a file of their own
 * that has the same name as the property.
 */                                                                              
var tlol = {   
                                                                  
    tetrisGame: null,                                                            
    gameLoopService: null,                                                      
    tetrominoFactory: null,
    squareFactory: null,
    util: null,

    settings: {
        /* milliseconds */
        rowFadeOutSpeed: 4, 
    },

    browser: {
        browserTest: function(regex) { 
            return regex.test(navigator.userAgent); 
        },          
        isIE: function() { return this.browserTest(/IE/); },
        isFirefox: function() { return this.browserTest(/Firefox/); },
        isSafari: function() { return this.browserTest(/Safari/); }
    }, /* tlol.browser */

    cssClass: {
        mushroom: 'MUSHROOM'
    },

    /** 
     * The size in pixels of one square (div). 
     * This must include every CSS value that affects its size,like: 
     * margin, border, etc. 
     */
    square_size: 31 + 1, /* Currently: Square width + Square border */

    /**
     * http://en.wikipedia.org/wiki/Tetromino
     */

    /**
     * Singleton list of Tetromino Specifications.
     *
     * All the shapes share at least one position in common, which is set to be
     * the coordinate (0, 0).
     */
    tetrominoSpecs: (function() {

        /**
         * Builds a Tetromino Specification object.
         */
        function buildTSpec(cssClass, baseCoords) {

            /* public interface */
            var tSpec = {
                getCSSClass: function() { return cssClass; },
                getBaseCoords: function(indx) { 
                    return baseCoords[indx]; 
                }
            };

            return tSpec;
        }
        
        var tSpecs = [];

        /* http://harddrop.com/wiki/File:SRS-pieces.png */

        /**
         *   0 1 2 3  0 1 2 3 0 1 2 3 0 1 2 3
         * 0              x             x
         * 1 x x x x      x             x
         * 2              x   x x x x   x
         * 3              x             x
         */
        var baseCoords = [ 
            [[0, 1], [1, 1], [2, 1], [3, 1]],
            [[2, 0], [2, 1], [2, 2], [2, 3]],
            [[0, 2], [1, 2], [2, 2], [3, 2]],
            [[1, 0], [1, 1], [1, 2], [1, 3]]
        ];
        tSpecs.push(buildTSpec('LINESHP', baseCoords));

        /**
         *   0 1 2 3 0 1 2 3 0 1 2 3 0 1 2 3
         * 0   a b     d a     c d     b c
         * 1   d c     c b     b a     a d
         * 2                   
         * 3                              
         */
        baseCoords = [
            [[1, 0], [2, 0], [2, 1], [1, 1]],
            [[2, 0], [2, 1], [1, 1], [1, 0]],
            [[2, 1], [1, 1], [1, 0], [2, 0]],
            [[1, 1], [1, 0], [2, 0], [2, 1]]
        ];
        tSpecs.push(buildTSpec('SQUARESHP', baseCoords));
        
        /**
         *   0 1 2 3 0 1 2 3 0 1 2 3 0 1 2 3
         * 0   x       x               x
         * 1 x x x     x x   x x x   x x
         * 2           x       x       x
         * 3                              
         */
        baseCoords = [
            [[0, 1], [1, 0], [1, 1], [2, 1]],
            [[1, 0], [1, 1], [1, 2], [2, 1]],
            [[0, 1], [1, 1], [1, 2], [2, 1]],
            [[0, 1], [1, 0], [1, 1], [1, 2]]
        ];
        tSpecs.push(buildTSpec('TSHP', baseCoords));

        /**
         *   0 1 2 3 0 1 2 3 0 1 2 3 0 1 2 3
         * 0   x x     x             x
         * 1 x x       x x     x x   x x
         * 2             x   x x       x
         * 3                              
         */
        baseCoords = [
            [[0, 1], [1, 0], [1, 1], [2, 0]],
            [[1, 0], [1, 1], [2, 1], [2, 2]],
            [[0, 2], [1, 1], [1, 2], [2, 1]],
            [[0, 0], [0, 1], [1, 1], [1, 2]]
        ];
        tSpecs.push(buildTSpec('SSHP_R', baseCoords));

        /**
         *   0 1 2 3 0 1 2 3 0 1 2 3 0 1 2 3
         * 0 x x         x             x
         * 1   x x     x x   x x     x x
         * 2           x       x x   x
         * 3                              
         */
        baseCoords = [
            [[0, 0], [1, 0], [1, 1], [2, 1]],
            [[1, 1], [1, 2], [2, 0], [2, 1]],
            [[0, 1], [1, 1], [1, 2], [2, 2]],
            [[0, 1], [0, 2], [1, 0], [1, 1]]
        ];
        tSpecs.push(buildTSpec('SSHP_L', baseCoords));

        /**
         *   0 1 2 3 0 1 2 3 0 1 2 3 0 1 2 3
         * 0 x         x x             x
         * 1 x x x     x     x x x     x
         * 2           x         x   x x
         * 3                              
         */
        baseCoords = [
            [[0, 0], [0, 1], [1, 1], [2, 1]],
            [[1, 0], [1, 1], [1, 2], [2, 0]],
            [[0, 1], [1, 1], [2, 1], [2, 2]],
            [[0, 2], [1, 0], [1, 1], [1, 2]]
        ];
        tSpecs.push(buildTSpec('LSHP_R', baseCoords));

        /**
         *   0 1 2 3 0 1 2 3 0 1 2 3 0 1 2 3
         * 0     x     x             x x
         * 1 x x x     x     x x x     x
         * 2           x x   x         x
         * 3                              
         */
        baseCoords = [
            [[0, 1], [1, 1], [2, 0], [2, 1]],
            [[1, 0], [1, 1], [1, 2], [2, 2]],
            [[0, 1], [0, 2], [1, 1], [2, 1]],
            [[0, 0], [1, 0], [1, 1], [1, 2]]
        ];
        tSpecs.push(buildTSpec('LSHP_L', baseCoords));
    
        return tSpecs;
    
    })(), /* tetrominoSpecs */

    /**
     * It just provides a convinient access method for the different 
     * Tetromino specifications. Instead of doing:
     *   tlol.tetrominoSpecs[0]
     * You can do:
     *   tlol.tSpec.line()
     */
    tSpec: {
           line: function() { return tlol.tetrominoSpecs[0]; },
         square: function() { return tlol.tetrominoSpecs[1]; },
              t: function() { return tlol.tetrominoSpecs[2]; },
        s_right: function() { return tlol.tetrominoSpecs[3]; },
         s_left: function() { return tlol.tetrominoSpecs[4]; },
        l_right: function() { return tlol.tetrominoSpecs[5]; },
         l_left: function() { return tlol.tetrominoSpecs[6]; }
    },

    /**
     * Movement directions.
     */
    direction: {
        up: 'UP',
        down: 'DOWN',
        left: 'LEFT',
        right: 'RIGHT'
    },

    /**
     * Board's row states.
     */
    row: {
        empty: 'ROW_EMPTY',
        full: 'ROW_FULL',
        used: 'ROW_USED'
    }

}; /* tlol */

/* EOF */

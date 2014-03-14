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
     * Tetromino Specifications.
     *
     * All the shapes share at least one position in common, which is set to be
     * the coordinate (0, 0).
     */
    tetrominoSpecs: [
        {
            cssClass: 'LINESHP',
            baseCoords: [[-1,  0], [ 0,  0], [1,  0], [2,  0]]
        },
        {
            cssClass: 'SQUARESHP',
            baseCoords: [[-1,  1], [-1,  0], [0,  1], [0,  0]]
        },
        {
            cssClass: 'TSHP',
            baseCoords: [[-1,  1], [ 0,  1], [0,  0], [1,  1]]
        },
        {
            cssClass: 'SSHP_R',
            baseCoords: [[-1,  0], [ 0,  1], [0,  0], [1,  1]]
        },
        {
            cssClass: 'SSHP_L',
            baseCoords:  [[-1,  1], [ 0,  1], [0,  0], [1,  0]]
        },
        {
            cssClass: 'LSHP_R',
            baseCoords: [[-1,  1], [-1,  0], [0,  1], [1,  1]]
        },
        {
            cssClass: 'LSHP_L',
            baseCoords:  [[-1,  1], [ 0,  1], [1,  1], [1,  0]]
        }
    ],

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

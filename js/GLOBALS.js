/**
 * Variables in this file are meant to be global and remain constant.
 */

/** 
 * The size in pixels of one square (div). 
 * This must include every CSS value that affects its size,like: 
 * margin, border, etc. 
 */
var SQUARE_SIZE = 31 + 1; /* Currently: Square width + Square border */

/**
 * http://en.wikipedia.org/wiki/Tetromino
 */

var LINESHP = "LINESHP";
var SQUARESHP = "SQUARESHP";
var TSHP = "TSHP";
var SSHP_R = "SSHP_R";
var SSHP_L = "SSHP_L";
var LSHP_R = "LSHP_R";
var LSHP_L = "LSHP_L";

var TETROMINO_NAMES = [
    LINESHP,
    SQUARESHP,
    TSHP,
    SSHP_R,
    SSHP_L,
    LSHP_R,
    LSHP_L
];
Object.freeze(TETROMINO_NAMES);

/**
 * All the shapes share at least one position in common, which is set to be
 * the coordinate (0, 0).
 */
var TETROMINO_BASE_COORDINATES = {
    LINESHP:   [[-1,  0], [ 0,  0], [1,  0], [2,  0]],
    SQUARESHP: [[-1,  1], [-1,  0], [0,  1], [0,  0]],
    TSHP:      [[-1,  1], [ 0,  1], [0,  0], [1,  1]],
    SSHP_R:    [[-1,  0], [ 0,  1], [0,  0], [1,  1]],
    SSHP_L:    [[-1,  1], [ 0,  1], [0,  0], [1,  0]],
    LSHP_R:    [[-1,  1], [-1,  0], [0,  0], [1,  0]],
    LSHP_L:    [[-1,  0], [ 0,  0], [1,  1], [1,  0]]
};

/**
 * Movement directions.
 */
var UP = 'up';
var DOWN = 'down';
var LEFT = 'left';
var RIGHT = 'right';

/* EOF */

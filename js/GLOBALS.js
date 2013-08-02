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

var TETROMINOS = [
    LINESHP,
    SQUARESHP,
    TSHP,
    SSHP_R,
    SSHP_L,
    LSHP_R,
    LSHP_L
];
Object.freeze(TETROMINOS);

/**
 * Movement directions.
 */
var UP = 'up';
var DOWN = 'down';
var LEFT = 'left';
var RIGHT = 'right';

/* EOF */

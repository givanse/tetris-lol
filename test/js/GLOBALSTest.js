/**
 *
 */

test("global variables", function() {

  strictEqual(SQUARE_SIZE, 32, "SQUARE_SIZE");

  strictEqual(TETROMINO_NAME.length, 7, "TETROMINOS.length");

  strictEqual(TETROMINO_BASE_COORDINATES.LINESHP.length, 4);
  strictEqual(TETROMINO_BASE_COORDINATES.SQUARESHP.length, 4);
  strictEqual(TETROMINO_BASE_COORDINATES.TSHP.length, 4);
  strictEqual(TETROMINO_BASE_COORDINATES.SSHP_R.length, 4);
  strictEqual(TETROMINO_BASE_COORDINATES.SSHP_L.length, 4);
  strictEqual(TETROMINO_BASE_COORDINATES.LSHP_R.length, 4);
  strictEqual(TETROMINO_BASE_COORDINATES.LSHP_L.length, 4);

});

/* EOF */

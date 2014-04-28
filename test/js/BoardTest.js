/**
 *
 */
test("Board 111x221", function() {
    var canvasBckd = document.createElement('div');
    var canvas = document.createElement('div');
    var swidth = 111;  /* (10 + 1) * 10 = 110 + 1 */ 
    var sheight = 221; /* (10 + 1) * 20 = 220 + 1 */
    tlol.settings.board.border_width = {top: 0, rigth: 0, bottom: 0, left: 0}; 
    tlol.settings.board.safety_net_width = 0; 
    tlol.settings.numRowsRandomlyInit = 2;
    tlol.settings.initFillPercentagePerRow = 1;
    var board = new Board(canvasBckd, canvas, swidth, sheight);
    equal(board.getWidth(), 111, "canvas width");
    equal(board.getHeight(), 221, "canvas height");

    var totalSqrs = ((2 * 10) * 1) + 4;      /* 2 filled rows + falling Tetro */
    equal(canvas.childNodes.length, totalSqrs, 
          "total divs appended to the canvas");

    var currT = board.getCurrentTetromino();
    var x = currT.getX();
    var y = currT.getY();
    board.moveTetromino(tlol.direction.DOWN);
    board.moveTetromino(tlol.direction.DOWN);
    board.moveTetromino(tlol.direction.DOWN);
    equal(currT.getX(), x, "same x");
    equal(currT.getY(), y + 3, "new y");

    /* restore default values */
    tlol.settings.square_size = null;
    tlol.settings.square_border_w = null;
});

test("Board 800x600", function() {
    var canvasBckd = document.createElement('div');
    var canvas = document.createElement('div');
    var swidth = 800;
    var sheight = 600;
    tlol.settings.numRowsRandomlyInit = 3;
    tlol.settings.initFillPercentagePerRow = 0.5;
    var board = new Board(canvasBckd, canvas, swidth, sheight);

    var totalSqrs = 15 + 4; /* ((3 * 10) * 0.5) + 4 */
    equal(canvas.childNodes.length, totalSqrs, 
          "total divs appended to the canvas");

    /* restore default values */
    tlol.settings.square_size = null;
    tlol.settings.square_border_w = null;
});

test("Board deleteCompletedRows", function() {
    var canvasBckd = document.createElement('div');
    var canvas = document.createElement('div');
    var swidth = 800;
    var sheight = 600;
    tlol.settings.numRowsRandomlyInit = 1;
    tlol.settings.initFillPercentagePerRow = 1;
    var board = new Board(canvasBckd, canvas, swidth, sheight);

    var totalSqrs = 10 + 4;
    equal(canvas.childNodes.length, totalSqrs, 
          "total divs appended to the canvas");

    var canMove = true;
    while( canMove ) {
        canMove = board.moveTetromino( tlol.direction.DOWN );
    }
    ok(! canMove);
    
    var candidateRows = [21];
    var totalCompletedRows = board.deleteCompletedRows(candidateRows);
    equal(totalCompletedRows, 1, "total number of rows completed and deleted");

    /* restore default values */
    tlol.settings.square_size = null;
    tlol.settings.square_border_w = null;
});

/*EOF*/

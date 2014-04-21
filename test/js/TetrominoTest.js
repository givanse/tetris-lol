/**
 * We can predict the order in which the squares array will be filled because
 * of the way we iterate. First all the squares within the first column and 
 * then all the squares in the second column and so on.
 */
test("Tetromino.getSquares", function(assert) {
    var buildSquare = tlol.squareFactory.buildSquare;

    throws(function() {
               new Tetromino(0, 0);
           }, 
           "Tetromino throws TypeError - missing argument");

    throws(function() {
               new Tetromino(0, 0, "a random string"); 
           }, 
           "Tetromino throws TypeError - random string");

    throws(function() {
               new Tetromino(0, 0, new Object()); 
           }, 
           "Tetromino throws TypeError - random object");

    /**
     *    0 1 2 3
     *  0
     *  1 x x x x
     */
    var tSpec = tlol.tSpec.line()
    var tetromino = new Tetromino(0, 0, tSpec);
    var actuals = tetromino.getSquares();

    assert.notEqualSqrArr(actuals, [], 
        "not equal to an empty array");
    assert.notEqualSqrArr(actuals, [[]], 
        "not equal to an empty nested array");
    assert.notEqualSqrArr(actuals, [null], 
        "not equal to an array of 1 NULL");
    assert.notEqualSqrArr(actuals, [null, null, null, null], 
        "not equal to an array of 4 NULLs");
    assert.notEqualSqrArr(actuals, [[null]], 
        "not equal to an array of 1 array filled with NULL");
    assert.notEqualSqrArr(actuals, [[null], [null], [null], [null]], 
        "not equal to an array of 4  arrays filled with NULL");

    var expecteds = [buildSquare(0, 1, tSpec.getCSSClass()),
                     buildSquare(1, 1, tSpec.getCSSClass()),
                     buildSquare(2, 1, tSpec.getCSSClass()),
                     null]
    assert.notEqualSqrArr(actuals, expecteds, "tlol.tSpec.line() last null");

    expecteds = [buildSquare(0, 1, tSpec.getCSSClass()),
                 buildSquare(1, 1, tSpec.getCSSClass()),
                 buildSquare(2, 1, tSpec.getCSSClass()),
                 buildSquare(3, 1, tSpec.getCSSClass())]
    assert.equalSqrArr(actuals, expecteds, "tlol.tSpec.line()");

    expecteds = [expecteds];
    assert.notEqualSqrArr(actuals, expecteds, "tlol.tSpec.line() nested array");

    expecteds = [buildSquare(0, 0, tSpec.getCSSClass()),
                 buildSquare(1, 0, tSpec.getCSSClass()),
                 buildSquare(2, 0, tSpec.getCSSClass()),
                 buildSquare(3, 0, tSpec.getCSSClass())];
    assert.notEqualSqrArr(actuals, expecteds, 
                          "tlol.tSpec.line() different row");

    expecteds = [buildSquare(1, 1, tSpec.getCSSClass()),
                 buildSquare(2, 1, tSpec.getCSSClass()),
                 buildSquare(3, 1, tSpec.getCSSClass()),
                 buildSquare(4, 1, tSpec.getCSSClass())];
    assert.notEqualSqrArr(actuals, expecteds, 
                          "tlol.tSpec.line() different column");

    tSpec = tlol.tSpec.t()
    expecteds = [buildSquare(0, 1, tSpec.getCSSClass()),
                 buildSquare(1, 1, tSpec.getCSSClass()),
                 buildSquare(2, 1, tSpec.getCSSClass()),
                 buildSquare(3, 1, tSpec.getCSSClass())];
    assert.notEqualSqrArr(actuals, expecteds, 
                          "tlol.tSpec.line() different css class");

    /**
     *    0 1 2
     *  0   a b
     *  1   d c
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.square());
    actuals = tetromino.getSquares();
    var cssClass = tlol.tSpec.square().getCSSClass();
    expecteds = [buildSquare(1, 0, tlol.cssClass.mushroom),
                 buildSquare(2, 0, cssClass),
                 buildSquare(2, 1, cssClass),
                 buildSquare(1, 1, cssClass)];
    assert.equalSqrArr(actuals, expecteds, "tlol.tSpec.square()");

    equal(actuals[0].getX(), 1);
    equal(actuals[0].getY(), 0);

    equal(actuals[1].getX(), 2);
    equal(actuals[1].getY(), 0);

    equal(actuals[2].getX(), 2);
    equal(actuals[2].getY(), 1);

    equal(actuals[3].getX(), 1);
    equal(actuals[3].getY(), 1);

    /**
     *    0 1 2
     *  0   x 
     *  1 x x x
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.t());
    actuals = tetromino.getSquares();
    cssClass = tlol.tSpec.t().getCSSClass();
    expecteds = [buildSquare(0, 1, cssClass),
                 buildSquare(1, 0, cssClass),
                 buildSquare(1, 1, cssClass),
                 buildSquare(2, 1, cssClass)];
    assert.equalSqrArr(actuals, expecteds, "tlol.tSpec.t()");

    /**
     *    0 1 2
     *  0 x x
     *  1   x x
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.s_left());
    actuals = tetromino.getSquares();
    cssClass = tlol.tSpec.s_left().getCSSClass();
    expecteds = [buildSquare(0, 0, cssClass),
                 buildSquare(1, 0, cssClass),
                 buildSquare(1, 1, cssClass),
                 buildSquare(2, 1, cssClass)];
    assert.equalSqrArr(actuals, expecteds, "tlol.tSpec.s_left()");

    /**
     *    0 1 2
     *  0   x x
     *  1 x x
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.s_right());
    actuals = tetromino.getSquares();
    cssClass = tlol.tSpec.s_right().getCSSClass();
    expecteds = [buildSquare(0, 1, cssClass),
                 buildSquare(1, 0, cssClass),
                 buildSquare(1, 1, cssClass),
                 buildSquare(2, 0, cssClass)];
    assert.equalSqrArr(actuals, expecteds, "tlol.tSpec.s_right()");

    /**
     *    0 1 2
     *  0 x 
     *  1 x x x
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.l_right());
    actuals = tetromino.getSquares();
    cssClass = tlol.tSpec.l_right().getCSSClass();
    expecteds = [buildSquare( 0, 0, cssClass),
                 buildSquare( 0, 1, cssClass),
                 buildSquare( 1, 1, cssClass),
                 buildSquare( 2, 1, cssClass)];
    assert.equalSqrArr(actuals, expecteds, "tlol.tSpec.l_right()");

    /**
     *    0 1 2
     *  0     x
     *  1 x x x
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.l_left());
    actuals = tetromino.getSquares();
    cssClass = tlol.tSpec.l_left().getCSSClass();
    expecteds = [buildSquare( 0, 1, cssClass),
                 buildSquare( 1, 1, cssClass),
                 buildSquare( 2, 0, cssClass),
                 buildSquare( 2, 1, cssClass)];
    assert.equalSqrArr(actuals, expecteds, "tlol.tSpec.l_left()");

    /* Tests with a random origin. */

    /**
     *    10 11 12
     * 10     x  x
     * 11  x  x
     * 12
     */
    tetromino = new Tetromino(10, 10, tlol.tSpec.s_right());
    actuals = tetromino.getSquares();
    cssClass = tlol.tSpec.s_right().getCSSClass();
    expecteds = [buildSquare(10, 11, cssClass),
                 buildSquare(11, 10, cssClass),
                 buildSquare(11, 11, cssClass),
                 buildSquare(12, 10, cssClass)];
    assert.equalSqrArr(actuals, expecteds, "(10, 10)");

    /**
     *    65 66 67
     * 86     x  x
     * 87     x  x
     */
    tetromino = new Tetromino(65, 86, tlol.tSpec.square());
    actuals = tetromino.getSquares();
    cssClass = tlol.tSpec.square().getCSSClass();
    expecteds = [buildSquare(66, 86, tlol.cssClass.mushroom),
                 buildSquare(67, 86, cssClass),
                 buildSquare(67, 87, cssClass),
                 buildSquare(66, 87, cssClass)];
    assert.equalSqrArr(actuals, expecteds, "tlol.tSpec.square() (65, 86)");

    equal(actuals[0].getX(), 66);
    equal(actuals[0].getY(), 86);

    equal(actuals[1].getX(), 67);
    equal(actuals[1].getY(), 86);

    equal(actuals[2].getX(), 67);
    equal(actuals[2].getY(), 87);

    equal(actuals[3].getX(), 66);
    equal(actuals[3].getY(), 87);
});

test("Tetromino.getNextPositionCoords(tlol.direction.UP) - rotate", function() {

    /**
     *   0 1 2 3 0 1 2 3
     * 0             x 
     * 1 x x x x     x  
     * 2             x 
     * 3             x 
     */
    var tetromino = new Tetromino(0, 0, tlol.tSpec.line());
    var actuals = tetromino.getNextPositionCoords(tlol.direction.UP);
    var expecteds = [[2, 0], [2, 1], [2, 2], [2, 3]];
    deepEqual(actuals, expecteds, "tlol.tSpec.line() rotate");

    /**
     *   0 1 2 0 1 2
     * 0   a b   d a
     * 1   d c   c b
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.square());
    actuals = tetromino.getNextPositionCoords(tlol.direction.UP);
    expecteds = [[ 2, 0], [2, 1], [ 1, 1], [1, 0]];
    deepEqual(actuals, expecteds, "tlol.tSpec.square()");

    /**
     *   0 1 2 0 1 2 
     * 0   x     x
     * 1 x x x   x x
     * 2         x
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.t());
    actuals = tetromino.getNextPositionCoords(tlol.direction.UP);
    expecteds = [[1, 0], [1, 1], [1, 2], [2, 1]];
    deepEqual(actuals, expecteds, "tlol.tSpec.t()");

    /**
     *   0 1 2 0 1 2
     * 0 x x       x
     * 1   x x   x x
     * 2         x
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.s_left());
    actuals = tetromino.getNextPositionCoords(tlol.direction.UP);
    expecteds = [[1, 1], [1, 2], [2, 0], [2, 1]];
    deepEqual(actuals, expecteds, "tlol.tSpec.s_left()");

    /**
     *   0 1 2 0 1 2
     * 0   x x   x
     * 1 x x     x x
     * 2           x
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.s_right());
    actuals = tetromino.getNextPositionCoords(tlol.direction.UP);
    expecteds = [[1, 0], [1, 1], [2, 1], [2, 2]];
    deepEqual(actuals, expecteds, "tlol.tSpec.s_right()");

    /**
     *   0 1 2 0 1 2
     * 0 x       x x
     * 1 x x x   x
     * 2         x
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.l_right());
    actuals = tetromino.getNextPositionCoords(tlol.direction.UP);
    expecteds = [[1, 0], [1, 1], [1, 2], [2, 0]];
    deepEqual(actuals, expecteds, "tlol.tSpec.l_right()");

    /**
     *   0 1 2 0 1 2
     * 0     x   x
     * 1 x x x   x
     * 2         x x
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.l_left());
    actuals = tetromino.getNextPositionCoords(tlol.direction.UP);
    expecteds = [[1, 0], [1, 1], [1, 2], [2, 2]];
    deepEqual(actuals, expecteds, "tlol.tSpec.l_left()");
});

test("Tetromino.move(tlol.direction.UP) - rotate", function(assert) {
    var buildSquare = tlol.squareFactory.buildSquare;

    var tSpec = tlol.tSpec.s_left();

    /**
     *   0 1 2 0 1 2
     * 0 x x       x
     * 1   x x   x x
     * 2         x
     */         
    var tetromino = new Tetromino(0, 0, tSpec);
    tetromino.move(tlol.direction.UP);
    var actuals = tetromino.getSquares();
    var expecteds = [buildSquare(1, 1, tSpec.getCSSClass()),
                     buildSquare(1, 2, tSpec.getCSSClass()),
                     buildSquare(2, 0, tSpec.getCSSClass()),
                     buildSquare(2, 1, tSpec.getCSSClass())];
    assert.equalSqrArr(actuals, expecteds, "tlol.tSpec.s_left()");

    /**
     *   33 34 35 33 34 35
     * 45 x  x           x
     * 46    x  x     x  x
     * 47             x
     */
    tetromino = new Tetromino(33, 45, tSpec);
    tetromino.move(tlol.direction.UP);
    actuals = tetromino.getSquares();
    expecteds = [buildSquare(34, 46, tSpec.getCSSClass()),
                 buildSquare(34, 47, tSpec.getCSSClass()),
                 buildSquare(35, 45, tSpec.getCSSClass()),
                 buildSquare(35, 46, tSpec.getCSSClass())];
    assert.equalSqrArr(actuals, expecteds, 
                       "tlol.tSpec.s_left() - (33, 45) offset");

    tSpec = tlol.tSpec.line();

    /**
     *  0123 0123 
     * 0       x
     * 1xxxx   x
     * 2       x
     * 3       x
     */     
    tetromino = new Tetromino(0, 0, tSpec);
    tetromino.move(tlol.direction.UP);
    actuals = tetromino.getSquares();
    expecteds = [buildSquare(2, 0, tSpec.getCSSClass()),
                 buildSquare(2, 1, tSpec.getCSSClass()),
                 buildSquare(2, 2, tSpec.getCSSClass()),
                 buildSquare(2, 3, tSpec.getCSSClass())];
    assert.equalSqrArr(actuals, expecteds, "tlol.tSpec.square() - 1 rotation");

    /**
     *  0123
     * 0    
     * 1    
     * 2xxxx
     * 3    
     */         
    tetromino = new Tetromino(0, 0, tSpec);
    tetromino.move(tlol.direction.UP);
    tetromino.move(tlol.direction.UP);
    actuals = tetromino.getSquares();
    cssClass = tlol.tSpec.line().getCSSClass();
    expecteds = [buildSquare(0, 2, tSpec.getCSSClass()),
                 buildSquare(1, 2, tSpec.getCSSClass()),
                 buildSquare(2, 2, tSpec.getCSSClass()),
                 buildSquare(3, 2, tSpec.getCSSClass())];
    assert.equalSqrArr(actuals, expecteds, "tlol.tSpec.line() - 2 rotations");

    /**
     *  0123
     * 0     
     * 1xxxx
     * 2    
     * 3   
     */         
    tetromino = new Tetromino(0, 0, tSpec)
    tetromino.move(tlol.direction.UP);
    tetromino.move(tlol.direction.UP);
    tetromino.move(tlol.direction.UP);
    tetromino.move(tlol.direction.UP);
    actuals = tetromino.getSquares();
    expecteds = [buildSquare(0, 1, tSpec.getCSSClass()),
                 buildSquare(1, 1, tSpec.getCSSClass()),
                 buildSquare(2, 1, tSpec.getCSSClass()),
                 buildSquare(3, 1, tSpec.getCSSClass())];
    assert.equalSqrArr(actuals, expecteds, "tlol.tSpec.line() - 4 rotations");
});

test("Tetromino.getRows", function() {
    var tetromino = new Tetromino(0, 0, tlol.tSpec.line());
    var actuals = tetromino.getRows();
    var expecteds = [1];
    deepEqual(actuals, expecteds, "tlol.tSpec.line() base coords used rows");
    
    tetromino = new Tetromino(0, 0, tlol.tSpec.square());
    actuals = tetromino.getRows();
    expecteds = [0, 1];
    deepEqual(actuals, expecteds);
    
    tetromino = new Tetromino(0, 0, tlol.tSpec.t());
    actuals = tetromino.getRows();
    expecteds = [0, 1];
    deepEqual(actuals, expecteds, "tlol.tSpec.t() base coords used rows");
    
    tetromino = new Tetromino(5, 6, tlol.tSpec.s_right());
    actuals = tetromino.getRows();
    expecteds = [6, 7];
    deepEqual(actuals, expecteds);
    
    tetromino = new Tetromino(7, 8, tlol.tSpec.s_left());
    actuals = tetromino.getRows();
    expecteds = [8, 9];
    deepEqual(actuals, expecteds);
    
    /**
     *    55 56 57
     * 66  x
     * 67  x  x  x
     */
    tetromino = new Tetromino(55, 66, tlol.tSpec.l_right());
    actuals = tetromino.getRows();
    expecteds = [66, 67];
    deepEqual(actuals, expecteds);
    
    /**
     *    77 78 79
     * 88        x
     * 89  x  x  x
     */
    tetromino = new Tetromino(77, 88, tlol.tSpec.l_left());
    actuals = tetromino.getRows();
    expecteds = [88, 89];
    deepEqual(actuals, expecteds, "tlol.tSpec.l_left() (88, 89) offset used rows");
    
    /* After rotation */
    
    /**
     *   0 1 2 3
     * 0        
     * 1 x x x x
     * 2        
     * 3        
     */
    tetromino = new Tetromino(0, 0, tlol.tSpec.line());
    actuals = tetromino.getRows();
    expecteds = [1];
    deepEqual(actuals, expecteds, "tlol.tSpec.line() [1]");

    tetromino.move(tlol.direction.UP);
    actuals = tetromino.getRows();
    expecteds = [0, 1, 2, 3];
    deepEqual(actuals, expecteds, "tlol.tSpec.line() [0, 1, 2, 3]");

    tetromino.move(tlol.direction.UP);
    actuals = tetromino.getRows();
    expecteds = [2];
    deepEqual(actuals, expecteds, "tlol.tSpec.line() [2]");

    tetromino.move(tlol.direction.UP);
    actuals = tetromino.getRows();
    expecteds = [0, 1, 2, 3];
    deepEqual(actuals, expecteds, "tlol.tSpec.line() [0, 1, 2, 3]");
     
    /**
     *    4 5 6 7
     *  8        
     *  9 x x x x
     * 10        
     * 11        
     */
    tetromino = new Tetromino(4, 8, tlol.tSpec.line());
    tetromino.move(tlol.direction.UP);
    actuals = tetromino.getRows();
    expecteds = [8, 9, 10, 11];
    deepEqual(actuals, expecteds, "tlol.tSpec.line() rotated (4, 8)");
    
    tetromino = new Tetromino(0, 0, tlol.tSpec.square());
    tetromino.move(tlol.direction.UP);
    actuals = tetromino.getRows();
    expecteds = [0, 1];
    deepEqual(actuals, expecteds);
    
    tetromino = new Tetromino(0, 0, tlol.tSpec.t());
    tetromino.move(tlol.direction.UP);
    actuals = tetromino.getRows();
    expecteds = [0, 1, 2];
    deepEqual(actuals, expecteds, "tlol.tSpec.t() rotated");
    
    tetromino = new Tetromino(5, 6, tlol.tSpec.s_right());
    tetromino.move(tlol.direction.UP);
    actuals = tetromino.getRows();
    expecteds = [6, 7, 8];
    deepEqual(actuals, expecteds);
    
    tetromino = new Tetromino(7, 8, tlol.tSpec.s_left());
    tetromino.move(tlol.direction.UP);
    actuals = tetromino.getRows();
    expecteds = [8, 9, 10];
    deepEqual(actuals, expecteds);
    
    tetromino = new Tetromino(55, 66, tlol.tSpec.l_right());
    tetromino.move(tlol.direction.UP);
    actuals = tetromino.getRows();
    expecteds = [66, 67, 68];
    deepEqual(actuals, expecteds);
    
    tetromino = new Tetromino(77, 88, tlol.tSpec.l_left());
    tetromino.move(tlol.direction.UP);
    actuals = tetromino.getRows();
    expecteds = [88, 89, 90];
    deepEqual(actuals, expecteds);    
});
    
/* EOF */

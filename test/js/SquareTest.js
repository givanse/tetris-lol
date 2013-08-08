
test("Square constructor", function() {
    var square = new Square(-1, -1);
    ok((square instanceof Square));

    square = new Square(0, -1);
    ok(square instanceof Square);

    square = new Square(-1, 0);
    ok(square instanceof Square);

    square = new Square(0, 0);
    ok(square instanceof Square);

    square = new Square(0, 0, 'invalidTetrominoType');
    ok(square instanceof Square);

    square = new Square(0, 0, LINESHP);
    ok(square instanceof Square);
});

test("Square.setX", function() {
    var square = new Square(-1, -1);
    square.setX(16);
    var expected = 16;
    var actual = square.getX();
    equal(actual, expected);

    expected = 16 * (31 + 1); /* This corresponds to SQUARE_SIZE */
    actual = parseInt(square.getDiv().style.left);
    equal(actual, expected);

    expected = -32; /* This corresponds to SQUARE_SIZE */
    actual = parseInt(square.getDiv().style.top);
    equal(actual, expected);
});

/* EOF */

test("squareFactory - square.getDiv", function() {
    tlol.square_size = 31;
    tlol.square_border_w = 1;

    var square = tlol.squareFactory
                     .buildSquare(5, 5, tlol.tSpec.s_right().getCSSClass());
    var expected = document.createElement("div");
    expected.className = "square SSHP_R";
    expected.style.width = "31px";
    expected.style.height = "31px";
    tlol.ui.translate3d(expected, 160, 160, 0);
    expected.setAttribute("buffer", "false");
    var actual = square.getDiv();
    deepEqual(actual, expected, "div clone");

    tlol.square_size = null;
    tlol.square_border_w = null;

    square = tlol.squareFactory
                 .buildSquare(0, 0, tlol.tSpec.s_right().getCSSClass());
    actual = square.getDiv();
    notDeepEqual(actual, expected, "div with different position");

    square = tlol.squareFactory
                 .buildSquare(5, 5, tlol.tSpec.s_left().getCSSClass());
    actual = square.getDiv();
    notDeepEqual(actual, expected, "div with different CSS class");

    square = tlol.squareFactory
                 .buildSquare(7, 8, "unknownCssClass");
    expected = "square unknownCssClass";
    actual = square.getDiv().className;
    equal(actual, expected, "div with unknown CSS class");

});

/**
 * This test will pass only in Chrome or Safari. (Webkit)
 */
test("squareFactory - square.setX", function() {
    tlol.square_size = 31;
    tlol.square_border_w = 1;

    var square = tlol.squareFactory
                     .buildSquare(-1, -1, tlol.tSpec.t().getCSSClass());
    square.setX(16);
    var expected = 16;
    var actual = square.getX();
    equal(actual, expected, "set x to 16");

    expected = "translate3d(512px, 0px, 0px)"; /* 16 * 32 */
    actual = square.getDiv().style.WebkitTransform;
    equal(actual, expected, "x to pixels 512");

    tlol.square_size = null;
    tlol.square_border_w = null;
});

/**
 * This test will pass only in Chrome or Safari.
 */
test("squareFactory - square.setY", function() {
    tlol.square_size = 31;
    tlol.square_border_w = 1;

    var square = tlol.squareFactory
                     .buildSquare(-1, -1, tlol.tSpec.t().getCSSClass());
    square.setY(16);
    var expected = 16;
    var actual = square.getY();
    equal(actual, expected, "set y to 16");

    expected = "translate3d(0px, 512px, 0px)"; /* 16 * 32 */
    actual = square.getDiv().style.WebkitTransform;
    equal(actual, expected, "y to pixels 512");

    tlol.square_size = null;
    tlol.square_border_w = null;
});

test("squareFactory.buildSquare", function() {

    var buildSquare = tlol.squareFactory.buildSquare;
    var cssClass = tlol.tSpec.square().getCSSClass();

    var sqr = buildSquare(0, 0, cssClass);
    strictEqual(sqr.getX(), 0);
    strictEqual(sqr.getY(), 0);

    sqr = buildSquare(-1, -1, cssClass);
    strictEqual(sqr.getX(), 0);
    strictEqual(sqr.getY(), 0);

    var sqr1 = buildSquare(2, 3, cssClass);
    var sqr2 = buildSquare(2, 3, cssClass);
    equal(sqr1.getX(), sqr2.getX(), "sqr1, sqr2 same x");
    equal(sqr1.getY(), sqr2.getY(), "sqr1, sqr2 same y");
    deepEqual(sqr1.getDiv(), sqr2.getDiv(), "sqr1, sqr2 same div");
    ok(sqr1.isEqual(sqr2), "sqr1 same as sqr2");
});

/* EOF */

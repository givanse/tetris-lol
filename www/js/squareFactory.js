/**
 * Build a new square object. Later, on Tetromino.js the tetris shapes will be 
 * built with four squares each.
 *
 */
tlol.squareFactory = (function() {

    /**
     * The value the defines this object is its <div> instance member, it
     * is the value (DOM element) that reflects the state of the object.
     */
    function buildSquare(x, y, cssClass) {

        function isEqual(otherSquare) {
            if (!otherSquare ||
                !otherSquare.hasOwnProperty("getX") ||
                !otherSquare.hasOwnProperty("getY") ||
                !otherSquare.hasOwnProperty("getDiv")) {
                return false;
            }

            return square.getX() === otherSquare.getX() &&
                   square.getY() === otherSquare.getY() &&
                   square.getDiv().isEqualNode(otherSquare.getDiv());
        };

        function setX(newX) {
            x = newX;
            translate3d();
        };

        function setY(newY) { 
            y = newY; 
            translate3d();

            if (y < 2) {
                div.setAttribute('buffer', 'true');
            } else {
                div.setAttribute('buffer', 'false');
            }
        };

        function translate3d() {
            var w = tlol.square_size + tlol.square_border_w;
            var xPx = w * x;
            var yPx = w * y;
            tlol.ui.translate3d(div, xPx, yPx, 0);
        }
    
        /* Init Square */
        x = (x < 0) ? 0 : x;
        y = (y < 0) ? 0 : y;

        var div = document.createElement('div');
        div.className = 'square ' + cssClass;
        div.style.width = tlol.square_size  + 'px';
        div.style.height = tlol.square_size + 'px';

        var square = {
            description: (function () { /* used for debugging */ 
                return "("+x+", "+y+") "+cssClass; 
            })(),
            isEqual: isEqual,
            getDiv: function() { return div; },
            getX: function() { return x; }, /* The column value */
            getY: function() { return y; }, /* The row value */
            setX: setX,
            setY: setY
        };
        square.setX(x);
        square.setY(y);

        return square;
    }; /* buildSquare */

    var that = {
        buildSquare: buildSquare,
        buildSquaresMatrix: function (widthInSquares, heightInSquares) { 
            return new SquaresMatrix(widthInSquares, heightInSquares); 
        }
    };

    return that;
})(); /* tlol.squareFactory */

/*EOF*/

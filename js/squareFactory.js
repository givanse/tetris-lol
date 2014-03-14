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
    var newSquare =  function(x, y, cssClass) {

        if (typeof cssClass !== 'string') {
            throw {
                name: 'TypeError',
                message: 'Square must receive a cssClass that is a valid CSS class name.'
            };
        }

        var div = document.createElement('div');
        div.className = 'square ' + cssClass;

        var setX = function(newX) {
            x = newX;
            /* Update positioning */
            div.style.left = x * tlol.square_size + 'px';                                     
        };

        var setY = function(newY) { 
            y = newY; 
            /* Update positioning */
            div.style.top  = y * tlol.square_size + 'px';
            if (y < 2) {
                div.setAttribute("buffer", "true");
            } else {
                div.setAttribute("buffer", "false");
            }
        };
    
        var isEqual = function(otherSquare) {
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

        setX(x);
        setY(y);

        var square = {
            setX: setX,
            setY: setY,
            getX: function() { return x; },
            getY: function() { return y; },
            getDiv: function() { return div; },
            isEqual: isEqual
        };

        return square;
    }; /* newSquare */

    var that = {
        buildSquare: newSquare,
        buildSquaresMatrix: function(widthInSquares, heightInSquares) { 
            return new SquaresMatrix(widthInSquares, heightInSquares); }
    };

    return that;
})(); /* Square */

/* EOF */

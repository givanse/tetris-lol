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

        if ( ! tlol.util.isString(cssClass) ) {
            throw {
                name: 'TypeError',
                message: 'Square must receive a cssClass ' + 
                         'that is a valid CSS class name.'
            };
        }

        x = (x < 0) ? 0 : x;
        y = (y < 0) ? 0 : y;

        var div = document.createElement('div');
        div.className = 'square ' + cssClass;
        div.style.width = tlol.square_size  + 'px';
        div.style.height = tlol.square_size + 'px';

        setX(x);
        setY(y);

        function setX(newX) {
            x = newX;

            var pos = (tlol.square_size + tlol.square_border_w) * x;
            div.style.left = pos + 'px';
        };

        function setY(newY) { 
            y = newY; 

            var pos = (tlol.square_size + tlol.square_border_w) * y;
            div.style.top = pos + 'px';

            if (y < 2) {
                div.setAttribute("buffer", "true");
            } else {
                div.setAttribute("buffer", "false");
            }
        };
    
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

        var square = {
            setX: setX,
            setY: setY,
            getX: function() { return x; },
            getY: function() { return y; },
            getDiv: function() { return div; },
            isEqual: isEqual,
            /* used for debugging */
            description: (function () { return "("+x+", "+y+") "+cssClass; })() 
        };

        return square;
    }; /* buildSquare */

    /**
     * Fades in or out a list of squares.
     */
    function fade(isFadeIn, squares, 
                  startOpacity, targetOpacity, fadeSpeed, callback) {

        function setElementOpacity(element, opacity) {
            element.style.opacity = "alpha(opacity=" + opacity + ")";   /* IE */      
            element.style.opacity = (opacity / 100);        /* Other browsers */
        }

        var opacity = startOpacity;
        var timerId = setInterval(function() {
            if ( opacity !== targetOpacity ) {
                isFadeIn ? opacity++ : opacity-- ;

                for (var i = 0; i < squares.length; i++) {
                    var div = squares[i].getDiv();
                    setElementOpacity(div, opacity);
                }
            } else {
                clearInterval(timerId);
                callback();
            }
        }, fadeSpeed);
    };

    var that = {
        buildSquare: buildSquare,
        buildSquaresMatrix: function (widthInSquares, heightInSquares) { 
            return new SquaresMatrix(widthInSquares, heightInSquares); 
        },
        fadeIn: function (squares, fadeSpeed, callback) {
            fade(true, squares, 0, 100, fadeSpeed, callback);
        },
        fadeOut: function (squares, fadeSpeed, callback) {
            fade(false, squares, 100, 0, fadeSpeed, callback);
        }
    };

    return that;
})(); /* tlol.squareFactory */

/* EOF */

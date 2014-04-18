/**
 *
 */
tlol.util = {

    isArray: function(obj) {
        return Object.prototype.toString.apply(obj) === "[object Array]";
    },

    isString: function(obj) {
        return typeof obj === 'string' || obj instanceof String;
    },

    isSquare: function(obj) {
        return obj &&
               obj.hasOwnProperty("getX") &&
               obj.hasOwnProperty("getY") &&
               obj.hasOwnProperty("getDiv")
    }

};

/*EOF*/

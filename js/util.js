
tlol.util = {
    isArray: function(obj) {
        return Object.prototype.toString.apply(obj) === "[object Array]";
    },
    isString: function(obj) {
        return obj === 'string' || obj instanceof String;
    }
};

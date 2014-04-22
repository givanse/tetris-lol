/**
 *
 */
tlol.ui = (function() {

    function fade(isFadeIn, element, 
                  startOpacity, targetOpacity, fadeSpeed, callback) {

        function setElementOpacity(element, opacity) {
            element.style.opacity = "alpha(opacity=" + opacity + ")";   /* IE */      
            element.style.opacity = (opacity / 100);        /* Other browsers */
        }

        var opacity = startOpacity;

        var timerId = setInterval(function() {
            if ( opacity !== targetOpacity ) {

                isFadeIn ? opacity++ : opacity-- ;

                setElementOpacity(element, opacity);

            } else {
                clearInterval(timerId);
                callback();
            }
        }, fadeSpeed);
    };

    var that = {
        fadeIn: function (element, fadeSpeed, callback) {
            fade(true, element, 0, 100, fadeSpeed, callback);
        },
        fadeOut: function (element, fadeSpeed, callback) {
            fade(false, element, 100, 0, fadeSpeed, callback);
        }
    };

    return that;
})();

/*EOF*/

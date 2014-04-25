/**
 *
 */
tlol.ui = {

    fadeOut: function (element, fadeTime, callback) {
       'use strict';

       function callbackInvoker() {
           callback();
           element.removeEventListener("oTransitionend", callbackInvoker, false);
           element.removeEventListener("mozTransitionend", callbackInvoker, false);
           element.removeEventListener("msTransitionend", callbackInvoker, false);
           element.removeEventListener("webkitTransitionEnd", callbackInvoker, false);
           element.removeEventListener("transitionend", callbackInvoker, false);
       };

       if (callback) {
           element.addEventListener("oTransitionend", callbackInvoker, false);
           element.addEventListener("mozTransitionend", callbackInvoker, false);
           element.addEventListener("msTransitionend", callbackInvoker, false);
           element.addEventListener("webkitTransitionEnd", callbackInvoker, false);
           element.addEventListener("transitionend", callbackInvoker, false);
       }
       var value = "opacity " + fadeTime + "s ease-in-out";
       this.transition(element, value);
       element.style.opacity = "0";
    },

    fadeOutSqrsArr: function (squares, fadeSpeed, callback) {
        var div = null;
        var lastIndx = squares.length - 1;
        for (var i = 0; i < lastIndx; i++) {
            var div = squares[i].getDiv();
            this.fadeOut(div, fadeSpeed);
        }
        div = squares[ lastIndx ].getDiv();
        this.fadeOut(div, fadeSpeed, callback);
    },

    /**
     * Apply a CSS3 transition.
     */
    transition: function (element, value) {
        'use strict';
        element.style.OTransition      = value; // Opera
        element.style.MozTransition    = value; // Firefox
        element.style.MsTransition     = value; // IE 9
        element.style.WebkitTransition = value; // Safari and Chrome
        element.style.transition       = value;
    },

    /**
     * Apply a CSS3 tranformation.
     */
    transform: function (element, value) {
        'use strict';
        element.style.OTransform      = value; // Opera
        element.style.MozTransform    = value; // Firefox
        element.style.MsTransform     = value; // IE 9
        element.style.WebkitTransform = value; // Safari and Chrome
        element.style.transform       = value;
    },

    /**
     *
     * http://jsperf.com/translate3d-vs-xy/86
     */
    translate3d: function (elem, x, y, z) {
        'use strict';
        var value = 'translate3d(' + x + 'px ,' +
                                     y + 'px ,' +
                                     z + 'px )';
        this.transform(elem, value);
    }

}

/*EOF*/

/**
 * Functions that are platform dependent.
 */   

tlol.browser = {

    browserTest: function (regex) {
        'use strict';
        return regex.test(navigator.userAgent);
    },

    isIE: function () {
        'use strict';
        return this.browserTest(/IE/);
    },

    isFirefox: function () {
        'use strict';
        return this.browserTest(/Firefox/);
    },

    isSafari: function () {
        'use strict';
        return this.browserTest(/Safari/);
    },

    getWidth: function () {
        'use strict';
        /* http://stackoverflow.com/a/11744120/7852 */
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0];

        return w.innerWidth || e.clientWidth || g.clientWidth;
    },

    getHeight: function () {
        'use strict';
        /* http://stackoverflow.com/a/11744120/7852 */
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0];

        return w.innerHeight|| e.clientHeight|| g.clientHeight; 
    }
};

/*EOF*/

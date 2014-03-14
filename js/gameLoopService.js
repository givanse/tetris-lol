
/**
 * @gameRunCallback - Is the function that will be called in each iteration of 
 *                    the game loop.
 */
tlol.gameLoopService = function(gameRunCallback) {

    var callback = null;

    if (typeof gameRunCallback === 'string' || 
        gameRunCallback instanceof String) {
        throw {
                name: 'TypeError',
                message: 'setInterval() can not receive a string of code'
            };
    } else {
        callback = gameRunCallback;
    }

    var startLoop = function() {
        var interval = 1000 * 1; /* 1 second */
        return setInterval(callback, interval);
    };

    var bindKeyEvents = function() {
        var eventName = ( isSafari() || isIE() ) ? 'keydown' : 'keypress';

        var callBack = function(ev) { 
                handleKeyEvent(ev); 
            };

        if (window.addEventListener) {
            document.addEventListener(eventName, callBack, false);
        } else {
            document.attachEvent('on' + eventName, callBack);
        }
    };

    var handleKeyEvent = function(ev) {
        var keyCode = window.event ? window.event.keyCode : 
                                     ev ? ev.keyCode : null;
        var dir = null;
        switch(keyCode) {
            case 37:
                dir = tlol.direction.left; 
                break;
            case 38: 
                dir = tlol.direction.up; 
                break;
            case 39:
                dir = tlol.direction.right; 
                break;
            case 40:
                dir = tlol.direction.down; 
                break;
        }

        if (dir) {
            callback(dir);
        }
    };

    /* init object */
    bindKeyEvents();

    /* Public interface */
    var that = {
        start: startLoop 
    };

    return that;

}; /* gameLoopService */

/* EOF */

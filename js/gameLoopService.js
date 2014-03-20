
/**
 * Singleton object that provides the game loop service for tetrisGame(.js)
 *
 * @gameRunCallback - Is the function that will be called in each iteration of 
 *                    the game loop.
 */
tlol.gameLoopService = (function() {

    var callback = null;

    var startLoop = function() {
        if ( ! callback ) {
            throw {
                name: '',
                message: 'The game run callback has not been set. ' +
                         'Please use setGameRunCallback().'
            };
        }

        var gameTimer = (function() {                                                      
            var               gameSpeed = 1000 * 1;                              
            var            gameSpeedMax = 250 * 1;                               
            var      gameSpeedIncrement = 50 * 1;                                
            var targetTimeForMaxSpeed = 1000 * 60 * 7; /* 7 min */
            var gameSpeedIncrementSpeed = targetTimeForMaxSpeed / 
                                          ( (gameSpeed - gameSpeedMax) / 
                                            gameSpeedIncrement );                              
                                                                                 
            /* start the game timer */
            var callbackTimerId = setInterval(callback, gameSpeed);

            /* automate speed increments */
            var incrementTimerId = setInterval(function() {                      
                    if (gameSpeed <= gameSpeedMax) {                             
                        /* stop speed increments */                              
                        clearInterval(incrementTimerId);                         
                    } else {                                                     
                        /* increment speed */                                    
                        gameSpeed = gameSpeed - gameSpeedIncrement;              

                        /*TODO: review if already elapsed time should be considered*/
                        clearInterval(callbackTimerId);
                        callbackTimerId = setInterval(callback, gameSpeed);
                    }                                                            
                },                                                               
                gameSpeedIncrementSpeed);                                        
                                                                                 
            var that = {
                getIntervalId: function() { return callbackTimerId; }
            };

            return that;                                                         
        })();

        return gameTimer;
    }; /* startLoop */

    var bindKeyEvents = function() {
        var eventName = ( tlol.browser.isSafari() || tlol.browser.isIE() ) ? 
                        'keydown' : 'keypress';

        var callback = function(ev) { 
            handleKeyEvent(ev); 
        };

        if (window.addEventListener) {
            document.addEventListener(eventName, callback, false);
        } else {
            document.attachEvent('on' + eventName, callback);
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

    var setCallback = function(gameRunCallback) {
        if ( tlol.util.isString(callback) ) {
            throw {
                name: 'TypeError',
                message: 'setInterval() can not receive a string of code'
            };
        } else {
            callback = gameRunCallback;
        }
    };

    /* init object */
    bindKeyEvents();

    /* Public interface */
    var glsObj = {
        start: startLoop,
        setGameRunCallback: setCallback 
    };

    return glsObj;

})(); /* gameLoopService */

/* EOF */

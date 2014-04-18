
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
            var gameSpeed = null;                              
            var gameSpeedMax = null;                               
            var gameSpeedIncrement = null;                                
            var targetTimeForMaxSpeed = null;
            var gameSpeedIncrementSpeed = null; 
            var callbackTimerId = null;
            var incrementTimerId = null;                      

            function startAutomatedGameSpeedIncrements() {
                incrementTimerId = setInterval(function() {                      
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

            }

            function stop() {
                clearInterval(callbackTimerId);
                clearInterval(incrementTimerId);
            }

            function resetValues() {
                              gameSpeed = 1000 * 1;                              
                           gameSpeedMax = 250 * 1;                               
                     gameSpeedIncrement = 50 * 1;                                
                  targetTimeForMaxSpeed = 1000 * 60 * 7; /* 7 min */
                gameSpeedIncrementSpeed = targetTimeForMaxSpeed / 
                                          ( (gameSpeed - gameSpeedMax) / 
                                            gameSpeedIncrement );                              
                stop();
                callbackTimerId = setInterval(callback, gameSpeed);
                startAutomatedGameSpeedIncrements();
            }

            var that = {
                resetValues: resetValues,
                stop: stop
            };

            return that;                                                         
        })();

        gameTimer.resetValues();

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
        startLoop: startLoop,
        setGameRunCallback: setCallback 
    };

    return glsObj;

})(); /* gameLoopService */

/* EOF */

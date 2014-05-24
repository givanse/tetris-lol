/**
 * Singleton object that provides the game loop service for tetrisGame(.js) 
 *
 * The game loop service provides a timed infinite loop and handles user events,
 * i.e. keyboard and swipe events.
 *
 */
tlol.gameLoopService = (function () {

    /**
      * Based on platform, register keyboard listeners.
      */
    function registerKeyListener() {
       "use strict";

        var keyEventName = ( tlol.browser.isSafari() || tlol.browser.isIE() ) ? 
                           'keydown' : 'keypress';

        if ( window.addEventListener ) { 
            document.addEventListener(keyEventName, handleKeyEvent, false);
        } else { /* IE */
            document.attachEvent('on' + keyEventName, handleKeyEvent);
        }

        function handleKeyEvent(evt) {
            var keyCode = window.event ? window.event.keyCode : 
                                         evt ? evt.keyCode : null;
            var dir = null;
            switch ( keyCode ) {
                case 37:
                    dir = tlol.direction.LEFT; 
                    break;
                case 38: 
                    dir = tlol.direction.UP; 
                    break;
                case 39:
                    dir = tlol.direction.RIGHT; 
                    break;
                case 40:
                    dir = tlol.direction.DOWN; 
                    break;
            }
            glsCallback( dir );
        };

    } /* registerKeyListener */

    function registerTouchListener() {
       "use strict";

        var options = {
            doubleTapInterval: 300,
            drag: false,
            preventDefault: true,
            swipeVelocityX: 0.05,
            swipeVelocityY: 0.05
        };
        var hammertime = new Hammer(document, options);
        hammertime.on("swipeup dragup", function (ev){ 
            glsCallback( tlol.direction.UP );
        });
        hammertime.on("swipedown", function (ev){ 
            glsCallback( tlol.direction.DOWN );
        });
        hammertime.on("swipeleft", function (ev){ 
            glsCallback( tlol.direction.LEFT );
        });
        hammertime.on("swiperight", function (ev){ 
            glsCallback( tlol.direction.RIGHT );
        });
        hammertime.on("doubletap", function (ev){ 
            glsCallback( tlol.direction.DROP );
        });

    }; /* registerTouchListener */

    function setCallback(gameRunCallback) {
        if ( tlol.util.isString(glsCallback) ) {
            throw {
                name: 'TypeError',
                message: 'setInterval() can not receive a string of code'
            };
        } else {
            glsCallback = gameRunCallback;
        }
    };

    var loopServiceHandle = (function() {
        "use strict";

        var currGSpeed = null;

        var incrementSpeedSpeed = null; 
        var glsCallbackTimerId = null;
        var incrementTimerId = null;                      

        function startAutomatedGameSpeedIncrements() {
            var totalIncrements = ( ( tlol.settings.gameSpeed - 
                                      tlol.settings.gameSpeedMax ) / 
                                      tlol.settings.speedIncrement );
            var incrementsSpeed = tlol.settings.targetTimeForMaxSpeed / 
                                  totalIncrements; 
            incrementTimerId = setInterval(function() {                      
                if ( currGSpeed <= tlol.settings.gameSpeedMax ) {                             
                    /* stop speed increments */                              
                    clearInterval(incrementTimerId);                         
                } else {                                                     
                    /* increment speed */                                    
                    currGSpeed = currGSpeed - tlol.settings.speedIncrement;              
                    console.log(currGSpeed + "/" + tlol.settings.gameSpeedMax);
                    /*TODO:review if already elapsed time should be considered*/
                    /* restart the loop service with the new speed */
                    clearInterval(glsCallbackTimerId);
                    glsCallbackTimerId = setInterval(glsCallback, currGSpeed);
                }                                                            
            }, incrementsSpeed);                                        
        }

        function stop() {
            clearInterval(glsCallbackTimerId);
            clearInterval(incrementTimerId);
        }

        function restart() {
            stop(); /* halt current service */
            /* schedule infinite loop */
            currGSpeed = tlol.settings.gameSpeed; 
            glsCallbackTimerId = setInterval(glsCallback, currGSpeed);
            startAutomatedGameSpeedIncrements();
        }

        var loopServiceHandle = {
            start: restart,
            stop: stop
        };

        return loopServiceHandle;                                                         
    })(); /* var loopServiceHandle */

    /*Its the function that will be called in each iteration of the game loop.*/
    var glsCallback = null;

    registerKeyListener();
    registerTouchListener();

    /* Public interface for tlol.gameLoopService */
    var glsObj = {
        getLoopHandle: function () {
            if ( ! glsCallback ) {
                throw {
                    name: 'MissingCallback',
                    message: 'The game run glsCallback has not been set. ' +
                             'Please use setGameRunCallback().'
                };
            }

            return loopServiceHandle;
        },
        setGameRunCallback: setCallback 
    };

    return glsObj;

})(); /* gameLoopService */

/*EOF*/

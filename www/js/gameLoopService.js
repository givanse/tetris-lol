/**
 * Singleton object that provides the game loop service for tetrisGame(.js) 
 *
 * The game loop service provides a timed infinite loop and handles user events,
 * i.e. keyboard and swipe events.
 *
 */
tlol.gameLoopService = (function () {

   /* Its the function that will be called in each iteration of the game loop.*/
    var glsCallback = null;

    registerKeyboardListener();

    registerSwipeListener();

    /**
      * Based on platform, register keyboard listeners.
      */
    function registerKeyboardListener() {

        var eventName = ( tlol.browser.isSafari() || tlol.browser.isIE() ) ? 
                          'keydown' : 'keypress';

        if (window.addEventListener) {
            document.addEventListener(eventName, handleKeyEvent, false);
        } else {
            document.attachEvent('on' + eventName, handleKeyEvent);
        }

        function handleKeyEvent(ev) {
            var keyCode = window.event ? window.event.keyCode : 
                                         ev ? ev.keyCode : null;
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
            if ( dir ) {
                glsCallback( dir );
            }
        }; /* handleKeyEvent */

    }; /* registerKeyboardListener */

    function registerSwipeListener() {
        
    };

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

    function startLoop() {
        if ( ! glsCallback ) {
            throw {
                name: '',
                message: 'The game run glsCallback has not been set. ' +
                         'Please use setGameRunCallback().'
            };
        }

        var gameTimer = (function() {                                                      
            var gameSpeed = null;                              
            var gameSpeedMax = null;                               
            var gameSpeedIncrement = null;                                
            var targetTimeForMaxSpeed = null;
            var gameSpeedIncrementSpeed = null; 
            var glsCallbackTimerId = null;
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
                        clearInterval(glsCallbackTimerId);
                        glsCallbackTimerId = setInterval(glsCallback, gameSpeed);
                    }                                                            
                },                                                               
                gameSpeedIncrementSpeed);                                        

            }

            function stop() {
                clearInterval(glsCallbackTimerId);
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
                glsCallbackTimerId = setInterval(glsCallback, gameSpeed);
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

    /* Public interface */
    var glsObj = {
        startLoop: startLoop,
        setGameRunCallback: setCallback 
    };

    return glsObj;

})(); /* gameLoopService */

/* EOF */

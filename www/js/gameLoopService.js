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
    function registerEventsListeners() {

        var keyEventName = ( tlol.browser.isSafari() || tlol.browser.isIE() ) ? 
                           'keydown' : 'keypress';

        if ( window.addEventListener ) { 
            document.addEventListener(keyEventName, handleKeyEvent, false);
        } else { /* IE */
            document.attachEvent('on' + keyEventName, handleKeyEvent);
        }

        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);
        //document.addEventListener('touchend', handleTouchEnd, false);

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
        }; /* handleKeyEvent */

        var xDown = null;
        var yDown = null;
        var movDir = null;

        function handleTouchStart(evt) {
            //console.log("start");
            xDown = evt.touches[0].clientX;
            yDown = evt.touches[0].clientY;
        }; /* handleTouchStart */

        function handleTouchMove(evt) {
            if ( ! xDown || ! yDown ) {
                return;
            }
            //console.log("move");
            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;
            //console.log(xDown + ", " + yDown + " -> " +
            //            xUp + ", " + yUp);
            var xDiff = xDown - xUp; 
            var yDiff = yDown - yUp; 
            var xDiffAbs = Math.abs( xDiff ); 
            var yDiffAbs = Math.abs( yDiff ); 
            //var minSwipeLength = 30; /* pixels */

            //var movDir = null;
            /* use the most significant direction */
            if ( xDiffAbs > yDiffAbs ) {
                //if ( xDiffAbs < minSwipeLength ) {
                    //return; /* ignore small swipe */
                //}
                movDir = xDiff > 0 ? tlol.direction.LEFT :
                                     tlol.direction.RIGHT;
            } else {
                //if ( yDiffAbs < minSwipeLength ) {
                    //return; /* ignore small swipe */
                //}
                movDir = yDiff > 0 ? tlol.direction.UP :
                                     tlol.direction.DOWN;
    
            }
            glsCallback( movDir );
            xDown = null;
            yDown = null;
            movDir = null;
        }; /* handleTouchMove */

        function handleTouchEnd(evt) {
            if ( ! movDir ) {
                return;
            }
            glsCallback( movDir );
            xDown = null;
            yDown = null;
            movDir = null;
        }
    }; /* registerEventsListeners */

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
        var gameSpeed = null;                              
        var gameSpeedMax = null;                               
        var speedIncrement = null;                                
        var targetTimeForMaxSpeed = null;
        var incrementSpeedSpeed = null; 
        var glsCallbackTimerId = null;
        var incrementTimerId = null;                      

        function startAutomatedGameSpeedIncrements() {
            incrementTimerId = setInterval(function() {                      
                if (gameSpeed <= gameSpeedMax) {                             
                    /* stop speed increments */                              
                    clearInterval(incrementTimerId);                         
                } else {                                                     
                    /* increment speed */                                    
                    gameSpeed = gameSpeed - speedIncrement;              
                    console.log(gameSpeed + "/" + gameSpeedMax);
                    /*TODO: review if already elapsed time should be considered*/
                    clearInterval(glsCallbackTimerId);
                    glsCallbackTimerId = setInterval(glsCallback, gameSpeed);
                }                                                            
            },                                                               
            incrementSpeedSpeedInterval);                                        
        }

        /* Stop everything */
        function stop() {
            clearInterval(glsCallbackTimerId);
            clearInterval(incrementTimerId);
        }

        function restart() {
                         gameSpeed = 1000;            /* 1 row per second */                              
                      gameSpeedMax = 300;              /* 1/4 of a second */                       
                    speedIncrement = 50;                  /* 50 ms faster */                           
             targetTimeForMaxSpeed = 1000 * 60 * 3;/* 3 min for max speed */

            var totalIncrements = ( (gameSpeed - gameSpeedMax) / 
                                    speedIncrement );
            incrementSpeedSpeedInterval = targetTimeForMaxSpeed / 
                                          totalIncrements; 
            /* halt current service */
            stop();                               
            /* schedule infinite loop */
            glsCallbackTimerId = setInterval(glsCallback, gameSpeed);
            startAutomatedGameSpeedIncrements();
        } /* restart */

        var loopServiceHandle = {
            start: restart,
            stop: stop
        };

        return loopServiceHandle;                                                         
    })(); /* var loopServiceHandle */

    /* Its the function that will be called in each iteration of the game loop.*/
    var glsCallback = null;

    registerEventsListeners();

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

/**
 *
 */
var app = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event.
    onDeviceReady: function() {

        /* Find the DOM elements used for the game. */
        var domElements = {
            /* board */
            canvasBackground: document.getElementById("canvasBackground"),
            canvas: document.getElementById("canvas"),

            /* game info */
            nextTetrominoField: document.getElementById("nextTetromino"),
            scoreField: document.getElementById("score"),

            gameoverSplash: document.getElementById("gameoverSplash")
        };

        tlol.tetrisGame.initialize(domElements);

        var loadIndicator = document.getElementById("loadIndicator");
        var splashDuration = 1000;
        var loadIndicatorWidth = 0;
        var loadIndicatorWidthInc = 1;
        var loadIndicatorWidthMax = 180; /* 300px * 0.60 */

        var loadIndicatorTotalUpdates = loadIndicatorWidthMax / 
                                        loadIndicatorWidthInc;
        var loadIndicatorUpdateSpeed = splashDuration / 
                                       loadIndicatorTotalUpdates;
        var loadIntervalId = setInterval(function() {
            if ( loadIndicatorWidth === loadIndicatorWidthMax ) {
                clearInterval(loadIntervalId); 
                /* remove splash screen */
                var bootSplash = document.getElementById("bootSplash");
                bootSplash.parentNode.removeChild( bootSplash );
                /* start the game */
                tlol.tetrisGame.start();
            } else {
                loadIndicatorWidth += loadIndicatorWidthInc;
                loadIndicator.style.width = loadIndicatorWidth + "px";
            }
        }, loadIndicatorUpdateSpeed);

    } /* onDeviceReady */
};

/*EOF*/

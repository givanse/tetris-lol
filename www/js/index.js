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

        /* Init game components */
        tlol.tetrisGame.initialize(domElements);

        /* Animate boot splash */
        /* TODO: maybe http://stackoverflow.com/questions/7861648 */
        var loadIndicator = document.getElementById("loadIndicator");
        var indicatorWidth = 0;
        var indicatorWidthInc = 1;
        var indicatorWidthMax = 180; /* 300px * 0.60 */
        var indicatorTotalUpdates = indicatorWidthMax / indicatorWidthInc;
        var indicatorUpdateSpeed = tlol.settings.splashDuration / 
                                   indicatorTotalUpdates;
        var loadIntervalId = null;

        function updateBootSplash() {
            if ( indicatorWidth === indicatorWidthMax ) {
                clearInterval(loadIntervalId); 
                /* remove splash screen */
                var bootSplash = document.getElementById("bootSplash");
                bootSplash.parentNode.removeChild( bootSplash );
                /* start the game */
                tlol.tetrisGame.start();
            } else {
                indicatorWidth += indicatorWidthInc;
                loadIndicator.style.width = indicatorWidth + "px";
            }
        }

        loadIntervalId = setInterval(updateBootSplash, indicatorUpdateSpeed);

    } /* onDeviceReady */
};

/*EOF*/

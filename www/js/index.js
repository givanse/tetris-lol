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

        var splashDuration = 700;
        var splashFadeOutSpeed = 4;
        window.setTimeout(function () {
            var bootSplash = document.getElementById("bootSplash");

            tlol.ui.fadeOut(bootSplash, splashFadeOutSpeed, function () {
                bootSplash.parentNode.removeChild( bootSplash );
            });

            tlol.tetrisGame.startNewGame(domElements);
        }, splashDuration);
    }
};

/*EOF*/

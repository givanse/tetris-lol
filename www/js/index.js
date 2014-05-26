/**
 *
 */

"use strict";

var app = {

    initialize: function() {
        this.bindEvents();
    },

    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    bindEventsUI: function () {
        var newGameButton = document.getElementById("newgame");
        
        newGameButton.addEventListener('touchstart', function () {
            newGameButton.setAttribute("class", "touched");
        }, false);

        newGameButton.addEventListener('touchend', function () {
            newGameButton.setAttribute("class", "untouched");
        }, false);
    },

    // The scope of 'this' is the event.
    onDeviceReady: function () {

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
        var loaderIntervalId = null;

        function updateBootSplash() {
            if ( indicatorWidth === indicatorWidthMax ) {
                clearInterval(loaderIntervalId); 

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

        loaderIntervalId = setInterval(updateBootSplash, indicatorUpdateSpeed);
        app.bindEventsUI();
    } /* onDeviceReady */
};

/*EOF*/

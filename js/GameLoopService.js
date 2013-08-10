
function GameLoopService(gameRunCallback) {
    this.gameRunCallback = gameRunCallback; 
    this.bindKeyEvents();
}

GameLoopService.prototype.start = function() {
    var interval = 1000 * 1; /* 1 second */
    return setInterval(this.gameRunCallback, interval);
}

GameLoopService.prototype.bindKeyEvents = function() {
    var me = this;
    var event = (isSafari() || isIE()) ? "keydown" : "keypress";
    var callBack = function(e) { me.handleKey(e); };

    if(window.addEventListener) {
        document.addEventListener(event, callBack, false);
    } else {
        document.attachEvent('on' + event, callBack);
    }
}

GameLoopService.prototype.handleKey = function(ev) {
    var keyCode = this.getKeyCode(ev);
    var dir = '';
    switch(keyCode) {
        case 37:
            return this.gameRunCallback(LEFT);
        case 38: 
            return this.gameRunCallback(UP);
        case 39:
            return this.gameRunCallback(RIGHT);
        case 40:
            return this.gameRunCallback(DOWN);
    }
}

GameLoopService.prototype.getKeyCode = function(ev) {
    if(window.event)
        return window.event.keyCode;
    else if(ev)
        return ev.keyCode;
}

/* EOF */

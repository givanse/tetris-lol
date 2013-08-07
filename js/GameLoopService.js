
function GameLoopService(board) {
  this.board = board;
  this.bindKeyEvents();
}

/* Game service methods. */

GameLoopService.prototype.start = function() {
    var interval = 1000 * 1; /* 1 second */
    this.board.drawSquares();
    setInterval(this.run, interval);
}

GameLoopService.prototype.run = function(movementDirection = DOWN) {
    var movementPerformed = this.board.updateBoard(movementDirection);

    if(movementPerformed) {
        this.board.drawSquares();
    } else if(movementDirection == DOWN) {
        this.board.generateRandomTetromino();
    }
}

GameLoopService.prototype.pause = function() {

}

/* Key binding and handling. */

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
            return this.run(LEFT);
        case 38: 
            return this.run(UP);
        case 39:
            return this.run(RIGHT);
        case 40:
            return this.run(DOWN);
        case 27: /* esc: toggle pause */
            this.pause();
            break;
        default: /* other key, do nothing */
            break;
    }
}

GameLoopService.prototype.getKeyCode = function(ev) {
    if(window.event)
        return window.event.keyCode;
    else if(ev)
        return ev.keyCode;
}

/* EOF */

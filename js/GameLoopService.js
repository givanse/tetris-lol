
function GameLoopService(board) {
  this.board = board;
  this.bindKeyEvents();
}

GameLoopService.prototype.start = function() {
    var interval = 1000 * 1; /* 1 second */
    this.board.drawSquares();
    setInterval(this.run, interval);
}

GameLoopService.prototype.run = function() {
  this.board.updateSquares();
  this.board.drawSquares();
}

GameLoopService.prototype.pause = function() {

}

GameLoopService.prototype.bindKeyEvents = function() {                                   
    var me = this;
    var event = "keypress";                                                        
    if(isSafari() || isIE()) {                                                    
        event = "keydown";                                                           
    }                                                                              
    var cb = function(e) {                                                         
            /*TODO: almost same code as in the run() method */
            me.handleKey(e);                                                       
            me.board.drawSquares();
        };                                                                           
    if (window.addEventListener) {                                                 
        document.addEventListener(event, cb, false);                                 
    } else {                                                                       
        document.attachEvent('on' + event, cb);                                      
    }                                                                               
}      

GameLoopService.prototype.handleKey = function(e) {                                       
    var c = this.whichKey(e);                                                      
    var dir = '';                                                                  
    switch(c) {                                                                   
        case 37:                                                                     
            return this.board.move(LEFT);
        case 38: // up: rotate                                                       
            return this.board.move(UP);
        case 39:                                                                     
            return this.board.move(RIGHT);
        case 40:                                                                     
            return this.board.move(DOWN);
        case 27: // esc: toggle pause                                                
            this.pause(); break;                                                 
        default: /* other key, do nothing */ break;                                  
    }                                                                              
    return null;
}   

GameLoopService.prototype.whichKey = function(e) {                                        
    var c;                                                                         
    if(window.event) {                                                            
        c = window.event.keyCode;                                                    
    } else if(e) {                                                                
        c = e.keyCode;                                                               
    }                                                                              
    return c;                                                                      
}    

/* EOF */


function GameLoopService(board) {
  this.board = board;
}

GameLoopService.prototype.start = function() {
    var interval = 1000 * 1; /* 1 second */
    setInterval(this.run, interval);
}

GameLoopService.prototype.run = function() {
  this.board.updateSquares();
  this.board.drawSquares();
}


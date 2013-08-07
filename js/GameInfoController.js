
function GameInfoController(scoreField) {
    this.score = 0;
    
    this.scoreField = scoreField;
    this.scoreField.innerHTML = "" + this.score;
}


GameInfoController.prototype.increaseScore = function() {
    this.score++;
    this.scoreField.innerHTML = "" + this.score;
}

/* EOF */

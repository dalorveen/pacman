function PacManModel(spawnPoint) {
    CharacterModel.call(this, spawnPoint, "pacman");
    this._directionChosenByUser = directions.none;
    this._isAlive = true;
    this._ghostCounter = 0;
    this._score = {
        current: 0,
        high: 0,
        add: function (award) {
            this.current += award;
            if (this.current > this.high) {
                this.high = this.current;
            }
        }
    };
    this._lives = 3;
    this._event = new cc.EventCustom("pacManAteEnergizer");
}

PacManModel.prototype = Object.create(CharacterModel.prototype);

PacManModel.prototype.constructor = PacManModel;

PacManModel.prototype.update = function (dt, board) {
    this.move(board, this._directionChosenByUser, 0.15);

    if (this.isSnapToTile()) {
        var energizer = board.getEnergizer(this.coordinatesOfOccupiedTile(board));
        if (energizer !== null && energizer.isVisible()) {
            energizer.setVisible(false);
            // this._event.setUserData("isEnergizerEaten");
            cc.eventManager.dispatchEvent(this._event);
            this._ghostCounter = 0;
            this._score.add(50);
        }

        var dot = board.getDot(this.coordinatesOfOccupiedTile(board));
        if (dot !== null && dot.isVisible()) {
            dot.setVisible(false);
            this._score.add(10);
        }

        var fruit = board.getFruit(this.coordinatesOfOccupiedTile(board));
        if (fruit !== null && fruit.isVisible()) {
            fruit.setVisible(false);
            this._score.add(100);
        }
    }
}

PacManModel.prototype.setDirectionChosenByUser = function (direction) {
    this._directionChosenByUser = direction;
}

PacManModel.prototype.isAlive = function () {
    return this._isAlive;
}

PacManModel.prototype.die = function () {
    this._isAlive = false;
    this._lives--;
}

PacManModel.prototype.respawn = function () {
    CharacterModel.prototype.spawn.call(this);

    this._isAlive = true;
};

PacManModel.prototype.chaseAwayGhost = function () {
    this._score.add(Math.pow(2, ++this._ghostCounter) * 100);
}

PacManModel.prototype.getCurrentScore = function () {
    return this._score.current;
}

PacManModel.prototype.getHighScore = function () {
    return this._score.high;
}

PacManModel.prototype.getLives = function () {
    return this._lives;
}
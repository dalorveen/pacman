function PacManModel(spawnPoint) {
    CharacterModel.call(this, spawnPoint, "pacman");
    this._directionChosenByUser = directions.none;
}

PacManModel.prototype = Object.create(CharacterModel.prototype);

PacManModel.prototype.constructor = PacManModel;

PacManModel.prototype.update = function (dt, board) {
    this.move(board, this._directionChosenByUser, 0.12);
}

PacManModel.prototype.setDirectionChosenByUser = function (direction) {
    this._directionChosenByUser = direction;
}
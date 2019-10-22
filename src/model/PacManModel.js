function PacManModel(spawnPoint) {
    CharacterModel.call(this, spawnPoint, "pacman");
    this._directionChosenByUser = directions.none;

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
        }
    }
}

PacManModel.prototype.setDirectionChosenByUser = function (direction) {
    this._directionChosenByUser = direction;
}
function GhostModel(spawnPoint, name) {
    CharacterModel.call(this, spawnPoint, name);
    this._navigator = new Navigator(this);
}

GhostModel.prototype = Object.create(CharacterModel.prototype);

GhostModel.prototype.constructor = GhostModel;

GhostModel.prototype.update = function (dt, board, pacManModel) {
    var direction = this._navigator.directionTo(board, pacManModel.coordinatesOfOccupiedTile(board));
    this.move(board, direction, 0.12);
}
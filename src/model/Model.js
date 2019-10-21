function Model(tiledMap) {
    this._board = new Board(tiledMap);
    this._pacMan = new PacManModel(this._board.getSpawnPoint("pacman"));
    this._shadow = new GhostModel(this._board.getSpawnPoint("blinky"), "blinky");
    this._speedy = new GhostModel(this._board.getSpawnPoint("pinky"), "pinky");
    this._bashful = new GhostModel(this._board.getSpawnPoint("inky"), "inky");
    this._pokey = new GhostModel(this._board.getSpawnPoint("clyde"), "clyde");
}

Model.prototype.update = function (dt) {
    this._pacMan.update(dt, this._board);
};

Model.prototype.getBoard = function() {
    return this._board;
};

Model.prototype.getPacMan = function () {
    return this._pacMan;
};

Model.prototype.getShadow = function () {
    return this._shadow;
};

Model.prototype.getSpeedy = function () {
    return this._speedy;
};

Model.prototype.getBashful = function () {
    return this._bashful;
};

Model.prototype.getPokey = function () {
    return this._pokey;
};
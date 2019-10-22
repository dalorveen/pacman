function Model(tiledMap) {
    this._board = new Board(tiledMap);
    this._pacMan = new PacManModel(this._board.getSpawnPoint("pacman"));
    this._shadow = new GhostModel(this._board.getSpawnPoint("blinky"), "blinky");
    this._speedy = new GhostModel(this._board.getSpawnPoint("pinky"), "pinky");
    this._bashful = new GhostModel(this._board.getSpawnPoint("inky"), "inky");
    this._pokey = new GhostModel(this._board.getSpawnPoint("clyde"), "clyde");
}

Model.prototype.update = function (dt) {
    if (this._pacMan.isAlive()) {
        this._pacMan.update(dt, this._board);
        this._shadow.update(dt, this._board, this._pacMan);
        this._speedy.update(dt, this._board, this._pacMan);
        this._bashful.update(dt, this._board, this._pacMan);
        this._pokey.update(dt, this._board, this._pacMan);
    } else {
        this._pacMan.respawn();
        this._shadow.spawn();
        this._speedy.spawn();
        this._bashful.spawn();
        this._pokey.spawn();
    }
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
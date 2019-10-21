function Board(tiledMap) {
    this._tiledMap = tiledMap;
    this._sizeInPixels = cc.size(
            this._tiledMap.getMapSize().width * this._tiledMap.getTileSize().width,
            this._tiledMap.getMapSize().height * this._tiledMap.getTileSize().height);
}

Board.prototype.getTiledMap = function () {
    return this._tiledMap;
};

Board.prototype.getSizeInPixels = function () {
    return this._sizeInPixels;
};

Board.prototype.getTileSize = function () {
    return this._tiledMap.getTileSize();
};

Board.prototype.getSizeInTiles = function () {
    return this._tiledMap.getMapSize();
}

Board.prototype.getSpawnPoint = function (characterName) {
    var character = this.character(characterName);
    return cc.p(character.x, character.y);
};

Board.prototype.character = function (name) {
    var characters = this._tiledMap.getObjectGroup("characters");
    return characters.getObject(name);
};

Board.prototype.getWall = function (coordinates) {
    if (coordinates.x >= 0 && coordinates.x < this._tiledMap.getMapSize().width
        && coordinates.y >= 0 && coordinates.y < this._tiledMap.getMapSize().height) {
        return this._tiledMap.getLayer("walls").getTileAt(coordinates);
    } else {
        return null;
    }
}
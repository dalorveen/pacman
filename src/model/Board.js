function Board(tiledMap) {
    this._tiledMap = tiledMap;
}

Board.prototype.getTiledMap = function () {
    return this._tiledMap;
};

Board.prototype.getSpawnPoint = function (characterName) {
    const character = this.character(characterName);
    return cc.p(character.x, character.y);
};

Board.prototype.character = function (name) {
    const characters = this._tiledMap.getObjectGroup("characters");
    return characters.getObject(name);
};
function Board(tiledMap) {
    this.tiledMap = tiledMap;
}

Board.prototype.getTiledMap = function() {
    return this.tiledMap;
};
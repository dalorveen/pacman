function Model(tiledMap) {
    this.board = new Board(tiledMap);
}

Model.prototype.getBoard = function() {
    return this.board;
};
function View(model) {
    this.model = model;
}

View.prototype.getBoard = function () {
    return this.model.board.tiledMap;
};
function View(model) {
    this._model = model;
    this._pacMan = new PacManView(model.getPacMan());
    this._shadow = new GhostView(model.getShadow());
    this._speedy = new GhostView(model.getSpeedy());
    this._bashful = new GhostView(model.getBashful());
    this._pokey = new GhostView(model.getPokey());
}

View.prototype.getBoard = function () {
    return this._model.getBoard().getTiledMap();
};

View.prototype.getPacMan = function () {
    return this._pacMan.getSprite();
};

View.prototype.getShadow = function () {
    return this._shadow.getSprite();
};

View.prototype.getSpeedy = function () {
    return this._speedy.getSprite();
};

View.prototype.getBashful = function () {
    return this._bashful.getSprite();
};

View.prototype.getPokey = function () {
    return this._pokey.getSprite();
};
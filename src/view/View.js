function View(model) {
    this._model = model;
    this._pacMan = new PacManView(model.getPacMan());
    this._shadow = new GhostView(model.getShadow());
    this._speedy = new GhostView(model.getSpeedy());
    this._bashful = new GhostView(model.getBashful());
    this._pokey = new GhostView(model.getPokey());
    this._text = new TextView(model);
}

View.prototype.update = function (dt) {
    this._pacMan.draw();
    this._shadow.draw();
    this._speedy.draw();
    this._bashful.draw();
    this._pokey.draw();
    this._text.draw();
};

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

View.prototype.getLabelScore = function () {
    return this._text.getLabelScore();
};

View.prototype.getLabelScoreCounter = function () {
    return this._text.getLabelScoreCounter();
};

View.prototype.getLabelHighScore = function () {
    return this._text.getLabelHighScore();
};

View.prototype.getLabelHighScoreCounter = function () {
    return this._text.getLabelHighScoreCounter();
};

View.prototype.getLabelLives = function () {
    return this._text.getLabelLives();
};
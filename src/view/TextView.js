function TextView(model) {
    this._model = model;

    var text = model.getBoard().getTiledMap().getObjectGroup("text");
    
    var score = text.getObject("score");
    var scoreCounter = text.getObject("scoreCounter");

    var highScore = text.getObject("highScore");
    var highScoreCounter = text.getObject("highScoreCounter");

    var lives = text.getObject("lives");

    var fruits = text.getObject("fruits");

    var notice = text.getObject("notice");

    this._labelScore = cc.LabelTTF.create("1UP", "Arial", 20);
    this._labelScore.setPosition(score.x, score.y);
    this._labelScore.setFontFillColor(cc.color(255, 0, 0, 255));

    this._labelScoreCounter = cc.LabelTTF.create("0", "Arial", 18);
    this._labelScoreCounter.setPosition(scoreCounter.x, scoreCounter.y);
    this._labelScoreCounter.setFontFillColor(cc.color(0, 255, 255, 255));

    this._labelHighScore = cc.LabelTTF.create("HIGH-SCORE", "Arial", 20);
    this._labelHighScore.setPosition(highScore.x, highScore.y);
    this._labelHighScore.setFontFillColor(cc.color(255, 0, 0, 255));

    this._labelHighScoreCounter = cc.LabelTTF.create("0", "Arial", 18);
    this._labelHighScoreCounter.setPosition(highScoreCounter.x, highScoreCounter.y);
    this._labelHighScoreCounter.setFontFillColor(cc.color(0, 255, 255, 255));

    this._labelLives = cc.LabelTTF.create("x 3", "Arial", 18);
    this._labelLives.setPosition(lives.x, lives.y);
    this._labelLives.setFontFillColor(cc.color(0, 255, 0, 255));

    this._labelFruits = cc.LabelTTF.create("x 0", "Arial", 18);
    this._labelFruits.setPosition(fruits.x, fruits.y);
    this._labelFruits.setFontFillColor(cc.color(0, 255, 0, 255));

    this._labelNotice = cc.LabelTTF.create("READY!", "Arial", 26);
    this._labelNotice.setPosition(notice.x, notice.y);
    this._labelNotice.setFontFillColor(cc.color(255, 255, 0, 255));
}

TextView.prototype.getLabelScore = function () {
    return this._labelScore;
};

TextView.prototype.getLabelScoreCounter = function () {
    return this._labelScoreCounter;
};

TextView.prototype.getLabelHighScore = function () {
    return this._labelHighScore;
};

TextView.prototype.getLabelHighScoreCounter = function () {
    return this._labelHighScoreCounter;
};

TextView.prototype.getLabelLives = function () {
    return this._labelLives;
};

TextView.prototype.getFruitsEatenAmount = function () {
    return this._labelFruits;
};

TextView.prototype.getLabelNotice = function () {
    return this._labelNotice;
};

TextView.prototype.draw = function () {
    this._labelScoreCounter.setString(this._model.getPacMan().getCurrentScore());
    this._labelHighScoreCounter.setString(this._model.getPacMan().getHighScore());
    this._labelLives.setString("x " + this._model.getPacMan().getLives());
    this._labelFruits.setString("x " + this._model.getPacMan().getFruitsEatenAmount());
    this._labelNotice.setVisible(this._model.isWaiting()
        && this._model.getPacMan().isAlive()
        && this._model.getBoard().getRemainingDots() > 0);
};
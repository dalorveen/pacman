function PacManView(pacManModel) {
    CharacterView.call(this, pacManModel, cc.rect(148, 106, 20, 20));
    this._lastDirection = directions.none;

    this._movementAnimationToRight = new Animation([
        cc.rect(1, 85, 20, 20),
        cc.rect(22, 85, 20, 20),
        cc.rect(43, 85, 20, 20),
        cc.rect(64, 85, 20, 20),
        cc.rect(85, 85, 20, 20),
        cc.rect(106, 85, 20, 20),
        cc.rect(127, 85, 20, 20),
        cc.rect(148, 85, 20, 20)]);

    this._movementAnimationToLeft = new Animation([
        cc.rect(1, 64, 20, 20),
        cc.rect(22, 64, 20, 20),
        cc.rect(43, 64, 20, 20),
        cc.rect(64, 64, 20, 20),
        cc.rect(85, 64, 20, 20),
        cc.rect(106, 64, 20, 20),
        cc.rect(127, 64, 20, 20),
        cc.rect(148, 64, 20, 20)]);

    this._movementAnimationToUp = new Animation([
        cc.rect(1, 127, 20, 20),
        cc.rect(22, 127, 20, 20),
        cc.rect(43, 127, 20, 20),
        cc.rect(64, 127, 20, 20),
        cc.rect(85, 127, 20, 20),
        cc.rect(106, 127, 20, 20),
        cc.rect(127, 127, 20, 20),
        cc.rect(148, 127, 20, 20)]);

    this._movementAnimationToDown = new Animation([
        cc.rect(1, 106, 20, 20),
        cc.rect(22, 106, 20, 20),
        cc.rect(43, 106, 20, 20),
        cc.rect(64, 106, 20, 20),
        cc.rect(85, 106, 20, 20),
        cc.rect(106, 106, 20, 20),
        cc.rect(127, 106, 20, 20),
        cc.rect(148, 106, 20, 20)]);

    gameEvent.pacManDies(this._animateDeath, this);
}

PacManView.prototype = Object.create(CharacterView.prototype);

PacManView.prototype.constructor = PacManView;

PacManView.prototype.draw = function () {
    CharacterView.prototype.draw.call(this);

    var currentDirection = this.getCharacterModel().getCurrentDirection();
    if (!this.getCharacterModel().isAlive()) {
        return;
    } else {
        this.getSprite().setOpacity(255);
        if (this._lastDirection === currentDirection) {
            return;
        } else {
            this._lastDirection = currentDirection;
        }
    }

    switch (currentDirection) {
        case directions.none:
            this.getSprite().stopAllActions();
            return;
        case directions.right:
            this._movementAnimationToRight.runAnimation(this.getSprite());
            break;
        case directions.left:
            this._movementAnimationToLeft.runAnimation(this.getSprite());
            break;
        case directions.up:
            this._movementAnimationToUp.runAnimation(this.getSprite());
            break;
        case directions.down:
            this._movementAnimationToDown.runAnimation(this.getSprite());
            break;
    }
};

PacManView.prototype._animateDeath = function () {
    this.getSprite().stopAllActions();
    var action = cc.FadeTo.create(2, 0);
    this.getSprite().runAction(action);
}
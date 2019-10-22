function CharacterView(characterModel, sprite) {
    this._characterModel = characterModel;
    this._sprite = sprite;
    this._sprite.anchorX = 0;
    this._sprite.anchorY = 0;
    this.draw();
}

CharacterView.prototype.getSprite = function () {
    return this._sprite;
};

CharacterView.prototype.draw = function () {
    this._sprite.setPosition(this._characterModel.getLocation());
};

CharacterView.prototype.getCharacterModel = function () {
    return this._characterModel;
};

CharacterView.prototype.setSprite = function (sprite) {
    this._sprite = sprite;
};
function CharacterView(characterModel, defaultRect) {
    this._characterModel = characterModel;
    this._defaultRect = defaultRect;
    gameEvent.respawnAllCharacters(this.setDefaultSprite, this);
    this._sprite = cc.Sprite.create(res.spr_all5_4A2_png, defaultRect);
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

CharacterView.prototype.setDefaultSprite = function (eventArgs) {
    this._sprite.setTextureRect(this._defaultRect);
};
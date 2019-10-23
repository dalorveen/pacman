function CharacterView(characterModel, defaultRect) {
    this._characterModel = characterModel;
    this._defaultRect = defaultRect;
    this._sprite = cc.Sprite.create(res.spr_all5_4A2_png, defaultRect);
    this._sprite.anchorX = 0;
    this._sprite.anchorY = 0;
    this.draw();

    this._listener = cc.EventListener.create({
        event: cc.EventListener.CUSTOM,
        eventName: "respawnAllCharacters",
        callback: this.setDefaultSprite.bind(this)
    });
    cc.eventManager.addListener(this._listener, 2);
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

CharacterView.prototype.setDefaultSprite = function () {
    this._sprite.setTextureRect(this._defaultRect);
};
function GhostView(characterModel) {
    this._defaultRect = null;
    if (characterModel.getName() === "blinky") {
        this._defaultRect = cc.rect(211, 43, 20, 20);
    } else if (characterModel.getName() === "pinky") {
        this._defaultRect = cc.rect(127, 22, 20, 20);
    } else if (characterModel.getName() === "inky") {
        this._defaultRect = cc.rect(43, 22, 20, 20);
    } else if (characterModel.getName() === "clyde") {
        this._defaultRect = cc.rect(127, 43, 20, 20);
    } else {
        throw "Unknown character name.";
    }
    CharacterView.call(this, characterModel, cc.Sprite.create(res.spr_all5_4A2_png, this._defaultRect));
}

GhostView.prototype = Object.create(CharacterView.prototype);

GhostView.prototype.constructor = GhostView;

GhostView.prototype.draw = function () {
    CharacterView.prototype.draw.call(this);
    
    var ghostModel = this.getCharacterModel();
    switch (ghostModel.getGhostMode()) {
        case ghostModes.chase:
        case ghostModes.scatter:
            this._sprite.setTextureRect(this._defaultRect);
            break;
        case ghostModes.blueFrightened:
            this._sprite.setTextureRect(cc.rect(190, 190, 20, 20));
            break;
        case ghostModes.whiteFrightened:
            this._sprite.setTextureRect(cc.rect(232, 190, 20, 20));
            break;
        case ghostModes.consumed:
            this._sprite.setTextureRect(cc.rect(274, 190, 20, 20));
            break;
    }
};
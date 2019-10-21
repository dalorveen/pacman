function GhostView(characterModel) {
    if (characterModel.getName() === "blinky") {
        CharacterView.call(this, characterModel, cc.Sprite.create(res.spr_all5_4A2_png, cc.rect(211, 43, 20, 20)));
    } else if (characterModel.getName() === "pinky") {
        CharacterView.call(this, characterModel, cc.Sprite.create(res.spr_all5_4A2_png, cc.rect(127, 22, 20, 20)));
    } else if (characterModel.getName() === "inky") {
        CharacterView.call(this, characterModel, cc.Sprite.create(res.spr_all5_4A2_png, cc.rect(43, 22, 20, 20)));
    } else if (characterModel.getName() === "clyde") {
        CharacterView.call(this, characterModel, cc.Sprite.create(res.spr_all5_4A2_png, cc.rect(127, 43, 20, 20)));
    } else {
        throw "Unknown character name.";
    }
}

GhostView.prototype = Object.create(CharacterView.prototype);

GhostView.prototype.constructor = GhostView;
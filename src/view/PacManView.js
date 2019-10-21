function PacManView(pacManModel) {
    CharacterView.call(this, pacManModel, cc.Sprite.create(res.spr_all5_4A2_png, cc.rect(148, 106, 20, 20)));
}

PacManView.prototype = Object.create(CharacterView.prototype);

PacManView.prototype.constructor = PacManView;
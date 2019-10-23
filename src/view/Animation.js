function Animation(frameDatas) {
    this._texture = cc.textureCache.addImage(res.spr_all5_4A2_png);

    var animFrames = [];
    for (var index in frameDatas) {
        var spriteFrame = new cc.SpriteFrame(this._texture, frameDatas[index]);
        var animFrame = new cc.AnimationFrame();
        animFrame.initWithSpriteFrame(spriteFrame, 1, null);
        animFrames.push(animFrame);
    }

    var animation = new cc.Animation(animFrames, 0.07);
    this._animate = new cc.Animate(animation);
}

Animation.prototype.runAnimation = function (sprite) {
    this.stopAnimation(sprite);
    sprite.runAction(this._animate.repeatForever());
}

Animation.prototype.stopAnimation = function (sprite) {
    sprite.stopAllActions();
}
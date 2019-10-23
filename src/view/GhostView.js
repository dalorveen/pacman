function GhostView(characterModel) {
    var defaultRect = null;
    if (characterModel.getName() === "blinky") {
        defaultRect = cc.rect(211, 43, 20, 20);
        this._movementAnimationToRight = new Animation([cc.rect(190, 43, 20, 20)]);
        this._movementAnimationToLeft = new Animation([cc.rect(169, 43, 20, 20)]);
        this._movementAnimationToUp = new Animation([cc.rect(232, 43, 20, 20)]);
        this._movementAnimationToDown = new Animation([cc.rect(211, 43, 20, 20)]);
    } else if (characterModel.getName() === "pinky") {
        defaultRect = cc.rect(127, 22, 20, 20);
        this._movementAnimationToRight = new Animation([cc.rect(106, 22, 20, 20)]);
        this._movementAnimationToLeft = new Animation([cc.rect(85, 22, 20, 20)]);
        this._movementAnimationToUp = new Animation([cc.rect(148, 22, 20, 20)]);
        this._movementAnimationToDown = new Animation([cc.rect(127, 22, 20, 20)]);
    } else if (characterModel.getName() === "inky") {
        defaultRect = cc.rect(43, 22, 20, 20);
        this._movementAnimationToRight = new Animation([cc.rect(22, 22, 20, 20)]);
        this._movementAnimationToLeft = new Animation([cc.rect(1, 22, 20, 20)]);
        this._movementAnimationToUp = new Animation([cc.rect(64, 22, 20, 20)]);
        this._movementAnimationToDown = new Animation([cc.rect(43, 22, 20, 20)]);
    } else if (characterModel.getName() === "clyde") {
        defaultRect = cc.rect(127, 43, 20, 20);
        this._movementAnimationToRight = new Animation([cc.rect(106, 43, 20, 20)]);
        this._movementAnimationToLeft = new Animation([cc.rect(85, 43, 20, 20)]);
        this._movementAnimationToUp = new Animation([cc.rect(148, 43, 20, 20)]);
        this._movementAnimationToDown = new Animation([cc.rect(127, 43, 20, 20)]);
    } else {
        throw "Unknown character name.";
    }
    CharacterView.call(this, characterModel, defaultRect);

    this._movementAnimationForBlueFrightened = new Animation([cc.rect(190, 190, 20, 20), cc.rect(211, 190, 20, 20)]);
    this._movementAnimationForWhiteFrightened = new Animation([cc.rect(232, 190, 20, 20), cc.rect(254, 190, 20, 20)]);

    this._movementAnimationToRightConsumed = new Animation([cc.rect(274, 190, 20, 20)]);
    this._movementAnimationToLeftConsumed = new Animation([cc.rect(295, 190, 20, 20)]);
    this._movementAnimationToUpConsumed = new Animation([cc.rect(316, 190, 20, 20)]);
    this._movementAnimationToDownConsumed = new Animation([cc.rect(337, 190, 20, 20)]);

    this._lastGhostModes = null;
    this._lastDirection = directions.none;
}

GhostView.prototype = Object.create(CharacterView.prototype);

GhostView.prototype.constructor = GhostView;

GhostView.prototype.draw = function () {
    CharacterView.prototype.draw.call(this);
    
    var ghostModel = this.getCharacterModel();
    var currentDirection = ghostModel.getCurrentDirection();
    switch (ghostModel.getGhostMode()) {
        case ghostModes.chase:
        case ghostModes.scatter:
            if ((this._lastGhostModes === ghostModes.chase || this._lastGhostModes === ghostModes.scatter)
                && this._lastDirection === currentDirection) {
                // nop
            } else {
                switch (currentDirection) {
                    case directions.none:
                        return;
                    case directions.right:
                        this._movementAnimationToRight.runAnimation(this._sprite);
                        break;
                    case directions.left:
                        this._movementAnimationToLeft.runAnimation(this._sprite);
                        break;
                    case directions.up:
                        this._movementAnimationToUp.runAnimation(this._sprite);
                        break;
                    case directions.down:
                        this._movementAnimationToDown.runAnimation(this._sprite);
                        break;
                }
            }
            break;
        case ghostModes.blueFrightened:
            if (this._lastGhostModes !== ghostModes.blueFrightened) {
                this._movementAnimationForBlueFrightened.runAnimation(this._sprite);
            }
            break;
        case ghostModes.whiteFrightened:
            if (this._lastGhostModes !== ghostModes.whiteFrightened) {
                this._movementAnimationForWhiteFrightened.runAnimation(this._sprite);
            }
            break;
        case ghostModes.consumed:
            if (this._lastGhostModes === ghostModes.consumed && this._lastDirection === currentDirection) {
                // nop
            } else {
                switch (currentDirection) {
                    case directions.none:
                        return;
                    case directions.right:
                        this._movementAnimationToRightConsumed.runAnimation(this._sprite);
                        break;
                    case directions.left:
                        this._movementAnimationToLeftConsumed.runAnimation(this._sprite);
                        break;
                    case directions.up:
                        this._movementAnimationToUpConsumed.runAnimation(this._sprite);
                        break;
                    case directions.down:
                        this._movementAnimationToDownConsumed.runAnimation(this._sprite);
                        break;
                }
            }
            break;
    }
    this._lastGhostModes = ghostModel.getGhostMode();
    this._lastDirection = currentDirection;
};
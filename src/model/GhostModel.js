var ghostModes = {
    chase: 0,
    scatter: 1,
    blueFrightened: 2,
    whiteFrightened: 3,
    consumed: 4
};

function GhostModel(spawnPoint, name) {
    CharacterModel.call(this, spawnPoint, name, this._initializeStepLength(name));
    gameEvent.pacManAteEnergizer(this.onFrighten, this);
    this._navigator = new Navigator(this);

    this._chaseDurationInSeconds = 20;
    this._scatterDurationInSeconds = 7;
    this._blueFrightenDurationInSeconds = 7;
    this._whiteFrightenDurationInSeconds = 3;

    this._ghostMode = this._getRandomizedInitialGhostMode();
    this._timerInSeconds = this._getRandomizedInitialDurationGhostMode(this._ghostMode);
}

GhostModel.prototype = Object.create(CharacterModel.prototype);

GhostModel.prototype.constructor = GhostModel;

GhostModel.prototype.spawn = function () {
    CharacterModel.prototype.spawn.call(this);

    this._ghostMode = this._getRandomizedInitialGhostMode();
    this._timerInSeconds = this._getRandomizedInitialDurationGhostMode(this._ghostMode);
}

GhostModel.prototype.update = function (dt, board, pacManModel) {
    if (this._timerInSeconds <= 0) {
        switch (this._ghostMode) {
            case ghostModes.chase:
                this._ghostMode = ghostModes.scatter;
                this._timerInSeconds = this._scatterDurationInSeconds;
                break;
            case ghostModes.scatter:
                this._ghostMode = ghostModes.chase;
                this._timerInSeconds = this._chaseDurationInSeconds;
                break;
            case ghostModes.blueFrightened:
                this._ghostMode = ghostModes.whiteFrightened;
                this._timerInSeconds = this._whiteFrightenDurationInSeconds;
                break;
            case ghostModes.whiteFrightened:
                this._ghostMode = ghostModes.chase;
                this._timerInSeconds = this._chaseDurationInSeconds;
                break;
            case ghostModes.consumed:
                break;
        }
    }
    this._timerInSeconds -= dt;

    switch (this._ghostMode) {
        case ghostModes.chase:
            if (this.isCollision(board, pacManModel)) {
                pacManModel.die();
            } else {
                this._chase(dt, board, pacManModel);
            }
            break;
        case ghostModes.scatter:
            if (this.isCollision(board, pacManModel)) {
                pacManModel.die();
            } else {
                this._scatter(dt, board, pacManModel);
            }
            break;
        case ghostModes.blueFrightened:
        case ghostModes.whiteFrightened:
            if (this.isCollision(board, pacManModel)) {
                pacManModel.chaseAwayGhost();
                this._ghostMode = ghostModes.consumed;
                this._consume(dt, board);
            } else {
                this._frighten(dt, board, pacManModel);
            }
            break;
        case ghostModes.consumed:
            this._consume(dt, board);
            break;
    }
}

GhostModel.prototype.onFrighten = function (eventArgs) {
    this._ghostMode = ghostModes.blueFrightened;
}

GhostModel.prototype.getGhostMode = function () {
    return this._ghostMode;
}

GhostModel.prototype._initializeStepLength = function (ghostName) {
    if (ghostName === "blinky") {
        return 95;
    } else if (ghostName === "pinky") {
        return 100;
    } else if (ghostName === "inky") {
        return 90;
    } else if (ghostName === "clyde") {
        return 85;
    } else {
        return 95;
    }
}

GhostModel.prototype._getRandomizedInitialGhostMode = function () {
    if (Math.random() < 0.5) {
        return ghostModes.chase;
    } else {
        return ghostModes.scatter;
    }
}

GhostModel.prototype._getRandomizedInitialDurationGhostMode = function (currentGhostMode) {
    if (currentGhostMode === ghostModes.chase) {
        return Math.floor(Math.random() * this._chaseDurationInSeconds);
    } else {
        return Math.floor(Math.random() * this._scatterDurationInSeconds);
    }
}

GhostModel.prototype._chase = function (dt, board, pacManModel) {
    var direction = this._navigator.directionTo(board, pacManModel.coordinatesOfOccupiedTile(board));
    this._changeSpeed(ghostModes.chase);
    this.move(dt, board, direction);
}

GhostModel.prototype._scatter = function (dt, board, pacManModel) {
    var direction = this._navigator.directionFrom(board, pacManModel.coordinatesOfOccupiedTile(board));
    this._changeSpeed(ghostModes.scatter);
    this.move(dt, board, direction);
}

GhostModel.prototype._frighten = function (dt, board, pacManModel) {
    var direction = this._navigator.directionFrom(board, pacManModel.coordinatesOfOccupiedTile(board));
    this._changeSpeed(ghostModes.blueFrightened);
    this.move(dt, board, direction);
}

GhostModel.prototype._consume = function (dt, board) {
    var spawnPointInPixels = this.getSpawnPointInPixels();
    var direction = this._navigator.directionTo(board, this.getCoordinates(board, spawnPointInPixels));
    this._changeSpeed(ghostModes.consumed);
    this.move(dt, board, direction);

    if (spawnPointInPixels.x === this.getLocation().x && spawnPointInPixels.y === this.getLocation().y) {
        this._ghostMode = this._getRandomizedInitialGhostMode();
        this._timerInSeconds = this._getRandomizedInitialDurationGhostMode(this._ghostMode);
    }
}

GhostModel.prototype._changeSpeed = function (ghostMode) {
    switch (ghostMode) {
        case ghostModes.chase:
            this.changeStepLength(1.1);
            break;
        case ghostModes.scatter:
            this.resetStepLength();
            break;
        case ghostModes.blueFrightened:
        case ghostModes.whiteFrightened:
            this.changeStepLength(0.7);
            break;
        case ghostModes.consumed:
            this.changeStepLength(2.2);
            break;
    }
}
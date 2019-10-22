var ghostModes = {
    chase: 0,
    scatter: 1,
    blueFrightened: 2,
    whiteFrightened: 3,
    consumed: 4
};

function GhostModel(spawnPoint, name) {
    CharacterModel.call(this, spawnPoint, name);
    this._navigator = new Navigator(this);

    this._chaseDurationInSeconds = 20;
    this._scatterDurationInSeconds = 7;
    this._blueFrightenDurationInSeconds = 7;
    this._whiteFrightenDurationInSeconds = 3;

    this._ghostMode = this._getRandomizedInitialGhostMode();
    this._timerInSeconds = this._getRandomizedInitialDurationGhostMode(this._ghostMode);

    this._listener = cc.EventListener.create({
        event: cc.EventListener.CUSTOM,
        eventName: "pacManAteEnergizer",
        callback: this.onFrighten.bind(this)
    });
    cc.eventManager.addListener(this._listener, 2);
}

GhostModel.prototype = Object.create(CharacterModel.prototype);

GhostModel.prototype.constructor = GhostModel;

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
                // kill
            } else {
                this._chase(board, pacManModel);
            }
            break;
        case ghostModes.scatter:
            if (this.isCollision(board, pacManModel)) {
                // kill
            } else {
                this._scatter(board, pacManModel);
            }
            break;
        case ghostModes.blueFrightened:
        case ghostModes.whiteFrightened:
            if (this.isCollision(board, pacManModel)) {
                // eat
                this._ghostMode = ghostModes.consumed;
                this._consume(board);
            } else {
                this._frighten(board, pacManModel);
            }
            break;
        case ghostModes.consumed:
            this._consume(board);
            break;
    }
}

GhostModel.prototype.onFrighten = function (event) {
    // cc.log(event.getUserData());
    this._ghostMode = ghostModes.blueFrightened;
}

GhostModel.prototype.getGhostMode = function () {
    return this._ghostMode;
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

GhostModel.prototype._chase = function (board, pacManModel) {
    var direction = this._navigator.directionTo(board, pacManModel.coordinatesOfOccupiedTile(board));
    this.move(board, direction, 0.12);
}

GhostModel.prototype._scatter = function (board, pacManModel) {
    var direction = this._navigator.directionFrom(board, pacManModel.coordinatesOfOccupiedTile(board));
    this.move(board, direction, 0.12);
}

GhostModel.prototype._frighten = function (board, pacManModel) {
    var direction = this._navigator.directionFrom(board, pacManModel.coordinatesOfOccupiedTile(board));
    this.move(board, direction, 0.12);
}

GhostModel.prototype._consume = function (board) {
    var spawnPointInPixels = this.getSpawnPointInPixels();
    var direction = this._navigator.directionTo(board, this.getCoordinates(board, spawnPointInPixels));
    this.move(board, direction, 0.12);

    if (spawnPointInPixels.x === this.getLocation().x && spawnPointInPixels.y === this.getLocation().y) {
        this._ghostMode = this._getRandomizedInitialGhostMode();
        this._timerInSeconds = this._getRandomizedInitialDurationGhostMode(this._ghostMode);
    }
}
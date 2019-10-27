function Model(tiledMap) {
    this._board = new Board(tiledMap);
    this._pacMan = new PacManModel(this._board.getSpawnPoint("pacman"));
    this._shadow = new GhostModel(this._board.getSpawnPoint("blinky"), "blinky");
    this._speedy = new GhostModel(this._board.getSpawnPoint("pinky"), "pinky");
    this._bashful = new GhostModel(this._board.getSpawnPoint("inky"), "inky");
    this._pokey = new GhostModel(this._board.getSpawnPoint("clyde"), "clyde");

    this._isTimerRunning = false;
    this._timerInSeconds = 0;
    this._initializeNewGame();
    this._isWaiting = true;
}

Model.prototype.update = function (dt) {
    if (this._board.getRemainingDots() <= 0) {
        this._completeLevel();
    } else if (this._pacMan.isAlive()) {
        if (this._isWaiting) {
            this._callAfterDelay(dt, 2, (function () {
                this._isWaiting = false;
            }).bind(this));
        } else {
            this._pacMan.update(dt, this._board);
            this._shadow.update(dt, this._board, this._pacMan);
            this._speedy.update(dt, this._board, this._pacMan);
            this._bashful.update(dt, this._board, this._pacMan);
            this._pokey.update(dt, this._board, this._pacMan);

            if (this._board.getRemainingDots() == 70 || this._board.getRemainingDots() == 170) {
                this._board.showFruit();
            }
        }
    } else if (this._pacMan.getLives() <= 0) {
        this._isWaiting = true;
        this._callAfterDelay(dt, 5, this._initializeNewGame.bind(this));
    } else {
        this._isWaiting = true;
        this._callAfterDelay(dt, 2, this._restartLevel.bind(this));
    }
};

Model.prototype.isWaiting = function () {
    return this._isWaiting;
};

Model.prototype.getBoard = function() {
    return this._board;
};

Model.prototype.getPacMan = function () {
    return this._pacMan;
};

Model.prototype.getShadow = function () {
    return this._shadow;
};

Model.prototype.getSpeedy = function () {
    return this._speedy;
};

Model.prototype.getBashful = function () {
    return this._bashful;
};

Model.prototype.getPokey = function () {
    return this._pokey;
};

Model.prototype._initializeNewGame = function () {
    this._pacMan.setLives(3);
    this._pacMan.resetCurrentScore();
    this._pacMan.resetFruitsEatenAmount();
    this._startLevel();
    gameEvent.onNewGame("newGame");
};

Model.prototype._startLevel = function () {
    this._board.initialize();
    this._respawnAllCharacters();
}

Model.prototype._restartLevel = function () {
    this._respawnAllCharacters();
}

Model.prototype._completeLevel = function () {
}

Model.prototype._respawnAllCharacters = function () {
    this._pacMan.respawn();
    this._shadow.spawn();
    this._speedy.spawn();
    this._bashful.spawn();
    this._pokey.spawn();
    gameEvent.onRespawnAllCharacters("respawn");
}

Model.prototype._callAfterDelay = function (dt, seconds, callback) {
    if (!this._isTimerRunning) {
        this._timerInSeconds = 0;
        this._isTimerRunning = true;
    }

    this._timerInSeconds += dt;
    if (this._timerInSeconds >= seconds) {
        callback();
        this._isTimerRunning = false;
    }
}
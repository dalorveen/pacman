function Sound(model) {
    this._model = model;
    this._count = 0;

    gameEvent.respawnAllCharacters(this.respawnAllCharacters, this);
    gameEvent.pacManAteDot(this.eatingDot, this);
    gameEvent.pacManAteEnergizer(this.eatingEnergizer, this);
    gameEvent.pacManAteFruit(this.eatingFruit, this);
    gameEvent.pacManDies(this.pacManDies, this);
    gameEvent.pacManAteGhost(this.eatingGhost, this);
    gameEvent.ghostInCage(this.ghostInCage, this);
    gameEvent.newGame(this.newGame, this);

    this._ghostAudioIdMovingIntoCage = [["blinky", -1], ["pinky", -1], ["inky", -1], ["clyde", -1]];
    this._sirenId = -1;
    this._sirenAudioId = -1;
    cc.audioEngine.setEffectsVolume(0.25);
}

Sound.prototype.update = function (dt) {
    if (this._model.isWaiting()) {
        this._stopSiren()
    } else {
        if (this._model.getBoard().getRemainingDots() <= 48) {
            if (this._sirenId != 5) {
                this._stopSiren();
                this._sirenId = 5;
                this._sirenAudioId = cc.audioEngine.playEffect(res.siren_5_wav, true);
            }
        } else if (this._model.getBoard().getRemainingDots() <= 96) {
            if (this._sirenId != 4) {
                this._stopSiren();
                this._sirenId = 4;
                this._sirenAudioId = cc.audioEngine.playEffect(res.siren_4_wav, true);
            }
        } else if (this._model.getBoard().getRemainingDots() <= 144) {
            if (this._sirenId != 3) {
                this._stopSiren();
                this._sirenId = 3;
                this._sirenAudioId = cc.audioEngine.playEffect(res.siren_3_wav, true);
            }
        } else if (this._model.getBoard().getRemainingDots() <= 192) {
            if (this._sirenId != 2) {
                this._stopSiren();
                this._sirenId = 2;
                this._sirenAudioId = cc.audioEngine.playEffect(res.siren_2_wav, true);
            }
        } else if (this._model.getBoard().getRemainingDots() <= 241) {
            if (this._sirenId != 1) {
                this._stopSiren();
                this._sirenId = 1;
                this._sirenAudioId = cc.audioEngine.playEffect(res.siren_1_wav, true);
            }
        }
    }
};

Sound.prototype.respawnAllCharacters = function () {
    if (this._sirenAudioId != -1) {
        cc.audioEngine.stopEffect(this._sirenAudioId);
        this._sirenAudioId = -1;
    }
}

Sound.prototype.eatingDot = function () {
    if (this._count++ % 2 === 0) {
        cc.audioEngine.playEffect(res.munch_1_wav, false);
    } else {
        cc.audioEngine.playEffect(res.munch_2_wav, false);
    }
}

Sound.prototype.eatingEnergizer = function () {
    cc.audioEngine.playEffect(res.power_pellet_wav, false);
}

Sound.prototype.eatingFruit = function () {
    cc.audioEngine.playEffect(res.eat_fruit_wav, false);
}

Sound.prototype.pacManDies = function () {
    cc.audioEngine.playEffect(res.death_1_wav, false);
    this._stopSiren();
}

Sound.prototype.eatingGhost = function (eventArgs) {
    cc.audioEngine.playEffect(res.eat_ghost_wav, false);
    var audioId = cc.audioEngine.playEffect(res.retreating_wav, true);
    var temp = this._ghostAudioIdMovingIntoCage.find(function (element) {
        return element[0] === eventArgs.getUserData();
    });
    temp[1] = audioId;
}

Sound.prototype.ghostInCage = function (eventArgs) {
    var temp = this._ghostAudioIdMovingIntoCage.find(function (element) {
        return element[0] === eventArgs.getUserData();
    });
    cc.audioEngine.stopEffect(temp[1]);
}

Sound.prototype.newGame = function () {
    cc.audioEngine.playMusic(res.game_start_wav, false);
}

Sound.prototype._stopSiren = function () {
    this._sirenId = -1;
    if (this._sirenAudioId != -1) {
        cc.audioEngine.stopEffect(this._sirenAudioId);
        this._sirenAudioId = -1;
    }
}
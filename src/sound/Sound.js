function Sound() {
    this._count = 0;
    gameEvent.respawnAllCharacters(this.respawnAllCharacters, this);
    gameEvent.pacManAteDot(this.eatingDot, this);
    gameEvent.pacManAteEnergizer(this.eatingEnergizer, this);
}

Sound.prototype.respawnAllCharacters = function (direction) {
    cc.audioEngine.playMusic(res.game_start_wav, false);
}

Sound.prototype.eatingDot = function (direction) {
    if (this._count++ % 2 === 0) {
        cc.audioEngine.playEffect(res.munch_1_wav, false);
    } else {
        cc.audioEngine.playEffect(res.munch_2_wav, false);
    }
}

Sound.prototype.eatingEnergizer = function (direction) {
    cc.audioEngine.playEffect(res.power_pellet_wav, false);
}
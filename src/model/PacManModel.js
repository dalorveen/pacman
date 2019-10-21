function PacManModel(spawnPoint) {
    CharacterModel.call(this, spawnPoint, "pacman");
}

PacManModel.prototype = Object.create(CharacterModel.prototype);

PacManModel.prototype.constructor = PacManModel;
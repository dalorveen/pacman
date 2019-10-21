function GhostModel(spawnPoint, name) {
    CharacterModel.call(this, spawnPoint, name);
}

GhostModel.prototype = Object.create(CharacterModel.prototype);

GhostModel.prototype.constructor = GhostModel;
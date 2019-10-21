function CharacterModel(spawnPoint, name) {
    this._spawnPoint = spawnPoint;
    this._location = spawnPoint;
    this._name = name;
}

CharacterModel.prototype.getLocation = function () {
    return this._location;
};

CharacterModel.prototype.getName = function () {
    return this._name;
};

CharacterModel.prototype.spawn = function () {
    this._location = this._spawnPoint;
};
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
    this._ghostMode = ghostModes.chase;

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
    var direction = this._navigator.directionTo(board, pacManModel.coordinatesOfOccupiedTile(board));
    this.move(board, direction, 0.12);
}

GhostModel.prototype.onFrighten = function (event) {
    // cc.log(event.getUserData());
    this._ghostMode = ghostModes.blueFrightened;
}

GhostModel.prototype.getGhostMode = function () {
    return this._ghostMode;
}
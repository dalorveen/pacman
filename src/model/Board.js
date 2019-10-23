function Board(tiledMap) {
    this._tiledMap = tiledMap;
    this._sizeInPixels = cc.size(
            this._tiledMap.getMapSize().width * this._tiledMap.getTileSize().width,
            this._tiledMap.getMapSize().height * this._tiledMap.getTileSize().height);
    this._numberOfDots = -1;
    this.initialize();
}

Board.prototype.getTiledMap = function () {
    return this._tiledMap;
};

Board.prototype.getSizeInPixels = function () {
    return this._sizeInPixels;
};

Board.prototype.getTileSize = function () {
    return this._tiledMap.getTileSize();
};

Board.prototype.getSizeInTiles = function () {
    return this._tiledMap.getMapSize();
}

Board.prototype.getSpawnPoint = function (characterName) {
    var character = this.character(characterName);
    return cc.p(character.x, character.y);
};

Board.prototype.character = function (name) {
    var characters = this._tiledMap.getObjectGroup("characters");
    return characters.getObject(name);
};

Board.prototype.getWall = function (coordinates) {
    if (this.valid(coordinates)) {
        return this._tiledMap.getLayer("walls").getTileAt(coordinates);
    } else {
        return null;
    }
}

Board.prototype.getEnergizer = function (coordinates) {
    if (this.valid(coordinates)) {
        return this._tiledMap.getLayer("energizers").getTileAt(coordinates);
    }
    return null;
}

Board.prototype.getDot = function (coordinates) {
    if (this.valid(coordinates)) {
        return this._tiledMap.getLayer("dots").getTileAt(coordinates);
    }
    return null;
}

Board.prototype.getFruit = function (coordinates) {
    if (this.valid(coordinates)) {
        return this._tiledMap.getLayer("fruit").getTileAt(coordinates);
    }
    return null;
}

Board.prototype.valid = function (coordinates) {
    if (coordinates === null) {
        return false;
    }
    return coordinates.x >= 0 && coordinates.x < this._tiledMap.getMapSize().width
        && coordinates.y >= 0 && coordinates.y < this._tiledMap.getMapSize().height;
}

Board.prototype.initialize = function () {
    this._numberOfDots = 0;
    for (var x = 0; x < this._tiledMap.getMapSize().width; x++) {
        for (var y = 0; y < this._tiledMap.getMapSize().height; y++) {
            var p = cc.p(x, y);

            var energizer = this.getEnergizer(p);
            if (energizer !== null) {
                energizer.setVisible(true);
            }

            var dot = this.getDot(p);
            if (dot !== null) {
                dot.setVisible(true);
                this._numberOfDots++;
            }

            let fruit = this.getFruit(p);
            if (fruit !== null) {
                this._fruit = fruit;
                this._fruit.setVisible(false);
            }   
        }
    }
}

Board.prototype.decreaseDots = function () {
    this._numberOfDots--;
}

Board.prototype.getRemainingDots = function () {
    return this._numberOfDots;
}
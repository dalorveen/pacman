var directions = {
    none: 0,
    right: 1,
    left: 2,
    up: 3,
    down: 4
};

function CharacterModel(spawnPoint, name) {
    this._spawnPoint = spawnPoint;
    this._name = name;
    this.spawn();
}

CharacterModel.prototype.getLocation = function () {
    return this._location;
};

CharacterModel.prototype.getName = function () {
    return this._name;
};

CharacterModel.prototype.spawn = function () {
    this._location = this._spawnPoint;
    this._currentDirection = directions.none;
    this._numberOfStepsPerTile = -1;
    this._stepId = {
        x: 0,
        y: 0
    };
};

CharacterModel.prototype.move = function (board, desiredDirection, speed) {
    if (this._numberOfStepsPerTile < 0) {
        this._numberOfStepsPerTile = Math.round(1.0 / speed);
        this._stepLength = {
            x: board.getTileSize().width / this._numberOfStepsPerTile,
            y: board.getTileSize().height / this._numberOfStepsPerTile,
        };
    }
    
    if (desiredDirection != directions.none && desiredDirection != this._currentDirection) {
        if (desiredDirection == directions.right && this.canMoveTo(board, directions.right)) {
            this._currentDirection = directions.right;
            this._moveRight(board);
            return;
        } else if (desiredDirection == directions.left && this.canMoveTo(board, directions.left)) {
            this._currentDirection = directions.left;
            this._moveLeft(board);
            return;
        } else if (desiredDirection == directions.up && this.canMoveTo(board, directions.up)) {
            this._currentDirection = directions.up;
            this._moveUp(board);
            return;
        } else if (desiredDirection == directions.down && this.canMoveTo(board, directions.down)) {
            this._currentDirection = directions.down;
            this._moveDown(board);
            return;
        }
    }

    switch (this._currentDirection) {
        case directions.none:
            break
        case directions.right:
            if (this.canMoveTo(board, directions.right)) {
                this._moveRight(board);
            } else {
                this._stop();
            }
            break;
        case directions.left:
            if (this.canMoveTo(board, directions.left)) {
                this._moveLeft(board);
            } else {
                this._stop();
            }
            break;
        case directions.up:
            if (this.canMoveTo(board, directions.up)) {
                this._moveUp(board);
            } else {
                this._stop();
            }
            break;
        case directions.down:
            if (this.canMoveTo(board, directions.down)) {
                this._moveDown(board);
            } else {
                this._stop();
            }
            break;
    }
};

CharacterModel.prototype.canMoveTo = function (board, direction) {
    if (this.isTunnel(board)) {
        if (this._currentDirection === directions.right || this._currentDirection === directions.left) {
            return direction === directions.right || direction === directions.left;
        } else if (this._currentDirection === directions.up || this._currentDirection === directions.down) {
            return direction === directions.up || direction === directions.down;
        } else {
            return false;
        }
    } else {
        if (this.isSnapToTile()) {
            var coordinatesOfAdjacentTile = this.coordinatesOfAdjacentTile(this.coordinatesOfOccupiedTile(board), direction);
            var wall = board.getWall(coordinatesOfAdjacentTile);
            return wall === null;
        } else if (direction === directions.right || direction === directions.left) {
            return this.isSnapToTileByY();
        } else if (direction === directions.up || direction === directions.down) {
            return this.isSnapToTileByX();
        }
    }
}

CharacterModel.prototype.isTunnel = function (board) {
    var crossedRightBorder = this._location.x > board.getSizeInPixels().width - board.getTileSize().width;
    var crossedLeftBorder = this._location.x < 0;
    var crossedTopBorder = this._location.y > board.getSizeInPixels().height - board.getTileSize().height;
    var crossedBottomBorder = this._location.y < 0;
    return crossedRightBorder || crossedLeftBorder || crossedTopBorder || crossedBottomBorder;
}

CharacterModel.prototype.isSnapToTile = function () {
    return this.isSnapToTileByX() && this.isSnapToTileByY();
}

CharacterModel.prototype.isSnapToTileByX = function () {
    return this._stepId.x % this._numberOfStepsPerTile === 0;
}

CharacterModel.prototype.isSnapToTileByY = function () {
    return this._stepId.y % this._numberOfStepsPerTile === 0;
}

CharacterModel.prototype.coordinatesOfAdjacentTile = function (originalCoordinates, direction) {
    var x = 0;
    var y = 0;

    switch (direction) {
        case directions.right:
            x = 1;
            break;
        case directions.left:
            x = -1;
            break;
        case directions.up:
            y = -1;
            break;
        case directions.down:
            y = 1;
            break;
    }

    return cc.p(originalCoordinates.x + x, originalCoordinates.y + y);
}

CharacterModel.prototype.coordinatesOfOccupiedTile = function (board) {
    var x = Math.floor(this._location.x / board.getTileSize().width);
    var y = Math.floor(
        (board.getSizeInPixels().height - this._location.y) / board.getTileSize().height) - 1;
    return cc.p(x, y);
}

CharacterModel.prototype._moveRight = function (board) {
    this._location.x += this._stepLength.x;
    if (this._location.x > board.getSizeInPixels().width) {
        this._location.x = -board.getTileSize().width;
        this._stepId.x = 0;
        this._location.x += this._stepLength.x;
    }
    this._stepId.x++;
    
    if (this.isSnapToTileByX()) {
        this._location.x = Math.round(this._location.x);
    }
}

CharacterModel.prototype._moveLeft = function (board) {
    this._location.x -= this._stepLength.x;
    if (this._location.x < -board.getTileSize().width) {
        this._location.x = board.getSizeInPixels().width;
        this._stepId.x = 0;
        this._location.x -= this._stepLength.x;
    }
    this._stepId.x--;

    if (this.isSnapToTileByX()) {
        this._location.x = Math.round(this._location.x);
    }
}

CharacterModel.prototype._moveUp = function (board) {
    this._location.y += this._stepLength.y;
    if (this._location.y > board.getSizeInPixels().height) {
        this._location.y = -board.getTileSize().height;
        this._stepId.y = 0;
        this._location.y += this._stepLength.y;
    }
    this._stepId.y++;

    if (this.isSnapToTileByY()) {
        this._location.y = Math.round(this._location.y);
    }
}

CharacterModel.prototype._moveDown = function (board) {
    this._location.y -= this._stepLength.y;
    if (this._location.y < -board.getTileSize().height) {
        this._location.y = board.getSizeInPixels().height;
        this._stepId.y = 0;
        this._location.y -= this._stepLength.y;
    }
    this._stepId.y--;
    
    if (this.isSnapToTileByY()) {
        this._location.y = Math.round(this._location.y);
    }
}

CharacterModel.prototype._stop = function () {
    this._currentDirection = directions.none;

    if (this.isSnapToTileByX()) {
        this._location.x = Math.round(this._location.x);
    }

    if (this.isSnapToTileByY()) {
        this._location.y = Math.round(this._location.y);
    }
}
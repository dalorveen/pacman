var directions = {
    none: 0,
    right: 1,
    left: 2,
    up: 3,
    down: 4
};

function CharacterModel(spawnPoint, name, stepLength) {
    this._spawnPoint = spawnPoint;
    this._location = cc.p(0, 0);
    this._name = name;
    this._defaultStepLength = stepLength;
    this._stepLength = stepLength;
    this.spawn();
}

CharacterModel.prototype.getLocation = function () {
    return this._location;
};

CharacterModel.prototype.getName = function () {
    return this._name;
};

CharacterModel.prototype.getSpawnPointInPixels = function () {
    return this._spawnPoint;
};

CharacterModel.prototype.spawn = function () {
    this._location.x = this._spawnPoint.x;
    this._location.y = this._spawnPoint.y;
    this._currentDirection = directions.none;

    this._transition = {
        originPoint: cc.p(this._location.x, this._location.y),
        isShifted: true
    };
};

CharacterModel.prototype.getCurrentDirection = function () {
    return this._currentDirection;
}

CharacterModel.prototype.changeStepLength = function (factor) {
    this._stepLength = this._defaultStepLength * factor;
}

CharacterModel.prototype.resetStepLength = function () {
    this._stepLength = this._defaultStepLength;
}

CharacterModel.prototype.move = function (dt, board, desiredDirection) {
    var speed = this._stepLength * dt;
    if (desiredDirection !== directions.none && desiredDirection !== this._currentDirection) {
        if (this.canMoveTo(board, desiredDirection, speed)) {
            this._currentDirection = desiredDirection;
        }
    }
    
    switch (this._currentDirection) {
        case directions.none:
            break;
        case directions.right:
            if (this.canMoveTo(board, directions.right, speed)) {
                this._moveRight(board, speed);
            } else {
                this._stop(board);
            }
            break;
        case directions.left:
            if (this.canMoveTo(board, directions.left, speed)) {
                this._moveLeft(board, speed);
            } else {
                this._stop(board);
            }
            break;
        case directions.up:
            if (this.canMoveTo(board, directions.up, speed)) {
                this._moveUp(board, speed);
            } else {
                this._stop(board);
            }
            break;
        case directions.down:
            if (this.canMoveTo(board, directions.down, speed)) {
                this._moveDown(board, speed);
            } else {
                this._stop(board);
            }
            break;
    }
};

CharacterModel.prototype.canMoveTo = function (board, direction, speed) {
    if (this._transition.isShifted) {
        var coordinates = this.getCoordinates(board, this._transition.originPoint);
        var coordinatesOfAdjacentTile = this.coordinatesOfAdjacentTile(coordinates, direction);
        var wall = board.getWall(coordinatesOfAdjacentTile);
        return wall === null;
    } else if ((direction === directions.right || direction === directions.left)
        && (this._currentDirection === directions.right || this._currentDirection === directions.left)) {
        return true;
    } else if ((direction === directions.up || direction === directions.down)
        && (this._currentDirection === directions.up || this._currentDirection === directions.down)) {
        return true;
    } else {
        return false;
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
    return this._transition.isShifted;
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
    return this.getCoordinates(board, this._transition.originPoint);
}

CharacterModel.prototype.getCoordinates = function (board, pointInPixels) {
    var x = Math.floor(pointInPixels.x / board.getTileSize().width);
    var y = Math.floor(
        (board.getSizeInPixels().height - pointInPixels.y) / board.getTileSize().height) - 1;
    return cc.p(x, y);
}

CharacterModel.prototype.isCollision = function (board, otherCharacter) {
    if (otherCharacter !== null) {
        return cc.rectIntersectsRect(this.getBoundingBox(board), otherCharacter.getBoundingBox(board));
    }
    return false;
}

CharacterModel.prototype.getBoundingBox = function (board) {
    return cc.rect(this._location.x, this._location.y, board.getTileSize().width, board.getTileSize().height);
}

CharacterModel.prototype._moveRight = function (board, speed) {
    this._location.x += speed;
    if (this._location.x > board.getSizeInPixels().width) {
        this._location.x = -board.getTileSize().width;
        this._transition.originPoint.x = -board.getTileSize().width;
        this._moveRight(board, speed);
        return;
    }

    var endPoint = this._transition.originPoint.x + board.getTileSize().width;
    if (this._location.x >= endPoint) {
        this._transition.originPoint.x = endPoint;
        this._transition.isShifted = true;
    } else {
        this._transition.isShifted = false;
    }
    this._location.y = this._transition.originPoint.y;
}

CharacterModel.prototype._moveLeft = function (board, speed) {
    this._location.x -= speed;
    if (this._location.x < -board.getTileSize().width) {
        this._location.x = board.getSizeInPixels().width;
        this._transition.originPoint.x = board.getSizeInPixels().width;
        this._moveLeft(board, speed);
        return;
    }
    
    var endPoint = this._transition.originPoint.x - board.getTileSize().width;
    if (this._location.x <= endPoint) {
        this._transition.originPoint.x = endPoint;
        this._transition.isShifted = true;
    } else {
        this._transition.isShifted = false;
    }
    this._location.y = this._transition.originPoint.y;
}

CharacterModel.prototype._moveUp = function (board, speed) {
    this._location.y += speed;
    if (this._location.y > board.getSizeInPixels().height) {
        this._location.y = -board.getTileSize().height;
        this._transition.originPoint.y = -board.getTileSize().height;
        this._moveUp(board, speed);
        return;
    }

    var endPoint = this._transition.originPoint.y + board.getTileSize().height;
    if (this._location.y >= endPoint) {
        this._transition.originPoint.y = endPoint;
        this._transition.isShifted = true;
    } else {
        this._transition.isShifted = false;
    }
    this._location.x = this._transition.originPoint.x;
}

CharacterModel.prototype._moveDown = function (board, speed) {
    this._location.y -= speed;
    if (this._location.y < -board.getTileSize().height) {
        this._location.y = board.getSizeInPixels().height;
        this._transition.originPoint.y = board.getSizeInPixels().height;
        this._moveDown(board, speed);
        return;
    }

    var endPoint = this._transition.originPoint.y - board.getTileSize().height;
    if (this._location.y <= endPoint) {
        this._transition.originPoint.y = endPoint;
        this._transition.isShifted = true;
    } else {
        this._transition.isShifted = false;
    }
    this._location.x = this._transition.originPoint.x;
}

CharacterModel.prototype._stop = function (board) {
    this._currentDirection = directions.none;
    this._location.x = this._transition.originPoint.x;
    this._location.y = this._transition.originPoint.y;
    this._transition.isShifted = true;
}
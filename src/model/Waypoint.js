function Waypoint(board, coordinates) {
    this._board = board;
    this._coordinates = coordinates;
    this._distanceTraveled = 0;
    this._direction = directions.none;

    this._right = null;
    this._left = null;
    this._top = null;
    this._bottom = null;
    this._back = null;
}

Waypoint.prototype.getCoordinates = function () {
    return this._coordinates;
};

Waypoint.prototype.getDistanceTraveled = function () {
    return this._distanceTraveled;
};

Waypoint.prototype.getDirection = function () {
    return this._direction;
};

Waypoint.prototype.getRight = function () {
    return this._right;
};

Waypoint.prototype.getLeft = function () {
    return this._left;
};

Waypoint.prototype.getTop = function () {
    return this._top;
};

Waypoint.prototype.getBottom = function () {
    return this._bottom;
};

Waypoint.prototype.getBack = function () {
    return this._back;
};

Waypoint.prototype.getDirectionAtWaypoint = function (distanceTraveled) {
    if (this._back === null) {
        return directions.none;
    } else if (this._distanceTraveled === distanceTraveled) {
        return this._direction;
    }
    return this._back.getDirectionAtWaypoint(distanceTraveled);
};

Waypoint.prototype.next = function (direction) {
    var p = null;
    switch (direction) {
        case directions.none:
            return null;
        case directions.right:
            if (this._right !== null) {
                return this._right.next(direction);
            } else {
                p = cc.p(this._coordinates.x + 1, this._coordinates.y);
                if (p.x > this._board.getSizeInTiles().width - 1) {
                    p.x = 0;
                }
            }
            break;
        case directions.left:
            if (this._left !== null) {
                return this._left.next(direction);
            } else {
                p = cc.p(this._coordinates.x - 1, this._coordinates.y);
                if (p.x < 0) {
                    p.x = this._board.getSizeInTiles().width - 1;
                }
            }
            break;
        case directions.up:
            if (this._top !== null) {
                return this._top.next(direction);
            } else {
                p = cc.p(this._coordinates.x, this._coordinates.y - 1);
                if (p.y < 0) {
                    p.y = this._board.getSizeInTiles().height - 1;
                }
            }
            break;
        case directions.down:
            if (this._bottom !== null) {
                return this._bottom.next(direction);
            } else {
                p = cc.p(this._coordinates.x, this._coordinates.y + 1);
                if (p.y > this._board.getSizeInTiles().height - 1) {
                    p.y = 0;
                }
            }
            break;
    }

    if (this._board.getWall(p) === null) {
        var route = new Waypoint(this._board, p);
        route._distanceTraveled = this._distanceTraveled + 1;
        route._back = this;
        route._direction = direction;
        return route;
    }
    return null;
};

Waypoint.prototype.createRoutes = function (maxDistanceTraveled, targetCoordinates, callback) {
    if (this._distanceTraveled >= maxDistanceTraveled
        || (this._coordinates.x === targetCoordinates.x && this._coordinates.y === targetCoordinates.y)) {
        callback(this);
        return;
    }

    for (var i = 1; i < 5; i++) {
        var next = this.next(i);
        if (next !== null) {
            if (this.isUnique(next)) {
                this._add(next);
                next.createRoutes(maxDistanceTraveled, targetCoordinates, callback);
            }
        }
    }
};

Waypoint.prototype.isUnique = function (waypoint) {
    var lastWaypoint = waypoint;
    do {
        lastWaypoint = lastWaypoint._back;
        if (lastWaypoint._coordinates.x === waypoint._coordinates.x
            && lastWaypoint._coordinates.y === waypoint._coordinates.y) {
            return false;
        }
    } while (lastWaypoint._back !== null)
    return true;
};

Waypoint.prototype._add = function (waypoint) {
    if (waypoint === null) {
        return;
    }

    switch (waypoint._direction) {
        case directions.none:
            break;
        case directions.right:
            if (this._right !== null) {
                return this._right._add(waypoint);
            } else {
                this._right = waypoint;
            }
            break;
        case directions.left:
            if (this._left !== null) {
                return this._left._add(waypoint);
            } else {
                this._left = waypoint;
            }
            break;
        case directions.up:
            if (this._top !== null) {
                return this._top._add(waypoint);
            } else {
                this._top = waypoint;
            }
            break;
        case directions.down:
            if (this._bottom !== null) {
                return this._bottom._add(waypoint);
            } else {
                this._bottom = waypoint;
            }
            break;
    }
};
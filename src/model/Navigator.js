function Navigator(characterModel) {
    this._characterModel = characterModel;
    this.reset;
}

Navigator.prototype.reset = function (targetCoordinates) {
    this._bestRoute = null;
    this._distanceTraveled = 0;
}

Navigator.prototype.directionTo = function (board, targetCoordinates) {
    if (this._characterModel.isSnapToTile()
        && !cc.pointEqualToPoint(targetCoordinates, this._characterModel.coordinatesOfOccupiedTile(board))) {
        if (this._bestRoute !== null && this._distanceTraveled < 4) {
            this._distanceTraveled++;
            return this._bestRoute.getDirectionAtWaypoint(this._distanceTraveled);
        } else {
            var sortedRouteEndpoints = this.sortedRouteEndpoints(board, targetCoordinates);
            this._bestRoute = sortedRouteEndpoints[0];
            this._distanceTraveled = 1;
            return this._bestRoute.getDirectionAtWaypoint(this._distanceTraveled);
        }
    }
    return directions.none;
};

Navigator.prototype.directionFrom = function (board, targetCoordinates) {
    if (this._characterModel.isSnapToTile()) {
        if (this._bestRoute !== null && this._distanceTraveled < 6) {
            this._distanceTraveled++;
            return this._bestRoute.getDirectionAtWaypoint(this._distanceTraveled);
        } else {
            var sortedRouteEndpoints = this.sortedRouteEndpoints(board, targetCoordinates);
            this._bestRoute = sortedRouteEndpoints[sortedRouteEndpoints.length - 1];
            this._distanceTraveled = 1;
            return this._bestRoute.getDirectionAtWaypoint(this._distanceTraveled);
        }
    }
    return directions.none;
};

Navigator.prototype.sortedRouteEndpoints = function (board, targetCoordinates) {
    var routeEndpoints = [];
    var waypoint = new Waypoint(board, this._characterModel.coordinatesOfOccupiedTile(board));
    waypoint.createRoutes(9, targetCoordinates, function (route) { routeEndpoints.push(route); });

    var so = this;
    routeEndpoints.sort(function (a, b) {
        if (so.distanceTo(a.getCoordinates(), targetCoordinates) === so.distanceTo(b.getCoordinates(), targetCoordinates)) {
            return a.distanceTraveled - b.distanceTraveled;
        }
        return so.distanceTo(a.getCoordinates(), targetCoordinates) - so.distanceTo(b.getCoordinates(), targetCoordinates);
    });
    return routeEndpoints;
};

Navigator.prototype.distanceTo = function (startingCoordinates, targetCoordinates) {
    return Math.sqrt(
        Math.pow(startingCoordinates.x - targetCoordinates.x, 2) +
        Math.pow(startingCoordinates.y - targetCoordinates.y, 2));
}
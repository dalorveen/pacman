function Controller(model) {
    this._model = model;
}

Controller.prototype.onKeyPressed = function (keyCode) {
    switch (keyCode) {
        case 65:
            this._model.getPacMan().setDirectionChosenByUser(directions.left);
            break;
        case 68:
            this._model.getPacMan().setDirectionChosenByUser(directions.right);
            break;
        case 87:
            this._model.getPacMan().setDirectionChosenByUser(directions.up);
            break;
        case 83:
            this._model.getPacMan().setDirectionChosenByUser(directions.down);
            break;
    }
};

Controller.prototype.onKeyReleased = function (keyCode) {
    switch (keyCode) {
        case 65:
            this._model.getPacMan().setDirectionChosenByUser(directions.none);
            break;
        case 68:
            this._model.getPacMan().setDirectionChosenByUser(directions.none);
            break;
        case 87:
            this._model.getPacMan().setDirectionChosenByUser(directions.none);
            break;
        case 83:
            this._model.getPacMan().setDirectionChosenByUser(directions.none);
            break;
    }
};
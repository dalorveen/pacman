var gameEvent = {
    respawnAllCharacters: function (eventHandler, context) {
        cc.eventManager.addCustomListener("respawnAllCharacters", eventHandler, context);
    },

    onRespawnAllCharacters: function (eventArgs) {
        cc.eventManager.dispatchCustomEvent("respawnAllCharacters", eventArgs);
    },

    pacManAteDot: function (eventHandler, context) {
        cc.eventManager.addCustomListener("pacManAteDot", eventHandler, context);
    },

    onPacManAteDot: function (eventArgs) {
        cc.eventManager.dispatchCustomEvent("pacManAteDot", eventArgs);
    },

    pacManAteEnergizer: function (eventHandler, context) {
        cc.eventManager.addCustomListener("pacManAteEnergizer", eventHandler, context);
    },

    onPacManAteEnergizer: function (eventArgs) {
        cc.eventManager.dispatchCustomEvent("pacManAteEnergizer", eventArgs);
    },

    pacManAteFruit: function (eventHandler, context) {
        cc.eventManager.addCustomListener("pacManAteFruit", eventHandler, context);
    },

    onPacManAteFruit: function (eventArgs) {
        cc.eventManager.dispatchCustomEvent("pacManAteFruit", eventArgs);
    },

    pacManDies: function (eventHandler, context) {
        cc.eventManager.addCustomListener("pacManDies", eventHandler, context);
    },

    onPacManDies: function (eventArgs) {
        cc.eventManager.dispatchCustomEvent("pacManDies", eventArgs);
    },

    pacManAteGhost: function (eventHandler, context) {
        cc.eventManager.addCustomListener("pacManAteGhost", eventHandler, context);
    },

    onPacManAteGhost: function (eventArgs) {
        cc.eventManager.dispatchCustomEvent("pacManAteGhost", eventArgs);
    },

    ghostInCage: function (eventHandler, context) {
        cc.eventManager.addCustomListener("ghostInCage", eventHandler, context);
    },

    onGhostInCage: function (eventArgs) {
        cc.eventManager.dispatchCustomEvent("ghostInCage", eventArgs);
    },

    newGame: function (eventHandler, context) {
        cc.eventManager.addCustomListener("newGame", eventHandler, context);
    },

    onNewGame: function (eventArgs) {
        cc.eventManager.dispatchCustomEvent("newGame", eventArgs);
    },

    completeLevel: function (eventHandler, context) {
        cc.eventManager.addCustomListener("completeLevel", eventHandler, context);
    },

    onCompleteLevel: function (eventArgs) {
        cc.eventManager.dispatchCustomEvent("completeLevel", eventArgs);
    }
};
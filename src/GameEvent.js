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

    pacManDies: function (eventHandler, context) {
        cc.eventManager.addCustomListener("pacManDies", eventHandler, context);
    },

    onPacManpacManDies: function (eventArgs) {
        cc.eventManager.dispatchCustomEvent("pacManDies", eventArgs);
    }
};
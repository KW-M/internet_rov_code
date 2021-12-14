
var lastTimeRecvdPong = 0;
handleROVMessage = function (message) {
    msgData = JSON.parse(message);
    if (msgData['pong']) {
        console.log("Ping->Pong received");
        lastTimeRecvdPong = Date.now();
        networkPingDelay = lastTimeRecvdPong - Number.parseFloat(msgData['pong']) // since the rpi replies with the ms time we sent in the ping in the pong message
        updatePingDisplay(networkPingDelay);
    }
}

setupConnectDisconnectButtonEvents(() => {
    // connect button clicked:
    connectToROV(getDefaultSignallingServerURL(), handleROVMessage, () => {
        console.log("Connected to ROV");
        // start ping timer to send ping every second
        pingTimer = setInterval(() => {
            sendUpdateToROV({ 'ping': Date.now() });
        }, 1000);
    });
}, () => {
    // disconnect button clicked:
    if (signalObj) {
        signalObj.hangup();
    }
    signalObj = null;
    videoElem.srcObject = null;
    isStreaming = false;
})


// -----------------------------------------------------
// ------------ Gamepad Related ------------------------
// -----------------------------------------------------


initilizeGamepadInterface({

    handleGamepadConnected: function (device) {
        // a new gamepad connected
        console.log('Gamepad Connected:', device);
        document.getElementById("gamepad-connect-notice").style.display = "none";
        showToastMessage("Gamepad Connected")
        // startVideoStream(getDefaultSignallingServerURL())
    },

    handleGamepadDisconnected: function (device) {
        // gamepad disconnected
        console.log('Gamepad Disconnected:', device);
        document.getElementById("gamepad-connect-notice").style.display = "block";
    },

    handleGamepadStateChange: function (gamepadState, stateChangesMask) {
        // console.log(gamepadState, stateChangesMask)

        var updatesPacket = {}

        if (stateChangesMask.buttonsDidChange) {
            for (let btnNum = 0; btnNum < gamepadState.buttons.length; btnNum++) {
                if (stateChangesMask.changedButtons[btnNum] != true) continue;
                if (gamepadState.buttons[btnNum].value >= 0.2) {
                    // showToastMessage(`Button ${btnNum} pressed`); // [${this.GAME_CONTROLLER_BUTTONS[i].btnName}]
                    if (btnNum == 0) updatesPacket.toggleLights = true;
                } else {
                    // showToastMessage(`Button ${btnNum} released`);
                }
            }
        }

        if (stateChangesMask.axesDidChange) updatesPacket.move = calculateDesiredMotion(gamepadState.axes)

        // send the data packet object as a json string
        if (Object.keys(updatesPacket).length > 0) {
            console.log("Sending Updates Message:", updatesPacket)
            sendUpdateToROV(updatesPacket);
        }
    }

})




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
        }, 2000);

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

var handleButtonPressBrowserSide = function (buttonFunction, buttonValue) {
    if (buttonFunction == "photo") {
        takePhoto();
        return true;
    } else if (buttonFunction == "video") {
        // toggleVideo();
        return true;
    }
    return false
}

var buttonMappingNames = {
    'A': { func: 'photo', desc: 'Take Photo' },
    'B': { func: 'record', desc: 'Start/Stop Recording' },
    'X': { func: 'None', desc: 'TBD' },
    'Y': { func: 'None', desc: 'TBD' },
    'L1': { func: 'clawOpen', mode: "btn_hold_allowed", desc: 'Open Claw' },
    'R1': { func: 'clawOpen', mode: "btn_hold_allowed", desc: 'Open Claw' },
    'L2': { func: 'clawClose', mode: "btn_hold_allowed", desc: 'Close Claw' },
    'R2': { func: 'clawClose', mode: "btn_hold_allowed", desc: 'Close Claw' },
    'SELECT': { func: 'bitrate-', mode: "btn_hold_allowed", desc: 'TODO: Decrease Video Quality (lowers latency)' },
    'START': { func: 'bitrate+', mode: "btn_hold_allowed", desc: 'TODO: Increase Video Quality (adds latency)' },
    'dpadUp': { func: 'lights+', mode: "btn_hold_allowed", desc: 'TODO: Increase Intensity of Lights' },
    'dpadDown': { func: 'lights-', mode: "btn_hold_allowed", desc: 'TODO: Decrease Intensity of Lights' },
    'dpadLeft': { func: 'exposure-', mode: "btn_hold_allowed", desc: 'TODO: Dim Camera Exposure' },
    'dpadRight': { func: 'exposure+', mode: "btn_hold_allowed", desc: 'TODO: Brighten Camera Exposure' },
}
var lastROVMotionMessage = {};
initGamepadSupport(gamepadUi, gamepadEmulator, handleGamepadInput);
function handleGamepadInput(buttonStates, axisState) {
    var messageToRov = {}
    for (const btnName in buttonMappingNames) {
        const btnState = buttonStates[btnName]
        if (btnState == undefined) continue;
        const btnFunctionName = buttonMappingNames[btnName].func;
        const btnFunctionMode = buttonMappingNames[btnName].mode;
        if (btnState.pressed && (btnState.justChanged || btnFunctionMode == "btn_hold_allowed")) {
            // if this button action is performed in the browser (not on the rov), this function will take care of it, and return true:
            if (handleButtonPressBrowserSide(btnFunctionName, btnState.value)) continue;
            // otherwise, send the function name of the button to the ROV with the current button value
            messageToRov[btnFunctionName] = btnState.value;
        }
    }

    var rawAxies = [];

    if (axisState["L"] && axisState["R"]) { // && (axisState["R"].justChanged || axisState["L"].justChanged)
        rawAxies = rawAxies.concat(axisState["L"].value);
        rawAxies = rawAxies.concat(axisState["R"].value);
        var desiredRovMotion = calculateDesiredMotion(rawAxies);
        if (JSON.stringify(desiredRovMotion) != lastROVMotionMessage) {
            lastROVMotionMessage = JSON.stringify(desiredRovMotion);
            messageToRov['move'] = desiredRovMotion;
        }
    }

    if (Object.keys(messageToRov).length > 0) {
        console.log("Sending message to ROV: " + JSON.stringify(messageToRov));
        sendUpdateToROV(messageToRov);
    }
}

// test for ssl
if (location.protocol != 'https:') {
    var sslCertTrusted = false;
    var sslTestCallback = function () {
        if (confirm("Game controller support may only work if this page is accessed over an ssl (aka: https://) secure connection. Switch to secure connection?")) {
            if (sslCertTrusted) {
                // redirect to https:// (ie secure ssl)
                location.protocol = 'https:'
            } else {
                var m = `Your browser will say a warning message about insecure connection because of a self-signed certificate.
                        In firefox: Click advanced, then 'accept risk' or 'proceede anyway'.
                        In Chrome: type 'thisisunsafe' on the warning page (without quotes)`
                if (confirm()) {
                    // redirect to https:// (ie secure ssl)
                    location.protocol = 'https:';
                }
            }
        }
    }

    try {
        var sslTestScript = document.createElement('script');
        sslTestScript.src = 'https://' + window.location.host + '/sslTest.js';
        document.body.appendChild(sslTestScript);
        sslTestScript.addEventListener('load', sslTestCallback);
        sslTestScript.addEventListener('error', sslTestCallback);
    } catch (e) {
        console.log(e);
        sslTestCallback()
    }
}
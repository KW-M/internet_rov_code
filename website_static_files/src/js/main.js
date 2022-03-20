// // import {} from "./libraries/joypad.min.js"
// //import {} from "./libraries/gamepad-lib.js"

// import {} from "./libraries/webrtc-signaling.js";
// import {} from "./libraries/toastify-js.js";
// import {} from "./libraries/joymap.min.js";
import { inspect } from "@xstate/inspect";

import { calculateDesiredMotion, getURLQueryStringVariable } from "./util.js";
// import {} from "./ui.js";
// import {} from "./api.js";
// import {} from "./connection.js";
// import {} from "./gamepad-emulation.js";
// import {} from "./gamepad-ui.js";
// import {} from "./gamepad.js";



import { siteInitMachine } from "./siteInit";
import { rovConnectionMachine } from "./rovConnStateMachine";

import { initGamepadSupport } from "./gamepad.js";
import { gamepadUi } from "./gamepad-ui.js";
import { gamepadEmulator } from "./gamepad-emulation.js";

// show an inspector
if (getURLQueryStringVariable("debug-mode")) {
    inspect({
        iframe: false,
    });
}


import { createMachine, assign, send, interpret } from "xstate";
import { pure } from "xstate/lib/actions";
import { handleRovMessage } from "./messageHandler";

const mainMachine = createMachine({
    id: "main",
    initial: "Start",
    context: {
        peerServerConfig: {},
        rovIpAddr: "",
    },
    states: {
        Start: {
            invoke: {
                src: siteInitMachine,
                id: "siteInitMachine",
            },
            on: {
                SITE_READY: {
                    target: "Running",
                    actions: ["setRovIpAddr", "setPeerServerConfig"]
                }
            }
        },
        Running: {
            type: "parallel",
            states: {
                Connection_To_Rov: {
                    exit: send({ type: "CLEANUP_CONNECTIONS" }, { to: "rovConnectionMachine" }),
                    invoke: {
                        src: rovConnectionMachine,
                        id: "rovConnectionMachine",
                        data: {
                            ...rovConnectionMachine.context, // spread syntax to fill in the rest of the context specified in the child machine (otherwise xstate removes the rest: https://github.com/statelyai/xstate/issues/993)
                            rovIpAddr: (context, event) => context.rovIpAddr,
                            peerServerConfig: (context, event) => context.peerServerConfig,
                        }
                    },
                },
                Gamepad_Support: {
                    // invoke: {
                    //     // src: gamepadSupportMachine,
                    //     id: "gamepadSupportMachine",
                    //     // src: getSiteInitMachine(),
                    // },
                },
                Message_Handler: {
                    // invoke: {
                    //     // src: messageHandlerMachine,
                    //     id: "messageHandlerMachine",
                    //     // src: getSiteInitMachine(),
                    // },

                    invoke: {
                        src: "handleSendingMessages",
                        id: "handleSendingMessages",
                    },
                    on: {
                        SEND_MESSAGE_TO_ROV: {
                            actions: "sendMessageToRov"
                        },
                        GOT_MESSAGE_FROM_ROV: {
                            actions: "gotMessageFromRov"
                        }
                    }
                }
            },
            on: {
                WEBSITE_CLOSE: {
                    target: "Done",
                }
            }
        },
        Done: {
            type: "final",
        }
    }
}, {
    actions: {
        setRovIpAddr: assign({
            rovIpAddr: (context, event) => event.data.rovIpAddr
        }),
        setPeerServerConfig: assign({
            peerServerConfig: (context, event) => event.data.peerServerConfig
        }),
        sendMessageToRov: send((context, event) => {
            return { type: 'SEND_MESSAGE_TO_ROV', data: event.data }
        }, { to: "rovConnectionMachine" }),
        gotMessageFromRov: (context, event) => {
            (context, event) => { return handleRovMessage(event.data) }
        }
    },
    services: {
        handleSendingMessages: (context, event) => {
            (context, event) => {
                return (callback, onReceive) => {
                    intervalId = setInterval(() => {
                        callback({ type: "SEND_MESSAGE_TO_ROV", data: JSON.stringify({ "ping": Date.now() }) });
                    }, 8000)
                    return () => { clearInterval(intervalId) }
                }
            }
        }
    },
    guards: {
    },
})

window.mainRovMachineService = interpret(mainMachine, { devTools: true })
window.mainRovMachineService.start();

window.onbeforeunload = () => {
    window.mainRovMachineService.send("WEBSITE_CLOSE");
}

function sendUpdateToROV(message) {
    window.mainRovMachineService.send({ type: "SEND_MESSAGE_TO_ROV", data: message });
}


// var lastTimeRecvdPong = 0;
// const handleROVMessage = function (message) {
//     msgData = JSON.parse(message);
//     if (msgData['pong']) {
//         console.log("Ping->Pong received");
//         lastTimeRecvdPong = Date.now();
//         networkPingDelay = lastTimeRecvdPong - Number.parseFloat(msgData['pong']) // since the rpi replies with the ms time we sent in the ping in the pong message
//         updatePingDisplay(networkPingDelay);
//         if (msgData["sensor_update"]) updateDisplayedSensorValues(msgData["sensor_update"]);
//     }
// }

// setupConnectDisconnectButtonEvents(() => {
//     // connect button clicked:
//     connectToROV(getDefaultSignallingServerURL(), handleROVMessage, () => {
//         console.log("Connected to ROV");
//         // start ping timer to send ping every second
//         pingTimer = setInterval(() => {
//             sendUpdateToROV({ 'ping': Date.now() });
//         }, 2000);

//     });
// }, () => {
//     // disconnect button clicked:
//     if (signalObj) {
//         signalObj.hangup();
//     }
//     signalObj = null;
//     videoElem.srcObject = null;
//     isStreaming = false;
// })

// // -----------------------------------------------------
// // ------------ Gamepad Related ------------------------
// // -----------------------------------------------------

var handleButtonPressBrowserSide = function (buttonFunction, buttonValue) {
    if (buttonFunction == "photo") {
        // takePhoto();
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
        // if (gamepadHelpVisible && btnState.justChanged && btnState.pressed) {
        //     gamepadHelpText.innerText = buttonMappingNames[btnName].desc
        // }
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
        sendUpdateToROV(JSON.stringify(messageToRov));
    }
}


// // import {} from "./libraries/joypad.min.js"
// //import {} from "./libraries/gamepad-lib.js"

// import {} from "./libraries/webrtc-signaling.js";
// import {} from "./libraries/toastify-js.js";
// import {} from "./libraries/joymap.min.js";
import { inspect } from "@xstate/inspect";

// import {} from "./ui.js";
// import {} from "./api.js";
// import {} from "./connection.js";
// import {} from "./gamepad-emulation.js";
// import {} from "./gamepad-ui.js";
import { gamepadController } from "./gamepad.js";

import { handleRovMessage } from "./messageHandler";
import { getURLQueryStringVariable } from "./util.js";
import { setupConnectBtnClickHandler, setupDisconnectBtnClickHandler, showReloadingWebsiteUi, showROVDisconnectedUi, showToastDialog } from "./ui.js";

// import { initGamepadSupport } from "./gamepad.js";
// import { gamepadUi } from "./gamepad-ui.js";
// import { gamepadEmulator } from "./gamepad-emulation.js";

// show an inspector if the query string is present
if (getURLQueryStringVariable("debug-mode")) {
    inspect({
        iframe: false,
    });
}

import { createMachine, assign, send, interpret, spawn } from "xstate";
import { stop } from "xstate/lib/actions";
import { siteInitMachine } from "./siteInit";
import { peerConnMachine } from "./peerConnStateMachine.js";
import { peerServerConnMachine } from "./peerServerConnStateMachine.js";

new gamepadController();

const mainMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgOgMoBdUAnfAYlwEkAVAUQH0AlGgQQBEBNRUABwHtZ0+dL0xcQAD0QAmAGwBmbAEYAHMoAMAdg0BWbQBYVATkNyANCACeibQq0y9U1XLVqpclQF8P5tFmwMAV0xMLChsADlefDoAYRFMMABjfEhSAAUaGgY6XCyANSzYgHlw8JoYqgoSuhpcKmYAIQAZClwACRpWMT4BIRExSQRlQw1sdzkZRTk9ZTkRxT1zKwRHUbk5jVU9bXk1Q00vHwwcQODQ7DSwMCIc64A3a9j4pJSIchpw1joAWVrcZgA4vQqEVGEU8t1+IJhKIkBJEFN5NgpBpDG49HJtMo9GosUtEHptthXFN3DoZHtjIcQL4TkEQpgwpdHrh7o84sEXqkAUUqD8-oD6AAxBhFb5giFwnrQ-pwwaKRRuMYyZRSQzKDQUuSbRT4hCE7TEqSkxTkymGam0-z00KkVitGIlMoVOgNACqVBB4ToaSYuFyXSlUL6sNAgykyLUKqmalmemMmJserVemwqqkGbUihkunsUktx2tZ0Z6Uy2VyDAK2SFzHqTRqDFFDEhvRhA0QGlNRtVeh06k7ez1Mi02FRRhzKM7GYLflODKgpAA6jQGgwqDE6DW6w2my2ZaH4QhswZsMOMVIszttLrLIhpooxp2HFJtuo1BMZ3Tiwvlw1KLRYiaIpcj3EN2yPGQc2RXsDEggwUxkZMkW0QwVVjFVILkY05E-bBmAAdwwIRGQlJ5OWSV0AnwfARB9Ig4FgUhHVKco+XdT1ql9P5OlAts5TvHRsH0dZjUJEwnz1bZDDTbQXH0YZUOUTxqUwXgIDgMQrQIYh8F42Uw2kB9VRQ2ZDBsJT0T1XRR1mWZTW1KNZGxXC53OSJog5BJkkgPSD0GaMjQMLERMUNRtmTdQ0xxU0KXUbNjG0FybUZC4rhuVkiAeG5PK5CBfPAxV9mwNFcTMzQTCw5NO2RRRjAw1wUNRHDvBpQtXMZfL+IQHNRlcILZiw0LwtvBBrzGLDtRkScUL63CCKI0JSJyiiGiomjMDohjOoMhAAFodiEjNtA0TRjvsfZEJGmYZFHSlZijHYXGao4-FYEQwG2w8VEgoTNXVZQVW2RQkxGtVlFHDQ3E0ewsNxexP0+wZdsi7QjpOnRNXjKM9V241TwmJqs1cCY9i8LwgA */
    createMachine({
        context: {
            peerServerConfig: {},
            rovIpAddr: "",
            peerServerConnActor: null,
            peerConnActor: null,
            pingSenderActor: null,
        },
        id: "main",
        initial: "Start",
        states: {
            Start: {
                invoke: {
                    src: siteInitMachine,
                    id: "siteInitMachine",
                },
                on: {
                    SITE_READY: {
                        actions: ["setRovIpAddr", "setPeerServerConfig"],
                        target: "Running",
                    },
                },
            },
            Running: {
                entry: "startPeerServerConnMachine",
                exit: "stopPeerServerConnMachine",
                invoke: {
                    src: "awaitDisconnectBtnPress",
                    id: "awaitDisconnectBtnPress",
                },
                initial: "Not_Connected",
                states: {
                    Not_Connected: {
                        on: {
                            PEER_SERVER_CONNECTION_ESTABLISHED: {
                                target: "Peer_Server_Connected",
                            },
                        },
                    },
                    Peer_Server_Connected: {
                        entry: ["startPeerConnMachine", "startPingMessageGenerator"],
                        exit: ["stopPeerConnMachine", "stopPingMessageGenerator"],
                        on: {
                            SEND_MESSAGE_TO_ROV: {
                                actions: "sendMessageToRov",
                            },
                            GOT_MESSAGE_FROM_ROV: {
                                actions: "gotMessageFromRov",
                            },
                        },
                    },
                },
                on: {
                    DISCONNECT_BUTTON_PRESSED: {
                        target: "Awaiting_ROV_Connect_Button_Press",
                    },
                    PEER_NOT_YET_READY_ERROR: {
                        target: "Awaiting_ROV_Connect_Button_Press",
                    },
                    PEER_SERVER_FATAL_ERROR: {
                        target: "Running", // retry
                        internal: false,
                    },
                    WEBRTC_FATAL_ERROR: {
                        actions: "reloadWebsite",
                        target: "Done",
                    },
                    WEBSITE_CLOSE: {
                        target: "Done",
                    },
                },
            },
            Awaiting_ROV_Connect_Button_Press: {
                entry: "showDisconnectedUi",
                invoke: {
                    src: "awaitConnectBtnPress",
                    id: "awaitConnectBtnPress",
                },
                on: {
                    CONNECT_BUTTON_PRESSED: {
                        target: "Running",
                    },
                },
            },
            Done: {
                type: "final",
            },
        },
    }, {
        actions: {
            showDisconnectedUi: () => { showROVDisconnectedUi() },
            reloadWebsite: () => {
                showReloadingWebsiteUi()
                setTimeout(() => { window.location.reload() }, 2000)
            },
            setRovIpAddr: assign({
                rovIpAddr: (context, event) => event.data.rovIpAddr
            }),
            setPeerServerConfig: assign({
                peerServerConfig: (context, event) => event.data.peerServerConfig
            }),
            startPeerServerConnMachine: assign({
                peerServerConnActor: (context) => spawn(peerServerConnMachine.withContext({
                    ...peerServerConnMachine.context, // spread syntax to fill in the rest of the context specified in the child machine (otherwise xstate removes the rest: https://github.com/statelyai/xstate/issues/993)
                    rovIpAddr: context.rovIpAddr,
                    peerServerConfig: context.peerServerConfig,
                }), "peerServerConnMachine"),
            }),
            startPeerConnMachine: assign({
                peerServerConnActor: (context, event) => {
                    return spawn(peerConnMachine.withContext({
                        ...peerConnMachine.context, // spread syntax to fill in the rest of the context specified in the child machine (otherwise xstate removes the rest: https://github.com/statelyai/xstate/issues/993)
                        thisPeer: event.data,
                    }), "peerConnMachine")
                },
            }),
            startPingMessageGenerator: assign({
                pingSenderActor: spawn(() => {
                    return (callback) => {
                        const intervalId = setInterval(() => {
                            callback({ type: "SEND_MESSAGE_TO_ROV", data: JSON.stringify({ "ping": Date.now() }) }, { to: "rovConnectionMachine" });
                        }, 5000)
                        return () => { clearInterval(intervalId) }
                    }
                }, "pingMessageGenerator"),
            }),
            stopPingMessageGenerator: stop("pingMessageGenerator"),
            stopPeerServerConnMachine: stop("peerServerConnMachine"),
            stopPeerConnMachine: stop("peerConnMachine"),
            gotMessageFromRov: (context, event) => {
                handleRovMessage(event.data)
            },
            sendMessageToRov: send((context, event) => {
                return { type: 'SEND_MESSAGE_TO_ROV', data: event.data }
            }, { to: "peerConnMachine" }),
        },
        services: {
            awaitConnectBtnPress: (context, event) => {
                return (sendStateChange) => {
                    const err = event.data
                    console.log(event)
                    var toastMsg = null
                    if (err && err.type == "peer-unavailable") {
                        toastMsg = showToastDialog("ROV is not yet online!", 12000, false)
                    }
                    const cleanupFunc = setupConnectBtnClickHandler(() => {
                        if (toastMsg) toastMsg.hideToast()
                        sendStateChange("CONNECT_BUTTON_PRESSED");
                    })
                    return cleanupFunc;
                };
            },
            awaitDisconnectBtnPress: () => {
                return (sendStateChange) => {
                    const cleanupFunc = setupDisconnectBtnClickHandler(() => {
                        sendStateChange("DISCONNECT_BUTTON_PRESSED");
                    })
                    return cleanupFunc;
                };
            },
        },
        guards: {
        },
    })

window.mainRovMachineService = interpret(mainMachine, { devTools: true })
// window.mainRovMachineService.onChange(console.log)
window.mainRovMachineService.start();

window.onbeforeunload = () => {
    window.mainRovMachineService.send("WEBSITE_CLOSE");
}

// function sendUpdateToROV(message) {
//     window.mainRovMachineService.send({ type: "SEND_MESSAGE_TO_ROV", data: message });
// }


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

// var handleButtonPressBrowserSide = function (buttonFunction, buttonValue) {
//     if (buttonFunction == "photo") {
//         // takePhoto();
//         return true;
//     } else if (buttonFunction == "video") {
//         // toggleVideo();
//         return true;
//     }
//     return false
// }

// var buttonMappingNames = {
//     'A': { func: 'photo', desc: 'Take Photo' },
//     'B': { func: 'record', desc: 'Start/Stop Recording' },
//     'X': { func: 'None', desc: 'TBD' },
//     'Y': { func: 'None', desc: 'TBD' },
//     'L1': { func: 'clawOpen', mode: "btn_hold_allowed", desc: 'Open Claw' },
//     'R1': { func: 'clawOpen', mode: "btn_hold_allowed", desc: 'Open Claw' },
//     'L2': { func: 'clawClose', mode: "btn_hold_allowed", desc: 'Close Claw' },
//     'R2': { func: 'clawClose', mode: "btn_hold_allowed", desc: 'Close Claw' },
//     'SELECT': { func: 'bitrate-', mode: "btn_hold_allowed", desc: 'TODO: Decrease Video Quality (lowers latency)' },
//     'START': { func: 'bitrate+', mode: "btn_hold_allowed", desc: 'TODO: Increase Video Quality (adds latency)' },
//     'dpadUp': { func: 'lights+', mode: "btn_hold_allowed", desc: 'TODO: Increase Intensity of Lights' },
//     'dpadDown': { func: 'lights-', mode: "btn_hold_allowed", desc: 'TODO: Decrease Intensity of Lights' },
//     'dpadLeft': { func: 'exposure-', mode: "btn_hold_allowed", desc: 'TODO: Dim Camera Exposure' },
//     'dpadRight': { func: 'exposure+', mode: "btn_hold_allowed", desc: 'TODO: Brighten Camera Exposure' },
// }
// var lastROVMotionMessage = {};
// initGamepadSupport(gamepadUi, gamepadEmulator, handleGamepadInput);
// function handleGamepadInput(buttonStates, axisState) {
//     var messageToRov = {}
//     for (const btnName in buttonMappingNames) {
//         const btnState = buttonStates[btnName]
//         if (btnState == undefined) continue;
//         const btnFunctionName = buttonMappingNames[btnName].func;
//         const btnFunctionMode = buttonMappingNames[btnName].mode;
//         if (btnState.pressed && (btnState.justChanged || btnFunctionMode == "btn_hold_allowed")) {
//             // if this button action is performed in the browser (not on the rov), this function will take care of it, and return true:
//             if (handleButtonPressBrowserSide(btnFunctionName, btnState.value)) continue;
//             // otherwise, send the function name of the button to the ROV with the current button value
//             messageToRov[btnFunctionName] = btnState.value;
//         }
//         // if (gamepadHelpVisible && btnState.justChanged && btnState.pressed) {
//         //     gamepadHelpText.innerText = buttonMappingNames[btnName].desc
//         // }
//     }

//     var rawAxies = [];

//     if (axisState["L"] && axisState["R"]) { // && (axisState["R"].justChanged || axisState["L"].justChanged)
//         rawAxies = rawAxies.concat(axisState["L"].value);
//         rawAxies = rawAxies.concat(axisState["R"].value);
//         var desiredRovMotion = calculateDesiredMotion(rawAxies);
//         if (JSON.stringify(desiredRovMotion) != lastROVMotionMessage) {
//             lastROVMotionMessage = JSON.stringify(desiredRovMotion);
//             messageToRov['move'] = desiredRovMotion;
//         }
//     }

//     if (Object.keys(messageToRov).length > 0) {
//         console.log("Sending message to ROV: " + JSON.stringify(messageToRov));
//         sendUpdateToROV(JSON.stringify(messageToRov));
//     }
// }


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
import { GamepadController } from "./gamepad.js";

import { RovActions } from "./messageHandler";
import { getURLQueryStringVariable } from "./util.js";
import { createTitle, hideRovConnectionBar, setCurrentRovName, setupConnectBtnClickHandler, setupDisconnectBtnClickHandler, setupSwitchRovBtnClickHandlers, showReloadingWebsiteUi, showRovConnectionBar, showROVDisconnectedUi, showToastDialog } from "./ui.js";

// show an inspector if the query string is present
let debugXstateMode = !!getURLQueryStringVariable("debug");
if (debugXstateMode) {
    inspect({
        iframe: false,
    });
}

// pre state machine simple refactor

import { createMachine, assign, interpret, spawn } from "xstate";
import { stop } from "xstate/lib/actions";
import { siteInitMachine } from "./siteInit";
import { peerConnMachine } from "./rovConnStateMachine.js";
import { peerServerConnMachine } from "./peerServerConnStateMachine.js";
import { ROV_PEERID_BASE } from "./consts.js";
// import { DisclosureNav } from "./libraries/accesableDropdownMenu.js";

window.rovActions = RovActions;

/* init gamepad support */
new GamepadController();

const savedRovEndNumber = parseInt(localStorage.getItem("rovPeerIdEndNumber") || 0);
setCurrentRovName(ROV_PEERID_BASE + savedRovEndNumber)

/* mainMachine: Defines the main state machine that controls the all rov connection parts of the site:
 * NOTE: This statemachine is much easier to understand as a flowchart by copying and pasting this whole mainMachine definition into: https://stately.ai/viz
 *       or using the "xState extension for VS Code" (google it). I highly recomend you use it!
 */
const mainMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgOgMoBdUAnfAYlwEkAVAUQH0AlGgQQBEBNRUABwHtZ0+dL0xcQAD0QBWAEwAGbABYA7MrmK5MgIyKdymQBoQAT0QBmZYuxyAnADYzMmXZtydcqQF9PRtFmwMAK6YmFhQ2AAKYGBEdLgxAG4xdAByvPh0AMIimGAAxviQpBE0NAxxZQBqZVkA8ikpNJlUFPV0NLhUzABCADIUuAASNKxifAJCImKSCDIAHGbYc6paUmZac1JSilJaRqYIOmZ2SzaKMhpuNrtyZt6+GDhBIWGR0bHxREmx2SH5hRByDQUqw6ABZDq4ZgAcXoVFqjFqlTG-EEwlESAkiAWymwWjMczscw8jm0dkMJkQWhkNhs2BpZ0UdiJNjMBK8PhAfiewVCmHCUWSn2+WRy-yK0NqVHBkJh9AAYgxamDEcjMeM0VNMTM7FoFGoZBZlPjqWY1vsqQz6bSVMpdTTljJ7lzHgFea9BR9EslfrkCkUlZU6g0mi02h0un0BsNRurUZMMaAdVs8U45s4pMozdo9pTDnZbtZrrapA4Wcpndy3S9+aRMvVGs06PDUjQABrSwMoibo6aIJy4jZbLPp1TGuTKC0IVyD3XXVbKQmKOaKSuu558qCkJhUBjsVXBxthlLdzWJrEIY5SbD6ReWQmaGwXKfp6+KJnDk3LGxaNf+DdhKQrADPWIZNoqyqqqeCZ9pembWOszIaFoahrIoU4oWs1hqJoGbbLIf48jWW4lDUKRSnQ7A0J2LAcO0DBKgw0G9tqiB2Fm2COMoshSE+OzLHYL6GkWGjsRmZiuL+nJVgBtakeUuBVDU8rMF0vT0YxzFakm2IXEocz4lIcjGRYcjMlO1wKGYHhaFodiZvYBlOtJ67urWADqNDdAwVCZHQKlqRptRMXGPbaRetkSfSuqbFxZnpjYGFMvqxIoXMrhOPZcyEdWm6kJ53SULQWS9LUilaeeMy2eSSxmIoNgrhJFiuOhebUvo1jErSCweMuyw5cwADuGBCPyB6+v8dDdIE+D4CIdAREQcCwHWDahlNACqVDwikC1MLgimxjw8YsTpCC6lYdV2ds+gFqsuYHJhiwTsZqzklmHKcpgvAQHAYhVgQxD4BVsGZTeWW2C4mxaA1ZhThYJx6hY1X2SoZl2DlskCu8cTerEaQZBN-oQCDrGXvI2C6naE72bZXVSBh6wyNaTNrHqBnqJjbnY0KeOin8xOk2ddjvtYxmOmZrKjozDXYD+xybCLMMyFmXPEULF4yLxSwrGzmz4Q9VL4nSBLZhcr1MlJDz+ENI1hONYoFFNM1zZgC1LbA8ChWesEaMzajLhsth3txGELIsigWFr5K0qsNg5awIhgBrVWGnS2zLjs+LKPYmaMzVWweCrd68Y4hEp-2mjg1IXVQ7ssNTmDKG9cXN0Nau3ieEAA */
    createMachine({
        context: {
            peerServerConfig: {},
            rovIpAddr: "",
            rovPeerIdEndNumber: savedRovEndNumber || 0,
            attemptingNewRovPeerId: false,
            thisPeer: null,
            peerServerConnActor: null,
            peerConnActor: null,
            pingSenderActor: null,
        },
        invoke: {
            src: "setupUiButtonHandlers",
            id: "setupUiButtonHandlers",
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
                        target: "Connecting_to_Peer_Server",
                    },
                },
            },
            Connecting_to_Peer_Server: {
                entry: ["stopPeerServerConnMachine", "runPeerServerConnMachine", "hideRovConnectionBar"],
                on: {
                    PEER_SERVER_CONNECTION_ESTABLISHED: {
                        actions: ["setThisPeer"],
                        target: "Connecting_to_Rov",
                    },
                },
            },
            Connecting_to_Rov: {
                entry: ["runPeerConnMachine", "showRovConnectionBar"],
                exit: ["stopPeerConnMachine"],
                on: {
                    SWITCH_TO_NEXT_ROV: {
                        actions: "switchToNextRovPeerId",
                        target: "Connecting_to_Rov",
                        internal: false,
                    },
                    SWITCH_TO_PREV_ROV: {
                        actions: "switchToPrevRovPeerId",
                        target: "Connecting_to_Rov",
                        internal: false,
                    },
                    RETRY_ROV_CONNECTION: {
                        target: "Connecting_to_Rov",
                        internal: false,
                    },
                    DISCONNECT_FROM_ROV: {
                        target: "Waiting_for_Connect_to_Rov_Btn_Press",
                    },
                    PEER_UNAVAILABLE: [
                        {

                            target: "Waiting_for_Connect_to_Rov_Btn_Press",
                        },
                        // {
                        //     actions: [() => console.log("hello")],
                        //     target: "Connecting_to_Peer_Server",
                        // }
                    ],
                    PEER_SERVER_FATAL_ERROR: {
                        actions: "stopPeerServerConnMachine",
                        target: "Connecting_to_Peer_Server",
                        internal: false,
                    },
                    WEBRTC_FATAL_ERROR: {
                        actions: "reloadWebsite",
                        target: "End",
                    },
                },
            },
            Waiting_for_Connect_to_Rov_Btn_Press: {
                entry: "showDisconnectedUi",
                invoke: {
                    src: "awaitConnectBtnPress",
                    id: "awaitConnectBtnPress",
                },
                on: {
                    CONNECT_BUTTON_PRESSED: {
                        target: "Connecting_to_Rov",
                    },
                    SWITCH_TO_NEXT_ROV: {
                        actions: "switchToNextRovPeerId",
                    },
                    SWITCH_TO_PREV_ROV: {
                        actions: "switchToPrevRovPeerId",
                    },
                },
            },
            End: {
                type: "final",
            },
        },
        on: {
            WEBSITE_CLOSE: {
                target: "End",
            },
        }
    }, {
        actions: {
            "showRovConnectionBar": showRovConnectionBar,
            "hideRovConnectionBar": hideRovConnectionBar,
            "showDisconnectedUi": () => {
                showROVDisconnectedUi()
            },
            "setRovIpAddr": assign({
                rovIpAddr: (context, event) => event.data.rovIpAddr
            }),
            "setPeerServerConfig": assign({
                peerServerConfig: (context, event) => event.data.peerServerConfig
            }),
            "setThisPeer": assign({
                thisPeer: (context, event) => event.data
            }),
            "switchToNextRovPeerId": assign({
                rovPeerIdEndNumber: (context) => {
                    let newRovPeerIdEndNumber = context.rovPeerIdEndNumber + 1;
                    setCurrentRovName(ROV_PEERID_BASE + newRovPeerIdEndNumber);
                    localStorage.setItem("rovPeerIdEndNumber", newRovPeerIdEndNumber);
                    return newRovPeerIdEndNumber
                },
                attemptingNewRovPeerId: true,
            }),
            "switchToPrevRovPeerId": assign({
                rovPeerIdEndNumber: (context) => {
                    let newRovPeerIdEndNumber = Math.max(0, context.rovPeerIdEndNumber - 1);
                    setCurrentRovName(ROV_PEERID_BASE + newRovPeerIdEndNumber);
                    localStorage.setItem("rovPeerIdEndNumber", newRovPeerIdEndNumber);
                    return newRovPeerIdEndNumber
                },
                attemptingNewRovPeerId: true,
            }),
            "runPeerServerConnMachine": assign({
                peerServerConnActor: (context) => spawn(peerServerConnMachine
                    .withContext({
                        ...peerServerConnMachine.context, // spread syntax to fill in the rest of the context specified in the child machine (otherwise xstate removes the rest: https://github.com/statelyai/xstate/issues/993)
                        rovIpAddr: context.rovIpAddr,
                        peerServerConfig: context.peerServerConfig,
                    })
                    , "peerServerConnMachine"),
            }),
            "runPeerConnMachine": assign({
                peerServerConnActor: (context) => {
                    return spawn(peerConnMachine
                        .withContext({
                            ...peerConnMachine.context, // spread syntax to fill in the rest of the context specified in the child machine (otherwise xstate removes the rest: https://github.com/statelyai/xstate/issues/993)
                            thisPeer: context.thisPeer,
                            rovPeerId: ROV_PEERID_BASE + String(context.rovPeerIdEndNumber),
                        }), "peerConnMachine")
                },
            }),
            "stopPeerServerConnMachine": stop("peerServerConnMachine"),
            "stopPeerConnMachine": stop("peerConnMachine"),
            // "handlePeerNotYetReadyError": pure((context) => {
            //     // this function is called whenever we fail to find or connect to a rov:
            //     showToastMessage("Could not connect to " + ROV_PEERID_BASE + String(context.rovPeerIdEndNumber))
            //     if (context.attemptingNewRovPeerId && context.rovPeerIdEndNumber != 0) {
            //         // we've tried all the rov IDs and none of them are online
            //         showToastMessage("Trying previous rov: " + ROV_PEERID_BASE + String(context.rovPeerIdEndNumber - 1))
            //         return [assign({
            //             rovPeerIdEndNumber: context.rovPeerIdEndNumber - 1,
            //         }), send("RETRY_ROV_CONNECTION")]
            //     } else {
            //         return send("DISCONNECT_FROM_ROV")
            //     }
            // }), // will either go to the Running with the previous rov ID or go to Waiting_for_Connect_to_Rov_Btn_Press if the very first rov or the last connected rov is offline

            // "gotMessageFromRov": (context, event) => {
            //     MessageHandler.handleRecivedMessage(event.data)
            // },

            // "sendMessageToRov": send((context, event) => {
            //     return { type: 'SEND_MESSAGE_TO_ROV', data: event.data }
            // }, { to: "peerConnMachine" }),

            "reloadWebsite": () => {
                showReloadingWebsiteUi()
                setTimeout(() => { window.location.reload() }, 5000)
            },
        },
        services: {
            "awaitConnectBtnPress": (context, event) => {
                return (sendStateChange) => {
                    const err = event.data
                    console.log(event)
                    var toastMsg = null
                    if (err && err.type == "peer-unavailable") {
                        const msg = ROV_PEERID_BASE + context.rovPeerIdEndNumber + " is not yet online!"
                        toastMsg = showToastDialog([createTitle(msg)], { duration: 12000 })
                    }
                    const cleanupFunc = setupConnectBtnClickHandler(() => {
                        if (toastMsg) toastMsg.hideToast()
                        sendStateChange("CONNECT_BUTTON_PRESSED");
                    })
                    return cleanupFunc;
                };
            },
            "setupUiButtonHandlers": () => {
                return (sendStateChange) => {
                    const disconnectBtnCleanupFunc = setupDisconnectBtnClickHandler(() => {
                        sendStateChange("DISCONNECT_FROM_ROV");
                    })

                    const switchRovCleanupFunc = setupSwitchRovBtnClickHandlers(() => {
                        sendStateChange("SWITCH_TO_PREV_ROV");
                    }, () => {
                        sendStateChange("SWITCH_TO_NEXT_ROV");
                    })

                    return () => {
                        disconnectBtnCleanupFunc();
                        switchRovCleanupFunc();
                    };
                };
            },
        },
        guards: {
            "rovDatachannelIsOpen": (context) => {
                console.log(context.peerConnActor)
                return false; //context.peerConnActor && context.peerConnActor.state.context.rovDataConnection
            }
        },
    })


function startMachine() {
    window.mainRovMachineService = interpret(mainMachine, { devTools: debugXstateMode })
    window.mainRovMachineService.onTransition((state) => { console.log("MainTransition:", state.value) })
    window.mainRovMachineService.start();


    window.onbeforeunload = () => {
        window.thisPeerjsPeer.destroy();
        window.mainRovMachineService.send("WEBSITE_CLOSE");
    }

}

if (debugXstateMode) {
    setTimeout(startMachine, 1000);
} else {
    startMachine();
}


setTimeout(() => {
    RovActions.toggleLights();
}, 2000)

/* Initialize Disclosure Menus */

// var menus = document.querySelectorAll('.disclosure-nav');
// var disclosureMenus = [];

// for (var i = 0; i < menus.length; i++) {
//     disclosureMenus[i] = new DisclosureNav(menus[i]);
//     disclosureMenus[i].updateKeyControls(true);
// }

        // fake link behavior
        // disclosureMenus.forEach((disclosureNav, i) => {
        //     var links = menus[i].querySelectorAll('[href="#mythical-page-content"]');
        //     var examplePageHeading = document.getElementById('mythical-page-heading');
        //     for (var k = 0; k < links.length; k++) {
        //         // The codepen export script updates the internal link href with a full URL
        //         // we're just manually fixing that behavior here
        //         links[k].href = '#mythical-page-content';

        //         links[k].addEventListener('click', (event) => {
        //             // change the heading text to fake a page change
        //             var pageTitle = event.target.innerText;
        //             examplePageHeading.innerText = pageTitle;

        //             // handle aria-current
        //             for (var n = 0; n < links.length; n++) {
        //                 links[n].removeAttribute('aria-current');
        //             }
        //             event.target.setAttribute('aria-current', 'page');
        //         });
        //     }
        // });
    // }


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

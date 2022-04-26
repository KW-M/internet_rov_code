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

import { MessageHandler, RovActions } from "./messageHandler";
import { getURLQueryStringVariable } from "./util.js";
import { createTitle, setupConnectBtnClickHandler, setupDisconnectBtnClickHandler, setupSwitchRovBtnClickHandler, showReloadingWebsiteUi, showROVDisconnectedUi, showToastDialog, showToastMessage } from "./ui.js";

// show an inspector if the query string is present
if (getURLQueryStringVariable("debug-mode")) {
    inspect({
        iframe: false,
    });
}

import { createMachine, assign, send, interpret, spawn } from "xstate";
import { pure, stop } from "xstate/lib/actions";
import { siteInitMachine } from "./siteInit";
import { peerConnMachine } from "./peerConnStateMachine.js";
import { peerServerConnMachine } from "./peerServerConnStateMachine.js";
import { ROV_PEERID_BASE } from "./consts.js";
// import { DisclosureNav } from "./libraries/accesableDropdownMenu.js";


// // showChoiceDialog("Pick A food", ["peanuts", "cashews", "rum"], console.log)
// let a = showScrollableTextPopup("ROV Status")
// setInterval(() => {
//     a(Date.now() + " djflksdjf dslkfjsdsdjflksdjflkfjsd" + " \n");
// }, 100);

const mainMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgOgMoBdUAnfAYlwEkAVAUQH0AlGgQQBEBNRUABwHtZ0+dL0xcQAD0QBWAEwAGbABYA7MrmK5MgIyKdymQBoQAT0QBmZYuxyAnADYzMmXZtydcqQF9PRtFmwMAK6YmFhQ2AAKYGBEdLgxAG4xdAByvPh0AMIimGAAxviQpBE0NAxxZQBqZVkA8ikpNJlUFPV0NLhUzABCADIUuAASNKxifAJCImKSCDIAHGbYc6paUmZac1JSilJaRqYIOmZ2SzaKMhpuNrtyZt6+GDhBIWGR0bHxREmx2SH5hRByDQUqw6ABZDq4ZgAcXoVFqjFqlTG-EEwlESAkiAWymwWjMczscw8jm0dkMJkQWhkNhs2BpZ0UdiJNjMBK8PhAfiewVCmHCUWSn2+WRy-yK0NqVHBkJh9AAYgxamDEcjMeM0VNMTM7FoFGoZBZlPjqWY1vsqQz6bSVMpdTTljJ7lzHgFea9BR9EslfrkCkUlZU6g0mi02h0un0BsNRurUZMMaAdVs8U45s4pMozdo9pTDnZbtZrrapA4Wcpndy3S9+aRMvVGs06PDUjQABrSwMoibo6aIJy4jZbLPp1TGuTKC0IVyD3XXVbKQmKOaKSuu558qCkJhUBjsVXBxthlLdzWJrEIY5SbD6ReWQmaGwXKfp6+KJnDk3LGxaNf+DdhKQrADPWIZNoqyqqqeCZ9pembWOszIaFoahrIoU4oWs1hqJoGbbLIf48jWW4lDUKRSnQ7A0J2LAcO0DBKgw0G9tqiB2Fm2COMoshSE+OzLHYL6GkWGjsRmZiuL+nJVgBtakeUuBVDU8rMF0vT0YxzFakm2IXEocz4lIcjGRYcjMlO1wKGYHhaFodiZvYBlOtJ67urWADqNDdAwVCZHQKlqRptRMXGPbaRetkSfSuqbFxZnpjYGFMvqxIoXMrhOPZcyEdWm6kJ53SULQWS9LUilaeeMy2eSSxmIoNgrhJFiuOhebUvo1jErSCweMuyw5cwADuGBCPyB6+v8dDdIE+D4CIdAREQcCwHWDahlNACqVDwikC1MLgimxjw8YsTpCC6lYdV2ds+gFqsuYHJhiwTsZqzklmHKcpgvAQHAYhVgQxD4BVsGZTeWW2C4mxaA1ZhThYJx6hY1X2SoZl2DlskCu8cTerEaQZBN-oQCDrGXvI2C6naE72bZXVSBh6wyNaTNrHqBnqJjbnY0KeOin8xOk2ddjvtYxmOmZrKjozDXYD+xybCLMMyFmXPEULF4yLxSwrGzmz4Q9VL4nSBLZhcr1MlJDz+ENI1hONYoFFNM1zZgC1LbA8ChWesEaMzajLhsth3txGELIsigWFr5K0qsNg5awIhgBrVWGnS2zLjs+LKPYmaMzVWweCrd68Y4hEp-2mjg1IXVQ7ssNTmDKG9cXN0Nau3ieEAA */
    createMachine({
        context: {
            peerServerConfig: {},
            rovIpAddr: "",
            rovPeerIdEndNumber: 0,
            attemptingNewRovPeerId: false,
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
                        target: "Running",
                    },
                },
            },
            Running: {
                entry: "startPeerServerConnMachine",
                exit: "stopPeerServerConnMachine",
                initial: "Peer_Server_Not_Connected",
                states: {
                    Peer_Server_Not_Connected: {
                        on: {
                            PEER_SERVER_CONNECTION_ESTABLISHED: {
                                target: "Peer_Server_Connected",
                            },
                        },
                    },
                    Peer_Server_Connected: {
                        entry: "startPeerConnMachine",
                        exit: ["stopPeerConnMachine", "stopPingMessageGenerator"],
                        on: {
                            SEND_MESSAGE_TO_ROV: {
                                actions: "sendMessageToRov",
                            },
                            GOT_MESSAGE_FROM_ROV: {
                                actions: "gotMessageFromRov",
                            },
                            ROV_CONNECTION_ESTABLISHED: {
                                actions: "rovPeerConnectionEstablished",
                            },
                        },
                    },
                },
                on: {
                    CONNECT_TO_NEXT_ROV: {
                        actions: "switchToNextRovPeerId",
                        target: "Running",
                        internal: false,
                    },
                    RETRY_ROV_CONNECTION: {
                        target: "Running",
                        internal: false,
                    },
                    DISCONNECT_FROM_ROV: {
                        target: "Awaiting_ROV_Connect_Button_Press",
                    },
                    PEER_NOT_YET_READY_ERROR: {
                        actions: "handlePeerNotYetReadyError",
                    },
                    PEER_SERVER_FATAL_ERROR: {
                        target: "Running",
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
            "showDisconnectedUi": () => {
                showROVDisconnectedUi()
            },
            "reloadWebsite": () => {
                showReloadingWebsiteUi()
                setTimeout(() => { window.location.reload() }, 2000)
            },
            "setRovIpAddr": assign({
                rovIpAddr: (context, event) => event.data.rovIpAddr
            }),
            "setPeerServerConfig": assign({
                peerServerConfig: (context, event) => event.data.peerServerConfig
            }),
            "switchToNextRovPeerId": assign({
                rovPeerIdEndNumber: (context) => {
                    return context.rovPeerIdEndNumber + 1
                },
                attemptingNewRovPeerId: true,
            }),
            "rovPeerConnectionEstablished": assign({
                attemptingNewRovPeerId: false,
            }),
            "handlePeerNotYetReadyError": pure((context) => {
                // this function is called whenever we fail to find or connect to a rov:
                showToastMessage("Could not connect to " + ROV_PEERID_BASE + String(context.rovPeerIdEndNumber))
                if (context.attemptingNewRovPeerId && context.rovPeerIdEndNumber != 0) {
                    // we've tried all the rov IDs and none of them are online
                    showToastMessage("Trying previous rov: " + ROV_PEERID_BASE + String(context.rovPeerIdEndNumber - 1))
                    return [assign({
                        rovPeerIdEndNumber: context.rovPeerIdEndNumber - 1,
                    }), send("RETRY_ROV_CONNECTION")]
                } else {
                    return send("DISCONNECT_FROM_ROV")
                }
            }), // will either go to the Running with the previous rov ID or go to Awaiting_ROV_Connect_Button_Press if the very first rov or the last connected rov is offline
            "startPeerServerConnMachine": assign({
                peerServerConnActor: (context) => spawn(peerServerConnMachine
                    .withContext({
                        ...peerServerConnMachine.context, // spread syntax to fill in the rest of the context specified in the child machine (otherwise xstate removes the rest: https://github.com/statelyai/xstate/issues/993)
                        rovIpAddr: context.rovIpAddr,
                        peerServerConfig: context.peerServerConfig,
                    })
                    , "peerServerConnMachine"),
            }),
            "startPeerConnMachine": assign({
                peerServerConnActor: (context, event) => {
                    return spawn(peerConnMachine
                        .withContext({
                            ...peerConnMachine.context, // spread syntax to fill in the rest of the context specified in the child machine (otherwise xstate removes the rest: https://github.com/statelyai/xstate/issues/993)
                            thisPeer: event.data,
                            rovPeerId: ROV_PEERID_BASE + String(context.rovPeerIdEndNumber),
                        })
                        // .withConfig(peerConnMachine.config)
                        , "peerConnMachine")
                },
            }),
            "startPingMessageGenerator": assign({
                pingSenderActor: () => {
                    return spawn(RovActions.startPingMessageSenderLoop, "pingMessageGenerator")
                }
            }),
            "stopPingMessageGenerator": stop("pingMessageGenerator"),
            "stopPeerServerConnMachine": stop("peerServerConnMachine"),
            "stopPeerConnMachine": stop("peerConnMachine"),
            "gotMessageFromRov": (context, event) => {
                MessageHandler.handleRecivedMessage(event.data)
            },
            "sendMessageToRov": send((context, event) => {
                return { type: 'SEND_MESSAGE_TO_ROV', data: event.data }
            }, { to: "peerConnMachine" }),
        },
        services: {
            "awaitConnectBtnPress": (context, event) => {
                return (sendStateChange) => {
                    const err = event.data
                    console.log(event)
                    var toastMsg = null
                    if (err && err.type == "peer-unavailable") {
                        toastMsg = showToastDialog([createTitle("ROV is not yet online!")], { duration: 12000 })
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
                    const nextRovBtnCleanupFunc = setupSwitchRovBtnClickHandler(() => {
                        sendStateChange("CONNECT_TO_NEXT_ROV");
                    })
                    return () => {
                        disconnectBtnCleanupFunc();
                        nextRovBtnCleanupFunc();
                    };
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
    window.thisPeerjsPeer.destroy();
    window.mainRovMachineService.send("WEBSITE_CLOSE");
}

/* init rov message handler */
new MessageHandler((messageStrForRov) => {
    window.mainRovMachineService.send({ type: "SEND_MESSAGE_TO_ROV", data: messageStrForRov });
});
window.rovActions = RovActions;

/* init gamepad support */
new GamepadController();


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

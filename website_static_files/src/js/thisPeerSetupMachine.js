import { createMachine, interpret } from "xstate";
import Peer from "peerjs/dist/peerjs"
import { v4 as uuidV4 } from "uuid"
// import * as consts from "./consts";

import { generateStateChangeFunction } from "./util";
import { showToastMessage, showLoadingUi, setClientPeerIdDisplay, showReloadingWebsiteUi, hideLoadingUi } from "./ui";

const FATAL_PEER_ERROR_TYPES = [
    "network", "unavailable-id", "invalid-id", "invalid-key", "browser-incompatible", "webrtc", "server-error", "ssl-unavailable", "socket-error", "socket-closed"
];

export const startThisPeerSetupMachine = (globalContext, sendParentCallback) => {
    let eventHandlers = {}

    const sendEventToSelf = (event) => {
        if (runningMachine) runningMachine.send(event);
    }

    const thisPeerSetupMachine =
        /** @xstate-layout N4IgpgJg5mDOIC5QBcAWBLWAFMYBOAymMgK4AOAsgIYDGGAdmAHQn3pvLoA26AXpAGJEoMgHtY6TqPrCQAD0QA2AEzKmABkUBOZQFZ1AFi0B2YwGZFADgA0IAJ6JV6psstvl645YCM63bq1FAF8g2zRMHHwiUkpaBmZ2SW4+QQB5ADkAfVSsAFF02TEJKRkkeURLXUsmbwtAswMPA2bdWwcEYwNnM10G40VFY10Dcy0QsIxsXEJicmo6dgSOZP4IAQzM3IAlLdStwvEk6VkFBBU1TR19I1MLG3tEM08XA2Geg3dLYNCQcKmo2axBaMJiJTg8VYCOSwZBUZDMKgAM3heAAFJZ1JiAJQCP6RGYxebxUHLCGQA7FdDHMqnHwGFy1MydCzqZRdRRtRCBJgNJzeKreLRmNzeca-Sb46JzOKLJiiMhgejrLLbXb7MpFI6lUCnbwfJgBYwmAaWV7GdRmTkIZS+DSWVzaAK+DzfCYRaZSoHE+WK5WZADCABlUgRchStSdEHrqobjVYzRard5lGYasoVMM3EytH5LGK8R7AUTZT6lRsACIASQI-oy6Vy-oAKuGSpGELpk0wRf5et5BublFa2boeV5BYZBgZ48Z8xLC4SZSDUFQuPC1nhiHh2iJDq2aVH9bH+vHdObLQ8OiP+SpDKoLGZXKKxfRRBA4LICwCF8DmKwwStyQ1XcqW1coECMbpvEsHNjG8TotHtLQk2aA10yndRk38aCoNnd0v2lH8SSSMkIBbEC2xMLQakUZNoJ0HojXPdo2Xpa5FCnFobS8AxcP+AkCO9BVQM1PcdSjbxR1cDEtCMEYaOMIczFTVw9GFSxzX5QVeMlItF2YZdV0AndKWpMSEAAWjMKj7SzbwoPjOyFIvKwmEUXQBinJStDs3pdG0+cBMWMjTLA8zFFTGzLDMOyvlNRyrXM+lor0LpEMaLQhT8kIgiAA */
        createMachine({
            id: "thisPeerSetupMachine",
            initial: "uninitilized",
            states: {
                uninitilized: {
                    always: {
                        actions: "InitThisPeer",
                        target: "initilized",
                    },
                },
                initilized: {
                    exit: "clearThisPeerConnectionTimeout",
                    on: {
                        ON_OPEN: {
                            actions: "hideServerConnectLoadingMsg",
                            target: "open",
                        },
                        ON_ERROR: [
                            {
                                actions: ["showBrowserIncompatibleErrorUi", "destroyPeer"],
                                cond: "peerErr=browser-incompatible",
                                target: "halted",
                            },
                            {
                                actions: ["destroyPeer", "clearSavedThisPeerId"],
                                cond: "peerErr=unavailable-id",
                                target: "uninitilized",
                            },
                            {
                                actions: "destroyPeer",
                                cond: "peerErr!=peer-unavailable",
                                target: "halted",
                            },
                            {
                                actions: ["destroyPeer", "showFatalErrorUi"],
                                cond: "peerErr_IsAutoRecoverable",
                                target: "uninitilized",
                            },
                        ],
                        CONNECTION_TIMEOUT: {
                            actions: "destroyPeer",
                            target: "uninitilized",
                        },
                    },
                },
                open: {
                    on: {
                        ON_ERROR: [
                            {
                                actions: ["showWebrtcErrorUi", "destroyPeer"],
                                cond: "peerErr=webrtc",
                                target: "halted",
                            },
                            {
                                actions: ["destroyPeer", "clearSavedThisPeerId"],
                                cond: "peerErr=unavailable-id",
                                target: "uninitilized",
                            },
                            {
                                actions: "destroyPeer",
                                cond: "peerErr!=peer-unavailable",
                                target: "halted",
                            },
                            {
                                actions: ["destroyPeer", "showFatalErrorUi"],
                                cond: "peerErr_IsAutoRecoverable",
                                target: "uninitilized",
                            },
                        ],
                        ON_CLOSE: {
                            actions: "destroyPeer",
                            target: "uninitilized",
                        },
                        ON_DISCONNECT: {
                            actions: "reconnect",
                            target: "initilized",
                        },
                    },
                },
                halted: {
                    on: {
                        retry: {
                            target: "uninitilized",
                        },
                    },
                },
            },
        }, {
            actions: {
                "InitThisPeer": () => {
                    showLoadingUi("server-connecting");

                    // get our saved peer id or make a new one if one isn't saved:
                    var ourPeerId = localStorage.getItem('thisPeerId');
                    if (!ourPeerId) {
                        ourPeerId = "iROV_Pilot_" + uuidV4().slice(0, 8);
                        localStorage.setItem('thisPeerId', ourPeerId); // save for future runs
                    }
                    setClientPeerIdDisplay(ourPeerId);

                    // setup the peer object and event listeners:
                    globalContext.thisPeer = new Peer(ourPeerId, globalContext.peerServerConfig);
                    eventHandlers['onOpen'] = generateStateChangeFunction(sendEventToSelf, 'ON_OPEN', null, () => { showToastMessage("Connected to Peerjs Server!"); });
                    globalContext.thisPeer.on('open', eventHandlers['onOpen']);
                    eventHandlers['onError'] = generateStateChangeFunction(sendEventToSelf, 'ON_ERROR', null);
                    globalContext.thisPeer.on('error', eventHandlers['onError']);
                    eventHandlers['onClose'] = generateStateChangeFunction(sendEventToSelf, 'ON_CLOSE', null, () => { showToastMessage("Peerjs Server Connection Closed!") });
                    globalContext.thisPeer.on('close', eventHandlers['onClose']);
                    eventHandlers['onDisconnected'] = generateStateChangeFunction(sendEventToSelf, 'ON_DISCONNECT', () => { showToastMessage("Peerjs Server Disconnected!") });
                    globalContext.thisPeer.on('disconnected', eventHandlers['onDisconnected']);

                    // tell the main ui that the thisPeer object is ready enough to use:
                    sendParentCallback("THIS_PEER_READY");


                    // setup a timeout in case the connection takes too long
                    globalContext.thisPeerConnectionTimeout = setTimeout(() => {
                        sendEventToSelf('CONNECTION_TIMEOUT');
                    }, 8000); // 8 seconds
                },
                "clearThisPeerConnectionTimeout": () => {
                    clearTimeout(globalContext.thisPeerConnectionTimeout);
                },
                'hideServerConnectLoadingMsg': () => {
                    hideLoadingUi("server-connecting");
                    hideLoadingUi("server-reconnecting");
                },
                "destroyPeer": () => {
                    globalContext.thisPeer.off('open', eventHandlers['onOpen']);
                    globalContext.thisPeer.off('error', eventHandlers['onError']);
                    globalContext.thisPeer.off('close', eventHandlers['onClose']);
                    globalContext.thisPeer.off('disconnected', eventHandlers['onDisconnected']);
                    globalContext.thisPeer.destroy();
                    globalContext.thisPeer = null;

                    sendParentCallback("THIS_PEER_DESTROYED");
                },
                'clearSavedThisPeerId': () => { localStorage.removeItem('thisPeerId') },
                'reconnect': () => {
                    globalContext.thisPeer.reconnect();
                    showLoadingUi("server-reconnecting");
                },
                "showFatalErrorUi": (_, event) => { showToastMessage("Peerjs Server Fatal Error: " + event.data.type + " Restarting..."); console.dir("Peerjs Server Error: ", event.data) },
                "showBrowserIncompatibleErrorUi": () => { alert('Your web browser does not support some WebRTC features. Please use a newer or different browser.'); },
                "showWebrtcErrorUi": () => {
                    showToastMessage("WebRTC protocol error! Reloading website now...")
                    if (globalContext.stressTest) localStorage.setItem("reloadCount", -1); //for debug
                    showReloadingWebsiteUi();
                    setTimeout(() => { location.reload() }, globalContext.stressTest || 3000);
                },

                // } else if (FATAL_PEER_ERROR_TYPES.includes(err.type)) {
                //         showToastMessage("Peerjs Server Fatal Error: " + err.type + " Restarting...")
                //         return [
                //             send("PEER_SERVER_CONNECTION_CLOSED"),
                //             sendParent({ type: "PEER_SERVER_FATAL_ERROR" })
                //         ]

                //     } else {
                //         showToastMessage("Peerjs Server Error: " + err.type + " Restarting...")
                //         console.dir("Peerjs Server Error: ", err)
                //         return [
                //             send({ type: "PEER_SERVER_CONNECTION_CLOSED" }),
                //             sendParent({ type: "PEER_SERVER_FATAL_ERROR" })
                //         ]
                //     }

                // }),

            },
            guards: {
                "peerErr_IsAutoRecoverable": (_, event) => {
                    const err = event.data;
                    return FATAL_PEER_ERROR_TYPES.includes(err.type)
                },
                "peerErr=unavailable-id": (_, event) => {
                    const err = event.data;
                    return err.type === "unavailable-id"
                },
                "peerErr!=peer-unavailable": (_, event) => {
                    const err = event.data;
                    return err.type !== "peer-unavailable"
                },
                "peerErr=webrtc": (_, event) => {
                    const err = event.data;
                    return err.type === "webrtc"
                },
                "peerErr=browser-incompatible": (_, event) => {
                    return event.data === "browser-incompatible"
                },
            }
        });

    const runningMachine = interpret(thisPeerSetupMachine, { devTools: globalContext.debugXstateMode }).start();
    return runningMachine;
}

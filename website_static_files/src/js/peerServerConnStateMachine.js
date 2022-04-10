import { createMachine, spawn, actions } from "xstate";
import Peer from "peerjs"
// import * as consts from "./consts";

import { generateStateChangeFunction } from "./util";
import { showToastMessage, showLoadingUi } from "./ui"
// showROVDisconnectedUi, showROVConnectingUi, showROVConnectedUi, setupConnectBtnClickHandler, showToastDialog, hideLoadingUi, setupDisconnectBtnClickHandler, setupSwitchRovBtnClickHandler

const { pure, stop, send, sendParent, assign } = actions;

const FATAL_PEER_ERROR_TYPES = [
    "network", "unavailable-id", "invalid-id", "invalid-key", "browser-incompatible", "webrtc", "server-error", "ssl-unavailable", "socket-error", "socket-closed"
];

export const peerServerConnMachine = createMachine({
    context: {
        /* NOTE that the context is really set by the parent machine, not here */
        peerServerConfig: null,
        peerConnectionTimeout: 0,
        thisPeer: null,
        peerServerEventsHandler: null,
    },
    id: "peerServerConnection",
    initial: "Not_Connected_To_Peer_Server",
    exit: ["cleanupPeerServerConnection"], //"stopPeerServerEventsHandler",
    states: {
        Not_Connected_To_Peer_Server: {
            entry: ["setupPeerAndStartPeerServerEventsHandler"],
            on: {
                PEER_SERVER_CONNECTION_ESTABLISHED: {
                    target:
                        "#peerServerConnection.Connected_To_Peer_Server",
                },
                PEERJS_ERROR: {
                    target:
                        "#peerServerConnection.Handling_Error",
                },
            },
        },
        Connected_To_Peer_Server: {
            entry: ["showPeerServerConnectedNotice", "notifyParentOfPeerServerConnection"],
            invoke: {
                src: "handlePeerSeverEvents",
                id: "handlePeerSeverEvents",
            },
            on: {
                PEERJS_ERROR: {
                    target:
                        "#peerServerConnection.Handling_Error",
                },
                PEER_SERVER_DISCONNECTED: {
                    actions: "showPeerServerDisconnectedNotice",
                    target:
                        "#peerServerConnection.Reconnecting_to_Peer_Server",
                },
            },
        },
        Reconnecting_to_Peer_Server: {
            invoke: {
                src: "reconnectToPeerServer",
                id: "reconnectToPeerServer"
            },
            on: {
                PEER_SERVER_CONNECTION_ESTABLISHED: {
                    actions: "showPeerServerConnectedNotice",
                    target:
                        "#peerServerConnection.Connected_To_Peer_Server",
                },
                PEERJS_ERROR: {
                    target:
                        "#peerServerConnection.Handling_Error",
                },
            },
        },
        Handling_Error: {
            entry: "handlePeerServerError",
            on: {
                PEER_SERVER_CONNECTION_CLOSED: {
                    actions: ["cleanupPeerServerConnection"],
                    target:
                        "#peerServerConnection.Not_Connected_To_Peer_Server",
                },
            },
        },
    }
}, {
    actions: {
        "showPeerServerConnectedNotice": () => { showToastMessage("Connected to Peerjs Server!") },
        "showPeerServerDisconnectedNotice": () => { showToastMessage("Peerjs Server Disconnected") },
        // setupThisPeerWithPeerServer: assign({
        // }),
        "notifyParentOfPeerServerConnection": sendParent((context) => {
            return { type: "PEER_SERVER_CONNECTION_ESTABLISHED", data: context.thisPeer }
        }),
        "handlePeerServerError": pure((context, event) => {
            const err = event.data;
            if (err.type == 'browser-incompatible') {
                alert('Your web browser does not support some WebRTC features. Please use a newer or different browser.');
                return sendParent({ type: "WEBRTC_FATAL_ERROR" })
            } else if (err.type == "webrtc") {
                showToastMessage("WebRTC protocol error! Reloading website now...")
                return sendParent({ type: "WEBRTC_FATAL_ERROR" })
            } else if (err.type == "peer-unavailable") {
                return sendParent({ type: "PEER_NOT_YET_READY_ERROR", data: err })
            } else if (FATAL_PEER_ERROR_TYPES.includes(err.type)) {
                showToastMessage("Peerjs Server Fatal Error: " + err.type + " Restarting...")
                return sendParent({ type: "PEER_SERVER_FATAL_ERROR" })
            } else {
                showToastMessage("Peerjs Server Error: " + err.type + " Restarting...")
                console.dir("Peerjs Server Error: ", err)
                return send({ type: "PEER_SERVER_CONNECTION_CLOSED" })
            }
        }),
        "cleanupPeerServerConnection": () => { console.log(pure) },
        // assign({
        //     thisPeer: (context) => {
        //         console.log("cleanupPeerServerConnection: ", context.thisPeer)
        //         if (context.thisPeer) {
        //             context.thisPeer.destroy()
        //         }
        //         return null;
        //     }
        // }),
        "setupPeerAndStartPeerServerEventsHandler": assign((context) => {
            const thisPeer = window.thisPeerjsPeer = new Peer(null, context.peerServerConfig);
            return {
                thisPeer: thisPeer,
                peerServerEventsHandler: spawn((sendStateChange) => {
                    const openHandler = generateStateChangeFunction(
                        sendStateChange, "PEER_SERVER_CONNECTION_ESTABLISHED", thisPeer
                    )
                    const errHandler = generateStateChangeFunction(
                        sendStateChange, "PEERJS_ERROR", null, console.log
                    )
                    thisPeer.on("open", openHandler);
                    thisPeer.on("error", errHandler);
                    return () => {
                        thisPeer.off("open", openHandler);
                        thisPeer.off("error", errHandler);
                    }
                }, "peerServerEventsHandler")
            }
        }),
        // "stopPeerServerEventsHandler": stop((context) => {
        //     return context.peerServerEventsHandler
        // }),
    },
    services: {
        handlePeerSeverEvents: (context) => {
            return (sendStateChange) => {
                const errorHandler = generateStateChangeFunction(sendStateChange, "PEERJS_ERROR")
                const disconnectedHandler = generateStateChangeFunction(sendStateChange, "PEER_SERVER_DISCONNECTED")
                context.thisPeer.on("disconnected", disconnectedHandler)
                context.thisPeer.on("error", errorHandler)
                return () => {
                    context.thisPeer.off("disconnected", disconnectedHandler)
                    context.thisPeer.off("error", errorHandler)
                }
            }
        },
        reconnectToPeerServer: (context) => {
            return () => {
                showLoadingUi("Reconnecting to peer server...");
                context.thisPeer.reconnect();
            };
        },

    },
});

console.log(
    "Peerjs Server Connection Machine: ", peerServerConnMachine.options.actions
)

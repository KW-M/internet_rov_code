import { createMachine, spawn } from "xstate";
import Peer from "peerjs/dist/peerjs"
import { v4 as uuidV4 } from "uuid"
// import * as consts from "./consts";

import { generateStateChangeFunction } from "./util";
import { showToastMessage, showLoadingUi, setClientPeerIdDisplay } from "./ui"
import { pure, send, sendParent, assign } from "xstate/lib/actions";

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
                SERVER_CONNECTION_ESTABLISHED: {
                    target:
                        "#peerServerConnection.Connected_To_Peer_Server",
                    actions: ["notifyParentOfPeerServerConnection", "showPeerServerConnectedNotice"],
                },
                PEERJS_ERROR: {
                    target:
                        "#peerServerConnection.Handling_Error",
                },
            },
            after: {
                5000: {
                    target: "#peerServerConnection.Handling_Error"
                }
            },
        },
        Connected_To_Peer_Server: {
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
                SERVER_CONNECTION_ESTABLISHED: {
                    target:
                        "#peerServerConnection.Connected_To_Peer_Server",
                    actions: ["notifyParentOfPeerServerConnection", "showPeerServerConnectedNotice"],
                },
                PEERJS_ERROR: {
                    target:
                        "#peerServerConnection.Handling_Error",
                },
            },
            after: {
                6000: {
                    target: "Handling_Error"
                }
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
                PEER_SERVER_CONNECTION_OK: {
                    target:
                        "#peerServerConnection.Connected_To_Peer_Server",
                    internal: true,
                },
            },
        },
    }
}, {
    actions: {
        "showPeerServerConnectedNotice": () => { showToastMessage("Connected to Peerjs Server!") },
        "showPeerServerDisconnectedNotice": () => { showToastMessage("Peerjs Server Disconnected") },
        "notifyParentOfPeerServerConnection": sendParent((context) => {
            return { type: "PEER_SERVER_CONNECTION_ESTABLISHED", data: context.thisPeer }
        }),
        "handlePeerServerError": pure((context, event) => {
            const err = event.data;
            console.log("handlePeerServerError: ", err);

            if (err.type == 'browser-incompatible') {
                alert('Your web browser does not support some WebRTC features. Please use a newer or different browser.');
                return sendParent({ type: "WEBRTC_FATAL_ERROR" })

            } else if (err.type == "webrtc") {
                showToastMessage("WebRTC protocol error! Reloading website now...")
                localStorage.setItem("reloadCount", -1); //for debug
                return sendParent({ type: "WEBRTC_FATAL_ERROR" })

            } else if (err.type == "peer-unavailable") {
                return [
                    send("PEER_SERVER_CONNECTION_OK"),
                    sendParent({ type: "PEER_UNAVAILABLE", data: err })
                ]

            } else if (err.type == "unavailable-id") {
                localStorage.removeItem('thisClientPeerId') // discard our saved peer id so we will use a fresh one next time we connect
                return send("PEER_SERVER_CONNECTION_CLOSED"); // will cause a reconnection attempt

            } else if (FATAL_PEER_ERROR_TYPES.includes(err.type)) {
                showToastMessage("Peerjs Server Fatal Error: " + err.type + " Restarting...")
                return [
                    send("PEER_SERVER_CONNECTION_CLOSED"),
                    sendParent({ type: "PEER_SERVER_FATAL_ERROR" })
                ]

            } else {
                showToastMessage("Peerjs Server Error: " + err.type + " Restarting...")
                console.dir("Peerjs Server Error: ", err)
                return [
                    send({ type: "PEER_SERVER_CONNECTION_CLOSED" }),
                    sendParent({ type: "PEER_SERVER_FATAL_ERROR" })
                ]
            }

        }),
        "setThisPeer": assign({
            thisPeer: (_, event) => event.data
        }),
        "cleanupPeerServerConnection": (context) => {
            console.log("cleanupPeerServerConnection: ", context.thisPeer)
            if (context.thisPeer) {
                context.thisPeer.destroy()
            }
        },
        "setupPeerAndStartPeerServerEventsHandler": assign((context) => {
            var ourPeerId = localStorage.getItem('thisClientPeerId');
            if (!ourPeerId) {
                ourPeerId = "iROV_Pilot_" + uuidV4().slice(0, 8);
                localStorage.setItem('thisClientPeerId', ourPeerId); // save for future runs
            }
            setClientPeerIdDisplay(ourPeerId);
            const thisPeer = window.thisPeerjsPeer = new Peer(ourPeerId, context.peerServerConfig);
            return {
                thisPeer: thisPeer,
                peerServerEventsHandler: spawn((sendStateChange) => {
                    const openHandler = generateStateChangeFunction(
                        sendStateChange, "SERVER_CONNECTION_ESTABLISHED", thisPeer
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

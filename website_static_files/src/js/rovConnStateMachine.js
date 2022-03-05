import { createMachine, assign, send, interpret } from "xstate";
import { pure } from "xstate/lib/actions";

import { showToastMessage, showROVDisconnectedUI,showROVConnectingUI,showROVConnectedUI, } from "./ui"

import * from "./peerServerConn"

let current, game, squares, pieces, DeserializeBoard, SerializeBoard;

const machineFunctions = {
    actions: {
        showDisconnectedUi: () => { showROVDisconnectedUI() },
        showConnectingUi: () => { showROVConnectingUI() },
        showConnectedUi: () => { showROVConnectedUI() },
        showPeerServerConnectedNotice: () => { showToastMessage("Connected to Peerjs Server!") },
        showPeerServerDisconnectedNotice: () => { showToastMessage("Peerjs Server Disconnected!") },
        resetPeerConnectionTimeout: assign({
            peerConnectionTimeout: (context) => 0,
        }),
        incrementROVDisconnectedTimeout: assign({
            peerConnectionTimeout: (context) => context.peerConnectionTimeout + 1,
        }),
        setVideoStream: assign({
            videoStream: (context,event) => {
                event.data
            },
        }),
        closeDownMediaChannel: () => {
            console.log("closing media chnl");
        },
        closeDownDataChannel: () => {
            console.log("closing data chnl");
        },
    },
    services: {
        initPeerWithPeerjsServer: (context, event) => {
            // return new Promise((resolve, reject) => {
            //   var peerServer = new Peer(null, {
            //     debug: 2,
            //     host: "localhost",
            //     port: 9000,
            //     path: "/peerjs",
            //     secure: false,
            //     config: {
            //       iceServers: [{ url: "stun:stun.l.google.com:19302" }],
            //     },
            //   });
            //   peerServer.on("open", function (id) {
            //     resolve(peerServer);
            //   });
            //   peerServer.on("error", function (err) {
            //     reject(err);
            //   });
            // });
            return (callback) => {
                setTimeout(() => {
                    if (Math.random() > 0.5)
                        callback("PEERJS_SERVER_CONNECTION_ESTABLISHED");
                    else callback("PEERJS_SERVER_FATAL_ERROR");
                }, 5000);
                return () => {
                    console.log("closing down InitPeerWithPeerjsServer");
                };
            };
        },
        reconnectToPeerServer: (context, event) => {
            return (callback) => {
                setTimeout(() => {
                    if (Math.random() > 0.5)
                        callback("PEERJS_SERVER_CONNECTION_ESTABLISHED");
                    else callback("PEERJS_SERVER_CONNECTION_ERROR");
                }, 5000);
            };
        },
        waitForDataChannelDisconnect: (context, event) => {
            return (callback) => {
                setTimeout(() => {
                    if (Math.random() > 0.5) callback("DATACHANNEL_DISCONNECTED");
                    else callback("PEERJS_SERVER_DISCONNECTED");
                }, 5000);
            };
        },
        datachannelTimeoutCountdown: (context, event) => {
            return (callback) => {
                setTimeout(() => {
                    var num = Math.random();
                    if (num < 0.3) callback("DATACHANNEL_ESTABLISHED");
                    else if (num > 0.6) callback("DATACHANNEL_TIMEOUT");
                    else callback("PEERJS_SERVER_DISCONNECTED");
                }, 5000);
            };
        },
        awaitROVConnectBtnPress: (context, event) => {
            return (callback) => {
                setTimeout(() => {
                    callback("CONNECT_BUTTON_PRESSED");
                }, 5000);
            };
        },

        connectToRovPeer: (context, event) => {
            return (callback) => {
                setTimeout(() => {
                    var num = Math.random();
                    if (num < 0.3) callback("DATACHANNEL_ESTABLISHED");
                    else if (num > 0.6) callback("DATA_OR_MEDIA_CHANNEL_ERROR");
                    else callback("PEERJS_SERVER_DISCONNECTED");
                }, 5000);
            };
        },
        awaitMediaCall: (context, event) => {
            return (callback) => {
                setTimeout(() => {
                    var num = Math.random();
                    if (num < 0.3) callback("MEDIACHANNEL_ESTABLISHED");
                    else if (num > 0.6) callback("DATA_OR_MEDIA_CHANNEL_ERROR");
                    else callback("PEERJS_SERVER_DISCONNECTED");
                }, 9000);
            };
        },
    },
    guards: {
        ROVConnectionOpen: (context) => {
            return true;
        },
        PeerDisconnectedTimeout: (context) => {
            return context.peerConnectionTimeout > 5;
        },
        ROVConnectionBroken: (context) => {
            return true;
        },
        peerServerDisconnected: (context) => {
            return true; //context.peerServer.disconnected;
        },
        peerServerFatalError: (context) => {
            return true; //context.peerServer.destroyed;
        },
    },
}

var rovConnectionMachine = createMachine(
    {
        id: "ROVConnection",
        initial: "Not_Connected_To_Peerjs_Server",
        context: {
            peerConnectionTimeout: 0,
            thisPeer: 0,
            dataChannel: 0,
            videoStream: 0,
        },
        states: {
            Not_Connected_To_Peerjs_Server: {
                invoke: {
                    src: "initPeerWithPeerjsServer",
                },
                on: {
                    PEERJS_SERVER_CONNECTION_ESTABLISHED: {
                        target: "#ROVConnection.Connected_To_Peerjs_Server",
                        actions: "showPeerServerConnectedNotice",
                    },
                    PEERJS_SERVER_FATAL_ERROR: {
                        target: "#ROVConnection.Not_Connected_To_Peerjs_Server",
                    },
                },
            },
            Connected_To_Peerjs_Server: {
                type: "parallel",
                states: {
                    DataChannel: {
                        initial: "Not_Open",
                        exit: ["closeDownDataChanel"],
                        states: {
                            Not_Open: {
                                entry: ["showConnectingUi"],
                                invoke: {
                                    src: "connectToRovPeer",
                                    //   id: "connect_to_rov_peer",
                                },
                                on: {
                                    DATACHANNEL_ESTABLISHED: {
                                        target:
                                            "#ROVConnection.Connected_To_Peerjs_Server.DataChannel.Open",
                                    },
                                },
                            },
                            Disconnected: {
                                entry: ["showConnectingUi"],
                                invoke: {
                                    src: "datachannelTimeoutCountdown",
                                },
                                on: {
                                    DATACHANNEL_ESTABLISHED: {
                                        target:
                                            "#ROVConnection.Connected_To_Peerjs_Server.DataChannel.Open",
                                    },
                                    DATACHANNEL_TIMEOUT: {
                                        target:
                                            "#ROVConnection.Connected_To_Peerjs_Server.DataChannel.Not_Open",
                                    },
                                },
                            },
                            Open: {
                                entry: ["showConnectedUi"],
                                invoke: {
                                    src: "waitForDataChannelDisconnect",
                                },
                                // after: {
                                //   500: [
                                //     {
                                //       actions: "resetPeerConnectionTimeout",
                                //       cond: "ROVConnectionOpen",
                                //       target:
                                //         "#ROVConnection.Connected_To_Peerjs_Server.DataChannel.Open",
                                //     },
                                //     {
                                //       actions: "resetPeerConnectionTimeout",
                                //       cond: "PeerDisconnectedTimeout",
                                //       target:
                                //         "#ROVConnection.Connected_To_Peerjs_Server.DataChannel.Not_Open",
                                //     },
                                //     {
                                //       actions: "incrementROVDisconnectedTimeout",
                                //       cond: "ROVConnectionBroken",
                                //       target:
                                //         "#ROVConnection.Connected_To_Peerjs_Server.DataChannel.Open",
                                //     },
                                //   ],
                                // },
                                on: {
                                    DATACHANNEL_DISCONNECTED: {
                                        target:
                                            "#ROVConnection.Connected_To_Peerjs_Server.DataChannel.Disconnected",
                                    },
                                },
                            },
                        },
                        on: {
                            //   DISCONNECT_FROM_ROV: {
                            //     target:
                            //       "#ROVConnection.Connected_To_Peerjs_Server.DataChannel.Closing_Peer_Connection",
                            //   },
                        },
                    },
                    MediaChannel: {
                        initial: "Not_Open",
                        exit: ["closeDownMediaChannel"],
                        states: {
                            Not_Open: {
                                description:
                                    "ROV Should Call the plot, and that should be hooked up to trigger MEDIACHANNEL_OPEN",
                                invoke: {
                                    src: "awaitMediaCall",
                                },
                                on: {
                                    MEDIACHANNEL_ESTABLISHED: {
                                        target:
                                            "#ROVConnection.Connected_To_Peerjs_Server.MediaChannel.Open",
                                    },
                                },
                            },
                            Open: {
                                entry: "displayVideoStream",
                                on: {
                                    //   VIDEO_STREAM_ERROR: {
                                    //     target:
                                    //       "#ROVConnection.Connected_To_Peerjs_Server.MediaChannel.Closing_Media_Connection",
                                    //   },
                                },
                            },
                        },
                    },
                },
                on: {
                    DISCONNECT_FROM_ROV: {
                        target: "#ROVConnection.Awaiting_ROV_Connect_Button_Press",
                    },
                    DATA_OR_MEDIA_CHANNEL_ERROR: [
                        {
                            cond: "peerServerFatalError",
                            target: "#ROVConnection.Not_Connected_To_Peerjs_Server",
                        },
                        {
                            cond: "peerServerDisconnected",
                            target: "#ROVConnection.Reconnecting_to_Peerjs_Server",
                        },
                        {
                            target: "#ROVConnection.Connected_To_Peerjs_Server",
                        },
                    ],
                },
            },
            Reconnecting_to_Peerjs_Server: {
                invoke: {
                    src: "reconnectToPeerServer",
                },
                on: {
                    PEERJS_SERVER_CONNECTION_ESTABLISHED: {
                        target: "#ROVConnection.Connected_To_Peerjs_Server",
                    },
                    PEERJS_SERVER_RECONNECTION_ERROR: {
                        target: "#ROVConnection.Not_Connected_To_Peerjs_Server",
                    },
                },
            },
            Awaiting_ROV_Connect_Button_Press: {
                entry: ["showDisconnectedUi"],
                invoke: {
                    src: "awaitROVConnectBtnPress",
                    //   id: "await_rov_connect_btn_press",
                },
                exit: ["showConnectingUi"],
                on: {
                    CONNECT_BUTTON_PRESSED: {
                        target: "#ROVConnection.Not_Connected_To_Peerjs_Server",
                    },
                },
            },
        },
    }, machineFunctions);


const machineFunctionsMock = {
    actions: {
        showDisconnectedUi: () => { },
        showConnectingUi: () => { },
        showConnectedUi: () => { },
        showPeerServerConnectedNotice: () => { },
        showPeerServerDisconnectedNotice: () => { },
        resetPeerConnectionTimeout: assign({
            peerConnectionTimeout: (context) => 0,
        }),
        incrementROVDisconnectedTimeout: assign({
            peerConnectionTimeout: (context) => context.peerConnectionTimeout + 1,
        }),
        setVideoStream: assign({
            videoStream: (context) => null,
        }),
        closeDownMediaChannel: () => {
            console.log("closing media chnl");
        },
        closeDownDataChannel: () => {
            console.log("closing data chnl");
        },
    },
    services: {
        initPeerWithPeerjsServer: (context, event) => {
            // return new Promise((resolve, reject) => {
            //   var peerServer = new Peer(null, {
            //     debug: 2,
            //     host: "localhost",
            //     port: 9000,
            //     path: "/peerjs",
            //     secure: false,
            //     config: {
            //       iceServers: [{ url: "stun:stun.l.google.com:19302" }],
            //     },
            //   });
            //   peerServer.on("open", function (id) {
            //     resolve(peerServer);
            //   });
            //   peerServer.on("error", function (err) {
            //     reject(err);
            //   });
            // });
            return (callback) => {
                setTimeout(() => {
                    if (Math.random() > 0.5)
                        callback("PEERJS_SERVER_CONNECTION_ESTABLISHED");
                    else callback("PEERJS_SERVER_FATAL_ERROR");
                }, 5000);
                return () => {
                    console.log("closing down InitPeerWithPeerjsServer");
                };
            };
        },
        reconnectToPeerServer: (context, event) => {
            return (callback) => {
                setTimeout(() => {
                    if (Math.random() > 0.5)
                        callback("PEERJS_SERVER_CONNECTION_ESTABLISHED");
                    else callback("PEERJS_SERVER_CONNECTION_ERROR");
                }, 5000);
            };
        },
        waitForDataChannelDisconnect: (context, event) => {
            return (callback) => {
                setTimeout(() => {
                    if (Math.random() > 0.5) callback("DATACHANNEL_DISCONNECTED");
                    else callback("PEERJS_SERVER_DISCONNECTED");
                }, 5000);
            };
        },
        datachannelTimeoutCountdown: (context, event) => {
            return (callback) => {
                setTimeout(() => {
                    var num = Math.random();
                    if (num < 0.3) callback("DATACHANNEL_ESTABLISHED");
                    else if (num > 0.6) callback("DATACHANNEL_TIMEOUT");
                    else callback("PEERJS_SERVER_DISCONNECTED");
                }, 5000);
            };
        },
        awaitROVConnectBtnPress: (context, event) => {
            return (callback) => {
                setTimeout(() => {
                    callback("CONNECT_BUTTON_PRESSED");
                }, 5000);
            };
        },

        connectToRovPeer: (context, event) => {
            return (callback) => {
                setTimeout(() => {
                    var num = Math.random();
                    if (num < 0.3) callback("DATACHANNEL_ESTABLISHED");
                    else if (num > 0.6) callback("DATA_OR_MEDIA_CHANNEL_ERROR");
                    else callback("PEERJS_SERVER_DISCONNECTED");
                }, 5000);
            };
        },
        awaitMediaCall: (context, event) => {
            return (callback) => {
                setTimeout(() => {
                    var num = Math.random();
                    if (num < 0.3) callback("MEDIACHANNEL_ESTABLISHED");
                    else if (num > 0.6) callback("DATA_OR_MEDIA_CHANNEL_ERROR");
                    else callback("PEERJS_SERVER_DISCONNECTED");
                }, 9000);
            };
        },
    },
    guards: {
        ROVConnectionOpen: (context) => {
            return true;
        },
        PeerDisconnectedTimeout: (context) => {
            return context.peerConnectionTimeout > 5;
        },
        ROVConnectionBroken: (context) => {
            return true;
        },
        peerServerDisconnected: (context) => {
            return true; //context.peerServer.disconnected;
        },
        peerServerFatalError: (context) => {
            return true; //context.peerServer.destroyed;
        },
    },
}
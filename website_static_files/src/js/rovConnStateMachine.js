import { createMachine, assign, send, interpret } from "xstate";
import { pure } from "xstate/lib/actions";

let current, game, squares, pieces, DeserializeBoard, SerializeBoard;

var rovConnectionMachine = createMachine({
    id: "ROVConnection",
    initial: "Peerjs_Server_Connection",
    states: {
        Peerjs_Server_Connection: {
            initial: "Not_Connected",
            states: {
                Not_Connected: {
                    invoke: {
                        src: "establishBrowserPeer",
                        id: "establish_browser_peer"
                    },
                    on: {
                        PEER_SERVER_CONNECTION_ESTABLISHED: {
                            target: "#ROVConnection.Peerjs_Server_Connection.Connected_To_Peer_Server"
                        }
                    }
                },
                Connected_To_Peer_Server: {
                    type: "parallel",
                    states: {
                        DataChannel: {
                            initial: "Not_Open",
                            states: {
                                Not_Open: {
                                    invoke: {
                                        src: "connectToRovPeer",
                                        id: "connect_to_rov_peer"
                                    },
                                    on: {
                                        DATACHANNEL_ESTABILISHED: {
                                            target: "#ROVConnection.Peerjs_Server_Connection.Connected_To_Peer_Server.DataChannel.Open"
                                        },
                                        DISCONNECT_FROM_ROV: {
                                            target: "#ROVConnection.Peerjs_Server_Connection.Connected_To_Peer_Server.DataChannel.Closing_Peer_Connection"
                                        }
                                    }
                                },
                                Open: {
                                    after: {
                                        500: [
                                            {
                                                actions: "resetPeerConnectionTimeout",
                                                cond: "ROVConnectionOpen",
                                                target: "#ROVConnection.Peerjs_Server_Connection.Connected_To_Peer_Server.DataChannel.Open"
                                            },
                                            {
                                                actions: "resetPeerConnectionTimeout",
                                                cond: "PeerDisconnectedTimeout",
                                                target: "#ROVConnection.Peerjs_Server_Connection.Connected_To_Peer_Server.DataChannel.Not_Open"
                                            },
                                            {
                                                actions: "incrementROVDisconnectedTimeout",
                                                cond: "ROVConnectionBroken",
                                                target: "#ROVConnection.Peerjs_Server_Connection.Connected_To_Peer_Server.DataChannel.Open"
                                            }
                                        ]
                                    }
                                },
                                Closing_Peer_Connection: {
                                    type: "final"
                                }
                            }
                        },
                        MediaChannel: {
                            initial: "Not_Open",
                            states: {
                                Not_Open: {
                                    description: "ROV Should Call the plot, and that should be hooked up to trigger MEDIACHANNEL_OPEN",
                                    on: {
                                        MEDIACHANNEL_ESTABLISHED: {
                                            target: "#ROVConnection.Peerjs_Server_Connection.Connected_To_Peer_Server.MediaChannel.Open"
                                        }
                                    }
                                },
                                Open: {
                                    entry: "displayVideoStream",
                                    on: {
                                        DISCONNECT_FROM_ROV: {
                                            target: "#ROVConnection.Peerjs_Server_Connection.Connected_To_Peer_Server.MediaChannel.Closing_Media_Connection"
                                        },
                                        VIDEO_STREAM_ERROR: {
                                            target: "#ROVConnection.Peerjs_Server_Connection.Connected_To_Peer_Server.MediaChannel.Closing_Media_Connection"
                                        }
                                    }
                                },
                                Closing_Media_Connection: {
                                    type: "final"
                                }
                            }
                        }
                    },
                    onDone: [
                        {
                            cond: "peerServerDisconnected",
                            target: "#ROVConnection.Peerjs_Server_Connection.Reconnecting_to_Peerjs_Server"
                        },
                        {
                            cond: "peerServerFatalError",
                            target: "#ROVConnection.Peerjs_Server_Connection.Not_Connected"
                        }
                    ]
                },
                Reconnecting_to_Peerjs_Server: {
                    on: {
                        PEER_SERVER_CONNECTION_ESTABLISHED: {
                            target: "#ROVConnection.Peerjs_Server_Connection.Connected_To_Peer_Server"
                        },
                        PEER_SERVER_RECONNECTION_ERROR: {
                            target: "#ROVConnection.Peerjs_Server_Connection.Not_Connected"
                        }
                    }
                }
            }
        }
    }
}, {
    actions: {
        resetPeerConnectionTimeout: assign({
            peerConnectionTimeout: 0
        }),
        incrementROVDisconnectedTimeout: assign({
            peerConnectionTimeout: (ctx) => ctx.peerConnectionTimeout + 1
        }),
        displayVideoStream: assign({
            videoStream: (ctx) => ctx.peerConnection.getRemoteStreams()[0]
        }),

    },
    services: {
        establishBrowserPeer: (context, event) => {
            return new Promise((resolve, reject) => {
                var peerServer = new Peer(null, {
                    debug: 2,
                    host: "localhost",
                    port: 9000,
                    path: "/peerjs",
                    secure: false,
                    config: {
                        'iceServers': [
                            { url: 'stun:stun.l.google.com:19302' }
                        ]
                    }
                });
                peerServer.on('open', function (id) {
                    resolve(peerServer);
                });
                peerServer.on('error', function (err) {
                    reject(err);
                });
            });

        },
        connectToRovPeer: (context, event) => {

        },
    },
    guards: {
        ROVConnectionOpen: (ctx) => {
            return true;
        },
        PeerDisconnectedTimeout: (ctx) => {
            return ctx.peerConnectionTimeout > 5;
        },
        ROVConnectionBroken: (ctx) => {
            return ctx.peerConnectionTimeout > 10;
        },
        peerServerDisconnected: (ctx) => {
            return ctx.peerServer.disconnected;
        },
        peerServerFatalError: (ctx) => {
            return ctx.peerServer.destroyed;
        },
    }
});
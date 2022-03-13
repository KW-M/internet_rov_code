import { createMachine, assign, send, interpret } from "xstate";

import * as consts from "./consts";
import { pure } from "xstate/lib/actions";
import Peer from "peerjs"


import { showToastMessage, showROVDisconnectedUI, showROVConnectingUI, showROVConnectedUI, showLoadingUi, setupConnectBtnClickHandler } from "./ui"

// import * from "./peerServerConn"

let peerServerErrorEventHandler, peerServerOpenEventHandler, rovDataChannelOpenEventHandler, rovDataChannelMessageRecivedHandler, rovMediaChannelRecivedEventHandler, rovVideoStreamRecivedEventHandler;

const machineFunctions = {
    actions: {
        showDisconnectedUi: () => { showROVDisconnectedUI() },
        showConnectingUi: () => { showROVConnectingUI() },
        showConnectedUi: () => { showROVConnectedUI() },
        showPeerServerConnectedNotice: () => { showToastMessage("Connected to Peerjs Server!") },
        showPeerServerDisconnectedNotice: () => { showToastMessage("Peerjs Server Disconnected") },
        showMediaChannelConnectedNotice: () => { showToastMessage("ROV Media Channel Connected!") },
        showGotVideoStreamNotice: () => { showToastMessage("Got ROV Video Stream!") },
        showPeerServerErrorNotice: (context, event) => {
            const err = event.data;
            if (err.type == 'browser-incompatible') {
                alert('Your web browser does not support some WebRTC features, please use a newer / different browser.');
            } else if (err.type == "peer-unavailable" && this.peer.open) {
                showToastMessage("ROV is not yet online!")
            } else if (err.type == "webrtc") {
                showToastMessage("WebRTC protocol error! Reloading website now...")
                setTimeout(window.location.reload, 2000)
            } else {
                showToastMessage("Peerjs Server Error: " + err.type)
                console.dir("Peerjs Server Error: ", err)
            }
        },
        resetPeerConnectionTimeout: assign({
            peerConnectionTimeout: (context) => 0,
        }),
        incrementROVDisconnectedTimeout: assign({
            peerConnectionTimeout: (context) => context.peerConnectionTimeout + 1,
        }),
        setThisPeer: assign({
            thisPeer: (context, event) => {
                return event.data
            },
        }),
        setVideoStream: assign({
            videoStream: (context, event) => {
                const rovVideoStream = event.data
                const videoElem = document.getElementById('livestream');
                videoElem.srcObject = rovVideoStream;  // video.src = URL.createObjectURL(rovVideoStream);
                videoElem.muted = true
                videoElem.autoplay = true
                videoElem.controls = false
                videoElem.play();
                return rovVideoStream
            },
        }),
        setMediaChannel: assign({
            mediaChannel: (context, event) => {
                const mediaChannel = event.data
                return mediaChannel;
            },
        }),
        closeDownMediaChannel: (context) => {
            console.log("closing media chnl");
            context.thisPeer.off("call", rovMediaChannelRecivedEventHandler);
            if (context.mediaChannel) {
                context.mediaChannel.off("stream", rovVideoStreamRecivedEventHandler);
                context.mediaChannel.close();
            }
        },
        closeDownDataChannel: (context) => {
            console.log("closing data chnl");
            // context.thisPeer.off("open", );
            if (context.dataChannel) {
                context.dataChannel.close();
            }
        },
        cleanupPeerServerConnection: assign({
            thisPeer: (context) => {
                if (context.thisPeer) {
                    context.thisPeer.off("open", peerServerOpenEventHandler);
                    context.thisPeer.off("error", peerServerErrorEventHandler);
                    context.thisPeer.destroy()
                }
                return null;
            }
        })
    },
    services: {
        initPeerWithPeerjsServer: (context, event) => {
            return (sendStateChange, onReceive) => {
                const peerServer = new Peer(null, context.peerServerConfig);
                peerServerOpenEventHandler = (ourRealPeerId) => {
                    console.log("PEERJS_SERVER_CONNECTION_ESTABLISHED! our PeerID:", ourRealPeerId, peerServer);
                    sendStateChange({
                        type: "PEERJS_SERVER_CONNECTION_ESTABLISHED",
                        data: peerServer
                    });
                }
                peerServerErrorEventHandler = (err) => {
                    console.log("PEERJS_SERVER_ERRORr:", err, event);

                    sendStateChange({
                        type: "PEERJS_SERVER_ERROR",
                        data: err
                    });
                }
                peerServer.on("open", peerServerOpenEventHandler);
                peerServer.on("error", peerServerErrorEventHandler);
            };
        },
        reconnectToPeerServer: (context, event) => {
            return (sendStateChange, onReceive) => {
                showLoadingUi("Reconnecting to peer server...");
                context.thisPeer.reconnect();
            };
        },
        awaitROVConnectBtnPress: (context, event) => {
            return (sendStateChange, onReceive) => {
                setupConnectBtnClickHandler(() => {
                    sendStateChange("CONNECT_BUTTON_PRESSED");
                })
            };
        },
        connectToRovPeer: (context, event) => {
            return (sendStateChange, onReceive) => {
                var rovPeerId = consts.rovPeerIdBase + String(context.rovPeerIdEndNumber)
                const rovDataConnection = context.thisPeer.connect(rovPeerId, {
                    reliable: true,
                    serialization: 'none',
                });

                rovDataChannelOpenEventHandler = () => {
                    rovDataChannelMessageRecivedHandler = (data) => {
                        data = decoder.decode(data);
                        console.log("Got DC Mesg: ", data);
                        document.body.appendChild(document.createTextNode(String(data)));
                    }
                    rovDataConnection.on('data', rovDataChannelMessageRecivedHandler)
                    sendStateChange("DATACHANNEL_ESTABLISHED");
                }
                rovDataConnection.on("open", rovDataChannelOpenEventHandler)

                rovDataConnection.on("error", (err) => {
                    sendStateChange({ type: "DATA_OR_MEDIA_CHANNEL_ERROR", data: err });
                })
            };
        },
        awaitMediaCall: (context, event) => {
            return (sendStateChange, onReceive) => {
                console.log("Awaiting media call from ROV...");
                rovMediaChannelRecivedEventHandler = (rovMediaConnection) => {
                    console.info('Got media call from peer: ' + rovMediaConnection.peer)
                    rovMediaConnection.answer(null, {
                        // sdpTransform: function (sdp) {
                        //     console.log('answer sdp: ', sdp);
                        //     return sdp;
                        // }
                    });
                    sendStateChange({ type: "MEDIA_CHANNEL_ESTABLISHED", data: rovMediaConnection });
                }
                context.thisPeer.on('call', rovMediaChannelRecivedEventHandler);

                const timeoutId = setTimeout(() => {
                    sendStateChange({ type: "DATA_OR_MEDIA_CHANNEL_ERROR", data: { type: "timeout", error: "Timeout waiting for video stream" } });
                }, 10000);
                return () => {
                    clearTimeout(timeoutId);
                }
            };
        },
        awaitVideoStream: (context, event) => {
            return (sendStateChange, onReceive) => {
                console.log("Awaiting video stream from ROV...");
                rovVideoStreamRecivedEventHandler = (rovStream) => {
                    console.info('Got livestream!');
                    sendStateChange({ type: "VIDEO_STREAM_READY", data: remoteStream });
                }
                context.mediaChannel.on('stream', rovVideoStreamRecivedEventHandler);

                const timeoutId = setTimeout(() => {
                    sendStateChange({ type: "DATA_OR_MEDIA_CHANNEL_ERROR", data: { type: "timeout", error: "Timeout waiting for video stream" } });
                }, 10000);
                return () => {
                    clearTimeout(timeoutId);
                }
            };
        },
        awaitDataChannelDisconnect: (context, event) => {
            return (sendStateChange, onReceive) => {
                // setTimeout(() => {
                //     if (Math.random() > 0.5) sendStateChange("DATACHANNEL_DISCONNECTED");
                //     else sendStateChange("PEERJS_SERVER_DISCONNECTED");
                // }, 5000);
            };
        },
        datachannelTimeoutCountdown: (context, event) => {
            return (sendStateChange, onReceive) => {
                // setTimeout(() => {
                //     var num = Math.random();
                //     if (num < 0.3) callback("DATACHANNEL_ESTABLISHED");
                //     else if (num > 0.6) callback("DATACHANNEL_TIMEOUT");
                //     else callback("PEERJS_SERVER_DISCONNECTED");
                // }, 5000);
            };
        },
    },
    guards: {
        ROVConnectionOpen: (context) => {
            return context.thisPeer && context.thisPeer.open;
        },
        PeerDisconnectedTimeout: (context) => {
            return context.peerConnectionTimeout > 5;
        },
        ROVConnectionBroken: (context) => {
            return true;
        },
        peerServerDisconnected: (context) => {
            return context.thisPeer.disconnected;
        },
        peerServerFatalError: (context, event) => {
            const err = event.data;
            console.log(event, context)

            return err.type == 'browser-incompatible' || err.type == "webrtc" || context.thisPeer.destroyed;
        },
        peerServerRecoverableError: (context) => { }
    },
}

export const runRovConnectionMachine = (siteInitMachineContext) => {
    // console.log(siteInitMachineContext) .rovIpAddr .peerServerConfig
    // const rovIp = siteInitMachineContext.rovIpAddr;
    const peerServerConfig = siteInitMachineContext.peerServerConfig;

    const rovConnectionMachine =
        /** @xstate-layout N4IgpgJg5mDOIC5QCUDyA1AwgewHa7AGMAXASzwDoA5bYgfR3yOMjoBVs6AFMMAJwBWsOgGV+AN34BiLgFFZyAFIjRC9AoaoqVWZjYBJLXVki2AQQBCAGX0iAErIAiiUAAdssUmTwuQAD0QAdgA2QIoATmDwwIBWAA4YgGYABji4gBZEgBoQAE9EdMD0inTCgEY0hIAmQMjIgF96nLQsPAISclxqWgY25lYObl5BYTE+ST4ZeSUVETUNADEzcytjZDRkX3dPb1xfAIRA5OCI6LjkstiK2pz8hAqqkuTE6JTE4Jjgsqr0xuaMRjtXYUQH9CDsTg8fhCUQSfgURwAQ2IiMwAAtEUwADbdeioVxgXBSRzLMyYOxmbSyVYmczWWwOZxIEDbLydfaICopChVOJlYLJcJnSLBW6IGLpR7BYKJQJlRL8splcKSv4gFqgjqUTUscGDKEjWHjeFIlHozEEHGOUiwQh9EiQYmk8mUnQ00yWGz2JxbDxsnzMg5ldLBigffkxC7RdIqwJihAh5IUS4hlXJVMK9LBNUa+3AnUDSHDGFjCYI5GojHYhE2u1MB0QJ3mF1U1YGACyslQAFU2L6duzA5yQ8Vwx8o0VY-GJVKZXKFV9laqmuqAXnOiC84WhtDRnC+OWzVXLRR8YSm2SKa26I5bJgtDo9D7mazdhz7nFubz+YLhdL47yjxpFUZSCiBMRVOEVQxDma71vmW56kWu5GmW7aQKQlYWmAOI0HiBJEp2t6Xq61LGB69Lekybh+m+Q73OkFwUIkVQXMkgRVLyRSFPGgSysmHHQVU7ygcJiSwa08EbgWSE7oapbSLeIj3lSeh0AsaDtnQLT9v6ez0RB8bfPyEQxjGkGQc82YrrmUnaohEJySW+4XnQqDIHQRH6GYDBXm6awbLpdGgAcIRhHUsQJCkaSZEZUHJqBsoxIqcR8VU1n-JJQIbsgRDrrgUB0MQyHyS5cgKMoqjIOoHkqY+BhGLSnoMs+NEDgGIWcvFtSXDKKSfMEjGinkiChHEpnKlEEqZOEwYSTqOV5VJBVFSVznGpM5UzFVNXqaSNLrO5QWDp19zdbNISJP10pDQBaQUPE5zJNBMoZJ84k2XB2WUGYADuiJsitLS9PBdAWAArsQxW4NwfBwLAUh1bobBg72bBGFwyAmHM1EsrRJ3+KNAoRKEU2JMlkQVPGg0UHycTpYE9OcR8wRVI0K64NgEBwL4tnfV0eEg0C24GutEzHR1hMIBBiQUGFEHPG98rhABkQPfTISfOEnxxA0n1Zcw0kOfqxZ7hth5YdWgtnvpbV6e+-Iqsm4TnOEv5HCx2QjdL-FZqzjNxMECRHDB+sLfZ8Ei6bqEmhW5rVtatqIRLttS98IEUFZzyZBBIT06rjyXCqiSlPTKQXPN64R8Lsmi2bZampbJ42yn74gZBtOFPE6du7K8aMWEhShDE0bhCkjOV3ZXQyY5dcxwejfx5arf0Uq0SZ+82fkzUQdVEZI-MTUzzxLUV18qHmXh9PxtrfX8LoRAmFLzhuJuQRK+nenZQbwKJfb3ne9vYcROJ+CCMQJRfEemUSe-NNyR1rtHBSB4H5P2PC-FuL58aSyDFEb+kFGLBkCLUF26ReKMR5FERIaQhTfGSmzMOVdr7wNnog-cFAUFNxwh-NOyowhZz-rnXe1Nng8ielBdiSUx4wMNtXMELCUJIO4UGS4st+E5x3vnb2gdmIxEZtxTigpkifGkVqLouU6zZRWsVJyd8+BKIKIAu4kFwglH5HyJURi3oJBMcCP6AMyBAwwELZgYNIbQ1hvDexCA3gRAVC8MyEpIwxCMmBTOY8Qy63lHxD4PiCavgJkGOI8YAC040yiRl1u8EuLtJr0MaEAA */
        createMachine(
            {
                context: {
                    peerServerConfig: peerServerConfig,
                    peerConnectionTimeout: 0,
                    rovPeerIdEndNumber: 0,
                    thisPeer: null,
                    dataChannel: null,
                    mediaChannel: null,
                    videoStream: null,
                },
                id: "ROVConnection",
                initial: "Not_Connected_To_Peerjs_Server",
                states: {
                    Not_Connected_To_Peerjs_Server: {
                        invoke: {
                            src: "initPeerWithPeerjsServer",
                            id: "initPeerWithPeerjsServer",
                        },
                        on: {
                            PEERJS_SERVER_CONNECTION_ESTABLISHED: {
                                actions: ["setThisPeer", "showPeerServerConnectedNotice"],
                                target: "#ROVConnection.Connected_To_Peerjs_Server",
                            },
                            PEERJS_SERVER_ERROR: [{
                                cond: "peerServerFatalError",
                                target: "#ROVConnection.Awaiting_ROV_Connect_Button_Press",
                                actions: ["showPeerServerErrorNotice"]
                            }, {
                                    target: "#ROVConnection.Not_Connected_To_Peerjs_Server",
                                    actions: ["showPeerServerErrorNotice"]
                                }],
                        },
                    },
                    Connected_To_Peerjs_Server: {
                        type: "parallel",
                        states: {
                            DataChannel: {
                                exit: "closeDownDataChannel",
                                initial: "Not_Open",
                                states: {
                                    Not_Open: {
                                        entry: "showConnectingUi",
                                        invoke: {
                                            src: "connectToRovPeer",
                                        },
                                        on: {
                                            DATACHANNEL_ESTABLISHED: {
                                                target:
                                                    "#ROVConnection.Connected_To_Peerjs_Server.DataChannel.Open",
                                            },
                                        },
                                    },
                                    Disconnected: {
                                        entry: "showConnectingUi",
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
                                                actions: ["closeDownDataChannel"],
                                            },
                                        },
                                    },
                                    Open: {
                                        entry: "showConnectedUi",
                                        invoke: {
                                            src: "awaitDataChannelDisconnect",
                                        },
                                        on: {
                                            DATACHANNEL_DISCONNECTED: {
                                                target:
                                                    "#ROVConnection.Connected_To_Peerjs_Server.DataChannel.Disconnected",
                                            },
                                        },
                                    },
                                },
                            },
                            MediaChannel: {
                                exit: "closeDownMediaChannel",
                                initial: "Not_Open",
                                states: {
                                    Not_Open: {
                                        description:
                                            "ROV Should Call the plot, and that should be hooked up to trigger MEDIACHANNEL_ESTABLISHED",
                                        invoke: {
                                            src: "awaitMediaCall",
                                        },
                                        on: {
                                            MEDIACHANNEL_ESTABLISHED: {
                                                target:
                                                    "#ROVConnection.Connected_To_Peerjs_Server.MediaChannel.Media_Channel_Connected",
                                                actions: ["setMediaChannel", "showMediaChannelConnectedNotice"],
                                            },
                                        },
                                    },
                                    Media_Channel_Connected: {
                                        invoke: {
                                            src: "awaitVideoStream",
                                            id: "awaitVideoStream",
                                        },
                                        on: {
                                            VIDEO_STREAM_READY: {
                                                target:
                                                    "#ROVConnection.Connected_To_Peerjs_Server.MediaChannel.Open",
                                                actions: ["setVideoStream", "showGotVideoStreamNotice"],
                                            },
                                        },
                                    },
                                    Open: {},
                                },
                            },
                        },
                        on: {
                            DISCONNECT_FROM_ROV: {
                                target: "#ROVConnection.Awaiting_ROV_Connect_Button_Press",
                            },
                            PEERJS_SERVER_ERROR: [{
                                cond: "peerServerFatalError",
                                target: "#ROVConnection.Not_Connected_To_Peerjs_Server",
                                actions: ["showPeerServerDisconnectedNotice"]
                            },
                            {
                                cond: "peerServerDisconnected",
                                target: "#ROVConnection.Reconnecting_to_Peerjs_Server",
                                actions: ["showPeerServerDisconnectedNotice"]
                            },
                            {
                                target: "#ROVConnection.Connected_To_Peerjs_Server",
                            }],
                            DATA_OR_MEDIA_CHANNEL_ERROR: [
                                {
                                    cond: "peerServerFatalError",
                                    target: "#ROVConnection.Not_Connected_To_Peerjs_Server",
                                },
                                {
                                    cond: "peerServerDisconnected",
                                    target: "#ROVConnection.Reconnecting_to_Peerjs_Server",
                                    actions: ["showPeerServerDisconnectedNotice"]
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
                            PEERJS_SERVER_ERROR: [{
                                cond: "peerServerFatalError",
                                target: "#ROVConnection.Awaiting_ROV_Connect_Button_Press",
                                actions: ["showPeerServerErrorNotice"]
                            }, {
                                    target: "#ROVConnection.Not_Connected_To_Peerjs_Server",
                                    actions: ["showPeerServerErrorNotice"]
                                }],
                        },
                    },
                    Awaiting_ROV_Connect_Button_Press: {
                        entry: "showDisconnectedUi",
                        exit: "showConnectingUi",
                        invoke: {
                            src: "awaitROVConnectBtnPress",
                        },
                        on: {
                            CONNECT_BUTTON_PRESSED: {
                                target: "#ROVConnection.Not_Connected_To_Peerjs_Server",
                            },
                        },
                    },
                },
            }, machineFunctions);

    const rovConnectionService = interpret(rovConnectionMachine, { devTools: true })
    rovConnectionService.start();
}

// const machineFunctionsMock = {
//     actions: {
//         showDisconnectedUi: () => { },
//         showConnectingUi: () => { },
//         showConnectedUi: () => { },
//         showPeerServerConnectedNotice: () => { },
//         showPeerServerDisconnectedNotice: () => { },
//         resetPeerConnectionTimeout: assign({
//             peerConnectionTimeout: (context) => 0,
//         }),
//         incrementROVDisconnectedTimeout: assign({
//             peerConnectionTimeout: (context) => context.peerConnectionTimeout + 1,
//         }),
//         setVideoStream: assign({
//             videoStream: (context) => null,
//         }),
//         closeDownMediaChannel: () => {
//             console.log("closing media chnl");
//         },
//         closeDownDataChannel: () => {
//             console.log("closing data chnl");
//         },
//     },
//     services: {
//         initPeerWithPeerjsServer: (context, event) => {
//             // return new Promise((resolve, reject) => {
//             //   var peerServer = new Peer(null, {
//             //     debug: 2,
//             //     host: "localhost",
//             //     port: 9000,
//             //     path: "/peerjs",
//             //     secure: false,
//             //     config: {
//             //       iceServers: [{ url: "stun:stun.l.google.com:19302" }],
//             //     },
//             //   });
//             //   peerServer.on("open", function (id) {
//             //     resolve(peerServer);
//             //   });
//             //   peerServer.on("error", function (err) {
//             //     reject(err);
//             //   });
//             // });
//             return (sendStateChange, onReceive) => {
//                 setTimeout(() => {
//                     if (Math.random() > 0.5)
//                         callback("PEERJS_SERVER_CONNECTION_ESTABLISHED");
//                     else callback("PEERJS_SERVER_ERROR");
//                 }, 5000);
//                 return () => {
//                     console.log("closing down InitPeerWithPeerjsServer");
//                 };
//             };
//         },
//         reconnectToPeerServer: (context, event) => {
//             return (sendStateChange, onReceive) => {
//                 setTimeout(() => {
//                     if (Math.random() > 0.5)
//                         callback("PEERJS_SERVER_CONNECTION_ESTABLISHED");
//                     else callback("PEERJS_SERVER_CONNECTION_ERROR");
//                 }, 5000);
//             };
//         },
//         awaitDataChannelDisconnect: (context, event) => {
//             return (sendStateChange, onReceive) => {
//                 setTimeout(() => {
//                     if (Math.random() > 0.5) callback("DATACHANNEL_DISCONNECTED");
//                     else callback("PEERJS_SERVER_DISCONNECTED");
//                 }, 5000);
//             };
//         },
//         datachannelTimeoutCountdown: (context, event) => {
//             return (sendStateChange, onReceive) => {
//                 setTimeout(() => {
//                     var num = Math.random();
//                     if (num < 0.3) callback("DATACHANNEL_ESTABLISHED");
//                     else if (num > 0.6) callback("DATACHANNEL_TIMEOUT");
//                     else callback("PEERJS_SERVER_DISCONNECTED");
//                 }, 5000);
//             };
//         },
//         awaitROVConnectBtnPress: (context, event) => {
//             return (sendStateChange, onReceive) => {
//                 setTimeout(() => {
//                     callback("CONNECT_BUTTON_PRESSED");
//                 }, 5000);
//             };
//         },

//         connectToRovPeer: (context, event) => {
//             return (sendStateChange, onReceive) => {
//                 setTimeout(() => {
//                     var num = Math.random();
//                     if (num < 0.3) callback("DATACHANNEL_ESTABLISHED");
//                     else if (num > 0.6) callback("DATA_OR_MEDIA_CHANNEL_ERROR");
//                     else callback("PEERJS_SERVER_DISCONNECTED");
//                 }, 5000);
//             };
//         },
//         awaitMediaCall: (context, event) => {
//             return (sendStateChange, onReceive) => {
//                 setTimeout(() => {
//                     var num = Math.random();
//                     if (num < 0.3) callback("MEDIACHANNEL_ESTABLISHED");
//                     else if (num > 0.6) callback("DATA_OR_MEDIA_CHANNEL_ERROR");
//                     else callback("PEERJS_SERVER_DISCONNECTED");
//                 }, 9000);
//             };
//         },
//     },
//     guards: {
//         ROVConnectionOpen: (context) => {
//             return true;
//         },
//         PeerDisconnectedTimeout: (context) => {
//             return context.peerConnectionTimeout > 5;
//         },
//         ROVConnectionBroken: (context) => {
//             return true;
//         },
//         peerServerDisconnected: (context) => {
//             return true; //context.peerServer.disconnected;
//         },
//         peerServerFatalError: (context) => {
//             return true; //context.peerServer.destroyed;
//         },
//     },
// }

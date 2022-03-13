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
        /** @xstate-layout N4IgpgJg5mDOIC5QCUDyA1AwgewHa7AGMAXASzwDpkBXfU3KCgBTDACcB9AZXYDd2OOfETKUActmKC8BEpA4AVbBxbsAVrG592AYiYBRfcgBSXbkfRHBqMWP2YFASRsd9XBQEEAQgBlHXAAl9ABFEUAAHbFhSUVwwkAAPRABWAHYATgoADgAWAEY85IAGVOS8gCYANmSAZgAaEABPFJya7KLK1KzK9PLk-KKagF8hhrQsGRFyXCpaXHpGVU4eNn5OIVlYigkpDZF5JRVWNg0tVd0DI1NXZDRkeMjo2PikhFSeimr0nN6anPKcl0cg1mghvskKDV0qk8qkcvl4cksiMxhg9iRprM6AxmMczmtpMIMZR0cQDsolqcVms9IYTGYjHcHlEYtMXogCq1IT1+sloZUeqUQYhUnCKMUahVRXCclluiiQONSZiaNjFnjqQJlZRkERJhiGBxiBTjlTtGxaVczFwLFZMDY7A5nGJXO5vH5AiFmU82UhEhzBkUKKlynkcpUikVyqkauV0sKEP1KhRYQU0qH0lk8oMFUr9VtVfMcUt8Vr8yq9USyIbjUd1JpNRbLvSbky-Y9WXh2Qgw1k2uUiuGoX1JT16k0RRVsjkyjUOjUasVysjRoq0eWdXMFlRsLw6+sNzMdoTNuT92bzk26dcbchLMhrLZ7E4XG5PL5-EFQu2Wc8-a8ZyyCgM0BLp3kGQpx1BApKjaUosj6bNyjjEpKlzdcqxVLccWQXd9xPKZKA8WAAGsFhUUgABtJCNClSEIEiOAAMTYbAAFsOFQXBKPoMAOFw3hYB0cYOEcMRgn0AANFRHEwABpL0fx9Lt-w5PJ0iDfIYUKCoZ1ghMCklT5lxM-5vmHdCJkwzc1R3PcS21I8aNJM8BOEjBH0dF8XTfd1P0UiJf19UBXlSIogMqLJ+gXDSF1FAzJRyChATDGN4QKGFLMcrEi0YAT8Oy48XIgRRlDcgBZABVHwnCYHx9H4jAzBsPw7G9Ts4lUntYSS0VKjyLIQ3UkoAQMgc8godIpWQzosiKdTyiyw8cu3fKHOW4rSv43cKGCABDYg9swAALPbhEo3aDr2wRTvOjhglIWBCHzSAdGCDxPEwAIPCfHxXXfD0v3av8QpaVIU2SYo00HcNKmBCceyi8pjKKPkYRhMpwqW6yZkLVa8PWnGKE2w4BMuw6TrOggLv2w6bqpsBKPux7nqrV73s+77fsURxyv0VBKoUYHgv9BAsmhSE5RyebUdDWCoI5aWg2XOK4eSZduhXVErM2LDbLWvFspJsqdtpo7bup8nrspu7UHCMBcDej6PC+n67D+4J-HtJ8HGFlTQcTcNp0Gf5+uKJEsgMqbkwHcMpsXPlo+x3WbNyuyCo2l6StJnbysgUhzYZi7jzth2dD5z2Xa593-r8z1v0C5TOoD9XMiKKa9MqPpw1SBM5YhdT+vSTMKnSP5kmTwjcewvKCcNzO2ezk3eAoPOIALm3LbXgv6bu4qdHQRwJNQbgFGQfQPHK-iL+CABNP3m9FioPjC0VM2KczkkqPu8mqFN0iHiPOM49J7EmnvrOeZYibG22rwS0LYRLey8s6VsqB7hKQ6t2bMsZxSdEGFLdI0Ve4IzyLGIMhQIySnmr-coC5QEFhnunQmKcZgwLckg58IRFAnwAOpoDEAAcUaugB+WCZxtBKEiAUi4-j9W-iQ2MbRIqyOlgUKoyF6F61yjoHh+gvDIAUJgZizs-qMjQaIrq6lijZGKIMWo-RAThgTNUcGNQ5TdBqKKcRpDNGpwWPA64Ch9DlSYGgjwyBb6oPQY3TBliO7AQyu8aWCIYxjVDJ8P43wERZkjKkXxMwPAAHc9qskNIg-MHAvDUGIMaXAKg2BwCEhwhwlSFAuiYOfLgXALEB3Up44Cg525uNoV-eMJD+hASjBpDxoZaEZBGKuXA2AIBwHiHmImeNiwanNARMB2xnJZy2pSBs5oelP0XCmQcsFcj5HVrKeRoIkzikhtLAUAJIoAPyStLZAhGy7K2DA45pY2BnNeH2JKCFSgLllANd4DzJyZEzK0cWfYPF-C+Zs9UvydnZV1KzXWNYTT1mBaCxWcoKDULnGGSCgwEy1GTDOJFyFkLqTHhixhJY-nZQCGdCAPFDT6DYKxEFGCQZPwGJCLoACKHQnCgrMWFzCFvIKKQ2Uop2W2U5Tiw8pLuoTWzEOG5hQATdATEOZKGku4UN-pmPJq51ksO+bPey88iZFUOYcIFjZdWj2SmkcWg5+iENfgZX+bQajVGoaixceQNVpwNlAx1xEyKGiYFRGitY00MWYqxDiXF+V8QEvAUVItXhhmQtkBCy5pUaWZaG+EwZoxIRGpFKocb8YusTVPfZuwPXL11XKCEc4oSZlyKKSM8rOTK3Dp4ucod1btpwpAg80C+2wKtpvRmVtd7U2Zk9LOA6oTAW6F3UdmZoxjOgjcxtkobW-FkYu51GdV2Ly2mTM2m6aZXR3YzTi9tH4djFa8caFKNYAgBHOCM+kSFRSDCGPkodezqzQvajCjrMVMNdY6thpsrqfp9aKUDcpwOtA6POAyQ0UyRXCsGruy4UPa1xYwhNK7sNrrJtvQu50e1-odj6v+hlqiqo6BGNIP8yjJQQiHLoC4syPsw12vZOGV6cc-avfO1sLa-uKgOkM4pZSjLmp4gaP85qQgqOpf4MotZrh1t2jDLH-mYmU+p9eXHLboFICs5QXBiANL2nm-9PqJkWsBPNTxPxFzlD7gOCEEYfi9FaA4r+8nHNG3Y7nDT+GS3+3Ffq0hQm-gidRsQ0EA5oyTSqLkOctDSHDFQ3ZvZDnl1OZJBl3gPrYQpgK7OV5onSscjRp8UhHQ5bzWQjkVLLXHK6rHt1iNvXitiZIajCKfJBxzjHj3O1jHlqYt1R8QTi2BQlYTFCIM6swxwyhG-XIXyeFgAAEZsGIIQZiV0maCuFT63oyZOhQlIZrVov8zWDUmgKOUs0uhhi+UUkp1YoDCP+ZU6ptT6mNJ9YNTIkNOgwllNCPo8KexkODNDAn0JWg7dszNnLj8AIDx68Jk7y3QSSnBpDGa-VATdD6BPBZQA */
        createMachine({
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
            initial: "Running",
            states: {
                Running: {
                    type: "parallel",
                    states: {
                        Peer_Server_Connection: {
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
                                            target:
                                                "#ROVConnection.Running.Peer_Server_Connection.Connected_To_Peerjs_Server",
                                        },
                                        PEERJS_ERROR: {
                                            target:
                                                "#ROVConnection.Running.Peer_Server_Connection.Handling_Error",
                                        },
                                    },
                                },
                                Connected_To_Peerjs_Server: {
                                    on: {
                                        PEERJS_ERROR: {
                                            target:
                                                "#ROVConnection.Running.Peer_Server_Connection.Handling_Error",
                                        },
                                    },
                                },
                                Reconnecting_to_Peerjs_Server: {
                                    invoke: {
                                        src: "reconnectToPeerServer",
                                    },
                                    on: {
                                        PEERJS_SERVER_CONNECTION_ESTABLISHED: {
                                            target:
                                                "#ROVConnection.Running.Peer_Server_Connection.Connected_To_Peerjs_Server",
                                        },
                                        PEERJS_ERROR: {
                                            target:
                                                "#ROVConnection.Running.Peer_Server_Connection.Handling_Error",
                                        },
                                    },
                                },
                                Handling_Error: {
                                    entry: "showPeerServerErrorNotice",
                                    invoke: {
                                        src: "handlePeerJsServerError",
                                    },
                                },
                            },
                        },
                        Rov_Peer_Connection: {
                            initial: "Not_Connected_To_Peerjs_Server",
                            states: {
                                Not_Connected_To_Peerjs_Server: {
                                    on: {
                                        PEERJS_SERVER_CONNECTION_ESTABLISHED: {
                                            target:
                                                "#ROVConnection.Running.Rov_Peer_Connection.Not_Connected_To_Rov",
                                        },
                                    },
                                },
                                Asking_Pilot_to_Pick_From_Online_Rovs: {
                                    invoke: {
                                        src: "connectToRovPeer",
                                    },
                                    on: {
                                        ROV_INDEX_PICKED: {
                                            target:
                                                "#ROVConnection.Running.Rov_Peer_Connection.Not_Connected_To_Rov",
                                        },
                                    },
                                },
                                Not_Connected_To_Rov: {
                                    invoke: {
                                        src: "connectToRovPeer",
                                    },
                                    on: {
                                        ROV_CONNECTION_ESTABLISHED: {
                                            target:
                                                "#ROVConnection.Running.Rov_Peer_Connection.Connected_To_Rov",
                                        },
                                        MULTIPLE_ROVS_ONLINE: {
                                            target:
                                                "#ROVConnection.Running.Rov_Peer_Connection.Asking_Pilot_to_Pick_From_Online_Rovs",
                                        },
                                    },
                                },
                                Connected_To_Rov: {
                                    entry: "showRovConnectedNotice",
                                    type: "parallel",
                                    states: {
                                        DataChannel: {
                                            exit: "closeDownDataChannel",
                                            initial: "Data_Channel_Open",
                                            states: {
                                                Data_Channel_Disconnected: {
                                                    entry: "showConnectingUi",
                                                    invoke: {
                                                        src: "datachannelTimeoutCountdown",
                                                    },
                                                    on: {
                                                        DATACHANNEL_ESTABLISHED: {
                                                            target:
                                                                "#ROVConnection.Running.Rov_Peer_Connection.Connected_To_Rov.DataChannel.Data_Channel_Open",
                                                        },
                                                        DATACHANNEL_TIMEOUT: {
                                                            target:
                                                                "#ROVConnection.Running.Rov_Peer_Connection.Not_Connected_To_Rov",
                                                        },
                                                    },
                                                },
                                                Data_Channel_Open: {
                                                    entry: "showConnectedUi",
                                                    invoke: {
                                                        src: "awaitDataChannelDisconnect",
                                                    },
                                                    on: {
                                                        DATACHANNEL_DISCONNECT: {
                                                            target:
                                                                "#ROVConnection.Running.Rov_Peer_Connection.Connected_To_Rov.DataChannel.Data_Channel_Disconnected",
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
                                                        'ROV Will "Video Call" this plot, and that is hooked up to trigger the MEDIACHANNEL_ESTABLISHED transition',
                                                    invoke: {
                                                        src: "awaitMediaCall",
                                                        id: "awaitMediaCall",
                                                    },
                                                    on: {
                                                        MEDIACHANNEL_ESTABLISHED: {
                                                            actions: [
                                                                "setMediaChannel",
                                                                "showMediaChannelConnectedNotice",
                                                            ],
                                                            target:
                                                                "#ROVConnection.Running.Rov_Peer_Connection.Connected_To_Rov.MediaChannel.Media_Channel_Connected",
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
                                                            actions: [
                                                                "setVideoStream",
                                                                "showGotVideoStreamNotice",
                                                            ],
                                                            target:
                                                                "#ROVConnection.Running.Rov_Peer_Connection.Connected_To_Rov.MediaChannel.Video_Stream_Open",
                                                        },
                                                    },
                                                },
                                                Video_Stream_Open: {},
                                            },
                                        },
                                    },
                                    on: {
                                        PEERJS_ROV_CONNECTION_ERROR: {
                                            target:
                                                "#ROVConnection.Running.Rov_Peer_Connection.Not_Connected_To_Rov",
                                        },
                                        CONNECTED_TO_WRONG_ROV: {
                                            target:
                                                "#ROVConnection.Running.Rov_Peer_Connection.Asking_Pilot_to_Pick_From_Online_Rovs",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    on: {
                        WEBRTC_FATAL_ERROR: {
                            target: "#ROVConnection.Webrtc_Fatal_Error",
                        },
                        PEERJS_TEMPORARY_ERROR: {
                            target: "#ROVConnection.Awaiting_ROV_Connect_Button_Press",
                        },
                    },
                },
                Webrtc_Fatal_Error: {
                    entry: "showDisconnectedUi",
                    type: "final",
                },
                Awaiting_ROV_Connect_Button_Press: {
                    entry: "showDisconnectedUi",
                    exit: "showConnectingUi",
                    invoke: {
                        src: "awaitROVConnectBtnPress",
                    },
        on: {
            CONNECT_BTN_PRESS: {
                target: "#ROVConnection.Running",
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

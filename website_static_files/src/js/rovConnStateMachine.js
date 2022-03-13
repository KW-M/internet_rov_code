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
        /** @xstate-layout N4IgpgJg5mDOIC5QCUDyA1AwgewHa7AGMAXASzwDpkBXfU3KCgBTDACcB9AZXYDd2OOfETKUActmKC8BEpA4AVbBxbsAVrG592AYiYBRfcgBSXbkfRHBqMWP2YFASRsd9XBQEEAQgBlHXAAl9ABFEUAAHbFhSUVwwkAAPRABWAAYANgoATmSADgB2ZPSsgBZUtNyAZmSAGhAAT0RirIpU1IBGAuTStoAmXsqAX0G6tCwZEXJcKlpcekZVTh42fk4hWViKCSl1kXklFVY2DS0V3QMjU1dkNGR4yOjY+KSENMycruKyiuq6xoRcslktk2iV2j0Cr0qsNRhhdiQpjM6AxmEdTqtpMIEZR4cR9spFidlqs9IYTGYjLd7lEYlNnoh2p1KhRevlKlkCvlGSUSskSn9EPkoRR0qlciUqllKlzxTCQGNcYiaMiFmjiQJFZRkEQJgiGBxiASjkTtGxSZczFwLFZMDY7A5nGJXO5vH5AiFqY86UhEikMtk8oUvuUxb8Gk1qhQwYU8sl2mCSll0nKFbrNsq5ijFuiNWmlTqsWR9YbDupNOqzRdydcqT6HrS8PTXv6PkGej9auHXlyKFVKiV0iVKr0k+lclkU3C81rZvMqNheKW1tPpttMRt8UuTWdK2SrlbkJZkNZbPYnC43J5fP4gqE6zSnj6Xm8A5926HO-92mL8hQKp10ihLJ+l6ZJJ3GQslVnFFkAXJd10mSgPFgABreYVFIAAbSQDQJUhCBQjgADE2GwABbDhUFwTD6DADhYN4WAdDGDhHDEYJ9AADRURxMAAaQ9e8vUbJ9EDBVIKEqKT+0KSUSl6fkuwU3pMlA6V8nSKT2iBdohhGeUp0gmcVXnRds01VccNxTcGOYjAT3tc8nUvV0b0EiIH29UAXiFX92g07TUnyDTUh5LIBQQAZ8haCpAS03lNOTfTUyM6YMznBj4IsrYrLTGyFx0ABZABVHwnCYHx9HojAzBsPw7E9Bs4lEhBxMk6SSlk9l5MU-4FPHXtKlyVIpUKfIer02EII2KCTMy8yVwoayIEUZQGIoYIAENiE2zAAAtNuETCcqkVBwjAXAdGCDxPEwAIPFPHxnSvN1b0ax9vLEyN2l6DJh2-MVEyqCL2kHYFcjHRM2SC8UfvA7L0pguCFtSpa8pWg51q2nb9sOghjuxzbBAOo6OGCUhYEIdGrpujw7oeuwnpc693TvDzhOaz6EG-UUKGi4cshG0HcnjEHRUyTq2VZQEsileN4cWxHGHmtFsuW1b6IXDbtt2kn8e1nbibxsBMLJimqcLSAadu+7HsURxCv0VBioUd6vN9bmRokj5-LjQpfsAkHeRKKMpXZaKxVFDIFdRpXTKyxb1cxrXCdxo6DaJtP8co87Luum2Gf0J7gn8W1TwcN2RK5nmJM6iH+lSVkyk0sX8gkjJ4wbnkwX6GOZuMzNleR1XE-RjX1sKyBSF143jrXM6LqKkJHDp23Gee1zWcrzmPeSSpveC4bkihCUMl6hkw9aGH0mSIUFKC9o+8QtLoKHsyR9RpO1q1yeIGnrOTYUF-tPI2pNlo6HQI4DiqBuAKGQPoDwhV6IIOCAATW3k2H6PZugJi5GOYKx8QaXzaPkCGt9+hlC5E-bEL85rD1zJ-MeydeDmmrCxMujlHQ1lQHcISTVMFVGBMFaUClj7fAHEHXIvQ+ayxCoyUKGlqHplfvHFG-dphf01iwjhZ4QiKBgQAdTQGIAA4tVdAGCWpMiEWyIUvJ758nSCDaKmQKjlDZLkEWtilGzUHjoAx+gvDIAUJgYitMmY3B4ZY6ujcQ7skqPg-e-U+QRX7MCSoPM75jk0r0R+yVDLqKRH4qsVwFD6EKkwHhHhkCoO4bw9m-CrGgj-ONEW0ppTggKBFKE7Q+YqWqBKeShRSjDH0rgbAEA4DxBSoUuO2YKwIRoSdRZeIMZGjLDmNg0SPbfnyBFYa7cRbimlOkUhWRwQ+IHnOeZpoVmIk0YScspptkvEFu3UCoMxQdCyONCK0MozaXOVFP6-ZLm0MHqiAQCyEYFhmsWdZxwnk7heYgAOLIhQ-O-AUcOEoIrdHSeyU5Uoz59jBUU65apbnZQCIdCANF9T6DYKRLZfCPo7IScyIowFBwJNBjfSoEV8GSQof2bSQ5BZ5KmgjFRNydx3KriAesbKXjAy7EDXsg5+htx+pHCc+TprP3JUjd+DDClrgecaJFqwUWez2V2b8x8WT+U6CpUGulQX6ulXQk1y5UbITQvqJgWEcIliDQRYipEKJUXpXRBi8BWXuxeDfTIGQJVskTEObpvIJLdCkrLcofIkyTQMgapZccVamsNeaph39eA2p+iHHmP096dQ5NpAVSkeS5FaGHfNQJEyaTJeW+hvrCmaKxjrABc8cILx3kqxNDJTli1ChQH67JQYaX7EOMCnrFYqIraOw146U6Tr1oAwmoDs7k0pujet-YJJ5vSKKWWw0fogyKL+YoWDhrBV0uNId+6R3yo0TWrRGcp0Z0vSbHOF0bVchDk+rkqQEn9rFMukOeQVJsn3sOKWAHvUJ0YZbNZYHU5nswvWzN9qpLeyGkUeSxQxQQ3wxCg9wG0bEfHj-KeM907z1zvWpd9rzktBHNKNoxQoR8hYxlIDatQMTx4xB4BmdyMrMgDagoIchyJk6AOfet9z7c1KN2tdEMOiSmPvkGTxrCNjoU9xv+vH9boFIJM5QXBiBsDAJtKNAmE0KpeNpNIkkRYhmQ0M3kRC2QAqfXkLd5zSE2bfnZo9DneBAKU+RyjHavzRSEUNCGbc979l6Ml1RH97OceYfW8EINfq-iGsOWGA5ooKXK2xiymncuIB+aJ1t9iOQ6RKMlm13QIryXBqUDkSZShpAlMWmZhqDFgAAEZsGIIQYiOtTaMuZTa+S3TNISXjEVxLwVgI7qlYtDwAB3TatJ9TsLTBwLw1BiCGlwCobzsB40NOVWJXoEVBbZEY-GIK6RwSgjBfW3IINu1tER0jpH8tRlAA */
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
                            id: "Rov_Peer_Connection",
                            initial: "Not_Connected_To_Peerjs_Server",
                            states: {
                                Not_Connected_To_Peerjs_Server: {
                                    invoke: {
                                        src: "initPeerWithPeerjsServer",
                                        id: "initPeerWithPeerjsServer",
                                    },
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
                                                "#Rov_Peer_Connection.Not_Connected_To_Rov",
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
                                                "#Rov_Peer_Connection.Not_Connected_To_Rov",
                                        },
                                        MULTIPLE_ROVS_ONLINE: {
                                            target:
                                                "#Rov_Peer_Connection.Asking_Pilot_to_Pick_From_Online_Rovs",
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
                                                Not_Open: {
                                                    entry: "showConnectingUi",
                                                    on: {
                                                        DATACHANNEL_ESTABLISHED: {
                                                            target:
                                                                "#ROVConnection.Running.Rov_Peer_Connection.Connected_To_Rov.DataChannel.Data_Channel_Open",
                                                        },
                                                    },
                                                },
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
                                                            actions: "closeDownDataChannel",
                                                            target:
                                                                "#ROVConnection.Running.Rov_Peer_Connection.Connected_To_Rov.DataChannel.Not_Open",
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
                                                        "ROV Should Call the plot, and that should be hooked up to trigger MEDIACHANNEL_ESTABLISHED",
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
                                                "#ROVConnection.Running.Rov_Peer_Connection.Not_Connected_To_Rov",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    on: {
                        WEBRTC_FATAL_ERROR: {
                            target: "#ROVConnection.Running",
                        },
                        PEERJS_TEMPORARY_ERROR: {
                            target: "#ROVConnection.Running",
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

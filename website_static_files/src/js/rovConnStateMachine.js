import { createMachine, assign, send, interpret, sendParent } from "xstate";

import { messageEncoder, messageDecoder } from "./consts";

import * as consts from "./consts";
import { pure } from "xstate/lib/actions";
import Peer from "peerjs"


import { showToastMessage, showROVDisconnectedUI, showROVConnectingUI, showROVConnectedUI, showLoadingUi, setupConnectBtnClickHandler, showToastDialog, hideLoadingUi } from "./ui"

// import * from "./peerServerConn"

const eventHandlerFunctions = {
    // peerServerError: null, peerServerOpen: null, rovDataChannelOpen: null, rovDataChannelMessageRecivedHandler: null, rovMediaChannelRecived: null, rovVideoStreamRecived: null
};

function generateStateChangeFunction(sendStateChange, stateTransition, data, additionalCallback) {
    const func = function (evt) {
        if (additionalCallback) additionalCallback(evt)
        sendStateChange({ type: stateTransition, data: (data || evt) });
    }
    eventHandlerFunctions[stateTransition] = func;
    return func;
}

const machineFunctions = {
    actions: {
        showDisconnectedUi: () => { showROVDisconnectedUI() },
        showConnectingUi: () => { showROVConnectingUI() },
        showRovConnectedUi: () => { showROVConnectedUI() },
        showPeerServerConnectedNotice: () => { showToastMessage("Connected to Peerjs Server!") },
        showPeerServerDisconnectedNotice: () => { showToastMessage("Peerjs Server Disconnected") },
        showMediaChannelConnectedNotice: () => { showToastMessage("ROV Media Channel Connected!") },
        showGotVideoStreamNotice: () => { showToastMessage("Got ROV Video Stream!"); hideLoadingUi() },
        setThisPeer: assign({
            thisPeer: (context, event) => {
                return event.data
            },
        }),
        setDataChannel: assign({
            dataChannel: (context, event) => {
                const dataChannel = event.data
                console.log("setdataChannel", dataChannel)
                return dataChannel;
            },
        }),
        setMediaChannel: assign({
            mediaChannel: (context, event) => {
                const mediaChannel = event.data
                return mediaChannel;
            },
        }),
        setVideoStream: assign({
            videoStream: (context, event) => {
                const rovVideoStream = event.data
                const videoElem = document.getElementById('video-livestream');
                videoElem.srcObject = rovVideoStream;  // video.src = URL.createObjectURL(rovVideoStream);
                videoElem.muted = true
                videoElem.autoplay = true
                videoElem.controls = false
                videoElem.play();
                return rovVideoStream
            },
        }),
        sendMessageToRov: (context, event) => {
            const outgoingMessage = event.data
            const rovDataConnection = context.dataChannel
            if (!rovDataConnection || !rovDataConnection.open || !rovDataConnection.peerConnection.iceConnectionState || rovDataConnection.peerConnection.iceConnectionState != "connected") {
                console.warn("Tried to send message on closed data channel: ", outgoingMessage)
                return;
            }
            console.log("Sending Datachannel Message: ", outgoingMessage);
            const encodedMessage = messageEncoder.encode(outgoingMessage);
            rovDataConnection.send(encodedMessage);
        },
        gotMessageFromRov: sendParent((context, event) => {
            return {
                type: "GOT_MESSAGE_FROM_ROV",
                data: event.data,
            }
        }),
        closeDownMediaChannel: (context) => {
            console.log("closing media chnl");
            const thisPeer = context.thisPeer;
            const mediaChannel = context.mediaChannel;
            if (thisPeer) thisPeer.off("call", eventHandlerFunctions["MEDIA_CHANNEL_ESTABLISHED"]);
            if (mediaChannel) {
                mediaChannel.off("stream", eventHandlerFunctions["VIDEO_STREAM_READY"]);
                mediaChannel.close();
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
                    context.thisPeer.off("open", eventHandlerFunctions["PEERJS_SERVER_CONNECTION_ESTABLISHED"]);
                    context.thisPeer.off("error", eventHandlerFunctions["PEERJS_ERROR"]);
                    context.thisPeer.destroy()
                }
                return null;
            }
        }),
        reloadWebsite: () => {
            setTimeout(() => { window.location.reload() }, 2000)
        }
    },
    services: {
        initPeerWithPeerjsServer: (context, event) => {
            return (sendStateChange, onReceive) => {
                const peerServer = new Peer(null, context.peerServerConfig);
                // peerServerOpenEventHandler = (ourRealPeerId) => {
                //     console.log("PEERJS_SERVER_CONNECTION_ESTABLISHED! our PeerID:", ourRealPeerId, peerServer);
                //     sendStateChange({
                //         type: "PEERJS_SERVER_CONNECTION_ESTABLISHED",
                //         data: peerServer
                //     });
                // }
                // peerServerErrorEventHandler = (err) => {
                //     console.log("PEERJS_SERVER_ERRORr:", err, event);

                //     sendStateChange({
                //         type: "PEERJS_ERROR",
                //         data: { source: "peer_server_error", error: err }
                //     });
                // }
                const openHandler = generateStateChangeFunction(
                    sendStateChange, "PEERJS_SERVER_CONNECTION_ESTABLISHED", peerServer
                )
                const errHandler = generateStateChangeFunction(
                    sendStateChange, "PEERJS_ERROR", null, console.log
                )
                peerServer.on("open", openHandler);
                peerServer.on("error", errHandler);
                return () => {
                    peerServer.off("open", openHandler);
                    peerServer.off("error", errHandler);
                }
            };
        },
        reconnectToPeerServer: (context, event) => {
            return (sendStateChange, onReceive) => {
                showLoadingUi("Reconnecting to peer server...");
                context.thisPeer.reconnect();
            };
        },
        handlePeerJsServerError: (context, event) => {
            return (sendStateChange, onReceive) => {
                // const errSource = event.data.source;
                // if (errSource != "peer_server_error") return

                const err = event.data;
                if (err.type == 'browser-incompatible') {
                    alert('Your web browser does not support some WebRTC features, please use a newer / different browser.');
                    sendStateChange({ type: "WEBRTC_FATAL_ERROR" })
                } else if (err.type == "webrtc") {
                    showToastMessage("WebRTC protocol error! Reloading website now...")
                    sendStateChange({ type: "WEBRTC_FATAL_ERROR" })
                }
                else if (err.type == "peer-unavailable") { // thisPeer.online
                    sendStateChange({ type: "PEERJS_TEMPORARY_ERROR", data: err })
                } else {
                    sendStateChange({ type: "PEERJS_SERVER_CONNECTION_CLOSED" })
                    showToastMessage("Peerjs Server Error: " + err.type)
                    console.dir("Peerjs Server Error: ", err)
                }

                return () => { }
            };
        },
        connectToRovPeer: (context, event) => {
            return (sendStateChange, onReceive) => {
                var rovPeerId = consts.rovPeerIdBase + String(context.rovPeerIdEndNumber)
                console.log(rovPeerId, context.thisPeer);
                const rovDataConnection = context.thisPeer.connect(rovPeerId, {
                    reliable: true,
                    serialization: 'none',
                });

                const gotConnectionHandler = generateStateChangeFunction(sendStateChange, "ROV_CONNECTION_ESTABLISHED", rovDataConnection)
                const errorHandler = generateStateChangeFunction(sendStateChange, "PEERJS_ERROR", null)
                rovDataConnection.on("connection", gotConnectionHandler)
                rovDataConnection.on("error", errorHandler)
                return () => {
                    rovDataConnection.off("open", gotConnectionHandler);
                    rovDataConnection.off("error", errorHandler);
                }
            };
        },
        awaitDatachannelOpen: (context, event) => {
            const openHandler = generateStateChangeFunction(sendStateChange, "DATA_CHANNEL_ESTABLISHED", null)
            const errorHandler = generateStateChangeFunction(sendStateChange, "PEERJS_ERROR", null)
            rovDataConnection.on("open", openHandler)
            rovDataConnection.on("error", errorHandler)
            return () => {
                rovDataConnection.off("open", openHandler);
                rovDataConnection.off("error", errorHandler);
            }
        },
        awaitMediaCall: (context, event) => {
            return (sendStateChange, onReceive) => {
                showLoadingUi("Waiting for ROV livestream...");
                const callHandler = generateStateChangeFunction(sendStateChange, "MEDIA_CHANNEL_ESTABLISHED", null, (rovMediaConnection) => {
                    showToastMessage('Got media call from peer: ' + rovMediaConnection.peer)
                    rovMediaConnection.answer(null, {
                        // sdpTransform: function (sdp) {
                        //     console.log('answer sdp: ', sdp);
                        //     return sdp;
                        // }
                    });
                })
                context.thisPeer.on('call', callHandler);

                const timeoutId = setTimeout(() => {
                    // sendStateChange({ type: "ROV_PEER_CONNECTION_ERROR", data: { type: "timeout", error: "Timeout waiting for video stream" } });
                }, 10000);
                return () => {
                    clearTimeout(timeoutId);
                }
            };
        },
        awaitVideoStream: (context, event) => {
            return (sendStateChange, onReceive) => {
                console.log("Awaiting video stream from ROV...");
                const videoReadyHandler = generateStateChangeFunction(sendStateChange, "VIDEO_STREAM_READY")
                context.mediaChannel.on('stream', videoReadyHandler);

                const timeoutId = setTimeout(() => {
                    // sendStateChange({ type: "ROV_PEER_CONNECTION_ERROR", data: { type: "timeout", error: "Timeout waiting for video stream" } });
                }, 10000);
                return () => {
                    clearTimeout(timeoutId);
                }
            };
        },
        handlePeerSeverEvents: (context, event) => {
            return (sendStateChange, onReceive) => {
                const errorHandler = generateStateChangeFunction(sendStateChange, "PEERJS_ERROR")
                const disconnectedHandler = generateStateChangeFunction(sendStateChange, "PEERJS_SERVER_DISCONNECTED")
                context.thisPeer.on("disconnected", disconnectedHandler)
                context.thisPeer.on("error", errorHandler)
                return () => {
                    context.thisPeer.off("disconnected", disconnectedHandler)
                    context.thisPeer.off("error", errorHandler)
                }
            }
        },
        handleDataChannelEvents: (context, event) => {
            return (sendStateChange, onReceive) => {
                const rovDataConnection = context.dataChannel
                // handle new messages from the datachannel (comming FROM the rov)
                console.log("handleDataChannelEvents:", rovDataConnection);
                const dataMsgRecivedHandler = (encodedMessage) => {
                    message = messageDecoder.decode(encodedMessage);
                    sendStateChange({ type: "GOT_MESSAGE_FROM_ROV", data: message });
                }; rovDataConnection.on('data', dataMsgRecivedHandler)

                // cleanup event listeners when the state is exited
                return () => {
                    rovDataConnection.off("data", dataMsgRecivedHandler);
                }
            };
        },
        watchForRovDisconnect: (context, event) => {
            return (sendStateChange, onReceive) => {
                const rovDataConnection = context.dataChannel
                var datachannelTimeoutCountdown = 10
                var lastIceConnectionState = "connected"

                // every second (interval 1000) check if the datachannel peer connection is still connected
                // if it's not: count down a timeout counter, if it's still not connected after the timeout, then fire the ROV_PEER_CONNECTION_ERROR event
                // if it connects: reset the countdown.
                intervalId = setInterval(() => {
                    const connectionState = rovDataConnection.peerConnection ? rovDataConnection.peerConnection.iceConnectionState : "disconnected";
                    if (connectionState == "disconnected") {
                        datachannelTimeoutCountdown--
                        showToastMessage("Waiting for ROV to Reconnect: " + datachannelTimeoutCountdown, 1000)
                    } else if (connectionState == "connected" && lastIceConnectionState != "connected") {
                        datachannelTimeoutCountdown = 10
                        showToastMessage("ROV Reconnected!", 2000)
                    }
                    lastIceConnectionState = connectionState

                    // If we have waited too long without the rov reconnecting
                    if (datachannelTimeoutCountdown <= 0) {
                        sendStateChange({ type: "ROV_PEER_CONNECTION_ERROR", data: { type: "timeout", error: "Timeout waiting for data channel to reconnect" } });
                    }

                }, 1000);


                return () => {
                    // cleanup the check interval when the state is exited
                    clearInterval(intervalId);
                }
            };

        },
        awaitROVConnectBtnPress: (context, event) => {
            return (sendStateChange, onReceive) => {
                const err = event.data
                var toastMsg = null
                if (err.type == "peer-unavailable") {
                    toastMsg = showToastDialog("ROV is not yet online!", 12000, false)
                }
                setupConnectBtnClickHandler(() => {
                    if (toastMsg) toastMsg.hideToast()
                    sendStateChange("CONNECT_BUTTON_PRESSED");

                })
            };
        },
    },
    guards: {
        // ROVConnectionOpen: (context) => {
        //     return context.thisPeer && context.thisPeer.open;
        // },
        // PeerDisconnectedTimeout: (context) => {
        //     return context.peerConnectionTimeout > 5;
        // },
        // ROVConnectionBroken: (context) => {
        //     return true;
        // },
        // peerServerDisconnected: (context) => {
        //     return context.thisPeer.disconnected;
        // },
        // peerServerFatalError: (context, event) => {
        //     const err = event.data;
        //     console.log(event, context)

        //     return err.type == 'browser-incompatible' || err.type == "webrtc" || context.thisPeer.destroyed;
        // },
        // peerServerRecoverableError: (context) => { }
    },
}

export const rovConnectionMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QCUDyA1AwgewHa7AGMAXASzwDpkBXfU3KCgBTDACcB9AZXYDd2OOfETKUActmKC8BEpA4AVbBxbsAVrG592AYiYBRfcgBSXbkfRHBqMWP2YFASRsd9XBQEEAQgBlHXAAl9ABFEUAAHbFhSUVwwkAAPRABmAA4ABgoAFiyAVgA2QoAmfIB2EozcgBoQAE9EAoBOCnT05Pzc3Kzk9Mb01IBGAF8hmrQsGRFyXCpaXHpGVU4eNn5OIVlYigkpDZF5JRVWNg0tVd0DI1NXZDRkeMjo2PikhDTMnILisor06rqUo1khQgQNkl0OqVUnlkiMxhg9iRprM6AxmMczmtpMIkZREcQDsolqcVms9IYTGYjHcHlEYtMXogBukiqUKF0SqUsqk+q12jV6ghckUBhQikVkjDmckijksnCQON8ciaKjFhjSQJlXjJnIIIoiccSdo2OSrmYuBYrMF-JgbHYHCFaU8GUhEohGgNmtysuluaVGvlUsH8gLEKVmRRkslSlDSvl0gnoakFUrdVtVfM0UtMVr0yqiPmGBxiIb1JpNabLpTzMhLMhrLZ7E4XG5PL5-EFQm7HvS8IyEMzWeyspzuby2qGAULoRQMvGso0l77R6VUwj85RMwt0QJK9jNgXCEWoCWyycKyazTXqah7j26c83a8Bgnmhl0gMckDUsK-WGEFKdI2XyAZOkGRpymSL1GnXCYcQzOYdxzfdtRmAIAENcAgAAbBZXDYNhsCrClrktOsrDtJsHGcMRBB8VBLW7CJH1dUAXzfOdWi-Rc0j-LIAPFUU-SyDpUkKfoQzXUZFQ3BCVSQtFkGwXgjjzeTxEkA99n1Q5iUvc4SPNWt60bB0WzottvD8QInQfF1+2fRAgyyOcSgTUcukaVISgAgZWUyVlcl-XII0aEVRLgtCUSzRhlNUnNoo8WAAGt8KYUgcK00sVFIQgUo4AAxIiAFsOFQXA8IIDh4tgHRxg4RwxGCfQAA0VEcTAAGk7JYhy4icwccnyMVcmjfpwUXIpwr8gYIxBApgoGaFuVyP4os3GZtyUlS1PWTbti0-FCRqlT6owMzm1o1x3GsztepAXsn3YplekyHpUlKYLwtaToBOnL8ugofIJUKRpQvaVoig2jStsUuLdsSg6dm0vUDVO3gdAAWQAVR8JwmB8fQaowMwbD8OxnT7AaXqGtoWmFHzQqAkpkj8koinZcLweZIEik-XIYcPLd4aoRGMWi47dOUeKKGCDDiAwzAAAssIIHC5YVjDBFV4QcI4YJSFgY8EMgHRgg8TxMACDwmx8G72xsrsqee91BwGV8xVacLJS9ANGn+wV+ejChmXE6bwQjT98iFqYRbVMWEolg6pfR2X5cVlW1bADWM+1rO9YNo2Tc2M2Latm27cURwsf0VAcYUF22Ldr9E3ZDIgx5op5ynQVAcyQZgMKaFwcDWPcThhP4r21GtlTw5061gv1c1xWdez-XUHCMBcHNy2PGt227Htm0uCo8ym8c2mPfadkxq5ZbwvjWVBP85ppqTDy8nyWEZLTWGYo7mnkjAB88ZYqVXkrXWK887r0LlvHeOhLTNQ4LXLgXAPAAHFiYKFQCTdAl8aZuw6M0XIfR2ge1WqBPyqQ0hijyKzboyRIKvnHohKe4t1LCxmGAjGkDl450gXA9W5Vt670wagBQqC3AYOwUVNAWN8GEIHH0VyEZaHcg9q+ICvcmTQk5rKKEINEwFBFDHP+cluGAJ2knLhcceHphOovTO0DBGwIEfrFGCDd7lwPpXY+Ds7q2WYo9ViV83YxlcrKYMJQvQSj+IHRAIoYxRj4nKNozDChsIUhw2x+1QGOOlnwrGkBSBQI3odKQ3jsYhEcB4QQ-j9D2ysh2YJyjBr5G8iCUcPIyjcmmkuQS3RMjeWDPOAMwEA7ZPjrFROM9JaFLThAkpEAykeIoCsspwic6zzNugRwLU8HuGQPoDwiiTkeGCAATXadfUS70Bm9AXFHf4QduhsgyFkL8gMuRP2mZPWZwDk4FNNkU+K510AqApJdGirZbh3luW7WMI0yE-28uFYMuR-J+RyJkMabQvq0OFGBcx8J4JWO2gjPJs9kS8PBefZsIRFB4IAOpoDEJgpR9lqYDm0akKMrIeTopJfkRJQ1u6hxZAHQolDon-OsVS+Zm1rxkStA2BlsK6KYAYkxRFrwZScz6GtbooUiiM1SOzT8C1YxrWFKUA18rKU6BZfoLwyAFCYCKvvZp8L7x9R5YNcUnTga+njD-fmBQxVclcuJDJf0QZgWkmS6KTrqzXAUPoLGTA7weGQFcm4NJuWu31T-UUQJQL2v5ouUcYr-JgVDqFTokodHRnlR4AA7hhekxYGr4g4F4agxBSy4BUGwOAdUNVSK8A3XBdEmAnPQQ9J6zd9VAX5W0V8I9PxZChABMouQQS0KXMez0K0RgyVwNgCAcB4j-wpaLFCJoaWaV2IsvSRoDJrD1UyEo2QvzeX6DWn+-JpzvGBiyNagwSjvJTBY8l9iFW7mWE+hZoL0b6VzGwb9gF7Xsg9ui0SWL0UAVRRQZFYIgIwmmvKODKaH0ahQwdZAhZ5LFhyhhys2Gvz83A0KjIn0gQ5AAkBYEfRu7chBkK6GtGmP0b3IxgBmFsJVVPPoQixEuPeQPWtWMMY0gSkgmKoMB7mFLnaJ9P4nThgyYAZSpDmHn1EOXeEl8LI-2Ln40B6MuiECQWyDyNaHsyiJkmo60WQK7ET0qbsopHGTTYejPymMQFlpgkWtCNmAMZSihBqyeMoUfKfRo8m2TuSlUAOSmlYsGUspSHY3lAqxVsBlQqlVMAGN4BFpXUyICHzCNQj+MyfopRLXAmYWBbuBR-2jjC2VkBViUZ0pUlx3o-LyHeR3QGaCn5ZoZBHIGdoU1eiitm4Czh+SrFLd4Pw1xuctbbP1obY2hSuOjlFNBWM4VVyQZG9OYOnNEwkIDqPEMp2gHnccxQK7N2KnuNu6Ine2HOnAi+qJEGi5AyGL8uiloLI5rhTNVZ0lsl4NRbsxFi7CHod53WXDjeHAvFiIS8tdkxnvyfWCtj2MocSgB3EqFb+gsbP3rm8Cy7b7wHXZp7d7D1HWe-nZ4SvyEZXKdNaDK4an4wc2PK+LtDC9lmlPKXraL3iEsSmyLGbuHRRVmpDEMr8o1lr7o-BGbXir5tU4l8Uo36zNn53h1LFbXzD2ZM7sNXdf2cjAiCyUMakpQLWZK7Z8LEPUOlzBYb1ZxuV7oFINe5QXBiBjowi1pnXWXM9c6KkwM+Pyg+V+28r62QxMRn8sKJc7u5me6i9D-3HjZdLkt-Xm3nl7d-empkTpQYwLAV9ODYrJO6Oi8i3Pb38VZdAXl10DzSuAZkNFGCbkwZMnkNg8nkXZ3qVoVl6Jbfivgp8j8v0Ea3l7WhX6H6Mai+70IcpdhqEdzADfRUSbzIZdkYOMCCTT8COX+C-BDFlMAAAIzYGIEICKi1n1jUyIiwwryIVeDNUXDnDSGggimn0aGEx6D-U+y-GDFfGJ1-yiw7S7TIB7Quj7QHSHTwFHXHQS1FXfHBGFEkzIS5AAk9E5iDFy1HirVZH+WwyBi+Q80A1lGAw6AAgAFpuRshj8UtwYCVCgaMRggA */
    createMachine({
        context: {
            /* NOTE that the context is really set by the parent machine, not here */
            peerServerConfig: null,
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
                        exit: "cleanupPeerServerConnection",
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
                                invoke: {
                                    src: "handlePeerSeverEvents",
                                    id: "handlePeerSeverEvents",
                                },
                                on: {
                                    PEERJS_ERROR: {
                                        target:
                                            "#ROVConnection.Running.Peer_Server_Connection.Handling_Error",
                                    },
                                    PEERJS_SERVER_DISCONNECTED: {
                                        actions: "showPeerServerDisconnectedNotice",
                                        target:
                                            "#ROVConnection.Running.Peer_Server_Connection.Reconnecting_to_Peerjs_Server",
                                    },
                                },
                            },
                            Reconnecting_to_Peerjs_Server: {
                                invoke: {
                                    src: "reconnectToPeerServer",
                                },
                                on: {
                                    PEERJS_SERVER_CONNECTION_ESTABLISHED: {
                                        actions: "showPeerServerConnectedNotice",
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
                                invoke: {
                                    src: "handlePeerJsServerError",
                                },
                                on: {
                                    PEERJS_SERVER_CONNECTION_CLOSED: {
                                        actions: "cleanupPeerServerConnection",
                                        target:
                                            "#ROVConnection.Running.Peer_Server_Connection.Not_Connected_To_Peerjs_Server",
                                    },
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
                                entry: "showConnectingUi",
                                invoke: {
                                    src: "connectToRovPeer",
                                },
                                on: {
                                    ROV_CONNECTION_ESTABLISHED: {
                                        actions: "setDataChannel",
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
                                entry: "showRovConnectedUi",
                                type: "parallel",
                                states: {
                                    DataChannel: {
                                        exit: "closeDownDataChannel",
                                        initial: "Data_Channel_Not_Open",
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
                                                entry: "showRovConnectedUi",
                                                invoke: [
                                                    {
                                                        src: "handleDataChannelEvents",
                                                        id: "handleDataChannelEvents",
                                                    },
                                                    {
                                                        src: "watchForRovDisconnect",
                                                        id: "watchForRovDisconnect",
                                                    },
                                                ],
                                                on: {
                                                    DATACHANNEL_DISCONNECT: {
                                                        target:
                                                            "#ROVConnection.Running.Rov_Peer_Connection.Connected_To_Rov.DataChannel.Data_Channel_Disconnected",
                                                    },
                                                    SEND_MESSAGE_TO_ROV: {
                                                        actions: "sendMessageToRov",
                                                        target:
                                                            "#ROVConnection.Running.Rov_Peer_Connection.Connected_To_Rov.DataChannel.Data_Channel_Open",
                                                    },
                                                    GOT_MESSAGE_FROM_ROV: {
                                                        actions: "gotMessageFromRov",
                                                        target:
                                                            "#ROVConnection.Running.Rov_Peer_Connection.Connected_To_Rov.DataChannel.Data_Channel_Open",
                                                    },
                                                },
                                            },
                                            Data_Channel_Not_Open: {
                                                invoke: {
                                                    src: "awaitDatachannelOpen",
                                                },
                                                on: {
                                                    DATACHANNEL_ESTABLISHED: {
                                                        target:
                                                            "#ROVConnection.Running.Rov_Peer_Connection.Connected_To_Rov.DataChannel.Data_Channel_Open",
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
                                                    'ROV Will "Video Call" this plot, and that is hooked up to trigger the MEDIA_CHANNEL_ESTABLISHED transition',
                                                invoke: {
                                                    src: "awaitMediaCall",
                                                    id: "awaitMediaCall",
                                                },
                                                on: {
                                                    MEDIA_CHANNEL_ESTABLISHED: {
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
                                    ROV_PEER_CONNECTION_ERROR: {
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
                        on: {
                            PEERJS_SERVER_CONNECTION_CLOSED: {
                                target:
                                    "#ROVConnection.Running.Rov_Peer_Connection.Not_Connected_To_Peerjs_Server",
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
                entry: ["showDisconnectedUi", "reloadWebsite"],
                type: "final",
            },
            Awaiting_ROV_Connect_Button_Press: {
                entry: "showDisconnectedUi",
                exit: "showConnectingUi",
                invoke: {
                    src: "awaitROVConnectBtnPress",
                },
                on: {
                    CONNECT_BUTTON_PRESSED: {
                        target: "#ROVConnection.Running",
                    },
                },
            },
        },
    }, machineFunctions);
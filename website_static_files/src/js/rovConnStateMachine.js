import { createMachine, assign, send, interpret, sendParent } from "xstate";

import { messageEncoder, messageDecoder } from "./consts";

import * as consts from "./consts";
import { pure } from "xstate/lib/actions";
import Peer from "peerjs"


import { showToastMessage, showROVDisconnectedUI, showROVConnectingUI, showROVConnectedUI, showLoadingUi, setupConnectBtnClickHandler, showToastDialog, hideLoadingUi, setupDisconnectBtnClickHandler } from "./ui"

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
        showRovConnectedUi: (context, event) => { showROVConnectedUI(!!event.data ? event.data.peer : null) },
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
        setRovPeerIdEndNumber: assign({ rovPeerIdEndNumber: (context, event) => { return event.data } }),
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
        },
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

                const openHandler = generateStateChangeFunction(sendStateChange, "ROV_CONNECTION_ESTABLISHED", rovDataConnection)
                const errorHandler = generateStateChangeFunction(sendStateChange, "PEERJS_ERROR", null)
                rovDataConnection.on("open", openHandler)
                rovDataConnection.on("error", console.log)
                return () => {
                    rovDataConnection.off("open", openHandler);
                    rovDataConnection.off("error", console.log);
                }
            };
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
                    sendStateChange({ type: "ROV_PEER_CONNECTION_ERROR", data: { type: "timeout", error: "Timeout waiting for video stream" } });
                }, 16000);
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
                    sendStateChange({ type: "ROV_PEER_CONNECTION_ERROR", data: { type: "timeout", error: "Timeout waiting for video stream" } });
                }, 16000);
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

                // every second (interval 1000) check if the datachannel peer connection has disconnected
                intervalId = setInterval(() => {
                    const connectionState = rovDataConnection.peerConnection ? rovDataConnection.peerConnection.iceConnectionState : "disconnected";
                    if (connectionState == "disconnected") {
                        sendStateChange("DATACHANNEL_DISCONNECT");
                    }
                }, 1000);

                return () => {
                    // cleanup the check interval when the state is exited
                    clearInterval(intervalId);
                }
            };

        },
        watchForRovReconnect: (context, event) => {
            return (sendStateChange, onReceive) => {
                const rovDataConnection = context.dataChannel
                var datachannelTimeoutCountdown = 10
                var lastIceConnectionState = "disconnected"

                // every second (interval 1000) check if the datachannel peer connection is still disconnected
                // if it's disconnected: count down a timeout counter, if it's still not connected after the timeout, then fire the ROV_PEER_CONNECTION_ERROR event
                // if it connects: reset the countdown.
                intervalId = setInterval(() => {
                    const connectionState = rovDataConnection.peerConnection ? rovDataConnection.peerConnection.iceConnectionState : "disconnected";
                    if (connectionState == "disconnected") {
                        datachannelTimeoutCountdown--
                        showToastMessage("Waiting for ROV to Reconnect: " + datachannelTimeoutCountdown, 1000)
                    } else if (connectionState == "connected" && lastIceConnectionState != "connected") {
                        datachannelTimeoutCountdown = 10
                        showToastMessage("ROV Reconnected!", 2000)
                        sendStateChange("DATACHANNEL_ESTABLISHED")
                    }
                    lastIceConnectionState = connectionState

                    // If we have waited too long without the rov reconnecting
                    if (datachannelTimeoutCountdown <= 0) {
                        sendStateChange({ type: "DATACHANNEL_TIMEOUT", data: { type: "timeout", error: "Timeout waiting for data channel to reconnect" } });
                    }

                }, 1000);


                return () => {
                    // cleanup the check interval when the state is exited
                    clearInterval(intervalId);
                }
            };
        },
        awaitDisconnectBtnPress: (context, event) => {
            return (sendStateChange, onReceive) => {
                const cleanupFunc = setupDisconnectBtnClickHandler(() => {
                    sendStateChange("CLEANUP_CONNECTIONS");
                })
                return cleanupFunc;
            };
        },
        awaitROVConnectBtnPress: (context, event) => {
            return (sendStateChange, onReceive) => {
                const err = event.data
                console.log(event)
                var toastMsg = null
                if (err && err.type == "peer-unavailable") {
                    toastMsg = showToastDialog("ROV is not yet online!", 12000, false)
                }
                const cleanupFunc = setupConnectBtnClickHandler(() => {
                    if (toastMsg) toastMsg.hideToast()
                    sendStateChange("CONNECT_BUTTON_PRESSED");
                })
                return cleanupFunc;
            };
        },
        awaitSwitchRovBtnPress: (context, event) => {
            return (sendStateChange, onReceive) => {
                const cleanupFunc = setupSwitchRovBtnClickHandler(() => {
                    sendStateChange("");
                })
                return cleanupFunc;
            };
        },
        chooseROVPopup: (context, event) => {
            return (sendStateChange) => {
                showLoadingUi("Finding Online ROVs...")
                Peer.listAllPeers((peerIds) => {
                    hideLoadingUi()
                    console.log("peerIds:", peerIds);
                    const toastPopup = showChoiceDialog("Choose ROV", peerIds, (peerId) => {
                        console.log("chosen peerId:", peerId);
                        toastPopup.hideToast()
                        sendStateChange({ type: "ROV_PEER_CHOSEN", data: peerId });
                    });
                })
            }
        }
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
    /** @xstate-layout N4IgpgJg5mDOIC5QCUDyA1AwgewHa7AGMAXASzwDpkBXfU3KCgBTDACcB9AZXYDd2OOfETKUActmKC8BEpA4AVbBxbsAVrG592AYiYBRfcgBSXbkfRHBqMWP2YFASRsd9XBQEEAQgBlHXAAl9ABFEUAAHbFhSUVwwkAAPRABGAAYANgoATgAOdIBWDNSAFnzinKzKgBoQAE9EfPyAZgpGsoB2LOTc5tT2gF9+mrQsGRFyXCpaXHpGVU4eNn5OIVlYigkpVZF5JRVWNg0tJd0DI1NXZDRkeMjo2PikhGTkgta8rPTPrNLk4pr6ghiuliq12n9Kvl2jkmjl2sUmoNhhhtiQJlM6AxmAdjstpMI0ZRUcRdsp5kdFss9IYTGYjNdblEYhNHilXpksiVkgAmJrpJrJdrc5oAxDA-IUIUvaHpYWlbkgpEgEbE9E0TFzHGUgSqoljOQQRRkg4U7RsannMxcCxWYL+TA2OwOEKM+4spCJFKpOEUbqcl7pCpZeHc0UIKHJX0BkHtVJNcpNRFDZUo-XrdUzLHzXE6tNqoh5hgcYjG9SabXms608zISzIay2exOFxuTy+fxBUIeu7MvCs56pfJZSXtJpx17cypZfI5MOByMVaEZYHFcqK5MqvOUDOzbECCv4tb5wiFqDF0uHctmi3V+moG7dpkPD1PZIznIUOFZWFNXL89pCmG5QSoUWTctygpLuCORKpuBLptMu7ZgeuqTAEACGuAQAANrMrhsGw2CVjSFzWrWVgOo2DjOGIgg+Kg1pdhET7uqAr6pBxkpxtyHE8RO1R1IgTQQRQ3I5IUPJCgK3pZLBqbwWqiFYsg2C8PsuYKeIkiHjshp7OSV4nMRlo1nWDZOs2tGtt4fiBC6j5un2L4NMkLT5AU3orrK7T8mGaTdL6nJgakgpdOCskbvJR7bkpjAqWp2aoRQHiwAA1nhTCkNh2kliopCEKlHAAGKEQAthwqC4LhBAcPFsA6CMKg0oIAQMfoYiur2cTOc8PHcu84nlJ00rpGGPyZDKEbevGfzFHJoyaZMO7Kap6krFukybDpBpGrVqkNRg5lNjRrjuDZHb2cxjndWxiBdMOJRSd+Lzxl0fk8W5sKjsUcZNI08LzUly1xatiUbRQxKkntvAUME6HEOhmAABaYQQ2Gw-D6GCCjwjYRwwSkLAJ7wZAOjBB4niYAEHiNj4p1trZnadc+t0IBULT8sULw-JOqSfKGgnPNCkZ-DkMLQty4I8oD4PA1QoM4klkN6co8UYwjyOo2A6Nwwj2Na3jBNE2mpPk5T1O04ojgALL6KgACqCjM6xnq9X9FACl0XyclzIVNH5fqSsKMKuXzjRJsiC3RUtsXywlivg8ru1q7riM42j6tY5ruMVeEYC4GTFMeFTNN2HTdpcJRFnO05rMVBNBScjCxRCvy-uC8kcItHzHHpH03xfBHKZR+MMUanHa3besSd7CnmPZxnqf6znqB5wX1piMEHC21wXAeAA4voiioLVGA1zdrsIu0FDpIPwXfekkl+UO-U8mBCKrk07RlMkMuLRimYQbxw0tHCGJsVbQ0zgvbWmdl5o1zvnHQ+9UAKG3m4Peh9ipoGtqfdA59+y32vtBfIvJgQ5DSNyf4HcZz9RyD9SchQSgtzFn-UBct4qTyVuA5OqkKDW0gKQNOBsNjaVXog22doPAtVLvoOm1l2x2SYiAHsLNXYkOvvOL+4JfxDj5GGCCnRshxh+CQ38cZb6sNHjHceHCwb-xnqrXh-CICCOgejZxgi4HaynqTdAjhgh224AoZA+gPA4JCR4YIABNfBPUeQVAoBkGE-p3IcWKALQEEE8iSm6DxIcgpSiWMJNYwBE87GgIcdDA66AmoUUdMdFsVx7yxNZn3CUiYhrfj4quLIAcEmrjKPQ6cgoxJFIQjYhWICrFgJJhA+KOgq5NhCMfDgAB1NAYh964Jaa7N8qRX6-inHKDIf0A4AVaLyCCvQwosMiiPYpADdy2ITotG8pEbT1kWdRFwmB6KMR2a+fIkYQR-V5J8WE4ERSC2nKkT8QpyHFFyEKToc07lA1ijoVZ+gvDIAUJgYqRc5FNIfFdLq-Y-QfkqP5TuncviAUFtCUEBS8hcyXOQ7kYzFIajeWYBQ+hrZMHvB4ZAUTLgMgcmSuJlQPwtwDH8UcCo3od26G5dyVyOlpG-pysegCFk+FCWIe2TAjrfLEFwAFiA+KwqSaOGEsIQSrneu5D2cJOhdC5mkXI2rJgeAAO7oWZEWRqxIOBeGoMQEsuAVBsDgPVL5qCvCOwUC4JgITd6XWUSxWurtLn9SHGUPu-I0hiyoYCVyuRWicnhVCcSAFBjJlwNgCAcB4hwTYbHZCZop7oi2pUgyOY2AWoHC0VyM4XjkNeCFXkYYxwfjSIGEEyTJwQVRZHdF49O1GW7XqWZu1+0ViHSQ0EiLxK3yBYUOEyQwz-VElCSW45II+W9Y8rMWou1AwLApIsuV91miHW+eMrQXh8z7oqzoGSGhClaO5KEo5CjQnIc+uWm68RJQwlhaqZ59AESIv+oFx7wSDJbmOYSM6gWSkaF0F49DWVIY7W+rdqEh2GNHROidfceTtzLXQ6DBTugwknDyVdw912lOeVMh5vbuH6RNIZZY-70jXxeGUHoiqSF-D8n0WFzRGVpAhaudIdGJnAPWv-FK6UiyZWylIH9+VColWwOVSq1UwDQ3gBK1Rr5gSwsTB0P6j9BT5DGnyT8cYe7ekobyX+aLZax3E6Z0BUnd2z1UkOsCGj0nikFEUWEY1JwUBXLGMOeSv5GbE5MhL0zKlzw1unGBS83H40JsTNYkB-38Yo3zEtfIciDiCx3Jcvokn90bpUMrTyKvbsmNV3hqc3GwMa2Ii+KiXZPFlb6OE4lxIySuX5Uc18Si8jhF8KE+zxsrRM1NmZrW5mzfnnV7CQ6uYczvjxB+T8O6lGHGJI9lCehxnO0AzhidpOOJhh4oRuMRFSCW3h-qVyfInbaMKdo+jXgjtvl0kovEYSA7KS8ipoPIEQ-mxDrxeNlZDrhLCoUlCW4-Z8m+NHYFEkCmEsGExgY8fxauzN8HAjIcZ3QKQZtyguDEBjehJza88M8b6L13IfIuZvf0eBY9g5fMzhIe5bnk2uHJbB3wgXbj-1iVEm+RH05kdQn0cYm+0pCiUd7sJtt0z2F65Bwb6G-6Sjm6hJjto2vUcd185KMcncjnqJd1FN3cWPeLSp7ChHAfrfB8BHQ49VvwIfAgtOQHh6JSsfHQGKdXGhLX1hOHBU9qxZnZi--VZYAABGbBiCEGKpjPG2HCKDo86tlIwYR3fz6I-TkKPRqCxnLC+uwoYN9188+v1AayBBsOiGsNEa8DRtjUO7Pw4ESPRjImMSZfngdeBLkfZb2wKCm9UOgUvo-psZL5xsMABad2M4+TdAyGJPIMF60gA */
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
                invoke: {
                    src: "awaitDisconnectBtnPress",
                    id: "awaitDisconnectBtnPress",
                },
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
                                    src: "chooseROVPopup",
                                    id: "chooseROVPopup",
                                },
                                on: {
                                    ROV_PEER_CHOSEN: {
                                        actions: "setRovPeerIdEndNumber",
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
                                },
                            },
                            Connected_To_Rov: {
                                entry: "showRovConnectedUi",
                                type: "parallel",
                                invoke: {
                                    src: "awaitSwitchRovBtnPress"
                                },
                                states: {
                                    DataChannel: {
                                        exit: "closeDownDataChannel",
                                        initial: "Data_Channel_Open",
                                        states: {
                                            Data_Channel_Disconnected: {
                                                entry: "showConnectingUi",
                                                invoke: {
                                                    src: "watchForRovReconnect",
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
                    CLEANUP_CONNECTIONS: {
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
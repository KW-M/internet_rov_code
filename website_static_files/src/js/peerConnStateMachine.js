import { createMachine, assign, sendParent, spawn } from "xstate";
import { showToastMessage, showROVConnectingUi, showROVConnectedUi, showLoadingUi, hideLoadingUi, setupSwitchRovBtnClickHandler, showLivestreamUi, hideLivestreamUi } from "./ui"
import { generateStateChangeFunction } from "./util";
import * as consts from "./consts";
import { stop } from "xstate/lib/actions";

// FOR CONVERTING TEXT TO/FROM BINARY FOR SENDING OVER THE WEBRTC DATACHANNEL
const messageEncoder = new TextEncoder(); // always utf-8
const messageDecoder = new TextDecoder(); // always utf-8

export const peerConnMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QAcxgE4GED2A7XYAxgC4CWeAdAHLbED6O+RxkdAKtnQErYBuAxFwDyANQZCqVAKKY2ASQl0pAZTYBBAEIAZOcoASUgCKIU2WKTJ4TIAB6IAtACYADI4rOAnAEYAHI4AsAMxeAKyOgYEhADQgAJ6I-iH+FB4+AGwegWlJieE+AL75MagYjAQk5LjUtAx45SwQ7Jw8AsJiAApSUlzikjLyit3CXNbIZhaV1nYITj5eFFkh6ZkA7CHOac5egTHxCI5pyc5JzoErK44rQY4hhcVoWHXMlRRlzKwc3HwUhgCGxL9MAALX5MAA2P3+vwYIPBdEMpFghCeJEg-EManUmD0aj6WiUqk0On0RlG40suCmiACaQoVzSgRcgQ2S0cPl2iC8LjcGx8fhWPjCNwFdxAJUeTAqlDeqManxakIBwNBBAhfwBMJVYDB8MRyMlDXRmLU2Nx0nx8gAslIhABVNhk8wUqkIJYeBYeFbHLweG7+BnROIJK4Ufw+Vy+Ln+RxeAVpUXimUU14ohpNL68RWA2GqrOauFCVC4I1YnF4+G6TASaSyR0TKxIWzU-0UJY+VIeEIRNJef0chBctK0kIjrk+fxXFyHBMPJMvJMfZrfdXZrVqqH51V0QtgYvKKRUQx0a3KZRqADiUnYQm4ojrzsb0ycLcSK2ZXlOzI8nf7H-CCwFM4ey9RlHEcGdSlTedU0XDMs2VcE8wQrcd2Lc8hDYY8VDPS86AAMWES1bxEe9JkfBx-zZX00iuZxnH8RJjjSX9XECACfCA2NTjA8CijFWcoOlGC5SXTNLUgUhV0Qmh6FQ-hrUMOQ1AYMtzQJdRtF0AxjEbMYnTI0BplCHx3G-VxOx8FYaJCLxfxCDxnAoQ5vBjLxfECPwIIlepoINWCFXEiBJOQ7UKECyTN21Wo-IgfgRDkQwbToVQuCkNQiNStRDAATVIhtDMQQV3X8ByVl8VJtjfWygwHezHOcrk3Pczy+MTQSqgXES4PCqTVXkowlJUs0pAtORrTtB1dPJAymwQSITJow4XHsyzPTffsJ2SMMtgFVJ2xWT0vLnISYvTFpBFEOhOm6XoawGKglC4YY8spciBzSNwllZDZvWA5iapCKyKC5DxDhKs521cI72pTU75T4fgqz6WQjGvOgAHVhCoc9iJel1OzYn10jCdJHEyPwNu2UNo0BjyirbaGDReNRYAAa1IXAoCu0gwRqYhOHaUhCFZ-D0GwABbbdcDBDmwAzWALo6LoemxIR9yoPG3vs5JGXSf0PAYkIMkDPY3J1-wNgcsmri7RJCj43BsAgOBRgEpnKBk6L6n8vhNYKmZ0goSzAm-Pwu2CGMTcKtj0i5FwGP8LwaMZnyTu9rqFRXEL1w1bPdSRYS-dm0c6XJ7I-Hcq5fx9EJW3owGDrDIIrhT540-eDPlyhbOkJzKLUKLp9uScrIPtjUJGLmauu1bcIDlCA3vxWVupQ64Szq7pU+7BQeKK9UNaa2T9PB-Gr22KoJw6CLII5X5NOo3sSJN60LPYHqb9Py2anF8IPggyMMgQGJvmcCsOyM8k5JDJlyA69F4ytTdqnNecNRJhWfj3HqkUdSdV3ggBi7oBTtkuMEEq5wo61V9E5I2YQLZ+hjIEO+vl06PzQUFF+EIRCkGdpwZQxB0BgF+JLd+phP6vX9m5U4CwaFAK2HMHs-1TY9hMtsVYdMAigwKAgyC7tkHMPhk-Nh2dcHPjcBxJOBsOLAOZGAmqvYyYUHCPRH0XoXBEMYe3WUj9jFky2ofD8EQT7kLfO6MIaxBRhnWKA24WjvJtyqCzdmnNua83oPzbmwtRYSyljLAg8tcF8mHN4GibJ9obB2Gfd0golEhwCFsIc7ixFimml-J8wQTKvnfMfb85CPxB19E4k4oRsjL3tkAA */
    createMachine({
        context: {
            /* NOTE that the context is really set by the parent machine, not here */
            rovPeerIdEndNumber: 0,
            attemptingNewRovPeerId: false,
            thisPeer: null,
            rovDataConnection: null,
        },
        id: "peerConnection",
        initial: "Not_Connected_To_Rov",
        exit: "stopPeerConnectionEventHandler",
        states: {
            Not_Connected_To_Rov: {
                entry: ["showConnectingUi", "connectToRovPeerAndStartPeerConnectionEventHandler"],
                on: {
                    ROV_CONNECTION_ESTABLISHED: {
                        target: "Connected_To_Rov",
                    },
                    ROV_PEER_CONNECTION_ERROR: {
                        target: "Not_Connected_To_Rov",
                        internal: false,
                    },
                },
            },
            Connected_To_Rov: {
                entry: "showRovConnectedUi",
                invoke: {
                    src: "awaitSwitchRovBtnPress",
                },
                type: "parallel",
                states: {
                    DataChannel: {
                        exit: "closeDownDataChannel",
                        initial: "Data_Channel_Open",
                        states: {
                            Data_Channel_Disconnected: {
                                entry: "showConnectingUi",
                                invoke: {
                                    src: "watchForRovReconnect",
                                    id: "watchForRovReconnect",
                                },
                                on: {
                                    DATACHANNEL_ESTABLISHED: {
                                        target: "Data_Channel_Open",
                                    },
                                    DATACHANNEL_TIMEOUT: {
                                        target: "#peerConnection.Not_Connected_To_Rov",
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
                                        target: "Data_Channel_Disconnected",
                                    },
                                    SEND_MESSAGE_TO_ROV: {
                                        actions: "sendMessageToRov",
                                    },
                                    GOT_MESSAGE_FROM_ROV: {
                                        actions: "gotMessageFromRov",
                                    },
                                },
                            },
                        },
                    },
                    MediaChannel: {
                        exit: ["closeDownMediaChannel", "hideLivestreamUi"],
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
                                        target: "Media_Channel_Connected",
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
                                        actions: ["setVideoStream", "showGotVideoStreamNotice"],
                                        target: "Video_Stream_Open",
                                    },
                                },
                            },
                            Video_Stream_Open: {},
                        },
                        on: {
                            MEDIA_CHANNEL_TIMEOUT: {
                                target: "#peerConnection.Not_Connected_To_Rov",
                            },
                        },
                    },
                },
                on: {
                    ROV_PEER_CONNECTION_ERROR: {
                        target: "Not_Connected_To_Rov",
                    },
                    CONNECT_TO_NEXT_ROBOT: {
                        // target: "Asking_Pilot_to_Pick_From_Online_Rovs",
                        actions: "switchToNextRovPeerId",
                        target: "Not_Connected_To_Rov",
                    },
                },
            },
            // Asking_Pilot_to_Pick_From_Online_Rovs: {
            //     invoke: {
            //         src: "chooseROVPopup",
            //         id: "chooseROVPopup",
            //     },
            //     on: {
            //         ROV_PEER_CHOSEN: {
            //             actions: "setRovPeerIdEndNumber",
            //             target: "Not_Connected_To_Rov",
            //         },
            //     },
            // },
        },
    }, {
        actions: {
            showConnectingUi: showROVConnectingUi,
            showRovConnectedUi: (context, event) => { showROVConnectedUi(event.data ? event.data.peer : null) },
            showMediaChannelConnectedNotice: () => { showToastMessage("ROV Media Channel Connected!") },
            showGotVideoStreamNotice: () => { showToastMessage("Got ROV Video Stream!"); hideLoadingUi(); showLivestreamUi() },
            hideLivestreamUi: () => { hideLivestreamUi() },
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
            // setRovPeerIdEndNumber: assign({
            //     rovPeerIdEndNumber: (context) => {
            //         return context.rovPeerIdEndNumber + 1
            //     },
            //     attemptingNewRovPeerId: false,
            // }),
            sendMessageToRov: (context, event) => {
                const outgoingMessage = event.data
                const rovDataConnection = context.rovDataConnection
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
                console.info("Closing media channel...");
                if (context.mediaChannel) {
                    context.mediaChannel.close();
                }
            },
            closeDownDataChannel: (context) => {
                console.info("Closing data channel...");
                if (context.rovDataConnection) {
                    context.rovDataConnection.close();
                }
            },
            connectToRovPeerAndStartPeerConnectionEventHandler: assign((context) => {
                const rovPeerId = consts.ROV_PEERID_BASE + String(context.rovPeerIdEndNumber)
                console.log("Connecting to ROV:" + rovPeerId);
                const rovDataConnection = context.thisPeer.connect(rovPeerId, {
                    reliable: true,
                    serialization: 'none',
                });
                return {
                    rovDataConnection: rovDataConnection,
                    peerConnectionEventHandler: spawn((sendStateChange) => {
                        const openHandler = generateStateChangeFunction(sendStateChange, "ROV_CONNECTION_ESTABLISHED", rovDataConnection)
                        const errorHandler = generateStateChangeFunction(sendStateChange, "ROV_PEER_CONNECTION_ERROR", null, (err) => console.log("ROV_PEER_CONNECTION_ERROR:", err))
                        rovDataConnection.on("open", openHandler)
                        rovDataConnection.on("error", errorHandler)
                        return () => { // return a cleanup / stop function
                            rovDataConnection.off("open", openHandler);
                            rovDataConnection.off("error", errorHandler);
                        }
                    }, "peerConnectionEventHandler")
                }
            }),
            stopPeerConnectionEventHandler: stop("peerConnectionEventHandler"),
        },
        services: {

            awaitMediaCall: (context) => {
                return (sendStateChange) => {
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
                        sendStateChange({ type: "MEDIA_CHANNEL_TIMEOUT" });
                    }, 16000);
                    return () => {
                        clearTimeout(timeoutId);
                        context.thisPeer.off('call', callHandler);
                    }
                };
            },
            awaitVideoStream: (context) => {
                return (sendStateChange) => {
                    console.log("Awaiting video stream from ROV...");
                    const videoReadyHandler = generateStateChangeFunction(sendStateChange, "VIDEO_STREAM_READY")
                    context.mediaChannel.on('stream', videoReadyHandler);

                    const timeoutId = setTimeout(() => {
                        sendStateChange({ type: "MEDIA_CHANNEL_TIMEOUT" });
                    }, 16000);
                    return () => {
                        clearTimeout(timeoutId);
                        context.mediaChannel.off('stream', videoReadyHandler);
                    }
                };
            },
            handleDataChannelEvents: (context) => {
                return (sendStateChange) => {
                    const rovDataConnection = context.rovDataConnection
                    // handle new messages from the datachannel (comming FROM the rov)
                    console.log("handleDataChannelEvents:", rovDataConnection);
                    const dataMsgRecivedHandler = (encodedMessage) => {
                        const message = messageDecoder.decode(encodedMessage);
                        sendStateChange({ type: "GOT_MESSAGE_FROM_ROV", data: message });
                    }; rovDataConnection.on('data', dataMsgRecivedHandler)

                    // cleanup event listeners when the state is exited
                    return () => {
                        rovDataConnection.off("data", dataMsgRecivedHandler);
                    }
                };
            },
            watchForRovDisconnect: (context) => {
                return (sendStateChange) => {
                    const rovDataConnection = context.rovDataConnection

                    // every second (interval 1000) check if the datachannel peer connection has disconnected
                    const intervalId = setInterval(() => {
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
            watchForRovReconnect: (context) => {
                return (sendStateChange) => {
                    const rovDataConnection = context.rovDataConnection
                    var datachannelTimeoutCountdown = 10
                    var lastIceConnectionState = "disconnected"

                    // every second (interval 1000) check if the datachannel peer connection is still disconnected
                    // if it's disconnected: count down a timeout counter, if it's still not connected after the timeout, then fire the DATACHANNEL_TIMEOUT event
                    // if it connects: reset the countdown.
                    const intervalId = setInterval(() => {
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
                            sendStateChange({ type: "DATACHANNEL_TIMEOUT" });
                        }

                    }, 1000);

                    return () => {
                        // cleanup the check interval when the state is exited
                        clearInterval(intervalId);
                    }
                };
            },
            awaitSwitchRovBtnPress: () => {
                return (sendStateChange) => {
                    const cleanupFunc = setupSwitchRovBtnClickHandler(() => {
                        sendStateChange("CONNECT_TO_NEXT_ROBOT");
                    })
                    return cleanupFunc;
                };
            },
            // chooseROVPopup: (context) => {
            //     return (sendStateChange) => {
            //         showLoadingUi("Finding Online ROVs...")
            //         context.thisPeer.listAllPeers((peerIds) => {
            //             hideLoadingUi()
            //             console.log("peerIds:", peerIds);
            //             const toastPopup = showChoiceDialog("Choose ROV", peerIds, (peerId) => {
            //                 console.log("chosen peerId:", peerId);
            //                 toastPopup.hideToast()
            //                 sendStateChange({ type: "ROV_PEER_CHOSEN", data: peerId });
            //             });
            //         })
            //     }
            // },
        },
    });
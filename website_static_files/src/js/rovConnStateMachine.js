import { createMachine, assign, spawn } from "xstate";
import { showToastMessage, showROVConnectingUi, showROVConnectedUi, hideLoadingUi, showLivestreamUi, hideLivestreamUi, showLoadingUi } from "./ui"
import { generateStateChangeFunction } from "./util";

import { stop } from "xstate/lib/actions";
import { MessageHandler, RovActions } from "./messageHandler";

// FOR CONVERTING TEXT TO/FROM BINARY FOR SENDING OVER THE WEBRTC DATACHANNEL
const messageEncoder = new TextEncoder(); // always utf-8
const messageDecoder = new TextDecoder(); // always utf-8

export const peerConnMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QAcxgE4GED2A7XYAxgC4CWeAdAHLbED6O+RxkdAKtnQErYBuAxFwDyANQZCqVAKKY2ASQl0pAZTYBBAEIAZOcoASUgCKIU2WKTJ4TIAB6IAtAEYArACYKAdgBsX194AcAAwejq7+AJyuADQgAJ6IjoEALBT+Po5JzgDMXuEe-q6uWQC+xTGoGIwEJOS41LQMeNUsEOycPALCYgAKUlJc4pIy8or9wlzWyGYWtdZ2CPYRKV7OkUX+jv5JXln+MfEImx6pWW5ZgYFnroE5peVoWE3MtRRVzKwc3HwUhgCGxL9MAALX5MAA2P3+vwYIPBdEMpFghCeJEg-EManUmD0aiGWiUqk0On0Rkm00suDmiCyHnc-n8qx2DOy2w8SX2iA8zkCFBp4XONM2WSSlzuIAqjyYNUob1RrU+HUhAOBoIIEL+AJhqrAYPhiORUpa6MxamxuOk+PkAFkpEIAKpsMnmClUhAeEIURz88KBNIRRKudlxRCrCjhVbh5JJRxs-wlMrih6yimvFEtNpfXhKwGwtXZrVwoSoXDGrE4vHw3SYCTSWROmZWJC2am0ijOEKB9uFVyhLIct3hfy8pKRZxbLLhFbhMUS5MvZMfdrfDU57XqqEFtV0ItgEvKKRUQx0G3KZRqADiUnYQm4onrLqb8ycPdSDK9eW2gRc-g8-a8FwoJItiSIp-x-NwvBnJM03nNNF0zbMVXBfMkK3HcS3PIQ2GPFQz0vOgADFhCtW8RHvWZHwcUJwlSEcvEcGMbmcdsGX7ZxHCyNs-DZL0LjCLJXCgyoYJlOD5SXLMrUgUhV2Qmh6HQ-gbUMOQ1AYcsLQJdRtF0AxjCbKZnQo0B5j8RwKECVxwjyQJJ1CLwkj7YNDi9dxHPDNZuX-bIhMlZpYMNeDFSkiAZNQnUKBCmTNx1RpAogfgRDkQxbToVQuCkNQSIytRDAATXIxsTMQGyKFcXJbMuLZgjjfsGMiQCJ1WQovMueN7mEw0AuaILvii2S1SUoxVPU80pEtOQbXtR0DPJYzmwQQVeXKoCMiyIV6LYmiPJ9bwQI8G5yt8udRPijMOkEUQ6F6fpBlrEYqCULhxkKylKIWEIhy8fJvF8crnCZftypopIOzSZJbJjJJSgTXBsAgOBJmgrrKHkuKevEzNXtdexViHHsvCCMcuTcEJ+3sdwLjjdiRSKTsMmhhNZxEuoF0xxUV3C9dNS5vUkTE7H3sJ5xPRcCcLg8XZQkcftaTc4Gf1CVxmJA46WdTM6FWXKEuZQ3NYvQwXioWUJjj8SJfCCZWBPYv8GqSaNEmyGNu3axNOv806MfO7XlX1sEjYWpxslouzGNOFjnH7XYaOauMewZcNlbVlHWbEn3JOkgaIrRw3ZqMoqg4YziIgFc45fDBi6pcFJwzHBzTYcyCmeRz2081iTIqz3X+pi3U2cD+YAc4sJ6NpDiIi2aJnPqlIHdyCJInOSGU7bjXva1zPQuziERFIBHOGUYh0DAX4AFtt2LQeEh7TiJ3ycJQfWopvDqnttqs910gE-JV+eL33jsz6t3f218TY0lSPyG45dCiV37NZEWENgig3yF+DIf9pTtw3hJMBTh3Sh3ouHZi+Qo7OX+hQFYHgfSDiCIkGMGCHymALm9Y29hwibAoc1dYmxti7HJqEEWj8BLrWyOGHYDsYbFCAA */
    createMachine({
        context: {
            /* NOTE that the context is really set by the parent machine, not here */
            thisPeer: null,
            rovPeerId: null,
            rovDataConnection: null,
            mediaChannel: null,
        },
        exit: "stopPeerConnectionEventHandler",
        id: "peerConnection",
        initial: "Not_Connected_To_Rov",
        states: {
            Not_Connected_To_Rov: {
                entry: [
                    "showConnectingUi",
                    "connectToRovPeerAndStartPeerConnectionEventHandler",
                ],
                on: {
                    ROV_CONNECTION_ESTABLISHED: {
                        target: "Connected_To_Rov",
                    },
                    ROV_PEER_CONNECTION_ERROR: {
                        actions: "stopPeerConnectionEventHandler",
                        target: "Not_Connected_To_Rov",
                        internal: false,
                    },
                },
                after: {
                    8000: {
                        target: "Not_Connected_To_Rov",
                        internal: false,
                    }
                },
            },
            Connected_To_Rov: {
                entry: ["showRovConnectedUi", "debugReload"],
                type: "parallel",
                states: {
                    DataChannel: {
                        initial: "Data_Channel_Open",
                        states: {
                            Data_Channel_Disconnected: {
                                // entry: "showConnectingUi",
                                invoke: {
                                    src: "watchForRovReconnect",
                                    id: "watchForRovReconnect",
                                },
                                on: {
                                    DATACHANNEL_ESTABLISHED: {
                                        target: "Data_Channel_Open",
                                    },
                                },
                                after: {
                                    10000: {
                                        actions: "stopPeerConnectionEventHandler",
                                        target: "#peerConnection.Not_Connected_To_Rov",
                                    },
                                },
                            },
                            Data_Channel_Open: {
                                entry: ["showRovConnectedUi", "showWaitingForMediaChannelNotice"],
                                invoke: [
                                    {
                                        src: "handleDataChannelEvents",
                                        id: "handleDataChannelEvents",
                                    },
                                ],
                                on: {
                                    DATACHANNEL_DISCONNECT: {
                                        target: "Data_Channel_Disconnected",
                                    },
                                },
                            },
                        },
                    },
                    MediaChannel: {
                        exit: ["hideLivestreamUi"],
                        initial: "Not_Open",
                        states: {
                            Not_Open: {
                                description:
                                    'ROV Will "Video Call" this browser, and that is hooked up to trigger the MEDIA_CHANNEL_ESTABLISHED transition',
                                on: {
                                    MEDIA_CHANNEL_ESTABLISHED: {
                                        actions: [
                                            "setMediaChannel",
                                            "showMediaChannelConnectedNotice",
                                        ],
                                        target: "Media_Channel_Connected",
                                    },
                                },
                                after: {
                                    16000: {
                                        actions: "stopPeerConnectionEventHandler",
                                        target: "#peerConnection.Not_Connected_To_Rov",
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
                    },
                },
                on: {
                    ROV_PEER_CONNECTION_ERROR: {
                        actions: "stopPeerConnectionEventHandler",
                        target: "Not_Connected_To_Rov",
                    },
                },
            },
        },
    }, {
        actions: {
            "showConnectingUi": showROVConnectingUi,
            "showRovConnectedUi": (context, event) => { showROVConnectedUi(event.data ? event.data.peer : null) },
            "showWaitingForMediaChannelNotice": () => { showLoadingUi("Waiting for ROV livestream...") },
            "showMediaChannelConnectedNotice": () => { showToastMessage("ROV Media Channel Connected!") },
            "showGotVideoStreamNotice": () => { showToastMessage("Got ROV Video Stream!"); hideLoadingUi(); showLivestreamUi(); console.info("Got Video Stream!") },
            "hideLivestreamUi": () => { hideLivestreamUi() },
            "connectToRovPeerAndStartPeerConnectionEventHandler": assign((context) => {
                console.log("Connecting to ROV:" + context.rovPeerId);
                const rovDataConnection = context.thisPeer.connect(context.rovPeerId, {
                    reliable: true,
                    serialization: 'none',
                });
                return {
                    rovDataConnection: rovDataConnection,
                    peerConnectionEventHandler: spawn((sendStateChange) => {
                        const openHandler = generateStateChangeFunction(sendStateChange, "ROV_CONNECTION_ESTABLISHED", rovDataConnection)
                        const errorHandler = generateStateChangeFunction(sendStateChange, "ROV_PEER_CONNECTION_ERROR", null, (err) => console.log("ROV_PEER_CONNECTION_ERROR:", err))
                        const callHandler = generateStateChangeFunction(sendStateChange, "MEDIA_CHANNEL_ESTABLISHED", null, (rovMediaConnection) => {
                            showToastMessage('Got media call from peer: ' + rovMediaConnection.peer)
                            rovMediaConnection.answer(null, {
                                // sdpTransform: function (sdp) {
                                //     console.log('answer sdp: ', sdp);
                                //     return sdp;
                                // }
                            });
                        })
                        rovDataConnection.on("open", openHandler)
                        rovDataConnection.on("error", errorHandler)
                        context.thisPeer.on('call', callHandler);

                        return () => { // return a cleanup / stop function
                            console.log("Stopping PeerConnectionEventHandler");
                            rovDataConnection.off("open", openHandler);
                            rovDataConnection.off("error", errorHandler);
                            context.thisPeer.off('call', callHandler);
                            console.log(context)
                            if (context.mediaChannel) {
                                console.info("Closing media channel...");
                                context.mediaChannel.close();
                            }
                            if (context.rovDataConnection) {
                                console.info("Closing data channel...");
                                context.rovDataConnection.close();
                            }
                            console.log("Done Stopping PeerConnectionEventHandler");
                        }
                    }, "peerConnectionEventHandler")
                }
            }),
            "setMediaChannel": assign({
                mediaChannel: (context, event) => event.data,
            }),
            "setVideoStream": assign({
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
            // "closeDownMediaChannel": (context) => {
            //     if (context.mediaChannel) {
            //         console.info("Closing media channel...");
            //         context.mediaChannel.close();
            //     }
            // },
            // "closeDownDataChannel": (context) => {
            //     if (context.rovDataConnection) {
            //         console.info("Closing data channel...");
            //         context.rovDataConnection.close();
            //     }
            // },
            "stopPeerConnectionEventHandler": stop("peerConnectionEventHandler"),
            // "rovPeerConnectionEstablished": sendParent("ROV_CONNECTION_ESTABLISHED"),
            "debugReload": () => {
                var reloadCount = localStorage.getItem("reloadCount") || 0;
                console.log("reloadCount: ", reloadCount, reloadCount == -1);
                // if (reloadCount == -1 || reloadCount > 8) {
                //     setTimeout(() => { localStorage.setItem("reloadCount", 0); window.location.reload() }, 10000);
                // } else {
                reloadCount++;
                localStorage.setItem("reloadCount", reloadCount);
                // window.location.reload()
                // }
            },
        },
        services: {
            "awaitMediaCall": (context) => {
                return (sendStateChange) => {
                    showLoadingUi("Waiting for ROV Media Call...");
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
            "awaitVideoStream": (context) => {
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
            "handleDataChannelEvents": (context) => {
                return (sendStateChange) => {
                    showToastMessage("Connected to ROV!");
                    const rovDataConnection = context.rovDataConnection

                    // Handle sending messages to rov:
                    MessageHandler.setSendMessageCallback((message) => {
                        const encodedMessage = messageEncoder.encode(message);
                        rovDataConnection.send(encodedMessage);
                    });

                    // handle reciving messages from rov:
                    const dataMsgRecivedHandler = (encodedMessage) => {
                        const message = messageDecoder.decode(encodedMessage);
                        MessageHandler.handleRecivedMessage(message);
                    }; rovDataConnection.on('data', dataMsgRecivedHandler)

                    // Keep checking if the datachannel goes offline: (every half second (interval 500) check if the datachannel peer connection state is "disconnected")
                    const intervalId = setInterval(() => {
                        const connectionState = context.rovDataConnection.peerConnection ? context.rovDataConnection.peerConnection.iceConnectionState : "disconnected";
                        if (connectionState == "disconnected") {
                            sendStateChange("DATACHANNEL_DISCONNECT");
                        }
                    }, 500);


                    // finally tell the rov to begin sending us the video livestream:
                    MessageHandler.sendRovMessage({ action: "begin_livestream" })
                    // start sending ping messages to the ROV (as a heartbeat signal & used for the net ping stat):
                    const stopPingLoop = RovActions.startPingMessageSenderLoop();

                    // cleanup event listeners when the state machine state is exited:
                    return () => {
                        rovDataConnection.off("data", dataMsgRecivedHandler);
                        stopPingLoop();
                        MessageHandler.setSendMessageCallback(null)
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
                        if (connectionState == "disconnected" && datachannelTimeoutCountdown > 0) {
                            datachannelTimeoutCountdown--
                            showToastMessage("Waiting for ROV to Reconnect: " + datachannelTimeoutCountdown, 1000)

                        } else if (connectionState == "connected" && lastIceConnectionState != "connected") {
                            datachannelTimeoutCountdown = 10
                            showToastMessage("ROV Reconnected!", 2000)
                            sendStateChange("DATACHANNEL_ESTABLISHED")

                        } else {
                            // If we have waited too long without the rov reconnecting
                            sendStateChange({ type: "DATACHANNEL_TIMEOUT" });
                        }

                        lastIceConnectionState = connectionState
                    }, 1000);

                    return () => {
                        // cleanup the check interval when the state is exited
                        clearInterval(intervalId);
                    }
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

console.log(
    "Peerjs rov Connection Machine: ", peerConnMachine.options
)

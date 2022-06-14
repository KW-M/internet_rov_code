import { createMachine, interpret } from "xstate";
import { showToastMessage, showLivestreamUi, hideLivestreamUi, showLoadingUi, hideLoadingUi } from "./ui"
import { generateStateChangeFunction } from "./util";

// main machine function
export const startRovMediaChannelMachine = (globalContext) => {

    let eventHandlers = {}

    const sendEventToSelf = (event) => {
        if (runningMachine) runningMachine.send(event);
    }

    // create the machine
    const rovMediaChannelMachine =
        /** @xstate-layout N4IgpgJg5mDOIC5QCcD2A3AspAlgQwGEALPAO1LABtM8BjInCgOgBcHYAFMMZAVVMY4WOSjgBekAMQAVABIBJAMoB9DgFE1AJWWa1AQQAiATUSgADqlhCcqUqZAAPRAEYA7ADYmAZgCs7gBwADMGuAJxeACw+rgA0IACeiABMSZ7+oa7OSc7+Pl5Jof7uzgC+JXFoWLiEJORUNPSMYKzsXDz8gsKiEhCSBgDyygZKBP0AcmNqBNL2FlbCtvZOCG6evgHBgWGR0XGJCAU+TIFerq4RAXkFRWUVGNgQ+MRkFNR0DMxsOJzcyPICXXEUlmlmsiyQjhcmWOSX8ES8gXC-lcSS2e0QkUCTGczlCsMKKUCERu5RAlQeT1qrwaH2atFsFFoLCkciUqg02gMakU0k0-SMagMIPmNjsEOWzncWPc8IKoWcgSSrn8+XRCC8uSYqMCKqVoS2hXctzJ92qzzqb0azHpdSZUnGQz00j0BFkegmagAMkMRuNJtNBcKwWLQBKpUwZflQvLFcrVQlEPCsbCkqdoj5Qj5iUbSeSzVT6u8mkwbYzmb0Bj7FKMPdMgwsQ5CVuHI3KFUrdWqIq4jl53F55ciU4bjXnHjUXoWrXSGWAmaL-tZuvaxo7na73ZNvf11GN66KlslFUx-LkUe48ciFaEImqUmkMlkcldDaVc6bx+bqUXrbP57ZF0BHoZAUFR1C0IZuV5flAwhOZg0PA5j1PaJUkvTJEVvBMDmhDIihlfxCWzUcP0pSdLVpEs-wbQCRCBXoHXA7QtD5TR93BUMjySE8zzQ2EMJvNUvDcY4pVRM59TCEk7iqT8Cwo4tSznGiATo4DK2Gas-SmGY4NBBtENRbiUPPdDryw-Ysy8JhM1cKMZQiREURI2SyItGlFOohdVOXXoa39aR5AdQLMDUfpeF08x9IPcUuJ41CL348y1QAWmJFyKQndyf2aAB3PBrFIKAADFUGQTQ5y82xJAdAwnRdN0PW3Xd2MbCUiiYPJnHWfwcR8VMIgsxAM1cbFwklHsggiQofAy-NyI85h8sKkqyoqpT-1IGrV10fydKC1cQrCiLWsQnJPC6nq+oGoaEBlbilW7BUszxYlZvfVysu-acmGW4QitK8rKttBsQLZJjIJ5PkBSFPSRQ4ptzs64SrucfrIlu1wTgjAju1SMIZrmuSFpy36Cv+1agY20GNN9WtIpAeCDNilYOsuvxerRm7UtCHMZMyr8p0okhKHLPpBj2us4YQlm0ecE9VjRnxEROeN9nOfwmHOft9VTdwNfe0lSFQCA4HsMc3O+yivh+doBB8+jTpZlL3FTTqIlSPtU16wj-FSlVjkCV35Sxuy-B7InLaF4sbbaP4HZ6J3OIQQI1RyeWziSHxCMCLNup9yOvuj38QcgJOm1T7DslCd2fElCIFUIjxTkLwWFJLstvKXR3peZ5PK-2LPRuEs4LklJIG6id7+fm7Kfr+xhKfWqrGyZmL+6ExEmA9wavFOHVcURVv5MW5oRfLcvlgHjFuzGrG0Y8VMCjfGfibn2lL8QF3b6zT3XY1HIsJUqSk1rzEOod04DTKGUIAA */
        createMachine(
            {
                id: "rovMediaChannelMachine",
                initial: "rovNotConnected",
                states: {
                    rovNotConnected: {
                        on: {
                            ROV_CONNECTION_READY: {
                                description:
                                    'this event is sent by the parent when the "rovConnectionMachine" has connected to the ROV',
                                target: "rovConnectionOpen",
                            },
                        },
                    },
                    rovConnectionOpen: {
                        always: {
                            actions: "addMediaChannelEventHandlers",
                            target: "awaitingVideoStream",
                        }
                    },
                    awaitingVideoStream: {
                        on: {
                            VIDEO_LIVESTREAM_READY: {
                                actions: ["setVideoStream", "showGotVideoStreamNotice", "clearMediaChannelConnectionTimeout"],
                                target: "videoStreamReady",
                            },
                            DO_DISCONNECT: {
                                actions: ["cleanupEventListeners"],
                                target: "rovNotConnected",
                            },
                            MEDIA_CHANNEL_TIMEOUT: {
                                actions: "cleanupEventListeners",
                                description: "(timeout)",
                                target: "rovConnectionOpen",
                            },
                        },
                    },
                    videoStreamReady: {
                        on: {
                            // ON_VIDEO_DISCONNECTED: {
                            //     actions: "startReconnectCountdown",
                            //     target: "waitingForReconnection",
                            // },
                            DO_DISCONNECT: {
                                actions: ["cleanupEventListeners", "hideLivestreamUi"],
                                target: "rovNotConnected",
                            },
                        },
                    },
                },
            },
            {
                actions: {
                    // "showWaitingForMediaChannelNotice": () => { showLoadingUi("Waiting for ROV livestream...") },
                    // "showMediaChannelConnectedNotice": () => { showToastMessage("ROV Media Channel Connected!") },
                    "showGotVideoStreamNotice": () => { showToastMessage("Got ROV Video Stream!"); hideLoadingUi("awaiting-video-call"); showLivestreamUi(); console.info("Got Video Stream!") },
                    "hideLivestreamUi": () => { hideLivestreamUi() },
                    'cleanupEventListeners': () => {
                        globalContext.thisPeer.off('call', eventHandlers["callHandler"]);
                        if (globalContext.mediaChannel) {
                            globalContext.mediaChannel.off('stream', eventHandlers["videoReadyHandler"]);
                            // globalContext.mediaChannel.off('close', eventHandlers["videoCloseHandler"]);
                            console.info("Closing media channel...");
                            globalContext.mediaChannel.close();
                            globalContext.mediaChannel = null;
                        }
                    },
                    "clearMediaChannelConnectionTimeout": () => {
                        clearTimeout(globalContext.mediaChannelTimeout);
                        // clearInterval(globalContext.datachannelDisconnectCheckIntervalId);
                        // clearInterval(globalContext.datachannelReconnectCountdown);
                    },
                    "setVideoStream": (_, event) => {
                        const rovVideoStream = event.data

                        const videoElem = document.getElementById('video-livestream');
                        videoElem.srcObject = rovVideoStream;  // video.src = URL.createObjectURL(rovVideoStream);
                        videoElem.muted = true
                        videoElem.autoplay = true
                        videoElem.controls = false
                        videoElem.play();
                        globalContext.videoStream = rovVideoStream;
                        console.info("Got Video Streasm!", rovVideoStream)
                    },
                    'addMediaChannelEventHandlers': () => {
                        showLoadingUi("awaiting-video-call");
                        const callHandler = eventHandlers["callHandler"] = generateStateChangeFunction(sendEventToSelf, "MEDIA_CHANNEL_ESTABLISHED", null, (rovMediaConnection) => {
                            // showToastMessage('Got media call from peer: ' + rovMediaConnection.peer)
                            globalContext.mediaChannel = rovMediaConnection;
                            console.log("Got media call: ", rovMediaConnection);
                            const videoReadyHandler = eventHandlers['videoReadyHandler'] = generateStateChangeFunction(sendEventToSelf, "VIDEO_LIVESTREAM_READY")
                            rovMediaConnection.answer(null);
                            rovMediaConnection.on('stream', (a) => { console.log("Got stream: ", a); videoReadyHandler(a) });

                        })
                        globalContext.thisPeer.on('call', callHandler);

                        globalContext.mediaChannelTimeout = setTimeout(() => {
                            sendEventToSelf({ type: "MEDIA_CHANNEL_TIMEOUT" });
                        }, 16000);

                        // // Keep checking if the datachannel goes offline: (every half second (interval 500) check if the datachannel peer connection state is "disconnected")
                        // globalContext.datachannelDisconnectCheckIntervalId = setInterval(() => {
                        //     const connectionState = rovDataConnection.peerConnection ? globalContext.rovDataConnection.peerConnection.iceConnectionState : "disconnected";
                        //     if (connectionState == "disconnected") sendEventToSelf("ON_DATACHANNEL_DISCONNECTED");
                        // }, 500);
                    },
                },
            });

    const runningMachine = interpret(rovMediaChannelMachine, { devTools: globalContext.debugXstateMode }).start();
    return runningMachine;
}




///--- actions for media connection machine:

// 'cleanupEventListeners': () => {
    //     return () => { // return a cleanup / stop function
    //         context.thisPeer.off('call', callHandler);
    //         if (context.mediaChannel) {
    //             console.info("Closing media channel...");
    //             context.mediaChannel.close();
    //         }
// }
// "setMediaChannel": (_, event) => {
//     globalContext.mediaChannel = event.data;
// },
// "setVideoStream": (_, event) => {
//     const rovVideoStream = event.data
//     const videoElem = document.getElementById('video-livestream');
//     videoElem.srcObject = rovVideoStream;  // video.src = URL.createObjectURL(rovVideoStream);
//     videoElem.muted = true
//     videoElem.autoplay = true
//     videoElem.controls = false
//     videoElem.play();
//     globalContext.videoStream = rovVideoStream;
// },

// "awaitMediaCall": () => {
//     return (sendStateChange) => {
//         showLoadingUi("awaiting-video-call");
//         const callHandler = generateStateChangeFunction(sendStateChange, "MEDIA_CHANNEL_ESTABLISHED", null, (rovMediaConnection) => {
//             showToastMessage('Got media call from peer: ' + rovMediaConnection.peer)
//             rovMediaConnection.answer(null, {
//                 // sdpTransform: function (sdp) {
//                 //     console.log('answer sdp: ', sdp);
//                 //     return sdp;
//                 // }
//             });
//         })
//         context.thisPeer.on('call', callHandler);

//         const timeoutId = setTimeout(() => {
//             sendStateChange({ type: "MEDIA_CHANNEL_TIMEOUT" });
//         }, 16000);
//         return () => {
//             clearTimeout(timeoutId);
//             context.thisPeer.off('call', callHandler);
//         }
//     };
// },
// "awaitVideoStream": () => {
//     return (sendStateChange) => {
//         console.log("Awaiting video stream from ROV...");
//         const videoReadyHandler = generateStateChangeFunction(sendStateChange, "VIDEO_STREAM_READY")
//         context.mediaChannel.on('stream', videoReadyHandler);

//         const timeoutId = setTimeout(() => {
//             sendStateChange({ type: "MEDIA_CHANNEL_TIMEOUT" });
//         }, 16000);
//         return () => {
//             clearTimeout(timeoutId);
//             context.mediaChannel.off('stream', videoReadyHandler);
//         }
//     };
// },
// const callHandler = generateStateChangeFunction(sendStateChange, "MEDIA_CHANNEL_ESTABLISHED", null, (rovMediaConnection) => {
//     showToastMessage('Got media call from peer: ' + rovMediaConnection.peer)
//     rovMediaConnection.answer(null, {
//         // sdpTransform: function (sdp) {
//         //     console.log('answer sdp: ', sdp);
//         //     return sdp;
//         // }
//     });
// })
 // context.thisPeer.on('call', callHandler);

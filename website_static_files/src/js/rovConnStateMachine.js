import { createMachine, assign, send, interpret } from "xstate";

import * as consts from "./consts";
import { pure } from "xstate/lib/actions";
import Peer from "peerjs"


import { showToastMessage, showROVDisconnectedUI, showROVConnectingUI, showROVConnectedUI, showLoadingUi, setupConnectBtnClickHandler, showToastDialog } from "./ui"

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
        showConnectedUi: () => { showROVConnectedUI() },
        showPeerServerConnectedNotice: () => { showToastMessage("Connected to Peerjs Server!") },
        showPeerServerDisconnectedNotice: () => { showToastMessage("Peerjs Server Disconnected") },
        showMediaChannelConnectedNotice: () => { showToastMessage("ROV Media Channel Connected!") },
        showGotVideoStreamNotice: () => { showToastMessage("Got ROV Video Stream!") },
        setThisPeer: assign({
            thisPeer: (context, event) => {
                return event.data
            },
        }),
        setDataChannel: assign({
            dataChannel: (context, event) => {
                const dataChannel = event.data
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
                const videoElem = document.getElementById('livestream');
                videoElem.srcObject = rovVideoStream;  // video.src = URL.createObjectURL(rovVideoStream);
                videoElem.muted = true
                videoElem.autoplay = true
                videoElem.controls = false
                videoElem.play();
                return rovVideoStream
            },
        }),
        closeDownMediaChannel: (context) => {
            console.log("closing media chnl");
            context.thisPeer.off("call", eventHandlerFunctions["MEDIA_CHANNEL_ESTABLISHED"]);
            if (context.mediaChannel) {
                context.mediaChannel.off("stream", eventHandlerFunctions["VIDEO_STREAM_READY"]);
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
                    context.thisPeer.off("open", eventHandlerFunctions["PEERJS_SERVER_CONNECTION_ESTABLISHED"]);
                    context.thisPeer.off("error", eventHandlerFunctions["PEERJS_ERROR"]);
                    context.thisPeer.destroy()
                }
                return null;
            }
        }),
        reloadWebsite: () => {
            setTimeout(window.location.reload, 2000)
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

                const openHandler = generateStateChangeFunction(sendStateChange, "ROV_CONNECTION_ESTABLISHED", null)
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
                console.log("Awaiting media call from ROV...");
                const callHandler = generateStateChangeFunction(sendStateChange, "MEDIA_CHANNEL_ESTABLISHED", null, (rovMediaConnection) => {
                    console.info('Got media call from peer: ' + rovMediaConnection.peer)
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

                onReceive((outgoingMessage) => {
                    console.log("Sending Datachannel Message: ", outgoingMessage);
                    outgoingMessage
                    data = encoder.encode(outgoingMessage);
                    rovDataConnection.send(data);
                })

                const dataRecivedHandler = (data) => {
                    message = decoder.decode(data);
                    console.log("Got Datachannel Message: ", message);
                    document.body.appendChild(document.createTextNode(String(message)));
                }
                rovDataConnection.on('data', dataRecivedHandler)

                // handle timeout and errors
                const datachannelTimeoutCounter = 0
                intervalId = setInterval(() => {
                    // if (rovDataConnection.disconnected) {
                    //     return datachannelTimeoutCounter++
                    // } else {
                    //     datachannelTimeoutCounter = 0
                    // }
                    // if (datachannelTimeoutCounter > 10) {
                    //     sendStateChange({ type: "ROV_PEER_CONNECTION_ERROR", data: { type: "timeout", error: "Timeout waiting for data channel" } });
                    // }
                }, 1000);

                return () => {
                    // cleanup event listeners when the state is exited
                    rovDataConnection.off("data", dataRecivedHandler);
                    clearInterval(intervalId);
                }
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
        awaitROVConnectBtnPress: (context, event) => {
            return (sendStateChange, onReceive) => {
                const err = event.data
                if (err.type == "peer-unavailable") {
                    // showToastMessage("ROV is not yet online!")
                    showToastDialog("ROV is not yet online!", 0, "CONNECT TO ROV", () => {
                        sendStateChange("CONNECT_BUTTON_PRESSED");
                    })
                } else {
                    setupConnectBtnClickHandler(() => {
                        sendStateChange("CONNECT_BUTTON_PRESSED");
                    })
                }
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
        /** @xstate-layout N4IgpgJg5mDOIC5QCUDyA1AwgewHa7AGMAXASzwDpkBXfU3KCgBTDACcB9AZXYDd2OOfETKUActmKC8BEpA4AVbBxbsAVrG592AYiYBRfcgBSXbkfRHBqMWP2YFASRsd9XBQEEAQgBlHXAAl9ABFEUAAHbFhSUVwwkAAPRABWAEYANgoATmSADgB2ZIAmLIAWZIBmLKqAGhAAT0R8otKKPKz0yqKS1NLSioBfAbq0LBkRclwqWlx6RlVOHjZ+TiFZWIoJKTWReSUVVjYNLWXdAyNTV2Q0ZHjI6Nj4pIQ0zJyC4rLK6qy6xoRSs0KBVcgAGIqg-K5CotLL5LJDEYYHYkSbTOgMZiHE4raTCVGUFHEPbKBbHJYrPSGExmIw3O5RGKTJ6IVIw1pZaE5UpFXLpVKg1J-FJZLIUdLNXnpUFw3LJdKIkCjIlomgY+bYikCFWE8ZyCCKUmHcnaNhUi5mLgWKzBfyYGx2BwhBkPZlIRKs9nZLnJHl8gVChpNIH9YqdVIR0qpaqK5V6jZq2aYhY47Xx1VEdMMDjEI3qTRas3nGnmZCWZDWWz2JwuNyeXz+IKhd33Jl4FkINktb1VX1SgPChDpdIVChFeV9IrpXnJZqlWPI9OURNzLECQt49YZwhZqA5vNHAum80lumoW4txmPd3PCGpXIUfIVZKcrKg0qQgr5Qf5eEUQEVBU6RZPe6Q8lkRQLmM+IJjMq4phuOpTAEACGuAQAANnMrhsGw2BFtSlxWmWVj2lWDjOGIgg+KgVrNhEV5uqAt6Cg+T4vrkb4flCv6DiUYqlNUglAeG-SDMMSqLjBqpwZiyDYLwBxptJ4iSJuuwGvsZJHqcBEWqW5aVo6NZUXW3h+IEzqXq67Y3ikw5jvkoK5GJySgu+5R8eOo6VL+6RgsO4FQUh6JJow8mKSmIUeLAADW2FMKQGFqbmKikIQsUcAAYnhAC2HCoLgWEEBwEWwDoowcI4YjBPoAAaKiOJgADSVkMTZcR2S8DlFE5LmAW5HnJHxIKgo+oIvr6IHNJywVLlMK5yQpSmrPNmxqUSJKlQpFUYEZ1aUa47jmY2bUgK217MayoqpI+EYgtKAq9eOfH5NObS5EUFQyiBVQyvkc0qQtsnhctUVrVs6n6oa228DoACyACqPhOEwPj6KVGBmDYfh2C6badVdCAQr6wLOWUkKdGUnlBsTFSpPkFCpEU95fICgq9IDW7LiDVBg9iIWbZpygRRQwQocQKGYAAFmhBAYWLEsoYIsvCBhHDBKQsA7jBkA6MEHieJgAQeFWPhHfWFlNvjl0ep2L5jQGgo8l9vJsoODMCv++SlLkqTJC+OQB+JSLQdzwPqnzkUC2tQsw6L4uSzLctgArifK8nasa1rOvrHrBtGybZuKI48P6KgiMKDbTF267yQUB5EpvT7zlgR7T6tMOPsjl0EYIhJcZA6Fq4RStUMbHH+wJ0rmfy4rksqyn6uoOEYC4PrhseMbpt2ObtpcGRxnV7ZRP+5xj58s+MJ5KC33frTDM+w3DvOdG74wgDA9SeHw9LdHyk-0niLBSFB4aQFIFLVWc9IYrzXgjEIjgt5F13hbE6ll6LnUYifO2ooxotD5NyAo-JSge2fIzD8coZQuW6MzecX8w4TB5pHUe4Mh5ANhqA8BkCl6cIgBAxeWchY6HQI4WqqBuAKGQPoDw8NSrSOCAATWPoTO2DNvoUD5IJSUZRxzAVIbOf8zk3KchdrQrmjCI5hSjmPQW8YtoRV2ugFQ1J9oUVrNcc8yiOwQgfGkQEbk-aFADpyPiblGaij9mor6t8pzmIJJYke-MAEWIoOwhxh9qwhEUOIgA6mgMQABxTG6AvFdVdmNRufkW6aI9r7Cp0IIS+2+mUaccTYLMKSatIGJ4iLWgrBktxVFMA0ToqUom8pMi9Wcq5dyfRhoP3cmNPI9NPpu2vp-UOIVFpQB0Dk-QXhkAKEwNlTe5szwXnagTbxhQxQlACm5FmFQfY-nyLdZmATehRgKCCNpMl1Q9LMAofQ8MmDng8MgBRVx6TWSuWUm5Y5OSgk6OCNkzzaYs3PiimUzM-b+UgvQ6KAB3FCTJsyVSJBwLw1BiC5lwCoNgcByoDIUJSyuCgXBMCkVwUZMLba3nhXcpFDzUUkIfnUhuT4IzvlYnKcSElcDYAgHAeIg8f7bLXIsU0480SQ3YdpVMbAxmqPBIOYC9c5TUKnAUCEzRflMKsQhLVtjdbCxWiaXSRrnggQqeOO8FRuKQkDP8Zo4TFnRm9YKDZkkGHxN-hqdcTq1rIEzNJbMqV9WFk9ayV5D4Jq3yFRCEx6QfwB29FCCCHQIIRnxZspNvNHW6W1ZQVC6Fip7n0LhfCWa6YuX-P0foPsnzwlnIOeUjNJVTLZIHOhtah7qobbiJC3aoTt3rtUaEUJ-KijAt0O1CS-42IhhtOxrqM2mm7d0TIHNijBIlMUXkXlS3+uKIJD8wcwJ7rjdY1hP8YrxWzIlZKUh03pUyjlbA+VCrFTALDeAvKa4sV8b0Qor8gkcRGiCbI-JnzAV-NCCUn71UsJjkPXVJ744KQvdfBufQm4SgoW3dF5Q118mnFOXoIIZ3Rq2bzYjyTY1pJAenWeqd54ZyganbO2sT3dtAmKMCg7qi9X6Eij2wFRwgl6NCMEEE3rJEI7xzpTapiCd4GJkTaclYCPlgVVeKiLoIdZFOUcnR4QTt6oUCoam3waL9k0nTvVWkErrR0-+XTAHkankJmeEmMKya+vJ2ccJ6bdF-JUD2Y7gTOanG9P6MZgtzsM2F4zqTIvALM2Avh3C1brSkLA+zWCVHPGnJMvqMyhqkMAo5H2940gMx6AZ0Lh62FlY4ZViBFneH8Is+PSAsnAKjicrONknEIy4tIUCF9QFwTjn6KkQbVi+PhZSaZqb1W57oFIEq5QXBiAMpQpBuzF73KJejNOGEw40heYflURmgScMuXU0ig7iTivOrzq60W43zup27dKIojlpkDVmTTf4zMZSPm6Ox0ow4gI1u4yFw7RnwcaQo7wbts4HxTP6s+FH8y0etyZhKAUk4frFBBwen9FjZO9r8ShwJAd0O0xAvXbDOQvr+WHLugraqQYU9FQzhHlbw18l9SBLjqqUk5LAAAIzYMQQg2Ulbqw7XhQ18HsHPG+lUf8Qc8cwk0ffYNJQNF-UlyOXI+HP0eGJaSvc5L4yUupbS+ljLu3W4Enb97UpAS1LSEzZmUJwR+xtVGzX8Tw+gkHOoxZ7lvp5qnftoYAwgA */
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
                                                        src: "handleDataChannelEvents",
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
//         handleDataChannelEvents: (context, event) => {
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

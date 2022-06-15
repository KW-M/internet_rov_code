import { createMachine, interpret } from "xstate";
import { showToastMessage, showROVConnectingUi, showROVConnectedUi, showROVDisconnectedUi } from "./ui"
import { generateStateChangeFunction } from "./util";
import { MessageHandler, RovActions } from "./messageHandler";
import { ROV_PEERID_BASE } from "./consts";

// FOR CONVERTING TEXT TO/FROM BINARY FOR SENDING OVER THE WEBRTC DATACHANNEL
const messageEncoder = new TextEncoder(); // always utf-8
const messageDecoder = new TextDecoder(); // always utf-8

// main machine function
export const startRovConnectionMachine = (globalContext, sendParentCallback) => {

    let eventHandlers = {}

    const sendEventToSelf = (event) => {
        console.log("Sending event to self:", event);
        if (runningMachine) runningMachine.send(event);
    }

    // create the machine
    const rovConnectionMachine =
        /** @xstate-layout N4IgpgJg5mDOIC5QCcD2A3AwqgdjsAxgC4CWuAsgIYEAWJ+AdEXbAAphjICqO9JpAGxIAvSAGIAKgAkAkgGUA+qwCiygEoK1ygIIARAJqJQAB1Sx+ZHEZAAPRAEYAHADYALA1cBOAMyOADM4ArP7eAOwANCAAnogATPaeDG7egYHOoc5+3m7OsQC+eZFoWLj4xJZUtPRgTCzsnDx8giLiugDyCrrymG0Acr3KmBLWpuakuNZ2CE5uHj7+QSER0YiufonBrvaxsa6u2dveBUUY2HiE4ziVdIzMJGwcyDK8zaIQYiNmFhNItnGxfnsDD8fniflCnnWfkCrkiMQQ-iSQVimW89i8W1cxxAxTOZUu12qDAIpQu4mk8iUqg0umUcgkaja+mUuk+Y0sk0QjhcDFigUBkL5jlCQrhqyyDHs3k8nhRYUc3lcgSOhRxp1J5Qo1BuNRJ52I4j6nW0Em0mCk2n6ygAMp1un0BkMWWzvlZflNuc5efyEqDgiLgmKECKva4A-ZQjDvNlPI5sbiNQTtUS9fjWh0unIelahi7LpyETy+QK-cLRStC+4QbFQq4goDQo5PM54+r9UmqoxUxdLM8LEI3mIjboTWaLVbbW0VL08xz3XF0gwQj5Ywlo4FPLCK44NwxowFQiCd6Fa62Su2Ksmu4ney8SAPybJFCp1J06Qymc7fqNXQWUaElyyFdHDXFJNyDFF3HsZxoNiGVvDgnZ7DPPEey1TtdRvXA+1eQ1eipV91EZNRZx+UApn-QDpWlECfDArd4U8UJvAYfkRU3FIXB2FtVQTC90J1YksJwHD7xad52jtLMHUGYZvy+fN5wQSjlxo0CNwYhx7F3LYpUcPYUTcTcUOEwlr34kS7wfd4bFgIhKCIGpKAAM0c5AAAp+RBABKMQ+PxS8MKEizROs0i3XIhcANU1c6I0oNtjrPd0iY5iIy8YITIssyagAd0oCwcCgAAxVBkDUQhhKHfCR1Nc1LQGSdp3CgtmyBJVnGjBDQSbRwg06jZtNlOtAj5WJFSygKBKJfLCpKsqKu7TUcGqzRBhkoYZCNCQZHIZQ2i4OSTAUudIumTFJR3bw-D2CMT18INQmg4E0TWFxoTrdFJrQq4rzygrSCK0rysqizJCfAiaXfRlmVZeT2TIv5zvRS7lRurYT2YvqKxhWJJScHZYkccaMh3b7lpyhhZsB+aQaWy4xEkzNs0dI6QB-RSzvRFGnDR27MYeitckScFXBAwIns+rxyY7QSaEoARHIkjoWdklqlIBPZJVBCNnFlBI9mcBL7EBJJQRBNFnBgiM42xHBUAgOBrH8n7KbuB4Gl4KzxPVrnnCLE84ObHZsliINXHiBhGzSRVcghdJT14tspt+oL3fqJ5vbeX2kfG-2PClInYz1sNAiDJsANg2MZTrJtPBlwLBPpyAc6mCWgVXMW4IVdd7HLiWl1SflgnlMJ66T88U8p+nb37H34d-JSI4SlFHAYWNRoVTrpUNhvpsYan6FpxbhNbrSmI8G7-erEC+W8R7pVY8EiY+wE0T31O5YVpWz+U9YgXSHrbkTYboynLjKVicERq5H2E2ZCE9UIUz+r-Jwj0khtQjOCGEN0Eg8QKEAA */
        createMachine(
            {
                id: "rovConnectionMachine",
                initial: "thisPeerUninitilized",
                states: {
                    thisPeerUninitilized: {
                        on: {
                            THIS_PEER_READY: {
                                description: 'this event is sent by the parent when the "thisPeerSetupMachine" has just created the peer (but does not wait for peerjs "open" event)',
                                target: "thisPeerInitilized",
                            },
                            DO_DISCONNECT: {
                                actions: ["cleanupEventListeners", "showRovDisconnectedUi"],
                                target: "halted",
                            },
                        },
                    },
                    thisPeerInitilized: {
                        always: {
                            actions: "connectToRov",
                            target: "connectionInitilized",
                        },
                    },
                    connected: {
                        entry: "sendParent_rovDatachannelOpen",
                        on: {
                            THIS_PEER_DESTROYED: {
                                actions: "cleanupEventListeners",
                                target: "thisPeerUninitilized",
                            },
                            ON_DATACHANNEL_DISCONNECTED: {
                                actions: "startReconnectCountdown",
                                target: "waitingForReconnection",
                            },
                            DO_DISCONNECT: {
                                actions: ["cleanupEventListeners", "showRovDisconnectedUi"],
                                target: "halted",
                            },
                        },
                    },
                    connectionInitilized: {
                        exit: "clearRovConnectionTimeout",
                        on: {
                            ON_DATACHANNEL_OPEN: {
                                actions: ["addDatachannelEventHandlers",],// "debugReload"
                                target: "connected",
                            },
                            THIS_PEER_DESTROYED: {
                                actions: "cleanupEventListeners",
                                target: "thisPeerUninitilized",
                            },
                            ON_PEER_ERROR: {
                                actions: ["cleanupEventListeners", "sendParent_rovConnectionFailed", "showRovDisconnectedUi"],
                                cond: "peerErr=peer-unavailable",
                                target: "halted",
                            },
                            DO_DISCONNECT: {
                                actions: ["cleanupEventListeners", "showRovDisconnectedUi"],
                                target: "halted",
                            },
                            CONNECTION_TIMEOUT: {
                                actions: "cleanupEventListeners",
                                description: "(timeout)",
                                target: "thisPeerInitilized",
                            },
                        },
                    },
                    waitingForReconnection: {
                        on: {
                            ON_DATACHANNEL_OPEN: {
                                actions: "stopReconnectCountdown",
                                target: "connected",
                            },
                            ON_RECONNECTION_TIMEOUT: {
                                actions: ["cleanupEventListeners", "sendParent_rovConnectionFailed", "showRovDisconnectedUi"],
                                target: "halted",
                            },
                            THIS_PEER_DESTROYED: {
                                actions: "cleanupEventListeners",
                                target: "thisPeerUninitilized",
                            },
                            DO_DISCONNECT: {
                                actions: "cleanupEventListeners",
                                target: "halted",
                            },
                        },
                    },
                    halted: {
                        on: {
                            DO_CONNECT: [
                                {
                                    cond: "thisPeerIsReady",
                                    target: "thisPeerInitilized",
                                },
                                {
                                    target: "thisPeerUninitilized",
                                },
                            ],
                        },
                    },
                },
            },
            {
                guards: {
                    'thisPeerIsReady': () => { return !!globalContext.thisPeer },
                    'peerErr=peer-unavailable': (_, event) => { return event.data.type === "peer-unavailable" },
                },
                actions: {
                    "showRovDisconnectedUi": () => { showROVDisconnectedUi() },
                    'sendParent_rovDatachannelOpen': () => { sendParentCallback("ROV_DATACHANNEL_OPEN") },
                    'sendParent_rovConnectionFailed': () => { sendParentCallback("ROV_CONNECTION_FAILED"); },
                    'connectToRov': () => {

                        // get the rovPeerId string by combining the end number and rov peer id base
                        const rovPeerId = ROV_PEERID_BASE + globalContext.rovPeerIdEndNumber

                        // connect to the rov
                        console.info("connecting to rov peer: " + rovPeerId)
                        showROVConnectingUi(rovPeerId);

                        const rovDataConnection = globalContext.rovDataConnection = globalContext.thisPeer.connect(rovPeerId, {
                            reliable: true,
                            serialization: 'none',
                        });

                        // setup the connection event listeners:
                        eventHandlers['onOpen'] = generateStateChangeFunction(sendEventToSelf, 'ON_DATACHANNEL_OPEN', null, () => { showToastMessage("Rov datachannel Open!"); });
                        rovDataConnection.on('open', eventHandlers['onOpen']);
                        eventHandlers['onError'] = generateStateChangeFunction(sendEventToSelf, 'ON_DATACHANNEL_ERROR', null, (err) => { console.warn("!!!UNHANDLED!! DATACHANNEL_ERROR:", err); });
                        rovDataConnection.on('error', eventHandlers['onError']);
                        eventHandlers['onClose'] = generateStateChangeFunction(sendEventToSelf, 'ON_DATACHANNEL_CLOSE', null, (event) => { console.warn("!!UNHANDLED!! DATACHANNEL_CLOSE:", event); });
                        rovDataConnection.on('close', eventHandlers['onClose']);
                        eventHandlers['onPeerError'] = generateStateChangeFunction(sendEventToSelf, 'ON_PEER_ERROR', null);
                        globalContext.thisPeer.on('error', eventHandlers['onPeerError']);

                        // setup a timeout in case the connection takes too long
                        globalContext.rovConnectionTimeout = setTimeout(() => {
                            sendEventToSelf('CONNECTION_TIMEOUT');
                        }, 8000); // 8 seconds
                    },
                    'cleanupEventListeners': () => {
                        MessageHandler.setSendMessageCallback(null);
                        clearInterval(globalContext.datachannelDisconnectCheckIntervalId);
                        clearInterval(globalContext.datachannelReconnectCountdown);
                        if (globalContext.stopPingLoop) globalContext.stopPingLoop();
                        if (globalContext.thisPeer) globalContext.thisPeer.off('error', eventHandlers['onPeerError']);
                        globalContext.rovDataConnection.off('open', eventHandlers['onOpen']);
                        globalContext.rovDataConnection.off('close', eventHandlers['onClose']);
                        globalContext.rovDataConnection.off('error', eventHandlers['onError']);
                        globalContext.rovDataConnection.off('data', eventHandlers['onData']);
                        globalContext.rovDataConnection.close();
                        globalContext.rovDataConnection = null;
                    },

                    "clearRovConnectionTimeout": () => {
                        clearTimeout(globalContext.rovConnectionTimeout);
                    },
                    'addDatachannelEventHandlers': () => {
                        showToastMessage("Connected to ROV!");
                        showROVConnectedUi();
                        const rovDataConnection = globalContext.rovDataConnection

                        // Handle sending messages to rov:
                        MessageHandler.globalContext = globalContext;
                        MessageHandler.setSendMessageCallback((message) => {
                            const encodedMessage = messageEncoder.encode(message);
                            rovDataConnection.send(encodedMessage);
                        });

                        // handle reciving messages from rov:
                        const dataMsgRecivedHandler = eventHandlers['onData'] = (encodedMessage) => {
                            const message = messageDecoder.decode(encodedMessage);
                            console.log("ROV_DATA_CHANNEL_DATA", message)
                            MessageHandler.handleRecivedMessage(message);
                        }; rovDataConnection.on('data', dataMsgRecivedHandler)

                        // Keep checking if the datachannel goes offline: (every half second (interval 500) check if the datachannel peer connection state is "disconnected")
                        globalContext.datachannelDisconnectCheckIntervalId = setInterval(() => {
                            const connectionState = rovDataConnection.peerConnection ? globalContext.rovDataConnection.peerConnection.iceConnectionState : "disconnected";
                            if (connectionState == "disconnected") sendEventToSelf("ON_DATACHANNEL_DISCONNECTED");
                        }, 500);

                        // finally tell the rov to begin sending us the video livestream:
                        MessageHandler.sendRovMessage({ action: "begin_video_stream" })

                        // start sending ping messages to the ROV (as a heartbeat signal & used for the net ping stat):
                        globalContext.stopPingLoop = RovActions.startPingMessageSenderLoop();
                    },
                    'startReconnectCountdown': () => {
                        const rovDataConnection = globalContext.rovDataConnection
                        var datachannelTimeoutCountdown = 10
                        var lastIceConnectionState = "disconnected"

                        if (globalContext.stopPingLoop) globalContext.stopPingLoop();

                        // every second (interval 1000) check if the datachannel peer connection is still disconnected
                        // if it's disconnected: count down a timeout counter, if it's still not connected after the timeout, then fire the DATACHANNEL_TIMEOUT event
                        // if it connects: reset the countdown.
                        globalContext.datachannelReconnectCountdown = setInterval(() => {
                            const connectionState = rovDataConnection.peerConnection ? rovDataConnection.peerConnection.iceConnectionState : "disconnected";
                            if (connectionState == "disconnected" && datachannelTimeoutCountdown > 0) {
                                datachannelTimeoutCountdown--;
                                showToastMessage("Waiting for ROV to Reconnect: " + datachannelTimeoutCountdown, 1000)

                            } else if (connectionState == "connected" && lastIceConnectionState != "connected") {
                                datachannelTimeoutCountdown = 10
                                showToastMessage("ROV Reconnected!", 2000)
                                sendEventToSelf("ON_DATACHANNEL_OPEN")
                            } else {
                                // If we have waited too long without the rov reconnecting
                                sendEventToSelf("ON_RECONNECTION_TIMEOUT")
                            }

                            lastIceConnectionState = connectionState
                        }, 1000);
                    },
                    'stopReconnectCountdown': () => {
                        clearInterval(globalContext.datachannelReconnectCountdown)
                    },
                    "debugReload": () => {
                        // var reloadCount = localStorage.getItem("reloadCount") || 0;
                        // console.log("reloadCount: ", reloadCount, reloadCount == -1);
                        // if (reloadCount == -1 || reloadCount > 8) {
                        // setTimeout(() => { localStorage.setItem("reloadCount", 0); window.location.reload() }, 1000);
                        // } else {
                        // reloadCount++;
                        // localStorage.setItem("reloadCount", reloadCount);
                        setTimeout(() => { window.location.reload() }, 10);
                        // }
                    },
                },
            });

    const runningMachine = interpret(rovConnectionMachine, { devTools: globalContext.debugXstateMode }).start();
    return runningMachine;
}

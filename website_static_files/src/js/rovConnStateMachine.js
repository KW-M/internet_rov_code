import { createMachine, assign, send, interpret } from "xstate";
import { pure } from "xstate/lib/actions";

import { showToastMessage, showROVDisconnectedUI, showROVConnectingUI, showROVConnectedUI, } from "./ui"

// import * from "./peerServerConn"

let current, game, squares, pieces, DeserializeBoard, SerializeBoard;

const machineFunctions = {
    actions: {
        showDisconnectedUi: () => { showROVDisconnectedUI() },
        showConnectingUi: () => { showROVConnectingUI() },
        showConnectedUi: () => { showROVConnectedUI() },
        showPeerServerConnectedNotice: () => { showToastMessage("Connected to Peerjs Server!") },
        showPeerServerDisconnectedNotice: () => { showToastMessage("Peerjs Server Disconnected!") },
        resetPeerConnectionTimeout: assign({
            peerConnectionTimeout: (context) => 0,
        }),
        incrementROVDisconnectedTimeout: assign({
            peerConnectionTimeout: (context) => context.peerConnectionTimeout + 1,
        }),
        setVideoStream: assign({
            videoStream: (context, event) => {
                event.data
            },
        }),
        closeDownMediaChannel: () => {
            console.log("closing media chnl");
        },
        closeDownDataChannel: () => {
            console.log("closing data chnl");
        },
        cleanupPeerServerConnection: assign({
            thisPeer: (context) => {
                if (context.thisPeer) context.thisPeer.destroy()
                return null;
            }
        })
    },
    services: {
        initPeerWithPeerjsServer: (context, event) => {
            // return new Promise((resolve, reject) => {
            //   peerServer.on("open", function (id) {
            //     resolve(peerServer);
            //   });
            //   peerServer.on("error", function (err) {
            //     reject(err);
            //   });
            // });

            return (callback) => {
                const peerServer = new Peer(null, context.peerServerConfig);

                callback("PEERJS_SERVER_CONNECTION_ESTABLISHED", peerServer);

                callback("PEERJS_SERVER_FATAL_ERROR");

                return () => {
                    console.log("closing down InitPeerWithPeerjsServer");
                };
            };
        },
        reconnectToPeerServer: (context, event) => {
            return (callback) => {
                setTimeout(() => {
                    if (Math.random() > 0.5)
                        callback("PEERJS_SERVER_CONNECTION_ESTABLISHED");
                    else callback("PEERJS_SERVER_CONNECTION_ERROR");
                }, 5000);
            };
        },
        waitForDataChannelDisconnect: (context, event) => {
            return (callback) => {
                setTimeout(() => {
                    if (Math.random() > 0.5) callback("DATACHANNEL_DISCONNECTED");
                    else callback("PEERJS_SERVER_DISCONNECTED");
                }, 5000);
            };
        },
        datachannelTimeoutCountdown: (context, event) => {
            return (callback) => {
                setTimeout(() => {
                    var num = Math.random();
                    if (num < 0.3) callback("DATACHANNEL_ESTABLISHED");
                    else if (num > 0.6) callback("DATACHANNEL_TIMEOUT");
                    else callback("PEERJS_SERVER_DISCONNECTED");
                }, 5000);
            };
        },
        awaitROVConnectBtnPress: (context, event) => {
            return (callback) => {
                setTimeout(() => {
                    callback("CONNECT_BUTTON_PRESSED");
                }, 5000);
            };
        },

        connectToRovPeer: (context, event) => {
            return (callback) => {
                setTimeout(() => {
                    var num = Math.random();
                    if (num < 0.3) callback("DATACHANNEL_ESTABLISHED");
                    else if (num > 0.6) callback("DATA_OR_MEDIA_CHANNEL_ERROR");
                    else callback("PEERJS_SERVER_DISCONNECTED");
                }, 5000);
            };
        },
        awaitMediaCall: (context, event) => {
            return (callback) => {
                setTimeout(() => {
                    var num = Math.random();
                    if (num < 0.3) callback("MEDIACHANNEL_ESTABLISHED");
                    else if (num > 0.6) callback("DATA_OR_MEDIA_CHANNEL_ERROR");
                    else callback("PEERJS_SERVER_DISCONNECTED");
                }, 9000);
            };
        },
    },
    guards: {
        ROVConnectionOpen: (context) => {
            return true;
        },
        PeerDisconnectedTimeout: (context) => {
            return context.peerConnectionTimeout > 5;
        },
        ROVConnectionBroken: (context) => {
            return true;
        },
        peerServerDisconnected: (context) => {
            return true; //context.peerServer.disconnected;
        },
        peerServerFatalError: (context) => {
            return true; //context.peerServer.destroyed;
        },
    },
}

export const runRovConnectionMachine = (siteInitMachineContext) => {
    // console.log(siteInitMachineContext) .rovIpAddr .peerServerConfig
    // const rovIp = siteInitMachineContext.rovIpAddr;
    const peerServerConfig = siteInitMachineContext.peerServerConfig;

    var rovConnectionMachine =
        /** @xstate-layout N4IgpgJg5mDOIC5QCUDyA1AwgewHa7AGMAXASzwDoA5bYgfR3yOMjoBVs6AFMMAJwBWsOgGV+AN34BiLgFFZyAFIjRC9AoaoqVWZjYBJLXVki2AQQBCAGX0iAErIAiiUAAdssUmTwuQAD0QADgAmAGYKAHZA0IiIgAYANgBOUIAWUITQgBoQAE9EVPiKQNTggFZAiKSARlSUirKAX0actCw8AhJyXGpaBg7mVg5uXkFhMT5JPhl5JRURNQ0AMTNzK2NkNGRfd09vXF8AhHiEiiSkqOqMsNDgqJz8hGroilDb1LKr8vSEsuDm1oYRidfYUYGDCDsTg8fhCUQSfgURwAQ2IyMwAAtkUwADa9eioVxgXBSRyrMyYOxmbSydYmczWWwOZxIEC7LzdQ6IZ6lSJxOJlJJhOKhMqxCIPRBlW5nEXVRKhIXyuJJAEgNrgrqUTUsSHDGFjeGTREotGY7EEPGOUiwQgDEiQUnkynUnR00yWGz2Jw7Dwcnyso61D4UVJxSplBWlOKpQKShBhsqvQKBOJRRXBTPBJJNFrqoH20E6obQ0ZwiZTJGo9FY3FIm12pgOiBO8wumnrAwAWVkqAAqmxfXtOYHuakQ2GI1HgjG43kpTKknKFUr+aq8xrC90wYWSyNYeMEXwq2ba5aKITia2KVSO3RHLZMFodHofaz2fsuU8SsE+QKhaEIpirE8Z3IEFAqoKyQ1IBSR1Gqm5NkWu56qWB5GpWXaQKQNYWmAeI0ASRIkj2D43q6tLGB6jLeiybh+p+o5POk1TFFcCQpjE0QfKk8YRPKEHnDxfzAQhBZIduxaofuhoVtID4iE+NJ6HQSxoF2dBtEO-oHExfzxtU1RVLKMbPM8KZGakYntBJ2ooVCMnlke150KgyB0KR+hmAwt5uhsWzaYxoBHCE4TprEiQpD82Tzt+4GRmKM7htUNTVMEgTWTq27IEQW64FAdDEGhsnOXICjKKoyDqO5SkvgYRj0p6TJvvRw4BsF3IRL+VxxNUYqFGmcrBPGCTpJE2YZGlQoRGUsaZVulA5Y2IKkPlhXFU5xrTGVcyVdVmm6M+uj1VQ-luYFI4dU8XUUD1fURAN8ShGloGBKcdTjqEgQVIkfUfPNtk9GYADuyIcmtbT9EhdAWAArsQRW4NwfBwLAUi1cdMMDmwRhcMgJgLHRbIMZd-iIPx3UzilX0cdKcEjaxwTsYZCRxGBtzNHmuDYBAcC+IhK2UIRUMgnuBqbVMF3tWTCCCuEZQJAkzxVHcUTpKBFwUJ8VxvM8YTRLmgI2YLPRSQ54uHltJ64XWwuXrprU6V+RnBKkZxlJ830pUu31lPG0q-hxvVvZUVyfADJs7khYtlpblamjb57WraKFSw7MtpREpzfb1XW1NmKRJK9STFKmCvpEK6VWRu4mR2b+qxxhJrVuadb22nX5M7ywSK7Nb3nP38ZhhEFC931Kb8YUgERBHzCSfZDfoXJx4J63lod0xaV-MUkYu-n5yKgZs1a5OMRwckbMzzXxtz3Z0fSRbTfHlhEA4Wv+H4q5xEb1dmfZ7vedSgHyLrFeISY+4pkqHUP4V8jZZTvqLB+jdl4UBfm-M8H927vhJtLIMedIiVASD3N6lloh8WqNnVmUQRQCmes9WeWpTYLw2nHREaDE74R-hncov4c57yAYXf2gRWIHxmgkdMbw5rX3gUw++5tkFHi4UGTM4E+GAILofWKwitb8V7vxJIyQKEMNBEtPKBUiqOVYXwJRBRhqxQLpERWbM-iszZmzYx24QZgzIBDDAItmAw3hojZGqMbEIEAuEFItQ0pGRiPEOxjx5SCgoGEUoMQe5s2SKEDx0sPykyDHOR4ABaQykQPYK0SK7UoVQ+qc0aEAA */
        createMachine(
            {
        context: {
                peerServerConfig: peerServerConfig,
            peerConnectionTimeout: 0,
            thisPeer: 0,
            dataChannel: 0,
            videoStream: 0,
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
              actions: "showPeerServerConnectedNotice",
              target: "#ROVConnection.Connected_To_Peerjs_Server",
          },
          PEERJS_SERVER_FATAL_ERROR: {
            actions: "cleanupPeerServerConnection",
                  target: "#ROVConnection.Not_Connected_To_Peerjs_Server",
              },
          },
      },
      Connected_To_Peerjs_Server: {
          type: "parallel",
          states: {
              DataChannel: {
              exit: "closeDownDataChanel",
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
                      },
                  },
              },
              Open: {
                entry: "showConnectedUi",
                invoke: {
                    src: "waitForDataChannelDisconnect",
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
                        "ROV Should Call the plot, and that should be hooked up to trigger MEDIACHANNEL_OPEN",
                    invoke: {
                        src: "awaitMediaCall",
                    },
                    on: {
                        MEDIACHANNEL_ESTABLISHED: {
                            target:
                                "#ROVConnection.Connected_To_Peerjs_Server.MediaChannel.Open",
                        },
                    },
                },
                Open: {
                    entry: "displayVideoStream",
                      },
                  },
              },
          },
          on: {
              DISCONNECT_FROM_ROV: {
                  target: "#ROVConnection.Awaiting_ROV_Connect_Button_Press",
              },
              DATA_OR_MEDIA_CHANNEL_ERROR: [
                  {
                      cond: "peerServerFatalError",
                      target: "#ROVConnection.Not_Connected_To_Peerjs_Server",
                  },
                  {
                      cond: "peerServerDisconnected",
                      target: "#ROVConnection.Reconnecting_to_Peerjs_Server",
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
              PEERJS_SERVER_RECONNECTION_ERROR: {
                  target: "#ROVConnection.Not_Connected_To_Peerjs_Server",
              },
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

    const rovConnectionService = interpret(rovConnectionMachine)
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
//             return (callback) => {
//                 setTimeout(() => {
//                     if (Math.random() > 0.5)
//                         callback("PEERJS_SERVER_CONNECTION_ESTABLISHED");
//                     else callback("PEERJS_SERVER_FATAL_ERROR");
//                 }, 5000);
//                 return () => {
//                     console.log("closing down InitPeerWithPeerjsServer");
//                 };
//             };
//         },
//         reconnectToPeerServer: (context, event) => {
//             return (callback) => {
//                 setTimeout(() => {
//                     if (Math.random() > 0.5)
//                         callback("PEERJS_SERVER_CONNECTION_ESTABLISHED");
//                     else callback("PEERJS_SERVER_CONNECTION_ERROR");
//                 }, 5000);
//             };
//         },
//         waitForDataChannelDisconnect: (context, event) => {
//             return (callback) => {
//                 setTimeout(() => {
//                     if (Math.random() > 0.5) callback("DATACHANNEL_DISCONNECTED");
//                     else callback("PEERJS_SERVER_DISCONNECTED");
//                 }, 5000);
//             };
//         },
//         datachannelTimeoutCountdown: (context, event) => {
//             return (callback) => {
//                 setTimeout(() => {
//                     var num = Math.random();
//                     if (num < 0.3) callback("DATACHANNEL_ESTABLISHED");
//                     else if (num > 0.6) callback("DATACHANNEL_TIMEOUT");
//                     else callback("PEERJS_SERVER_DISCONNECTED");
//                 }, 5000);
//             };
//         },
//         awaitROVConnectBtnPress: (context, event) => {
//             return (callback) => {
//                 setTimeout(() => {
//                     callback("CONNECT_BUTTON_PRESSED");
//                 }, 5000);
//             };
//         },

//         connectToRovPeer: (context, event) => {
//             return (callback) => {
//                 setTimeout(() => {
//                     var num = Math.random();
//                     if (num < 0.3) callback("DATACHANNEL_ESTABLISHED");
//                     else if (num > 0.6) callback("DATA_OR_MEDIA_CHANNEL_ERROR");
//                     else callback("PEERJS_SERVER_DISCONNECTED");
//                 }, 5000);
//             };
//         },
//         awaitMediaCall: (context, event) => {
//             return (callback) => {
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

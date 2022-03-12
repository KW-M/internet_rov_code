import { createMachine, assign, send, interpret } from "xstate";
import { pure } from "xstate/lib/actions";

import { isInternetAvailable } from "./util"
import { showToastMessage, showScanIpBtn, hideScanIpButton, showLoadingUi, hideLoadingUi } from "./ui";

import { peerServerCloudOptions, peerServerLocalOptions } from "./consts"
import { runRovConnectionMachine } from "./rovConnStateMachine";

export const runSiteInitMachine = () => {

  const machineContext = {
    peerServerConfig: {},
    rovIpAddr: "",
  };

  const machineFunctions = {
    actions: {
      setCloudPeerServerConfig: assign({
        peerServerConfig: peerServerCloudOptions,
      }),
      setLocalPeerServerConfig: assign({
        peerServerConfig: peerServerLocalOptions
      }),
      setRovIpAddr: assign({
        rovIpAddr: (context, event) => {
          console.log(event);
          return "192.168.1.1.11.1";
        },
      }),
      showIpScanButton: () => {
        showToastMessage("Click scan to find the ROV locally.");
        showToastMessage("No internet connection.");
        showScanIpBtn();
      },
      hideIpScanButton: () => {
        hideScanIpButton();
      },
      hideLoadingUi: () => {
        hideLoadingUi();
      },
      showIpScanningUi: () => {
        showLoadingUi("Scanning for ROV IP address...");
      },
      redirectBrowserToRovIp: (context, event) => {
        // window.location = "http://" + event.data
      },
      siteReady: (context, event) => {
        console.log(context)
        runRovConnectionMachine(context)
      }
      // showHttpGamepadSupportDisabledAlert: (context, event) => {

      // }

    },
    services: {
      checkInternetAvailable: (context, event) => {
        showLoadingUi("Checking internet connection...")
        return (callback, onReceive) => {

          // check if we are viewing this site at an IP ADDRESS or .local domain
          // indicating this page was served directly from the rov (presumably)
          const urlHostParts = window.location.host.split(".");
          if (
            (urlHostParts.length == 4 && parseInt(urlHostParts[3]) != NaN) ||
            (urlHostParts.length == 2 && urlHostParts[1] == "local")
          ) {
            callback("URL_IS_ROV_IP");
          } else {
            isInternetAvailable("https://" + peerServerCloudOptions.host).then((internetOnline) => {
              if (internetOnline) {
                callback("INTERNET_AVAILABLE");
              } else {
                callback("INTERNET_OFFLINE");
              }
            })
          }
        };
      },
      setupWaitForUserScanButtonPress: (context, event) => {
        return (callback, onReceive) => {
          const onBtnClick = () => {
            callback("SCAN_BUTTON_CLICKED");
          };

          // btnElem.addEventListener("click",onBtnClick)
          // setTimeout(() => {
          //   onBtnClick();
          // }, 3000);

          // cleanup function on state exit:
          return () => {
            // btnElem.removeEventListener("click",onBtnClick)
            // hideBtnElem()
          };
        };
      },
      scanForRovIP: (context, event) => {
        return (callback, onReceive) => {
          setTimeout(() => {
            callback({
              type: "ROV_IP_FOUND",
              data: "hids",
            });
          }, 3000);
        };
      },
    },
    guards: {},
  }

  const siteInitMachine = createMachine(
    {
      id: "siteInit",
      initial: "Checking_Internet_Access",
      context: machineContext,
      states: {
        Checking_Internet_Access: {
          invoke: {
            src: "checkInternetAvailable",
            id: "Check_Internet_Available",
          },
          on: {
            URL_IS_ROV_IP: {
              target: "#siteInit.Site_Ready",
              actions: ["setLocalPeerServerConfig", "showHttpGamepadSupportDisabledAlert"],
            },
            INTERNET_AVAILABLE: {
              target: "#siteInit.Site_Ready",
              actions: "setCloudPeerServerConfig",
            },
            INTERNET_OFFLINE: {
              target: "#siteInit.Waiting_For_User_Scan_Button_Press",
              actions: ["showIpScanButton", "hideLoadingUi"],
            },
          },
        },

        Waiting_For_User_Scan_Button_Press: {
          description:
            "We need this because of browser popup blocking w/o user interaction",
          invoke: {
            src: "setupWaitForUserScanButtonPress",
            id: "wait_for_scan_button_press",
          },
          on: {
            SCAN_BUTTON_CLICKED: {
              target: "#siteInit.Scanning_For_ROV_IP",
              actions: ["showIpScanningUi", "hideIpScanButton"],
            },
          },
        },
        Scanning_For_ROV_IP: {
          invoke: {
            src: "scanForRovIP",
            id: "scan_for_rov_ip_addr",
          },
          on: {
            ROV_IP_FOUND: {
              target: "#siteInit.Redirect_Browser_To_ROV_IP",
              actions: ["setRovIpAddr"],
            },
            IP_SCANNING_ERROR: {
              target: "#siteInit.Waiting_For_User_Scan_Button_Press",
              actions: ["showIpScanButton", "hideLoadingUi"],
            },
          },
        },
        Redirect_Browser_To_ROV_IP: {
          entry: "redirectBrowserToRovIp",
        },
        // Creating_Gamepad_Https_Iframe: {
        //   invoke: {
        //     src: "createGamepadHttpsIframe",
        //     id: "create_Gamepad_Https_Iframe",
        //   },
        //   description:
        //     "Needed because gamepad support only  works on secure sites (https), but the local ROV IP address site is not https",
        //   on: {
        //     GAMEPAD_IFRAME_LOADED: "#siteInit.Site_Ready",
        //     GAMEPAD_IFRAME_LOAD_ERROR: {
        //       target: "#siteInit.Site_Ready",
        //     },
        //   },
        // },
        Site_Ready: {
          type: "final",
          entry: ["siteReady"]
        },
      },
    }, machineFunctions);

  const siteInitService = interpret(siteInitMachine)
  siteInitService.start();
}

// const machineFunctionsMock = {
//   actions: {
//     setCloudPeerServerConfig: assign({
//       peerServerConfig: {
//         hi: "clound",
//       },
//     }),
//     setLocalPeerServerConfig: assign({
//       peerServerConfig: {
//         hi: "local",
//       },
//     }),
//     setRovIpAddr: assign({
//       rovIpAddr: (context, event) => {
//         console.log(event);
//         return "192.168.1.1.11.1";
//       },
//     }),
//     setGamepadOnscreenFallback: () => { },
//     redirectBrowserToRovIp: (context, event) => {
//       // window.location = "http://" + event.data
//     },
//   },
//   services: {
//     checkInternetAvailable: (context, event) => {
//       return (callback, onReceive) => {
//         // // check if we are viewing this site at an IP ADDRESS or .local domain
//         // // indicating this page was served directly from the rov (presumably)
//         // const urlHostParts = window.location.host.split(".");
//         // if (
//         //   (urlHostParts.length == 4 && parseInt(urlHostParts[3]) != NaN) ||
//         //   (urlHostParts.length == 2 && urlHostParts[1] == "local")
//         // ) {
//         //   callback("URL_IS_ROV_IP");
//         // } else {
//         // checkInternetAvailable().then(()=>{
//         //   callback("INTERNET_AVAILABLE");
//         // }).catch((e)=>{
//         //   console.warn("Internet Offline, starting switch to local mode", e)
//         //   callback("INTERNET_OFFLINE");
//         // })
//         // }

//         setTimeout(() => {
//           callback("URL_IS_ROV_IP");
//           // INTERNET_OFFLINE
//           // URL_IS_ROV_IP
//         }, 3000);
//       };
//     },
//     setupWaitForUserScanButtonPress: (context, event) => {
//       return (callback, onReceive) => {
//         const onBtnClick = () => {
//           callback("SCAN_BUTTON_CLICKED");
//         };
//         // btnElem = makeButtonElem()
//         // btnElem.addEventListener("click",onBtnClick)
//         setTimeout(() => {
//           onBtnClick();
//         }, 3000);

//         // cleanup function on state exit:
//         return () => {
//           // btnElem.removeEventListener("click",onBtnClick)
//           // hideBtnElem()
//         };
//       };
//     },
//     scanForRovIP: (context, event) => {
//       return (callback, onReceive) => {
//         setTimeout(() => {
//           callback({
//             type: "ROV_IP_FOUND",
//             data: "hids",
//           });
//         }, 3000);
//       };
//     },
//     createGamepadHttpsIframe: (context, event) => {
//       return (callback, onReceive) => {
//         setTimeout(() => {
//           // callback("GAMEPAD_IFRAME_LOADED");
//           callback("GAMEPAD_IFRAME_LOAD_ERROR");
//         }, 3000);
//       };
//     },
//   },
//   guards: {},
// }
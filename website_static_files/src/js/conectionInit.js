import { createMachine, assign, send, interpret } from "xstate";
import { pure } from "xstate/lib/actions";

let current, game, squares, pieces, DeserializeBoard, SerializeBoard;

var siteInitMachine = createMachine({
    id: "siteInit",
    initial: "Checking_Internet_Access",
    context: {
      peerServerConfig: {},
      rovIpAddr: "",
    },
    states: {
      Checking_Internet_Access: {
        invoke: {
          src: "checkInternetAvailable",
          id: "Check_Internet_Available",
        },
        on: {
          URL_IS_ROV_IP: {
            target: "#siteInit.Creating_Gamepad_Https_Iframe",
            actions: "setLocalPeerServerConfig",
          },
          INTERNET_AVAILABLE: {
            target: "#siteInit.Site_Ready",
            actions: "setCloudPeerServerConfig",
          },
          INTERNET_OFFLINE: {
            target:
              "#siteInit.Waiting_For_User_Scan_Button_Press",
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
            target:
              "#siteInit.Waiting_For_User_Scan_Button_Press",
          },
        },
      },
      Redirect_Browser_To_ROV_IP: {
        entry: "redirectBrowserToRovIp",
      },
      Creating_Gamepad_Https_Iframe: {
        invoke: {
          src: "createGamepadHttpsIframe",
          id: "create_Gamepad_Https_Iframe",
        },
        description:
          "Needed because gamepad support only  works on secure sites (https), but the local ROV IP address site is not https",
        on: {
          GAMEPAD_IFRAME_LOADED: "#siteInit.Site_Ready",
          GAMEPAD_IFRAME_LOAD_ERROR: {
            target: "#siteInit.Site_Ready",
            actions: ["setGamepadOnscreenFallback"]
          }
        },
      },
      Site_Ready: {
        type: "final",
      },
    },
  },
  {
    actions: {
      setCloudPeerServerConfig: assign({
        peerServerConfig: {
          hi: "clound",
        },
      }),
      setLocalPeerServerConfig: assign({
        peerServerConfig: {
          hi: "local",
        },
      }),
      setRovIpAddr: assign({
        rovIpAddr: (context, event) => {
          console.log(event);
          return "192.168.1.1.11.1";
        },
      }),
      setGamepadOnscreenFallback: ()=>{
        
      },
      redirectBrowserToRovIp: (context, event) => {
        // window.location = "http://" + event.data
      },
    },
    services: {
      checkInternetAvailable: (context, event) => {
        return (callback, onReceive) => {
          // // check if we are viewing this site at an IP ADDRESS or .local domain
          // // indicating this page was served directly from the rov (presumably)
          // const urlHostParts = window.location.host.split(".");
          // if (
          //   (urlHostParts.length == 4 && parseInt(urlHostParts[3]) != NaN) ||
          //   (urlHostParts.length == 2 && urlHostParts[1] == "local")
          // ) {
          //   callback("URL_IS_ROV_IP");
          // } else {
          // checkInternetAvailable().then(()=>{
          //   callback("INTERNET_AVAILABLE");
          // }).catch((e)=>{
          //   console.warn("Internet Offline, starting switch to local mode", e)
          //   callback("INTERNET_OFFLINE");
          // })
          // }

          setTimeout(() => {
            callback("URL_IS_ROV_IP");
            // INTERNET_OFFLINE
            // URL_IS_ROV_IP
          }, 3000);
        };
      },
      setupWaitForUserScanButtonPress: (context, event) => {
        return (callback, onReceive) => {
          const onBtnClick = () => {
            callback("SCAN_BUTTON_CLICKED");
          };
          // btnElem = makeButtonElem()
          // btnElem.addEventListener("click",onBtnClick)
          setTimeout(() => {
            onBtnClick();
          }, 3000);

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
      createGamepadHttpsIframe: (context, event) => {
        return (callback, onReceive) => {
          setTimeout(() => {
            // callback("GAMEPAD_IFRAME_LOADED");
            // callback("GAMEPAD_IFRAME_LOAD_ERROR")
          }, 3000);
        };
      },
    },
    guards: {},
  }
);

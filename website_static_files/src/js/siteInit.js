import { createMachine, interpret } from "xstate";

import { isInternetAvailable } from "./util"
import { showToastMessage, showScanIpBtn, hideScanIpButton, showLoadingUi, hideLoadingUi } from "./ui";

import * as consts from "./consts";
// import { runRovConnectionMachine } from "./rovConnStateMachine";

export const runSiteInitMachine = (globalContext, sendParentCallback) => {
  const siteInitMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5SwJYBcwEkB26B0AwgBZgDGA1itlAPo4YBO2YaNAgqaXLAMQCqAJQAydAMo0BAeQBqdAAqJQABwD2qNChXZFIAB6IATAFYADHgBsADhMBOACxGAzOYCMJgw-MAaEAE9ELgDslnhGdo5GLkYGLpZGToEGAL5JPupYuGiEJBRUtPRgTCzsnNw8mAByACoAogIVNVXs0myYQmwAQkI1OqrqmtpIeoaWdhbBdpaBto52NoE2Rj7+CEY2eIEuLnYm0Zb2Jnbmiylp6Bn4xGSU1HTYjMysHFywvJW19Y00kgBiP0KVHpDProAY6fQIAC0bkCeH2LnMBlGNkO5kCdjsy0MYTwzhsCKCNkcBhMpOSqRA6Rw+AA6gBDUG3H4qBg0PiwQo0USkOnYGgdACuaDQWhocgYZVEBDYFX5fCqVUksoIAIIAGkagARXpqUFacGIRwmELxayRAyOBEGFGBLEIRyBWGORyWIIOywWzaWU6U87UrLc3m4JksiQyeQ8KSyTByGg-SR8Cra4G6jT6oYQzYuXGuWbBSxoozmbx+Q2TOGLV2k2ymGzeilUzJ4QPYYO0ZmsqMRmNc6UVCqVADiNDqUgEOv66dAEMt5jhLiNro8RkSBnRduic5MrhcdecrsRjhSFOwKggcB0jcuORu+XuhUeJRe8BTk8G08QkJJjjhTncxhMS0rQMO04jwOwoniaZAIxI1zB9K8snpRl21DdlORbfkhRFPlxW4Cc9XfYYoRJMYkU2YxFxdBFHDtOxjFCAxEUCWYbCYlxjAQv0mxbNs41DLsYwItMiIhIwCw2dx0RibZLDkyw6OOPAEUmaJJg8XcbC4jB-TwARIBQCVSFYDoGBUAB3DlWSqFQw2jBRX0Ig0EHMSJcTWTYbCsUxZhLFYDCYvATAXSiPXCRwbCJbSLgDc4JDAOkIBWZRUzBDNEGLMZTECcTAlcgsLSWUsEHmPA2I9FcPGCIkjwbbj0GEtKPxIpE8HIji-0sajzFo4roR-YxHTy45xN3fZyRSIA */
    createMachine({
      context: {
        peerServerConfig: {},
        rovIpAddr: null,
      },
      id: "siteInit",
      initial: "Checking_Internet_Access",
      states: {
        Checking_Internet_Access: {
          invoke: {
            src: "checkInternetAvailable",
            id: "Check_Internet_Available",
          },
          on: {
            URL_IS_ROV_IP: {
              actions: [
                "setLocalPeerServerConfig",
                "showHttpGamepadSupportDisabledAlert",
              ],
              target: "#siteInit.Site_Ready",
            },
            INTERNET_AVAILABLE: {
              actions: "setCloudPeerServerConfig",
              target: "#siteInit.Site_Ready",
            },
            INTERNET_OFFLINE: {
              actions: ["showIpScanButton", "hideLoadingUi"],
              target: "#siteInit.Waiting_For_User_Scan_Button_Press",
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
              actions: ["showIpScanningUi", "hideIpScanButton"],
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
              actions: "setRovIpAddr",
              target: "#siteInit.Redirect_Browser_To_ROV_IP",
            },
            IP_SCANNING_ERROR: {
              actions: ["showIpScanButton", "hideLoadingUi"],
              target: "#siteInit.Waiting_For_User_Scan_Button_Press",
            },
          },
        },
        Redirect_Browser_To_ROV_IP: {
          entry: "redirectBrowserToRovIp",
        },
        Site_Ready: {
          entry: "siteReady",
          type: "final",
        },
      },
    }, {
      actions: {
        setCloudPeerServerConfig: () => {
          globalContext.peerServerConfig = consts.peerServerCloudOptions;
        },
        setLocalPeerServerConfig: () => {
          globalContext.peerServerConfig = consts.peerServerLocalOptions;
        },
        setRovIpAddr: (_, event) => {
          globalContext.rovIpAddr = event.data;
        },
        showIpScanButton: () => {
          showToastMessage("Click scan to find the ROV locally.");
          showToastMessage("No internet connection.");
          showScanIpBtn();
        },
        hideIpScanButton: () => {
          hideScanIpButton();
        },
        hideLoadingUi: () => {
          hideLoadingUi("ip-scan");
          hideLoadingUi("internet-check");
        },
        showIpScanningUi: () => {
          showLoadingUi("ip-scan");
        },
        redirectBrowserToRovIp: (_, event) => {
          window.location = "http://" + event.data
        },
        siteReady: () => { sendParentCallback("SITE_READY") },
      },
      services: {
        checkInternetAvailable: () => {
          showLoadingUi("internet-check")
          return (callback) => {
            const config = consts.peerServerCloudOptions;
            isInternetAvailable((config.secure ? "https://" : "http://") + config.host + ":" + config.port).then((internetOnline) => {
              if (internetOnline) {
                callback("INTERNET_AVAILABLE");
              } else {
                // INTERNET OFFLINE
                // check if we are viewing this site at an IP ADDRESS or .local domain
                // indicating this page was served directly from the rov (presumably)
                const urlHostParts = window.location.host.split(".");
                if (
                  (urlHostParts.length == 4 && !isNaN(urlHostParts[3])) ||
                  (urlHostParts.length == 2 && urlHostParts[1] == "local")
                ) {
                  // in which case we are viewing this site at the rov's ip (presumably)
                  callback("URL_IS_ROV_IP");
                } else {
                  // otherwise the internet is just offline
                  callback("INTERNET_OFFLINE");
                }
              }
            })
            // }
          };
        },
        setupWaitForUserScanButtonPress: () => {
          return (callback) => {
            showScanIpBtn();

            const onBtnClick = () => {
              callback("SCAN_BUTTON_CLICKED");
            };

            const btnElem = document.getElementById("scan_for_ip_btn");
            btnElem.addEventListener("click", onBtnClick);

            // cleanup function on state exit:
            return () => {
              btnElem.removeEventListener("click", onBtnClick)
              // hideBtnElem()
            };
          };
        },
        scanForRovIP: () => {
          return () => {
            showLoadingUi("ip-scan")
            // setTimeout(() => {
            // hideLoadingUi()
            //   callback({
            //     type: "ROV_IP_FOUND",
            //     data: "UHhh the ip address man!",
            //   });
            // }, 3000);
          };
        },
      },
      guards: {},
    });


  const runningMachine = interpret(siteInitMachine, { devTools: globalContext.debugXstateMode }).start();
  return runningMachine;
}

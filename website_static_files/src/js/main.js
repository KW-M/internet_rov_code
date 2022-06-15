import { ROV_PEERID_BASE } from "./consts.js";
import { inspect } from "@xstate/inspect";
import { GamepadController } from "./gamepad.js";
import { getURLQueryStringVariable } from "./util.js";
import { hideLoadingUi, setCurrentRovName, setupConnectBtnClickHandler, setupDisconnectBtnClickHandler, setupSwitchRovBtnClickHandlers, showROVDisconnectedUi, showToastMessage } from "./ui.js";

let globalContext = {
    debugXstateMode: !!getURLQueryStringVariable("debug"),
    peerServerConfig: {},
    rovIpAddr: "",
    rovPeerIdEndNumber: parseInt(localStorage.getItem("rovPeerIdEndNumber") || 0),
    attemptingNewRovPeerId: false,
    thisPeer: null,
}

/* init gamepad support */
globalContext.gpadCtrl = new GamepadController();

// Show the rov name in the ui:
setCurrentRovName(ROV_PEERID_BASE + globalContext.rovPeerIdEndNumber);

// Show the xstate inspector if the debug query string is present
if (globalContext.debugXstateMode) {
    inspect({
        iframe: false,
    });
}

// import { stop } from "xstate/lib/actions";
import { runSiteInitMachine } from "./siteInit";
import { startRovConnectionMachine } from "./rovConnectionMachine";
import { startThisPeerSetupMachine } from "./thisPeerSetupMachine.js";
import { startRovMediaChannelMachine } from "./rovMediaChannelMachine";


runSiteInitMachine(globalContext, (eventName) => {
    hideLoadingUi("internet-check");
    console.log("siteInit: ", eventName);

    const RovMediaChannelMachine = startRovMediaChannelMachine(globalContext);

    const RovConnectionMachine = startRovConnectionMachine(globalContext, (eventName) => {
        console.log("rovConnectionMachine: ", eventName);
        if (eventName === "ROV_CONNECTION_FAILED") {
            showToastMessage("ROV Connection Failed");
            showROVDisconnectedUi();
        } else if (eventName === "ROV_DATACHANNEL_OPEN") {
            RovMediaChannelMachine.send("ROV_CONNECTION_READY");
        }
    })

    const ThisPeerSetupMachine = startThisPeerSetupMachine(globalContext, (eventName) => {
        console.log("ThisPeerSetupMachine: ", eventName);
        RovConnectionMachine.send(eventName); // EventName WILL BE EITHER: "THIS_PEER_DESTROYED", "THIS_PEER_READY";
    });

    setupConnectBtnClickHandler(() => {
        RovConnectionMachine.send("DO_CONNECT");
    });

    setupDisconnectBtnClickHandler(() => {
        RovConnectionMachine.send("DO_DISCONNECT");
        RovMediaChannelMachine.send("DO_DISCONNECT");
    });

    const switchToNextRovPeerId = () => {
        globalContext.rovPeerIdEndNumber++;
        setCurrentRovName(ROV_PEERID_BASE + globalContext.rovPeerIdEndNumber);
        localStorage.setItem("rovPeerIdEndNumber", globalContext.rovPeerIdEndNumber);
        RovConnectionMachine.send("DO_DISCONNECT");
        RovMediaChannelMachine.send("DO_DISCONNECT");
        // RovConnectionMachine.send("DO_CONNECT");
    }
    const switchToPrevRovPeerId = () => {
        globalContext.rovPeerIdEndNumber = Math.max(0, globalContext.rovPeerIdEndNumber - 1);
        setCurrentRovName(ROV_PEERID_BASE + globalContext.rovPeerIdEndNumber);
        localStorage.setItem("rovPeerIdEndNumber", globalContext.rovPeerIdEndNumber);
        RovConnectionMachine.send("DO_DISCONNECT");
        RovMediaChannelMachine.send("DO_DISCONNECT");
        // RovConnectionMachine.send("DO_CONNECT");
    }
    setupSwitchRovBtnClickHandlers(switchToPrevRovPeerId, switchToNextRovPeerId);
})

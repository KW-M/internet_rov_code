import Toastify from 'toastify-js'
import { isArray } from 'xstate/lib/utils';
import { LOADING_MESSAGES } from './consts';

// -------------------------------------------------------------
// ------ UI Stuff ---------------------------------------------
// -------------------------------------------------------------

// ----- Simple Element Generators -----

export function createButtons(btnNames, callback) {
    return btnNames.map((btnName) => {
        const btn = document.createElement("button")
        btn.innerHTML = btnName;
        btn.dataset.name = btnName;
        btn.addEventListener("click", () => callback(btnName));
        return btn
    })
}

export function createTitle(titleName) {
    const msg = document.createElement("h4")
    msg.innerText = titleName
    return msg
}

// -----  White Backdrop -----

const backdrop = document.getElementById("backdrop")
let backdropClickCallback = null
export function showBackdrop(callback) {
    backdrop.classList.remove("hidden")
    backdropClickCallback = function () {
        if (callback) callback(null)
        hideBackdrop()
    }
    backdrop.addEventListener("click", backdropClickCallback)
}

export function hideBackdrop() {
    backdrop.classList.add("hidden")
    backdrop.removeEventListener("click", backdropClickCallback)
}

// -----  Toast Notifications -----

export function showToastMessage(message, durration, callback) {
    return Toastify({
        text: message,
        duration: durration || 5000,
        close: true,
        // className: "dialog-toast",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        onClick: callback, // Callback export function when toast is clicked
    }).showToast();
}

// -----  Toastify Based Dialogs -----

export function showToastDialog(htmlElements, options, exraClassNames) {
    const toast = Toastify(Object.assign({
        text: " ",
        duration: 15000,
        close: false,
        className: "dialog-toast",
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
    }, options)).showToast();

    htmlElements.forEach((e) => {
        console.log(e)
        toast.toastElement.appendChild(e)
    })
    if (exraClassNames && isArray(exraClassNames)) exraClassNames.forEach((name) => { toast.toastElement.classList.add(name) })
    return toast;
}

export function showPasswordPrompt(message, callback) {
    let toast = null
    const title = createTitle(message)
    const input = document.createElement("input")
    input.type = "password"
    input.placeholder = "Password"
    const btns = createButtons(["Ok", "Cancel"], (chosenButton) => {
        hideBackdrop()
        toast.hideToast()
        if (callback && chosenButton == "Ok") callback(input.value)
        else if (callback) callback(null)
    })
    toast = showToastDialog([title, input].concat(btns), { gravity: "bottom", duration: -1 }, ["password-prompt"])
    showBackdrop(() => {
        toast.hideToast()
        hideBackdrop()
        if (callback) callback(null)
    })
    return toast
}

export function showScrollableTextPopup(title, callback) {
    let toast = null
    const titleElm = createTitle(title)
    const content = document.createElement("pre")
    const closeFunc = () => {
        toast.hideToast()
        hideBackdrop()
        if (callback) callback(null)
    }
    const btns = createButtons(["Close"], closeFunc)
    toast = showToastDialog([titleElm, content].concat(btns), { gravity: "bottom", duration: -1 }, ["scrollable-text-popup"])
    showBackdrop(closeFunc)
    return (textLine) => {
        content.appendChild(document.createTextNode(textLine))
        // keep scrolling down as new content is added (unless the user has scrolled up / is no longer at the bottom)
        if (content.scrollTop + content.clientHeight + 100 > content.scrollHeight) {
            content.scrollTop = content.scrollHeight
        }
    }
}


export function showChoiceDialog(title, buttons, callback) {
    let toast = null
    const titleElm = createTitle(title)
    const closeFunc = () => {
        hideBackdrop()
        toast.hideToast()
    }
    const btns = createButtons([...buttons, "Cancel"], (chosenButton) => {
        console.log("here")
        closeFunc()
        callback(chosenButton);
    })
    toast = showToastDialog([titleElm].concat(btns), { gravity: "bottom", duration: -1 }, ["choice-popup"]);
    showBackdrop(closeFunc)
    return toast
}

const connectBtn = document.getElementById('connect_btn');
const disconnectBtn = document.getElementById('disconnect_btn');
const connectedRovLabel = document.getElementById('connected_rov_label');
const rovConnectionBar = document.getElementById('rov_connection_bar');
export function showROVDisconnectedUi() {
    connectBtn.style.display = 'block';
    disconnectBtn.style.display = 'none';
    hideLoadingUi("all")
    showRovConnectionBar();
}

export function showROVConnectingUi(rovPeerId) {
    connectBtn.style.display = 'none';
    showLoadingUi("webrtc-connecting", "Searching for " + rovPeerId);
    hideRovConnectionBar();
}

export function showROVConnectedUi() {
    connectBtn.style.display = 'none';
    disconnectBtn.style.display = 'block';
    hideLoadingUi("webrtc-connecting")
    hideLoadingUi("webrtc-reconnecting")
    showRovConnectionBar();
}

export function showReloadingWebsiteUi() {
    connectBtn.style.display = 'none';
    disconnectBtn.style.display = 'none';
    connectedRovLabel.parentElement.parentElement.classList.add('hidden')
    showLoadingUi("reloading-site");
}

export function hideRovConnectionBar() {
    rovConnectionBar.classList.add('hidden')
}

export function showRovConnectionBar() {
    rovConnectionBar.classList.remove('hidden')
}

export function setCurrentRovName(name) {
    connectBtn.innerText = "Connect to " + name;
    connectedRovLabel.innerText = name
}

export function setupConnectBtnClickHandler(callback) {
    connectBtn.addEventListener('click', callback);
    return () => { // cleanup function
        connectBtn.removeEventListener('click', callback);
    }
}

export function setupDisconnectBtnClickHandler(callback) {
    disconnectBtn.addEventListener('click', callback);
    return () => { // cleanup function
        disconnectBtn.removeEventListener('click', callback);
    }
}


const switchToPrevRovBtn = document.getElementById('switch_to_prev_rov_btn');
const switchToNextRovBtn = document.getElementById('switch_to_next_rov_btn');
export function setupSwitchRovBtnClickHandlers(prevRovCallback, nextRovCallback) {
    switchToPrevRovBtn.addEventListener('click', prevRovCallback);
    switchToNextRovBtn.addEventListener('click', nextRovCallback);
    return () => { // cleanup function
        switchToPrevRovBtn.removeEventListener('click', prevRovCallback);
        switchToNextRovBtn.removeEventListener('click', nextRovCallback);
    }
}

export function showScanIpBtn() {
    document.getElementById("scan_for_ip_btn").style.display = "block";
}

export function hideScanIpButton() {
    document.getElementById("scan_for_ip_btn").style.display = "none";
}

const loadingIndicator = document.getElementById("site_loading_indicator")
const loadingIndicatorText = document.getElementById("site_loading_text")
let loadingStack = {};
export function showLoadingUi(loadingMsgId, loadingMessage) {
    const message = loadingStack[loadingMsgId] = loadingMessage || LOADING_MESSAGES[loadingMsgId] || LOADING_MESSAGES["default"];
    loadingIndicator.style.display = 'block';
    loadingIndicatorText.innerHTML = message;

}

export function hideLoadingUi(loadingMsgId) {

    // remove the loading message from the stack
    delete loadingStack[loadingMsgId]

    // if there are no more messages in the stack, hide the loading indicator, otherwise show the top message
    const loadingStackIds = Object.keys(loadingStack);
    if (loadingMsgId == "all" || loadingStackIds.length == 0) {
        loadingIndicator.style.display = 'none';
        loadingStack = {};
        console.log("here", loadingMsgId)
    } else {
        const msg = loadingStack[loadingStackIds[loadingStackIds.length - 1]]
        loadingIndicatorText.innerHTML = msg || LOADING_MESSAGES["default"];
    }
}

const livestreamContainer = document.getElementById("livestream_container")
export function showLivestreamUi() {
    livestreamContainer.style.display = 'block';
}

export function hideLivestreamUi() {
    livestreamContainer.style.display = 'none';
}

const clientPeerIdLabel = document.getElementById("client_peer_id_label")
export function setClientPeerIdDisplay(clientPeerId) {
    clientPeerIdLabel.innerText = clientPeerId
}

const roleDisplayText = document.getElementById('role_display_text');
const takeControlButton = document.getElementById('take_control_btn');
export function updateRoleDisplay(isPilot) {
    roleDisplayText.innerText = isPilot ? "Pilot" : "Spectator";
    if (isPilot) {
        takeControlButton.classList.add('hidden')
    } else {
        takeControlButton.classList.remove('hidden')
    }
}

var pingDisplay = document.getElementById('ping_value');
export function updatePingDisplay(pingTimeMs) {
    pingDisplay.innerText = pingTimeMs;
}

var battDisplay = document.getElementById('battery_value');
export function updateBatteryDisplay(batteryVolts, batteryPercent) {
    battDisplay.innerText = batteryVolts + 'V (' + batteryPercent + '%)';
}

var pressureDisplay = document.getElementById('pressure_value');
var tempDisplay = document.getElementById('temp_value');
export function updateDisplayedSensorValues(sensorValues) {
    pressureDisplay.innerText = sensorValues.pressure;
    tempDisplay.innerText = sensorValues.temp;
}


/***** COMPASS AND ORIENTATION RELATED UI *******/

// https://codepen.io/fueru/pen/JjjoXez
var compassDisc = document.getElementById("compassDiscImg");
const compassOffset = 135;
export function setCompassHeading(headingDeg) {
    var totalDir = -(headingDeg + compassOffset);

    // document.getElementById("direction").innerHTML = "dir: " + Math.ceil(dir) + " + offset(" + offset + ") = " + Math.ceil(totalDir);
    compassDisc.style.transform = `translateX(${totalDir}px)`;
}

const gradientArtificialHorizonBackground = document.body//getElementById("artificial_horizon_gradient");
export function setArtificialHorizonBackground(roll, pitch) {
    var vShift = Math.min(Math.max(pitch, -90), 90) / 90 * 100;
    gradientArtificialHorizonBackground.style.backgroundImage = `linear-gradient(${roll}deg, rgba(2,0,36,1) ${-100 + vShift}%, rgba(9,88,116,1) ${50 + vShift}%, rgba(10,109,140,1) ${50 + vShift}%, rgba(0,255,235,1) ${200 + vShift}%)`;
}

// FOR DEBUGGING COMPASS:
// document.addEventListener("DOMContentLoaded", function () {
//     if (window.DeviceOrientationEvent) {
//         window.addEventListener('deviceorientation', function (eventData) {
//             // gamma: Tilting the device from left to right. Tilting the device to the right will result in a positive value.
//             // var tiltLR = eventData.gamma;

//             // beta: Tilting the device from the front to the back. Tilting the device to the front will result in a positive value.
//             var tiltFB = eventData.beta;
//             // this.document.getElementById("rov_connection_bar").innerHTML = "tiltLR: " + tiltLR + " tiltFB: " + (tiltFB - 90);

//             // alpha: The direction the compass of the device aims to in degrees.
//             var dir = eventData.alpha
//             setArtificialHorizonBackground(dir, -tiltFB);
//             // Call the function to use the data on the page.
//             setCompassHeading(dir);
//         }, false);
//     }
//     setArtificialHorizonBackground(0, 0);
// });

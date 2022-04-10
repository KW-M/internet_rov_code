import Toastify from 'toastify-js'

// -------------------------------------------------------------
// ------ UI Stuff ---------------------------------------------
// -------------------------------------------------------------

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

export function showToastDialog(message, durration, btnName, callback) {
    const toastContent = document.createElement("div")
    toastContent.innerHTML = message
    if (btnName) {
        const btn = document.createElement("button")
        btn.innerHTML = btnName;
        btn.addEventListener("click", callback);
        toastContent.appendChild(btn)
    }
    return Toastify({
        node: toastContent,
        duration: durration || 15000,
        close: btnName != false,
        className: "dialog-toast",
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
    }).showToast();
}

export function showChoiceDialog(message, buttons, callback) {
    const toastContent = document.createElement("div")
    toastContent.innerHTML = message
    buttons.forEach(button => {
        const btn = document.createElement("button")
        btn.innerHTML = button.name;
        btn.addEventListener("click", () => {

            callback(button.value)
        })
        toastContent.appendChild(btn)
    })
    return Toastify({
        node: toastContent,
        duration: 0,
        close: true,
        className: "dialog-toast",
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
    }).showToast();
}

const connectBtn = document.getElementById('connect_btn');
const disconnectBtn = document.getElementById('disconnect_btn');
const connectedRovLabel = document.getElementById('connected_rov_label');
export function showROVDisconnectedUi() {
    connectBtn.style.display = 'block';
    disconnectBtn.style.display = 'none';
    connectedRovLabel.parentElement.parentElement.classList.add('hidden')
    connectedRovLabel.innerText = 'None';
    hideLoadingUi()
}

export function showROVConnectingUi() {
    connectBtn.style.display = 'none';
    connectedRovLabel.parentElement.parentElement.classList.add('hidden')
    showLoadingUi("Searching for ROV...");
}

export function showROVConnectedUi(rovName) {
    connectBtn.style.display = 'none';
    disconnectBtn.style.display = 'block';
    connectedRovLabel.parentElement.parentElement.classList.remove('hidden')
    if (rovName) connectedRovLabel.innerText = rovName
    hideLoadingUi()
}

export function showReloadingWebsiteUi() {
    connectBtn.style.display = 'none';
    disconnectBtn.style.display = 'none';
    connectedRovLabel.parentElement.parentElement.classList.add('hidden')
    showLoadingUi("Reloading Page...");
}

export function setupConnectBtnClickHandler(callback) {
    connectBtn.addEventListener('click', callback);
    return () => { // cleanup function
        connectBtn.removeEventListener('click', callback);
    }
}

export function setupDisconnectBtnClickHandler(callback) {
    connectBtn.addEventListener('click', callback);
    return () => { // cleanup function
        connectBtn.removeEventListener('click', callback);
    }
}

const connectedRovButton = document.getElementById('connected_rov_indicator_btn');
export function setupSwitchRovBtnClickHandler(callback) {
    connectedRovButton.addEventListener('click', callback);
    return () => { // cleanup function
        connectedRovButton.removeEventListener('click', callback);
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
export function showLoadingUi(loadingMessage) {
    loadingIndicator.style.display = 'block';
    loadingIndicatorText.innerHTML = loadingMessage;
}

export function hideLoadingUi() {
    loadingIndicator.style.display = 'none';
}

const livestreamContainer = document.getElementById("livestream_container")
export function showLivestreamUi() {
    livestreamContainer.style.display = 'block';
}

export function hideLivestreamUi() {
    livestreamContainer.style.display = 'none';
}

var roleDisplayText = document.getElementById('role_display_text');
var takeControlButton = document.getElementById('take_control_btn');
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
//             // this.document.getElementById("connected_rov_display").innerHTML = "tiltLR: " + tiltLR + " tiltFB: " + (tiltFB - 90);

//             // alpha: The direction the compass of the device aims to in degrees.
//             var dir = eventData.alpha
//             setArtificialHorizonBackground(dir, -tiltFB);
//             // Call the function to use the data on the page.
//             setCompassHeading(dir);
//         }, false);
//     }
//     setArtificialHorizonBackground(0, 0);
// });

// import "toastify-js/src/toastify.css"
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

const connectBtn = document.getElementById('connect_btn');
const disconnectBtn = document.getElementById('disconnect_btn');
export function showROVDisconnectedUI() {
    connectBtn.style.display = 'block';
    disconnectBtn.style.display = 'none';
    hideLoadingUi()
}

export function showROVConnectingUI() {
    connectBtn.style.display = 'none';
    showLoadingUi("Connecting to ROV...");
}

export function showROVConnectedUI() {
    connectBtn.style.display = 'none';
    disconnectBtn.style.display = 'block';
    hideLoadingUi()
}

export function setupConnectBtnClickHandler(callback) {
    connectBtn.addEventListener('click', callback);
    return cleanupFunc = () => {
        connectBtn.removeEventListener('click', callback);
    }
}

export function setupDisconnectBtnClickHandler(callback) {
    connectBtn.addEventListener('click', callback);
    return cleanupFunc = () => {
        connectBtn.removeEventListener('click', callback);
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

var connectionDisplay = document.getElementById('connection_display');
export function updateConnectionDisplay(rovPeerId, isPilot) {
    pingDisplay.innerText = pingTimeMs;
    connectionDisplay.innerText = `Connected to: ${rovPeerId} | Your Role: ${isPilot ? "Pilot" : "Spectator"}`;
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

// https://codepen.io/fueru/pen/JjjoXez
var compassDisc = document.getElementById("compassDiscImg");
const compassOffset = 135;
export function setCompassHeading(headingDeg) {
    var totalDir = -(headingDeg + compassOffset);

    // document.getElementById("direction").innerHTML = "dir: " + Math.ceil(dir) + " + offset(" + offset + ") = " + Math.ceil(totalDir);
    compassDisc.style.transform = `translateX(${totalDir}px)`;
};

// FOR DEBUGGING COMPASS:
document.addEventListener("DOMContentLoaded", function (event) {
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function (eventData) {
            // gamma: Tilting the device from left to right. Tilting the device to the right will result in a positive value.
            var tiltLR = eventData.gamma;

            // beta: Tilting the device from the front to the back. Tilting the device to the front will result in a positive value.
            var tiltFB = eventData.beta;

            // alpha: The direction the compass of the device aims to in degrees.
            var dir = eventData.alpha

            // Call the function to use the data on the page.
            setCompassHeading(dir);
        }, false);
    }
});
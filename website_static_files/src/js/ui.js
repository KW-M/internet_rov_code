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


export function setupConnectBtnClickHandler(callback) {
    connectBtn.addEventListener('click', function () {
        connectBtn.removeEventListener('click', this);
        callback();
    });
}

export function setupConnectDisconnectButtonEvents(connectCallback, disconnectCallback) {

    connectBtn.addEventListener('click', (e) => {
        connectCallback(e);
        showROVConnectedUI()
    }, false);

    disconnectBtn.addEventListener('click', (e) => {
        disconnectCallback(e);
        showROVDisconnectedUI()
    }, false);
}
// import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'

// -------------------------------------------------------------
// ------ UI Stuff ---------------------------------------------
// -------------------------------------------------------------

export function showToastMessage(message, durration, callback) {
    Toastify({
        text: message,
        duration: durration || 5000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        onClick: callback, // Callback export function when toast is clicked
    }).showToast();
}

export function showToastDialog(message, durration, btnName, callback) {
    const toastContent = document.createElement("div")
    toastContent.innerHTML = message
    const btn =  document.createElement("button")
    btn.innerHTML = btnName;
    toastContent.appendChild(btn)
    Toastify({
        node: toastContent,
        duration: durration || 15000,
        close: true,
        className: "dialog-toast",
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
    }).showToast();
}

export function showROVDisconnectedUI() {
    connectBtn.style.display = 'block';
    disconnectBtn.style.display = 'none';
}

export function showROVConnectingUI() {
    connectBtn.disabled = true;
    showToastMessage("Connecting...")
 }

export function showROVConnectedUI() {
    connectBtn.style.display = 'none';
    disconnectBtn.style.display = 'block';
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

var connectBtn, disconnectBtn;
export function setupConnectDisconnectButtonEvents(connectCallback, disconnectCallback) {
    connectBtn = document.getElementById('connect_btn');
    disconnectBtn = document.getElementById('disconnect_btn');

    connectBtn.addEventListener('click', (e) => {
        connectCallback(e);
        showROVConnectedUI()
    }, false);

    disconnectBtn.addEventListener('click', (e) => {
        disconnectCallback(e);
        showROVDisconnectedUI()
    }, false);
}
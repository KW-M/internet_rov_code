// -------------------------------------------------------------
// ------ UI Stuff ---------------------------------------------
// -------------------------------------------------------------

function showToastMessage(message, callback) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        onClick: callback, // Callback function when toast is clicked
    }).showToast();
}

function showROVDisconnectedUI() {
    connectBtn.style.display = 'block';
    disconnectBtn.style.display = 'none';
}

function showROVConnectedUI() {
    connectBtn.style.display = 'none';
    disconnectBtn.style.display = 'block';
}

var pingDisplay = document.getElementById('ping_value');
function updatePingDisplay(pingTimeMs) {
    pingDisplay.innerText = pingTimeMs;
}

var battDisplay = document.getElementById('battery_value');
function updateBatteryDisplay(batteryVolts, batteryPercent) {
    battDisplay.innerText = batteryVolts + 'V (' + batteryPercent + '%)';
}

var pressureDisplay = document.getElementById('pressure_value');
var tempDisplay = document.getElementById('temp_value');
function updateDisplayedSensorValues(sensorValues) {
    pressureDisplay.innerText = sensorValues.pressure;
    tempDisplay.innerText = sensorValues.temp;
}



function setPingDisplay(sensorName, sensorValue) {
    connectBtn.style.display = 'none';
    disconnectBtn.style.display = 'block';
}


var connectBtn, disconnectBtn;
function setupConnectDisconnectButtonEvents(connectCallback, disconnectCallback) {
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
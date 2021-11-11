
// -------------------------------------------------------------
// ------ UI Stuff ---------------------------------------------
// -------------------------------------------------------------

function showToastMessage(message) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
    }).showToast();
}

// -------------------------------------------------------------
// ------ Real Time Connection / Socket / webRTC stuff ---------
// ------------------------------------------------------------

var signalObj = null;
var isStreaming = false;
var startBtn = document.getElementById('start');
var stopBtn = document.getElementById('stop');
var video = document.getElementById('video-livestream');

function getDefaultSignallingServerURL() {
    // Let's get a default address for the signalling server
    var signalling_server_hostname = location.hostname || "192.168.2.2";
    var signalling_server_address = signalling_server_hostname;// ':' + (location.port || (location.protocol === 'https:' ? 443 : 80)
    var protocol = location.protocol === "https:" ? "wss:" : "ws:";
    address = protocol + '//' + signalling_server_address + '/stream/webrtc';
    return address;
}

var datachannel, localdatachannel;
function startVideoStream(webSocketURL) {
    if (!isStreaming) {
        console.log("Attempting connection using websocket url:", webSocketURL)
        signalObj = new signal(webSocketURL,
            function (stream) {
                console.log('got a stream!');
                //var url = window.URL || window.webkitURL;
                //video.src = url ? url.createObjectURL(stream) : stream; // deprecated
                video.srcObject = stream;
                video.play();
            },
            function (error) {
                // this function runs when there is an error with the socket (or webrtc?) connection
                console.error("Socket (or webrtc?) connection error:", error)
                alert("Socket (or webrtc?) connection error! See js console for details.");
            },
            function () {
                // this function runs when the websocket closes
                showToastMessage('websocket closed. bye bye!');
                video.srcObject = null;
                isStreaming = false;
                startVideoStream(window.prompt("Can't determine signalling server websocket url (normally wss://<host>:<port>/stream/webrtc where <host> is the url or ip and port is the port", webSocketURL));
            },
            function (message) {
                alert("Got Websocket Message: " + message);
            },
            function (dataChannelEvent) {
                console.log("onDataChannel()");
                datachannel = dataChannelEvent.channel;

                dataChannelEvent.channel.onopen = function () {
                    console.log("Data Channel is open!");
                    // document.getElementById('datachannels').disabled = false;
                };

                dataChannelEvent.channel.onerror = function (error) {
                    console.error("Data Channel Error:", error);
                };

                dataChannelEvent.channel.onmessage = function (event) {
                    console.log("Got Data Channel Message:", event.data);
                    // document.getElementById('datareceived').value = event.data;
                };

                dataChannelEvent.channel.onclose = function () {
                    datachannel = null;
                    // document.getElementById('datachannels').disabled = true;
                    console.log("The Data Channel is Closed");
                };
            }

        );
        // when the driver/user closes their browser window, we need tell the pi to end the webrtc & socket connections
        // so "before" the window/tab/browser is "unloaded" (closed), hang up.
        window.onbeforeunload = () => signalObj.hangup();
    }
}

// window.addEventListener('DOMContentLoaded', () => { startVideoStream(getDefaultSignallingServerURL()) }, false);
startBtn.addEventListener('click', () => { startVideoStream(getDefaultSignallingServerURL()) }, false);

stopBtn.addEventListener('click', function (e) {
    if (signalObj) {
        console.log(signalObj)
        // signalObj.hangup();
        // signalObj = null;
        // isStreaming = false;

    }
}, false);

// Wait until the video stream can play
video.addEventListener('canplay', function (e) {
    if (!isStreaming) {
        isStreaming = true;
    }
}, false);

// Wait for the video to start to play
// video.addEventListener('play', function () {
//     // this was in a checking loop, here for reference:
//     if (video.paused || video.ended) return;
// }, false);
function clamp(number, max, min) {
    return Math.max(Math.min(number, max), min)
}

function calculateMotorSpeeds(axes) {
    var left = axes[1], right = axes[1] // first set both forward facing thrusters to the left vertical joystick vertical axis
    left = left - axes[0] // subtract the turn amount of left vertical joystick horizontal axis from the left motor
    right += axes[0] // and add the turn from amount left vertical joystick horizontal axis to the right motor
    return {
        left: clamp(left, -1, 1),
        right: clamp(right, -1, 1),
        strafe: axes[2],
        vertical: axes[3]
    }
}


// -----------------------------------------------------
// ------------ Gamepad Related ------------------------
// -----------------------------------------------------


initilizeGamepadInterface({

    handleGamepadConnected: function (device) {
        // a new gamepad connected
        console.log('Gamepad Connected:', device);
        document.getElementById("connect-notice").style.display = "none";
        showToastMessage("Gamepad Connected")
        // startVideoStream(getDefaultSignallingServerURL())
    },

    handleGamepadDisconnected: function (device) {
        // gamepad disconnected
        console.log('Gamepad Disconnected:', device);
        document.getElementById("connect-notice").style.display = "block";
    },

    handleGamepadStateChange: function (gamepadState, stateChangesMask) {
        // console.log(gamepadState, stateChangesMask)

        var updatesPacket = {}

        if (stateChangesMask.buttonsDidChange) {
            for (let i = 0; i < gamepadState.buttons.length; i++) {
                if (stateChangesMask.changedButtons[i] != true) continue;
                if (gamepadState.buttons[i].value >= 0.2)
                    showToastMessage(`Button ${i} pressed`); // [${this.GAME_CONTROLLER_BUTTONS[i].btnName}]
                else
                    showToastMessage(`Button ${i} released`);
            }
        }

        if (stateChangesMask.axesDidChange) updatesPacket.motors = calculateMotorSpeeds(gamepadState.axes)

        // send the data packet object as a json string if the webrtc data channel is ready and has
        if (datachannel && Object.keys(updatesPacket).length > 0) datachannel.send(JSON.stringify(updatesPacket));
        console.log(JSON.stringify(updatesPacket))

        // gamepadState.LEFT_STICK_X, gamepadState.LEFT_STICK_Y
        // let axisDebug1 = document.getElementById("axis-debug-1")
        // axisDebug1.style.left = gamepadState.LEFT_STICK_X * 50 + 50
        // axisDebug1.style.bottom = gamepadState.LEFT_STICK_y * 50 + 50
        // let axisDebug2 = document.getElementById("axis-debug-2")
        // axisDebug1.style.left = gamepadState.RIGHT_STICK_X * 50 + 50
        // axisDebug1.style.bottom = gamepadState.RIGHT_STICK_y * 50 + 50
    }

})



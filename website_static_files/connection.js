// -------------------------------------------------------------
// ------ Real Time Connection / Socket / webRTC stuff ---------
// ------------------------------------------------------------

var signalObj = null;
var isStreaming = false;
var videoElem = document.getElementById('video-livestream');

function getDefaultSignallingServerURL() {
    // Let's get a default address for the signalling server
    var signalling_server_hostname = location.hostname || "192.168.2.2";
    var signalling_server_address = signalling_server_hostname;// ':' + (location.port || (location.protocol === 'https:' ? 443 : 80)
    var protocol = location.protocol === "https:" ? "wss:" : "ws:";
    address = protocol + '//' + signalling_server_address + '/stream/webrtc';
    return address;
}

function setupVideoDisplay(stream) {
    // Wait until the video stream can play to say we're streaming
    videoElem.addEventListener('canplay', function canPlayHandler(e) {
        if (!isStreaming) {
            isStreaming = true;
        }
        videoElem.removeEventListener('canplay', canPlayHandler);
    }, false);

    // set the video element to show the webrtc stream.
    videoElem.srcObject = stream;
    videoElem.play();
}

var dataChannel;
function connectToROV(signallingWebsocketURL, dataChannelMessageRecievedCallback, rovConnectedCallback) {
    if (!isStreaming) {
        console.log("Attempting connection using websocket url:", signallingWebsocketURL)
        signalObj = new signal(signallingWebsocketURL,
            function (stream) {
                showToastMessage("Got a Video Stream!");
                console.log('Got a video stream!', stream);
                setupVideoDisplay(stream);
            },
            function (error) {
                // this function runs when there is an error with the socket (or webrtc?) connection
                console.error("Socket (or webrtc?) connection error:", error)
                alert("Socket (or webrtc?) connection error! See js console for details.");
            },
            function () {
                // this function runs when the websocket closes
                videoElem.srcObject = null;
                isStreaming = false;
                showROVDisconnectedUI();
                showToastMessage("Signalling Websocket Closed! Click me to try a different server address.", () => {
                    webSocketUrl = window.prompt("Click Ok to reconnect. If you know the signalling server websocket url, enter it here (normally wss://<host>:<port>/stream/webrtc where <host> is the url or ip and port is the port", signallingWebsocketURL);
                    connectToROV(webSocketUrl, dataChannelMessageRecievedCallback, rovConnectedCallback);
                });
            },
            function (message) {
                alert("Got Websocket Message: " + message);
            },
            function (dataChannelEvent) {
                dataChannel = dataChannelEvent.channel;
                dataChannel.onopen = function () {
                    showToastMessage("Data Channel is open!");
                    rovConnectedCallback();
                };

                dataChannel.onerror = function (error) {
                    console.error("Data Channel Error:", error);
                    signalObj.hangup();
                    showROVDisconnectedUI();
                    showToastMessage("Data Channel Error:" + error);
                };

                dataChannel.onmessage = function (event) {
                    console.log("Got Data Channel Message:", event.data);
                    dataChannelMessageRecievedCallback(event.data);
                };

                dataChannel.onclose = function () {
                    dataChannel = null;
                    signalObj.hangup();
                    showROVDisconnectedUI();
                    showToastMessage("Data Channel is Closed");
                };
            }

        );

        // when the user closes their browser window, we need tell the pi to end the webrtc & socket connections
        // so "before" the window/tab/browser is "unloaded" (closed), hang up.
        window.onbeforeunload = () => signalObj.hangup();
    }
}

function sendMessageToROV(message) {
    if (dataChannel) {
        dataChannel.send(message);
    }
}
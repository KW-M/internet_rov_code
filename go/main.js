

// check if stuff is supported
if (peerjs.util.supports.audioVideo === false || peerjs.util.supports.data === false || peerjs.util.supports.binary === false || peerjs.util.supports.reliable === false) {
    alert('Your browser does not support some WebRTC features, please use a different or newer browser.');
}

var encoder = new TextEncoder();// always utf-8
var decoder = new TextDecoder();// always utf-8

// FOR A PEERJS SERVER RUNNING IN THE CLOUD (Heroku, but could also be peerjs cloud or elsewhere)
var peerServerCloudOptions = {
    host: '0.peerjs.com',
    secure: true,
    path: '/',
    port: 443,
}

// FOR A PEERJS SERVER RUNNING ON THE ROV:
var peerServerLocalOptions = {
    host: 'raspberrypi.local',
    path: '/',
    secure: false,
    port: 9000,
}

function checkInternetConnection() {
    // try to connect to our peerjs server in the "cloud"
    console.info("Checking Internet Connection...")
    return fetch("https://" + peerServerCloudOptions.host + peerServerCloudOptions.path).then((response) => {
        return response.ok
    })
}

//https://dmitripavlutin.com/timeout-fetch-request/
async function fetchWithTimeout(url, options = {}) {
    const { timeout = 5000 } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(url, {
        ...options,
        signal: controller.signal
    });
    clearTimeout(id);
    return response;
}

var rovLocalIp = null
function findRovLocalIp() {
    // try to brute force search for raspberrypi's ip address
    console.info("Searching for raspberrypi local ip address...")
    currentThirdOctet = 0
    function testIp(ipAddress) {
        return fetchWithTimeout("http://" + ipAddress).then((response) => {
            if (response.ok) {
                console.info("Found Local IP: ", ipAddress)
                return rovLocalIp
            } else {
                console.info("got ip search not ok:", response)
                currentThirdOctet = (currentThirdOctet + 1) % 255
                return testIp("192.168." + currentThirdOctet + ".88")
            }
        }).catch((error) => {
            console.info("got ip search error:", error)
            currentThirdOctet = (currentThirdOctet + 1) % 255
            return testIp("192.168." + currentThirdOctet + ".88")
        })
    }
    testIp("192.168." + currentThirdOctet + ".88").then((localIp) => {
        rovLocalIp = localIp;
        console.info("ROV IP FOUND! " + rovLocalIp)
    })
}


function reliablyConnectToPeerjsServer() {
    // Using promises as a loop to avoid stack overflow: https://stackoverflow.com/questions/50421769/recursive-promises-can-cause-stack-overflow

    console.log("starting...");
    var peer = new Peer();

    peer.on('open', function (id) {
        console.log("Connection to peerjs server established! our PeerID:", realPeerId);

    });
    peer.on('error', function (err) {
        console.log('Self Peerjs Error: ', err);
    });
    peer.on('disconnected', function () {
        console.log('Self Peerjs disconnected.');
        console.log("attempting to reconnect to peerjs server ..")
        peer.reconnect(); // not a function
    });
    peer.on('close', function () {
        console.log('Self Peerjs connection closed.');
    });
}

var rovDataConnection = null;
var rovVideoConnection = null;
function reliablyConnectToROV(peerId) {
    // Using promises as a loop to avoid stack overflow when reconnecting https://stackoverflow.com/questions/50421769/recursive-promises-can-cause-stack-overflow
    return new Promise(function (resolve, reject) {
        rovDataConnection = peer.connect(peerId, {
            reliable: true,
            serialization: 'none',
        });
        rovDataConnection.on('open', function () {
            console.log("Connection to peerjs server established! our PeerID:", realPeerId);
            // Receive messages
            rovDataConnection.on('data', function (data) {
                data = decoder.decode(data);
                console.log("Received: ", data);
                document.body.appendChild(document.createTextNode(String(data)));
            });
        });
        rovDataConnection.on('error', function (err) {
            console.log('Remote Peerjs Error: ', err);
        });
        rovDataConnection.on('disconnected', function () {
            console.log('Remote Peerjs disconnected.');
            console.log("attempting to reconnect to rov peer ..")
            rovDataConnection.reconnect();
        });
        rovDataConnection.on('close', function () {
            console.log('Remote Peerjs connection closed.');
        });
        peer.on('call', function (call) {
            rovVideoConnection = call;
            console.log('Received video call from: ' + call.peer, call);
            call.answer(null, {
                // sdpTransform: function (sdp) {
                //     console.log('answer sdp: ', sdp);
                //     return sdp;
                // }
            });
            call.on('stream', function (remoteStream) {
                console.log('Received stream from: ' + call.peer, remoteStream);
                var video = document.getElementById('livestream');
                // video.src = URL.createObjectURL(remoteStream);
                video.srcObject = remoteStream;
                video.autoplay = true
                video.controls = true
                // video.play();
            });
        });
    }).then(function () {
        // the resolve() callback in the promise function above should get called whenever there is an error connecting to the rov peer, where we should try to reconnect,
        // the reject() callback in the promise function above should get called whenever there is an error connecting to the peerjs server, where this function should exit and let the outer function take over,
        // our strange way of looping in order to avoid call stack overflow / memory leak if this loop runs too much
        return reliablyConnectToROV(peerId)
    })
}

function setupEventListeners(params) {
    window.addEventListener('keypress', () => {
        if (rovDataConnection == null || rovDataConnection.open == false) {
            alert("No connection to ROV");
        } else {
            var msg = window.prompt("Message:");
            rovDataConnection.send(encoder.encode(msg));
        }
    });
    document.getElementById("connect_btn").addEventListener('click', () => {
        if (rovDataConnection != null) rovDataConnection.close()
        var remotePeerId = window.prompt("Remote Peer ID", "SSROV_0");
        connectToPeer(remotePeerId);
    });
}
setupEventListeners();


// peer.on('connection', function (dataChannel) {
//     console.log("connection from: ", dataChannel);
//     dataChannel.on('open', function () {
//         console.log("dataChannel open: ", dataChannel);
//         dataChannel.send('Hello from pilot!');
//     });

//     dataChannel.on('data', function (data) {
//         console.log('Received', data);
//     });

//     dataChannel.on('close', function () {
//         console.log('Remote Peerjs connection closed.');
//     });

//     dataChannel.on('error', function (err) {
//         console.log('Remote Peerjs Error: ', err);
//     });
// });




    // setTimeout(function () {
    //     navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    //     navigator.getUserMedia({ video: true, audio: true }, function (stream) {
    //         var call = peer.call('SROV', stream);
    //         call.on('stream', function (remoteStream) {
    //             var video = document.getElementById('livestream');
    //             video.src = URL.createObjectURL(remoteStream);
    //             video.play();
    //         });
    //     }, function (err) {
    //         console.log('Failed to get local stream', err);
    //     });
    // }, 1000);


// check if stuff is supported
if (peerjs.util.supports.audioVideo === false || peerjs.util.supports.data === false || peerjs.util.supports.binary === false || peerjs.util.supports.reliable === false) {
    alert('Your browser does not support some WebRTC features, please use a different or newer browser.');
}

console.log("starting...");
var peer = new Peer({
    debug: 3,

    // // FOR CLOUD HOSTED PEERJS SERVER
    host: '0.peerjs.com',
    secure: true,
    path: '/',
    port: 443,

	// // FOR ROV HOSTED PEERJS SERVER:
    // host: 'raspberrypi.local',
    // path: '/',
    // secure: false,
    // port: 9000,

});
console.log("Created peer:", peer);
peer.on('open', function (id) {
    console.log('My peer ID is: ' + id);
    setupEventListeners();
});
peer.on('error', function (err) {
    console.log('Self Peerjs Error: ', err);
});
peer.on('disconnected', function () {
    console.log('Self Peerjs disconnected.');
});
peer.on('close', function () {
    console.log('Self Peerjs connection closed.');
});

var rovConnection = null;
function connectToPeer(peerId) {
    rovConnection = peer.connect(peerId, {
        reliable: true,
        serialization: 'none',
    });
    console.log("Connecting to: ", rovConnection);
    rovConnection.on('open', function () {
        console.log("Connected to: ", rovConnection);
        // Receive messages
        rovConnection.on('data', function (data) {
            document.body.appendChild(document.createTextNode(string(data)));
        });
    });
    rovConnection.on('error', function (err) {
        console.log('Remote Peerjs Error: ', err);
    });
    rovConnection.on('disconnected', function () {
        console.log('Remote Peerjs disconnected.');
        while (true) {
            rovConnection.reconnect();
        }
    });
    rovConnection.on('close', function () {
        console.log('Remote Peerjs connection closed.');
        rovConnection != null
    });
    peer.on('call', function (call) {
        console.log('Received video call from: ' + call.peer, call);
        call.answer(null, {
            sdpTransform: function (sdp) {
                console.log('answer sdp: ', sdp);
                return sdp;
            }
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
}

var enc = new TextEncoder();// always utf-8
function setupEventListeners(params) {
    window.addEventListener('keypress', () => {
        if (rovConnection == null || rovConnection.open == false) {
            alert("No connection to ROV");
        } else {
            var msg = window.prompt("Message:");
            rovConnection.send(enc.encode(msg));
        }
    });
    document.body.addEventListener('click', () => {
        if (rovConnection != null) rovConnection.close()
        var remotePeerId = window.prompt("Remote Peer ID", "SSROV_0");
        connectToPeer(remotePeerId);
    });
}


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
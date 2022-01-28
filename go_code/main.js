

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


console.log("starting...");
var peer = new Peer({
    debug: 3,

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
    console.log("attempting to reconnect to peerjs server ..")
    rovDataConnection.reconnect();
});
peer.on('close', function () {
    console.log('Self Peerjs connection closed.');
});

var rovDataConnection = null;
function connectToPeer(peerId) {
    rovDataConnection = peer.connect(peerId, {
        reliable: true,
        serialization: 'none',
    });
    console.log("Connecting to: ", rovDataConnection);
    rovDataConnection.on('open', function () {
        console.log("Connected to: ", rovDataConnection);
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

console.log("starting...");
var peer = new Peer('SPilot', {
    // host: '0.peerjs.com',
    // secure: true,
    // path: '/',
    // port: 443,
    host: 'raspberrypi.local',
    path: '/',
    secure: false,
    port: 9000,
    debug: 3
});
console.log("created peer:", peer);

peer.on('open', function (id) {
    console.log('My peer ID is: ' + id);
    conn = peer.connect('SROV', {
        reliable: true,
        serialization: 'none',
        metadata: { message: 'hi i am spilot' }
    });

    console.log("connecting to: ", conn);
    conn.on('open', function () {
        console.log("connected to: ", conn);
        // Receive messages
        conn.on('data', function (data) {
            console.log('Received', data);
        });

        // Send messages
        conn.send('Hello from pilot!');
    });

    conn.on('error', function (err) {
        console.log('Remote Peerjs Error: ', err);
    });

    conn.on('disconnected', function () {
        console.log('Remote Peerjs disconnected.');
    });

    conn.on('close', function () {
        console.log('Remote Peerjs connection closed.');
    });

    setTimeout(function () {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        navigator.getUserMedia({ video: true, audio: true }, function (stream) {
            var call = peer.call('SROV', stream);
            call.on('stream', function (remoteStream) {
                var video = document.getElementById('livestream');
                video.src = URL.createObjectURL(remoteStream);
                video.play();
            });
        }, function (err) {
            console.log('Failed to get local stream', err);
        });
    }, 1000);
});

peer.on('connection', function (dataChannel) {
    console.log("connection from: ", dataChannel);
    dataChannel.on('open', function () {
        console.log("dataChannel open: ", dataChannel);
        dataChannel.send('Hello from pilot!');
    });

    dataChannel.on('data', function (data) {
        console.log('Received', data);
    });

    dataChannel.on('close', function () {
        console.log('Remote Peerjs connection closed.');
    });

    dataChannel.on('error', function (err) {
        console.log('Remote Peerjs Error: ', err);
    });
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

peer.on('call', function (call) {
    console.log('Received call from: ' + call.peer, call);
    call.answer(null, {
        sdpTransform: function (sdp) {
            console.log('answer sdp: ', sdp);
            return sdp;
        }
    });
    call.on('stream', function (remoteStream) {
        var video = document.getElementById('livestream');
        video.src = URL.createObjectURL(remoteStream);
        video.play();
    });
});

window.addEventListener('keypress', () => {
    var remotePeerId = window.prompt("Remote Peer ID", "SROV")
    console.log("keypress,connecting to remote peer", remotePeerId);
    var conn = peer.connect(remotePeerId);
    conn.on('open', function () {
        // Receive messages
        conn.on('data', function (data) {
            console.log('Received', data);
        });
        // Send messages
        setInterval(() => conn.send('Hello!'), 1000)
    });
});





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

var thisPeer = null
var remotePeerId = null
var peerServerOption = peerServerCloudOptions;
var peerId = "SSROV_0"
function connectToPeerServer(reconnect, abortConnection) {

    console.log("Connecting to peerjs server...", peerServerOption);
    thisPeer = new Peer(peerServerOption);

    thisPeer.on('open', function (realPeerId) {
        console.log("Connection to peerjs server established! our PeerID:", realPeerId);
        reliablyConnectToROV(remotePeerId)
    });
    thisPeer.on('call', function (call) {
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
            video.controls = false
            video.play();
        });
    });
    thisPeer.on('error', function (err) {
        try {
            if (err.type == 'browser-incompatible') {
                alert('Your browser does not support some WebRTC features, please use a different or newer browser.');
                abortConnection()
            } else if (err.type == "peer-unavailable" && thisPeer.open) console.info("Peer unavailable")
            else {
                console.warn('Self Peerjs Error: ', err);
                reconnect() //loop back and try again
            }
        } catch (e) {
            console.error(e)
            reconnect()
        }
    });
    thisPeer.on('disconnected', function () {
        console.log('Self Peerjs disconnected.');
        console.log("attempting to reconnect to peerjs server ..")
        thisPeer.reconnect(); // not a function
    });
    thisPeer.on('close', function () {
        console.log('Self Peerjs connection closed.');
        reconnect()
    });
}

function reliablyConnectToPeerServer() {
    // Using promises as a loop to avoid stack overflow: https://stackoverflow.com/questions/50421769/recursive-promises-can-cause-stack-overflow
    return new Promise(connectToPeerServer).then(() => {
        console.log("this peer resolve", thisPeer)
        // the resolve() callback in the promise function above should get called whenever there is an error connecting to the rov peer, where we should try to reconnect,
        // the reject() callback in the promise function above should get called whenever there is an error connecting to the peerjs server, where this function should exit and let the outer function take over,
        // our strange way of looping in order to avoid call stack overflow / memory leak if this loop runs too much
        return reliablyConnectToPeerjsServer()
    }).catch((e) => {

    })
}


function reliablyConnectToROV() {
    // Using promises as a loop to avoid stack overflow when reconnecting https://stackoverflow.com/questions/50421769/recursive-promises-can-cause-stack-overflow
    return new Promise(connectToRov).then(() => {
        console.log("remote peer resolve", thisPeer)
        // the resolve() callback in the promise function above should get called whenever there is an error connecting to the rov peer, where we should try to reconnect,
        // the reject() callback in the promise function above should get called whenever there is an error connecting to the peerjs server, where this function should exit and let the outer function take over,
        // our strange way of looping in order to avoid call stack overflow / memory leak if this loop runs too much
        if (thisPeer == null || thisPeer.closed) return;
        return reliablyConnectToROV()
    }).catch(() => {
        try {
            if (rovDataConnection) rovDataConnection.close();
            if (rovVideoConnection) rovVideoConnection.close();
        } catch (e) {
            console.warn("Error Closing rov Data Or Media connection: ", e)
        }
    })
}

var rovDataConnection = null;
var rovVideoConnection = null;
var intervalCheck = null

// this is meant to be used as a new promise callback and is NOT used in the normal way, it is part of the loop in connect to rov reliably, and resolves on errors
function connectToRov(reconnect, abortConnection) {
    rovDataConnection = thisPeer.connect(peerId, {
        reliable: true,
        serialization: 'none',
    });
    rovDataConnection.on('open', function () {
        console.info("ROV Data Channel Is OPEN!")
        // Receive messages
        rovDataConnection.on('data', function (data) {
            data = decoder.decode(data);
            console.log("Received: ", data);
            document.body.appendChild(document.createTextNode(String(data)));
        });

        // setInterval(() => {
        //     console.info("DC Active", rovDataConnection.peerConnection)
        // }, 1000)
    });
    rovDataConnection.on('error', function (err) {
        console.dir('Remote Peerjs Error: ', err);
        reconnect()
    });
    thisPeer.on('error', function (err) {
        if (err.type == "peer-unavailable" && thisPeer.open) reconnect() //loop back and try again
        else abortConnection(err)
    })
    rovDataConnection.on('disconnected', function () {
        console.log('Remote Peerjs disconnected.');
        console.log("attempting to reconnect to rov peer ..")
        try {
            rovDataConnection.close()
            rovVideoConnection.close()
        } catch (e) {
            console.warn("error closing peer: ", e)
        }
        reconnect()
    });
    rovDataConnection.on('close', function () {
        console.log('Remote Peerjs connection closed.');
        try {
            rovDataConnection.close()
            rovVideoConnection.close()
        } catch (e) {
            console.warn("error closing peer: ", e)
        }
        reconnect()
    });
}

function reliablyConnectToROV(peerId) {
    // Using promises as a loop to avoid stack overflow when reconnecting https://stackoverflow.com/questions/50421769/recursive-promises-can-cause-stack-overflow
    return new Promise(connectToRov).then(() => {
        console.log("remote peer resolve", thisPeer)
        // the resolve() callback in the promise function above should get called whenever there is an error connecting to the rov peer, where we should try to reconnect,
        // the reject() callback in the promise function above should get called whenever there is an error connecting to the peerjs server, where this function should exit and let the outer function take over,
        // our strange way of looping in order to avoid call stack overflow / memory leak if this loop runs too much
        if (thisPeer == null || thisPeer.closed) return;
        return reliablyConnectToROV(peerId)
    }).catch(() => {
        try {
            if (rovDataConnection) rovDataConnection.close();
            if (rovVideoConnection) rovVideoConnection.close();
        } catch (e) {
            console.warn("Error Closing rov Data Or Media connection: ", e)
        }
    })
}

function setupEventListeners() {
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
        remotePeerId = window.prompt("Remote Peer ID", "SSROV_0");
        reliablyConnectToPeerServer(peerServerCloudOptions)
    });
}
setupEventListeners();


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
var rovIpFound = false;
function rovIsAlive() {
    rovIpFound = true;
    console.log("ROVISALIVE!!!")
}
function findRovLocalIp() {
    // try to brute force search for raspberrypi's ip address
    console.info("Searching for raspberrypi local ip address...")
    currentThirdOctet = -1
    var scriptElem = null
    function testIp(ipAddress) {
        return new Promise(function (resolve, reject) {
            console.info("Testing: ", ipAddress)
            if (scriptElem) document.body.removeChild(scriptElem)
            scriptElem = document.createElement("SCRIPT")
            scriptElem.setAttribute("src", "http://" + ipAddress)
            document.body.appendChild(scriptElem)
            setTimeout(function () {
                resolve()
            }, 500)
        }).then(function () {
            if (rovIpFound == true) {
                return ipAddress
            } else {
                currentThirdOctet = (currentThirdOctet + 1) % 255
                return testIp("192.168." + currentThirdOctet + ".88/alive")
            }
        })
    }
    testIp("192.168." + 0 + ".88/alive").then((localIp) => {
        rovLocalIp = localIp;
        console.info("ROV IP FOUND! " + rovLocalIp)
    })
}
// findRovLocalIp()


// check if stuff is supported
// if (peerjs.util.supports.audioVideo === false || peerjs.util.supports.data === false || peerjs.util.supports.binary === false || peerjs.util.supports.reliable === false) {
//     alert('Your browser does not support some WebRTC features, please use a different or newer browser.');
// }

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
    return fetchWithTimeout("https://" + peerServerCloudOptions.host + peerServerCloudOptions.path).catch((error) => {
        console.warn("Error Reaching Internet: ", error)
        return false // signal to the then block that an error happened
    }).then((response) => {
        return response && response.ok
    })
}

var thisPeer = null
var remotePeerId = null
var peerServerOption = null;
var rovPeerId = "SSROV_0"
function connectToPeerServer(reconnect, abortConnection) {

    console.log("Connecting to peerjs server...", peerServerOption);
    thisPeer = new Peer(peerServerOption);

    thisPeer.on('open', function (realPeerId) {
        console.log("Connection to peerjs server established! our PeerID:", realPeerId);
        reliablyConnectToROV(remotePeerId)
    });
    thisPeer.on('call', function (call) {
        rovVideoConnection = call;
        console.info('Got Media Call from ' + call.peer)
        console.dir(call);
        call.answer(null, {
            // sdpTransform: function (sdp) {
            //     console.log('answer sdp: ', sdp);
            //     return sdp;
            // }
        });
        call.on('stream', function (remoteStream) {
            console.info('Got livestream!');
            var video = document.getElementById('livestream');
            // video.src = URL.createObjectURL(remoteStream);
            video.srcObject = remoteStream;
            video.muted = true
            video.autoplay = true
            video.controls = false
            video.play();
        });
    });
    thisPeer.on('error', function (err) {
        try {
            if (err.type == 'browser-incompatible') {
                alert('Your browser does not support some WebRTC features, please use a newer / different browser.');
                abortConnection("abort")
            } else if (err.type == "peer-unavailable" && thisPeer.open) {
                console.info("ROV is not yet online")
            } else if (err.type == "webrtc") {
                console.info("Webrtc browser error, reloading page...")
                setTimeout(() => {
                    window.location.reload()
                }, 300)
            } else {
                console.info('Peer server connection error: ', err);
                console.dir(err)
                reconnect() //loop back and try again
            }
        } catch (e) {
            console.error(e)
            reconnect()
        }
    });
    thisPeer.on('disconnected', function () {
        console.info("Disconnected from peer server")
        console.info("Attempting to reconnect to peer server...")
        thisPeer.reconnect();
    });
    thisPeer.on('close', function () {
        console.info('Peer server connection closed.');
        reconnect()
    });
}

function reliablyConnectToPeerServer() {
    // Using promises as a loop to avoid stack overflow: https://stackoverflow.com/questions/50421769/recursive-promises-can-cause-stack-overflow
    return new Promise(connectToPeerServer).catch((e) => {
        if (e === "abort") {
            console.info("Closing peer server connection")
            thisPeer.destroy()
            thisPeer = null
        } else {
            console.error(e)
        }
    }).then(() => {
        console.info("Reconnecting to peer server...")
        console.dir(thisPeer)
        // the resolve() callback in the promise function above should get called whenever there is an error connecting to the rov peer, where we should try to reconnect,
        // the reject() callback in the promise function above should get called whenever there is an error connecting to the peerjs server, where this function should exit and let the outer function take over,
        // our strange way of looping in order to avoid call stack overflow / memory leak if this loop runs too much
        if (thisPeer == null) return;
        return reliablyConnectToPeerjsServer()
    })
}

function reliablyConnectToROV() {
    // Using promises as a loop to avoid stack overflow https://stackoverflow.com/questions/50421769/recursive-promises-can-cause-stack-overflow
    // the reconnect() aka "resolve()" callback in the promise function above should get called whenever there is an error connecting to the rov peer, where we should try to reconnect,
    // the abort() aka "reject()"" callback in the promise function above should get called whenever there is an error connecting to the peerjs server, where this function should exit and let the outer function take over,
    // this is our strange way of looping in order to avoid call stack overflow / memory leak if this loop runs too much
    return new Promise(connectToRov).catch(() => {
        try {
            if (rovDataConnection) rovDataConnection.close();
            if (rovVideoConnection) rovVideoConnection.close();
        } catch (e) {
            console.warn("Error Closing rov Data Or Media connection: ", e)
        }
    }).then(() => {
        console.info("Reconnecting to ROV...")
        console.dir(thisPeer)

        if (thisPeer == null || thisPeer.closed) return;
        return reliablyConnectToROV()
    })
}

var rovDataConnection = null;
var rovVideoConnection = null;
var checkDataChannelInterval = null

// this is meant to be used as a new promise callback and is NOT used in the normal way, it is part of the loop in connect to rov reliably, and resolves on errors
function connectToRov(reconnect, abortConnection) {
    rovDataConnection = thisPeer.connect(rovPeerId, {
        reliable: true,
        serialization: 'none',
    });
    rovDataConnection.on('open', function () {
        console.info("ROV Data Channel is open!")
        // Receive messages
        rovDataConnection.on('data', function (data) {
            data = decoder.decode(data);
            console.log("Got DC Mesg: ", data);
            document.body.appendChild(document.createTextNode(String(data)));
        });

        if (checkDataChannelInterval) clearInterval(checkDataChannelInterval)
        var reconnectCountdown = 10
        var lastIceConnectionState = null
        checkDataChannelInterval = setInterval(() => {
            // console.log("DC Active", rovDataConnection.peerConnection)
            if (rovDataConnection.peerConnection) {
                let connectionState = rovDataConnection.peerConnection.iceConnectionState
                if (connectionState == "disconnected") {
                    console.info("Waiting for ROV to reconnect: " + reconnectCountdown)
                    reconnectCountdown--;
                } else if (connectionState == "connected" && lastIceConnectionState == "disconnected") {
                    console.info("ROV Reconnected!")
                    reconnectCountdown = 10
                }
                lastIceConnectionState = connectionState
            } else {
                clearInterval(checkDataChannelInterval)
            }
        }, 1000)
    });
    rovDataConnection.on('error', function (err) {
        console.info('ROV DataConnection Error: ', err);
        console.dir(err)
        reconnect()
    });
    thisPeer.on('error', function (err) {
        if (err.type == "peer-unavailable" && thisPeer.open) reconnect() //loop back and try again
        else abortConnection(err)
    })
    rovDataConnection.on('disconnected', function () {
        console.info('ROV Data Channel is disconnected.');
        reconnect()
    });
    rovDataConnection.on('close', function () {
        console.info('ROV Data Channel has closed');
        reconnect()
    });
}

function reliablyConnectToROV(peerId) {
    // Using promises as a loop to avoid stack overflow when reconnecting https://stackoverflow.com/questions/50421769/recursive-promises-can-cause-stack-overflow
    return new Promise(connectToRov).then(() => {
        console.info("Attempting to reconnect to ROV...")
        // the resolve() callback in the promise function above should get called whenever there is an error connecting to the rov peer, where we should try to reconnect,
        // the reject() callback in the promise function above should get called whenever there is an error connecting to the peerjs server, where this function should exit and let the outer function take over,
        // our strange way of looping in order to avoid call stack overflow / memory leak if this loop runs too much
        if (thisPeer == null || thisPeer.closed) return;
        try {
            rovDataConnection.close()
            rovVideoConnection.close()
        } catch (e) {
            console.warn("Error closing ROV data or media connection: ", e)
        }
        return reliablyConnectToROV(peerId)
    }).catch(() => {
        console.info("Closing down ROV connections...")
        try {
            if (rovDataConnection) rovDataConnection.close();
            if (rovVideoConnection) rovVideoConnection.close();
        } catch (e) {
            console.warn("Error closing ROV data or media connection: ", e)
        }
    })
}

function startConnection() {
    checkInternetConnection().then((internetAvailable) => {
        console.log("Internet Available: ", internetAvailable)
        remotePeerId = "SSROV_0"
        if (internetAvailable) {
            peerServerOption = peerServerCloudOptions
            reliablyConnectToPeerServer()
        } else {
            peerServerOption = peerServerLocalOptions
            findRovLocalIp().then(
                //            reliablyConnectToPeerServer()
            )
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
        remotePeerId = "SSROV_0"//window.prompt("Enter ROV Peer ID: ", "SSROV_0");
        reliablyConnectToPeerServer()
        // findRovLocalIp()
    });
}
setupEventListeners();
startConnection()



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

// var rovLocalIp = null
// var rovIpFound = false;
// function rovIsAlive() {
//     rovIpFound = true;
//     console.log("ROVISALIVE!!!")
// }
// function findRovLocalIp() {
//     // try to brute force search for raspberrypi's ip address
//     console.info("Searching for raspberrypi local ip address...")
//     currentThirdOctet = -1
//     var scriptElem = null
//     function testIp(ipAddress) {
//         return new Promise(function (resolve, reject) {
//             console.info("Testing: ", ipAddress)
//             if (scriptElem) document.body.removeChild(scriptElem)
//             scriptElem = document.createElement("SCRIPT")
//             scriptElem.setAttribute("src", "http://" + ipAddress)
//             document.body.appendChild(scriptElem)
//             setTimeout(function () {
//                 resolve()
//             }, 500)
//         }).then(function () {
//             if (rovIpFound == true) {
//                 return ipAddress
//             } else {
//                 currentThirdOctet = (currentThirdOctet + 1) % 255
//                 return testIp("192.168." + currentThirdOctet + ".88/alive")
//             }
//         })
//     }
//     testIp("192.168." + 0 + ".88/alive").then((localIp) => {
//         rovLocalIp = localIp;
//         console.info("ROV IP FOUND! " + rovLocalIp)
//     })
// }
// // findRovLocalIp()


var rovLocalIp = null;
var thirdIpOctet = 0;
// try to brute force search for raspberrypi's ip address...
// ... in a popup window to get around browser local network cross origin protections
function findRovLocalIp() {
    return new Promise((resolve, reject) => {
        var interval = null
        var testPopup = window.open("http://raspberrypi.local/ipResponder", 'ROV IP FINDER', 'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=6,height=3,left=0,top=0')
        window.focus()
        window.addEventListener("message", (msg) => {
            if (typeof (msg.data) == typeof ("string")) {
                var parts = msg.data.split(": ")
                if (parts[0] == "ROV_IP") {
                    rovLocalIp = parts[1]
                    clearInterval(interval)
                    testPopup.close()
                    alert("ROV IP FOUND! " + rovLocalIp)
                    resolve()
                }
            }
        }, false)
        setTimeout(() => {
            interval = setInterval(() => {
                try {
                    if (testPopup.closed) throw "popup was closed"
                    testPopup.location = "http://192.168." + thirdIpOctet + ".88/ipResponder";
                    testPopup.document.write("Searching for ROV ip address...")
                    thirdIpOctet = (thirdIpOctet + 1) % 255;
                } catch (e) {
                    if (testPopup) testPopup.close()
                    clearInterval(interval)
                    if (rovLocalIp == null) {
                        console.info("ROV IP search was stopped.")
                        console.info("Click this message to keep searching...", () => { findRovLocalIp().then(resolve) })
                    }
                }
            }, 900);
        }, 1000)
    })
}
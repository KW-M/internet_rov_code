

// check if stuff is supported
// if (peerjs.util.supports.audioVideo === false || peerjs.util.supports.data === false || peerjs.util.supports.binary === false || peerjs.util.supports.reliable === false) {
//     alert('Your browser does not support some WebRTC features, please use a different or newer browser.');
// }

const peerServerConn = new PeerServerConnection()
const rovPeerConn = new RovWebrtcConn()
rovPeerConn.peerServerConn = peerServerConn
peerServerConn.serverConectionOpenCallback = function (realPeerId) {
    // if (RovWebrtcConn.open) RovWebrtcConn.cleanupROVConnections()
    rovPeerConn.reliablyConnectToROV()
}

function setupEventListeners() {

    document.getElementById("connect_btn").addEventListener('click', () => {
        peerServerConn.startConnection()
        document.writeln("Open Browser Console For Progress.<br/> Type any key to send a message once connected.")
        window.addEventListener('keypress', () => {
            if (rovPeerConn.rovDataConnection == null || rovPeerConn.rovDataConnection.open == false) {
                alert("No Open Data Channel");
            } else {
                var msg = window.prompt("Message:");
                rovPeerConn.rovDataConnection.send(messageEncoder.encode(msg));
            }
        });
    });

    window.onbeforeunload = () => {
        rovPeerConn.cleanupROVConnections();
        peerServerConn.cleanupConnection();
    }

}

setupEventListeners();
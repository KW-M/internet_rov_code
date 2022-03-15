class PeerServerConnection {
    // peerServerConnOptions = null;
    // peer = null;
    // serverConectionOpenCallback = null;

    cleanupConnection(context) {
        if (context.thisPeer) {
            context.thisPeer.destroy()
            context.thisPeer = null
        }
    }

    /* Attempts to stay connected to the peerjs server by re-running connectToPeerServer whenver an error is signaled by the connectToPeerServer promise */
    reliablyConnectToPeerServer() {
        // Using promises as a loop to avoid stack overflow: https://stackoverflow.com/questions/50421769/recursive-promises-can-cause-stack-overflow
        // this is our strange way of looping in order to avoid call stack overflow / memory leak if this reconnnect "loop" runs too much: https://stackoverflow.com/questions/50421769/recursive-promises-can-cause-stack-overflow
        return new Promise(this.connectToPeerServer.bind(this)).catch((error) => {
            console.log("peerServerCatch", this)
            if (error) console.error("ERROR Caught in connectToPeerServer(): ", error)
            console.info("Reconnecting to peer server...")
            return this.reliablyConnectToPeerjsServer()
        }).then((passThrough) => {
            // the then() callback will either be called if:
            // -- closeupConnection() aka resolve() was called in connectToRov,
            //    in which case passThrough will be null and so the promise "loop" will exit
            // -- or with the return from catch just above which is a promise that will connect again
            if (!passThrough) {
                console.info("Closing up peer server connection...")
                this.cleanupConnection()
            }
            return passThrough
        })
    }

    /* Registers this browser as a peer with the peerjs server specified in this.peerServerConnOptions */
    connectToPeerServer(closeupConnectionThen, reconnectCatch) {
        // connectToPeerServer() is run as a promise constructor in the reliablyConnectToPeerServer() function, so the parameters have special meanings:
        // the closeupConnectionThen() aka "resolve()" callback should get called whevenver the peerjs server connection should be closed without immediately reconnecting
        // the reconnectCatch() aka "reject()" callback in the promise callback below (connectToRov) should get called whenever there is an error in the connection to the peerjs server, where we should try to reconnect,

        console.log("Connecting to peerjs server...", this.peerServerConnOptions);
        this.peer = new Peer(this.peerServerConnOptions);
        console.dir(this)
        this.peer.on('open', (realPeerId) => {
            console.log("Connection to peerjs server established! our PeerID:", realPeerId);
            console.dir(this)
            if (this.serverConectionOpenCallback != null) this.serverConectionOpenCallback(realPeerId)
            else console.warn("No function set for serverConectionOpenCallback!")
        });
        this.peer.on('call', (call) => {
            this.rovVideoConnection = call;
            console.info('Got Media Call from ' + call.peer)
            console.dir(call);
            call.answer(null, {
                // sdpTransform: function (sdp) {
                //     console.log('answer sdp: ', sdp);
                //     return sdp;
                // }
            });
            call.on('stream', (remoteStream) => {
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
        this.peer.on('error', (err) => {
            try {
                if (err.type == 'browser-incompatible') {
                    alert('Your browser does not support some WebRTC features, please use a newer / different browser.');
                    closeupConnectionThen()
                } else if (err.type == "peer-unavailable" && this.peer.open) {
                    console.info("ROV is not yet online")
                } else if (err.type == "webrtc") {
                    console.info("Webrtc browser error, reloading page...")
                    setTimeout(() => {
                        window.location.reload()
                    }, 300)
                } else {
                    console.info('Peer server connection error: ', err);
                    console.dir(err)
                    reconnectCatch() //loop back and try again
                }
            } catch (e) {
                console.error(e)
                reconnectCatch()
            }
        });
        this.peer.on('disconnected', () => {
            console.info("Disconnected from peer server")
            console.info("Attempting to reconnect to peer server...")
            this.peer.reconnect();
        });
        this.peer.on('close', () => {
            console.info('Peer server connection closed.');
            this.peer.destroy();
            reconnectCatch()
        });
    }

}
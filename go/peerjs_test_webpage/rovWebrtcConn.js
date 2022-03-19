
// class RovWebrtcConn {
//     peerServerConn = null;
//     rovPeerId = "iROV-0"
//     // rovPeerIdBase = "SSROV_";
//     // rovPeerIdEndNumber = 0; // the full rov peerid is the rovPeerIdBase with this number tacked on the end
//     rovDataConnection = null;
//     rovVideoConnection = null;
//     checkDataChannelIntervalId = null;


//     /* Attempts to stay connected to the rov by re-running connectToRov whenver an error is signaled by the connectToRov promise */
//     reliablyConnectToROV() {
//         // this is our strange way of looping in order to avoid call stack overflow / memory leak if this reconnnect "loop" runs too much: https://stackoverflow.com/questions/50421769/recursive-promises-can-cause-stack-overflow
//         return new Promise(this.connectToRov.bind(this)).catch((error) => {
//             if (error) console.warn("ERROR Caught in connectToRov(): ", error)
//             console.info("Reconnecting to ROV...")
//             if (this.peer == null || this.peer.closed) return;
//             this.cleanupROVConnections()
//             return this.reliablyConnectToROV()
//         }).then((passThrough) => {
//             // the then() callback will either be called if:
//             // -- closeupConnection() aka resolve() was called in connectToRov,
//             //    in which case passThrough will be null and so the promise "loop" will exit
//             // -- or with the return from catch just above which is a promise that will connect again
//             if (!passThrough) {
//                 console.info("Closing up ROV connection...")
//                 this.cleanupROVConnections()
//             }
//             return passThrough
//         })
//     }

//     /* Makes an attempt to establish a webrtc data channel with the rov */
//     connectToRov(closeupConnectionThen, reconnectCatch) {
//         // connectToRov() is run as a promise constructor in the reliablyConnectToROV() function, so the parameters have special meanings:
//         // the closeupConnectionThen() aka "resolve()" callback should get called whevenver the rov webrtc/p2p connection should be closed without inmediately reconnecting
//         // the reconnect() aka "reject()"" callback in the promise callback below (connectToRov) should get called whenever there is an error in the connection to the rov peer, where we should try to reconnect,
//         var rovPeerId = this.rovPeerId//this.rovPeerIdBase + String(this.rovPeerIdEndNumber)
//         this.rovDataConnection = this.peerServerConn.peer.connect(rovPeerId, {
//             reliable: true,
//             serialization: 'none',
//         });
//         this.rovDataConnection.on('open', () => {
//             console.info("ROV Data Channel is open!")
//             // Receive messages
//             this.rovDataConnection.on('data', (data) => {
//                 data = messageDecoder.decode(data);
//                 console.log("Got DC Mesg: ", data);
//                 document.body.appendChild(document.createTextNode(String(data)));
//             });

//             if (this.checkDataChannelIntervalId) clearInterval(this.checkDataChannelIntervalId)
//             var reconnectCountdown = 10
//             var lastIceConnectionState = null
//             this.checkDataChannelIntervalId = setInterval(() => {
//                 if (this.rovDataConnection.peerConnection && rovDataConnection.peerConnection.iceConnectionState) {
//                     let connectionState = this.rovDataConnection.peerConnection.iceConnectionState
//                     if (connectionState == "disconnected") {
//                         console.info("Waiting for ROV to reconnect: " + reconnectCountdown)
//                         reconnectCountdown--;
//                     } else if (connectionState == "connected" && lastIceConnectionState == "disconnected") {
//                         console.info("ROV Reconnected!")
//                         reconnectCountdown = 10
//                     }
//                     lastIceConnectionState = connectionState
//                 } else {
//                     clearInterval(this.checkDataChannelIntervalId)
//                 }
//             }, 1000)
//         });
//         this.rovDataConnection.on('error', (err) => {
//             console.info('ROV DataConnection Error: ', err);
//             console.dir(err)
//             reconnectCatch()
//         });
//         peerServerConn.peer.on('error', (err) => {
//             if (err.type == "peer-unavailable" && PeerServerConnection.peer.open) reconnectCatch() //loop back and try again
//             else closeupConnectionThen(err)
//         })
//         this.rovDataConnection.on('disconnected', () => {
//             console.info('ROV Data Channel is disconnected.');
//             reconnectCatch()
//         });
//         this.rovDataConnection.on('close', () => {
//             console.info('ROV Data Channel has closed');
//             reconnectCatch()
//         });
//     }

//     /* Closes any active webrtc (p2p) connections to the ROV, but does not close connections to the peerjs server */
//     cleanupROVConnections() {
//         try {
//             if (this.rovDataConnection) this.rovDataConnection.close();
//             if (this.rovVideoConnection) this.rovVideoConnection.close();
//         } catch (e) {
//             console.warn("Error closing ROV data or media connection: ", e)
//         }
//     }

//     /* Sends the passed message string to the ROV.
//      * Returns false if there is an error or the ROV is NOT connected */
//     sendMessageToRov(messageString) {
//         if (!this.rovDataConnection || !this.rovDataConnection.open) return false
//         messageBytes = messageEncoder.encode(messageString);
//     }

// }
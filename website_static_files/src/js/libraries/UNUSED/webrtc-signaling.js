/* See https://www.linux-projects.org/webrtc-signalling/ for a reference to signalling.js
 * window.mozRTCPeerConnection, window.mozRTCSessionDescription, window.mozRTCIceCandidate are now deprecated
 */

RTCPeerConnection = window.RTCPeerConnection || /*window.mozRTCPeerConnection ||*/ window.webkitRTCPeerConnection;
RTCSessionDescription = /*window.mozRTCSessionDescription ||*/ window.RTCSessionDescription;
RTCIceCandidate = /*window.mozRTCIceCandidate ||*/ window.RTCIceCandidate;

function signal(url, onStream, onError, onClose, onMessage, onDataChannelOpen) {
    if ("WebSocket" in window) {
        console.log("Opening signalling web socket: " + url);
        var wSocket = new WebSocket(url);
        var peerConnection;
        var iceCandidates = [];
        var trickle_ice = true;
        var hasRemoteDesc = false;

        var mediaConstraints = {
            optional: [],
            mandatory: {
                OfferToReceiveAudio: true,
                OfferToReceiveVideo: true
            }
        };

        function addIceCandidates() {
            if (hasRemoteDesc) {
                iceCandidates.forEach(function (candidate) {
                    peerConnection.addIceCandidate(candidate,
                        function () {
                            console.log("IceCandidate added: ", candidate);
                        },
                        function (error) {
                            console.error("addIceCandidate error: " + error);
                        }
                    );
                });
                iceCandidates = [];
            }
        }

        wSocket.onopen = function () {
            /* First we create a peer connection */
            var config = { "iceServers": [{ "urls": ["stun:stun.l.google.com:19302"] }] };
            var options = {
                optional: [
                    // Deprecated:
                    //{RtpDataChannels: false},
                    //{DtlsSrtpKeyAgreement: true}
                ]
            };
            peerConnection = new RTCPeerConnection(config, options);
            iceCandidates = [];
            hasRemoteDesc = false;

            peerConnection.onicecandidate = function (event) {
                if (event.candidate && event.candidate.candidate) {
                    var candidate = {
                        sdpMLineIndex: event.candidate.sdpMLineIndex,
                        sdpMid: event.candidate.sdpMid,
                        candidate: event.candidate.candidate
                    };
                    var request = {
                        what: "addIceCandidate",
                        data: JSON.stringify(candidate)
                    };
                    wSocket.send(JSON.stringify(request));
                } else {
                    console.log("end of candidates.");
                }
            };

            if ('ontrack' in peerConnection) {
                peerConnection.ontrack = function (event) {
                    console.log('pc.ontrack', event);       // <-- new line
                    if (event.track.kind === 'video') {     // <-- new line
                        onStream(event.streams[0]);
                    }                                       // <-- new line
                };
            } else {  // onaddstream() deprecated
                peerConnection.onaddstream = function (event) {
                    onStream(event.stream);
                };
            }

            peerConnection.onremovestream = function (event) {
                console.log("the stream has been removed: do your stuff now");
            };

            peerConnection.ondatachannel = function (event) {
                console.log("a data channel is available: do your stuff with it");
                onDataChannelOpen(event)
                // For an example, see https://www.linux-projects.org/uv4l/tutorials/webrtc-data-channels/
            };

            /* kindly signal the remote peer that we would like to initiate a call */
            var request = {
                what: "call",
                options: {
                    // If forced, the hardware codec depends on the arch.
                    // (e.g. it's H264 on the Raspberry Pi)
                    // Make sure the browser supports the codec too.
                    force_hw_vcodec: false,
                    vformat: 30, /* 30=640x480, 30 fps */
                    trickle_ice: true
                }
            };
            console.log("Sending signalling web socket message: ", request);
            wSocket.send(JSON.stringify(request));
        };

        wSocket.onmessage = function (evt) {
            var msg = JSON.parse(evt.data);
            var what = msg.what;
            var data = msg.data;

            console.log("Received signalling web socket message: ", msg);

            switch (what) {
                case "offer":
                    var mediaConstraints = {
                        optional: [],
                        mandatory: {
                            OfferToReceiveAudio: false,
                            OfferToReceiveVideo: true
                        }

                    };
                    peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(data)),
                        function onRemoteSdpSuccess() {
                            hasRemoteDesc = true;
                            addIceCandidates();
                            peerConnection.createAnswer(function (sessionDescription) {
                                peerConnection.setLocalDescription(sessionDescription);
                                var request = {
                                    what: "answer",
                                    data: JSON.stringify(sessionDescription)
                                };
                                wSocket.send(JSON.stringify(request));
                            }, function (error) {
                                onError("failed to create answer: " + error);
                            }, mediaConstraints);
                        },
                        function onRemoteSdpError(event) {
                            onError('failed to set the remote description: ' + event);
                            wSocket.close();
                        }
                    );

                    break;

                case "answer":
                    break;

                case "message":
                    if (onMessage) {
                        onMessage(msg.data);
                    }
                    break;

                case "iceCandidate": // received when trickle ice is used (see the "call" request)
                    if (!msg.data) {
                        console.log("Ice Gathering Complete");
                        break;
                    }
                    var elt = JSON.parse(msg.data);
                    let candidate = new RTCIceCandidate({ sdpMLineIndex: elt.sdpMLineIndex, candidate: elt.candidate });
                    iceCandidates.push(candidate);
                    addIceCandidates(); // it internally checks if the remote description has been set
                    break;

                case "iceCandidates": // received when trickle ice is NOT used (see the "call" request)
                    var candidates = JSON.parse(msg.data);
                    for (var i = 0; candidates && i < candidates.length; i++) {
                        var elt = candidates[i];
                        let candidate = new RTCIceCandidate({ sdpMLineIndex: elt.sdpMLineIndex, candidate: elt.candidate });
                        iceCandidates.push(candidate);
                    }
                    addIceCandidates();
                    break;
            }
        };

        wSocket.onclose = function (event) {
            console.warn('Signalling web socket closed with code: ' + event.code);
            if (peerConnection) {
                peerConnection.close();
                peerConnection = null;
                wSocket = null;
            }
            if (onClose) {
                onClose();
            }
        };

        wSocket.onerror = function (event) {
            onError("An error has occurred on the websocket (make sure the address is correct)!");
        };

        this.hangup = function () {
            if (wSocket) {
                var request = {
                    what: "hangup"
                };
                console.log("send message " + JSON.stringify(request));
                wSocket.send(JSON.stringify(request));
            }
        };

    } else {
        onError("Sorry, this browser does not support Web Sockets. Please use a newer browser.");
    }
}
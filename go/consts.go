package main

// FATAL_PEER_ERROR_TYPES is a list of peer error types that the peerjs-go module can throw which should be handled by closing the peer and restarting the whole peer init -> peer server -> peer conection process.
var FATAL_PEER_ERROR_TYPES = []string{"network", "unavailable-id", "invalid-id", "invalid-key", "browser-incompatible", "webrtc", "server-error", "ssl-unavailable", "socket-error", "socket-closed"}

// DatachannelToRelayPipeMetadata is prepended (as a JSON string) to messages sent to your program through the named pipe message relay (when AddMetadataToPipeMessages config is True)
type DatachannelToRelayPipeMetadata struct {
	// PeerId is the peerjs ID of the sender browser peer.
	SrcPeerId string `json:"SrcPeerId"`
	// Whenever a peer connects or disconnects this will be "connect" or "disconnect" with the connected or disconnected peer set in SrcPeerId
	PeerEvent string `json:"PeerEvent,omitempty"`
	// Err is the error message if there was an error with the previous metadata action command recived on the unix socket.
	Err string `json:"Err,omitempty"`
}

// RelayPipeToDatachannelMetadata is what is expected to be prepended (as JSON followed by the MessageMetadataSeparator string) to messages recived from your program through the named pipe message relay (when AddMetadataToPipeMessages config is True)
type RelayPipeToDatachannelMetadata struct {
	// TargetPeerIds is the list of peerjs peers (by peer id) this mesage should be sent to. An empty list means broadcast mesage to all connected peers.
	TargetPeerIds []string `json:"TargetPeerIds"`
	// An action to be performed by this go code. Options are currently: "Media_Call_Peer"
	Action string `json:"Action"`
	// Parameters used by the Action.
	// - When Action is "Media_Call_Peer": This param is an array in the following format ["stream name", "media MIME type eg: video/h264", "filename of media source pipe in the configured NamedPipeFolder eg: lowRezFrontCameraH264.pipe"]
	Params []string `json:"Params"`
}

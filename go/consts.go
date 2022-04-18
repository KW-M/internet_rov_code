package main

// this robot will try to aquire a peerjs peer id that is this string with an int (starts at 0) tacked on the end.
// if that peer id is taken, it will increment the integer and try again.
var BASE_PEER_ID string = "iROV-"

// FATAL_PEER_ERROR_TYPES is a list of peer error types that the peerjs-go module can throw which should be handled by closing the peer and restarting the whole peer init -> peer server -> peer conection process.
var FATAL_PEER_ERROR_TYPES = []string{"network", "unavailable-id", "invalid-id", "invalid-key", "browser-incompatible", "webrtc", "server-error", "ssl-unavailable", "socket-error", "socket-closed"}

// the file path where the unix socket should be created to act as a relay for messages sent from your prefered programming language (eg: python)
var UNIX_SOCKET_PATH string = "/tmp/go_robot.socket"

// the seperator string that goes between the message metadata json and the actual message when it is sent through the unix socket:
var UNIX_SOCKET_MESSAGE_METADATA_SEPARATOR string = "|\"|" // intentionally an invalid json string

// this metadata is prepended to messages sent down the unix socket (when the prepend-metadata command line flag is true)
// it allows the program at the other end of the to identify which peer
type DatachannelToUnixSocketMessageMetadata struct {
	// PeerId is the peerjs ID of the sender browser peer.
	SrcPeerId string `json:"SrcPeerId"`
	// Whenever a peer connects or disconnects this will be "connect" or "disconnect" with the connected or disconnected peer set in SrcPeerId
	PeerEvent string `json:"PeerEvent"`
	// Err is the error message if there was an error with the previous metadata action command recived on the unix socket.
	Err string `json:"Err"`
}

// this metadata is what is expected to be prepended (as JSON followed by the unixSocketRelayMetadataSeparator string) to messages recived from the unix socket (when the prepend-metadata command line flag is true)
type UnixSocketToDatachannelMessageMetadataJson struct {
	// TargetPeerIds is the list of peerjs peers (by peer id) this mesage should be sent to. An empty list means broadcast mesage to all connected peers.
	TargetPeerIds []string `json:"TargetPeerIds"`
	// An action to be performed by this go code. Options are currently: "Change_Video_Cmd"
	Action string `json:"Action"`
	// Parameters used by the Action.
	// - When Action is "Change_Video_Cmd": this is the video command split on arguments.
	Params []string `json:"Params"`
}

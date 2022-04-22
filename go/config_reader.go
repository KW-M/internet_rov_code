package main

import (
	"encoding/json"
	"io/ioutil"
	"os"

	webrtc "github.com/pion/webrtc/v3"
)

type PeerjsOptions struct {
	// Key API key for the cloud PeerServer. This is not used for servers other than 0.peerjs.com.
	Key string
	// Server host. Defaults to 0.peerjs.com. Also accepts '/' to signify relative hostname.
	Host string
	//Port Server port. Defaults to 443.
	Port int
	//PingInterval Ping interval in ms. Defaults to 5000.
	PingInterval int
	//Path The path where your self-hosted PeerServer is running. Defaults to '/'.
	Path string
	//Secure true if you're using SSL.
	Secure bool
	//Configuration hash passed to RTCPeerConnection. This hash contains any custom ICE/TURN server configuration. Defaults to { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }], 'sdpSemantics': 'unified-plan' }
	Configuration webrtc.Configuration
	// Debug
	// Prints log messages depending on the debug level passed in. Defaults to 0.
	// 0 Prints no logs.
	// 1 Prints only errors.
	// 2 Prints errors and warnings.
	// 3 Prints all logs.
	Debug int8
	//Token a string to group peers
	Token string
	// Retry Count of times to retry connecting to this peer server before moving on to the next peer server in the PeerjsOptions list.
	RetryCount int

	// -------------------------
	// StartLocalServer - if true, the peerjs-go module will start a local peerjs Server with the same config, and then connect to it.
	StartLocalServer bool
	// (local peerjs Server only) Prints log messages from the local peer js server depending on the debug level passed in. Defaults to 0.
	// Options: critical, error, warn, info, debug. (in order of verbosity least to greatest)
	ServerLogLevel string
	// (local peerjs server only) How long to hold onto disconnected peer connections before releasing them & their peer ids.
	ExpireTimeout int64
	// (local peerjs server only) How long to untill disconeected peer connections are marked as not alive.
	AliveTimeout int64
	// (local peerjs server only) How many peers are allowed to be connected to this peer server at the same time.
	ConcurrentLimit int
	// (local peerjs server only) Allow peerjs clients to get a list of connected peers from this server
	AllowDiscovery bool
	// (local peerjs server only) How long the outgoing server websocket message queue can grow before dropping messages.
	CleanupOutMsgs int
}

var DefaultPeerServerConnectionConfig = PeerjsOptions{
	Key:          "peerjs",
	Host:         "0.peerjs.com",
	Port:         443,
	PingInterval: 5000,
	Path:         "/",
	//Secure true if you're using SSL.
	Secure: true,
	//Configuration hash passed to RTCPeerConnection. This hash contains any custom ICE/TURN server configuration. Defaults to { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }], 'sdpSemantics': 'unified-plan' }
	Configuration: webrtc.Configuration{
		ICEServers: []webrtc.ICEServer{{
			URLs: []string{"stun:stun.l.google.com:19302"},
		}},
		SDPSemantics: webrtc.SDPSemanticsUnifiedPlan,
	},
	// Debug
	// Prints log messages depending on the debug level passed in. Defaults to 0.
	// 0 Prints no logs.
	// 1 Prints only errors.
	// 2 Prints errors and warnings.
	// 3 Prints all logs.
	Debug: 0,
	//Token a string to group peers
	Token: "",
	// Retry Count of times to retry connecting to this peer server before moving on to the next peer server in the PeerjsOptions list.
	RetryCount: 2,

	// -------------------------
	// StartLocalServer - if true, the peerjs-go module will start a local peerjs Server with the same config, and then connect to it.
	StartLocalServer: false,
	// (local peerjs Server only) Prints log messages from the local peer js server depending on the debug level passed in. Defaults to 0.
	// 0 Prints no logs.
	// 1 Prints only errors.
	// 2 Prints errors and warnings.
	// 3 Prints all logs.
	ServerLogLevel: "error",
	// (local peerjs server only) How long to hold onto disconnected peer connections before releasing them & their peer ids.
	ExpireTimeout: 300000,
	// (local peerjs server only) How long to untill disconeected peer connections are marked as not alive.
	AliveTimeout: 300000,
	// (local peerjs server only) How many peers are allowed to be connected to this peer server at the same time.
	ConcurrentLimit: 100,
	// (local peerjs server only) Allow peerjs clients to get a list of connected peers from this server
	AllowDiscovery: false,
	// (local peerjs server only) How long the outgoing server websocket message queue can grow before dropping messages.
	CleanupOutMsgs: 100,
}

// configuration for webrtc-relay
type ProgramConfig struct {

	// a list of peer servers to attempt to connect to, in order of preference
	// Default: !!empty list!!
	PeerServerConfigs []*PeerjsOptions

	// the webrtc-relay will try to aquire a peerjs peer id that is this string with an int (starts at 0) tacked on the end.
	// if that peer id is taken, it will increment the ending int and try again.
	// Default: "go-robot-"
	BasePeerId string

	// The folder path (w trailing slash) where the named pipes should be created to act as a relay for messages and media streams sent from your prefered programming language (eg: python)
	// Default: "/tmp/webtrc-relay-pipes/"
	NamedPipeFolder string

	// The string that goes between each message when sent through the named pipe:
	// Default: "\n"
	MessageDelimiter string

	// the string that goes between the message metadata json and the actual message when sent through the named pipe
	// Default: |"|  (an intentionally an invalid json string)
	MessageMetadataSeparator string

	// if true, when a datachannel message is recived or a peer connects, metadata like the sender's peer id will be prepended to all message as json before being sent to the named pipe.
	// if true, the webrtc-relay will expect json to be prepended to messages comming back from the named pipe in the same format (json metadata, then seperator, then message)
	AddMetadataToPipeMessages bool
}

var defaultProgramConfig = ProgramConfig{
	BasePeerId:                "go-robot-",
	PeerServerConfigs:         []*PeerjsOptions{&DefaultPeerServerConnectionConfig},
	NamedPipeFolder:           "/tmp/webtrc-relay-pipes/",
	MessageDelimiter:          "\n",
	MessageMetadataSeparator:  "|\"|", // intentionally an invalid json string
	AddMetadataToPipeMessages: true,
}

func ReadConfigFile(configFilePath string) (ProgramConfig, error) {
	// Read the config file
	configFile, err := os.Open(configFilePath)
	if err != nil {
		return defaultProgramConfig, err
	}
	defer configFile.Close()

	// read our opened jsonFile as a byte array.
	byteValue, err := ioutil.ReadAll(configFile)
	if err != nil {
		return defaultProgramConfig, err
	}

	// we unmarshal our byteArray which contains our
	// jsonFile's content into 'users' which we defined above
	err = json.Unmarshal(byteValue, &defaultProgramConfig)
	if err != nil {
		return defaultProgramConfig, err
	}

	return defaultProgramConfig, nil
}

// if tries == 0 {
// 	// FOR CLOUD HOSTED PEERJS SERVER running on heroku (or wherever - you could use the default peerjs cloud server):
// 	peerServerOptions.Host = "0.peerjs.com"
// 	peerServerOptions.Port = 443
// 	peerServerOptions.Path = "/"
// 	peerServerOptions.Key = "peerjs"
// 	peerServerOptions.Secure = true
// 	peerServerOptions.PingInterval = 3000
// } else {
// 	// FOR LOCAL PEERJS SERVER RUNNING ON THIS raspberrypi (not heroku):
// 	peerServerOptions.Host = "localhost"
// 	peerServerOptions.Port = 9000
// 	peerServerOptions.Path = "/"
// 	peerServerOptions.Key = "peerjs"
// 	peerServerOptions.Secure = false
// 	peerServerOptions.PingInterval = 3000
// }

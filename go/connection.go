package main

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
	"time"

	peerjs "github.com/muka/peerjs-go"
	peerjsServer "github.com/muka/peerjs-go/server"
	log "github.com/sirupsen/logrus"
)

// 2022/03/14 19:20:02 UNIX SOCKET got message: {"pong": 1200}
// DEBU[0680] WS msg -1                                     module=peer source=socket
// DEBU[0680] websocket closed: websocket: close 1006 (abnormal closure): unexpected EOF  module=peer source=socket
// ERRO[0680] Error: Lost connection to server              module=peer source="peer:iROV-0"
// ROV PEER JS ERROR EVENT: Lost connection to server
// DEBU[0680] Disconnect peer with ID:iROV-0                module=peer source="peer:iROV-0"
// ROV PEER JS DISCONNECTED EVENT (0x4b1090,0x2204fd8)level=info msg=StopSendingMsgs peer=iROV-0 peerServer=0.peerjs.com

// level=info msg="exiting setupWebrtcConnection" peer=iROV-0 peerServer=0.peerjs.com
// DEBU[0680] Destroy peer with ID:                         module=peer source="peer:iROV-0"
// PILOT PEER DATACHANNEL CLOSE EVENT (0x0,0x0)
// DEBU[0680] Cleaning up PeerConnection to 0e5ec07c-956e-4990-a4ce-e4b4c465e3cc  module=peer source=negotiator
// DEBU[0680] <nil>                                         module=peer source=media
// PILOT PEER DATACHANNEL CLOSE EVENT (0x0,0x0)
// DEBU[0680] Cleaning up PeerConnection to fa2728d9-3c28-4b8d-ba6e-b97b642e6da1  module=peer source=negotiator
// DEBU[0680] <nil>                                         module=peer source=media
// ROV PEER JS CLOSE EVENT (0x0,0x0)
// ERRO[0682] sendHeartbeat: Failed to send message: write tcp 192.168.1.79:42960->54.243.238.66:443: write: broken pipe  module=peer source=socket
// ERRO[0685] sendHeartbeat: Failed to send message: write tcp 192.168.1.79:42960->54.243.238.66:443: write: broken pipe  module=peer source=socket
// ERRO[0688] sendHeartbeat: Failed to send message: write tcp 192.168.1.79:42960->54.243.238.66:443: write: broken pipe  module=peer source=socket
// ERRO[0691] sendHeartbeat: Failed to send message: write tcp 192.168.1.79:42960->54.243.238.66:443: write: broken pipe  module=peer source=socket
// ERRO[0694] sendHeartbeat: Failed to send message: write tcp 192.168.1.79:42960->54.243.238.66:443: write: broken pipe  module=peer source=socket
// ERRO[0697] sendHeartbeat: Failed to send message: write tcp 192.168.1.79:42960->54.243.238.66:443: write: broken pipe  module=peer source=socket

var err error // handy variable to stuff any error messages into

// To handle the case where multiple rovs are running at the same time,
// we make the PeerId of this ROV the basePeerId plus this number tacked on
// the end (eg: iROV-0) that we increment if the current peerId is already taken.
var robotPeerIdEndingNum int = 0

// map off all peer datachannels connected to this robot (includes both the robot peer associated with the local peerjs server and the robot peer associated with the cloud peerjs server)
var activeDataConnectionsToThisRobot = make(map[string]*peerjs.DataConnection) // map of the open datachannel connection Ids to this peer.

// ----- PeerJs-Go Client Settings -----
var peerServerCloudOpts, peerServerLocalOpts peerjs.Options

func makePeerJsOptions() {
	// FOR CLOUD HOSTED PEERJS SERVER running on heroku (or wherever, or you could use the default server):
	peerServerCloudOpts = peerjs.NewOptions()
	peerServerCloudOpts.Host = "0.peerjs.com"
	peerServerCloudOpts.Port = 443
	peerServerCloudOpts.Path = "/"
	peerServerCloudOpts.Key = "peerjs"
	peerServerCloudOpts.Secure = true
	peerServerCloudOpts.Debug = 3
	peerServerCloudOpts.PingInterval = 3000
	// FOR LOCAL PEERJS SERVER RUNNING ON THIS raspberrypi (not heroku):
	peerServerLocalOpts = peerjs.NewOptions()
	peerServerLocalOpts.Host = "localhost"
	peerServerLocalOpts.Port = 9000
	peerServerLocalOpts.Path = "/"
	peerServerLocalOpts.Key = "peerjs"
	peerServerLocalOpts.Secure = false
	peerServerLocalOpts.Debug = 3
	peerServerLocalOpts.PingInterval = 3000
}

func generateToUnixSocketMetadataMessage(srcPeerId string, peerEvent string, err string) string {
	var metadata = new(DatachannelToUnixSocketMessageMetadata)
	metadata.SrcPeerId = srcPeerId
	if len(peerEvent) > 0 {
		metadata.PeerEvent = peerEvent
	}
	if len(err) > 0 {
		metadata.Err = err
	}
	mtaDataJson, _ := json.Marshal(metadata)
	return string(mtaDataJson)
}

func startLocalPeerJsServer(done chan bool) {
	serverOptions := peerjsServer.NewOptions()
	serverOptions.LogLevel = "Debug"
	serverOptions.AllowDiscovery = true
	serverOptions.Port = peerServerLocalOpts.Port
	serverOptions.Host = peerServerLocalOpts.Host
	serverOptions.Path = peerServerLocalOpts.Path
	serverOptions.Key = peerServerLocalOpts.Key
	server := peerjsServer.New(serverOptions)
	var err = server.Start()
	defer server.Stop()
	if err != nil {
		fmt.Printf("Error starting local peerjs server: %s\n", err)
		return
	}
	for { // wait for the done channel to be triggered at which point this function will exit and the local peerjs server will stop
		select {
		case <-done:
			return
		default:
			time.Sleep(time.Microsecond * 300)
		}
	}
}

func setupLocalAndCloudConnections(quitSignal chan bool) {
	makePeerJsOptions()

	exitCloudGoroutineLoop := make(chan bool)
	exitCloudConnection := make(chan bool)
	go func() {
		for {
			select {
			case <-exitCloudGoroutineLoop:
				log.Println("Exiting cloud webrtc connection loop.")
				return
			default:
				println("Setting Up Cloud Connection")
				setupWebrtcConnection(exitCloudConnection, peerServerCloudOpts)
			}
		}
	}()

	// exitLocalGoroutineLoop := make(chan bool)
	// exitLocalConnection := make(chan bool)
	// go func() {
	// 	go startLocalPeerJsServer(quitSignal) // WARNING _ DOES QUIT SIGNAL WORK HERE!!!!!!!?
	// 	time.Sleep(time.Second * 1)           // wait a bit for the local peerJs server to start up
	// 	for {
	// 		select {
	// 		case <-exitLocalGoroutineLoop:
	// 			log.Println("Exiting local webrtc connection loop.")
	// 			return
	// 		default:
	// 			return
	// 			// setupWebrtcConnection(exitLocalConnection, peerServerLocalOpts)
	// 		}
	// 	}
	// }()

	// send messages recived from the socket to seperate channels for both the local and cloud peers
	exitOutgoingMessageLoop := make(chan bool)
	handleOutgoingDatachannelMessages(exitOutgoingMessageLoop)

	<-quitSignal // wait for the quitSignal channel to be triggered at which point close each of the local & cloud connection function channels
	exitCloudGoroutineLoop <- true
	// exitLocalGoroutineLoop <- true
	// exitLocalConnection <- true
	exitCloudConnection <- true
}

func handleOutgoingDatachannelMessages(exitOutgoingMessageLoop chan bool) {
	for {
		select {
		case msgFromUnixSocket := <-messagesFromUnixSocketChan:

			var TargetPeerIds = make(map[string]bool)

			if ADD_METADATA_TO_UNIX_SOCKET_MESSAGES {
				metadataAndMessage := strings.Split(msgFromUnixSocket, UNIX_SOCKET_MESSAGE_METADATA_SEPARATOR)
				if len(metadataAndMessage) == 2 {
					msgFromUnixSocket = metadataAndMessage[1]
					var metadataJson = metadataAndMessage[0]
					var metadata = new(UnixSocketToDatachannelMessageMetadataJson)
					err := json.Unmarshal([]byte(metadataJson), &metadata)
					if err != nil {
						fmt.Printf("Error unmarshalling message metadata: %s\n", err)
					} else {
						// copy all of the target peer ids into the TargetPeerIds map
						for i := 0; i < len(metadata.TargetPeerIds); i++ {
							TargetPeerIds[metadata.TargetPeerIds[i]] = true
						}

						// handle other actions
						// ...
					}
				}
			}

			// send the message to all of the peers in the TargetPeerIds map (or all peers if TargetPeerIds is empty)
			var hasTargetPeerIds = len(TargetPeerIds) > 0
			for peerIdAndHost, dataChannel := range activeDataConnectionsToThisRobot {
				var peerId string = strings.Split(peerIdAndHost, "::")[0]
				var host string = strings.Split(peerIdAndHost, "::")[1]
				if dataChannel != nil && (!hasTargetPeerIds || TargetPeerIds[peerId]) {
					log.WithFields(log.Fields{
						"peerId": peerId,
						"host":   host,
					}).Println("Sending message to peer:", msgFromUnixSocket)
					dataChannel.Send([]byte(msgFromUnixSocket), false)
				}
			}

		case <-exitOutgoingMessageLoop:
			log.Println("Exiting handleOutgoingDatachannelMessages loop.")
			return
		}
	}
}

func peerConnectionOpenHandler(robotPeer peerjs.Peer, peerId string, robotConnLog *log.Entry, peerServerOpts peerjs.Options) {
	robotPeer.On("connection", func(data interface{}) {
		browserPeerDataConnection := data.(*peerjs.DataConnection) // typecast to DataConnection
		var pilotPeerId string = browserPeerDataConnection.GetPeerID()

		log := robotConnLog.WithField("peer", robotPeer.ID)
		log.Println("Peer connection established with  Peer ID: ", browserPeerDataConnection.GetPeerID())

		browserPeerDataConnection.On("open", func(interface{}) {
			activeDataConnectionsToThisRobot[pilotPeerId+"::"+peerServerOpts.Host] = browserPeerDataConnection // add this connection to the map of active connections

			log.Printf("VIDEO CALLING browser peer with peer ID: %s\n", pilotPeerId)
			_, err = robotPeer.Call(pilotPeerId, rovLivestreamVideoTrack, peerjs.NewConnectionOptions())
			if err != nil {
				log.Println("Error calling pilot id: ", pilotPeerId)
				log.Fatal(err)
			}

			// send a metadata message down the unix socket that a new peer has connected
			if ADD_METADATA_TO_UNIX_SOCKET_MESSAGES {
				sendMessagesToUnixSocketChan <- generateToUnixSocketMetadataMessage(pilotPeerId, "Connected", "")
			}

			// handle incoming messages from this browser peer
			browserPeerDataConnection.On("data", func(msgBytes interface{}) {
				var msgString string = string(msgBytes.([]byte))
				log.Printf("pilotDataConnection GOT MESSAGE: %s", msgString)
				var socketString string = msgString
				// send a metadata message down the unix socket that a new peer has connected
				if ADD_METADATA_TO_UNIX_SOCKET_MESSAGES {
					var metadata string = generateToUnixSocketMetadataMessage(pilotPeerId, "", "")
					socketString = metadata + UNIX_SOCKET_MESSAGE_METADATA_SEPARATOR + socketString
				}
				sendMessagesToUnixSocketChan <- socketString
			})
		})

		browserPeerDataConnection.On("close", func(message interface{}) {
			log.Println("BROWSER PEER DATACHANNEL CLOSE EVENT", message)
			delete(activeDataConnectionsToThisRobot, pilotPeerId+"::"+peerServerOpts.Host) // remove this connection from the map of active connections

			// send a metadata message down the unix socket that this peer connection has been closed
			if ADD_METADATA_TO_UNIX_SOCKET_MESSAGES {
				sendMessagesToUnixSocketChan <- generateToUnixSocketMetadataMessage(pilotPeerId, "Closed", "")
			}
		})

		browserPeerDataConnection.On("disconnected", func(message interface{}) {
			log.Println("BROWSER PEER DATACHANNEL DISCONNECTED EVENT", message)

			// send a metadata message down the unix socket that this peer has disconnected
			if ADD_METADATA_TO_UNIX_SOCKET_MESSAGES {
				sendMessagesToUnixSocketChan <- generateToUnixSocketMetadataMessage(pilotPeerId, "Disconnected", "")
			}
		})

		browserPeerDataConnection.On("error", func(message interface{}) {
			errMessage := message.(error).Error()
			log.Printf("PILOT PEER DATACHANNEL ERROR EVENT: %s\n", errMessage)
			if ADD_METADATA_TO_UNIX_SOCKET_MESSAGES {
				sendMessagesToUnixSocketChan <- generateToUnixSocketMetadataMessage(pilotPeerId, "Error", errMessage)
			}
		})

	})
}

func setupWebrtcConnection(exitFunction chan bool, peerServerOptions peerjs.Options) {
	// NOTE: This should be called as a goroutine, it will not return until the connection breaks or is closed, in which case this function should be run again.

	var alreadyExitingFunction bool = false
	var robotPeerId string = BASE_PEER_ID + strconv.Itoa(robotPeerIdEndingNum)

	// setup logrus logger
	robotConnLog := log.WithFields(log.Fields{"peer": robotPeerId, "peerServer": peerServerOptions.Host})

	// establish peer with peerjs server
	var robotPeer, err = peerjs.NewPeer(robotPeerId, peerServerOptions)
	defer robotPeer.Close() // close the websocket connection when this whole outer function exits

	if err != nil {
		robotConnLog.Println("Error creating ROV peer: ", err)
		exitFunction <- true // signal to this goroutine to exit and let the setupConnections loop take over
	}

	robotPeer.On("close", func(interface{}) {
		robotConnLog.Println("ROV PEER JS CLOSE EVENT", alreadyExitingFunction)
		if !alreadyExitingFunction {
			exitFunction <- true // signal to this goroutine to exit and let the setupConnections loop take over
		}
	})

	robotPeer.On("disconnected", func(message interface{}) {
		robotConnLog.Println("ROV PEER JS DISCONNECTED EVENT", message)
		if !alreadyExitingFunction {
			log.Debug("Reconnecting...")
			err = robotPeer.Reconnect()
			if err != nil {
				robotConnLog.Println("ERROR RECONNECTING TO DISCONNECTED PEER SERVER: ", err)
				if !alreadyExitingFunction {
					exitFunction <- true // signal to this goroutine to exit and let the setupConnections loop take over
				}
			}
		}
	})

	robotPeer.On("error", func(message interface{}) {
		errorMessage := message.(peerjs.PeerError).Err.Error()
		errorType := message.(peerjs.PeerError).Type
		robotConnLog.Printf("ROBOT PEER ERROR EVENT: %s", errorMessage)
		robotConnLog.Printf(" ....... %s\n", errorType)
		exitFunction <- true // signal to this goroutine to exit and let the setupConnections loop take over
	})

	robotPeer.On("open", func(peerId interface{}) {
		var peerID string = peerId.(string) // typecast to string
		if peerID != robotPeerId {
			robotConnLog.Printf("Uh oh, server gave us peer id: %s (%s must be taken). Switching to next end number...\n", peerID, robotPeerId)
			robotPeerIdEndingNum++ // increment the peer id ending integer and try again
			exitFunction <- true   // signal to this goroutine to exit and let the setupConnections loop take over and rerun this function
		} else {
			robotConnLog.Println("Robot Peer Established!")
			peerConnectionOpenHandler(*robotPeer, robotPeerId, robotConnLog, peerServerOptions)
		}
	})

	// ---------------------------------------------------------------------------------------------------------------------
	fmt.Println("starting setup WebrtcConnection goroutine sleep")
	<-exitFunction // CONTINUE when a signal is sent on the 'exitFunction' channel from the the calling function to clean up because program is exiting or somthin, unblock this goroutine and exit.
	alreadyExitingFunction = true
	robotConnLog.Println("exiting setupWebrtcConnection")
}

// // https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs#avc_h.264
// // Find the H264 codec in the list of codecs supported by the remote peer (aka the pilot's browser)
// var h264PayloadType uint8 = 0
// for _, videoCodec := range mediaEngine.GetCodecsByKind(webrtc.RTPCodecTypeVideo) {
// 	if videoCodec.Name == "H264" {
// 		h264PayloadType = videoCodec.PayloadType
// 		break
// 	}
// }
// // if the payloadTypeNumber from never changed, the broswer doesn't support H264 (highly unlikely)
// if h264PayloadType == 0 {
// 	fmt.Println("Remote peer does not support H264")
// 	continue
// }

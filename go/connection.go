package main

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
	"time"

	peerjs "github.com/muka/peerjs-go"
	peerjsServer "github.com/muka/peerjs-go/server"
	"github.com/sirupsen/logrus"
	log "github.com/sirupsen/logrus"
)

/* This file contains all the code to connect through peerjs to the peerjs server, listen for conection attempts and
handle sending/reciving webrtc messages
a few notes about the peerjs-go library:
- never block a peerjs event callback, while they are go routines, they end up blocking the whole peerjs library.
- It can be very easy to accidentally block a peerjs event callback, by doing something like: for { select {} } or <-time.after() without involving a new gorouitine
*/

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

// To handle the case where multiple robots are running at the same time,
// we make the PeerId of this ROBOT the BasePeerId plus this number tacked on
// the end (eg: iROBOT-0) that we increment if the current peerId is already taken.
var robotPeerIdEndingNum int = 0

// map off all peer datachannels connected to this robot (includes both the robot peer associated with the local peerjs server and the robot peer associated with the cloud peerjs server)
var activeDataConnectionsToThisRobot = make(map[string]*peerjs.DataConnection) // map of the open datachannel connection Ids to this peer.

func sendMessageThroughNamedPipe(message string) {
	select {
	case msgPipe.SendMessagesToPipe <- message:
	default:
		log.Error("sendMessageToUnixSocket: Go channel is full! Msg:", message)
	}
}

func generateToUnixSocketMetadataMessage(srcPeerId string, peerEvent string, err string) string {
	var metadata = new(DatachannelToRelayPipeMetadata)
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

/* handle a message that comes from the client/browser */
func handleIncomingDatachannelMessage(message string, robotPeer *peerjs.Peer, clientPeerId string, clientPeerDataConnection *peerjs.DataConnection, log *logrus.Entry) {
	if message == "" {
		log.Info("VIDEO CALLING client peer: %s\n", clientPeerId)
		_, err = robotPeer.Call(clientPeerId, cameraLivestreamVideoTrack, peerjs.NewConnectionOptions())
		if err != nil {
			log.Error("Error video calling client peer: ", clientPeerId)
			clientPeerDataConnection.Close()
			return
		}
	} else {
		if config.AddMetadataToPipeMessages {
			var metadata string = generateToUnixSocketMetadataMessage(clientPeerId, "", "")
			message = metadata + config.MessageMetadataSeparator + message
		}
		// send a message down the unix socket with the message from the client peer
		sendMessageThroughNamedPipe(message)
	}
}

/* handle forwarding messages from the named channel to the client/browser */
func handleOutgoingDatachannelMessages(programShouldQuitSignal *UnblockSignal) {
	for {
		select {
		case msgFromUnixSocket := <-msgPipe.GetMessagesFromPipe:
			log.Printf("msgFromUnixSocket GOT MESSAGE: %s", msgFromUnixSocket)
			var TargetPeerIds = make(map[string]bool)

			if config.AddMetadataToPipeMessages {
				metadataAndMessage := strings.Split(msgFromUnixSocket, config.MessageMetadataSeparator)
				if len(metadataAndMessage) == 2 {
					msgFromUnixSocket = metadataAndMessage[1]
					var metadataJson = metadataAndMessage[0]
					var metadata = new(RelayPipeToDatachannelMetadata)
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
		// case <-time.After(time.Second * 5):
		// 	for peerIdAndHost, dataChannel := range activeDataConnectionsToThisRobot {
		// 		var peerId string = strings.Split(peerIdAndHost, "::")[0]
		// 		var host string = strings.Split(peerIdAndHost, "::")[1]
		// 		if dataChannel != nil {
		// 			log.WithFields(log.Fields{
		// 				"peerId": peerId,
		// 				"host":   host,
		// 			}).Println("Sending d message to peer:", time.Now().Format(time.RFC850))
		// 			dataChannel.Send([]byte(time.Now().Format(time.RFC850)), false)
		// 		}
		// 	}
		case <-programShouldQuitSignal.GetSignal():
			log.Println("Exiting handleOutgoingDatachannelMessages loop.")
			return
		}
	}
}

/* getNextPeerServerOptions (non-blocking function)
 * Given the parameter number of "tries" to sucessfully connect to a peerjs server, this function will return a new set of peerServerOptions, that can be used to try to establish a peer server connection
 * This function is non-blockng and will return the next set of peerServerOptions immediately.
 */
func getNextPeerServerOptions(tries int) (*peerjs.Options, *peerjsServer.Options) {
	var peerOptionsConfig = config.PeerServerConfigs[tries%len(config.PeerServerConfigs)]

	var peerOptions = peerjs.NewOptions()
	peerOptions.Host = peerOptionsConfig.Host
	peerOptions.Port = peerOptionsConfig.Port
	peerOptions.Path = peerOptionsConfig.Path
	peerOptions.Secure = peerOptionsConfig.Secure
	peerOptions.Key = peerOptionsConfig.Key
	peerOptions.Debug = peerOptionsConfig.Debug
	peerOptions.Token = peerOptionsConfig.Token
	peerOptions.Configuration = peerOptionsConfig.Configuration

	if peerOptionsConfig.StartLocalServer {
		var peerServerOptions = peerjsServer.NewOptions()
		peerServerOptions.LogLevel = peerOptionsConfig.ServerLogLevel
		peerServerOptions.Host = peerOptionsConfig.Host
		peerServerOptions.Port = peerOptionsConfig.Port
		peerServerOptions.Path = peerOptionsConfig.Path
		peerServerOptions.Key = peerOptionsConfig.Key
		peerServerOptions.ExpireTimeout = peerOptionsConfig.ExpireTimeout
		peerServerOptions.AliveTimeout = peerOptionsConfig.AliveTimeout
		peerServerOptions.AllowDiscovery = peerOptionsConfig.AllowDiscovery
		peerServerOptions.ConcurrentLimit = peerOptionsConfig.ConcurrentLimit
		peerServerOptions.CleanupOutMsgs = peerOptionsConfig.CleanupOutMsgs
		return &peerOptions, &peerServerOptions
	}

	return &peerOptions, &peerjsServer.Options{} // returns nil for peerServerOptions
}

/* startLocalPeerJsServer (blocking goroutine)
 * This function starts up a local PeerJs SERVER on this computer. This can be used when no external internet access is available.
 * This function is blocking and will not return until programShouldQuitSignal is triggered or a panic in the server occurs.
 */
func startLocalPeerJsServer(serverOptions peerjsServer.Options, programShouldQuitSignal *UnblockSignal) {
	for {
		server := peerjsServer.New(serverOptions)
		defer server.Stop()
		if err := server.Start(); err != nil {
			log.Printf("Error starting local peerjs server: %s", err)
			time.Sleep(time.Second * 1)
			continue
		}

		// wait for the programShouldQuitSignal channel to be closed at which point this function will exit and the local peerjs server will stop beacuse of the defer server.stop() function
		programShouldQuitSignal.Wait()
		return
	}
}

/* startPeerServerConnectionLoop (blocking goroutine)
 * This function sets up the loops that will keep restarting setupRobotPeer(), whenever it exits (exept if programShouldQuitSignal is triggered)
 * this loop also handles specific errors like offline robot state, by switching to offline mode, and peer id taken, by incrementing the peerid postfix number before trying again.
 * This function is blocking and will not return until the peer connection fails (with the error) or programShouldQuitSignal is triggered.
 */
func startPeerServerConnectionLoop(programShouldQuitSignal *UnblockSignal) {

	peerServerConnectionTries := 0
	peerOptions, peerServerOptions := getNextPeerServerOptions(peerServerConnectionTries)

	go func() {
		for {
			select {
			case <-programShouldQuitSignal.GetSignal():
				log.Println("Closing down webrtc connection loop.")
				return
			default:
				if peerServerOptions != nil {
					// go startLocalPeerJsServer(*peerServerOptions, programShouldQuitSignal)
				}
				activeDataConnectionsToThisRobot = make(map[string]*peerjs.DataConnection)
				err := setupRobotPeer(*peerOptions, programShouldQuitSignal)
				if e, ok := err.(*peerjs.PeerError); ok {
					errorType := e.Type
					if errorType == "unavailable-id" {
						log.Printf("Peer id is unavailable. Switching to next peer id end number...\n")
						robotPeerIdEndingNum++ // increment the peer id ending integer
					}
					if errorType == "network" {
						log.Printf("Peer Js server is unavailable, switching to next peer server\n")
						peerServerConnectionTries++ // increment the peer id ending integer
						peerOptions, peerServerOptions = getNextPeerServerOptions(peerServerConnectionTries)
					}
				}
			}
		}
	}()

	// relay all messages recived from the unix socket to all connected peers (unless the message metadata dictates which peers to send the message to)
	go handleOutgoingDatachannelMessages(programShouldQuitSignal)

	programShouldQuitSignal.Wait() // wait for the quitSignal channel to be triggered at which point this goroutine can exit
}

/* peerConnectionOpenHandler (non-blocking function)
 * This function sets up the event listeners for the robotPeer object that accept new webrtc peer connections to the robot and handle errors & sutch
 * This loop also handles specific errors like offline robot state, by switching to offline mode, and peer id taken, by incrementing the peerid postfix number before trying again.
 * This function should be called within the peer.On("open",) function of the robotPeer object.
 * This function DOES NOT block, BUT the passed robotPeer parameter MUST NOT GO OUT OF SCOPE, or the event listeners will be garbage collected and (maybe) closed.
 */
func peerConnectionOpenHandler(robotPeer *peerjs.Peer, peerId string, peerServerOpts peerjs.Options, robotConnLog *log.Entry) {
	robotPeer.On("connection", func(data interface{}) {
		clientPeerDataConnection := data.(*peerjs.DataConnection) // typecast to DataConnection
		var clientPeerId string = clientPeerDataConnection.GetPeerID()

		log := robotConnLog.WithField("peer", robotPeer.ID)
		log.Info("Peer is connecting to rov... peer id: ", clientPeerDataConnection.GetPeerID())

		clientPeerDataConnection.On("open", func(interface{}) {
			log.Info("Peer connection established with Peer ID: ", clientPeerDataConnection.GetPeerID())
			// add this newly open peer connection to the map of active connections
			activeDataConnectionsToThisRobot[clientPeerId+"::"+peerServerOpts.Host] = clientPeerDataConnection

			// send a metadata message down the unix socket that a new peer has connected
			if config.AddMetadataToPipeMessages {
				msg := generateToUnixSocketMetadataMessage(clientPeerId, "Connected", "") + config.MessageMetadataSeparator + "{}"
				sendMessageThroughNamedPipe(msg)
			}

			// handle incoming messages from this client peer
			clientPeerDataConnection.On("data", func(msgBytes interface{}) {
				var msgString string = string(msgBytes.([]byte))
				log.Printf("clientDataConnection 👩🏻‍✈️ GOT MESSAGE: %s", msgString)
				handleIncomingDatachannelMessage(msgString, robotPeer, clientPeerId, clientPeerDataConnection, log)
			})
		})

		clientPeerDataConnection.On("close", func(message interface{}) {
			log.Info("CLIENT PEER DATACHANNEL CLOSE EVENT", message)
			delete(activeDataConnectionsToThisRobot, clientPeerId+"::"+peerServerOpts.Host) // remove this connection from the map of active connections

			// send a metadata message down the unix socket that this peer connection has been closed
			if config.AddMetadataToPipeMessages {
				msg := generateToUnixSocketMetadataMessage(clientPeerId, "Closed", "") + config.MessageMetadataSeparator + "{}"
				sendMessageThroughNamedPipe(msg)
			}
		})

		clientPeerDataConnection.On("disconnected", func(message interface{}) {
			log.Info("CLIENT PEER DATACHANNEL DISCONNECTED EVENT", message)

			// send a metadata message down the unix socket that this peer has disconnected
			if config.AddMetadataToPipeMessages {
				msg := generateToUnixSocketMetadataMessage(clientPeerId, "Disconnected", "") + config.MessageMetadataSeparator + "{}"
				sendMessageThroughNamedPipe(msg)
			}
		})

		clientPeerDataConnection.On("error", func(message interface{}) {
			errMessage := message.(error).Error()
			log.Error("CLIENT PEER DATACHANNEL ERROR EVENT: %s\n", errMessage)
			if config.AddMetadataToPipeMessages {
				msg := generateToUnixSocketMetadataMessage(clientPeerId, "Error", errMessage) + config.MessageMetadataSeparator + "{}"
				sendMessageThroughNamedPipe(msg)
			}
		})

	})
}

/* setupRobotPeer (blocking goroutine)
 * This function sets up the peerjs peer for the robot
 * Then it waits for the peerjs server to "Open" initilize the
 * robot peer which then passes controll to the peerConnectionOpenHandler function.
 * This function also handles the "error", "disconnected" and "closed" events for the peerjs server connection.
 * This function is blocking and will not return until the peer connection fails (with the error) or programShouldQuitSignal is triggered.
 */
func setupRobotPeer(peerOptions peerjs.Options, programShouldQuitSignal *UnblockSignal) error {
	exitFuncSignal := newUnblockSignal()

	log.Info("Setting up connection to peerjs server: " + peerOptions.Host + ":" + strconv.Itoa(peerOptions.Port))

	var robotPeerId string = config.BasePeerId + strconv.Itoa(robotPeerIdEndingNum)

	// setup logrus logger
	robotConnLog := log.WithFields(log.Fields{"peer": robotPeerId, "peerServer": peerOptions.Host})

	// establish peer with peerjs server
	var robotPeer, err = peerjs.NewPeer(robotPeerId, peerjs.NewOptions())
	defer func() { // func to run when setupWebrtcConnection function exits (either normally or because of a panic)
		if robotPeer != nil && !robotPeer.GetDestroyed() {
			robotPeer.Close() // close this peer (including peer server connection)
		}
	}()

	if err != nil {
		robotConnLog.Error("Error creating robot peer: ", err)
		return err /// return and let the setupConnections loop take over
	}

	robotPeer.On("open", func(peerId interface{}) {
		var peerID string = peerId.(string) // typecast to string
		if peerID != robotPeerId {
			exitFuncSignal.Trigger() // signal to this goroutine to exit and let the setupConnections loop take over and rerun this function
		} else {
			robotConnLog.Info("Robot Peer Established!")
			peerConnectionOpenHandler(robotPeer, robotPeerId, peerOptions, robotConnLog)
		}
	})

	robotPeer.On("close", func(interface{}) {
		robotConnLog.Info("ROBOT PEER CLOSE EVENT")
		exitFuncSignal.Trigger() // signal to this goroutine to exit and let the setupConnections loop take over
	})

	robotPeer.On("disconnected", func(message interface{}) {
		robotConnLog.Info("ROBOT PEER DISCONNECTED EVENT", message)
		if !exitFuncSignal.HasTriggered {
			log.Debug("Reconnecting...")
			err = robotPeer.Reconnect()
			if err != nil {
				robotConnLog.Error("ERROR RECONNECTING TO DISCONNECTED PEER SERVER: ", err)
				exitFuncSignal.Trigger() // signal to this goroutine to exit and let the setupConnections loop take over
			}
		}
	})

	robotPeer.On("error", func(err interface{}) {
		errorMessage := err.(*peerjs.PeerError).Error()
		errorType := err.(*peerjs.PeerError).Type
		robotConnLog.Error("ROBOT PEER %s ERROR EVENT: %s", errorType, errorMessage)
		if contains(FATAL_PEER_ERROR_TYPES, errorType) {
			exitFuncSignal.TriggerWithError(err.(*peerjs.PeerError)) // signal to this goroutine to exit and let the setupConnections loop take over
		}
	})

	// ---------------------------------------------------------------------------------------------------------------------
	// block and wait for the exitFuncSignal or programShouldQuitSignal to be triggerd before exiting this function
	select {
	case <-exitFuncSignal.GetSignal():
		return exitFuncSignal.GetError()
	case <-programShouldQuitSignal.GetSignal():
		exitFuncSignal.Trigger()
		return nil
	}
}

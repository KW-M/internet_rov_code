package main

import (
	// "encoding/json"
	// "io/ioutil"
	// "errors"

	"strconv"
	"time"

	// "flag"
	"fmt"

	// "strconv"
	// "os"
	// "os/signal"
	// "sync"

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
// we make the PeerId of this ROV the basePeerId plus a number tacked on
// the end (rovNumber, eg: SSROV_0) that we increment if the current peerId is already taken.
var basePeerId string = "iROV-"
var rovNumber int = 0

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

func setupConnections(quitSignal chan bool) {
	makePeerJsOptions()
	go startLocalPeerJsServer(quitSignal)
	time.Sleep(time.Second * 1) // wait a bit for the local peerJs server to start up

	cloudQuitSignal := make(chan string)
	cloudConnectionWriteChannel := make(chan string, 12) // a channel with a buffer of 12 messages which can pile up until they are handled
	exitCloudConnection := make(chan bool)
	go func() {
		// for {
		select {
		case <-cloudQuitSignal:
			println("Exiting cloud quitSignal")
			return
		default:
		}
		setupWebrtcConnection(exitCloudConnection, peerServerCloudOpts, cloudConnectionWriteChannel)
		// }
	}()

	localQuitSignal := make(chan string)
	localConnectionWriteChannel := make(chan string, 12) // a channel with a buffer of 12 messages which can pile up until they are handled
	exitLocalConnection := make(chan bool)
	go func() {
		// for {
			select {
			case <-localQuitSignal:
				println("Exiting local quitSignal")
				return
			default:
			}
			setupWebrtcConnection(exitLocalConnection, peerServerLocalOpts, localConnectionWriteChannel)
		// }
	}()

	// send messages recived from the socket to seperate channels for both the local and cloud peers
	msgForwarderQuitSignal := make(chan string)
	go func() {
		// for {
		select {
		case <-msgForwarderQuitSignal:
			println("Exiting message forwarder quitSignal")
			return
		case msgFromROVPython := <-uSockMsgRecivedChannel:
			cloudConnectionWriteChannel <- msgFromROVPython
			localConnectionWriteChannel <- msgFromROVPython
		}
		// }
	}()

	<-quitSignal // wait for the quitSignal channel to be triggered at which point close each of the local & cloud connection function channels
	close(localQuitSignal)
	close(cloudQuitSignal)
	close(msgForwarderQuitSignal)
	exitLocalConnection <- true
	exitCloudConnection <- true
	close(cloudConnectionWriteChannel)
	close(localConnectionWriteChannel)
}

// should be called as a goroutine
func setupWebrtcConnection(exitFunction chan bool, peerServerOptions peerjs.Options, recievedMessageWriteChannel chan string) {
	var alreadyExitingFunction bool = false
	var rovPeerId string = basePeerId + strconv.Itoa(rovNumber)

	// setup logrus logger
	rovLog := log.WithFields(log.Fields{"peer": rovPeerId, "peerServer": peerServerOptions.Host})

	// establish peer with peerjs server
	var rovPeer, err = peerjs.NewPeer(rovPeerId, peerServerOptions)
	defer rovPeer.Close() // close the websocket connection when this whole outer function exits

	if err != nil {
		rovLog.Println("Error creating ROV peer: ", err)
		exitFunction <- true // signal to this goroutine to exit and let the setupConnections loop take over
	}

	rovPeer.On("open", func(peerId interface{}) {
		var peerID string = peerId.(string) // typecast to string
		if peerID != rovPeerId {
			rovLog.Printf("Uh oh, got peer id: %s (%s must be taken). Switching to next rov number...\n", peerID, rovPeerId)
			rovNumber++          // increment the rovNumber and try again
			exitFunction <- true // signal to this goroutine to exit and let the setupConnections loop take over and rerun this function
		} else {
			rovLog.Println("ROV Peer Established!")
		}

		activeDataConnectionsToThisPeer := make(map[string]*peerjs.DataConnection) // map of the open datachannel connection Ids to this peer.

		rovPeer.On("connection", func(data interface{}) {
			pilotDataConnection := data.(*peerjs.DataConnection) // typecast to DataConnection
			var pilotPeerId string = pilotDataConnection.GetPeerID()

			log := rovLog.WithFields(log.Fields{"peer": rovPeerId, "peerServer": peerServerOptions.Host})
			log.Println("Peer connection established with Pilot Peer ID: ", pilotDataConnection.GetPeerID())

			pilotDataConnection.On("open", func(message interface{}) {
				activeDataConnectionsToThisPeer[pilotPeerId] = pilotDataConnection // add this connection to the map of active connections

				pilotDataConnection.On("data", func(msgBytes interface{}) {
					log.Printf("Received: %#v: %s\n", msgBytes, msgBytes)
					var msgString string = string(msgBytes.([]byte))
					var socketString string = msgString
					if prependedPeerIdToRecivedMessages {
					  socketString = pilotPeerId + "::" + socketString
					}
					uSockSendMsgChannel <- socketString
				})

				fmt.Printf("VIDEO CALLING Peer (a Pilot or Spectator) with ID: %s\n", pilotPeerId)
				_, err = rovPeer.Call(pilotPeerId, rovLivestreamVideoTrack, peerjs.NewConnectionOptions())
				if err != nil {
					log.Println("Error calling pilot id: ", pilotPeerId)
					log.Fatal(err)
				}
			})

			pilotDataConnection.On("close", func(message interface{}) {
				println("PILOT PEER DATACHANNEL CLOSE EVENT", message)
				delete(activeDataConnectionsToThisPeer, pilotPeerId) // remove this connection from the map of active connections
			})

			pilotDataConnection.On("disconnected", func(message interface{}) {
				println("PILOT PEER DATACHANNEL DISCONNECTED EVENT", message)
			})

			pilotDataConnection.On("error", func(message interface{}) {
				fmt.Printf("PILOT PEER DATACHANNEL ERROR EVENT: %s", message)
			})
		})

		go func() {
			for {
				select {
				case msgFromROV := <-recievedMessageWriteChannel:
					if alreadyExitingFunction {
						return
					}
					rovLog.Println("Sending Message to Pilot: ", msgFromROV)
					for peerId, dataChannel := range activeDataConnectionsToThisPeer {
						rovLog.Println("Sending to PeerId: ", peerId)
						dataChannel.Send([]byte(msgFromROV), false)
					}
				}
			}
		}()
	})

	rovPeer.On("close", func(message interface{}) {
		println("ROV PEER JS CLOSE EVENT", message, alreadyExitingFunction)
		if !alreadyExitingFunction {
			exitFunction <- true // signal to this goroutine to exit and let the setupConnections loop take over
		}
	})

	rovPeer.On("disconnected", func(message interface{}) {
		println("ROV PEER JS DISCONNECTED EVENT", message)
		if !alreadyExitingFunction {
			err = rovPeer.Reconnect()
			if err != nil {
				rovLog.Println("ERROR RECONNECTING TO DISCONNECTED PEER SERVER: ", err)
				if !alreadyExitingFunction {
					exitFunction <- true // signal to this goroutine to exit and let the setupConnections loop take over
				}
			}
		}
	})

	rovPeer.On("error", func(message interface{}) {
		fmt.Printf("ROV PEER JS ERROR EVENT: %s", message)
		exitFunction <- true // signal to this goroutine to exit and let the setupConnections loop take over
	})

	// ---------------------------------------------------------------------------------------------------------------------
	fmt.Println("starting setup WebrtcConnection goroutine sleep")
	<-exitFunction // CONTINUE when a signal is sent on the 'exitFunction' channel from the the calling function to clean up because program is exiting or somthin, unblock this goroutine and exit.
	alreadyExitingFunction = true
	close(exitFunction)

	rovLog.Println("exiting setupWebrtcConnection")
}

// // connect to site
// conn, err := net.Dial("tcp", "127.0.0.1:8585")
// if err != nil {
// 	fmt.Printf("failed to connect to video tcp: %s\n", err)
// 	return err
// }

// func handleMediaCall(remoteSDP) {
// 	mediaEngine := webrtc.MediaEngine{}
// 	if err := mediaEngine.PopulateFromSDP(remoteSdp); err != nil {
// 		fmt.Println("pion could not create webrtc media engine from remote SDP.", err)
// 		return
// 	}

// 	// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs#avc_h.264

// 	// Find the H264 codec in the list of codecs supported by the remote peer (aka the pilot's browser)
// 	var h264PayloadType uint8 = 0
// 	for _, videoCodec := range mediaEngine.GetCodecsByKind(webrtc.RTPCodecTypeVideo) {
// 		if videoCodec.Name == "H264" {
// 			h264PayloadType = videoCodec.PayloadType
// 			break
// 		}
// 	}

// 	// if the payloadTypeNumber never changed, the broswer doesn't support H264 (highly unlikely)
// 	if h264PayloadType == 0 {
// 		fmt.Println("Remote peer does not support H264")
// 		continue
// 	}
